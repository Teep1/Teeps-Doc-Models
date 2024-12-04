import { EditorProps } from "document-model/document";
import { useState } from "react";
import confetti from 'canvas-confetti';
import {
  AccountsState,
  AccountsAction,
  AccountsLocalState,
  AccountEntry,
  actions,
} from "../../document-models/accounts";
import { utils as documentModelUtils } from "document-model/document";

export type IProps = EditorProps<
  AccountsState,
  AccountsAction,
  AccountsLocalState
>;

export default function Editor(props: IProps) {
  const { document, dispatch } = props;
  const {
    state: { global: state },
  } = document;

  const [newAccount, setNewAccount] = useState({
    name: "",
    account: "",
    budgetPath: "",
    type: "Protocol",
  });

  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCreateAccount = () => {
    console.log("Creating account:", newAccount);
    dispatch(
      actions.createAccount({
        id: documentModelUtils.hashKey(),
        ...newAccount,
      })
    );
    setNewAccount({
      name: "",
      account: "",
      budgetPath: "",
      type: "Protocol",
    });
    
    // Fire confetti after successful creation
    fireConfetti();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Accounts Management</h1>

      {/* Create Account Form */}
      <div style={{ marginBottom: "20px", padding: "20px", border: "1px solid #ccc", borderRadius: "4px" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "15px" }}>Create New Account</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="text"
            placeholder="Account Name"
            value={newAccount.name}
            onChange={(e) =>
              setNewAccount({ ...newAccount, name: e.target.value })
            }
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <input
            type="text"
            placeholder="Ethereum Address"
            value={newAccount.account}
            onChange={(e) =>
              setNewAccount({ ...newAccount, account: e.target.value })
            }
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <input
            type="text"
            placeholder="Budget Path"
            value={newAccount.budgetPath}
            onChange={(e) =>
              setNewAccount({ ...newAccount, budgetPath: e.target.value })
            }
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <select
            value={newAccount.type}
            onChange={(e) =>
              setNewAccount({ ...newAccount, type: e.target.value })
            }
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          >
            <option value="Protocol">Protocol</option>
            <option value="Auditor">Auditor</option>
            <option value="Operational">Operational</option>
            <option value="Payment Processor">Payment Processor</option>
          </select>
          <button
            onClick={handleCreateAccount}
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Create Account
          </button>
        </div>
      </div>

      {/* Accounts List */}
      <div>
        {state.accounts.map((account: AccountEntry) => (
          <div
            key={account.id}
            style={{
              padding: "15px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "10px"
            }}
          >
            <div>
              <h3 style={{ fontWeight: "bold" }}>{account.name}</h3>
              <p style={{ fontSize: "14px" }}>Address: {account.account}</p>
              <p style={{ fontSize: "14px" }}>Budget Path: {account.budgetPath}</p>
              <p style={{ fontSize: "14px" }}>Type: {account.type}</p>
            </div>
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() =>
                  dispatch(actions.deleteAccount({ id: account.id }))
                }
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
