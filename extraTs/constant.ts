const permissions : IPermissions  = {
  'getUsers': {
  all: ['head-trainer'],
  read : ['trainee', 'trainer'],
  write : ['trainer'],
  delete: [],
  },
  'getAccess' : {
      all : ['trainer'],
      read : ['trainee','head-trainer'],
      write : ['trainer'],
      delete : ['head-trainer'],
  }
}

const users : IUsers [] = [
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
  ]
