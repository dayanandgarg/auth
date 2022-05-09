import { Router } from "express";
import {
  getAllUsers,
  register,
  searchUser,
  updateUserDetails,
  userLogin,
} from "../libs/controllers/user/user-controller";
import { loginRequired } from "../utils/middleware";
import {loginValidation,registerValidation} from '../utils/validations'

export const router = Router();

router.route("/register").post(registerValidation,register);
router.route("/login").post(loginValidation,userLogin);
router.route("/update").patch(loginRequired, updateUserDetails);
router.route("/get-all").get(loginRequired, getAllUsers);
router.route("/search").get(loginRequired, searchUser);
