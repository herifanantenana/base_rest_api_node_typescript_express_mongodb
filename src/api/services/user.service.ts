import { UserModel } from "api/models/user.model";

export const getUsers = () => {
  return UserModel.find();
}

export const getUserByEmail = (email: string) => {
  return UserModel.findOne({ email });
}

export const getUserBySessionToken = (sessionToken: string) => {
  return UserModel.findOne({ "authentication.sessimToken": sessionToken });
}

export const getUserById = (id: string) => {
  return UserModel.findById(id);
}

export const createUser = (values: Record<string, any>) => {
  return new UserModel(values).save().then((user) => user.toObject());
}
export const deleteUserById = (id: string) => {
  return UserModel.findByIdAndDelete(id);
}

export const updateUserById = (id: string, values: Record<string, any>) => {
  return UserModel.findByIdAndUpdate(id, values);
}