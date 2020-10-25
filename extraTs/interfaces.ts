interface IUsers {
  traineeEmail : String;
  reviewerEmail : String;
}

type access = {
  all : String[];
  read : String[];
  write : String[];
  delete : String[];
}

interface IPermissions {
  getUsers : access;
  getAccess : access;
};
