export default function createequilatral(n)
function createequilatral(n)
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
}     

createequilatral(process.argv[2])

