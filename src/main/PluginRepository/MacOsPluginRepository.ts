import { ApplicationRuntimeInformation } from "../ApplicationRuntimeInformation";
import { PluginRepository } from "./PluginRepository";
import { SearchPlugin } from "../Plugins/SearchPlugin";
import { MacOsApplicationSearchPlugin } from "../Plugins/MacOsApplicationSearchPlugin/MacOsApplicationSearchPlugin";
import { MacOsApplicationFilePathRetriever } from "../Plugins/MacOsApplicationSearchPlugin/MacOsApplicationFilePathRetriever";

export class MacOsPluginRepository extends PluginRepository {
    public constructor(applicationRuntimeInformation: ApplicationRuntimeInformation) {
        super(applicationRuntimeInformation);
    }

    protected getOperatingSystemSpecificPlugins(): SearchPlugin<unknown>[] {
        return [
            new MacOsApplicationSearchPlugin(this.applicationRuntimeInformation, () =>
                MacOsApplicationFilePathRetriever.retrieveAllApplicationFilePaths()
            ),
        ];
    }
}
