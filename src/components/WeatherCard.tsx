import React from "react";

import { Center, Text, useTheme } from "native-base";
import { LinearGradient } from "expo-linear-gradient";

import { getIconByWeather } from "../utils/getIconByweather";

interface CardProps {
  temperature: number;
  weather: string;
  city: string;
  country: string;
  timestamp: number;
  icon: string;
}

export const WeatherCard = ({
  temperature,
  weather,
  city,
  country,
  timestamp,
  icon,
}: CardProps) => {
  const isDay =
    Number(
      new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
      }).format(new Date(timestamp * 1000))
    ) < 18;

  const Icon = getIconByWeather(icon);

  const { FONT, VARIABLES, COLORS } = useTheme();

  return (
    <Center
      w={VARIABLES.WIDTH / 1.7}
      my={10}
      borderColor={COLORS.BORDER}
      borderWidth={2}
      rounded={60}
      overflow="hidden"
      position="relative"
    >
      <LinearGradient
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
        colors={[
          "rgba(255, 255, 255, 0.2)",
          "transparent",
          "rgba(255, 255, 255, 0.2)",
        ]}
      />
      <Icon
        width={120}
        height={100}
        style={{ marginTop: 25, marginBottom: 10 }}
      />

      <Text color="white" fontSize={50} my={1} fontFamily={FONT.HEADING}>
        {temperature?.toFixed(1)}ºC
      </Text>

      <Text
        color="white"
        textTransform="capitalize"
        fontSize={20}
        my={1}
        fontFamily={FONT.HEADING}
      >
        {weather}
      </Text>

      <Text color="white" fontSize={20} my={1} fontFamily={FONT.BODY}>
        {city}, {country}
      </Text>

      <Text color="white" fontSize={15} my={1} mb={6} fontFamily={FONT.BODY}>
        {new Intl.DateTimeFormat("pt-BR", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(timestamp * 1000))}
      </Text>
    </Center>
  );
};
