/**
 * @format
 */

import "react-native";
import React from "react";

import { render } from "@testing-library/react-native";
import { NativeBaseProvider } from "native-base";

import { THEME } from "../../styles/theme";

import { Input } from "../../components/Input";

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const Providers = ({ children }) => (
  <NativeBaseProvider initialWindowMetrics={inset} theme={THEME}>
    {children}
  </NativeBaseProvider>
);

describe("Input", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("must have a test id", () => {
    const { getByTestId } = render(<Input testID="input-test" />, {
      wrapper: Providers,
    });

    const inputComponent = getByTestId("input-test");

    expect(inputComponent.props.testID).toBe("input-test");
  });
});
