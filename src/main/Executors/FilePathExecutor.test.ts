import { FilePathExecutor } from "./FilePathExecutor";
import { SearchResultItemDummy } from "../../common/SearchResult/SearchResultItemDummy";

describe(FilePathExecutor, () => {
    it("should succeed if the file path opener resolves", (done) => {
        new FilePathExecutor(() => Promise.resolve())
            .execute(SearchResultItemDummy.empty())
            .then(() => done())
            .catch((error) => done(error));
    });

    it("should fail if the file path opener rejects", (done) => {
        new FilePathExecutor(() => Promise.reject("Failed"))
            .execute(SearchResultItemDummy.empty())
            .then(() => done("Should have failed"))
            .catch(() => done());
    });
});
