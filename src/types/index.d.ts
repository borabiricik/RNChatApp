import React from "react";
import { Socket } from "socket.io-client";

export interface IMessage {
  id?: number;
  from: string;
  data: {
    userName: string;
    message: string;
  };
}

export interface ISocketContext {
  messages: IMessage[];
  socket?: Socket;
  setmessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
}
