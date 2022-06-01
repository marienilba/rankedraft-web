import { useToast } from "@chakra-ui/react";
import { User } from "@supabase/supabase-js";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { Player } from "../components/ranked/ranked_module/Types";
import type { PROTOCOL as ProtocolStep } from "../components/ranked/ranked_module/Types";
import { PROTOCOL } from "../utils/Constants";
import { useAudio } from "./useAudio";
import useLocalStorage from "./useLocalStorage";
import { useSocket } from "./useSocket";
import { useTranslation } from "next-i18next";

type Handler = {
  Socket: () => void;
  Confirm: (OK: number) => void;
  QuitQueue: () => void;
  DraftInput: (e: any) => void;
  Validate: () => void;
  Over: (result: any) => void;
  Forfeit: () => void;
  ForceQuit: () => void;
  Reset: () => void;
};

export function useRanked(
  user: User
): [
  Handler,
  ProtocolStep,
  Player[],
  boolean,
  boolean,
  boolean,
  number,
  boolean,
  string,
  boolean
] {
  const [socket, launchSocket] = useSocket();
  const [packet, setPacket] = useState({ uuid: "" });
  const [step, setStep] = useState<ProtocolStep>(PROTOCOL.UNREGISTER);
  const [alreadyIn, setAlreadyIn] = useState<boolean>(false);
  const [inQueue, setInQueue] = useState<boolean>(false);
  const [shouldSend, setShouldSend] = useState<boolean>(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [draftURL, setDraftURL] = useState<string>("");
  const [hasAccepted, setHasAccepted] = useState<boolean | null>(null);
  const [hisResult, setHisResult] = useState<number>(0);
  const [invalidURL, setInvalidURL] = useState<boolean>(false);
  const [Settings, setSettings] = useLocalStorage("user-settings", null);
  const [isSfxDisabled, setIsSfxDisabled] = useState<boolean>(false);
  const toast = useToast();
  const {
    onPlay: onPlay543,
    onPause: onPause543,
    isPlaying: isPlaying543,
    isPaused: isPaused543,
    setVolume: setVolume543,
  } = useAudio("/sfx/Multimedia_543", { extension: "mp3", volume: 50 });

  const {
    onPlay: onPlay559,
    onPause: onPause559,
    isPlaying: isPlaying559,
    isPaused: isPaused559,
    setVolume: setVolume559,
  } = useAudio("/sfx/Multimedia_559", { extension: "mp3", volume: 50 });
  const {
    onPlay: onPlay583,
    onPause: onPause583,
    isPlaying: isPlaying583,
    isPaused: isPaused583,
    setVolume: setVolume583,
  } = useAudio("/sfx/Multimedia_583", { extension: "mp3", volume: 50 });
  const queryClient = useQueryClient();
  const { t } = useTranslation(["ranked"]);

  const handleSocket = useCallback(() => {
    if (!user) return;
    if (!socket.connected) socket.connect();
    launchSocket(user.id, false);
  }, [user, socket, launchSocket]);

  const handleConfirm = useCallback(
    (OK: number) => {
      if (!socket) return;
      if (OK) {
        setHasAccepted(true);
      }
      socket.emit(PROTOCOL.RESPONSE_CONFIRM, {
        ...packet,
        OK,
      });
    },
    [socket, packet]
  );

  const handleQuitQueue = useCallback(() => {
    if (!socket) return;
    socket.emit(PROTOCOL.QUIT_QUEUE, {});
  }, [socket]);

  const handleDraftInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!socket) return;
      if (!shouldSend) return;
      const text: string = e.target.value;
      if (
        text.includes("draft.ktarena.com/draft/invitation/") &&
        text.length <= 70 &&
        text.length >= 50
      ) {
        setInvalidURL(false);
        socket.emit(PROTOCOL.RESPONSE_URL, {
          ...packet,
          draft_url: text,
        });
        setDraftURL(text);
      } else {
        setInvalidURL(true);
      }
    },
    [socket, shouldSend, packet]
  );

  const handleValidate = useCallback(() => {
    if (!socket) return;
    if (shouldSend) return;
    if (!draftURL) return;
    socket.emit(PROTOCOL.RESPONSE_VALIDATE, {
      ...packet,
    });
  }, [socket, shouldSend, draftURL, packet]);

  const handleOver = useCallback(
    (result: any) => {
      if (!socket) return;
      socket.emit(PROTOCOL.RESPONSE_OVER, {
        ...packet,
        result,
      });
    },
    [socket, packet]
  );

  const handleForfeit = useCallback(() => {
    if (!socket) return;
    socket.emit(PROTOCOL.FORFEIT, {
      ...packet,
    });
  }, [socket, packet]);

  const handleForceQuit = useCallback(() => {
    if (!socket) return;
    if (!user) return;
    if (!packet.uuid) {
      socket.emit(PROTOCOL.FORCEQUIT, {
        uuid: PROTOCOL.FORCEQUIT,
        id: user.id,
      });
    } else {
      socket.emit(PROTOCOL.FORCEQUIT, {
        ...packet,
        id: user.id,
      });
    }
  }, [socket, user, packet]);

  const handleReset = useCallback(() => {
    setAlreadyIn(false);
    setPacket({ uuid: "" });
    setStep(PROTOCOL.UNREGISTER);
    setInQueue(false);
    setShouldSend(false);
    setPlayers([]);
    setDraftURL("");
    setHasAccepted(null);
    setHisResult(0);
    setInvalidURL(false);
  }, []);

  useEffect(() => {
    if (!user && step !== PROTOCOL.UNREGISTER) {
      handleForfeit();
    }
  }, [user]);

  const isMount: any = useRef();
  useEffect(() => {
    if (isMount.current === true) return;
    isMount.current = true;
    if (Settings) {
      let us = Settings["us"];
      if (us !== undefined) {
        setIsSfxDisabled(us);
      } else {
        setSettings({ ...Settings, us: false });
      }
    } else {
      setSettings({ us: false });
    }
  }, [Settings]);
  useEffect(() => {
    if (!socket) return;

    socket.on(PROTOCOL.ASK_UUID, (_) => {
      socket.emit(PROTOCOL.RESPONSE_RECONNECTION, {
        uuid: user.id,
      });
    });
    socket.on(PROTOCOL.SEND_CONNECTION, (data) => {
      data.res && setInQueue(true);
    });
    socket.on(PROTOCOL.ASK_CONFIRM, (data) => {
      setPacket({ uuid: data.uuid });
      let p = data.players;
      if (p[0].id !== user.id) {
        [p[0], p[1]] = [p[1], p[0]];
      }
      onPlay559();
      setPlayers(p);
      setHasAccepted(false);
      setStep(PROTOCOL.ASK_CONFIRM);
    });

    socket.on(PROTOCOL.ASK_URL, (data) => {
      setStep(PROTOCOL.ASK_URL);
      setShouldSend(data.shouldSend);
      !isSfxDisabled && onPlay583();
    });

    socket.on(PROTOCOL.SEND_URL, (data) => {
      setDraftURL(data.draft_url);
      !isSfxDisabled && onPlay583();
    });

    socket.on(PROTOCOL.ASK_OVER, (data) => {
      setStep(PROTOCOL.ASK_OVER);
    });

    socket.on(PROTOCOL.CONFIRM_OVER, (data) => {
      setStep(PROTOCOL.CONFIRM_OVER);
      setHisResult(data.result);
    });

    socket.on(PROTOCOL.SEND_OVER, (data) => {
      const result = data.result;
      queryClient.invalidateQueries(["ladder", user.id]);
      handleReset();
    });
    socket.on(PROTOCOL.OPPONENT_LEFT, (data) => {
      if (!toast.isActive(PROTOCOL.OPPONENT_LEFT)) {
        toast({
          id: PROTOCOL.OPPONENT_LEFT,
          title: t("module.opponent_left"),
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      !isSfxDisabled && onPlay543();
      handleReset();
      if (user) return;
      launchSocket(user.id, true);
    });

    socket.on(PROTOCOL.FORCED_DISCONNECTION, () => {
      socket.disconnect();
      // !isSfxDisabled && onPlay543();
      handleReset();
    });

    socket.on(PROTOCOL.RECONNECTION, (data) => {
      const lobby = data.lobby;
      setAlreadyIn(false);
      setPacket({ uuid: lobby.uuid });

      setInQueue(true);
      if (lobby.senderId) {
        setShouldSend(lobby.senderId === user.id);
      } else {
        setShouldSend(false);
      }
      if (lobby.players[0].id !== user.id) {
        [lobby.players[0], lobby.players[1]] = [
          lobby.players[1],
          lobby.players[0],
        ];
      }
      setPlayers(lobby.players);
      setDraftURL(lobby.draft_url);
      for (const conf of lobby.confirms) {
        if (conf === user.id) {
          setHasAccepted(true);
        }
      }
      if (lobby.results.length > 0) {
        if (lobby.results[0].id === user.id) {
          setHisResult(lobby.results[0].r);
        } else {
          setHisResult(0);
        }
      } else {
        setHisResult(0);
      }
      setInvalidURL(false);
      if (lobby.step === PROTOCOL.TO_CONFIRM) {
        setStep(PROTOCOL.ASK_CONFIRM);
      }
      if (lobby.step === PROTOCOL.TO_VALIDATE) {
        setStep(PROTOCOL.ASK_URL);
      }
      if (lobby.step === PROTOCOL.TO_OVER) {
        setStep(PROTOCOL.ASK_OVER);
        if (lobby.results.length > 0) {
          if (lobby.results[0].id === user.id) {
            setStep(PROTOCOL.CONFIRM_OVER);
          }
        }
      }
    });

    socket.on(PROTOCOL.SEND_ALREADYIN, (data) => {
      setAlreadyIn(true);
      if (data.lobbyId) {
        setPacket({ uuid: data.lobbyId });
      }
    });

    return () => {
      socket.removeAllListeners();
      if (!isSfxDisabled) {
        onPause543();
        onPause559();
        onPause583();
      }
    };
  }, [socket]);

  const handler: Handler = {
    Socket: handleSocket,
    Confirm: handleConfirm,
    QuitQueue: handleQuitQueue,
    DraftInput: handleDraftInput,
    Validate: handleValidate,
    Over: handleOver,
    Forfeit: handleForfeit,
    ForceQuit: handleForceQuit,
    Reset: handleReset,
  };

  return [
    handler,
    step,
    players,
    alreadyIn,
    inQueue,
    hasAccepted,
    hisResult,
    invalidURL,
    draftURL,
    shouldSend,
  ];
}
