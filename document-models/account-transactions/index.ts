/**
 * This is a scaffold file meant for customization.
 * Delete the file and run the code generator again to have it reset
 */

import { actions as BaseActions, DocumentModel } from "document-model/document";
import {
  actions as AccountTransactionsActions,
  AccountTransactions,
} from "./gen";
import { reducer } from "./gen/reducer";
import { documentModel } from "./gen/document-model";
import genUtils from "./gen/utils";
import * as customUtils from "./src/utils";
import {
  AccountTransactionsState,
  AccountTransactionsAction,
  AccountTransactionsLocalState,
} from "./gen/types";

const Document = AccountTransactions;
const utils = { ...genUtils, ...customUtils };
const actions = { ...BaseActions, ...AccountTransactionsActions };

export const module: DocumentModel<
  AccountTransactionsState,
  AccountTransactionsAction,
  AccountTransactionsLocalState
> = {
  Document,
  reducer,
  actions,
  utils,
  documentModel,
};

export {
  AccountTransactions,
  Document,
  reducer,
  actions,
  utils,
  documentModel,
};

export * from "./gen/types";
export * from "./src/utils";
