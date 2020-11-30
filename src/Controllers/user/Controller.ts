import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import configuration from '../../config/configuration';
import { payload } from '../../libs/routes/constant';
import UserRepository from '../../repositories/user/UserRepository';
import * as bcrypt from 'bcrypt';
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
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();

  }
  public get = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      function escapeRegExp(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      }
      const { skip, limit, sort } = req.query;
      if (req.query.search !== undefined) {
        const regex = new RegExp(escapeRegExp(req.query.search), 'gi');
        const extractedData = await this.userRepository.get({ email: regex } || { name: regex }, {},
          {
            limit: Number(limit),
            skip: Number(skip),
            sort: { [String(sort)]: 1 },
            collation: ({ locale: 'en' })
          });
        const totalCount = await this.userRepository.get({}, {}, {});
        res.status(200).send({
          message: 'trainee fetched successfully',
          totalCount: totalCount.length,
          count: extractedData.length,
          data: extractedData,
          status: 'success',
        });
      }
      else {
        const extractedData = await this.userRepository.get(req.body, {}, {
          limit: Number(limit),
          skip: Number(skip),
          sort: { [String(sort)]: 1 }
        });
        const totalCount = await this.userRepository.get({}, {}, {});
        const countUser = extractedData.length;
        res.status(200).send({
          message: 'Trainee fetched successfully',
          TotalCount: totalCount.length,
          CountUser: countUser,
          data: extractedData,
          status: 'success',
        });
      }
    } catch (err) {
      console.log('error is ', err);
    }
  }
  public create = async (req: IRequest, res: Response, next: NextFunction) => {
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
  public update = async (req: IRequest, res: Response, next: NextFunction) => {
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
  public delete = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const result = await this.userRepository.delete(req.params.id);
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
  async login(req: IRequest, res: Response, next: NextFunction) {
    try {
      const secretKey = configuration.secret;
      const { email, password } = req.body;
      payload.password = password;
      payload.email = email;
      const data = await UserRepository.findOne({ email });
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
          message: 'Authorization Token',
          data: {
            generated_token: token
          },
          status: 'OK'
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

  me(req: IRequest, res: Response, next: NextFunction) {
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
