import { screen } from "@testing-library/react";
import About from "../src/Pages/About.jsx";
import { renderWithProviders } from "./test-utils";

describe("About Component", () => {
  it("renders the About component with h1", () => {
    renderWithProviders(<About />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("About Aleef");
  });

  it("contains mission statement heading", () => {
    renderWithProviders(<About />);
    const missionHeading = screen.getByRole("heading", { level: 2 });
    expect(missionHeading).toHaveTextContent("Our Mission");
  });

  it("displays Ariam Al Hasani as Lead Developer", () => {
    renderWithProviders(<About />);
    expect(screen.getByText("Ariam Al Hasani")).toBeInTheDocument();
    expect(screen.getByText("Lead Developer & Designer")).toBeInTheDocument();
  });

  it("displays Anwar Al Daeri as Web Developer", () => {
    renderWithProviders(<About />);
    expect(screen.getByText("Anwar Al Daeri")).toBeInTheDocument();
    expect(screen.getByText("Web Developer")).toBeInTheDocument();
  });
});
