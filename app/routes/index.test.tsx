import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import IndexPage from "./index";
import { MemoryRouter } from "react-router";

test("the index page loads", () => {
  const screen = render(
    <MemoryRouter>
      <IndexPage />
    </MemoryRouter>
  );

  const infosection = screen.getByText(
    /An AI assistant that helps you write Air Force narrative style bullets/i
  );

  expect(infosection).toBeInTheDocument();
});
