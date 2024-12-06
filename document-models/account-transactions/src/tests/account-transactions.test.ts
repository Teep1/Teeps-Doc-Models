/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { utils as documentModelUtils } from "document-model/document";
import utils from '../../gen/utils';
import { reducer } from '../../gen/reducer';
import * as creators from '../../gen/account-transactions/creators';
import { AccountTransactionsDocument } from '../../gen/types';

describe('AccountTransactions Operations', () => {
    let document: AccountTransactionsDocument;

    beforeEach(() => {
        document = utils.createDocument();
    });

    it('should handle createTransaction operation', () => {
        const input = {
            id: documentModelUtils.hashKey(),
            fromAccount: '0x1234567890123456789012345678901234567890',
            toAccount: '0x0987654321098765432109876543210987654321',
            amount: 450.5,
            datetime: new Date().toISOString(),
            details: {
                txHash: '0xabcdef1234567890',
                token: 'ETH',
                blockNumber: 12345
            },
            budget: 'budget123'
        };
        
        const updatedDocument = reducer(
            document,
            creators.createTransaction(input),
        );

        expect(updatedDocument.operations.global).toHaveLength(1);
        expect(updatedDocument.operations.global[0].type).toBe('CREATE_TRANSACTION');
        expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
        expect(updatedDocument.operations.global[0].index).toEqual(0);
        expect(updatedDocument.state.global.transactions).toHaveLength(1);
        expect(updatedDocument.state.global.transactions[0]).toMatchObject(input);
    });

    it('should handle updateTransaction operation', () => {
        const createInput = {
            id: documentModelUtils.hashKey(),
            fromAccount: '0x1234567890123456789012345678901234567890',
            toAccount: '0x0987654321098765432109876543210987654321',
            amount: 550.1,
            datetime: new Date().toISOString(),
            details: {
                txHash: '0xabcdef1234567890',
                token: 'ETH',
                blockNumber: 12345
            },
            budget: 'budget123'
        };
        
        const updateInput = {
            id: createInput.id,
            amount: 4,
            details: {
                txHash: '0xabcdef1234567890',
                token: 'ETH',
                blockNumber: 12346
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
        expect(updatedDocument.operations.global[1].index).toEqual(1);
        expect(updatedDocument.state.global.transactions[0].amount).toEqual(updateInput.amount);
        expect(updatedDocument.state.global.transactions[0].details).toEqual(updateInput.details);
        // Verify unchanged fields remain the same
        expect(updatedDocument.state.global.transactions[0].fromAccount).toBe(createInput.fromAccount);
        expect(updatedDocument.state.global.transactions[0].toAccount).toBe(createInput.toAccount);
    });

    it('should handle deleteTransaction operation', () => {
        const createInput = {
            id: documentModelUtils.hashKey(),
            fromAccount: '0x1234567890123456789012345678901234567890',
            toAccount: '0x0987654321098765432109876543210987654321',
            amount: 100,
            datetime: new Date().toISOString(),
            details: {
                txHash: '0xabcdef1234567890',
                token: 'ETH',
                blockNumber: 12345
            },
            budget: 'budget123'
        };
        
        const deleteInput = {
            id: createInput.id,
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
        expect(updatedDocument.operations.global[1].input).toStrictEqual(deleteInput);
        expect(updatedDocument.operations.global[1].index).toEqual(1);
        expect(updatedDocument.state.global.transactions).toHaveLength(0);
    });

    it('should handle updateTransactionBudget operation', () => {
        const createInput = {
            id: documentModelUtils.hashKey(),
            fromAccount: '0x1234567890123456789012345678901234567890',
            toAccount: '0x0987654321098765432109876543210987654321',
            amount: 1,
            datetime: new Date().toISOString(),
            details: {
                txHash: '0xabcdef1234567890',
                token: 'ETH',
                blockNumber: 12345
            },
            budget: 'budget123'
        };
        
        const updateBudgetInput = {
            txId: createInput.id,
            budgetId: 'newBudget456'
        };

        const createdDocument = reducer(
            document,
            creators.createTransaction(createInput),
        );
        
        const updatedDocument = reducer(
            createdDocument,
            creators.updateTransactionBudget(updateBudgetInput),
        );

        expect(updatedDocument.operations.global).toHaveLength(2);
        expect(updatedDocument.operations.global[1].type).toBe('UPDATE_TRANSACTION_BUDGET');
        expect(updatedDocument.operations.global[1].input).toStrictEqual(updateBudgetInput);
        expect(updatedDocument.operations.global[1].index).toEqual(1);
        expect(updatedDocument.state.global.transactions[0].budget).toBe(updateBudgetInput.budgetId);
        // Verify other fields remain unchanged
        expect(updatedDocument.state.global.transactions[0].amount).toEqual(createInput.amount);
        expect(updatedDocument.state.global.transactions[0].details).toEqual(createInput.details);
    });
});
