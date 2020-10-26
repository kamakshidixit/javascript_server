<<<<<<< HEAD
export default function creatediamond(n)
=======
function creatediamond(n)
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
}
for(let i=n;i>=1;i--){
s=" ".repeat(j);
console.log(s,' *'.repeat(i));
s="";
j++;
}
}

creatediamond(process.argv[2])
