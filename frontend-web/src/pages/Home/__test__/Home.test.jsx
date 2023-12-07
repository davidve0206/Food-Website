import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Home from "../index";

describe("Home component", () => {

  it("should render the SiteLogo component", () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    const logoElement = screen.getAllByRole("heading", {level: 1});
    expect(logoElement[0]).toHaveClass("SiteLogo");
  });

  it("should have a log-in button", () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    const logInButton = screen.getByRole("button", {name: /log in/i});
    expect(logInButton).toBeInTheDocument();
  });

  it("should have a sign-in button", () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    const signInButton = screen.getByRole("button", {name: /sign in/i});
    expect(signInButton).toBeInTheDocument();
  });

});