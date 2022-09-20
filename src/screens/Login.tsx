import React, { useEffect, useState } from "react";
import { Platform } from "react-native";

import { VStack, useTheme, Text, Center, Image } from "native-base";
import * as LocalAuthentication from "expo-local-authentication";
// import { LinearGradient } from "expo-linear-gradient";

// import { Button } from "../components/Button";

import { AppButton } from "../components/AppButton";
import { useAuth } from "../hooks/useAuth";

// import logo from "../assets/logo.png";

export function Login() {
  const [, setIsBiometricSupported] = useState(false);

  const { FONT } = useTheme();

  const { signIn } = useAuth();

  const onAuthenticate = () => {
    const auth = LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate",
      fallbackLabel: "Enter Password",
    });
    auth.then(() => {
      signIn();
    });
  };

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });

  return (
    <VStack flex={1}>
      {/* <LinearGradient
        colors={[colors.primary[700], "transparent", colors.primary[700]]}
        style={{
          width: variables.width,
          height:
            Platform.OS === "android"
              ? variables.height * 1.1
              : variables.height,
          position: "absolute",
        }}
      /> */}

      <Center h="100%" w="100%">
        {/* <Image source={logo} w={150} h={150} alt="logo" /> */}
        <Text
          color="white"
          fontSize="2xl"
          textAlign="center"
          fontFamily={FONT.HEADING}
          m={10}
        >
          Clique no botão abaixo para se autenticar e acessar a aplicação
        </Text>

        <AppButton title="Login" w="60%" onPress={onAuthenticate} />
      </Center>
    </VStack>
  );
}
