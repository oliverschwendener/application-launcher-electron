import { SearchResultItem } from "./search-result-item";

export class SearchResultItemViewModel extends SearchResultItem {
    public id: string;
    public index: number;
    public active: boolean;
}
