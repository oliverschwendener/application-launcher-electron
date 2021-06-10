import { ApplicationRuntimeInformation } from "../ApplicationRuntimeInformation";
import { PluginRepository } from "./PluginRepository";
import { SearchPlugin } from "../Plugins/SearchPlugin";
import { MacOsApplicationSearchPlugin } from "../Plugins/MacOsApplicationSearchPlugin/MacOsApplicationSearchPlugin";
import { CommandlineUtility } from "../Utilities/CommandlineUtility";
import { normalize } from "path";

export class MacOsPluginRepository extends PluginRepository {
    public constructor(applicationRuntimeInformation: ApplicationRuntimeInformation) {
        super(applicationRuntimeInformation);
    }

    protected getOperatingSystemSpecificPlugins(): SearchPlugin<unknown>[] {
        return [
            new MacOsApplicationSearchPlugin(this.applicationRuntimeInformation, async () => {
                const output = await CommandlineUtility.executeCommandWithOutput("mdfind kind:apps");
                return output
                    .split("\n")
                    .map((filePath) => normalize(filePath).trim())
                    .filter((f) => f.length > 2);
            }),
        ];
    }
}
