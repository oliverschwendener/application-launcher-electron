import { createHash } from "crypto";
import { basename, extname, join } from "path";
import { LocalFilePathSearchResultItemIcon } from "../../../common/SearchResult/LocalFilePathSearchResultItemIcon";
import { ApplicationRuntimeInformation } from "../../ApplicationRuntimeInformation";
import { SearchPlugin } from "../SearchPlugin";
import { MacOsApplication } from "./MacOsApplication";
import { app } from "electron";
import { FileSystemUtility } from "../../Utilities/FileSystemUtility";

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
        await this.generateMacAppIcons(filePaths);

        this.applications = filePaths.map((filePath) => {
            const icon = new LocalFilePathSearchResultItemIcon(this.getApplicationIconFilePath(filePath));
            return new MacOsApplication(filePath, icon);
        });
    }

    private async generateMacAppIcons(filePaths: string[]): Promise<void> {
        await Promise.all(filePaths.map((filePath) => this.generateMacAppIcon(filePath)));
    }

    private async generateMacAppIcon(filePath: string): Promise<void> {
        const outPngFilePath = this.getApplicationIconFilePath(filePath);
        const fileExists = await FileSystemUtility.pathExists(outPngFilePath);

        if (fileExists) {
            return;
        }

        const image = await app.getFileIcon(filePath);
        await FileSystemUtility.writePng(image.toPNG(), outPngFilePath);
    }

    private getApplicationIconFilePath(applicationFilePath: string): string {
        const hash = createHash("md5").update(`${applicationFilePath}`).digest("hex");

        const fileName = `${basename(applicationFilePath)
            .replace(extname(applicationFilePath), "")
            .toLowerCase()
            .replace(/\s/g, "-")}-${hash}`;

        return `${join(this.getTemporaryFolderPath(), fileName)}.png`;
    }
}
