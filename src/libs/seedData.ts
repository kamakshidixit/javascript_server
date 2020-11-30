import UserRepository from '../repositories/user/UserRepository';
import  configuration  from '../config/configuration';
import * as bcrypt from 'bcrypt';
const userRepository: UserRepository = new UserRepository();
export async function seed() {
    const res = await userRepository.count();
    if (res === 0) {
        const hashedPassword = bcrypt.hashSync(configuration.password, 10);
            console.log('data seeding in progress');
            userRepository.create({
                name: 'Head Trainer',
                role: 'head-trainer',
                email: 'head.trainee@successive.tech',
                password: hashedPassword
            });
            userRepository.create({
                name: 'Trainee',
                role: 'trainee',
                email: 'trainee@successive.tech',
                password: hashedPassword
            });
        }

}
