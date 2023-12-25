import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {UserEntityMock} from '../_mocks_/user.mock'
import { createUserMock } from '../_mocks_/createUser.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,
      {
        provide: getRepositoryToken(UserEntity),
        useValue: {
          findOne: jest.fn().mockResolvedValue(UserEntityMock),
          save: jest.fn().mockResolvedValue(UserEntityMock),
        }
      }],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity)
    )
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user in findUserByEmail', async () => {
    const user = await service.findUserByEmail(UserEntityMock.email);
    expect(user).toEqual(UserEntityMock)
  })

  it('should return error in in findUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined)
    expect(
      service.findUserByEmail(UserEntityMock.email),
    ).rejects.toThrow()
  }) 

  it('should return error in in findUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined)
    expect(
      service.findUserByEmail(UserEntityMock.email),
    ).rejects.toThrow()
  }) 

  it('should return error in in findUserByEmail (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error())
    expect(
      service.findUserByEmail(UserEntityMock.email),
    ).rejects.toThrow()
  }) 

  it('should return user in findUserById', async () => {
    const user = await service.findUserById(UserEntityMock.id);
    expect(user).toEqual(UserEntityMock)
  })

  it('should return error in in findUserById (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error())
    expect(
      service.findUserById(UserEntityMock.id),
    ).rejects.toThrow()
  }) 
  
  it('should return user in getUserByIdUsingRelations', async () => {
    const user = await service.getUserByIdUsingRelations(UserEntityMock.id);
    expect(user).toEqual(UserEntityMock)
  })

  it('should return error if user exist', async () => {
    expect(service.createUser(createUserMock)).rejects.toThrow()
  })

  it('should return user if user not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined)

    const user = await service.createUser(createUserMock)

    expect(user).toEqual(UserEntityMock)
  })
});
