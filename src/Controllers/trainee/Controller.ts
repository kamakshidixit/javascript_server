import { Request, Response, NextFunction } from 'express';

class TraineeController {
    static instance: TraineeController;

    static getInstance() {
        if ( TraineeController.instance ) {
            return TraineeController.instance;
        }

        TraineeController.instance = new TraineeController();
        return TraineeController.instance;
    }

    get ( req: Request, res: Response, next: NextFunction ) {
        try {
            console.log('Inside get method of Trainee Controller');
            res.send({
                message: 'Trainees fetched successfully',
                data: [
                    {
                    name: 'Trainee1',
                    address: 'Noida'
                }
            ]

            });

        }
        catch ( err ) {
            console.log('inside err', err);

        }

    }

    create ( req: Request, res: Response, next: NextFunction ) {
        try {
            console.log('Inside post method of Trainee Controller');
            res.send({
                message: 'Trainees created successfully',
                data: {
                    name: 'Trainee1',
                    address: 'Noida'
                }
             });

        }
        catch ( err ) {
            console.log('inside err', err);

        }

    }


    update ( req: Request, res: Response, next: NextFunction ) {
        try {
            console.log('Inside put method of Trainee Controller');
            res.send({
                message: 'Trainees updated successfully',
                data: {
                    name: 'Trainee1',
                    address: 'Noida'
                }
             });

        } catch ( err ) {
            console.log('inside err', err);

        }

    }

    delete ( req: Request, res: Response, next: NextFunction ) {
        try {
            console.log('Inside delete method of Trainee Controller');
            res.send({
                message: 'Trainees Deleted successfully',
                data: {
                    name: 'Trainee1',
                    address: 'Noida'
                }
             });

        } catch ( err ) {
            console.log('inside err', err);

        }

    }
}

export default TraineeController.getInstance();
