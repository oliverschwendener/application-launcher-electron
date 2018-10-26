import * as Fuse from "fuse.js";
import { SearchResultItem } from "./search-result-item";
import { CountManager } from "./count/count-manager";

export class SearchEngine {
    private readonly unsortedSearchResults: SearchResultItem[];
    private readonly threshold: number;
    private readonly searchEngineLimit: number;

    public constructor(unsortedSearchResults: SearchResultItem[], threshold: number, searchEngineLimit: number) {
        this.unsortedSearchResults = unsortedSearchResults;
        this.threshold = threshold;
        this.searchEngineLimit = searchEngineLimit;
    }

    public search(searchTerm: string, countManager?: CountManager): SearchResultItem[] {
        const fuse = new Fuse(this.unsortedSearchResults, {
            distance: 100,
            includeScore: true,
            keys: ["searchable"],
            location: 0,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            shouldSort: true,
            threshold: this.threshold,
        });

        let fuseResults = fuse.search(searchTerm) as any[];

        if (countManager !== undefined) {
            fuseResults = this.sortItemsByCount(fuseResults, countManager);
        }

        const sortedResult = fuseResults.map((fuseResult): SearchResultItem => {
            return {
                description: fuseResult.item.description,
                executionArgument: fuseResult.item.executionArgument,
                icon: fuseResult.item.icon,
                name: fuseResult.item.name,
                searchable: fuseResult.item.searchable,
                tags: fuseResult.item.tags,
            } as SearchResultItem;
        });

        return sortedResult.slice(0, this.searchEngineLimit);
    }

    private sortItemsByCount(searchResults: any[], countManager: CountManager): any[] {
        const count = countManager.getCount();

        // tslint:disable-next-line:prefer-for-of because we need to change the array itself
        for (let i = 0; i < searchResults.length; i++) {
            const score = count[searchResults[i].item.executionArgument];

            if (score !== undefined && score > 3) {
                searchResults[i].score /= (score * 3);
            }
        }

        searchResults = searchResults.sort((a, b): number => {
            return a.score - b.score;
        });

        return searchResults;
    }
}
