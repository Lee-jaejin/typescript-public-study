export {}
/**
 * Modules
 *
 * import 또는 export 선언이 있는 모든 파일이 모듈로 간주되고,
 * import 또는 export 선언이 없다면 전역 모듈로 간주된다.
 * JavaScript 는 export 나 await 구문이 없는 파일은 하나의 script 로 생각한다.
 * script 는 마치 HTML 에서 script 태그를 쓴것과 같고, export 나 await 이 없는
 * 파일에 선언되어 있는 모든 변수는 전역이 된다.
 *
 * 해당 파일에서 아무것도 모듈화 하고 싶지 않으면 단지 `export {}` 라인만 추가해주면 된다.
 */

/**
 * Modules in TypeScript
 * 타입스크립트에서 모듈을 사용하려면 세가지 점을 유의해야 한다
 *
 * Syntax (문법): import, export 하기 위해서 어떤 문법을 쓸지?
 * Module Resolution (모듈 해상도): 모듈 이름과 파일의 관계
 * Module Output Target (모듈 출력 목표): 자바스크립트 모듈에 어떻게 보이고 싶은지?
 */

// ES Module Syntax
/*
// @filename: hello.ts
export default function helloWorld() {
    console.log("Hello, world!");
}
// 이것은 이런식으로 import 될 수 있다
import helloWorld from "./hello.js";
helloWorld();

 */

// import * as math from "./maths.js"
// 와 같은 문법으로 해당 파일에 대한 모든 export 를 하나의 객체로 받아올 수 있다.

// import "./maths.js"
// 같은 사용은 아무것도 아닐 수 있지만, maths.ts 에 있는 코드들이 평가되어
// 다른 객체들에 side-effect 를 줄 수도 있는 것을 알 수 있다.

/**
 * TypeScript Specific ES Module Syntax
 */
/*
import type { Cat, Dog } from "./animal";
export type Animals = Cat | Dog;

import type { createCatName } from "./animal";
// TS1361: 'createCatName' cannot be used as a value because it was imported using 'import type'.
const name = createCatName();

 */

// 이렇게도 사용할 수 있다.
// 이렇게 같이 가져오는 문법을 사용하면 Babel, swc, esbuild 같은
// 비 타입스크립트 트랜스파일러가 어떤 import 를 안전하게 제거해야 하는지
// 아는데 도움이 된다.
import { createCatName, type Cat, type Dog } from "./animal";
export type Animals = Dog | Cat;
const name = createCatName();

/**
 * ES Module Syntax with CommonJS Behavior
 *
 * require 도 사용할 수 있지만 일대일로 가져와야 하기 때문에 비 효율적이다
 */

/**
 * CommonJS Syntax
 * ES 모듈 방식으로 사용하더라도 CommonJS 방식의
 * 원리에 대한 이해가 있으면 디버깅하기가 더 쉽다
 */

// maths.ts 파일에 보면
// 식별자는 module 이라는 전역 객체에 export 속성을 사용해 내보낸다.

const maths = require("./maths");
console.log(maths.pi);

const { squareTwo } = require("./maths");
console.log(squareTwo);

/**
 * CommonJS and ES Modules interop
 * CommonJS 와 ES 모듈 사이의 상호운용성
 * 상호운용성에 대한 충돌 방지를 위해 TypeScript 설정에서 esModuleInterop 가 존재함.
 * esModuleInterop 은 활성화되면 allowSyntheticDefaultImports 도 활성화 되는데,
 * 이는
 * import * as React from "react;
 * 와 같은 문법 대신에
 * import React from "react";
 * 를 사용할 수 있게 해준다.
 * (default export 가 없다면)
 */

/**
 * TypeScript's Module Resolution Options
 * import 또는 require 문에서 문자열을 가져오고 해당 문자열이 참조하는 파일을 결정하는 프로세스
 * 타입스크립트는 Classic 과 Node 방식의 두가지 전략을 가지고 있는데,
 * 설정이 module: commonjs 가 아닐 경우에는 과거 호환성을 위해 Classic 을 취한다.
 * Node 전략은 Node.js 의 동작 방식과 동일하며, .ts, .d.ts 파일도 추가적으로 확인한다.
 *
 * 더 자세한 사항은 내용이 방대하여 각 링크로 대체한다.
 * config 관련
 *  - moduleResolution: https://www.typescriptlang.org/tsconfig#moduleResolution
 *  - baseUrl: https://www.typescriptlang.org/tsconfig#baseUrl
 *  - paths: https://www.typescriptlang.org/tsconfig#paths
 *  - rootDirs: https://www.typescriptlang.org/tsconfig#rootDirs
 *
 * 모듈 전략이 동작하는 원리에 대한 전체적인 세부사항은
 * https://www.typescriptlang.org/docs/handbook/module-resolution.html
 * 여기서 확인해볼 수 있다.
 */

/**
 * TypeScript's Module Output Options
 * 모듈 출력 옵션
 *
 * 자바스크립트 파일로 변경될때 영향을 주는 컴파일러 옵션
 * target: 자바스크립트 버전 선택
 * module: 모듈끼리 상호작용할때 어떤 코드를 사용할건지
 */

