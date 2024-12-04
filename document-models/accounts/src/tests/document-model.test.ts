/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import utils, { initialGlobalState, initialLocalState } from "../../gen/utils";

describe("Accounts Document Model", () => {
  it("should create a new Accounts document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.documentType).toBe("powerhouse/accounts");
  });

  it("should create a new Accounts document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
  });
});
