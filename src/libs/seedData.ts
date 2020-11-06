import UserRepository from '../repositories/user/UserRepository';

const userRepository: UserRepository =  new UserRepository();
export default() => {
  userRepository.count()
 .then(res => {
    if(res === 0) {
      console.log('Data seeding in progress');
      userRepository.create({
        name: 'Head Trainer',
        role: 'Head-Trainer',
        email:'head.trainee@successive.tech',
        password: 'SiteNoida'
      });
      userRepository.create({
        name: 'Trainee',
        role: 'Trainee',
        email: 'trainee@successive.tech',
        password: 'trainee1234'
      });
    }
    })
    .catch(err => console.log(err));

  }

