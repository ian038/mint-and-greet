import React, { useState } from 'react'
import './App.css';
import { gAbi, greeterAddress } from './utils/constants';
import { ethers } from 'ethers'

function App() {
  const [greeting, setGreeting] = useState('')

  const requestAccount = async() => {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  const fetchGreeting = async () => {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, gAbi, signer)
      try {
        const data = await contract.greet()
        console.log('Greet data: ', data)
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

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setG}>Set Greeting</button>
        <input onChange={e => setGreeting(e.target.value)} placeholder="Set greeting" />
        <br />

      </header>
    </div>
  );
}

export default App;
