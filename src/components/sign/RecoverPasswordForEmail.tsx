import { AtSignIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "next-i18next";
import { useId, useRef } from "react";
import { useUser } from "../../hooks/useUser";

export const RecoverPasswordForEmail = () => {
  const { t } = useTranslation(["sign"]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const email_id = useId();
  const initialRef = useRef(null);
  const { recoverPassword } = useUser();
  return (
    <>
      <Button borderRadius="full" variant="outline" w="100%" onClick={onOpen}>
        {t("ForgotPassword")}
      </Button>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>{t("AccountRecovery")}</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{ email: "" }}
              onSubmit={async (values, actions) => {
                const { email } = values;
                let fieldError = false;
                if (
                  !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                ) {
                  actions.setFieldError("email", t("error.InvalidEmail"));
                  fieldError = true;
                }

                if (fieldError) {
                  actions.setSubmitting(false);
                  return;
                }
                const { data, error } = await recoverPassword(email);
                if (error) {
                  switch (error.message) {
                    case "User not found":
                      actions.setFieldError("email", t("error.UserNotFound"));
                      actions.setSubmitting(false);
                      return;
                    case "for security purposes, you can only request this once every 60 seconds":
                      actions.setFieldError("email", t("error.MaxRequest"));
                      actions.setSubmitting(false);
                      return;
                    default:
                      actions.setFieldError("email", error.message);
                      actions.setSubmitting(false);
                      return;
                  }
                }
                actions.setSubmitting(false);
                onClose();
              }}
            >
              {(props) => (
                <Form>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel htmlFor={email_id}>{t("Email")}</FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<AtSignIcon />}
                          />
                          <Input {...field} id={email_id} ref={initialRef} />
                        </InputGroup>
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Flex alignItems="center" direction="row-reverse">
                    <Button
                      marginY={2}
                      isLoading={props.isSubmitting}
                      borderRadius="full"
                      type="submit"
                    >
                      {t("Send")}
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
