/**
 * This is a scaffold file meant for customization.
 * Delete the file and run the code generator again to have it reset
 */

import { actions as BaseActions, DocumentModel } from "document-model/document";
import { actions as AccountsActions, Accounts } from "./gen";
import { reducer } from "./gen/reducer";
import { documentModel } from "./gen/document-model";
import genUtils from "./gen/utils";
import * as customUtils from "./src/utils";
import { AccountsState, AccountsAction, AccountsLocalState } from "./gen/types";

const Document = Accounts;
const utils = { ...genUtils, ...customUtils };
const actions = { ...BaseActions, ...AccountsActions };

export const module: DocumentModel<
  AccountsState,
  AccountsAction,
  AccountsLocalState
> = {
  Document,
  reducer,
  actions,
  utils,
  documentModel,
};

export { Accounts, Document, reducer, actions, utils, documentModel };

export * from "./gen/types";
export * from "./src/utils";
