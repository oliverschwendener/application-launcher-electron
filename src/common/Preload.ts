import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import { Bridge } from "./Bridge";
import { IpcChannel } from "./IpcChannel";

const bridge: Bridge = {
    ipcRenderer: {
        send: <ArgumentType>(channel: IpcChannel, ...arg: ArgumentType[]) => ipcRenderer.send(channel.toString(), arg),

        sendSync: <ArgumentType, ReturnType>(channel: IpcChannel, ...arg: ArgumentType[]) =>
            ipcRenderer.sendSync(channel.toString(), arg) as ReturnType,

        on: <ArgumentType>(channel: IpcChannel, listener: (event: IpcRendererEvent, ...args: ArgumentType[]) => void) =>
            ipcRenderer.on(channel.toString(), listener),

        once: <ArgumentType>(
            channel: IpcChannel,
            listener: (event: IpcRendererEvent, ...args: ArgumentType[]) => void
        ) => ipcRenderer.once(channel.toString(), listener),

        invoke: <ArgumentType, ReturnType>(command: IpcChannel, ...arg: ArgumentType[]) => {
            return ipcRenderer.invoke(command, arg) as Promise<ReturnType>;
        },
    },
};

contextBridge.exposeInMainWorld("Bridge", bridge);
