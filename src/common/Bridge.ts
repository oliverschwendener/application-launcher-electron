import { IpcRendererEvent } from "electron";
import { IpcChannel } from "./IpcChannel";
import { IpcInvokeCommand } from "./IpcInvokeCommand";

export interface IpcRendererBridge {
    readonly send: <ArgumentType>(channel: IpcChannel, ...arg: ArgumentType[]) => void;

    readonly sendSync: <ArgumentType, ReturnType>(channel: IpcChannel, ...arg: ArgumentType[]) => ReturnType;

    readonly on: <ArgumentType>(
        channel: IpcChannel,
        listener: (event: IpcRendererEvent, ...arg: ArgumentType[]) => void
    ) => void;

    readonly once: <ArgumentType>(
        channel: IpcChannel,
        listener: (event: IpcRendererEvent, ...arg: ArgumentType[]) => void
    ) => void;

    readonly invoke: <ArgumentType, ReturnType>(
        command: IpcInvokeCommand,
        ...arg: ArgumentType[]
    ) => Promise<ReturnType>;
}

export interface Bridge {
    readonly ipcRenderer: IpcRendererBridge;
}
