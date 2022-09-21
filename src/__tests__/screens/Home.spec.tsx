/**
 * @format
 */

import "react-native";
import React from "react";

import { render } from "@testing-library/react-native";
import { NativeBaseProvider } from "native-base";

import { THEME } from "../../styles/theme";

import { Home } from "../../screens/Home";

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const Providers = ({ children }) => (
  <NativeBaseProvider initialWindowMetrics={inset} theme={THEME}>
    {children}
  </NativeBaseProvider>
);

describe("Home", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("should exist an input", () => {
    const { getByPlaceholderText } = render(<Home />, {
      wrapper: Providers,
    });

    const inputAddress = getByPlaceholderText("Cidade, sigla País");

    expect(inputAddress).toBeTruthy();
  });
});
