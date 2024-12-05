/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { generateMock } from "@powerhousedao/codegen";
import { utils as documentModelUtils } from "document-model/document";

import utils from "../../gen/utils";
import {
  z,
  CreateTransactionInput,
  UpdateTransactionInput,
  DeleteTransactionInput,
} from "../../gen/schema";
import { reducer } from "../../gen/reducer";
import * as creators from "../../gen/account-transactions/creators";
import { AccountTransactionsDocument } from "../../gen/types";

describe("AccountTransactions Operations", () => {
  let document: AccountTransactionsDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle createTransaction operation with crypto details", () => {
    const createInput: CreateTransactionInput = {
      id: documentModelUtils.hashKey(),
      fromAccount: "0x5B9cE54b9cFfa6B80c698071c38b747c59e320cC",
      toAccount: "0x464C71f6c2F760dda6093dcB91C24c39e5d6e18c",
      amount: 1,
      datetime: new Date().toISOString(),
      details: {
        __typename: "CryptoTransactionDetails",
        txHash: "0x123abc...",
        token: "ETH",
        blockNumber: 15000000
      }
    };
    
    const updatedDocument = reducer(
      document,
      creators.createTransaction(createInput),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe('CREATE_TRANSACTION');
    expect(updatedDocument.operations.global[0].input).toStrictEqual(createInput);
    expect(updatedDocument.state.global.transactions).toHaveLength(1);
    expect(updatedDocument.state.global.transactions[0]).toMatchObject(createInput);
  });

  it("should handle createTransaction operation with bank details", () => {
    const createInput: CreateTransactionInput = {
      id: documentModelUtils.hashKey(),
      fromAccount: "0x5B9cE54b9cFfa6B80c698071c38b747c59e320cC",
      toAccount: "0x464C71f6c2F760dda6093dcB91C24c39e5d6e18c",
      amount: 5000,
      datetime: new Date().toISOString(),
      details: {
        __typename: "BankTransactionDetails",
        currency: "USD",
        transactionId: "BANK123",
        referenceNumber: "REF456"
      }
    };
    
    const updatedDocument = reducer(
      document,
      creators.createTransaction(createInput),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe('CREATE_TRANSACTION');
    expect(updatedDocument.operations.global[0].input).toStrictEqual(createInput);
    expect(updatedDocument.state.global.transactions).toHaveLength(1);
    expect(updatedDocument.state.global.transactions[0]).toMatchObject(createInput);
  });

  it("should handle updateTransaction operation", () => {
    const createInput: CreateTransactionInput = {
      id: documentModelUtils.hashKey(),
      fromAccount: "0x5B9cE54b9cFfa6B80c698071c38b747c59e320cC",
      toAccount: "0x464C71f6c2F760dda6093dcB91C24c39e5d6e18c",
      amount: 100,
      datetime: new Date().toISOString(),
      details: {
        __typename: "CryptoTransactionDetails",
        txHash: "0x123abc...",
        token: "ETH",
        blockNumber: 15000000
      }
    };
    
    const updateInput: UpdateTransactionInput = {
      id: createInput.id,
      amount: 40000,
      details: {
        __typename: "CryptoTransactionDetails",
        txHash: "0x456def...",
        token: "ETH",
        blockNumber: 15000001
      }
    };

    const createdDocument = reducer(
      document,
      creators.createTransaction(createInput),
    );
    
    const updatedDocument = reducer(
      createdDocument,
      creators.updateTransaction(updateInput),
    );

    expect(updatedDocument.operations.global).toHaveLength(2);
    expect(updatedDocument.operations.global[1].type).toBe('UPDATE_TRANSACTION');
    expect(updatedDocument.operations.global[1].input).toStrictEqual(updateInput);
    expect(updatedDocument.state.global.transactions[0].amount).toBe(updateInput.amount);
    expect(updatedDocument.state.global.transactions[0].details).toMatchObject(updateInput.details);
  });

  it("should handle deleteTransaction operation", () => {
    const createInput: CreateTransactionInput = {
      id: documentModelUtils.hashKey(),
      fromAccount: "0x5B9cE54b9cFfa6B80c698071c38b747c59e320cC",
      toAccount: "0x464C71f6c2F760dda6093dcB91C24c39e5d6e18c",
      amount: 14000,
      datetime: new Date().toISOString(),
      details: {
        __typename: "CryptoTransactionDetails",
        txHash: "0x123abc...",
        token: "ETH",
        blockNumber: 15000000
      }
    };
    
    const deleteInput: DeleteTransactionInput = {
      id: createInput.id
    };

    const createdDocument = reducer(
      document,
      creators.createTransaction(createInput),
    );
    
    const updatedDocument = reducer(
      createdDocument,
      creators.deleteTransaction(deleteInput),
    );

    expect(updatedDocument.operations.global).toHaveLength(2);
    expect(updatedDocument.operations.global[1].type).toBe('DELETE_TRANSACTION');
    expect(updatedDocument.state.global.transactions).toHaveLength(0);
  });
});
