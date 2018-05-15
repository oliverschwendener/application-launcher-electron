import { platform } from "os";
import { OperatingSystemHelpers } from "./helpers/operating-system-helpers";
import { OperatingSystem } from "./operating-system";
import { CommandLineExecutor } from "./executors/command-line-executor";
import { CommandLineExecutionArgumentValidator } from "./execution-argument-validators/command-line-execution-argument-validator";
import { UeliCommandExecutor } from "./executors/ueli-command-executor";
import { UeliCommandExecutionArgumentValidator } from "./execution-argument-validators/ueli-command-execution-argument-validator";
import { FilePathExecutor } from "./executors/file-path-executor";
import { FilePathExecutionArgumentValidator } from "./execution-argument-validators/file-path-execution-argument-validator";
import { WebSearchExecutor } from "./executors/web-search-executor";
import { WebSearchExecutionArgumentValidator } from "./execution-argument-validators/web-search-execution-argument-validator";
import { EmailAddressExecutionArgumentValidator } from "./execution-argument-validators/email-address-execution-argument-validator";
import { WebUrlExecutor } from "./executors/web-url-executor";
import { WebUrlExecutionArgumentValidator } from "./execution-argument-validators/web-url-execution-argument-validator";
import { ExecutionArgumentValidatorExecutorCombination } from "./execution-argument-validator-executor-combination";
import { WindowsSettingsExecutionArgumentValidator } from "./execution-argument-validators/windows-settings-execution-argument-validator";
import { WindowsSettingsExecutor } from "./executors/windows-settings-executor";
import { MacOsSettingsExecutor } from "./executors/mac-os-settings-executor";
import { MacOsSettingsExecutionArgumentValidator } from "./execution-argument-validators/mac-os-execution-argument-validator";
import { defaultConfig } from "./default-config";
import { UeliHelpers } from "./helpers/ueli-helpers";
import { ConfigOptions } from "./config-options";
import { WebSearch } from "./web-search";

export class ExecutionArgumentValidatorExecutorCombinationManager {
    private webSearches: WebSearch[];
    private combinations: ExecutionArgumentValidatorExecutorCombination[];

    constructor(config: ConfigOptions) {
        this.combinations = [
            {
                executor: new CommandLineExecutor(),
                validator: new CommandLineExecutionArgumentValidator(),
            },
            {
                executor: new UeliCommandExecutor(),
                validator: new UeliCommandExecutionArgumentValidator(),
            },
            {
                executor: new FilePathExecutor(),
                validator: new FilePathExecutionArgumentValidator(),
            },
            {
                executor: new WebSearchExecutor(config.webSearches),
                validator: new WebSearchExecutionArgumentValidator(config.webSearches),
            },
            {
                executor: new FilePathExecutor(),
                validator: new EmailAddressExecutionArgumentValidator(),
            },
            {
                executor: new WebUrlExecutor(),
                validator: new WebUrlExecutionArgumentValidator(),
            },
        ];

        switch (OperatingSystemHelpers.getOperatingSystemFromString(platform())) {
            case OperatingSystem.Windows: {
                this.combinations.push({
                    executor: new WindowsSettingsExecutor(),
                    validator: new WindowsSettingsExecutionArgumentValidator(),
                });
            }
            case OperatingSystem.macOS: {
                this.combinations.push({
                    executor: new MacOsSettingsExecutor(),
                    validator: new MacOsSettingsExecutionArgumentValidator(),
                });
            }
        }
    }

    public getCombinations(): ExecutionArgumentValidatorExecutorCombination[] {
        return this.combinations;
    }
}
