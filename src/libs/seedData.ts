import UserRepository from '../repositories/user/UserRepository';
import  configuration  from '../config/configuration';
import * as bcrypt from 'bcrypt';
const userRepository: UserRepository = new UserRepository();
export default () => {
  userRepository.countData()
      .then(res => {
          if (res === 0) {
            const saltRounds = 10;
            const password = configuration.PASSWORD;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
              console.log('Data seeding in progress');
            userRepository.create({
                name: 'Head Trainer',
                role: 'head-trainer',
                email: 'head.trainee@successive.tech',
                password: hash
            }, undefined);
            userRepository.create({
                name: 'Trainee',
                role: 'trainee',
                email: 'trainee@successive.tech',
                password: hash
            }, undefined);
          }
        })
        .catch(err => console.log(err));
    };

