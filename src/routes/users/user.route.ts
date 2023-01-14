import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from './user.controller';

const userRoute = express.Router();

userRoute.get('/', getUsers);
userRoute.get('/:userID', getUser);
userRoute.delete('/:userID', deleteUser);
userRoute.patch('/:userID', updateUser);

export default userRoute;
