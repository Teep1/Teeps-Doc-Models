import { ExtendedEditor, EditorContextProps } from "document-model-libs";
import Editor from "./editor";
import {
  AccountTransactionsState,
  AccountTransactionsAction,
  AccountTransactionsLocalState,
} from "../../document-models/account-transactions";

export const module: ExtendedEditor<
  AccountTransactionsState,
  AccountTransactionsAction,
  AccountTransactionsLocalState,
  EditorContextProps
> = {
  Component: Editor,
  documentTypes: ["powerhouse/account-transactions"],
  config: {
    id: "editor-id",
    disableExternalControls: true,
    documentToolbarEnabled: true,
    showSwitchboardLink: true,
  },
};

export default module;
