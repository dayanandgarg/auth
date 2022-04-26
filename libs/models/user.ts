import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    authToken: {
      type: String,
    },
    mobile: {
      type: Number,
      trim: true,
      maxlength: 10,
      required: true,
    },
    address: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

function hashPass(saltRounds, next, user) {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
}

UserSchema.pre("save", function (next) {
  const user = this;
  const saltRounds = 10;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  hashPass(saltRounds, next, user);
});

export const Users = mongoose.model("user", UserSchema);
