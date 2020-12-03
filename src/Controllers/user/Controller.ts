import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import UserRepository from '../../repositories/user/UserRepository';
import { config } from '../../config';
import IRequest from '../../IRequest';

class UserController {

public async get(req: IRequest, res: Response, next: NextFunction) {
  try {
      console.log('Inside get method of User Controller');
      const userRepository = new UserRepository();
      const searchField = req.query.srch;
      const user = new UserRepository();
      if (searchField) {
        user.searchUser({
          '$or': [
              {name: {$regex: searchField, $options: '$i' } },
              {email: {$regex: searchField, $options: '$i'} }
          ]
      })

      .then(data => {
          res.send(data);
      })

      .catch ((err) => {
          res.send({
              message: 'no results',
              code: 404
          });
      });
      }
      const sort = {};
      sort[`${req.query.sortedBy}`] = req.query.sortedOrder;
      const extractedData = await userRepository.getAll(req.body).sort(sort).skip(Number(req.query.skip)).limit(Number(req.query.limit));
      // console.log('sort, skip, limit ,body', sort, req.query.skip, req.query.limit, req.body);
      res.status(200).send({
          message: 'User fetched successfully',
          totalCount: await userRepository.count(req.body),
          count: extractedData.length,
          data: [extractedData],
          status: 'success',
      });

  }
  catch (err) {
      console.log('Inside err', err);
  }
}

// To create a new user

public async create(req: IRequest, res: Response, next: NextFunction) {
  const { id, email, name, role, password } = req.body;
  const creator = req.userData._id;
  const user = new UserRepository();
  try {
    const result = await user.create({id, email, name, role, password }, creator);
    console.log(req.body);
    res.send({
      status: 'ok',
      message: 'User Created Successfully!',
      result: {
        'id': id,
        'name': name,
        'email': email,
        'role': role,
        'password': password
      },
    });
  }
  catch (err) {
    console.log(err);
    res.send({
      error: 'Value is not given properly',
      code: 500
    });
  }
}

// To update the existing user data

public async update(req: IRequest, res: Response, next: NextFunction) {
  const { id, dataToUpdate } = req.body;
  console.log('id', id);
  console.log('dataToUpdate', dataToUpdate);
  const updator = req.userData._id;
  const user = new UserRepository();
  try {
    const result = await user.updateUser( id, dataToUpdate, updator);
    res.send({
      status: 'ok',
      message: 'User Updated Successfully',
      data: result,

    });
  }
  catch (err) {
    res.send({
      error: 'User not found for update',
      code: 404
    });
  }
}

// To delete the existing User

public async delete(req: IRequest, res: Response, next: NextFunction) {
  const  id  = req.params.id;
  const remover = req.userData._id;
  const user = new UserRepository();
  try {
     await user.deleteData(id, remover);
     res.send({
       status: 'ok',
       message: 'User Deleted successfully',
      });
    }
    catch (err) {
      res.send({
        message: 'User not found to be deleted',
        code: 404
      });
    }
  }

  // To fetch the authorization token

  public async login(req: IRequest, res: Response, next: NextFunction) {
  const { email } = req.body;
  const user = new UserRepository();
  try {
    const userData = await user.getUser({ email });
    console.log('User: ', userData);
    if (userData === null) {
      res.status(404).send({
        err: 'User Not Found',
        code: 404
      });
      return;
    }
    const { password } = userData;
    if (!bcrypt.compare(req.body.password, password)) {
      res.status(401).send({
          err: 'Invalid Password',
          code: 401
      });
      return;
  }
    const token = jwt.sign(userData.toJSON(), config.SECRET, {
      expiresIn: Math.floor(Date.now() / 1000) + ( 15 * 60),
    });
    res.send({
      status: 'ok',
      message: 'Authorization Token',
      'token': token
    });
    return;
    }
    catch (err) {
      res.send({
        error: 'User Not login',
        code: 404
      });
    console.log('ee: ', err);
    }
  }

  // To fetch the current user

  public async me(req: IRequest, res: Response, next: NextFunction) {
  const id = req.query;
  const user = new UserRepository();
  try {
    const data = await user.getUser( id );
    res.status(200).send({
      status: 'ok',
      message: 'Me',
      'data':  data ,
    });
  } catch (err) {
    console.log(err);
    res.send({
      error: 'User fetched not successfully',
      code: 500
    });
  }
}
}

export default new UserController();