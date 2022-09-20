import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { RootStackParamList } from "./rootStackParamList";

import { Login } from "../screens/Login";
import { Home } from "../screens/Home";

import { useAuth } from "../hooks/useAuth";

const { Navigator, Screen, Group } =
  createNativeStackNavigator<RootStackParamList>();

const Routes = () => {
  const { token } = useAuth();

  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <Screen name="Home" component={Home} />
        ) : (
          <Group>
            <Screen name="Login" component={Login} />
          </Group>
        )}
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
