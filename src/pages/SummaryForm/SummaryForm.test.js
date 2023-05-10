import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SummaryForm } from "./SummaryForm";

test("Initial conditions", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});

test("Checkbox enables button on first click and disables on second click", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  await user.click(checkbox);
  expect(confirmButton).toBeEnabled();

  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  //popover staers out hidden
  const nullPopover = screen.queryByText(
    /no ice creem will actualy be deliverd/i
  );
  expect(nullPopover).not.toBeInTheDocument();
  //popoverappears on mouseover of checkbox lable
  const termsAndConditions = screen.getAllByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.queryByText(/no ice creem will actualy be deliverd/i);
  expect(popover).toBeInTheDocument();
  //popover disappeers when we mouse out
  await user.unhover(termsAndConditions);
  expect(nullPopover).not.toBeInTheDocument();
});
