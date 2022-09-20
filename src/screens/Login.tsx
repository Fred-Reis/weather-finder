import React, { useEffect, useState } from "react";

import * as LocalAuthentication from "expo-local-authentication";
import { VStack, useTheme, Text, Center } from "native-base";
import LottieView from "lottie-react-native";

import { Background } from "../components/Background";
import { AppButton } from "../components/AppButton";
import { useAuth } from "../hooks/useAuth";

import loggingAnimation from "../assets/weather-login.json";

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
      <Background>
        <Center h="100%" w="100%">
          <LottieView
            source={loggingAnimation}
            loop
            autoPlay
            style={{ width: 430, height: 430 }}
            resizeMode="cover"
          />
          <Text
            color="white"
            fontSize="xl"
            textAlign="center"
            fontFamily={FONT.HEADING}
            m={10}
            mt={0}
          >
            Clique no botão abaixo para se autenticar e acessar a aplicação
          </Text>

          <AppButton title="Login" w="60%" onPress={onAuthenticate} />
        </Center>
      </Background>
    </VStack>
  );
}
