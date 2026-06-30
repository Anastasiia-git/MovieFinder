import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useDebouncedValue } from "./useDebouncedValue";

describe("useDebouncedValue", () => {
  it("updates the value only after the delay", () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 300),
      { initialProps: { value: "batman" } },
    );

    expect(result.current).toBe("batman");

    rerender({ value: "superman" });
    expect(result.current).toBe("batman");

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("superman");
    vi.useRealTimers();
  });
});
