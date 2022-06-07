import { mode, cssVar, SystemStyleFunction } from "@chakra-ui/theme-tools";

const $bg = cssVar("tooltip-bg");
const $arrowBg = cssVar("popper-arrow-bg");

const baseStyle: SystemStyleFunction = (props) => {
  const bg = mode("brand.200", "brand.600")(props);
  return {
    [$bg.variable]: `colors.${bg}`,
    px: "8px",
    py: "2px",
    bg: [$bg.reference],
    [$arrowBg.variable]: [$bg.reference],
    color: mode("blackAlpha.900", "gray.100")(props),
    borderRadius: "sm",
    fontWeight: "medium",
    fontSize: "sm",
    boxShadow: "md",
    maxW: "320px",
    zIndex: "tooltip",
  };
};

export default {
  baseStyle,
};
