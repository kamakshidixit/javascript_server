import UserRepository from '../repositories/user/UserRepository';
import * as bcrypt from 'bcrypt';
import configuration from '../config/configuration';

const userRepository: UserRepository = new UserRepository();
export async function seed() {
  const res = await userRepository.count();
  if (res === 0) {
    console.log('Data seeding in progress');
    userRepository.create({
      name: 'Head Trainer',
      role: 'Head-Trainer',
      email: 'head.trainee@successive.tech',
      password: configuration.PASSWORD
    });
    userRepository.create({
      name: 'Trainee',
      role: 'Trainee',
      email: 'trainee@successive.tech',
      password: configuration.PASSWORD
    });
  }
}


