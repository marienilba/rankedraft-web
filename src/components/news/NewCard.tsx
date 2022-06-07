import {
  Box,
  AspectRatio,
  Heading,
  Badge,
  Divider,
  Collapse,
  Button,
  Image,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { New } from "../../pages/api/news/Types";
import { formatDate } from "../../utils/HelpersFunction";
import { Parser } from "./Parser";

export const NewCard = ({
  locales,
  content,
  created_at: date,
  title,
  creator,
  imageUri,
}: New) => {
  const { locale } = useRouter();
  const { t } = useTranslation(["home"]);
  const { backgroundColor } = useTheme({ variant: "info" });
  const { backgroundColor: bg, theme } = useTheme({ variant: "secondary" });

  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);
  const created_at = new Date(date);

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
        {title[locale] !== undefined ? title[locale] : title["fr"]}
      </Heading>
      <Box display="flex" alignItems="baseline" p="2">
        {Math.floor(new Date().valueOf() / 1000) - 604800 <
          Math.floor(created_at.valueOf() / 1000) && (
          <Badge borderRadius="full" px="2" colorScheme="twitter">
            {t("new")}
          </Badge>
        )}
        <Box
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          ml="2"
        >
          {t("by")} {creator} &bull; {formatDate(created_at)}
        </Box>
      </Box>
      <Divider />

      <Box p="2" fontSize="xl">
        <Collapse startingHeight={"120px"} in={show}>
          <Box textAlign="justify">
            <Parser locales={locales} content={content} />
          </Box>
        </Collapse>

        <Button size="sm" onClick={handleToggle} mt="1rem">
          {show ? t("show_less") : t("show_more")}
        </Button>
      </Box>
    </Box>
  );
};
