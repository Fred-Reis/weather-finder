import { extendTheme } from "native-base";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export type CustomThemeType = typeof THEME;

export const THEME = extendTheme({
  COLORS: {
    BACKGROUND_800: "#18181B",

    COMPONENTS_BACKGROUND: "#2a1e2e",

    BORDER: "#542bc4",

    SUCCESS: "#34D399",
    ALERT: "#F87171",

    WHITE: "#FFFFFF",
  },
  FONT: {
    HEADING: "Roboto_700Bold",
    BODY: "Roboto_400Regular",
  },
  VARIABLES: {
    WIDTH: width,
    HEIGHT: height,
  },
});
