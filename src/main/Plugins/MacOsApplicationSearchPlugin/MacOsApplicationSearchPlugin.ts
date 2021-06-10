import { DummySearchResultItemIcon } from "../../../common/SearchResult/DummySearchResultItemIcon";
import { ApplicationRuntimeInformation } from "../../ApplicationRuntimeInformation";
import { SearchPlugin } from "../SearchPlugin";
import { MacOsApplication } from "./MacOsApplication";

export class MacOsApplicationSearchPlugin extends SearchPlugin<Record<string, unknown>> {
    public readonly pluginId = "MacOsApplicationSearchPlugin";
    protected readonly defaultSettings: Record<string, unknown>;
    private applications: MacOsApplication[];

    public constructor(
        applicationRunTimeInformation: ApplicationRuntimeInformation,
        private readonly macOsApplicationFileRetriever: () => Promise<string[]>
    ) {
        super(applicationRunTimeInformation);

        this.defaultSettings = {};
        this.applications = [];
    }

    public getAllSearchables(): MacOsApplication[] {
        return this.applications;
    }

    public async clearCache(): Promise<void> {
        return;
    }

    public async rescan(): Promise<void> {
        const filePaths = await this.macOsApplicationFileRetriever();
        this.applications = filePaths.map(
            (filePath) => new MacOsApplication(filePath, new DummySearchResultItemIcon("hello"))
        );
    }
}
