import { CheckIcon, AtSignIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Stack,
  Flex,
  Box,
  Heading,
  FormControl,
  Text,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  FormErrorMessage,
  InputRightElement,
  IconButton,
  Button,
  Link,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Formik, Form, Field } from "formik";
import { useState, useId } from "react";
import { RiUser3Line, RiKeyLine } from "react-icons/ri";
import { useUser } from "../../hooks/useUser";
import {
  PasswordEvaluation,
  PasswordEvaluationBar,
} from "./PasswordEvaluationBar";

export const FormSignUp = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [passwordEval, setPasswordEval] = useState<PasswordEvaluation>(null);
  const username_id = useId();
  const email_id = useId();
  const password_id = useId();
  const { signUpWithEmail } = useUser();
  const [isSuccess, setIsSuccess] = useState(false);

  function validateRequired(value: string): string {
    let err: string;
    if (!value) err = `Champs requis`;
    return err;
  }

  function validatePassword(value: string): string {
    let err: string;
    let pe: PasswordEvaluation = {
      size: false,
      caps: false,
      special_character: false,
      digits: false,
    };
    if (!value) {
      setPasswordEval(null);
      return `Champs requis`;
    }

    if (value.length > 6) pe.size = true;

    if (value.toLowerCase() !== value) pe.caps = true;

    if (/\d/.test(value)) pe.digits = true;

    if (/[$&+,:;=?@#|'<>.^*()%!-/]/.test(value)) pe.special_character = true;
    setPasswordEval(pe);
    return err;
  }

  if (isSuccess) {
    return (
      <Stack marginY={6}>
        <Flex justifyContent="center">
          <Box
            bgGradient="radial(green.500, green.300)"
            padding={6}
            borderRadius="full"
          >
            <CheckIcon fontSize="32px" color="#FFFFFF" />
          </Box>
        </Flex>
        <Flex alignItems="center" direction="column">
          <Flex direction="column">
            <Heading fontSize="xl">
              Confirmer votre adresse email en vous rendant sur le lien envoyé
            </Heading>
            <Text>Peut arrivé dans les spams</Text>
          </Flex>
        </Flex>
      </Stack>
    );
  }
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      onSubmit={async (values, actions) => {
        const { username, email, password } = values;
        let fieldError = false;
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          actions.setFieldError(
            "email",
            "You have entered an invalid email address"
          );
          fieldError = true;
        }
        if (username.length < 2) {
          actions.setFieldError("username", "Username is too short");
          fieldError = true;
        }
        if (username.length > 12) {
          actions.setFieldError("username", "Username is too long");
          fieldError = true;
        }
        if (password.length < 6) {
          actions.setFieldError("password", "Password is too short");
          fieldError = true;
        }
        if (fieldError) {
          actions.setSubmitting(false);
          return;
        }

        const { user, session, error } = await signUpWithEmail({
          email,
          password,
          username,
        });
        if (error) {
          switch (error.message) {
            case "User already registered":
              actions.setFieldError("email", error.message);
              actions.setSubmitting(false);
              return;
            default:
              actions.setFieldError("email", error.message);
              actions.setSubmitting(false);
              return;
          }
        } else {
          setIsSuccess(true);
        }
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Field name="username" validate={validateRequired}>
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.username && form.touched.username}
              >
                <FormLabel htmlFor={username_id}>Username</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<RiUser3Line />}
                  />
                  <Input {...field} id={username_id} />
                </InputGroup>
                <FormErrorMessage>{form.errors.username}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="email" validate={validateRequired}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.email && form.touched.email}>
                <FormLabel htmlFor={email_id}>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<AtSignIcon />}
                  />
                  <Input {...field} id={email_id} />
                </InputGroup>
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="password" validate={validatePassword}>
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.password && form.touched.password}
              >
                <FormLabel htmlFor={password_id}>Mot de passe</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<RiKeyLine />}
                  />
                  <Input
                    {...field}
                    id={password_id}
                    type={show ? "text" : "password"}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label="Toggle show password"
                      icon={show ? <ViewIcon /> : <ViewOffIcon />}
                      onClick={handleClick}
                      variant="ghost"
                    />
                  </InputRightElement>
                </InputGroup>
                {passwordEval && (
                  <PasswordEvaluationBar evaluation={passwordEval} />
                )}
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Stack marginTop={8} width="100%">
            <Button
              isLoading={props.isSubmitting}
              type="submit"
              w="100%"
              borderRadius="full"
            >
              S'inscrire
            </Button>
            <Wrap fontSize="xs">
              <Text>En vous inscrivant, vous acceptez nos</Text>
              <NextLink href="/tos" passHref>
                <Link color="twitter.700" isExternal>
                  Conditions d'utilisation
                </Link>
              </NextLink>
              <Text>et notre</Text>
              <NextLink href="/privacy" passHref>
                <Link color="twitter.700" isExternal>
                  Politique de confidentialité
                </Link>
              </NextLink>
            </Wrap>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
