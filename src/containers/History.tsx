import { ArrowUpIcon } from "@chakra-ui/icons";
import {
  useBoolean,
  useDisclosure,
  Flex,
  Stack,
  Divider,
  Heading,
  Button,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import isEqual from "lodash.isequal";
import { useTranslation } from "next-i18next";
import { useState, useCallback, useEffect, Fragment } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { DraftView } from "../components/draft/DraftView";
import { ErrorButton } from "../components/ErrorButton";
import { HistoryLine } from "../components/history/HistoryLine";
import { Options } from "../components/history/Options";
import { LoadingTopBar } from "../components/LoadingTopBar";
import { PageHeading } from "../components/PageHeading";
import useLocalStorage from "../hooks/useLocalStorage";
import { useUser } from "../hooks/useUser";
import { useWindowSize } from "../hooks/useWindowSize";
import {
  fetchHistories,
  HistoryLine as Draft,
  Options as OptionsType,
} from "../queries/History";
import { Container } from "./Container";

export const History = () => {
  const { t } = useTranslation(["history", "common"]);
  const { user } = useUser();
  const { isMobile } = useWindowSize();
  const [isFullComment, setIsFullComment] = useBoolean(false);
  useHotkeys("shift+f", () => setIsFullComment.toggle());

  const [Settings] = useLocalStorage("user-settings", null);
  const [selectedDraft, setSelectedDraft] = useState<Draft>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { ref, inView } = useInView();
  const { ref: UpButtonRef, inView: UpButtonInView } = useInView();
  const [options, setOptions] = useState<OptionsType>({
    team_id: null,
    pseudo: null,
    map_id: null,
    letter: null,
    initiative: null,
    is_kta: null,
    start_date: null,
    end_date: null,
    result: null,
    tags: null,
  });

  const [search, setSearch] = useState({
    compo: null,
    respect_order: null,
    respect_compo: null,
  });

  const handleSearch = useCallback((opts: OptionsType, sch, force = false) => {
    if (
      !force &&
      isEqual(options, opts) &&
      isEqual(search, {
        ...sch,
        compo: sch.compo
          ? JSON.stringify(sch.compo) === "null"
            ? null
            : JSON.stringify(sch.compo)
          : null,
      })
    )
      return;

    setOptions(opts);
    setSearch({
      ...sch,
      compo: sch.compo
        ? JSON.stringify(sch.compo) === "null"
          ? null
          : JSON.stringify(sch.compo)
        : null,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    refetch();
  }, []);

  useEffect(() => {
    if (Settings) {
      if (Settings.hasOwnProperty("lt")) {
        if (Settings.lt !== null || Settings.lt !== undefined) {
          let lt;
          try {
            lt = JSON.parse(Settings.lt);
          } catch (e) {
            lt = { id: "", team_name: t("all", { ns: "common" }) };
          }
          setOptions({ ...options, team_id: lt.id ? lt.id : null });
        }
      }
    }
  }, [Settings]);

  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(
    [
      "history",
      options.team_id,
      options.pseudo,
      options.map_id,
      options.result,
      options.letter,
      options.is_kta,
      options.initiative,
      options.start_date,
      options.end_date,
      options.tags,
      search.compo,
      search.respect_order,
      search.respect_compo,
    ],
    fetchHistories,
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
      getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    }
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const handleOpenHistory = useCallback((d) => {
    setSelectedDraft(d);
    onOpen();
  }, []);

  return (
    <Container>
      <Stack ref={UpButtonRef}>
        <PageHeading>{t("page.history", { ns: "common" })}</PageHeading>
        <Options onSearch={handleSearch} isFetching={isFetching} />
      </Stack>
      <Divider mt={5} marginX={5} />
      {status === "loading" ? (
        <LoadingTopBar />
      ) : status === "error" ? (
        <ErrorButton refetch={refetch} />
      ) : (
        <Stack width="100%" padding={!isMobile ? 7 : 0}>
          {data?.pages.map((page, idx) => {
            if (!page.histories) return <></>;
            return (
              <Fragment key={`page-${idx}-next-${page.nextId}`}>
                {page.histories.length === 0 && (
                  <Flex width="100%" justifyContent="center">
                    <Heading textAlign="center" fontSize="md">
                      {t("no_match")}
                    </Heading>
                  </Flex>
                )}
                {page.histories.map((draft, idx: number) => {
                  return (
                    <HistoryLine
                      draft={draft}
                      onOpen={handleOpenHistory}
                      isFullwidth={isFullComment}
                      key={`history_line-${idx}-${draft.id}`}
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
          {isFetching && !isFetchingNextPage && (
            <Flex w="100%" alignContent="center" alignItems="center">
              <LoadingTopBar />
            </Flex>
          )}
        </Stack>
      )}
      {selectedDraft && (
        <DraftView isOpen={isOpen} onClose={onClose} draft={selectedDraft} />
      )}
    </Container>
  );
};
