//Creating an Array
let colours = ['Pink', 'Blue', 'Red', 'Black'];
console.log(colours);

//Array length
console.log(colours.length)

//Access an array item using index position
let first = colours[2];
console.log(colours[2]);
let last = colours[colours.length - 1];
console.log(colours.length - 1);

//Loop over an array(Array.ForEach)
colours.forEach(function(item, index, array) {
  console.log(item, index)
})

//Add an item to the end of an array
//colours[4] = 'Violet';
//console.log(colours);

//Array.push()
let newLength = colours.push('Violet')
console.log(colours);

//Array.pop()
let old_length = colours.pop('Violet')
console.log(old_length);

//Array.from()
console.log(Array.from('Blue'));

//Array.isArray()
let x = Array.isArray("colours");
console.log(x);

//ArrayOf()
let box_shapes=Array.of('circle', 'triangle', 'pentagon');
console.log(`box_shapes --> ${box_shapes}`); // doubt
console.log(box_shapes)

//Array.concat()
const pieces = colours.concat(box_shapes);
console.log(pieces);

//Array.reverse()
const reversed = colours.reverse();
console.log('reversed:', reversed);

// Array.copyWithin()
console.log(colours.copyWithin(0, 1, 2, 3));

//Array.IndexOf()
console.log(colours.indexOf('Red'));

//Array.slice()
let Copy = colours.slice() // Copy an Array
console.log(Copy);

//Array.unshift()
let newLength1 = colours.unshift('Green') // green add to the front
console.log(newLength1)


