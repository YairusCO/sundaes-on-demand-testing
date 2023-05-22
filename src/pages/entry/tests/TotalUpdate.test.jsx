import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("update scoop subtotal when scoop change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  //make sure total starts out @0.00
  const scoopSubtotal = screen.getByText("Scopp total: $", { exect: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  //ypdate vanilla scoop to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopSubtotal).toHaveTextContent("2.00");

  // update cohcolate scoop to 2 and check subtotal
  const cohcolateInput = await screen.findByRole("spinbutton", {
    name: "chocolate",
  });
  await user.clear(cohcolateInput);
  await user.type(cohcolateInput, "2");
  expect(scoopSubtotal).toHaveTextContent("6.00");
});
