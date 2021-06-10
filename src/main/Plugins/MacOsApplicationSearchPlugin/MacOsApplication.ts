import { basename } from "path";
import { SearchResultItem } from "../../../common/SearchResult/SearchResultItem";
import { SearchResultItemIcon } from "../../../common/SearchResult/SearchResultItemIcon";
import { Searchable } from "../../Core/Searchable";
import { FilePathExecutor } from "../../Executors/FilePathExecutor";
import { FilePathLocationOpener } from "../../LocationOpeners/FilePathLocationOpener";

export class MacOsApplication implements Searchable {
    public constructor(private readonly filePath: string, private readonly icon: SearchResultItemIcon) {}

    public toSearchResultItem(): SearchResultItem {
        return {
            description: basename(this.filePath),
            executionArgument: this.filePath,
            executorId: FilePathExecutor.executorId,
            icon: this.icon,
            locationOpenerId: FilePathLocationOpener.locationOpenerId,
            name: basename(this.filePath),
            openLocationArgument: this.filePath,
        };
    }
}
