import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  AspectRatio,
  Heading,
  Badge,
  Divider,
  Collapse,
  Flex,
  Button,
  Link,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { Devblog } from "../../pages/home/Types";
import { formatDate } from "../../utils/HelpersFunction";

export const DevblogCard = ({
  content,
  created_at,
  title,
  creator,
  imageUri,
}: Devblog) => {
  const { backgroundColor } = useTheme({ variant: "info" });
  const { backgroundColor: bg } = useTheme({ variant: "secondary" });
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  return (
    <Box
      width="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      {...bg}
    >
      <Box>
        {imageUri ? (
          <AspectRatio ratio={16 / 9} maxH="80px" pointerEvents="none">
            <Image src={imageUri} alt={`cover of ${title}`} objectFit="cover" />
          </AspectRatio>
        ) : (
          <Box h="80px" w="100%" {...backgroundColor}></Box>
        )}

        <Heading p={2} textTransform="capitalize">
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
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            Par {creator} &bull; {formatDate(created_at)}
          </Box>
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
