<script setup>
import { onMounted, ref, computed } from 'vue';
import { connectToMetaMask, listenForAccountChange, listenForChainChange, awardNFT, getUsers, sendETH } from './utils/wallet';

// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'

const CONTRACT_OWNER = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

const isLoading = ref(true);
const isContractOwner = ref(false);
const users = ref([])
const validUsers = computed(() => users.value.filter(u => u !== '0x0000000000000000000000000000000000000000'))

let signer;
onMounted(async () => {
  const { provider, signer: sig, address } = await connectToMetaMask();
  signer = sig;
  isLoading.value = false;

  listenForAccountChange(updateApp);
  listenForChainChange(updateApp);

  updateApp(address);
})

async function updateApp(address) {
  if (address === CONTRACT_OWNER) {
    isContractOwner.value = true
    console.log('You are the contract owner!');

    const received = await getUsers(signer)
    users.value.splice(0, users.value.length, ...received)
    tokenId.value = users.value.findIndex(u => u === '0x0000000000000000000000000000000000000000')
    console.log('Users are', users)
  } else {
    isContractOwner.value = false
    console.log('You are not the contract owner.');
  }
}

function switchAccount() {
  window.ethereum.request({ method: 'eth_requestAccounts' });
}

function openDialog() {
  const dialog = document.querySelector('.dialog-overview');
  dialog.show();
}

function closeDialog() {
  const dialog = document.querySelector('.dialog-overview');
  dialog.hide();
}

const target = ref('0x70997970C51812dc3A010C7d01b50e0d17dc79C8');
const tokenId = ref('1');
function giveNFT() {
  awardNFT(signer, target.value, tokenId.value);
  console.log(`Sending DRT to ${target.value}`);
}

function giveRewardsAll() {
  users.value.forEach(u => {
    sendETH(signer, u)
  })
}
</script>

<template>
  <header>
    <div class="header-content">
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="40" height="40" />
      <h1>Data Rewards Hub</h1>
      <div style="flex-grow: 1"></div>
      <sl-button variant="default">
        <sl-icon slot="prefix" name="person-circle"></sl-icon>
        Switch Account
      </sl-button>
    </div>
  </header>

  <main>
    <div v-if="isLoading">
      <sl-spinner></sl-spinner>
    </div>
    <div v-else>
      <div v-if="isContractOwner">
        <h2>Contract Owner</h2>
        <p>You are the contract owner.</p>
        <table>
          <thead>
            <tr>
              <th>Address</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0x1234</td>
              <td>0.0001</td>
            </tr>
          </tbody>
        </table>
        <sl-dialog label="Give rewards" class="dialog-overview">
          <sl-input label="To" placeholder="Please fill in the account to receive rewards" v-model="target"></sl-input>
          <sl-input type="number" label="Token ID" placeholder="Please fill in the token ID" v-model="tokenId"></sl-input>
          <sl-button variant="primary" @click="giveNFT">Send</sl-button>
          <p>Other wallets are for example:</p>
          <ul>
            <li>0x90F79bf6EB2c4f870365E785982E1f101E93b906</li>
            <li>0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65</li>
            <li>0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc</li>
            <li>0x976EA74026E726554dB657fA54763abd0C3a0aa9</li>
            <li>0x14dC79964da2C08b23698B3D3cc7Ca32193d9955</li>
            <li>0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f</li>
            <li>0xa0Ee7A142d267C1f36714E4a8F75612F20a79720</li>
          </ul>
          <sl-button slot="footer" @click="closeDialog">Close</sl-button>
        </sl-dialog>

        
        <sl-button variant="primary" @click="openDialog">Give Token</sl-button>
        <h3>Accounts owning DRT</h3>
        <ul>
          <li v-for="user in validUsers" :key="user">{{ user }}</li>
        </ul>
        <sl-tooltip content="Not implemented: you need to create a separate service to automatically sign transactions.">   
          <sl-button variant="primary">Give Rewards</sl-button>
        </sl-tooltip>
      </div>

      <div v-else></div>

    </div>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  border-bottom: 1px solid var(--color-border);
}

.header-content {
  color: var(--color-heading);
  display: flex;
  place-items: center;
  justify-content: space-between;
  gap: var(--size-1);
  padding: var(--size-3);
}

main {
  padding: var(--size-3);
  max-width: 1000px;
  margin: auto;
}
</style>
