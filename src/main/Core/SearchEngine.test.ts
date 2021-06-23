import { join } from "path";
import { SearchResultItemDummy } from "../../common/SearchResult/SearchResultItemDummy";
import { DummySearchPlugin } from "../Plugins/DummySearchPlugin/DummySearchPlugin";
import { FileSystemUtility } from "../Utilities/FileSystemUtility";
import { TimeUtility } from "../Utilities/TimeUtility";
import { DummySearchable } from "./DummySearchable";
import { Searchable } from "./Searchable";
import { SearchEngine } from "./SearchEngine";
import { SearchEngineSettings } from "../../common/SearchEngineSettings";

describe(SearchEngine, () => {
    const tempFolderPath = join(__dirname, "temp");
    const searchEngineInitializationDuration = 150;
    const searchEngineSettings: SearchEngineSettings = {
        threshold: 0.4,
    };

    beforeEach(async () => await FileSystemUtility.createFolderIfDoesntExist(tempFolderPath));
    afterEach(async () => await FileSystemUtility.deleteFolderRecursively(tempFolderPath));

    it("should create plugin temp folders and trigger a rescan on instantiation", async () => {
        const onRescan = jest.fn(() => Promise.resolve());
        const dummySearchPlugin = new DummySearchPlugin(tempFolderPath, undefined, onRescan, undefined);
        new SearchEngine(searchEngineSettings, [dummySearchPlugin]);
        await TimeUtility.wait(searchEngineInitializationDuration);
        const pluginFolderExists = await FileSystemUtility.pathExists(dummySearchPlugin.getTemporaryFolderPath());
        expect(pluginFolderExists).toBe(true);
        expect(onRescan.mock.calls.length).toBe(1);
    });

    describe(SearchEngine.prototype.search, () => {
        const searchables: Searchable[] = [
            new DummySearchable(SearchResultItemDummy.withName("Search Result Item 1")),
            new DummySearchable(SearchResultItemDummy.withName("Search Result Item 2")),
            new DummySearchable(SearchResultItemDummy.withName("Search Result Item 3")),
            new DummySearchable(SearchResultItemDummy.withName("Search Result Item 4")),
        ];

        it("should return an empty array if search engine is not initialized yet", async () => {
            const onGetAllSearchables = jest.fn(() => searchables);
            const searchEngine = new SearchEngine(searchEngineSettings, [
                new DummySearchPlugin(tempFolderPath, onGetAllSearchables),
            ]);
            const actual = searchEngine.search("item");
            expect(actual.length).toBe(0);
            expect(searchEngine.isInitialized()).toBe(false);
            await TimeUtility.wait(searchEngineInitializationDuration);
            expect(searchEngine.isInitialized()).toBe(true);
        });

        it("should return an empty array if the search term is an empty string", async () => {
            const onGetAllSearchables = jest.fn(() => searchables);
            const searchEngine = new SearchEngine(searchEngineSettings, [
                new DummySearchPlugin(tempFolderPath, onGetAllSearchables),
            ]);
            await TimeUtility.wait(searchEngineInitializationDuration);
            const actual = searchEngine.search("");
            expect(onGetAllSearchables.mock.calls.length).toBe(0);
            expect(actual.length).toBe(0);
        });

        it("should return all items that match the search term", async () => {
            const onGetAllSearchables = jest.fn(() => searchables);
            const searchEngine = new SearchEngine(searchEngineSettings, [
                new DummySearchPlugin(tempFolderPath, onGetAllSearchables),
            ]);
            await TimeUtility.wait(searchEngineInitializationDuration);
            const actual = searchEngine.search("Search Result Item");
            expect(actual).toEqual(searchables.map((searchable) => searchable.toSearchResultItem()));
            expect(onGetAllSearchables.mock.calls.length).toBe(1);
        });

        it("should be case insensitive", async () => {
            const onGetAllSearchables = jest.fn(() => searchables);
            const searchEngine = new SearchEngine(searchEngineSettings, [
                new DummySearchPlugin(tempFolderPath, onGetAllSearchables),
            ]);
            await TimeUtility.wait(searchEngineInitializationDuration);
            const actual = searchEngine.search("search result item");
            expect(actual).toEqual(searchables.map((searchable) => searchable.toSearchResultItem()));
            expect(onGetAllSearchables.mock.calls.length).toBe(1);
        });

        it("should return an empty array if the search term does not match any of the items", async () => {
            const onGetAllSearchables = jest.fn(() => searchables);
            const searchEngine = new SearchEngine(searchEngineSettings, [
                new DummySearchPlugin(tempFolderPath, onGetAllSearchables),
            ]);
            await TimeUtility.wait(searchEngineInitializationDuration);
            const actual = searchEngine.search("whatever");
            expect(actual).toEqual([]);
            expect(onGetAllSearchables.mock.calls.length).toBe(1);
        });

        it("should support fuzzy search if threshold is high enough", async () => {
            const onGetAllSearchables = jest.fn(() => searchables);
            const searchEngine = new SearchEngine({ threshold: 0.6 }, [
                new DummySearchPlugin(tempFolderPath, onGetAllSearchables),
            ]);
            await TimeUtility.wait(searchEngineInitializationDuration);
            const actual = searchEngine.search("srch rslt");
            expect(actual).toEqual(searchables.map((searchable) => searchable.toSearchResultItem()));
            expect(onGetAllSearchables.mock.calls.length).toBe(1);
        });

        it("should not supporty fuzzy search if threshold is 0", async () => {
            const onGetAllSearchables = jest.fn(() => searchables);
            const searchEngine = new SearchEngine({ threshold: 0 }, [
                new DummySearchPlugin(tempFolderPath, onGetAllSearchables),
            ]);
            await TimeUtility.wait(searchEngineInitializationDuration);
            const actual = searchEngine.search("srch rslt");
            expect(actual).toEqual([]);
            expect(onGetAllSearchables.mock.calls.length).toBe(1);
        });
    });
});
