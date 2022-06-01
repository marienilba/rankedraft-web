import { Box, Flex, Progress } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";

export const LoadingTopBar = () => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(true);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <Fragment>
      {isLoading ? (
        <Flex
          position="absolute"
          h="100%"
          top={0}
          left={0}
          margin={0}
          padding={0}
          pointerEvents="none"
        >
          <Progress
            size="xs"
            isIndeterminate
            colorScheme="gray"
            sx={{ position: "sticky", top: "0" }}
            width="100vw"
          />
        </Flex>
      ) : (
        <Fragment></Fragment>
      )}
    </Fragment>
  );
};
