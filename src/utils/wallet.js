import * as ethers from 'ethers';

// Connect to MetaMask (assuming MetaMask is installed and active)
export async function connectToMetaMask() {
  // Check if MetaMask is installed
  if (typeof window.ethereum !== 'undefined') {
    // Request account access if needed
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Create an ethers.js provider using MetaMask
    const provider = new ethers.BrowserProvider(window.ethereum);

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