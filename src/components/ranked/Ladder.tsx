import {
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { fetchLadder } from "../../queries/Ladder";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { useInView } from "react-intersection-observer";
import { LoadingTopBar } from "../LoadingTopBar";
import { ErrorButton } from "../ErrorButton";
import { useWindowSize } from "../../hooks/useWindowSize";
import { LadderLine } from "./LadderLine";
import { Fragment, useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import { MyRank } from "./MyRank";
import { useTranslation } from "next-i18next";

export const Ladder = () => {
  const { user } = useUser();
  const { ref, inView } = useInView();
  const { ref: UpButtonRef, inView: UpButtonInView } = useInView();
  const { isMobile } = useWindowSize();
  const { t } = useTranslation(["ranked", "common"]);

  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(["ladder"], fetchLadder, {
    getPreviousPageParam: (firstPage) => firstPage?.previousId ?? undefined,
    getNextPageParam: (lastPage) => lastPage?.nextId ?? undefined,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <Stack>
      <Heading textAlign="center" ref={UpButtonRef}>
        {t("ladder.title")}
      </Heading>
      <Stack>
        <Stack direction="row" paddingX={isMobile ? 0 : 5}>
          <Flex justifyContent="center" alignItems="center" width="2.5rem">
            <Heading fontSize="lg">{t("ladder.rank")}</Heading>
          </Flex>
          <Divider orientation="vertical" />
          <Flex width={!isMobile ? "5rem" : "1rem"}></Flex>
          <Flex justifyContent="center" alignItems="center">
            <Heading fontSize="md" noOfLines={0}>
              {t("ladder.username")}
            </Heading>
          </Flex>
          <Flex width={!isMobile ? "5rem" : "3rem"}></Flex>
          <Flex justifyContent="center" alignItems="center">
            <Heading fontSize="md">Elo</Heading>
          </Flex>
          <Flex width={!isMobile ? "3rem" : "1rem"}></Flex>
          <Flex justifyContent="center" alignItems="center">
            <Heading fontSize="md" textAlign="center">
              {t("ladder.strikes")}
            </Heading>
          </Flex>
        </Stack>
        {user && <MyRank />}
        {status === "loading" ? (
          <>{/* <LoadingTopBar /> */}</>
        ) : status === "error" ? (
          <ErrorButton refetch={refetch} />
        ) : (
          <Stack>
            {data?.pages.map((page, idx) => {
              if (!page.lines) return <></>;
              return (
                <Fragment key={`page-${idx}-next-${page.nextId}`}>
                  {page.lines.length === 0 && (
                    <Flex width="100%" justifyContent="center">
                      <Heading textAlign="center" fontSize="md">
                        {t("ladder.no_player")}
                      </Heading>
                    </Flex>
                  )}
                  {page.lines.map((player, idx: number) => {
                    return (
                      <LadderLine
                        key={`ladder-player-${player.id}-line-${idx}`}
                        player={player}
                        position={idx + 1}
                      />
                    );
                  })}
                </Fragment>
              );
            })}
            <Flex alignItems="center" width="100%">
              <Button
                ref={ref}
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? t("loading", { ns: "common" })
                  : hasNextPage
                  ? t("loading", { ns: "common" })
                  : t("no_more_load", { ns: "common" })}
              </Button>
              <Spacer />
              <IconButton
                hidden={UpButtonInView}
                colorScheme="green"
                aria-label="Remonter haut de page"
                icon={<ArrowUpIcon />}
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              />
            </Flex>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
