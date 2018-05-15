import { UeliHelpers } from "./helpers/ueli-helpers";

export class IpcChannels {
    public static readonly hideWindow = "hide-window";
    public static readonly execute = "execute";
    public static readonly getSearch = "get-search";
    public static readonly getSearchResponse = "get-search-response";
    public static readonly openFileLocation = "open-file-location";
    public static readonly getSearchIcon = "get-search-icon";
    public static readonly getSearchIconResponse = "get-search-icon-response";
    public static readonly autoComplete = "auto-complete";
    public static readonly autoCompleteResponse = "auto-complete-response";
    public static readonly commandLineExecution = "command-line-execution";
    public static readonly commandLineOutput = "command-line-output";
    public static readonly ueliReload = `${UeliHelpers.ueliCommandPrefix}reload`;
    public static readonly ueliExit = `${UeliHelpers.ueliCommandPrefix}exit`;
    public static readonly exitCommandLineTool = "exit-command-line-tool";
    public static readonly resetCommandlineOutput = "reset-commandline-output";
    public static readonly resetUserInput = "reset-user-input";
    public static readonly showHelp = "show-help";
}
