import api from "./setup";

import { OPEN_WEATHER_KEY } from "@env";

export const URLS = {
  LOCATION_BY_COORDINATES: `/weather?lat=:latitude&lon=:longitude&units=metric&lang=pt_br&appid=${OPEN_WEATHER_KEY}`,
  LOCATION_BY_ADDRESS: `weather?q=:location&units=metric&lang=pt_br&appid=${OPEN_WEATHER_KEY}`,
};

const locationByCoordinates = (_latitude: string, _longitude: string) => {
  return api.get(
    URLS.LOCATION_BY_COORDINATES.replace(":latitude", _latitude).replace(
      ":longitude",
      _longitude
    )
  );
};

const locationByAddress = (_location: string) => {
  return api.get(URLS.LOCATION_BY_ADDRESS.replace(":location", _location));
};

export const API = {
  LOCATION_BY_COORDINATES: locationByCoordinates,
  LOCATION_BY_ADDRESS: locationByAddress,
};
