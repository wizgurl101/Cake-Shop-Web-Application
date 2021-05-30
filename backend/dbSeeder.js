// dbSeeder.js delete all data from database and import sample data
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import userSampleData from './data/userSampleData.js';
import productSampleData from './data/productSampleData.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import connectToDatabase from './config/db.js';

// connect to database
dotenv.config();
connectToDatabase();

// destory all data from database
const destoryData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    console.log('All data from database are destroyed!'.red.inverse);
    // end connection to the database
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// import sample data to database
const importData = async () => {
  try {
    // clear database
    await User.deleteMany();
    await Product.deleteMany();

    // add user sample data
    const createdNewUsers = await User.insertMany(userSampleData);

    // get the admin user from the first element in the new created users array
    const adminUser = createdNewUsers[0]._id;

    // have the admin user to be the user for all sample products
    const newProducts = productSampleData.map((product) => {
      return { ...product, user: adminUser };
    });

    // add product sample data
    await Product.insertMany(newProducts);

    console.log('Imported sample data to database'.green.inverse);
    // end connection to the database
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// check command line to see if user want to import or delete data
if (process.argv[2] === '-d') {
  destoryData();
} else {
  importData();
}
