import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/user-type.enum";

export const UserEntityMock: UserEntity = {
    id: 21,
    name: 'Roberta Coutinho',
    email: 'roberta@mail.com',
    phone: '3712-1315',
    cpf: '03562498080',
    password: '123',
    typeUser: UserType.User,
    createdAt: new Date(),
    updatedAt: new Date(),
}
