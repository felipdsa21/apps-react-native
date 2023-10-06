import { expect, test } from "@jest/globals";
import { render } from "@testing-library/react-native";
import React from "react";

import { TaskComp } from "./TaskComp";

test("Renderiza corretamente", async () => {
  const task = { id: 1, desc: "Test", timestamp: 1, done: false };
  const component = <TaskComp data={task} now={new Date()} setDesc={() => {}} setDone={() => {}} remove={() => {}} />;

  const tree = render(component);
  expect(tree);

  const button = await tree.findByText("\u270E");
  expect(button);
});
