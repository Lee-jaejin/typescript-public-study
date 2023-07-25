export {}

/**
 * Discriminated unions
 * 구별 가능한 유니언
 */
// interface Shape {
//     kind: "circle" | "square";
//     radius?: number;
//     sideLength?: number;
// }

interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    sideLength: number;
}

type Shape = Circle | Square;

function handleShape(shape: Shape) {
    // kind: "circle" | "square"; 같이 함으로써
    // 이런 상황을 피할 수 있다.
    // if (shape.kind === "rect") {
    //
    // }
}

function getArea(shape: Shape) {
    /** if else, switch case 둘다 가능 */
    // if (shape.kind === "circle") {
    //     return Math.PI * shape.radius ** 2;
    // } else if (shape.kind === "square") {
    //     return shape.sideLength ** 2;
    // } else {
    //     throw new Error('undefined shape!');
    // }

    /**
     * As an aside, try playing around with the above example and remove some of the return keywords. You’ll see that type-checking can help avoid bugs when accidentally falling through different clauses in a switch statement.
     * TODO: 이 말은 아직 이해 못함...
     */
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
    }
}

/**
 * The never type
 * 유형을 전부 좁히고 나서 절대 존재하면 안되는 경우
 *
 */
// Exhaustiveness checking (철저한 확인)
function getArea2(shape: Shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        default:
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}

// 만약 Triangle 이라는 종류를 추가하고 switch case 문은 그대로 둔다면
/*
interface Triangle {
    kind: "triangle";
    sideLength: number;
}

type Shape2 = Circle | Square | Triangle;

function getArea3(shape: Shape2) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        default:
            // TS2322: Type 'Triangle' is not assignable to type 'never'.
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}

 */
 // 이렇게 됨
