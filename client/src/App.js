import React from 'react'
import './App.css';
import { useEthereumContext } from './context/EthereumContext'

function App() {
  const { connectWallet, fetchGreeting, setG, currentAccount, setGreeting, getBalance, sendTokens, setUserAccount, setAmount } = useEthereumContext()

  return (
    <div className="App">
      <header className="App-header">
        {!currentAccount && ( <button onClick={connectWallet}>Connect Wallet</button> )}
        <br />
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setG}>Set Greeting</button>
        <input onChange={e => setGreeting(e.target.value)} placeholder="Set greeting" />
        <br />
        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendTokens}>Send Tokens</button>
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
      </header>
    </div>
  );
}

export default App;
