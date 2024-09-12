import { expect, describe, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Page from "./page";

// Mock the useRouter hook
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("Page Component", () => {
  it("should redirect to /dashboard", () => {
    const push = vi.fn();
    (useRouter as any).mockReturnValue({ push });

    render(<Page />);

    // Assert that push was called with the expected argument
    expect(push).toHaveBeenCalledWith("/dashboard");
  });
});
