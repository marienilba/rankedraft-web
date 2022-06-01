import { useState, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { API_URL, PROTOCOL } from "../utils/Constants";

export function useSocket() {
  const [socket, setSocket] = useState<Socket<any, any>>();

  useEffect(() => {
    const socket = io(API_URL, {
      transports: ["websocket"],
      upgrade: false,
    });
    setSocket(socket);
    return () => {
      socket.off();
      socket.disconnect();
    };
  }, []);

  const handleSocket = (uuid: string, force: boolean) => {
    if (!socket && !force) return;
    socket.emit(PROTOCOL.REGISTER, { uuid });
  };

  return [
    socket,
    (u: string, f: boolean) => {
      handleSocket(u, f);
    },
  ] as const;
}
