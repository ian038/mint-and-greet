import React, { createContext, useContext, useState, useEffect } from 'react'
import { gAbi, greeterAddress, tokenAddress, tAbi } from '../utils/constants'
import { ethers } from 'ethers'

const EthereumContext = createContext()

const createGreetingInstance = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const greetingContract = new ethers.Contract(greeterAddress, gAbi, signer)
    return greetingContract
}

const createTokenInstance = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const tokenContract = new ethers.Contract(tokenAddress, tAbi, signer)
    return tokenContract
}

export const EthereumProvider = ({ children }) => {
    const [userAccount, setUserAccount] = useState(null)
    const [amount, setAmount] = useState(0)
    const [greeting, setGreeting] = useState('')
    const [currentAccount, setCurrentAccount] = useState(null)

    useEffect(() => {
      checkIfWalletConnected()
    }, [])
  
    const checkIfWalletConnected = async () => {
      try {
          if(!window.ethereum) return alert('Please install metamask')
          const accounts = await window.ethereum.request({ method: 'eth_accounts' })
          if(accounts.length) {
              setCurrentAccount(accounts[0])
        } else {
              alert('No accounts detected. Please connect your wallet.')
        }
      } catch(error) {
          alert(error)
          console.log('Check wallet error: ', error)
      }
    }
  
    const connectWallet = async() => {
      if(!currentAccount) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
          setCurrentAccount(accounts[0])
        } catch(error) {
          alert(error.message)
        }
      }
    }

    const fetchGreeting = async () => {
        await checkIfWalletConnected()
        if(typeof window.ethereum !== 'undefined') {
            const contract = createGreetingInstance()
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
        await checkIfWalletConnected()
        if(window.ethereum) {
            try {
                const contract = createGreetingInstance()
                const transaction = await contract.setGreeting(greeting)
                await transaction.wait()
                fetchGreeting()
            } catch(error) {
                alert(error.message)
            }
        }
    }

    const getBalance = async() => {
        await checkIfWalletConnected()
        if(window.ethereum) {
          const contract = createTokenInstance()
          const balance = await contract.balanceOf(currentAccount)
          alert(balance.toString())
        }
      }
    
      const sendTokens = async () => {
        await checkIfWalletConnected()
        if(window.ethereum) {
          const contract = createTokenInstance()
          const transaction = await contract.transfer(userAccount, amount)
          await transaction.wait()
          alert(`${amount} Coins successfully sent to ${userAccount}`);
        }
      }

    const value = { connectWallet, fetchGreeting, setG, currentAccount, setGreeting, getBalance, sendTokens, setUserAccount, setAmount }

    return (
        <EthereumContext.Provider value={value}>
            {children}
        </EthereumContext.Provider>
    )
}

export const useEthereumContext = () => useContext(EthereumContext)