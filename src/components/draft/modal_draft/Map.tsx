import { Flex, Box, Image } from "@chakra-ui/react";
import { useWindowSize } from "../../../hooks/useWindowSize";

export const MapPreview = ({ map }: { map: number }) => {
  const { size, isScreen, isPad, isMobile } = useWindowSize();

  return (
    <Flex justifyContent={isScreen ? "flex-end" : "center"}>
      <Box width={`${1920 / 6}px`} height={`${1080 / 6}px`}>
        <Image
          fit="contain"
          src={`/maps/A${map > 0 && map < 30 ? map : 1}.png`}
          alt=""
          borderRadius={10}
        />
      </Box>
    </Flex>
  );
};
