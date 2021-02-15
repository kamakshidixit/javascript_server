import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import configuration from '../../config/configuration';
import { payload } from '../../libs/routes/constant';
import UserRepository from '../../repositories/user/UserRepository';
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
  public get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const extractedData = await this.userRepository.get(req.body, {}, {});
      console.log(extractedData);
      res.status(200).send({
        message: 'User fetched successfully',
        data: extractedData,
        status: 'success',
      });
    } catch (err) {
      console.log('error is ', err);
    }
  }
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('hfhf--', req.body);
    //  console.log('Params--', req.query);
      const result = await this.userRepository.create(req.body);
      console.log('vvbvb---', result);
      res.status(200).send({
        message: 'User created successfully',
        data: result,
        status: 'success',
      });
    } catch (err) {
      console.log('error is ', err);
    }
  }
  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userRepository.update(req.body);
      console.log(result);
      res.status(200).send({
        message: 'User updated successfully',
        data: result
      });
    } catch (err) {
      console.log('error is ', err);
    }
  }
  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userRepository.delete(req.params.id);
      // await this.userRepository.delete(req.params.id);
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
  login(req: Request, res: Response, next: NextFunction) {
    try {
      const secretKey = configuration.SECRET;
      console.log('dddd---', configuration);
      payload.email = req.body.email;
      payload.password = req.body.password;
      UserRepository.findOne({ email: req.body.email, passsword: req.body.passsword })
        .then((data) => {
          if (data === null) {
            next({
              message: 'user not found',
              error: 'Unauthorized Access',
              status: 403
            });
          }
          else {
            const token = jwt.sign(payload, secretKey);
            res.status(200).send({
              message: 'token created successfully',
              data: {
                generated_token: token
              },
              status: 'success'
            });
          }
        })
        .catch((err) => {
          console.log('data not found', err);
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
