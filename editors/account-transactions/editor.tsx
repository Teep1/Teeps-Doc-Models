import { EditorProps } from "document-model/document";
import { useState } from "react";
import {
  AccountTransactionsState,
  AccountTransactionsAction,
  AccountTransactionsLocalState,
  actions,
} from "../../document-models/account-transactions";
import { utils as documentModelUtils } from "document-model/document";

export type IProps = EditorProps<
  AccountTransactionsState,
  AccountTransactionsAction,
  AccountTransactionsLocalState
>;

export default function Editor(props: IProps) {
  const { document, dispatch } = props;
  const {
    state: { global: state },
  } = document;

  const [transactionType, setTransactionType] = useState<"crypto" | "bank">("crypto");
  const [newTransaction, setNewTransaction] = useState({
    fromAccount: "",
    toAccount: "",
    amount: "",
    details: {
      txHash: "",
      token: "",
      blockNumber: ""
    }
  });

  const [editingBudget, setEditingBudget] = useState<{
    transactionId: string;
    budget: string;
  } | null>(null);

  const handleCreateTransaction = () => {
    const details = transactionType === "crypto" 
      ? {
          __typename: "CryptoTransactionDetails" as const,
          txHash: newTransaction.details.txHash,
          token: newTransaction.details.token,
          blockNumber: parseInt(newTransaction.details.blockNumber)
        }
      : {
          __typename: "BankTransactionDetails" as const,
          currency: newTransaction.details.token,
          transactionId: newTransaction.details.txHash,
          referenceNumber: newTransaction.details.blockNumber
        };

    dispatch(
      actions.createTransaction({
        id: documentModelUtils.hashKey(),
        fromAccount: newTransaction.fromAccount,
        toAccount: newTransaction.toAccount,
        amount: parseFloat(newTransaction.amount),
        datetime: new Date().toISOString(),
        details
      })
    );

    setNewTransaction({
      fromAccount: "",
      toAccount: "",
      amount: "",
      details: {
        txHash: "",
        token: "",
        blockNumber: ""
      }
    });
  };

  const handleUpdateBudget = (transactionId: string) => {
    if (!editingBudget?.budget) return;
    
    dispatch(
      actions.updateTransactionBudget({
        txId: transactionId,
        budgetId: editingBudget.budget
      })
    );
    
    setEditingBudget(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Transactions Management</h1>

      {/* Create Transaction Form */}
      <div style={{ marginBottom: "20px", padding: "20px", border: "1px solid #ccc", borderRadius: "4px" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "15px" }}>Create New Transaction</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value as "crypto" | "bank")}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          >
            <option value="crypto">Crypto Transaction</option>
            <option value="bank">Bank Transaction</option>
          </select>

          <input
            type="text"
            placeholder="From Account"
            value={newTransaction.fromAccount}
            onChange={(e) => setNewTransaction({ ...newTransaction, fromAccount: e.target.value })}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />

          <input
            type="text"
            placeholder="To Account"
            value={newTransaction.toAccount}
            onChange={(e) => setNewTransaction({ ...newTransaction, toAccount: e.target.value })}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />

          <input
            type="number"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />

          <input
            type="text"
            placeholder={transactionType === "crypto" ? "Transaction Hash" : "Transaction ID"}
            value={newTransaction.details.txHash}
            onChange={(e) => setNewTransaction({
              ...newTransaction,
              details: { ...newTransaction.details, txHash: e.target.value }
            })}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />

          <input
            type="text"
            placeholder={transactionType === "crypto" ? "Token" : "Currency"}
            value={newTransaction.details.token}
            onChange={(e) => setNewTransaction({
              ...newTransaction,
              details: { ...newTransaction.details, token: e.target.value }
            })}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />

          <input
            type="text"
            placeholder={transactionType === "crypto" ? "Block Number" : "Reference Number"}
            value={newTransaction.details.blockNumber}
            onChange={(e) => setNewTransaction({
              ...newTransaction,
              details: { ...newTransaction.details, blockNumber: e.target.value }
            })}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />

          <button
            onClick={handleCreateTransaction}
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Create Transaction
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div>
        {state.transactions.map((transaction) => (
          <div
            key={transaction.id}
            style={{
              padding: "15px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "10px"
            }}
          >
            <div>
              <h3 style={{ fontWeight: "bold" }}>
                {transaction.fromAccount} → {transaction.toAccount}
              </h3>
              <p style={{ fontSize: "14px" }}>Amount: {transaction.amount}</p>
              <p style={{ fontSize: "14px" }}>Date: {new Date(transaction.datetime).toLocaleString()}</p>
              <p style={{ fontSize: "14px" }}>Type: {transaction.details.__typename}</p>
              {transaction.details.__typename === "CryptoTransactionDetails" ? (
                <>
                  <p style={{ fontSize: "14px" }}>Hash: {transaction.details.txHash}</p>
                  <p style={{ fontSize: "14px" }}>Token: {transaction.details.token}</p>
                  <p style={{ fontSize: "14px" }}>Block: {transaction.details.blockNumber}</p>
                </>
              ) : (
                <>
                  <p style={{ fontSize: "14px" }}>Transaction ID: {transaction.details.transactionId}</p>
                  <p style={{ fontSize: "14px" }}>Currency: {transaction.details.currency}</p>
                  <p style={{ fontSize: "14px" }}>Reference: {transaction.details.referenceNumber}</p>
                </>
              )}
            </div>
            <div style={{ marginTop: "10px" }}>
              {editingBudget?.transactionId === transaction.id ? (
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <input
                    type="text"
                    value={editingBudget.budget}
                    onChange={(e) => setEditingBudget({
                      ...editingBudget,
                      budget: e.target.value
                    })}
                    placeholder="Enter budget ID"
                    style={{ padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }}
                  />
                  <button
                    onClick={() => handleUpdateBudget(transaction.id)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingBudget(null)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#6c757d",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <p style={{ fontSize: "14px" }}>Budget: {transaction.budget || 'Not assigned'}</p>
                  <button
                    onClick={() => setEditingBudget({
                      transactionId: transaction.id,
                      budget: transaction.budget || ''
                    })}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#17a2b8",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Edit Budget
                  </button>
                </div>
              )}
            </div>
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => dispatch(actions.deleteTransaction({ id: transaction.id }))}
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
