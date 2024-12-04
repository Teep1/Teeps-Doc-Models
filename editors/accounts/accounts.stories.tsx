import Editor from "./editor";
import { createDocumentStory } from "document-model-libs/utils";

import * as AccountsModule from "../../document-models/accounts";

const { meta, CreateDocumentStory: Accounts } = createDocumentStory(
  Editor,
  AccountsModule.reducer,
  AccountsModule.utils.createDocument(),
);
export { Accounts };

export default { ...meta, title: "Accounts" };
