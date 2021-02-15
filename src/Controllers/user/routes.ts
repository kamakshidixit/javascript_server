import { Router } from 'express';
import userController from './Controller';
import validationHandler from '../../libs/validationHandler';
import validation from './validation';
import { authMiddleWare } from '../../libs/routes';
import { hasPermission } from '../../libs/permissions';
const UserRouter = Router();
/**
 * @swagger
 *
 *  definitions:
 *      me:
 *        type: object
 *        properties:
 *          message:
 *              type: string
 *              example: Me
 *          status:
 *              type: string
 *              example: OK
 *          data:
 *              iss: Online JWT Builder
 *              iat: 1605048360
 *              exp: 1636584360
 *              name: skldjf
 *              email: skldjf@successive.tech
 *              role: trainee
 *      Login:
 *        type: object
 *        properties:
 *          email:
 *              type: string
 *              example: headtrainer@successive.tech
 *          password:
 *              type: string
 *              example: "12345"
 *      Token:
 *           type: object
 *           properties:
 *               status:
 *                   example: Ok
 *               message:
 *                   example: Success
 *               data:
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5laGEuZ29lbEBzdWNjZXNzaXZlLnRlY2giLCJpZCI6IjVlNGEzNmJjNjQ4MjRiMWY4MGI3MzBjZCIsImlhdCI6MTU4MjU0OTIyN30.cFV6YYlfmhJ1yL3GyIIgb-PjMTpDNVICd5KGi1ENpVI
 */
UserRouter.route('/')
  /**
   * @swagger
   *
   * /api/user:
   *   get:
   *     tags:
   *       - User
   *     description: List of all the trainees
   *     security:
   *       - Bearer: []
   *     consumes:
   *       - application/json
   *     produces:
   *        - application/json
   *     parameters:
   *       - name: skip
   *         description: Number of elements to skip
   *         in: query
   *         required: false
   *         type: number
   *       - name: limit
   *         description: number of elements to show
   *         in: query
   *         required: false
   *         type: number
   *       - name: sortedOrder
   *         description: Parameter to sort (name or email)
   *         in: query
   *         required: false
   *         type: string
   *       - name: sortedBy
   *         description: Elements to sort By(sorting order)
   *         in: query
   *         required: false
   *         type: string
   *       - name: srch
   *         description: Element to search
   *         in: query
   *         required: false
   *         type: string
   *     responses:
   *       200:
   *         description: Trainee List
   *         schema:
   *              properties:
   *                  status:
   *                      example: OK
   *                  message:
   *                      example: 'successfully fetched Trainee'
   *                  TotalCount:
   *                      example: 10
   *                  TraineeCount:
   *                      example: 2
   *                  data:
   *                      type: object
   *                      allOf:
   *                              - $ref: '#/definitions/TraineeResponse'
   *       403:
   *         description: unauthorised access
   *         schema:
   *              $ref: '#/definitions/Unauthorized'
   */
  .get(authMiddleWare('getUsers', 'read'), validationHandler(validation.get), userController.get)
  /**
   * @swagger
   *
   * /api/user:
   *   post:
   *     tags:
   *       - User
   *     description: Returns the success reponse on creation
   *     security:
   *       - Bearer: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: User
   *         description: Data of users.
   *         in: body
   *         required: true
   *         type: object
   *         schema:
   *             $ref: '#/definitions/TraineePost'
   *     responses:
   *       200:
   *         description: User Created Successfully
   *         schema:
   *              oneOf:
   *              properties:
   *                  status:
   *                      example: OK
   *                  message:
   *                      example: Trainee Created Successfully
   *                  data:
   *                      type: object
   *                      allOf:
   *                          - $ref: '#/definitions/TraineeResponse'
   *                      properties:
   *                              name:
   *                                  type: string
   *                                  example: "HarshRastogi"
   *       403:
   *         description: unauthorised access
   *         schema:
   *              $ref: '#/definitions/Unauthorized'
   */
  .post(authMiddleWare('getUsers', 'read'), validationHandler(validation.create), userController.create)
  /**
   * @swagger
   *
   * /api/user:
   *   put:
   *     tags:
   *       - User
   *     description: Returns the success reponse on Updation
   *     security:
   *       - Bearer: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: User
   *         description: Data of users.
   *         in: body
   *         required: true
   *         type: object
   *         schema:
   *          oneOf:
   *          properties:
   *              id:
   *                  example: 5e4e6e93c095d84d34045a30
   *              dataToUpdate:
   *                  type: object
   *                  allOf:
   *                      - $ref: '#/definitions/TraineePost'
   *     responses:
   *       200:
   *         description: User Updated Successfully
   *         schema:
   *              oneOf:
   *              properties:
   *                  status:
   *                      example: OK
   *                  message:
   *                      example: successfully upddate
   *                  data:
   *                      type: object
   *                      allOf:
   *                          - $ref: '#/definitions/TraineeResponse'
   *       403:
   *         description: unauthorised access
   *         schema:
   *              $ref: '#/definitions/Unauthorized'
   */
  .put(authMiddleWare('getUsers', 'read'), validationHandler(validation.update), userController.update)
  /**
   * @swagger
   *
   * /api/user:
   *   delete:
   *     tags:
   *       - User
   *     description: Returns the success reponse on deletion
   *     security:
   *       - Bearer: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: ID of user to be deleted.
   *         in: query
   *         required: true
   *         example: 2
   *     responses:
   *       200:
   *         description: Data deleted
   *         schema:
   *              oneOf:
   *              properties:
   *                  status:
   *                      example: OK
   *                  message:
   *                      example: Deleted successfully
   *                  code:
   *                      example: 200
   *       403:
   *         description: unauthorised access
   *         schema:
   *              $ref: '#/definitions/Unauthorized'
   */
  .delete(authMiddleWare('getUsers', 'read'), validationHandler(validation.Delete), userController.delete);

/**
 * @swagger
 *
 * /api/user/login:
 *   post:
 *     tags:
 *       - User
 *     description: Login Credentials
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: User email and password
 *         in: body
 *         required: true
 *         type: object
 *         schema:
 *             $ref: '#/definitions/Login'
 *     responses:
 *       200:
 *         description: login
 *         schema:
 *              $ref: '#/definitions/Token'
 *       422:
 *         description: invalid email or password
 *         schema:
 *          oneOf:
 *          properties:
 *              status:
 *                  example: "200"
 *              message:
 *                  example: Password does not match
 *              err:
 *                  example: Password is incorrect
 */
UserRouter.route('/login')
  .post(validationHandler(validation.login), userController.login);
/**
 * @swagger
 *
 * /api/user/me:
 *   get:
 *     tags:
 *       - User
 *     description: Current user Details.
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of user you want to see
 *         in: query
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: success
 *         schema:
 *             $ref: '#/definitions/me'
 */
UserRouter.route('/me')
  .get(authMiddleWare('getUsers', 'read'), userController.me);

export default UserRouter;
