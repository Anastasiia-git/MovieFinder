import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import MoviesPage from "./MoviesPage";
import { getPaginationItems } from "./pagination";
import { getMovieGenres, getMovies } from "../../services/api";

vi.mock("../../services/api", () => ({
  IMG_BASE_URL: "https://image.tmdb.org/t/p/w500",
  getMovieGenres: vi.fn(),
  getMovies: vi.fn(),
}));

const genres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
];

function LocationProbe() {
  const location = useLocation();

  return <output aria-label="current search">{location.search}</output>;
}

function renderMoviesPage(initialEntry = "/movies") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route
          path="/movies"
          element={
            <>
              <MoviesPage />
              <LocationProbe />
            </>
          }
        />
      </Routes>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  getMovieGenres.mockResolvedValue(genres);
  getMovies.mockResolvedValue({
    results: [],
    total_pages: 1,
  });
});

describe("getPaginationItems", () => {
  it("keeps the first pages, current page area, and last page", () => {
    expect(getPaginationItems(8, 20)).toEqual([
      1,
      2,
      3,
      "gap-7",
      7,
      8,
      9,
      "gap-20",
      20,
    ]);
  });

  it("does not add gaps when pages are already adjacent", () => {
    expect(getPaginationItems(2, 4)).toEqual([1, 2, 3, 4]);
  });
});

describe("MoviesPage", () => {
  it("waits for form submit before searching by title", async () => {
    const user = userEvent.setup();
    renderMoviesPage();

    await waitFor(() => {
      expect(getMovies).toHaveBeenCalledWith({
        page: 1,
        search: "",
        genre: "",
        year: "",
      });
    });

    await user.type(screen.getByLabelText(/search title/i), "Interstellar");

    expect(getMovies).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(getMovies).toHaveBeenLastCalledWith({
        page: 1,
        search: "Interstellar",
        genre: "",
        year: "",
      });
    });
    expect(screen.getByLabelText(/current search/i)).toHaveTextContent(
      "?search=Interstellar&page=1",
    );
  });

  it("applies genre and year filters through URL params on submit", async () => {
    const user = userEvent.setup();
    renderMoviesPage();

    await screen.findByRole("button", { name: /genre/i });

    await user.click(screen.getByRole("button", { name: /genre/i }));
    await user.click(screen.getByRole("menuitemradio", { name: "Action" }));
    await user.click(screen.getByRole("button", { name: /year/i }));
    await user.click(screen.getByRole("menuitemradio", { name: "2025" }));
    await user.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(getMovies).toHaveBeenLastCalledWith({
        page: 1,
        search: "",
        genre: "28",
        year: "2025",
      });
    });
    expect(screen.getByLabelText(/current search/i)).toHaveTextContent(
      "?genre=28&year=2025&page=1",
    );
  });

  it("supports keyboard navigation inside filter dropdowns", async () => {
    const user = userEvent.setup();
    renderMoviesPage();

    const genreButton = await screen.findByRole("button", { name: /genre/i });

    await user.click(genreButton);

    await waitFor(() => {
      expect(screen.getByRole("menuitemradio", { name: "All genres" }))
        .toHaveFocus();
    });

    await user.keyboard("{ArrowDown}");

    expect(screen.getByRole("menuitemradio", { name: "Action" })).toHaveFocus();

    await user.keyboard("{End}");

    expect(screen.getByRole("menuitemradio", { name: "Comedy" })).toHaveFocus();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(genreButton).toHaveFocus();
  });
});
