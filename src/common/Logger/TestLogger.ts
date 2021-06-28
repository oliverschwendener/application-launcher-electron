import { Logger } from "./Logger";

export class TestLogger implements Logger {
    public debugLogs: string[] = [];
    public infoLogs: string[] = [];
    public warnings: string[] = [];
    public errors: string[] = [];

    public debug(message: string): void {
        this.debugLogs.push(message);
    }

    public info(message: string): void {
        this.infoLogs.push(message);
    }

    public warning(message: string): void {
        this.warnings.push(message);
    }

    public error(message: string): void {
        this.errors.push(message);
    }
}
