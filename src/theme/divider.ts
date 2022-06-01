import type {
  SystemStyleObject,
  SystemStyleFunction,
} from "@chakra-ui/theme-tools";
import { mode } from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleFunction = (props) => {
  return { opacity: 0.6, borderColor: "inherit" };
};

const variantSolid: SystemStyleObject = {
  borderStyle: "solid",
};

const variantDashed: SystemStyleObject = {
  borderStyle: "dashed",
};

const variants = {
  solid: variantSolid,
  dashed: variantDashed,
};

const defaultProps = {
  variant: "solid",
};

export default {
  baseStyle,
  variants,
  defaultProps,
};
