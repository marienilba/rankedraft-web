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

  const handleSocket = (uuid: string, ip: string, force: boolean) => {
    if (!socket && !force) return;
    socket.emit(PROTOCOL.REGISTER, { uuid, ip });
  };

  return [
    socket,
    (u: string, ip: string, f: boolean) => {
      handleSocket(u, ip, f);
    },
  ] as const;
}
