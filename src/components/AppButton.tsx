import React from "react";
import {
  Button as ButtonNativeBase,
  IButtonProps,
  Heading,
  useTheme,
} from "native-base";

type Props = IButtonProps & {
  title: string;
};

export function AppButton({ title, ...rest }: Props) {
  const { FONT, VARIABLES, COLORS } = useTheme();

  return (
    <ButtonNativeBase
      bg="transparent"
      w={VARIABLES.WIDTH / 1.7}
      borderColor={COLORS.BORDER}
      borderWidth={2}
      rounded={60}
      _pressed={{
        bg: "transparent",
      }}
      {...rest}
    >
      <Heading fontSize="md" color="white" fontFamily={FONT.BODY}>
        {title}
      </Heading>
    </ButtonNativeBase>
  );
}
