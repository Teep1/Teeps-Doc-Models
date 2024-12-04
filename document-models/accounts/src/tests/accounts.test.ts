/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { utils as documentModelUtils } from "document-model/document";
import utils from '../../gen/utils';
import { reducer } from '../../gen/reducer';
import * as creators from '../../gen/accounts/creators';
import { AccountsDocument } from '../../gen/types';

describe('Accounts Operations', () => {
    let document: AccountsDocument;

    beforeEach(() => {
        document = utils.createDocument();
    });

    it('should handle createAccount operation', () => {
        const input = {
            id: documentModelUtils.hashKey(),
            name: 'Sandhouse',
            account: '0x1234567890123456789012345678901234567890',
            budgetPath: '/SKY/Ecosystem-Actors/Powerhouse',
            type: 'Auditor'
        };
        
        const updatedDocument = reducer(
            document,
            creators.createAccount(input),
        );

        expect(updatedDocument.operations.global).toHaveLength(1);
        expect(updatedDocument.operations.global[0].type).toBe('CREATE_ACCOUNT');
        expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
        expect(updatedDocument.operations.global[0].index).toEqual(0);
        expect(updatedDocument.state.global.accounts).toHaveLength(1);
        expect(updatedDocument.state.global.accounts[0]).toMatchObject(input);
    });

    it('should handle updateAccount operation', () => {
        const createInput = {
            id: documentModelUtils.hashKey(),
            name: 'Powerhouse Ops',
            account: '0x1234567890123456789012345678901234567890',
            budgetPath: '/SKY/Ecosystem-Actors/Powerhouse',
            type: 'Operational'
        };
        
        const updateInput = {
            id: createInput.id,
            name: 'Main Treasury',
            budgetPath: '/protocol/main-treasury'
        };

        const createdDocument = reducer(
            document,
            creators.createAccount(createInput),
        );
        
        const updatedDocument = reducer(
            createdDocument,
            creators.updateAccount(updateInput),
        );

        expect(updatedDocument.operations.global).toHaveLength(2);
        expect(updatedDocument.operations.global[1].type).toBe('UPDATE_ACCOUNT');
        expect(updatedDocument.operations.global[1].input).toStrictEqual(updateInput);
        expect(updatedDocument.operations.global[1].index).toEqual(1);
        expect(updatedDocument.state.global.accounts[0].name).toBe(updateInput.name);
        expect(updatedDocument.state.global.accounts[0].budgetPath).toBe(updateInput.budgetPath);
        // Verify unchanged fields remain the same
        expect(updatedDocument.state.global.accounts[0].account).toBe(createInput.account);
        expect(updatedDocument.state.global.accounts[0].type).toBe(createInput.type);
    });

    it('should handle deleteAccount operation', () => {
        const createInput = {
            id: documentModelUtils.hashKey(),
            name: 'Powerhouse Ops',
            account: '0x1234567890123456789012345678901234567890',
            budgetPath: '/SKY/Ecosystem-Actors/Powerhouse',
            type: 'Operational'
        };
        
        const deleteInput = {
            id: createInput.id,
        };

        const createdDocument = reducer(
            document,
            creators.createAccount(createInput),
        );
        
        const updatedDocument = reducer(
            createdDocument,
            creators.deleteAccount(deleteInput),
        );

        expect(updatedDocument.operations.global).toHaveLength(2);
        expect(updatedDocument.operations.global[1].type).toBe('DELETE_ACCOUNT');
        expect(updatedDocument.operations.global[1].input).toStrictEqual(deleteInput);
        expect(updatedDocument.operations.global[1].index).toEqual(1);
        expect(updatedDocument.state.global.accounts).toHaveLength(0);
    });
});
