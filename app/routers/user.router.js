import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import validationMiddleware from '../libraries/middlewares/validation.middleware.js';
import userPostSchema from '../schemas/user.post.schema.js';
import userUpdateSchema from '../schemas/user.update.schema.js';
import loginPostSchema from '../schemas/login.post.schema.js';
import auth from '../libraries/middlewares/auth.middleware.js';
import cw from '../libraries/middlewares/controllerWrapper.middleware.js';
import compareCityDepartmentMiddleware from '../libraries/middlewares/compareCityDepartment.middleware.js';


export const router = Router();

router.route('/signin')
/**
 * POST /api/users/signin
 * @summary Signin the user
 * @tags users
 * @param {UserSignin} request.body.required - user's info
 * @return {UserResponse} 201 - User Created Successfully
 * @return {ErrorResponseJson} 409 - Phone number or email already exists
 * @return {ErrorResponseJson} 500 - server error 
 * @example request - Example request payload
 * {
 *   "firstname": "John",
 *   "lastname": "Doe",
 *   "email": "john.doe@example.com!!",
 *   "password": "SecurePass123",
 *   "repeatPassword": "SecurePass123!!",
 *   "city": "New York",
 *   "phone_number": "0123456789"
 * }
 * @example response - 201 - Example success response
 * {
 *   "message": "User created successfully"
 * }
 * @example response - 409 - Example error response
 * {
 *   "error": "Phone number or email already exists"
 * }
 */
  .post(
    validationMiddleware(userPostSchema, 'body'),
    compareCityDepartmentMiddleware(),
    cw(userController.store)
  );


  router.route('/login')
  /**
   * POST /api/users/login
   * @summary Signup the user
   * @tags users
   * @param {UserLogin} request.body.required - user's info to connect
   * @return {UserResponse} 200 - Exemple success response
   * @return {ErrorResponseJson} 401 - Exemple error response 
   * @return {ErrorResponseJson} 500 - server error 
   * @example request - example request payload
   * {
   *  "email": "john.doe@example.com",
   *  "password": "SecurePass123!!"
   * }
   * @example response - 200 - Example success response
   * {
   *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   * }
   * @example response - 401 - Example error response
   * {
   *   "error": "Incorrect email or password"
   * }
  */
  .post(
    validationMiddleware(loginPostSchema, 'body'),
    cw(userController.login)
  );

router.route('/:id(\\d+)')
/**
 * GET /api/users/:id
 * @summary get user's info
 * @tags users
 * @return {UserInfos} 200 - user's infos
 * @return {ErrorResponseJson} 500 - server error 
 * @return {ErrorResponseJson} 404 - user not found
 */
  .get(
    auth(), 
    cw(userController.show)
  )
/**
 * DELETE /api/users/{id}
 * @summary delete a user, need to be connected
 * @tags users
 * @param {number} id.path.required
 * @return {UserInfos} 200 - success message
 * @return {ErrorResponseJson} 403 - Access forbidden
 * @example response - 200 - Example success response
 * {
 *  "message": "User profile removed successfully"
 * }
 * @example response - 403 - Example error response 
 * {
 * "error": "Access forbidden"
 * }
 */
  .delete(
    auth(),
    cw(userController.delete)
  )
  /**
 * PATCH /api/users/:id
 * @summary Modify the user's profil, need to be connected
 * @tags users
 * @param {UserSignin} request.body - user's info
 * @param {number} id.path.required
 * @return {UserResponse} 201 - User Created Successfully
 * @return {ErrorResponseJson} 403 - Access forbidden 
 * @return {ErrorResponseJson} 409 - Phone number or email already exists
 * @return {ErrorResponseJson} 500 - server error 
 * @example request - Example request payload
 * {
 *   "firstname": "John",
 *   "lastname": "Doe",
 *   "email": "john.doe@example.com",
 *   "password": "SecurePass123",
 *   "repeatPassword": "SecurePass123",
 *   "city": "New York",
 *   "phone_number": "0123456789"
 * }
 * @example response - 201 - Example success response
 * {
 *   "message": "User's data updated successfully"
 * }
 * @example response - 409 - Example error response
 * {
 *   "error": "Phone number or email already exists"
 * }
 */
  .patch(
    auth(),
    validationMiddleware(userUpdateSchema, 'body'),
    cw(userController.update)
  )
