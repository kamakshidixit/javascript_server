import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import  configuration  from '../../config/configuration';
import { payload } from '../../libs/routes/constant';
import UserRepository from '../../repositories/user/UserRepository';
import * as bcrypt from 'bcrypt';

class UserController {
    static instance: UserController;
    static getInstance() {
        if (UserController.instance) {
            return UserController.instance;
        }
        UserController.instance = new UserController();
        return UserController.instance;
    }
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();

    }
    public get =  async (req: Request, res: Response, next: NextFunction) => {
        try {
            const extractedData = await this.userRepository.get(req.body, {}, {});
            res.status(200).send({
                message: 'User fetched successfully',
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
            const result = await this.userRepository.create(req.body);
            res.status(200).send({
                message: 'User created successfully',
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
            const result = await this.userRepository.update(req.body);
            res.status(200).send({
                message: 'User updated successfully',
                data: result
            });
        } catch (err) {
            console.log('error is ', err);
        }
    }
    public delete = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const result =   await this.userRepository.delete(req.params.id);
            res.status(200).send({
                message: 'User deleted successfully',
                data:
                    {

                    },
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
            const data = await UserRepository.findOne({ email});
            if (!data) {
                next({
                    message: 'Email not Registered!',
                    error: 'Unauthorized Access',
                    status: 403
                });
            }
            const matchPassword = await bcrypt.compareSync(payload.password, data.password);
            if (matchPassword) {
                const token = jwt.sign(payload, secretKey, { expiresIn: '15m' });
                return res.status(200).send({
                    message: 'token created successfully',
                    data: {
                        generated_token: token
                    },
                    status: 'success'
                });
            }
            next({
                error: 'token not created',
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

export default UserController.getInstance();
