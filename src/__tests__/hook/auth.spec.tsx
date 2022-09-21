/**
 * @format
 */

import "react-native";

import { renderHook, act } from "@testing-library/react-hooks";

import { AuthProvider, useAuth } from "../../hooks/useAuth";

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe("Auth Hook", () => {
  it("should be able to sign in with fingerprint", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signIn());

    expect(result.current.token).toBeTruthy();
  });
});
