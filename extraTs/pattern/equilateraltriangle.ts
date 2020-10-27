export default function createequilatral(n: number): void {
// using for white space
let s: string = '';
// using for rows
let j: number = n;
for (let i: number = 1; i <= n; i++) {
s = ' '.repeat(j);
console.log(s, '* '.repeat(i));
s = '';
j--;
}

}




