import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserservice {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExist = await this.usersRepository.findByEmail(email);

    const hashedPassword = await hash(password, 8);

    if (checkUserExist) {
      throw new AppError('Email address alredy used');
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserservice;
