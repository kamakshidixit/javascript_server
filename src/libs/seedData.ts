import UserRepository from '../repositories/user/UserRepository';
import * as bcrypt from 'bcrypt';
import configuration from '../config/configuration';
const userRepository: UserRepository = new UserRepository();
export default () => {
    userRepository.count()
    .then(res => {
        if (res === 0) {
            console.log('data seeding in progress');
            userRepository.create({
                id: '1',
                name: 'Head Trainee',
                role: 'Head-trainee',
                email: 'headtrainee@successive.tech',
                password: configuration.PASSWORD
            }, undefined);
            userRepository.create({
                id: '2',
                name: 'Trainee',
                role: 'Trainee',
                email: 'trainee@successive.tech',
                password: configuration.PASSWORD
            }, undefined);
        }
    })
    .catch(err => console.log(err));
};
