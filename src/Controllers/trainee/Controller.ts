import { Request, Response, NextFunction } from 'express';
import  configuration  from '../../config/configuration';
import { payload } from '../../libs/routes/constant';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import  userRepository  from '../../repositories/user/UserRepository';
class TraineeController {
    private traineeRepository: userRepository;
    constructor() {
        this.traineeRepository = new userRepository();

    }
    static instance: TraineeController;
    static getInstance() {
        if (TraineeController.instance) {
            return TraineeController.instance;
        }
        TraineeController.instance = new TraineeController();
        return TraineeController.instance;
    }

    public get =  async (req: Request, res: Response, next: NextFunction) => {
        try {
            const extractedData = await this.traineeRepository.get(req.body, {}, {});
            res.status(200).send({
                message: 'Trainee fetched successfully',
                data: extractedData,
                status: 'success',
            });
        } catch (err) {
            console.log('error is ', err);
        }
    }
    public create = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const rawPassword = req.body.password;
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(rawPassword, salt);
            req.body.password = hashedPassword;
            const result = await this.traineeRepository.create(req.body);
            res.status(200).send({
                message: 'Trainee created successfully',
                data: result,
                status: 'success',
            });
        } catch (err) {
            console.log('error is ', err);
        }
    }
    public update = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            if ('password' in data) {
                const rawPassword = data.password;
                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(rawPassword, salt);
                data.password = hashedPassword;
            }
            const result = await this.traineeRepository.update(req.body);
            res.status(200).send({
                message: 'Trainee updated successfully',
                data: result
            });
        } catch (err) {
            console.log('error is ', err);
        }
    }
    public delete = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const result =   await this.traineeRepository.delete(req.params.id);
            res.status(200).send({
                message: 'Trainee deleted successfully',
                data: {},
                status: 'success',
            });
        } catch (err) {
            console.log('error is ', err);
        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const secretKey = configuration.SECRET;
            const { email, password} = req.body;
            payload.password = password;
            payload.email = email;
            const data = await userRepository.findOne({ email});
            if (!data) {
                next({
                    message: 'Email not Registered!',
                    error: 'Unauthorized Access',
                    status: 403
                });
            }
            const matchPassword = await bcrypt.compareSync(payload.password, data.password);
            if (matchPassword) {
                const token = jwt.sign(payload, secretKey);
                return res.status(200).send({
                    message: 'token created successfully',
                    data: {
                        generated_token: token
                    },
                    status: 'success'
                });
            }
            next({
                error: 'token not found',
                status: 400,
                message: 'Error'
            });

        }

        catch (err) {
        return next({
            error: 'bad request',
            message: err,
            status: 400
        });
    }
}


    async me(req, res, next) {
        try {
            res.send({
                data: (req.user),
            });
        }
        catch (err) {
            return next({
                error: 'bad request',
                message: err,
                status: 400
            });
        }
    }

}

export default TraineeController.getInstance();
