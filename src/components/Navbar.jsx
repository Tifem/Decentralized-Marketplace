import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { walletContext } from '../App';

const Navbar = () => {
  //  const [isConnected, setIsConnected] = React.useState(false);

   const {disconnectWallet, connectWallet, isConnected, account} = useContext(walletContext)
    //Connect Wallet

  // function disconnectWallet(){
  //   setIsConnected(false);
  //   setAccount("");
  // }

  return (
    <header>
      <div className="logo">
        <h2>WEB3.PRODUCT</h2>
      </div>
      <div className="navbar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/list-products">List Products</NavLink>
        <NavLink to="/add-products">Add Products</NavLink>
        <NavLink to="/transaction">Transaction History</NavLink>
      </div>
      <div>
        <button onClick={isConnected ? disconnectWallet : connectWallet} className="wallet">
          {isConnected
            ? `${account.slice(0, 6)}...${account.slice(-4, -1)}`
            : "Connect Wallet"}
        </button>
      </div>
    </header>
  );
}

export default Navbar