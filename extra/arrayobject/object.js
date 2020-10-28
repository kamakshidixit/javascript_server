//Object Initialization
// Initialize the Arrays

let user = {
  id : 1,
  firstName : "Kamakshi",
  lastName : "Dikshit",
  Address : "Lucknow",
  age : 22,
  hobbies : [
  "Dancing","Travelling", "Reading"
  ]
  }

  user.id = "Kamakshi";
  console.log(user.id);

  //Accessing and changing Object properties
  console.log(user.firstName);
  console.log(user.lastName);
  console.log(user.age);
  console.log(user.Address);
  console.log(user.hobbies);
  console.log(`user ${user.age}`);

  // Assign Object

  const target_name = {Shweta : 1, Sharma : 2};
  const source_name = {Kamakshi : 3, Dikshit : 4};

  const returendtarget = Object.assign(target_name, source_name);

  console.log(target_name);
  console.log(returendtarget);

  // Create Object methods

  let person1 = {
  id : 2,
  name : "Shweta",
  age : 21,
  Location : "Delhi",
  details: function() {
  console.log('My name is ${this.name}. my age is ${this.age). and my nlocation is ${this.Location');
  }
  };

  const obj1 = Object.create(person1);
  obj1.id = 4;
  obj1.name = "Bhavya";
  obj1.age = 23;
  obj1.Location = " Kanpur";

  obj1.details();

  // IsExtensible Object methods

  const Name = [];
  console.log(Object.isExtensible(Name));
  Object.preventExtensions(Name);

  console.log(Object.isExtensible(Name));

  // Objects keys methods

  const person = {
  name : "Kamakshi",
  age : 22,
  Location : "Lucknow",
  Area : "Barabanki"
  };

  console.log(Object.keys(person));
  console.log(Object.values(person));

  // Entries Objects Methods

  const users = {
  a: 'Good',
  b: 28
  };
  for (const [key, value] of Object.entries(users)) {
  console.log(`${key}: ${value}`);
  }

  // Freeze Objects Methods

  const dancer = {
  id : 12,
  Name : "Kamakshi"
  };

  Object.freeze(dancer);
  dancer.id = 14;
  dancer.Name = "Bhavya";

  console.log(dancer.id);
  console.log(dancer.Name);

  // Frozen Objects Methods

  const person3 = {
  a: 42
  };
  console.log(Object.isFrozen(person3));
  Object.freeze(person3);
  console.log(Object.isFrozen(person3));

  /// Sealed Objects Methods

  const person4 = {
  id: 42
  };
  //false means objects not sealed
  console.log(Object.isSealed(person4));
  Object.seal(person4);
  //True means Objects sealed
  console.log(Object.isSealed(person4));

  /// Object.getOwnProperty Names Methods

  const user4 = {
  id: 1,
  firstName: "Kamakshi",
  lastName: "Dikshit",
  city: "Lucknow",
  age: 22
  };
  console.log(Object.getOwnPropertyNames(user4));

