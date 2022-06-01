export interface Player {
  avatar: number;
  consecutives: number;
  elo: number;
  id: string;
  name: string;
  visible: boolean;
}

export type PROTOCOLType = {
  [key: string]: PROTOCOL;
};

export type PROTOCOL =
  | "toConfirm"
  | "toValidate"
  | "toOver"
  | "OpponentLeft"
  | "askConfirm"
  | "askURL"
  | "askUuid"
  | "sendURL"
  | "askOver"
  | "reconnection"
  | "ReponseConfirm"
  | "ResponseValidate"
  | "ResponseURL"
  | "ResponseOver"
  | "ConfirmOver"
  | "Over"
  | "ForcedDisconnection"
  | "Reconnection"
  | "Register"
  | "sendConnection"
  | "AlreadyIn"
  | "Unregister"
  | "Forfeit"
  | "QuitQueue"
  | "ForceQuit";
