<<<<<<< HEAD
export default function createequilatral(n)
=======
function createequilatral(n)
>>>>>>> 2e998150278c9c22a887ed5997640607d31a147c
{
// using for white space
let s = "";
// using for rows
let j = n;
for(let i=1;i<=n;i++){
s=" ".repeat(j);
console.log(s,'* '.repeat(i));
s="";
j--;
<<<<<<< HEAD
}
=======
}     
>>>>>>> 2e998150278c9c22a887ed5997640607d31a147c
}

createequilatral(process.argv[2])

