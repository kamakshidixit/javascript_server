export const users: IUsers[] = [
  {
  traineeEmail: 'trainee1@successive.tech',
  reviewerEmail: 'reviewer1@successive.tech'
  },
  {
  traineeEmail: 'mnr@gmail.com',
  reviewerEmail: 'mnfre@gmail.com'
  },
  {
  traineeEmail: 'trainee2@successive.tech',
  reviewerEmail: 'reviewer2@successive.tech'
  },
  {
  traineeEmail: 'trainee3@successive.tech',
  reviewerEmail: 'reviewer3@successive.tech'
 }

];


export const permissions: IPermissions  = {
  'getUsers': {
  all: ['head-trainer'],
  read : ['trainee', 'trainer'],
  write : ['trainer'],
  delete: [],
  },
  'getAccess' : {
      all : ['trainer'],
      read : ['trainee', 'head-trainer'],
      write : ['trainer'],
      delete : ['head-trainer']
  }
};

  export const payload = {
    'iss': 'successive technologies',
    'iat': 1604767536,
    'exp': Math.floor(Date.now() / 1000) + (15 * 60),
    'aud': 'peers',
    'sub': 'profile setup',
    'email': undefined,
    'password': undefined
    };


