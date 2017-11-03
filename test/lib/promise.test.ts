import { } from "jest";

import * as http from "../../src/lib/promise";

describe("promise", () => {
    function test_executeAjaxGetSync(throwErrorMessage?: string): Promise<any> {
        const startUrl = "1";
        return http.executeAjaxGetSync((url: string) => {
            return new Promise<any>((resolve, reject) => {
                if (throwErrorMessage && url === "12") {
                    reject(throwErrorMessage);
                } else {
                    resolve(url);
                }
            });
        }, startUrl,
            (res: any) => {
                expect(res).toBe("1");
                return `${res}2`;
            },
            (res: any) => {
                expect(res).toBe("12");
                return `${res}3`;
            },
            (res: any) => {
                expect(res).toBe("123");
                return null;
            });
    }

    it("executeAjaxGetSync: ok", () => {
        return test_executeAjaxGetSync();
    });

    it("executeAjaxGetSync: should throw error if existing promise rejection", () => {
        return test_executeAjaxGetSync("ERROR").catch((err: any) => {
            expect(err).toBe("ERROR");
        });
    });

    function test_executeAjaxGet(throwErrorMessage?: string): Promise<any> {
        return http.executeAjaxGet((url: string) => {
            return new Promise<any>((resolve, reject) => {
                if (throwErrorMessage && url === "2") {
                    reject(throwErrorMessage);
                } else {
                    resolve(url);
                }
            });
        }, {
            "1": (res: any) => {
                expect(res).toBe("1");
            }
            }, {
                "2": (res: any) => {
                    expect(res).toBe("2");
                }
            });
    }

    it("executeAjaxGet: ok", () => {
        return test_executeAjaxGet();
    });

    it("executeAjaxGet: should throw error if existing promise rejection", () => {
        return test_executeAjaxGet("ERROR").catch((res: any) => {
            expect(res).toBe("ERROR");
        });
    });
});
