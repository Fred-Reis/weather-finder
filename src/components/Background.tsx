import { useTheme } from "native-base";
import React from "react";
import { ImageBackground } from "react-native";

import backgroundImg from "../assets/background-galaxy.png";

interface Props {
  children: React.ReactNode;
}

export function Background({ children }: Props) {
  const { COLORS } = useTheme();
  return (
    <ImageBackground
      source={backgroundImg}
      defaultSource={backgroundImg}
      style={{ flex: 1, backgroundColor: COLORS.BACKGROUND_800 }}
    >
      {children}
    </ImageBackground>
  );
}
