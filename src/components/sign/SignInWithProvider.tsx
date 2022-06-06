import { Stack, Button, Flex, Divider, Heading } from "@chakra-ui/react";
import { FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useUser } from "../../hooks/useUser";

export const SignInWithProvider = ({ method }) => {
  const { signInWithProvider } = useUser();

  return (
    <Stack alignItems="center">
      <Stack direction="row">
        <Button
          onClick={async () => {
            return await signInWithProvider("google");
          }}
          borderRadius="full"
          leftIcon={<FcGoogle />}
          backgroundColor="#FFFFFF"
          color="brand.600"
          fontFamily="roboto"
          fontWeight={500}
          _hover={{ backgroundColor: "#E8E8E8" }}
          _active={{ backgroundColor: "#D4D4D4" }}
        >
          {method === "signIn"
            ? "Se connecter avec Google"
            : "S'inscrire avec Google"}
        </Button>
        <Button
          onClick={async () => {
            return await signInWithProvider("discord");
          }}
          borderRadius="full"
          leftIcon={<FaDiscord />}
          backgroundColor="#2C2F33"
          color="brand.100"
          fontFamily="roboto"
          fontWeight={500}
          _hover={{ backgroundColor: "#23272A" }}
          _active={{ backgroundColor: "#181A1C" }}
        >
          {method === "signIn"
            ? "Se connecter avec Discord"
            : "S'inscrire avec Discord"}
        </Button>
      </Stack>
      <Flex alignItems="center" width="100%">
        <Divider />
        <Heading marginX={6} fontSize="lg">
          ou
        </Heading>
        <Divider />
      </Flex>
    </Stack>
  );
};
