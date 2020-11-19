import UserRepository from '../repositories/user/UserRepository';

const userRepository: UserRepository =  new UserRepository();
export default() => {
  userRepository.count()
 .then(res => {
    if (res === 0) {
      console.log('Data seeding in progress');
      userRepository.createUser ({
        name: 'Head Trainer',
        role: 'Head-Trainer',
        email: 'head.trainee@successive.tech',
        password: 'SiteNoida'
      }, undefined);
      userRepository.createUser ({
        name: 'Trainee',
        role: 'Trainee',
        email: 'trainee@successive.tech',
        password: 'trainee1234'
      }, undefined);
    }
    })
    .catch(err => console.log(err));

  };

