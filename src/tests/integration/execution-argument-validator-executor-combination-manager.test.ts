import { ExecutionArgumentValidatorExecutorCombinationManager } from "../../ts/execution-argument-validator-executor-combination-manager";
import { platform } from "os";
import { WindowsSettingsExecutor } from "../../ts/executors/windows-settings-executor";
import { WindowsSettingsExecutionArgumentValidator } from "../../ts/execution-argument-validators/windows-settings-execution-argument-validator";
import { MacOsSettingsExecutionArgumentValidator } from "../../ts/execution-argument-validators/mac-os-execution-argument-validator";
import { MacOsSettingsExecutor } from "../../ts/executors/mac-os-settings-executor";
import { OperatingSystemHelpers } from "../../ts/helpers/operating-system-helpers";
import { OperatingSystem } from "../../ts/operating-system";
import { defaultConfig } from "../../ts/default-config";

describe(ExecutionArgumentValidatorExecutorCombinationManager.name, (): void => {
    it("should return the correct execution argument valiator executor combinations", (): void => {
        let counter = 0;

        const combinations = new ExecutionArgumentValidatorExecutorCombinationManager(defaultConfig).getCombinations();

        const currentOperatingSystem = OperatingSystemHelpers.getOperatingSystemFromString(platform());

        for (const combination of combinations) {
            if (currentOperatingSystem === OperatingSystem.Windows) {
                if (combination.validator instanceof WindowsSettingsExecutionArgumentValidator
                    && combination.executor instanceof WindowsSettingsExecutor) {
                    counter++;
                }
            } else if (currentOperatingSystem === OperatingSystem.macOS) {
                if (combination.validator instanceof MacOsSettingsExecutionArgumentValidator
                    && combination.executor instanceof MacOsSettingsExecutor) {
                    counter++;
                }
            }
        }

        expect(counter).toBe(1);
    });
});
