import bcrypt from 'bcryptjs';

const users = [
  // first user sample data
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('admin', 10),
    isAdmin: true,
  },
  //   second user sample data
  {
    name: 'Jelly Bean',
    email: 'jelly@email.com',
    password: bcrypt.hashSync('jelly', 10),
  },
  //   third user sample data
  {
    name: 'Hello Kitty',
    email: 'hello@email,com',
    password: bcrypt.hashSync('hello', 10),
  },
];

export default users;
