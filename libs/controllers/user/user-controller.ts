import { returnErrorResponse, returnSuccessResponse } from "../../../helpers";
import { getAll, login, saveUser, search, updateUser } from "./user.service";

export const register = async (req, res) => {
  try {
    const data = await saveUser(req.body);
    return returnSuccessResponse("Success", data, res);
  } catch (error) {
    return returnErrorResponse(error.message, res);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const data = await getAll(req.query);
    return returnSuccessResponse("Success", data, res);
  } catch (error) {
    return returnErrorResponse(error.message, res);
  }
};

export const userLogin = async (req, res) => {
  try {
    const data = await login(req.body);
    return returnSuccessResponse("LoggedIn successfully", data, res);
  } catch (error) {
    return returnErrorResponse(error.message, res);
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const data = await updateUser(req);
    return returnSuccessResponse("Updated", data, res);
  } catch (error) {
    return returnErrorResponse(error.message, res);
  }
};

export const searchUser = async (req, res) => {
  try {
    const data = await search(req.query);
    return returnSuccessResponse("Success", data, res);
  } catch (error) {
    return returnErrorResponse(error.message, res);
  }
};
