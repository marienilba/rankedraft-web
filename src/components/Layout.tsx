import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import { Fragment } from "react";
import { useTitle } from "../hooks/useTitle";

export const Layout = ({
  children,
  direction,
}: {
  children: any;
  direction?: "column" | "row";
}) => {
  const { title } = useTitle();
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
      </Head>
      <Flex direction={direction || "row"}>{children}</Flex>
    </Fragment>
  );
};
