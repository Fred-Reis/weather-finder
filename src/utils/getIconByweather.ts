import ClearDay from "../assets/weather-icons/clear-day.svg";
import ClearNight from "../assets/weather-icons/clear-night.svg";
import Cloud from "../assets/weather-icons/cloud.svg";
import CloudFewDay from "../assets/weather-icons/cloud-few-day.svg";
import CloudFewNight from "../assets/weather-icons/cloud-few-night.svg";
import CloudDay from "../assets/weather-icons/cloud-day.svg";
import CloudNight from "../assets/weather-icons/cloud-night.svg";
import RainDay from "../assets/weather-icons/rain-day.svg";
import RainNight from "../assets/weather-icons/rain-night.svg";
import RainBarelyDay from "../assets/weather-icons/rain-barely-day.svg";
import RainBarelyNight from "../assets/weather-icons/rain-barely-night.svg";
import ThunderstormDay from "../assets/weather-icons/thunderstorm-day.svg";
import ThunderstormNight from "../assets/weather-icons/thunderstorm-night.svg";
import SnowDay from "../assets/weather-icons/snow-day.svg";
import SnowNight from "../assets/weather-icons/snow-night.svg";
import Fog from "../assets/weather-icons/fog.svg";

export function getIconByWeather(_icon: string) {
  const icon = {
    "01d": ClearDay,
    "01n": ClearNight,
    "02d": CloudDay,
    "02n": CloudNight,
    "03d": CloudFewDay,
    "03n": CloudFewNight,
    "04d": Cloud,
    "04n": Cloud,
    "09d": RainDay,
    "09n": RainNight,
    "10d": RainBarelyDay,
    "10n": RainBarelyNight,
    "11d": ThunderstormDay,
    "11n": ThunderstormNight,
    "13d": SnowDay,
    "13n": SnowNight,
    "50d": Fog,
    "50n": Fog,
  };

  return icon[_icon];
}
