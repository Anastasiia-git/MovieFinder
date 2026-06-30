import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import MovieList from "./MovieList";

const movies = [
  {
    id: 1,
    title: "Dune",
    poster_path: "/dune.jpg",
    genre_ids: [12, 878],
    vote_average: 7.8,
  },
];

describe("MovieList", () => {
  it("renders movie cards with details and links", () => {
    render(
      <MemoryRouter>
        <MovieList movies={movies} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Dune" })).toBeInTheDocument();
    expect(screen.getByText("Adventure · Sci-Fi")).toBeInTheDocument();
    expect(screen.getByText(/7.8/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Dune/i })).toHaveAttribute(
      "href",
      "/movies/1",
    );
  });

  it("renders nothing when the movie list is empty", () => {
    const { container } = render(
      <MemoryRouter>
        <MovieList movies={[]} />
      </MemoryRouter>,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
