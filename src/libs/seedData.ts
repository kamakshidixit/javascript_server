import UserRepository from '../repositories/user/UserRepository';
import  configuration  from '../config/configuration';
import * as bcrypt from 'bcrypt';

const userRepository: UserRepository = new UserRepository();

export default () => {
  userRepository.countData()
      .then(res => {
          if (res === 0) {
              console.log('Data seeding in progress');
            userRepository.createUser({
                name: 'Head Trainer',
                role: 'head-trainer',
                email: 'head.trainee@successive.tech',
                password: configuration.PASSWORD
            });
            userRepository.createUser({
                name: 'Trainee',
                role: 'trainee',
                email: 'trainee@successive.tech',
                password: configuration.PASSWORD
            });
          }
        })
        .catch(err => console.log(err));
    };
