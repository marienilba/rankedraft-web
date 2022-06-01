import { Text, Flex, Heading, Wrap, WrapItem, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { ModalStats } from "../../components/stats/ModalStats";
import { fetchRawStats } from "../../queries/Stats";
import { BreedGlobaleWinrate } from "../../components/stats/nivo/BreedGlobaleWinrate";
import { PathPicksBans } from "../../components/stats/nivo/PathPicksBans";
import { Activities } from "../../components/stats/nivo/Activities";
import { DateWinrate } from "../../components/stats/nivo/DateWinrate";
import { BreedMapWinrate } from "../../components/stats/nivo/BreedMapWinrate";
import { ResponseToFPB } from "../../components/stats/nivo/ResponseToFPB";
import { BreedsWinrate } from "../../components/stats/nivo/BreedsWinrate";
import { FPWinrate } from "../../components/stats/nivo/FPWinrate";
import { RepartitionsPicksBans } from "../../components/stats/nivo/RepartitionsPicksBans";
import { PageHeading } from "../../components/PageHeading";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Index = () => {
  // const { query } = useRouter();
  // const {
  //   pseudo,
  //   team_id,
  //   map_id,
  //   result,
  //   letter,
  //   is_kta,
  //   initiative,
  //   start_date,
  //   end_date,
  //   compo,
  //   respect_order,
  // } = query;

  // const { isLoading, data, isSuccess, isError } = useQuery(
  //   [
  //     "raw/stats",
  //     pseudo,
  //     team_id,
  //     map_id,
  //     result,
  //     letter,
  //     is_kta,
  //     initiative,
  //     start_date,
  //     end_date,
  //     compo,
  //     respect_order,
  //   ],
  //   () =>
  //     fetchRawStats({
  //       options: {
  //         pseudo,
  //         team_id,
  //         map_id,
  //         result,
  //         letter,
  //         is_kta,
  //         initiative,
  //         start_date,
  //         end_date,
  //       },
  //       search: { compo, respect_order },
  //     })
  // );

  // if (!data) {
  //   return <></>;
  // }
  return (
    <Flex mt={10} direction="column" w="100%" paddingX={7}>
      {/* <Stack marginY={5}>
        <PageHeading>Statistiques détailées</PageHeading>
        <Heading fontSize="md" textAlign="center">
          ⚠️ La page des statistiques détailées est encore en évolution
        </Heading>
        <Text textAlign="center">
          Si vous voulez contribuer à cette page, vous pouvez voir le format des
          données sur le github.
        </Text>
      </Stack>
      <ModalStats
        options={{
          pseudo,
          team_id,
          map_id,
          result,
          letter,
          is_kta,
          initiative,
          start_date,
          end_date,
        }}
        search={{ compo, respect_order }}
      />
      <>
        <Heading textAlign="center">Evolution du winrate</Heading>
        <Wrap>
          <WrapItem alignItems="center">
            <Heading fontSize="md">Explication: </Heading>
          </WrapItem>
          <WrapItem>
            <Text>
              Winrate du total des matchs effectués pour chaque team par date
            </Text>
          </WrapItem>
        </Wrap>
        <DateWinrate stats={data} />
      </>
      <>
        <Heading textAlign="center">Winrates globales de chaque classe</Heading>
        <Wrap>
          <WrapItem alignItems="center">
            <Heading fontSize="md">Explication: </Heading>
          </WrapItem>
          <WrapItem>
            <Text>Calcul le winrate globale pour chaque classe.</Text>
          </WrapItem>
          <WrapItem>
            <Text>Se répresente par % = wins de Classe / total des matchs</Text>
          </WrapItem>
        </Wrap>
        <BreedGlobaleWinrate stats={data} />
      </>
      <>
        <Heading textAlign="center">Winrate entre chaque classe</Heading>
        <Wrap>
          <WrapItem alignItems="center">
            <Heading fontSize="md">Explication: </Heading>
          </WrapItem>
          <WrapItem>
            <Text>Calcul de winrate pour chaque classe entre elles.</Text>
            <WrapItem>
              <Text>
                Les % se représente sous la forme Classe 1 contre Classe 2 =
                Winrate de Classe 1
              </Text>
            </WrapItem>
          </WrapItem>
        </Wrap>
        <BreedsWinrate stats={data} />
      </>
      <>
        <Heading textAlign="center">Winrate des classes selon la map</Heading>
        <Wrap>
          <WrapItem alignItems="center">
            <Heading fontSize="md">Explication: </Heading>
          </WrapItem>
          <WrapItem>
            <Text>Calcul de winrate pour chaque classe sur chaque map.</Text>
            <WrapItem>
              <Text>
                Les % se représente sous la forme Classe 1 sur Map = Winrate de
                Classe 1
              </Text>
            </WrapItem>
          </WrapItem>
        </Wrap>
        <BreedMapWinrate stats={data} />
      </>
      <>
        <Heading textAlign="center">Winrate des first picks</Heading>
        <Wrap>
          <WrapItem alignItems="center">
            <Heading fontSize="md">Explication: </Heading>
          </WrapItem>
          <WrapItem>
            <Text>
              Récupère chaque premiers picks de chaque draft, puis calcul le
              winrate pour chacunes d'elle face à chaque autre.
            </Text>
          </WrapItem>
          <WrapItem>
            <Text>
              Les % se représente sous la forme Classe 1 contre Classe 2 =
              Winrate de Classe 1
            </Text>
          </WrapItem>
        </Wrap>
        <FPWinrate stats={data} />
      </>
      <>
        <Heading textAlign="center">Répartitions de mes picks/bans</Heading>
        <Wrap>
          <WrapItem alignItems="center">
            <Heading fontSize="md">Explication: </Heading>
          </WrapItem>
          <WrapItem>
            <Text>
              Fréquences dans mes picks et bans, la taille d'un point est
              exponnentiel à sa réccurrence, et l'éloignement à sa position
            </Text>
          </WrapItem>
          <WrapItem>
            <Text>
              Se répresénte sous la forme : B (ban) ou P (pick) (Classe)
              (Position)
            </Text>
          </WrapItem>
        </Wrap>
        <RepartitionsPicksBans stats={data} />
      </>
      <>
        <Heading textAlign="center">
          Répartitions des first picks ou first bans
        </Heading>
        <Wrap>
          <WrapItem alignItems="center">
            <Heading fontSize="md">Explication: </Heading>
          </WrapItem>
          <WrapItem>
            <Text>
              Fréquences dans mes picks et bans, le cercle intérieur correspond
              au pick/ban de A, le cercle extérieur au deuxiéme de B.
            </Text>
          </WrapItem>
          <WrapItem>
            <Text>
              Chaque cercle à un total de 100%, il est plus simple de se fier à
              la taille que prend la classe.
            </Text>
          </WrapItem>
        </Wrap>
        <ResponseToFPB stats={data} />
      </>
      <>
        <Heading textAlign="center">Chemins des drafts</Heading>
        <Wrap>
          <WrapItem alignItems="center">
            <Heading fontSize="md">Explication: </Heading>
          </WrapItem>
          <WrapItem>
            <Text>
              Réprésentation des chemins de chacun de mes picks et mes bans, la
              grosseur d'un chemin est exponnentiel à sa réccurrence
            </Text>
          </WrapItem>
          <WrapItem>
            <Text>
              Se répresénte sous la forme :_ + ... + B (ban) ou P (pick)
              (Classe)
            </Text>
          </WrapItem>
        </Wrap>
        <PathPicksBans stats={data} />
      </>
      <>
        <Heading textAlign="center">Activité</Heading>
        <Wrap>
          <WrapItem alignItems="center">
            <Heading fontSize="md">Explication: </Heading>
          </WrapItem>
          <WrapItem>
            <Text>Nombre de matchs effectués par date</Text>
          </WrapItem>
        </Wrap>
        <Activities stats={data} />
      </> */}
    </Flex>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "stats"])),
    },
  };
}

export default Index;
