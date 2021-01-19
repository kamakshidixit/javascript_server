interface IUsers {
  traineeEmail: string;
  reviewerEmail: string;
}

type access = {
  all: string[];
  read: string[];
  write: string[];
  delete: string[];
};


interface IPermissions {
  getUsers: access;
  getAccess: access;
}

export { IPermissions, IUsers };
