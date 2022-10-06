import { extendTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

export const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        fontFamily: "Poppins",
        color: mode("#fff", "#fff")(props),
        bg: mode("#fff", "#fff")(props),
        //    bg: mode("#F1F8F8", "#171821")(props),
        lineHeight: "base",
      },

    }),
  },
})
