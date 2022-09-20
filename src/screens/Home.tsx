import React, { useEffect, useState } from "react";
import { SafeAreaView, Platform, Keyboard } from "react-native";

import { Center, Text, HStack, VStack, Heading, useTheme } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import * as Location from "expo-location";

import errorAnimation from "../assets/cant-find-your-location.json";
import loadingAnimation from "../assets/weather-radar.json";

import { WeatherCard } from "../components/WeatherCard";
import { Background } from "../components/Background";
import { AppButton } from "../components/AppButton";
import { Input } from "../components/Input";

import { API } from "../api";

export function Home() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [address, setAddress] = useState("");

  const { FONT } = useTheme();

  const getCurrentPosition = async (): Promise<void> => {
    setWeather(null);
    setLoading(true);
    setLocation(null);
    setAddress("");
    setErrorMsg("");
    Keyboard.dismiss();
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
    <Background>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? 35 : 0,
        }}
      >
        <VStack mx={8}>
          <Text my={3} color="white" fontSize={18} fontFamily={FONT.HEADING}>
            Pesquisa por Endereço
          </Text>
          <HStack>
            <Input
              value={address}
              placeholder="Cidade, sigla País"
              onChangeText={setAddress}
              onSubmitEditing={handleGetWeatherByAddress}
              InputRightElement={
                <MaterialIcons
                  name="search"
                  size={35}
                  color="white"
                  style={{ marginRight: 10 }}
                  onPress={handleGetWeatherByAddress}
                />
              }
            />
          </HStack>
        </VStack>

        <Center flex={1} mt={10}>
          {errorMsg && (
            <>
              <Text
                mb={2}
                color="white"
                fontSize={20}
                fontFamily={FONT.HEADING}
              >
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
              <Text
                mt={4}
                color="white"
                fontSize={20}
                fontFamily={FONT.HEADING}
              >
                Verifique e tente novamente...
              </Text>
            </>
          )}

          {loading ? (
            <LottieView
              source={loadingAnimation}
              loop
              autoPlay
              style={{ width: 280, height: 280 }}
              resizeMode="cover"
              speed={1.5}
            />
          ) : (
            <>
              {weather ? (
                <WeatherCard
                  temperature={weather.main.temp}
                  weather={weather.weather[0].description}
                  city={weather.name}
                  country={weather.sys.country}
                  timestamp={weather.dt}
                  icon={weather.weather[0].icon}
                />
              ) : (
                !errorMsg && (
                  <Heading
                    textAlign="center"
                    lineHeight={28}
                    fontSize="lg"
                    color="white"
                    fontFamily={FONT.HEADING}
                    mx={12}
                    mb={20}
                  >
                    Digite o Endereço desejado, {"\n"} ou clique no botão abaixo
                    para buscar o clima na sua localização{" "}
                  </Heading>
                )
              )}

              <AppButton
                my={10}
                py={5}
                onPress={getCurrentPosition}
                title=" Buscar clima pela localização"
              />
            </>
          )}
        </Center>
      </SafeAreaView>
    </Background>
  );
}
