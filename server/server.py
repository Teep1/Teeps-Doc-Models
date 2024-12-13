from flask import Flask, request, Response
import json
import os
from pathlib import Path
import threading

app = Flask(__name__)
file_lock = threading.Lock()  # For thread-safe file operations

TRANSACTIONS_FILE = Path("data/transactions.json")

def ensure_data_directory():
    """Ensure the data directory and transactions file exist"""
    TRANSACTIONS_FILE.parent.mkdir(parents=True, exist_ok=True)
    if not TRANSACTIONS_FILE.exists():
        with open(TRANSACTIONS_FILE, 'w') as f:
            json.dump([], f)

def is_duplicate_transaction(new_transaction, existing_transactions):
    """Check if a transaction already exists based on txHash"""
    if 'erc20' not in new_transaction:
        return False
    
    new_tx_hashes = {tx['txHash'] for tx in new_transaction['erc20']}
    
    for transaction in existing_transactions:
        if 'erc20' in transaction:
            for tx in transaction['erc20']:
                if tx['txHash'] in new_tx_hashes:
                    return True
    return False

def append_transaction(transaction_data):
    """Append new transaction to the JSON file in a thread-safe manner"""
    with file_lock:
        try:
            # Read existing transactions
            transactions = []
            if TRANSACTIONS_FILE.exists():
                with open(TRANSACTIONS_FILE, 'r') as f:
                    content = f.read().strip()
                    if content:
                        transactions = json.loads(content)
            
            # Check for duplicates
            if is_duplicate_transaction(transaction_data, transactions):
                print("Duplicate transaction found, skipping")
                return True

            # Append new transaction
            transactions.append(transaction_data)

            # Write back to file
            with open(TRANSACTIONS_FILE, 'w') as f:
                json.dump(transactions, f, indent=2)
            
            return True
        except Exception as e:
            print(f"Error handling transaction: {str(e)}")
            print(f"Transaction data: {json.dumps(transaction_data, indent=2)}")
            return False

@app.route('/webhook', methods=['POST'])
def webhook():
    print('Received webhook. Request details:')
    print('Headers:', json.dumps(dict(request.headers), indent=2))
    
    data = request.get_data()
    try:
        json_data = json.loads(data)
        print('Parsed JSON data:')
        print(json.dumps(json_data, indent=2))
        
        # Append to transactions file
        if append_transaction(json_data):
            return Response('Webhook received and transaction saved', status=200)
        else:
            return Response('Error saving transaction', status=500)
            
    except json.JSONDecodeError as e:
        print('Error parsing JSON:', str(e))
        print('Raw body:', data.decode())
        return Response('Invalid JSON data', status=400)

if __name__ == '__main__':
    # Ensure data directory and file exist before starting
    ensure_data_directory()
    app.run(port=3000)