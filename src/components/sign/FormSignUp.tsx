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
import { useTranslation } from "next-i18next";

export const FormSignUp = () => {
  const { t } = useTranslation(["sign"]);
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
    if (!value) err = t("error.Required");
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
      return t("error.Required");
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
          <Flex direction="column" alignItems="center">
            <Wrap justify="center">
              <Heading size="sm">{t("ConfirmEmail1")} </Heading>
              <Heading size="sm">{t("ConfirmEmail2")}</Heading>
            </Wrap>
            <Text>{t("CheckSpam")}</Text>
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
          actions.setFieldError("email", t("error.InvalidEmail"));
          fieldError = true;
        }
        if (username.length < 2) {
          actions.setFieldError("username", t("error.UsernameTooShort"));
          fieldError = true;
        }
        if (username.length > 12) {
          actions.setFieldError("username", t("error.UsernameTooLong"));
          fieldError = true;
        }
        if (password.length < 6) {
          actions.setFieldError("password", t("error.PasswordTooShort"));
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
              actions.setFieldError("email", t("error.AlreadyUser"));
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
                <FormLabel htmlFor={username_id}>{t("Username")}</FormLabel>
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
                <FormLabel htmlFor={email_id}>{t("Email")}</FormLabel>
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
                <FormLabel htmlFor={password_id}>{t("Password")}</FormLabel>
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
              {t("SignUp")}
            </Button>
            <Wrap fontSize="xs">
              <Text>{t("SignUpAgree")}</Text>
              <NextLink href="/tos" passHref>
                <Link color="twitter.700" isExternal>
                  {t("TermOfUse")}
                </Link>
              </NextLink>
              <Text>{t("AndOur")}</Text>
              <NextLink href="/privacy" passHref>
                <Link color="twitter.700" isExternal>
                  {t("PrivacyPolicy")}
                </Link>
              </NextLink>
            </Wrap>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
