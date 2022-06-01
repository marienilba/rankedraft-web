import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints, mode } from "@chakra-ui/theme-tools";
import Button from "./button";
import Divider from "./divider";
import Drawer from "./drawer";
import Editable from "./editable";
import Input from "./input";
import Link from "./link";
import Menu from "./menu";
import Modal from "./modal";
import NumberInput from "./number-input";
import Popover from "./popover";
import Select from "./select";
import Table from "./table";
import Tabs from "./tabs";
import Textarea from "./textarea";
import Tooltip from "./tooltip";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  components: {
    Button,
    Divider,
    Drawer,
    Editable,
    Input,
    Link,
    Menu,
    Modal,
    NumberInput,
    Popover,
    Select,
    Table,
    Tabs,
    Textarea,
    Tooltip,
  },
  colors: {
    black: "#16161D",
    brand: {
      100: "#FFFFFF",
      200: "#F5F8FA",
      300: "#E1E8ED",
      400: "#AAB8C2",
      500: "#657786",
      600: "#14171A",
      700: "#000000",
    },
  },
  fonts,
  breakpoints,
});

// https://github.com/chakra-ui/chakra-ui/tree/main/packages/theme/src/components
// https://chakra-ui.com/docs/styled-system/features/style-props
// https://www.onlinepalette.com/twitter/#:~:text=Twitter%20uses%20the%20colors%20blue,29%2C%20161%2C%20242).

// semanticTokens: {
//   colors: {
//     text: {
//       default: "#E8E9E9",
//       _dark: "#ade3b8",
//     },
//   },
//   radii: {
//     button: "12px",
//   },
// },

export default theme;
