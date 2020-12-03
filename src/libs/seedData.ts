import UserRepository from '../repositories/user/UserRepository';
import * as bcrypt from 'bcrypt';
import configuration from '../config/configuration';
const userRepository: UserRepository = new UserRepository();
export async function seed() {
    userRepository.countData();
    const res = await userRepository.countData();
        if (res === 0) {
          const saltRounds = 10;
          const password = configuration.PASSWORD;
          const salt = bcrypt.genSaltSync(saltRounds);
          const hash = bcrypt.hashSync(password, salt);
            console.log('data seeding in progress');
            userRepository.create({
                name: 'Head Trainer',
                role: 'Head-trainer',
                email: 'headtrainee@successive.tech',
                password: hash
            }, undefined);
            userRepository.create({
                name: 'Trainee',
                role: 'Trainee',
                email: 'trainee@successive.tech',
                password: hash
            }, undefined);
        }
    }
