import validateEmail from './helper';

  export default function validateUsers(users){
  let vuser=[];
  let iuser=[];
  let icount=0;
  let vcount=0;
  users.forEach(({traineeEmail,reviewerEmail}) => {
  if(validateEmail(traineeEmail)&&validateEmail(reviewerEmail))
  {
  icount+=1;
  vuser.push({traineeEmail,reviewerEmail});
  return icount;
  }
  else
  {
  vcount+=1;
  iuser.push({traineeEmail,reviewerEmail});
  return vcount;
  }
  });


  console.log("Number of valid users",icount);
  console.log("Number of Invalid users",vcount);
  console.log();
  console.log("valid users",vuser);
  console.log("Invalid users",iuser);
  console.log();


  }

  // validateUsers(users);


