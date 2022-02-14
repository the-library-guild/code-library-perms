import { Perm } from "./permissions";

function encodePerms(
  permsList: number | number[],
  permsEnum: { [key: string]: number } = Perm
): number {
  if (Number.isInteger(permsList)) return permsList as number;
  if (!Array.isArray(permsList)) return 0;

  const permsInt = permsList
    .filter((i) => Object.values(permsEnum).includes(i))
    .reduce((sum, i) => sum + i, 0);

  return permsInt;
}
function decodePerms(
  permsInt: number | number[],
  permsEnum: { [key: string]: number } = Perm
): number[] {
  if (Array.isArray(permsInt)) return permsInt;
  if (!Number.isInteger(permsInt)) return [];

  const permsList = [];
  let sum = 0;

  const permStrings = Object.values(permsEnum);
  permStrings.reverse();

  for (const value of permStrings)
    if (value + sum <= permsInt) {
      permsList.push(value);
      sum += value;
    }

  permsList.reverse();

  return permsList;
}
export { encodePerms, decodePerms };
