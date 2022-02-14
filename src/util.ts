import { decodePerms, encodePerms } from "./core";
import { NO_ACCOUNT_REQUIRED_PERMS_INT } from "./permissions";

function hasPerms(
  userPermsInt: number | number[],
  requiredPermsInt: number
): boolean {
  const userPerms = decodePerms(
    combinePerms(userPermsInt, NO_ACCOUNT_REQUIRED_PERMS_INT)
  );
  const requiredPerms = decodePerms(requiredPermsInt);

  return requiredPerms.every((i) => userPerms.includes(i));
}
function combinePerms(
  permsInt0: number | number[],
  permsInt1: number | number[]
): number {
  const perms0 = decodePerms(permsInt0);
  const perms1 = decodePerms(permsInt1);
  const newPerms = [...perms0, ...perms1.filter((i) => !perms0.includes(i))];

  return encodePerms(newPerms);
}
function removePerms(
  userPermsInt: number,
  permsIntToBeRemoved: number
): number {
  const userPerms = decodePerms(userPermsInt);
  const permsToBeRemoved = decodePerms(permsIntToBeRemoved);

  const newUserPerms = userPerms.filter(
    (perm) => !permsToBeRemoved.includes(perm)
  );
  return encodePerms(newUserPerms);
}
export { hasPerms, combinePerms, removePerms };
