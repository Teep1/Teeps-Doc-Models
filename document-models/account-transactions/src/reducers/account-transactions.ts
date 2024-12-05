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
    });
  },

  updateTransactionOperation(state, action, dispatch) {
    // Move error check to the beginning
    if (!state.transactions.some(transaction => transaction.id === action.input.id)) {
      throw new Error(`Transaction with id ${action.input.id} not found`);
    }

    const transactionIndex = state.transactions.findIndex(
      transaction => transaction.id === action.input.id
    );
    
    const transaction = state.transactions[transactionIndex];
    
    state.transactions[transactionIndex] = {
      ...transaction,
      fromAccount: action.input.fromAccount ?? transaction.fromAccount,
      toAccount: action.input.toAccount ?? transaction.toAccount,
      amount: action.input.amount ?? transaction.amount,
      datetime: action.input.datetime ?? transaction.datetime,
      details: action.input.details ?? transaction.details,
    };
  },

  deleteTransactionOperation(state, action, dispatch) {
    // Move error check to the beginning
    if (!state.transactions.some(transaction => transaction.id === action.input.id)) {
      throw new Error(`Transaction with id ${action.input.id} not found`);
    }

    state.transactions = state.transactions.filter(
      transaction => transaction.id !== action.input.id
    );
  },
};
