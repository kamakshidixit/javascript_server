import * as mongoose from 'mongoose';
import seedData from './seedData';

class Database {
  static open(MONGO_URL) {
    return new Promise((resolve, reject) => {
      console.log('mongoDB Url is:', MONGO_URL);
      console.log('Inside open method');
      mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        seedData();
        // tslint:disable-next-line: no-null-keyword
        resolve(undefined);
      });

    });
  }
  public static disconnect() {
    console.log('Disconnected');
    mongoose.connection.close();

  }
}
export default Database;

