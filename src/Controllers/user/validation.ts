const config = {
  create: {
    id: {
      required: false,
      string: true,
      in: ['body'],
      custom (value) {
        console.log('Value', value);
        throw {
          error: 'Error Occured',
          message: 'Message'
        };
      }
    },
    name: {
      required: true,
      regex: '',
      in: ['body'],
      errorMessage: 'Name is required',
    }
  },
  Delete: {
    id: {
      required: false,
      errorMessage: 'Id is required',
      in: ['params']
    }
  },
  get: {
    skip: {
      required: false,
      default: 0,
      number: true,
      in: ['query'],
      errorMessage: 'Skip is invalid',
    },
    limit: {
      required: false,
      default: 10,
      number: true,
      in: ['query'],
      errorMessage: 'Limit is invalid',
    }
  },
  update: {
    id: {
      required: false,
      string: true,
      in: ['body']
    }
    // dataToUpdate: {
    //   in: ['body'],
    //   required: false,
    //   isObject: true,
    //   custom: (dataToUpdate) => {
    //     console.log('dataToUpdate' , dataToUpdate);
    // }
  // }
},
login: {
  email: {
      required: true,
      string: true,
      in: ['body'],
  },
      password: {
          required: true,
          string: true,
          in: ['body'],
      }
  }
};


  export default config;
