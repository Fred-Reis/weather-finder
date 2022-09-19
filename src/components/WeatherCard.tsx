import React from "react";

import { Center, Text } from "native-base";

import { THEME } from "../styles/theme";
import Night from "../assets/night-cloud.svg";

interface CardProps {
  temperature: number;
  weather: string;
  city: string;
  country: string;
  timestamp: number;
}

export const WeatherCard = ({
  temperature,
  weather,
  city,
  country,
  timestamp,
}: CardProps) => {
  return (
    <Center
      bg="#282929"
      w={THEME.variables.width / 1.7}
      my={10}
      py={5}
      borderColor="#542bc4"
      borderWidth={2}
      rounded={60}
    >
      <Night width={120} height={100} />
      <Text color="white" fontSize={50} my={1}>
        {temperature?.toFixed(1)}ºC
      </Text>
      <Text color="white" textTransform="capitalize" fontSize={20} my={1}>
        {weather}
      </Text>
      <Text color="white" fontSize={20} my={1}>
        {city}, {country}
      </Text>
      <Text color="white" fontSize={15} my={1}>
        {/* @ts-ignore*/}
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
