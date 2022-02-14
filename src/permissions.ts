const encodePerms = (arr: any[]) => arr.reduce((sum, i) => sum + i, 0);

const Perm = {
  VIEW_BOOKS: 1,
  VIEW_USERS: 2,

  RENT_BOOKS: 4,
  RENT_UNLIMITED_BOOKS: 8,

  MANAGE_BOOKS: 16,
  MANAGE_USERS: 32,

  CHANGE_PERMISSIONS: 64,
};
const NO_ACCOUNT_REQUIRED_PERMS_INT = encodePerms([]);
const DEFAULT_USER_PERMS_INT = encodePerms([Perm.RENT_BOOKS]);
const LIBRARIAN_PERMS_INT = encodePerms([
  Perm.VIEW_USERS,
  Perm.MANAGE_BOOKS,
  Perm.MANAGE_USERS,
]);
export {
  Perm,
  NO_ACCOUNT_REQUIRED_PERMS_INT,
  DEFAULT_USER_PERMS_INT,
  LIBRARIAN_PERMS_INT,
};
