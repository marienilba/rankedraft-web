import { AtSignIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useId,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RiKeyLine } from "react-icons/ri";
import { PasswordEvaluationBar } from "../..";
import { Navigation } from "../../../components/navigation/Navigation";
import { useUser } from "../../../hooks/useUser";
import { paramsToObject } from "../../../utils/HelpersFunction";

const Index = () => {
  const [token, setToken] = useState<string>(null);
  const { asPath } = useRouter();

  useEffect(() => {
    try {
      const params = paramsToObject(asPath.split("#")[1]);
      if (params) {
        const { access_token } = params;
        access_token && setToken(access_token);
      }
    } catch (error) {}
  }, []);

  return (
    <Flex>
      <Navigation />
      <Flex width="100%" justifyContent="center">
        <UpdatePassword token={token} />
      </Flex>
    </Flex>
  );
};

type PasswordEvaluation = {
  size: boolean;
  caps: boolean;
  special_character: boolean;
  digits: boolean;
};

const UpdatePassword = ({ token }) => {
  const password_id = useId();
  const confirmation_id = useId();

  const router = useRouter();
  const [isRedirect, setIsRedirect] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { resetPassword } = useUser();
  const [passwordEval, setPasswordEval] = useState<PasswordEvaluation>(null);

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

  return (
    <Flex direction="column" padding={6}>
      <Heading>Réinitialiser mon mot de passe</Heading>
      <Formik
        initialValues={{ password: "", confirmation: "" }}
        onSubmit={async (values, actions) => {
          const { password, confirmation } = values;
          let fieldError = false;

          if (password.length < 6) {
            actions.setFieldError("password", "Password is too short");
            fieldError = true;
          }

          if (password !== confirmation) {
            actions.setFieldError("confirmation", "Passwords need to be same.");

            fieldError = true;
          }

          if (fieldError) {
            actions.setSubmitting(false);
            return;
          }
          const { user, data, error } = await resetPassword(token, password);

          if (error) {
            switch (error.message) {
              default:
                actions.setFieldError("email", error.message);
                actions.setSubmitting(false);
                return;
            }
          }
          setIsRedirect(true);
          router.push("/home");
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form>
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
            <Field name="confirmation">
              {({ field, form }) => (
                <FormControl
                  isInvalid={
                    form.errors.confirmation && form.touched.confirmation
                  }
                >
                  <FormLabel htmlFor={confirmation_id}>
                    Confirmer le mot de passe
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<RiKeyLine />}
                    />
                    <Input
                      {...field}
                      id={confirmation_id}
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
                  <FormErrorMessage>
                    {form.errors.confirmation}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Flex alignItems="center" direction="row-reverse">
              <Button
                isDisabled={!token}
                marginY={2}
                isLoading={props.isSubmitting || isRedirect}
                borderRadius="full"
                type="submit"
              >
                Réinitialiser
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home"])),
    },
  };
}

export default Index;
