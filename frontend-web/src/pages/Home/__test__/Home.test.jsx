import { render, screen } from "@testing-library/react";
import Home from "../index";

describe("Home component", () => {

  it("should render Register component correctly", () => {
    render(<Home />);
    const element = screen.getByRole("heading");
    expect(element).toBeInTheDocument();
  });

});