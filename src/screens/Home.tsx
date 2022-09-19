import React, { useEffect, useState } from "react";
import { SafeAreaView, Platform, Keyboard } from "react-native";

import { Center, Text, Button, HStack, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import * as Location from "expo-location";

import loadingAnimation from "../assets/weather-radar.json";
import errorAnimation from "../assets/cant-find-your-location.json";
import { WeatherCard } from "../components/WeatherCard";
import { Input } from "../components/Input";

import { THEME } from "../styles/theme";
import { API } from "../api";

export function Home() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [address, setAddress] = useState("");

  const getCurrentPosition = async (): Promise<void> => {
    setWeather(null);
    setLoading(true);
    setErrorMsg("");
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const handleGetWeatherByAddress = async () => {
    setWeather(null);
    setLoading(true);
    setErrorMsg("");
    Keyboard.dismiss();

    try {
      const { data } = await API.LOCATION_BY_ADDRESS(address);
      setLoading(false);
      setWeather(data);
    } catch (error) {
      console.log(error);
      setErrorMsg("Endereço não localizado!");
      setLoading(false);
      setWeather(null);
    }
  };

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location?.coords;

      (async () => {
        try {
          const { data } = await API.LOCATION_BY_COORDINATES(
            latitude,
            longitude
          );
          setWeather(data);
          setLoading(false);
        } catch (error) {
          setErrorMsg("Endereço não localizado!");
          setLoading(false);
          setWeather(null);
        }
      })();
    }
  }, [location]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#2a1e2e",
        paddingTop: Platform.OS === "android" ? 35 : 0,
      }}
    >
      <VStack mx={8}>
        <Text my={3} color="white" fontSize={18}>
          Pesquisa por Endereço
        </Text>
        <HStack bg="#2a1e2e">
          <Input
            placeholder="Cidade, sigla País"
            onChangeText={setAddress}
            onSubmitEditing={handleGetWeatherByAddress}
          />
          <MaterialIcons
            name="search"
            size={40}
            color="white"
            onPress={handleGetWeatherByAddress}
          />
        </HStack>
      </VStack>

      <Center flex={1}>
        {errorMsg && (
          <>
            <Text mb={2} color="white" fontSize={18}>
              {errorMsg}
            </Text>
            <LottieView
              source={errorAnimation}
              loop
              autoPlay
              style={{ width: 230, height: 230 }}
              resizeMode="cover"
              speed={1.5}
            />
          </>
        )}

        {weather && (
          <WeatherCard
            temperature={weather.main.temp}
            weather={weather.weather[0].description}
            city={weather.name}
            country={weather.sys.country}
            timestamp={weather.dt}
          />
        )}

        {loading && (
          <LottieView
            source={loadingAnimation}
            loop
            autoPlay
            style={{ width: 280, height: 280 }}
            resizeMode="cover"
            speed={1.5}
          />
        )}

        {!loading && (
          <Button
            bg="#282929"
            w={THEME.variables.width / 1.7}
            my={10}
            py={5}
            borderColor="#542bc4"
            borderWidth={2}
            rounded={60}
            onPress={getCurrentPosition}
            _pressed={{
              bg: "#282929",
            }}
          >
            Buscar Pela Minha Localização
          </Button>
        )}
      </Center>
    </SafeAreaView>
  );
}
