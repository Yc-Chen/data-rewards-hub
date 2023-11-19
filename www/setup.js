
/**
 * Mounts or "hydrates" Nue- components to the page after the content is loaded
 *
 * Uses a web-component instance for the progressive enhancement
 */

import createApp from './nue.js'
import { lib } from './islands.js'

import { ethers } from '../node_modules/ethers'

// Mount <nue-island/> nodes as a Web Component
class NueIsland extends HTMLElement {
  connectedCallback () {
    const App = lib.find(el => el.name == this.getAttribute('island'))
    if (App) createApp(App, {}, lib).mount(this)
  }
}

customElements.define('nue-island', NueIsland)

// TODO: Move this to a separate file

// Connect to MetaMask (assuming MetaMask is installed and active)
async function connectToMetaMask() {
  // Check if MetaMask is installed
  if (typeof window.ethereum !== 'undefined') {
    // Request account access if needed
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Create an ethers.js provider using MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Get the signer (account) from the provider
    const signer = provider.getSigner();

    // Get the connected address
    const address = await signer.getAddress();
    console.log('Connected to MetaMask with address:', address);

    return { provider, signer, address };
  } else {
    console.error('MetaMask not found. Please install MetaMask and try again.');
    return null;
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  const { provider, signer, address } = await connectToMetaMask();
  console.log('connected!')
})