import { Stack, Divider } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchRank } from "../../queries/Ladder";
import { useUser } from "../../hooks/useUser";
import { ErrorButton } from "../ErrorButton";
import { LadderLine } from "./LadderLine";

export const MyRank = () => {
  const { user } = useUser();
  const { data, isError, isSuccess, isLoading, refetch } = useQuery(
    ["ladder", user?.id],
    fetchRank
  );

  return (
    <>
      {isError && <ErrorButton refetch={refetch} />}
      <Stack>
        {data && isSuccess && (
          <LadderLine
            player={{
              ...data,
              profile: { id: data.id, name: data.name, avatar: data.avatar },
            }}
            position={data.rank_position}
          />
        )}
      </Stack>
      <Divider />
    </>
  );
};
