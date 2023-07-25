export {}

/**
 * Mixin
 * 믹스인은 재사용 가능한 구성 요소에서 클래스를 빌드하는 방법
 * 더 간단한 부분 클래스를 결합하여 클래스를 빌드함
 */

// Disposable Mixin
class Disposable {
    public isDisposed: boolean = false;
    dispose() {
        this.isDisposed = true;
    }

}

// Activatable Mixin
class Activatable {
    isActive: boolean = false;
    activate() {
        this.isActive = true;
    }
    deactivate() {
        this.isActive = false;
    }
}

class SmartObject {
    constructor() {
        setInterval(() => {
            console.log(this.isActive + " : " + this.isDisposed)
            console.log(this)
        }, 500);
    }

    interact() {
        this.activate();
    }
}

interface SmartObject extends Disposable, Activatable {}
applyMixins(SmartObject, [Disposable, Activatable]);

// let smartObj = new SmartObject();
// setTimeout(() => smartObj.interact(), 1000);
// setTimeout(() => smartObj.dispose(), 2000);
// setTimeout(() => smartObj.deactivate(), 3000);

////////////////////////////////////////
// In your runtime library somewhere
////////////////////////////////////////

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            console.log(Object.getOwnPropertyDescriptor(baseCtor.prototype, name))
            Object.defineProperty(
                derivedCtor.prototype,
                name,
                Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null)
            );
        });
    });
}


/**
 * Constraints
 * 데코레이터는 믹스인으로 사용할 수 없음
 */
const Pausable = (target: typeof Player) => {
    return class Pausable extends target {
        shouldFreeze = false;
    }
}

@Pausable
class Player {
    x = 0;
    y = 0;
}

const player = new Player();
// TS2339: Property 'shouldFreeze' does not exist on type 'Player'.
// player.shouldFreeze;

type FreezablePlayer = Player & { shouldFreeze: boolean };

const playerTwo = (new Player() as unknown) as FreezablePlayer;
playerTwo.shouldFreeze = true;
console.log(playerTwo)

/**
 * Static Property Mixins
 * 정적 프로퍼티를 갖는 믹스인
 * 클래스는 싱글턴 패턴을 가지므로, 타입 시스템에서 다른 변수 타입을 지원할 수 없다.
 * 클래스를 반환하는 제네릭 함수를 만듦으로서 이를 해결할 수 있다.
 */
function base<T>() {
    class Base {
        static prop: T;
    }
    return Base;
}

function derived<T>() {
    class Derived extends base<T>() {
        static anotherProp: T;
    }
    return Derived;
}

class Spec extends derived<string>() {}

console.log(Spec.prop);
console.log(Spec.anotherProp);
console.log(Spec);