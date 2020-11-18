import UserRepository from '../repositories/user/UserRepository';
import * as bcrypt from 'bcrypt';
import configuration from '../config/configuration';

const userRepository: UserRepository =  new UserRepository();
export default() => {
  userRepository.count()
 .then(res => {
    if (res === 0) {
      const saltRounds = 10;
      const password = configuration.password;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      console.log('Data seeding in progress');
      userRepository.createUser ({
        name: 'Head Trainer',
        role: 'Head-Trainer',
        email: 'head.trainee@successive.tech',
        password: hash
      }, undefined);
      userRepository.createUser ({
        name: 'Trainee',
        role: 'Trainee',
        email: 'trainee@successive.tech',
        password: hash
      }, undefined);
    }
    })
    .catch(err => console.log(err));

  };

