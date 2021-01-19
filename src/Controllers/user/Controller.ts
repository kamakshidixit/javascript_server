import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import UserRepository from '../../repositories/user/UserRepository';
import configuration from '../../config/configuration';
import { payload } from '../../libs/routes/constant';
import IRequest from '../../IRequest';

class UserController {
  static instance: UserController;

  static getInstance() {
    if (UserController.instance) {
      return UserController.instance;
    }
    UserController.instance = new UserController();
    return UserController.instance;
  }
  public async get(req: IRequest, res: Response, next: NextFunction) {
    try {
      const userRepository = new UserRepository();
      const extractedData = await userRepository.findAll(req.body, {}, {});
      res.status(200).send({
        message: 'User fetched successfully',
        data: [extractedData],
        status: 'success',
      });
    }
    catch (err) {
      console.log('error is ', err);
    }
  }
  public async create(req: IRequest, res: Response, next: NextFunction) {
    try {
      const userRepository = new UserRepository();
      userRepository.userCreate(req.body);
      res.status(200).send({
        message: 'User created successfully',
        data: [req.body],
        status: 'success',
      });
    }
    catch (err) {
      console.log('error is ', err);
    }
  }
  public async update(req: IRequest, res: Response, next: NextFunction) {
    try {
      const userRepository = new UserRepository();
      userRepository.userUpdate(req.body);
      res.status(200).send({
        message: 'User updated successfully',
        data: [req.body]
      });
    }
    catch (err) {
      console.log('error is ', err);
    }
  }
  public async delete(req: IRequest, res: Response, next: NextFunction) {
    try {
      const userRepository = new UserRepository();
      userRepository.delete(req.params.id);
      res.status(200).send({
        message: 'trainee deleted successfully',
        data: [
          {
            Id: req.params.id
          }
        ],
        status: 'success',
      });
    }
    catch (err) {
      console.log('error is ', err);
    }
  }
  public async login(req: IRequest, res: Response, next: NextFunction) {
    try {
      const secret = configuration.SECRET_KEY;
      const { email, password } = req.body;
      payload.password = password;
      const userData = await UserRepository.readOne({ email });
      if (userData === null) {
        return next({
          message: 'Email Not Registered! ',
          error: 'Unauthorized Access',
          status: 403
        });
      }
      else {
        if (email === userData.email) {
          const result = bcrypt.compareSync(payload.password, userData.password);
          if (result) {
            console.log('Password matched![Authorized User]');
            const token = jwt.sign({ userData }, secret);
            res.status(200).send({
              message: 'Authorization Token',
              data: token,
              status: 200
            });
          }
          else {
            console.log('Password not matched!');
            res.status(400).send({
              message: 'Invalid Password!',
              error: 'Unauthorized Access',
              status: 403
            });
          }
        }
      }
    }
    catch (err) {
      res.send(err);
      return next({
        error: 'bad request',
        message: err,
        status: 400
      });
    }

  }
  me(req: IRequest, res: Response, next: NextFunction) {
    const data = res.locals.userData;
    console.log('Data::::', data);
    res.json({
      data
    });
  }

}
export default UserController.getInstance();
