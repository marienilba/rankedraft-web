import { Heading } from "@chakra-ui/react";
import { useWindowSize } from "../hooks/useWindowSize";

export const PageHeading = ({ children }) => {
  const { isMobile } = useWindowSize();
  return <Heading mt={isMobile ? 4 : 0}>{children}</Heading>;
};
