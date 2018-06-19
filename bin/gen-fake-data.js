const faker = require('faker');

const users = [];
for (let i = 0; i < 100; i += 1) {
  const user = {};
  user.uuid = faker.random.uuid();
  user.name = faker.name.findName();
  user.phone = faker.phone.phoneNumber();
  user.email = faker.internet.email();
  user.avatar = faker.internet.avatar();
  user.color = faker.internet.color();
  users.push(user);
}

console.info(JSON.stringify(users, null, 2));
