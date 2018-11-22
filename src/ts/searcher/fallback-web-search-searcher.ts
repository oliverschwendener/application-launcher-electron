import { Searcher } from "./searcher";
import { SearchResultItem } from "../search-result-item";
import { WebSearch } from "../web-search";
import { WebSearchBuilder } from "../builders/web-search-builder";

export class FallbackWebSearchSercher implements Searcher {
    public readonly blockOthers = false;

    private readonly fallbackWebSearches: string[];
    private readonly webSearches: WebSearch[];

    constructor(fallbackWebSearches: string[], webSearches: WebSearch[]) {
        this.fallbackWebSearches = fallbackWebSearches;
        this.webSearches = webSearches;
    }

    public getSearchResult(userInput: string): SearchResultItem[] {
        const result = [] as SearchResultItem[];

        for (const fallBackWebSearchName of this.fallbackWebSearches) {
            for (const webSearch of this.webSearches) {
                if (fallBackWebSearchName === webSearch.name) {
                    result.push(WebSearchBuilder.buildSearchResultItem(userInput, webSearch));
                }
            }
        }

        return result;
    }
}
