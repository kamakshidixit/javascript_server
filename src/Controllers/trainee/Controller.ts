class TraineeController {
  static instance: TraineeController;

  static getInstance() {
      if (TraineeController.instance) {
          return TraineeController.instance;
      }
      TraineeController.instance = new TraineeController();
      return TraineeController.instance;
  }
  get(req, res, next) {
      try {
          res.send({
              message: 'Trainees fetched successfully',
              data: [
                  {
                      name: 'trainee1',
                      address: 'Noida'
                  }
              ]
          });

      } catch ( err ) {
          console.log('inside err', err);

      }
  }
  create(req, res, next) {
      try {
          console.log('inside post method of trainee controller');

          res.send({
              message: 'Trainees created successfully',
              data: {
                  name: 'trainee1',
                  address: 'noida'
              }
          });
      } catch (err) {
          console.log('inside err', err);
      }
  }
  update(req, res, next) {
      try {
          console.log('inside update method of trainee controller');
          res.send({
              message: 'Trainees updated successfully',
              data: {
                  name: 'trainee1',
                  address: 'noida'
              }
          });
      } catch (err) {
          console.log('inside err', err);
      }
  }
  Delete(req, res, next) {
      try {
          console.log('inside delete method');
          res.send({
              message: 'trainees deleted successfully',
              data: {
                  name: 'trainee1',
                  address: 'noida'
              }
          });
      } catch (err) {
          console.log('inside err', err);
      }
  }
}
export default TraineeController.getInstance();
