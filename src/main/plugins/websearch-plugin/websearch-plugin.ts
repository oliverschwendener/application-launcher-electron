import { SearchResultItem } from "../../../common/search-result-item";
import { PluginType } from "../../plugin-type";
import { UserConfigOptions } from "../../../common/config/user-config-options";
import { WebSearchOptions } from "../../../common/config/websearch-options";
import { ExecutionPlugin } from "../../execution-plugin";
import { WebSearchEngine } from "./web-search-engine";
import { AutoCompletionResult } from "../../../common/auto-completion-result";
import { TranslationSet } from "../../../common/translation/translation-set";

export class WebSearchPlugin implements ExecutionPlugin {
    public readonly pluginType = PluginType.WebSearchPlugin;
    public readonly openLocationSupported = false;
    public readonly autoCompletionSupported = false;
    private config: WebSearchOptions;
    private translationSet: TranslationSet;
    private readonly urlExecutor: (url: string) => Promise<void>;

    constructor(userConfig: WebSearchOptions, translationSet: TranslationSet, urlExecutor: (url: string) => Promise<void>) {
        this.config = userConfig;
        this.translationSet = translationSet;
        this.urlExecutor = urlExecutor;
    }

    public async getSearchResults(userInput: string, fallback?: boolean): Promise<SearchResultItem[]> {
        try {
            const searchResults = this.config.webSearchEngines
                .filter((webSearchEngine) => {
                    return fallback
                        ? webSearchEngine.isFallback
                        : userInput.startsWith(webSearchEngine.prefix);
                })
                .sort((a, b) => {
                    if (a.priority > b.priority) {
                        return 1;
                    }
                    if (a.priority < b.priority) {
                        return -1;
                    }
                    return 0;
                })
                .map((webSearchEngine): SearchResultItem => {
                    return {
                        description: this.buildDescription(webSearchEngine, userInput),
                        executionArgument: this.buildExecutionArgument(webSearchEngine, userInput),
                        hideMainWindowAfterExecution: true,
                        icon: webSearchEngine.icon,
                        name: webSearchEngine.name,
                        originPluginType: this.pluginType,
                        searchable: [],
                    };
                });

            return searchResults;

        } catch (error) {
            return error;
        }
    }

    public isValidUserInput(userInput: string, fallback?: boolean): boolean {
        return userInput !== undefined
            && userInput.length > 0
            && this.userInputMatches(userInput, fallback);
    }

    public execute(searchResultItem: SearchResultItem): Promise<void> {
        return this.urlExecutor(searchResultItem.executionArgument);
    }

    public isEnabled() {
        return this.config.isEnabled;
    }

    public openLocation(): Promise<void> {
        throw new Error("not implemented");
    }

    public async autoComplete(searchResultItem: SearchResultItem): Promise<AutoCompletionResult> {
        throw Error("Autocompletion not supported");
    }

    public async updateConfig(updatedConfig: UserConfigOptions, translationSet: TranslationSet): Promise<void> {
        this.config = updatedConfig.websearchOptions;
        this.translationSet = translationSet;
    }

    private getSearchTerm(webSearchEngine: WebSearchEngine, userInput: string): string {
        let searchTerm = userInput.replace(webSearchEngine.prefix, "");

        if (webSearchEngine.encodeSearchTerm) {
            searchTerm = encodeURIComponent(searchTerm);
        }

        return searchTerm;
    }

    private buildDescription(webSearchEngine: WebSearchEngine, userInput: string): string {
        return this.translationSet.websearchDescription
            .replace("{{websearch_engine}}", webSearchEngine.name)
            .replace("{{search_term}}", this.getSearchTerm(webSearchEngine, userInput));
    }

    private buildExecutionArgument(webSearchEngine: WebSearchEngine, userInput: string): string {
        return webSearchEngine.url.replace("{{query}}", this.getSearchTerm(webSearchEngine, userInput));
    }

    private userInputMatches(userInput: string, fallback?: boolean): boolean {
        return this.config.webSearchEngines.some((websearchEngine) => {
            return fallback
                ? websearchEngine.isFallback
                : userInput.startsWith(websearchEngine.prefix);
        });
    }
}
