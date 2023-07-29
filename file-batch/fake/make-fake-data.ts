import {IFake} from "./i-fake";
import {faker} from "@faker-js/faker";


export const makeFakeData = (): IFake => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    profession: faker.person.jobTitle(),
    birthday: faker.date.birthdate(),
    sentence: faker.lorem.sentence()
});

export { IFake };