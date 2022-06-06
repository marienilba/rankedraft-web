import {
  Box,
  AspectRatio,
  Heading,
  Badge,
  Divider,
  Collapse,
  Button,
  Image,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { New } from "../../pages/home/Types";
import { formatDate } from "../../utils/HelpersFunction";

export const NewCard = ({
  content,
  created_at,
  title,
  creator,
  imageUri,
}: New) => {
  const { backgroundColor } = useTheme({ variant: "info" });
  const { backgroundColor: bg, theme } = useTheme({ variant: "secondary" });

  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  return (
    <Box
      width="100%"
      borderColor={theme[200]}
      boxShadow="base"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      {...bg}
    >
      {imageUri ? (
        <AspectRatio ratio={16 / 9} maxH="80px">
          <Image src={imageUri} alt={`cover of ${title}`} objectFit="cover" />
        </AspectRatio>
      ) : (
        <Box h="80px" w="100%" {...backgroundColor}></Box>
      )}
      <Heading p={2} textTransform="uppercase">
        {title}
      </Heading>
      <Box display="flex" alignItems="baseline" p="2">
        {Math.floor(new Date().valueOf() / 1000) - 604800 <
          Math.floor(created_at.valueOf() / 1000) && (
          <Badge borderRadius="full" px="2" colorScheme="twitter">
            New
          </Badge>
        )}
        <Box
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          ml="2"
        >
          Par {creator} &bull; {formatDate(created_at)}
        </Box>
      </Box>
      <Divider />

      <Box p="2" fontSize="xl">
        <Collapse startingHeight={"95px"} in={show}>
          {content(null)}
        </Collapse>

        <Button size="sm" onClick={handleToggle} mt="1rem">
          Show {show ? "Less" : "More"}
        </Button>
      </Box>
    </Box>
  );
};
