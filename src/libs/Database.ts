import * as mongoose from 'mongoose';
import seedData from './seedData';

class Database {
  static open(mongoURL) {
    return new Promise((resolve, reject) => {
    console.log('Inside open method');
    mongoose.connect(mongoURL, { useNewUrlParser: true , useUnifiedTopology: true } , (err) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      seedData();
      // tslint:disable-next-line: no-null-keyword
      resolve(null);
    });

  });
}
 // static disconnect() {
   // console.log('Disconnected');
    // mongoose.connection.close();

  }
// }
export default Database;

