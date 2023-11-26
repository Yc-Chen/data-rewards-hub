import * as ethers from 'ethers';
import { abi } from '@/assets/DataRewardsToken.json';

const CHAIN_ID = '31337n';
const CONTRACT_ADDRESS = '0x5fbdb2315678afecb367f032d93f642f64180aa3';

// Connect to MetaMask (assuming MetaMask is installed and active)
// TODO: clean this up. CHAIN_ID check. and maybe owner check.
export async function connectToMetaMask() {
  // Check if MetaMask is installed
  if (typeof window.ethereum !== 'undefined') {
    // Request account access if needed
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    const provider = new ethers.BrowserProvider(window.ethereum);

    const network = await provider.getNetwork();
    if (network.chainId !== CHAIN_ID) {
      console.log('Please switch to Hardhat testnet');
    }

    // Get the signer (account) from the provider
    const signer = await provider.getSigner();

    // Get the connected address
    const address = await signer.getAddress();
    console.log('Connected to MetaMask with address:', address);

    return { provider, signer, address };
  } else {
    console.error('MetaMask not found. Please install MetaMask and try again.');
    return null;
  }
}

export function listenForAccountChange(onAccountChange) {
  // Listen for account changes
  window.ethereum.on('accountsChanged', (accounts) => {
    onAccountChange(accounts[0]);
  });
}

export function listenForChainChange(provider, onChainChange) {
  // Listen for chain ID changes
  window.ethereum.on('chainChanged', (chainId) => {
    onChainChange(chainId);
  });
}

export async function awardNFT(signer, to) {
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  const transaction = await contract.awardNFT(to);
  const receipt = await transaction.wait();
  console.log('Transaction receipt:', receipt);
  if (receipt.status === 0) {
    throw new Error('Transaction failed');
  }
}