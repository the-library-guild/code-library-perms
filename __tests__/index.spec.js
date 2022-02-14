const {
  Perm,
  encodePerms,
  decodePerms,
  combinePerms,
  removePerms,
  hasPerms,
} = require("../dist/index");

describe("Perm enum", () => {
  test("it is valid", () => {
    const ints = Object.values(Perm);

    const validInts = ints.filter((i, idx) => {
      if (idx === 0) return i === 1;
      return i / ints[idx - 1] === 2;
    });
    expect(validInts.length).toEqual(ints.length);
  });
});
describe("encodePerms", () => {
  test("it works with numbers", () => {
    const input = Perm.VIEW_BOOKS;
    const output = 1;

    expect(encodePerms(input)).toEqual(output);
  });
  test("it works with arrays", () => {
    const input = [Perm.VIEW_BOOKS, Perm.VIEW_USERS];
    const output = 3;

    expect(encodePerms(input)).toEqual(output);
  });
});
describe("decodePerms", () => {
  test("it works with numbers", () => {
    const input = Perm.VIEW_BOOKS;
    const output = [1];

    expect(decodePerms(input)).toEqual(output);
  });
  test("it works with arrays", () => {
    const input = [Perm.VIEW_BOOKS, Perm.VIEW_USERS];
    const output = [1, 2];

    expect(decodePerms(input)).toEqual(output);
  });
});
describe("combinePerms", () => {
  test("it works with numbers", () => {
    const input0 = Perm.VIEW_BOOKS;
    const input1 = Perm.VIEW_USERS;

    expect(combinePerms(input0, input1)).toEqual(
      Perm.VIEW_BOOKS + Perm.VIEW_USERS
    );
  });
  test("it works with arrays", () => {
    const input0 = [Perm.VIEW_BOOKS, Perm.VIEW_USERS];
    const input1 = [Perm.MANAGE_USERS];

    expect(combinePerms(input0, input1)).toEqual(
      Perm.VIEW_BOOKS + Perm.VIEW_USERS + Perm.MANAGE_USERS
    );
  });
  test("it removes duplicates", () => {
    const input0 = [Perm.VIEW_BOOKS, Perm.VIEW_USERS];
    const input1 = [Perm.MANAGE_USERS, Perm.VIEW_BOOKS];

    expect(combinePerms(input0, input1)).toEqual(
      Perm.VIEW_BOOKS + Perm.VIEW_USERS + Perm.MANAGE_USERS
    );
  });
});
describe("removePerms", () => {
  test("it works with numbers", () => {
    const input0 = Perm.VIEW_BOOKS + Perm.MANAGE_BOOKS;
    const input1 = Perm.VIEW_BOOKS;

    expect(removePerms(input0, input1)).toEqual(Perm.MANAGE_BOOKS);
  });
  test("it works with arrays", () => {
    const input0 = [Perm.VIEW_BOOKS];
    const input1 = [Perm.VIEW_BOOKS];

    expect(removePerms(input0, input1)).toEqual(0);
  });
});
describe("hasPerms", () => {
  test("it works with numbers", () => {
    const input = Perm.VIEW_BOOKS + Perm.VIEW_USERS;

    expect(hasPerms(input, Perm.VIEW_BOOKS)).toEqual(true);
  });
  test("it works with arrays", () => {
    const input = [Perm.VIEW_BOOKS, Perm.VIEW_USERS];

    expect(hasPerms(input, Perm.VIEW_BOOKS)).toEqual(true);
  });
  test("it can fail", () => {
    const input = Perm.MANAGE_BOOKS;

    expect(hasPerms(input, Perm.VIEW_BOOKS)).toEqual(false);
  });
  test("it cannot break", () => {
    const input = 5;
    expect(hasPerms(input, 1)).toEqual(true);
  });
});
