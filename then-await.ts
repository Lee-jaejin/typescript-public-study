import {writeFile} from "./file-batch/file-api/write-file";
import {mkdir} from "./file-batch/file-api/mkdir";


// (async () => {
//     mkdir('./data')
//     .then(s => writeFile('./data/test.json', JSON.stringify({ name: 'kosmos', age: 30 }, null, 2)))
//         .then(s => console.log(s))
//     .catch(e => console.log(e));
//
// })()

const timeout = (ms) => new Promise((resolve) => {
    setTimeout(() => {
        console.timeLog('test', 'in timeout function')
        console.log(ms);
        resolve(ms);
    }, ms)
});


async function thenAwait() {
    console.time('test');
    console.timeLog('test', 1)
    console.log('rest 0');

    timeout(3000)
    .then((v) => {
        console.timeLog('test', 2)
        console.log(`then ${v}`)
    });

    console.timeLog('test', 3)
    console.log('rest 1');

    console.timeLog('test', 4)
    await timeout(2000);

    console.timeLog('test', 5)
    console.log('rest 2');

    timeout(4000)
    .then(v => {
        console.timeLog('test', 6)
        console.log(`then ${v}`)
    });

    console.timeLog('test', 7)
    console.log('rest 3');
}

async function start() {
    console.time('all')
    await thenAwait();
    console.timeEnd('all');
}

start()

/**
 * await 을 붙인 상위 함수 호출자는 내부의 then 절은 기다리지 않고 진행한다.
 *
 * then 절 전에 원본함수에 await 을 붙이면 기다린다.
 *
 * Promise 의 reject 는 throw 는 아니다.
 *
 * Promise 의 resolve 는 then 으로 받아진다.
 *
 * Promise 의 reject 는 catch 로 받을 수 있다.
 */