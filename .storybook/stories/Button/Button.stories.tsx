import React from "react";
import { Button, ThemeProvider } from "@rneui/themed";
import { theme } from "@src/theme";

const MyButtonMeta = {
  title: "Kit/MyButton",
  component: Button,
  argTypes: {
    onPress: { action: "pressed the button" },
    color: {
      control: "radio",
      options: ["primary", "secondary", "warning", "error", "success"],
    },
    type: {
      control: "radio",
      options: ["solid", "outline", "clear"],
    },
    disabled: { control: 'boolean' }
  },
  args: {
    title: "Hello world",
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default MyButtonMeta;

export const Basic = {
  args: {
    title: "Basicdd",
    type: "solid",
    color: ["success"],
  },
};
