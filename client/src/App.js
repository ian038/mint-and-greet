import React, { useState } from 'react'
import './App.css';
import { gAbi, greeterAddress, tokenAddress, tAbi } from './utils/constants';
import { ethers } from 'ethers'

function App() {
  const [greeting, setGreeting] = useState('')
  const [userAccount, setUserAccount] = useState(null)
  const [amount, setAmount] = useState(0)

  const requestAccount = async() => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    } catch(error) {
      alert('Please install metamask and login first')
    }
  }

  const fetchGreeting = async () => {
    await requestAccount()
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, gAbi, signer)
      try {
        const data = await contract.greet()
        alert(data)
      } catch(error) {
        console.log('Get Greeting Error: ', error)
      }
    }
  }

  const setG = async() => {
    if(!greeting) return
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, gAbi, signer)
      const transaction = await contract.setGreeting(greeting)
      await transaction.wait()
      fetchGreeting()
    }
  }

  const getBalance = async() => {
    await requestAccount()
    if(typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(tokenAddress, tAbi, signer)
      const balance = await contract.balanceOf(accounts[0])
      alert(balance.toString())
    }
  }

  const sendTokens = async () => {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(tokenAddress, tAbi, signer)
      const transaction = await contract.transfer(userAccount, amount)
      await transaction.wait()
      alert(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
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
