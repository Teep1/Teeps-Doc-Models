/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import { AccountTransactionsAccountTransactionsOperations } from "../../gen/account-transactions/operations";

export const reducer: AccountTransactionsAccountTransactionsOperations = {
  createTransactionOperation(state, action, dispatch) {
    // Add new transaction to the transactions array
    state.transactions.push({
      id: action.input.id,
      fromAccount: action.input.fromAccount,
      toAccount: action.input.toAccount,
      amount: action.input.amount,
      datetime: action.input.datetime,
      details: action.input.details,
      budget: action.input.budget
    });
  },

  updateTransactionOperation(state, action, dispatch) {
    const transaction = state.transactions.find(tx => tx.id === action.input.id);
    if (!transaction) {
      throw new Error(`Transaction with id ${action.input.id} not found`);
    }

    // Update transaction properties if provided in the input
    if (action.input.fromAccount !== undefined) {
      transaction.fromAccount = action.input.fromAccount;
    }
    if (action.input.toAccount !== undefined) {
      transaction.toAccount = action.input.toAccount;
    }
    if (action.input.amount !== undefined) {
      transaction.amount = action.input.amount;
    }
    if (action.input.datetime !== undefined) {
      transaction.datetime = action.input.datetime;
    }
    if (action.input.details !== undefined) {
      transaction.details = action.input.details;
    }
    if (action.input.budget !== undefined) {
      transaction.budget = action.input.budget;
    }
  },

  deleteTransactionOperation(state, action, dispatch) {
    // Verify transaction exists before deletion
    const transaction = state.transactions.find(tx => tx.id === action.input.id);
    if (!transaction) {
      throw new Error(`Transaction with id ${action.input.id} not found`);
    }

    // Remove transaction from the transactions array
    state.transactions = state.transactions.filter(tx => tx.id !== action.input.id);
  },

  updateTransactionBudgetOperation(state, action, dispatch) {
    const transaction = state.transactions.find(tx => tx.id === action.input.txId);
    if (!transaction) {
      throw new Error(`Transaction with id ${action.input.txId} not found`);
    }

    transaction.budget = action.input.budgetId;
  },
};
