import { extendTheme } from "native-base";
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";

const theme = extendTheme({
  fontConfig: {
    OpenSans: {
      300: {
        normal: "OpenSans_300Light",
      },
      400: {
        normal: "OpenSans_400Regular",
      },
      500: {
        normal: "OpenSans_500Medium",
      },
      600: {
        normal: "OpenSans_600SemiBold",
      },
      700: {
        normal: "OpenSans_700Bold",
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: "OpenSans",
    body: "OpenSans",
    mono: "OpenSans",
  },
});

export default theme;
