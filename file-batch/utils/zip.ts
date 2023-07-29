

export const zip = (keys: string[], values: any[]): object => {
    const makeObject = (key: string, value: any) => ({[key]: value});
    const mergeObject = (a: any[]) => a.reduce((accu, val) => ({...accu, ...val}), {});

    let tmp = keys.map((key: string, index: number) => [key, values[index]])
    .filter(a => a[0] && a[1])
    .map(a => makeObject(a[0], a[1]));
    return mergeObject(tmp);
}

/**
 * 1. keys.map -> ['name', 'Jaejin'] (첫번째 돌때)
 *    1 - 1. 두번째 돌때는 ['address', '가좌로']
 * 2. filter -> 없는 값 검사, 제거
 * 3. .map -> { name: 'Jaejin' }
 * 4. mergeObject -> { name: 'Jaejin', address: '가좌로', ... }
 * key 순서대로 객체 배열이 만들어짐
 */