import React from "react";
import { NativeBaseProvider, StatusBar } from "native-base";
import { AuthProvider } from "./src/hooks/useAuth";

import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";

import { Home } from "./src/screens/Home";
import { Loading } from "./src/components/Loading";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider>
      <AuthProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        {fontsLoaded === true ? <Home /> : <Loading />}
        {/* {fontsLoaded === true ? <Routes /> : <Loading />} */}
      </AuthProvider>
    </NativeBaseProvider>
  );
}
