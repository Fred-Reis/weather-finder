import React from "react";

import { Input as NativebaseInput, IInputProps, useTheme } from "native-base";

export function Input({ ...rest }: IInputProps) {
  const { COLORS } = useTheme();

  return (
    <NativebaseInput
      h={12}
      flex={1}
      size="md"
      borderWidth={2}
      borderColor={COLORS.BORDER}
      autoComplete="off"
      autoCorrect={false}
      fontSize="md"
      fontFamily="body"
      rounded={60}
      color="white"
      bg={COLORS.COMPONENTS_BACKGROUND}
      placeholderTextColor="gray.500"
      _focus={{
        borderColor: `${COLORS.BORDER}`,
        borderWidth: 2,
      }}
      {...rest}
    />
  );
}
