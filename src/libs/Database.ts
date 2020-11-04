import * as mongoose from 'mongoose';

class Database {
  static open(mongoURL) {
    return new Promise((resolve, reject)=> {
    console.log("Inside open method");
    mongoose.connect(mongoURL, { useNewUrlParser: true , useUnifiedTopology: true } , (err) => {
      if(err){
        console.log(err);
        reject(err)
        return;
      }
      resolve(null)
    });

  });
}
 static disconnect() {
    console.log('Disconnected');
    mongoose.connection.close();

  }
}
export default Database;

