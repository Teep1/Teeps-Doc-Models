import Editor from "./editor";
import { createDocumentStory } from "document-model-libs/utils";

import * as AccountTransactionsModule from "../../document-models/account-transactions";

const { meta, CreateDocumentStory: AccountTransactions } = createDocumentStory(
  Editor,
  AccountTransactionsModule.reducer,
  AccountTransactionsModule.utils.createDocument(),
);
export { AccountTransactions };

export default { ...meta, title: "Account Transactions" };
