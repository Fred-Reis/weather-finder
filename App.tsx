import React from "react";

import { NativeBaseProvider, StatusBar } from "native-base";

import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";

import { AuthProvider } from "./src/hooks/useAuth";

import { Loading } from "./src/components/Loading";

import Routes from "./src/routes/index.routes";

import { THEME } from "./src/styles/theme";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        {fontsLoaded === true ? <Routes /> : <Loading />}
      </AuthProvider>
    </NativeBaseProvider>
  );
}
