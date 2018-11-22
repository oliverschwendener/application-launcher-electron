import { SearchPluginsSearcher } from "../../../ts/searcher/search-plugins-searcher";
import { UserConfigOptions } from "../../../ts/user-config/user-config-options";
import { CountManager } from "../../../ts/count/count-manager";
import { FakeCountRepository } from "../fake-count-repository";
import { FakeSearchPlugin } from "../fake-search-plugin";
import { FakeSearchPluginManager } from "../../fake-search-plugin-manager";
import { SearchResultItem } from "../../../ts/search-result-item";

describe(SearchPluginsSearcher.name, (): void => {
    const itemsCount = 5;
    const testConfig = {} as UserConfigOptions;
    const countManager = new CountManager(new FakeCountRepository({}));

    const items: SearchResultItem[] = [];
    const searchable = "searchable";

    for (let i = 0; i < itemsCount; i++) {
        items.push({
            description: `description-${i}`,
            executionArgument: `execution-argument-${i}`,
            icon: `icon-${i}`,
            name: `name-${i}`,
            searchable: [searchable],
        });
    }

    const plugins = [
        new FakeSearchPlugin(items),
        new FakeSearchPlugin(items),
        new FakeSearchPlugin(items),
    ];

    describe("getSearchResults", (): void => {
        const searchPluginManager = new FakeSearchPluginManager(plugins);
        const searcher = new SearchPluginsSearcher(testConfig, countManager, searchPluginManager);

        it("should return the correct search result", (): void => {
            const actual = searcher.getSearchResult(searchable);
            expect(actual.length).toBe(plugins.length * items.length);
        });
    });

    it("should be able to handle an empty array of plugins", (): void => {
        const searchPluginManager = new FakeSearchPluginManager([]);
        const searcher = new SearchPluginsSearcher(testConfig, countManager, searchPluginManager);

        const acutal = searcher.getSearchResult(searchable);
        expect(acutal).not.toBe(undefined);
    });

    it("should not block other searchers", (): void => {
        const searchPluginManager = new FakeSearchPluginManager(plugins);
        const searcher = new SearchPluginsSearcher(testConfig, countManager, searchPluginManager);
        const actual = searcher.blockOthers;
        expect(actual).toBe(false);
    });
});
