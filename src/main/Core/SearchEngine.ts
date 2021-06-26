import Fuse from "fuse.js";
import { SearchResultItem } from "../../common/SearchResult/SearchResultItem";
import { SearchPlugin } from "../Plugins/SearchPlugin";
import { Searchable } from "./Searchable";
import { SearchEngineSettings } from "../../common/SearchEngineSettings";
import { SearchEngineRescanError } from "./SearchEngineRescanError";

export class SearchEngine {
    private initialized = false;
    private readonly rescanIntervalInSeconds = 60;

    constructor(private settings: SearchEngineSettings, private readonly searchPlugins: SearchPlugin<unknown>[]) {
        this.initialize().finally(() => (this.initialized = true));
    }

    public isInitialized(): boolean {
        return this.initialized;
    }

    public search(searchTerm: string): SearchResultItem[] {
        if (!this.initialized || searchTerm.trim().length === 0) {
            return [];
        }

        return new Fuse(
            this.getAllSearchables().map((searchable) => searchable.toSearchResultItem()),
            { threshold: this.settings.threshold, keys: ["name"] }
        )
            .search(searchTerm)
            .map((fuseSearchResult) => fuseSearchResult.item);
    }

    public async rescan(): Promise<void> {
        console.log("Starting rescan...");

        const rescanIntervalInMilliseconds = this.rescanIntervalInSeconds * 1000;
        const scheduleNextRescan = () => {
            console.log(`Scheduled next rescan in ${this.rescanIntervalInSeconds} seconds.`);
            setTimeout(() => this.rescan(), rescanIntervalInMilliseconds);
        };

        try {
            await Promise.all(this.searchPlugins.map((searchPlugin) => searchPlugin.rescan()));
        } catch (error) {
            this.handleError(new SearchEngineRescanError(error));
        } finally {
            console.log("Finished rescan.");
            scheduleNextRescan();
        }
    }

    public async clearCaches(): Promise<void> {
        try {
            await Promise.all(this.searchPlugins.map((searchPlugin) => searchPlugin.clearCache()));
        } catch (error) {
            throw new Error(`SearchEngine failed to clear caches. Reason: ${error}`);
        }
    }

    public updateSettings(updatedSettings: SearchEngineSettings): void {
        this.settings = updatedSettings;
    }

    private async initialize(): Promise<void> {
        await this.createPluginTempFolders();
        await this.createPluginSettingFilesIfNecessary();
        this.rescan();
    }

    private async createPluginTempFolders(): Promise<void> {
        await Promise.all(this.searchPlugins.map((searchPlugin) => searchPlugin.createTemporaryFolder()));
    }

    private async createPluginSettingFilesIfNecessary(): Promise<void> {
        await Promise.all(this.searchPlugins.map((searchPlugin) => searchPlugin.createSettingsFileIfNotExists()));
    }

    private getAllSearchables(): Searchable[] {
        let result: Searchable[] = [];

        this.searchPlugins.forEach((searchPlugin) => {
            result = result.concat(searchPlugin.getAllSearchables());
        });

        return result;
    }

    private handleError(error: Error): void {
        console.error(`Handled error: ${error.message}`);
    }
}
