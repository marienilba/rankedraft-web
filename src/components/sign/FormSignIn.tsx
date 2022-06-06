import { AtSignIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  FormErrorMessage,
  InputRightElement,
  IconButton,
  Flex,
  Button,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "next-i18next";
import { useState, useId } from "react";
import { RiKeyLine } from "react-icons/ri";
import { useUser } from "../../hooks/useUser";

export const FormSignIn = () => {
  const { t } = useTranslation(["sign"]);

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [isRedirect, setIsRedirect] = useState(false);
  const email_id = useId();
  const password_id = useId();

  const { signInWithEmail } = useUser();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values, actions) => {
        const { email, password } = values;
        let fieldError = false;
        if (password === "") {
          actions.setFieldError("password", t("error.Required"));
          fieldError = true;
        } else if (password.length < 6) {
          actions.setFieldError("password", t("error.PasswordTooShort"));
          fieldError = true;
        }
        if (email === "") {
          actions.setFieldError("email", t("error.Required"));
          fieldError = true;
        } else if (
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        ) {
          actions.setFieldError("email", t("error.InvalidEmail"));
          fieldError = true;
        }

        if (fieldError) {
          actions.setSubmitting(false);
          return;
        }

        const { user, session, error } = await signInWithEmail({
          email,
          password,
        });

        if (error) {
          switch (error.message) {
            case "Email not confirmed":
              actions.setFieldError("email", t("error.EmailNotConfirmed"));
              actions.setSubmitting(false);
              return;
            case "Invalid login credentials":
              actions.setFieldError("password", t("error.InvalidLogin"));
              actions.setSubmitting(false);
              return;
            default:
              actions.setFieldError("password", error.message);
              actions.setSubmitting(false);
              return;
          }
        }

        setIsRedirect(true);
      }}
    >
      {(props) => (
        <Form>
          <Field name="email">
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
          <Field name="password">
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
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Flex marginTop={4} width="100%">
            <Button
              isLoading={props.isSubmitting || isRedirect}
              type="submit"
              w="100%"
              borderRadius="full"
            >
              {t("SignIn")}
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
