export function executeAjaxGetSync(
    ajaxPromise: (url: string) => Promise<any>,
    url: string,
    ...nextUrlFns: ((res: any) => string)[]): Promise<any> {

    let currentPromise = ajaxPromise(url);
    for (const fn of nextUrlFns) {
        currentPromise = currentPromise.then((res: any) => {
            const nextUrl = fn(res);
            if (nextUrl) {
                return ajaxPromise(nextUrl);
            }
        });
    }

    return currentPromise;
}


export function executeAjaxGet(
    ajaxPromise: (url: string) => Promise<any>,
    ...url2FnMaps: { [key: string]: (res: any) => void }[]): Promise<any> {

    const promises: Promise<any>[] = [];
    for (const kv of url2FnMaps) {
        for (const key in kv) {
            const fn = kv[key];
            promises.push(
                ajaxPromise(key).then((res: any) => {
                fn(res);
            }));
        }
    }

    return Promise.all(promises);
}
