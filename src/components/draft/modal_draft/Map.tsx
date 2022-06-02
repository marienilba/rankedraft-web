import { Flex, Box, Img, Image, AspectRatio } from "@chakra-ui/react";
import { useTheme } from "../../../hooks/useTheme";
import { useWindowSize } from "../../../hooks/useWindowSize";

export const MapPreview = ({ map }: { map: number }) => {
  const { isScreen } = useWindowSize();
  const { backgroundColor } = useTheme({ variant: "secondary" });
  return (
    <Flex justifyContent={isScreen ? "flex-end" : "center"}>
      <AspectRatio w="320px" ratio={16 / 9} flex="1 1 auto">
        {map > 0 && map < 30 ? (
          <Img src={`/maps/A${map}.png`} alt="Map" borderRadius={10} />
        ) : (
          <Box
            {...backgroundColor}
            width="auto"
            height="auto"
            borderRadius={10}
          ></Box>
        )}
      </AspectRatio>
    </Flex>
  );
};
