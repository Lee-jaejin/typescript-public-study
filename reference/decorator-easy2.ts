import { BadRequestException } from '@nestjs/common';
/**
 * 매개변수 데코레이터
 */
console.log('================ 매개변수 데코레이터 ================');

function MinLength(min: number) {
    return function (target: any, propertyKey: string, parameterIndex: number) {
        target.validators = {
            minLength: function (args: string[]) {
                console.log(parameterIndex, 'index')
                return args[parameterIndex].length >= min;
            }
        }
    }
}

function Validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    console.log(target)

    descriptor.value = function(...args) {
        console.log(args)
        Object.keys(target.validators).forEach(key => {
            // console.log(target.validators[key](args), 'test')
            if (!target.validators[key](args)) {
                throw new BadRequestException();
            }
        })
        method.apply(this, args);
    }
}

class User {
    private name: string;
    private address: string;

    @Validate
    setName(@MinLength(3) name: string, @MinLength(100) address: string) {
        this.name = name;
        this.address = address;
    }
}

const t = new User();
t.setName('Jaejin', 'address1');
console.log('----------');
// t.setName('te', 'address2');

