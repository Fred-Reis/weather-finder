import React from "react";
import { Input as NativebaseInput, IInputProps } from "native-base";

export function Input({ ...rest }: IInputProps) {
  return (
    <NativebaseInput
      bg="#282929"
      h={12}
      flex={1}
      mr={4}
      size="md"
      borderWidth={1}
      borderColor="#3e2581"
      autoComplete="off"
      autoCorrect={false}
      fontSize="md"
      fontFamily="body"
      color="white"
      placeholderTextColor="gray.500"
      _focus={{
        borderColor: "#542bc4",
        borderWidth: 2,
        bg: "#282929",
      }}
      {...rest}
    />
  );
}
