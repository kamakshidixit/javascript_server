import UserRepository from '../repositories/user/UserRepository';
const userRepository: UserRepository = new UserRepository();
export default() => {
userRepository.count({})
.then(res => {
if (res === 0) {
console.log('data seeding in progress');
userRepository.create({
name: 'Head Trainer',
role: 'head-trainer',
email: 'Head.trainee@successive.tech',
password: 'SiteNoida'
});
userRepository.create({
name: 'Trainee',
role: 'trainee',
email: 'trainee@successive.tech',
password: 'trainee1234'
});
}
})
.catch(err => console.log(err));
};

