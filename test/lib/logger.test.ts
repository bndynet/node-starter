import * as fs from "fs-extra";

import {} from "jest";
import { Logger } from "../../src/lib/logger";

describe("logger", () => {
    it("should create deep dir for logs", () => {
        const dir = "./log/log/log";
        const logger = new Logger(dir);
        expect(fs.pathExistsSync(dir)).toBeTruthy();
        fs.removeSync("./log");
    });
});