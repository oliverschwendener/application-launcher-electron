import { WebSearch } from "./web-search";
import { CustomCommand } from "./custom-command";
import { Variable } from "./variable";

export interface ConfigOptions {
    applicationFileExtensions: string[];
    applicationFolders: string[];
    autoStartApp: boolean;
    colorTheme: string;
    customCommands: CustomCommand[];
    fileSearchFolders: string[];
    hotKey: string;
    logExecution: boolean;
    maxSearchResultCount: number;
    rescanInterval: number;
    searchEngineThreshold: number;
    searchOperatingSystemSettings: boolean;
    searchResultExecutionArgumentFontSize: number;
    searchResultHeight: number;
    searchResultNameFontSize: number;
    userInputHeight: number;
    userInputFontSize: number;
    directoryVariables: Variable[];
    webSearches: WebSearch[];
    windowWith: number;
}
