import { ExecutionPlugin } from "../../execution-plugin";
import { PluginType } from "../../plugin-type";
import { SpellcheckOptions } from "../../../common/config/spellcheck-options";
import { SearchResultItem } from "../../../common/search-result-item";
import { UserConfigOptions } from "../../../common/config/user-config-options";
import { TranslationSet } from "../../../common/translation/translation-set";
import { SpellcheckSearcher } from "./spellcheck-searcher";
import { defaultSpellcheckIcon } from "../../../common/icon/default-icons";

interface SpellcheckResult {
    suggestion: string;
}

export class SpellcheckPlugin implements ExecutionPlugin {
    public pluginType = PluginType.Dictionary;
    private config: SpellcheckOptions;
    private readonly clipboardCopier: (value: string) => Promise<void>;
    private delay: NodeJS.Timeout | number;

    constructor(config: SpellcheckOptions, clipboardCopier: (value: string) => Promise<void>) {
        this.config = config;
        this.clipboardCopier = clipboardCopier;
    }

    public isValidUserInput(userInput: string, fallback?: boolean | undefined): boolean {
        const searchTerm = this.getSearchTerm(userInput);

        return userInput.startsWith(this.config.prefix)
        && (searchTerm.length >= this.config.minSearchTermLength)
        && (searchTerm.indexOf(' ') == -1); // only one word
    }

    public getSearchResults(userInput: string, fallback?: boolean | undefined): Promise<SearchResultItem[]> {
        const searchTerm = this.getSearchTerm(userInput);
        return new Promise((resolve, reject) => {
            if (this.delay) {
                clearTimeout(this.delay as number);
            }

            this.delay = setTimeout(() => {
                SpellcheckSearcher.search(searchTerm)
                    .then((definitions) => resolve(this.buildSearchResults(definitions)))
                    .catch((err) => reject(err));
            }, this.config.debounceDelay);
        });
    }

    public isEnabled(): boolean {
        return this.config.isEnabled;
    }

    public execute(searchResultItem: SearchResultItem, privileged: boolean): Promise<void> {
        return this.clipboardCopier(searchResultItem.executionArgument);
    }

    public updateConfig(updatedConfig: UserConfigOptions, translationSet: TranslationSet): Promise<void> {
        return new Promise((resolve, reject) => {
            this.config = updatedConfig.spellcheckOptions;
            resolve();
        });
    }

    private getSearchTerm(userInput: string): string {
        return userInput.replace(this.config.prefix, "");
    }

    private buildSearchResults(word_spellcheck: any): SearchResultItem[] {
        const SpellcheckResults: SpellcheckResult[] = [];

        if(word_spellcheck.length) {
            const suggestions: string[] = word_spellcheck[0].s;

            suggestions.forEach((suggestion: string) => {
                SpellcheckResults.push({
                    suggestion: suggestion,
                });
            });
        } else {
            return [];
        }

        // else {
            // as I know, ueli have no api for returnments like
            // `✔ zero errors found`
            // it'll be greate to create him

            // SpellcheckResults.push({
            //     suggestion: 'errors not found!',
            // });
        // }

        return SpellcheckResults.map((result): SearchResultItem => {
            return {
                description: '',
                executionArgument: result.suggestion,
                hideMainWindowAfterExecution: true,
                icon: defaultSpellcheckIcon,
                name: result.suggestion,
                originPluginType: this.pluginType,
                searchable: [],
            };
        });
    }
}
