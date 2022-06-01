import { useState, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { PROTOCOL } from "../utils/Constants";

const ENDPOINT = "http://localhost:4000";

export function useSocket() {
  const [socket, setSocket] = useState<Socket<any, any>>();

  useEffect(() => {
    const socket = io(ENDPOINT, {
      transports: ["websocket"],
      upgrade: false,
    });
    setSocket(socket);

    return () => {
      socket.off();
      socket.disconnect();
    };
  }, []);

  const handleSocket = useCallback(
    (uuid: string, force: boolean) => {
      if (!socket && !force) return;
      socket.emit(PROTOCOL.REGISTER, { uuid });
    },
    [socket]
  );

  return [
    socket,
    (u: string, f: boolean) => {
      handleSocket(u, f);
    },
  ] as const;
}
