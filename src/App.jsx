import React, {createContext, useState} from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import List_Products from './components/List_Products'
import Navbar from './components/Navbar'
import TransactionHistory from './components/TransactionHistory'
import AddProducts from './components/AddProducts'

export const walletContext = createContext({
  isConnected: false,
  account: '',
  connectWallet: () => {},
  disconnectWallet: () => {}
});


const App = () => {

  const[isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');

  function disconnectWallet(){
    setIsConnected(false);
    setAccount('');
  }

 
    async function connectWallet() {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xaa36a7" }],
        });
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
          params: [
            {
              chainId: "0xaa36a7",
              chainName: "Sepolia",
              rpcUrls: ["https://sepolia.drpc.org"],
              blockExplorerUrls: ["https://sepolia.etherscan.io/"],
              nativeCurrency: {
                name: "Ethereum",
                symbol: "ETH",
                decimals: 18,
              },
            },
          ],
        });
        setIsConnected(true);
        const account = await accounts[0];
        setAccount(account);

        console.log(account);
      } catch (switchError) {
        if (switchError.code === 4902) {
          alert("Please connect to the Sepolia Network");
        }
      }
    }

  return (
    <walletContext.Provider value={{ isConnected, account, connectWallet, disconnectWallet }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list-products" element={<List_Products />} />
        <Route path="/add-products" element={<AddProducts />} />
        <Route path="/transaction" element={<TransactionHistory />} />
      </Routes>
    </walletContext.Provider>
  );
}

export default App