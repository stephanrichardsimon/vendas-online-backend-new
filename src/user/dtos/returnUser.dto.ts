import { UserEntity } from '../entities/user.entity';

export class ReturnUserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  constructor(private readonly userEntity: UserEntity) {
    (this.id = userEntity.id),
      (this.name = userEntity.name),
      (this.email = userEntity.email),
      (this.phone = userEntity.phone),
      (this.cpf = userEntity.cpf);
  }
}
