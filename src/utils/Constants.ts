import { PROTOCOLType } from "../components/ranked/ranked_module/Types";

export const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:4000";
export const PROTOCOL: PROTOCOLType = {
  TO_CONFIRM: "toConfirm",
  TO_VALIDATE: "toValidate",
  TO_OVER: "toOver",
  OPPONENT_LEFT: "OpponentLeft",
  ASK_CONFIRM: "askConfirm",
  ASK_URL: "askURL",
  ASK_UUID: "askUuid",
  SEND_URL: "sendURL",
  ASK_OVER: "askOver",
  RECONNECTION: "reconnection",
  RESPONSE_CONFIRM: "ReponseConfirm",
  RESPONSE_VALIDATE: "ResponseValidate",
  RESPONSE_URL: "ResponseURL",
  RESPONSE_OVER: "ResponseOver",
  CONFIRM_OVER: "ConfirmOver",
  SEND_OVER: "Over",
  FORCED_DISCONNECTION: "ForcedDisconnection",
  RESPONSE_RECONNECTION: "Reconnection",
  REGISTER: "Register",
  SEND_CONNECTION: "sendConnection",
  SEND_ALREADYIN: "AlreadyIn",
  UNREGISTER: "Unregister",
  FORFEIT: "Forfeit",
  QUIT_QUEUE: "QuitQueue",
  FORCEQUIT: "ForceQuit",
};

export const zIndexPriority = {
  Navigation: { zIndex: 666 },
  MobileBarBackground: { zIndex: 664 },
  MobileBarLogo: { zIndex: 665 },
  ProfileBackground: { zIndex: 0 },
  ProfileOverlap: { zIndex: 1 },
};
