/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import { AccountsAccountsOperations } from "../../gen/accounts/operations";

export const reducer: AccountsAccountsOperations = {
  createAccountOperation(state, action, dispatch) {
    // Add new account to the accounts array
    state.accounts.push({
      id: action.input.id,
      name: action.input.name,
      account: action.input.account,
      budgetPath: action.input.budgetPath,
      type: action.input.type,
    });
  },

  updateAccountOperation(state, action, dispatch) {
    const account = state.accounts.find(account => account.id === action.input.id);
    if (!account) {
      throw new Error(`Account with id ${action.input.id} not found`);
    }

    // Update account properties if provided in the input
    if (action.input.name !== undefined) {
      account.name = action.input.name;
    }
    if (action.input.account !== undefined) {
      account.account = action.input.account;
    }
    if (action.input.budgetPath !== undefined) {
      account.budgetPath = action.input.budgetPath;
    }
    if (action.input.type !== undefined) {
      account.type = action.input.type;
    }
  },

  deleteAccountOperation(state, action, dispatch) {
    // Verify account exists before deletion
    const account = state.accounts.find(account => account.id === action.input.id);
    if (!account) {
      throw new Error(`Account with id ${action.input.id} not found`);
    }

    // Remove account from the accounts array
    state.accounts = state.accounts.filter(account => account.id !== action.input.id);
  },
};
