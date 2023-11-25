<script setup>
import { onMounted, ref } from 'vue';
import { connectToMetaMask, listenForAccountChange, listenForChainChange } from './utils/wallet';
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'

const CONTRACT_OWNER = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

const isLoading = ref(true);
const isContractOwner = ref(false);

onMounted(async () => {
  const {provider, signer, address} = await connectToMetaMask();
  isLoading.value = false;

  listenForAccountChange(updateApp);
  listenForChainChange(updateApp);

  updateApp(address);
})

function updateApp(address) {
  if (address === CONTRACT_OWNER) {
    isContractOwner.value = true
    console.log('You are the contract owner!');
  } else {
    isContractOwner.value = false
    console.log('You are not the contract owner.');
  }
}

function openDialog() {
  const dialog = document.querySelector('.dialog-overview');
  dialog.show();
}

function closeDialog() {
  const dialog = document.querySelector('.dialog-overview');
  dialog.hide();
}

function send() {
  const destination = ''
  const amount = 10
  console.log(`Sending ${amount} to ${destination}`);
}
</script>

<template>
  <header>
    <div class="header-content">
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="40" height="40" />
      <h1>Data Rewards Hub</h1>
      <div style="flex-grow: 1"></div>
      <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
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
          <sl-input label="To" placeholder="Please fill in the account to receive rewards"></sl-input>
          <sl-input label="Amount" placeholder="Please fill in the amount of rewards" type="number"></sl-input>
          <sl-button variant="primary" @click="send">Send</sl-button>
          <sl-button slot="footer" @click="closeDialog">Close</sl-button>
        </sl-dialog>

        <sl-button variant="primary" @click="openDialog">Give rewards</sl-button>
        <h3>Newly Claimed Rewards</h3>
        <ul>
          
        </ul>
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
