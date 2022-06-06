import { Flex, Stack, Heading, Divider, Link } from "@chakra-ui/react";
import { useState } from "react";
import { ChangelogCard } from "../components/news/ChangelogCard";
import { DevblogCard } from "../components/news/DevblogCard";
import { NewCard } from "../components/news/NewCard";
import { NewsData, ChangelogsData, DevblogsData } from "../pages/home/Data";

export const News = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const news = NewsData;
  const changelogs = ChangelogsData;
  const devblogs = DevblogsData;
  return (
    <Flex>
      <Flex flex={0.5} justifyContent="flex-end">
        <Stack
          spacing={2}
          marginRight={7}
          position="sticky"
          top="40px"
          height="200px"
          marginTop={12}
        >
          <Heading
            fontSize="2xl"
            as={Link}
            onClick={() => setTabIndex(0)}
            fontWeight={tabIndex === 0 ? 800 : 600}
            letterSpacing={tabIndex === 0 ? -0.9 : 0}
          >
            News
          </Heading>
          <Heading
            fontSize="2xl"
            as={Link}
            onClick={() => setTabIndex(1)}
            fontWeight={tabIndex === 1 ? 800 : 600}
            letterSpacing={tabIndex === 1 ? -0.9 : 0}
          >
            Changelogs
          </Heading>
          <Heading
            fontSize="2xl"
            as={Link}
            onClick={() => setTabIndex(2)}
            fontWeight={tabIndex === 2 ? 800 : 600}
            letterSpacing={tabIndex === 2 ? -0.9 : 0}
          >
            Devblogs
          </Heading>
        </Stack>

        <Divider orientation="vertical" />
      </Flex>
      <Flex flex={1} justifyContent="center">
        <Stack padding={7} width="100%">
          {tabIndex === 0 && (
            <>
              {news.map(
                ({ content, created_at, title, creator, imageUri }, index) => (
                  <NewCard
                    content={content}
                    created_at={created_at}
                    title={title}
                    creator={creator}
                    imageUri={imageUri}
                    key={`new-card-${index}`}
                  />
                )
              )}
            </>
          )}
          {tabIndex === 1 && (
            <>
              {changelogs.map(({ version, created_at, logs }, index) => (
                <ChangelogCard
                  version={version}
                  created_at={created_at}
                  logs={logs}
                  key={`changelog-card-${index}`}
                />
              ))}
            </>
          )}
          {tabIndex === 2 && (
            <>
              {devblogs.map(
                ({ content, created_at, title, creator, imageUri }, index) => (
                  <DevblogCard
                    content={content}
                    created_at={created_at}
                    title={title}
                    creator={creator}
                    imageUri={imageUri}
                    key={`devblog-card-${index}`}
                  />
                )
              )}
            </>
          )}
        </Stack>
      </Flex>
    </Flex>
  );
};
