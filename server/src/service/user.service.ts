import { randomUUID } from 'crypto';
import { User, CreateUserDto, UpdateUserDto } from '../model/user.model';
import { readFileData, writeFileData } from '../utils/fileHandler';

const FILE_NAME = 'users.json';

/** Get all users */
export const getAllUsers = async (): Promise<User[]> => {
  return readFileData<User>(FILE_NAME);
};

/** Get user by ID */
export const getUserById = async (id: string): Promise<User | null> => {
  const users = await readFileData<User>(FILE_NAME);
  return users.find((user) => user.id === id) ?? null;
};

/** Create user */
export const createUser = async (userData: CreateUserDto): Promise<User> => {
  const users = await readFileData<User>(FILE_NAME);

  const now = new Date().toISOString();

  const newUser: User = {
    id: randomUUID(),
    ...userData,
    createdAt: now,
    updatedAt: now,
  };

  await writeFileData(FILE_NAME, [...users, newUser]);
  return newUser;
};

/** Update user */
export const updateUser = async (
  id: string,
  userData: UpdateUserDto,
): Promise<User | null> => {
  const users = await readFileData<User>(FILE_NAME);
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) return null;

  const updatedUser: User = {
    ...users[index],
    ...userData,
    updatedAt: new Date().toISOString(),
  };

  users[index] = updatedUser;
  await writeFileData(FILE_NAME, users);

  return updatedUser;
};

/** Delete user */
export const deleteUser = async (id: string): Promise<boolean> => {
  const users = await readFileData<User>(FILE_NAME);
  const updatedUsers = users.filter((user) => user.id !== id);

  if (users.length === updatedUsers.length) {
    return false;
  }

  await writeFileData(FILE_NAME, updatedUsers);
  return true;
};
