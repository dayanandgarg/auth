import { Users } from "../../models/user";
import * as jwt from "jsonwebtoken";
import { compareSync, genSalt, hash } from "bcrypt";

export const checkEmail = async (email) => {
  const Data = await Users.findOne({ email: email });
  return Data ? true : false;
};
export const generateJwtTokenForUser = (userData) => {
  return jwt.sign(
    {
      _id: userData._id,
    },
    process.env.JWT_KEY || "secret"
  );
};
export const saveUser = async (params) => {
  try {
    const user = await checkEmail(params.email);
    if (user) {
      throw Error("User Already Exist with this email");
    }
    const data = await Users.create(params);
    const userData = data.toJSON();
    delete userData.password;
    return userData;
  } catch (error) {
    throw Error(error.message);
  }
};

export const getAll = async (query) => {
  try {
    const data = await Users.find({})
      .select("-password")
      .skip((parseInt(query.page || 1) - 1) * 10)
      .limit(10);

    return { users: data, page: parseInt(query.page || 1) };
  } catch (error) {
    throw Error(error.message);
  }
};

export const login = async (params) => {
  try {
    const user = await Users.findOne({ email: params.email });
    if (!user) {
      throw Error("Invalid Email or password");
    } else if (!compareSync(params.password, user.password)) {
      throw Error("Invalid Email or password");
    }
    const userData = user.toJSON();
    delete userData.password;

    const token = generateJwtTokenForUser(user);
    return { user: userData, token };
  } catch (error) {
    throw Error(error.message);
  }
};

export const updateUser = async (req) => {
  try {
    if (req.body.password) {
      const salt = await genSalt(10);
      req.body.password = await hash(req.body.password, salt);
    }
    const data = await Users.findByIdAndUpdate(req.user._id, req.body, {
      useFindAndModify: false,
      new: true,
    });
    const userData = data.toJSON();
    delete userData.password;
    return userData;
  } catch (error) {
    throw Error(error.message);
  }
};

export const search = async (query) => {
  try {
    const data = await Users.find({
      $or: [
        { firstName: { $regex: query.value, $options: "i" } },
        { lastName: { $regex: query.value, $options: "i" } },
        { email: { $regex: query.value, $options: "i" } },
        { mobile: typeof query.value === "string" ? null : query.value },
      ],
    })
      .select("-password")
      .skip((parseInt(query.page || 1) - 1) * 10)
      .limit(10);
    return { users: data, page: query.page || 1 };
  } catch (error) {
    throw Error(error.message);
  }
};
