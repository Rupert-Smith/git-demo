import { render, screen } from "@testing-library/react";
import Todos from "./Todos";

test("simple test", () => {
  render(<Todos />);
  const element = screen.getByText("Test");
  expect(element).toBeInTheDocument();
});
