import { CalculatorSearcher } from "./searcher/calculator-searcher";
import { CalculatorInputValidator } from "./input-validators/calculator-input-validator";
import { FilePathSearcher } from "./searcher/file-path-searcher";
import { FilePathInputValidator } from "./input-validators/file-path-input-validator";
import { CommandLineSearcher } from "./searcher/command-line-searcher";
import { CommandLineInputValidator } from "./input-validators/command-line-input-validator";
import { WebSearchSearcher } from "./searcher/web-search-searcher";
import { WebSearchInputValidator } from "./input-validators/web-search-input-validator";
import { EmailAddressSearcher } from "./searcher/email-address-searcher";
import { EmailAddressInputValidator } from "./input-validators/email-address-input-validator";
import { WebUrlSearcher } from "./searcher/web-url-searcher";
import { WebUrlInputValidator } from "./input-validators/web-url-input-validator";
import { SearchPluginsSearcher } from "./searcher/search-plugins-searcher";
import { SearchPluginsInputValidator } from "./input-validators/search-plugins-input-validator";
import { InputValidatorSearcherCombination } from "./input-validator-searcher-combination";
import { defaultConfig } from "./default-config";
import { UeliHelpers } from "./helpers/ueli-helpers";
import { ConfigOptions } from "./config-options";

export class InputValidatorSearcherCombinationManager {
    private combinations: InputValidatorSearcherCombination[];

    constructor(config: ConfigOptions) {
        this.combinations = [
            {
                searcher: new CalculatorSearcher(),
                validator: new CalculatorInputValidator(),
            },
            {
                searcher: new FilePathSearcher(),
                validator: new FilePathInputValidator(),
            },
            {
                searcher: new CommandLineSearcher(),
                validator: new CommandLineInputValidator(),
            },
            {
                searcher: new WebSearchSearcher(config.webSearches),
                validator: new WebSearchInputValidator(config.webSearches),
            },
            {
                searcher: new EmailAddressSearcher(),
                validator: new EmailAddressInputValidator(),
            },
            {
                searcher: new WebUrlSearcher(),
                validator: new WebUrlInputValidator(),
            },
            {
                searcher: new SearchPluginsSearcher(config),
                validator: new SearchPluginsInputValidator(),
            },
        ];
    }

    public getCombinations(): InputValidatorSearcherCombination[] {
        return this.combinations;
    }
}
