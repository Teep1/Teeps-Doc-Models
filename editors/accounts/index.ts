import { ExtendedEditor, EditorContextProps } from "document-model-libs";
import Editor from "./editor";
import {
  AccountsState,
  AccountsAction,
  AccountsLocalState,
} from "../../document-models/accounts";

export const module: ExtendedEditor<
  AccountsState,
  AccountsAction,
  AccountsLocalState,
  EditorContextProps
> = {
  Component: Editor,
  documentTypes: ["powerhouse/accounts"],
  config: {
    id: "editor-id",
    disableExternalControls: true,
    documentToolbarEnabled: true,
    showSwitchboardLink: true,
  },
};

export default module;
