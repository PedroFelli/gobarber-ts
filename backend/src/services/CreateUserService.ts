
import {getRepository} from 'typeorm';
import {hash} from 'bcryptjs';

import User from '../models/User';

interface Request{
  name: string;
  email: string;
  password: string;
}

class CreateUserservice {
  async execute({ name, email, password}): Promise<User>{

    const usersRepository = getRepository(User);

    const checkUserExist = await usersRepository.findOne({
      where: {email},
    });

    const hashedPassword = await hash(password, 8)

    if(checkUserExist){
      throw new Error('Email address alredy used');
    }

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }

}

export default CreateUserservice;
