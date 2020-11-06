class UserController {
  static instance: UserController;

  static getInstance() {
  if (UserController.instance) {
  return UserController.instance;
  }

  UserController.instance = new UserController();
  return UserController.instance;
  }
  get(req, res, next) {
  try {
  console.log('Inside get method of trainee controller');
  res.send({
  message: 'Trainee fetched successfully',
  data: [
  {
  name: 'Trainee',
  address: 'Noida'
  }
  ]
  });
  } catch (err) {
  console.log('Inside err', err);
  }
  }
  create(req, res, next) {
  try {
  console.log('Inside post method of trainee controller');
  res.send({
  message: 'Trainee fetched successfully',
  data: [
  {
  name: 'Trainee1',
  address: 'Noida'
  }
  ]
  });
  } catch (err) {
  console.log('Inside err', err);
  }
  }
  update(req, res, next) {
  try {
  console.log('Inside put method of trainee controller');
  res.send({
  message: 'Trainee fetched successfully',
  data: [
  {
  name: 'Trainee2',
  address: 'Noida'
  }
  ]
  });
  } catch (err) {
  console.log('Inside err', err);
  }
  }
  delete(req, res, next) {
  try {
  console.log('Inside delete method of trainee controller');
  res.send({
  message: 'Trainee fetched successfully',
  data: [
  {
  name: 'Trainee3',
  address: 'Noida'
  }
  ]
  });
  } catch (err) {
  console.log('Inside err', err);
  }
  }
  }
  export default UserController.getInstance();





