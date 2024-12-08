import React from 'react'
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import main from '../ContractAp';

const TransactionHistory = () => {
    const [transaction, setTransaction] = useState([]);
    const [contractFunctions, setContractFunctions] = useState(null);

    useEffect(() => {
      const initializeContract = async () => {
        const functions = await main();
        setContractFunctions(functions);
      };
      initializeContract();
    }, []);

    useEffect(() => {
      const fetchTransactions = async () => {
        if (contractFunctions) {
          const tx = await contractFunctions.getTransactions();
          console.log(tx);

          setTransaction(tx);
        }
      };
      fetchTransactions();
    }, [contractFunctions]);


  return (
    <div className="app">
      <header className="header">
        <div className="account-info">
          <h1>Transaction</h1>
          <p className="balance">$12,300</p>
        </div>
        <div className="account-stats">
          <p>
            Available <span>$11,200</span>
          </p>
          <p>
            In Play <span>$1,100</span>
          </p>
        </div>
        <div className="profile">
          <img
            src="https://via.placeholder.com/60"
            alt="Profile"
            className="profile-image"
          />
          <p>Gold Star</p>
          <p>⭐⭐⭐⭐⭐</p>
        </div>
      </header>

      <nav className="nav">
        <ul>
          <li>Account Settings</li>
          <li>VIP Store</li>
          <li className="active">Transaction History</li>
        </ul>
      </nav>

      <main className="table-container">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Seller Address</th>
              <th>Buyer Address</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transaction.map((transact) => (
              <tr key={transact.productId}>
                <td>{`${transact.seller.slice(0,5)}...${transact.seller.slice(-5)}`}</td>
                <td>{`${transact.buyer.slice(0,5)}...${transact.buyer.slice(-5)}`}</td>
                <td>{new Date(transact.timestamp.toString() * 1000).toLocaleString() }</td>
                <td>{ethers.formatEther(transact.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default TransactionHistory