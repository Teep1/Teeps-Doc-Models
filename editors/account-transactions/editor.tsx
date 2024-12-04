import { EditorProps } from "document-model/document";
import {
  AccountTransactionsState,
  AccountTransactionsAction,
  AccountTransactionsLocalState,
  actions,
} from "../../document-models/account-transactions";
import { utils as documentModelUtils } from "document-model/document";
import { Button } from "@powerhousedao/design-system";

export type IProps = EditorProps<
  AccountTransactionsState,
  AccountTransactionsAction,
  AccountTransactionsLocalState
>;

export default function Editor(props: IProps) {
  // generate a random id
  // const id = documentModelUtils.hashKey();

  return (
    <div>
      <Button onClick={() => console.log("Hello world!")}>My Button</Button>
    </div>
  );
}
