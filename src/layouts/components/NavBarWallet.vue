<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useBaseStore, useBlockchain, useWalletStore, storewlletkey } from '@/stores';
import { Icon } from '@iconify/vue';
import { ref, computed } from 'vue';
import { T3ConnectWallet } from "./../../wallets/t3wallet"

const route = useRoute();
const walletStore = useWalletStore();
const chainStore = useBlockchain();
const baseStore = useBaseStore();
const showModal = ref(false);
// walletStore.$subscribe((m, s) => {
//   console.log(m, s);
// });
function walletStateChange(res: any) {
  walletStore.setConnectedWallet(res.detail?.value);
}
let showCopyToast = ref(0);
async function copyAdress(address: string) {
  try {
    await navigator.clipboard.writeText(address);
    showCopyToast.value = 1;
    setTimeout(() => {
      showCopyToast.value = 0;
    }, 1000);
  } catch (err) {
    showCopyToast.value = 2;
    setTimeout(() => {
      showCopyToast.value = 0;
    }, 1000);
  }
}
const tipMsg = computed(() => {
  return showCopyToast.value === 2
    ? { class: 'error', msg: 'Copy Error!' }
    : { class: 'success', msg: 'Copy Success!' };
});

const params = computed(() => {
  if (chainStore.chainName == 'side') {
    return JSON.stringify({
      wallet: ['okex', 'unisat'],
    });
  }
  return "";
});

async function ConnectWallet(){
  const walletInfo = await T3ConnectWallet(baseStore, chainStore);
  console.log("Connected wallet details:", walletInfo, chainStore.defaultHDPath);
  // @ts-ignore
  walletStore.setConnectedWallet(walletInfo);
  await walletStore.loadMyAsset();
  localStorage.setItem(storewlletkey, JSON.stringify(walletInfo));
}

async function DisConnectWallet(){
  walletStore.disconnect()
  showModal.value = false
}



</script>

<template>
  <div class="dropdown dropdown-hover dropdown-end">
    <label tabindex="0" class="btn btn-sm btn-primary m-1 lowercase truncate !inline-flex text-xs md:!text-sm">
      <Icon icon="mdi:wallet" />
      <span class="ml-1 hidden md:block">
        {{ walletStore.shortAddress || 'Wallet' }}</span>
    </label>
    <div tabindex="0" class="dropdown-content menu shadow p-2 bg-base-100 rounded w-52 md:!w-64 overflow-auto">
      <label v-if="!walletStore?.currentAddress" @click="showModal = true" class="btn btn-sm btn-primary">
        <Icon icon="mdi:wallet" /><span class="ml-1 block">Connect Wallet</span>
      </label>
      <div class="px-2 mb-1 text-gray-500 dark:text-gray-400 font-semibold">
        {{ walletStore.connectedWallet?.wallet }}
      </div>
      <div>
        <a v-if="walletStore.currentAddress"
          class="block py-2 px-2 hover:bg-gray-100 dark:hover:bg-[#353f5a] rounded cursor-pointer"
          style="overflow-wrap: anywhere" @click="copyAdress(walletStore.currentAddress)">
          {{ walletStore.currentAddress }}
        </a>
        <div class="divider mt-1 mb-1"></div>
        <RouterLink to="/wallet/accounts">
          <div class="block py-2 px-2 hover:!bg-gray-100 rounded cursor-pointer">Accounts</div>
        </RouterLink>
        <RouterLink to="/wallet/portfolio">
          <div class="block py-2 px-2 hover:!bg-gray-100 rounded cursor-pointer">Portfolio</div>
        </RouterLink>
        <div v-if="walletStore.currentAddress" class="divider mt-1 mb-1"></div>
        <a v-if="walletStore.currentAddress"
          class="block py-2 px-2 hover:bg-gray-100 dark:hover:bg-[#353f5a] rounded cursor-pointer"
          @click="DisConnectWallet">Disconnect</a>
      </div>
    </div>
    <div class="toast" v-show="showCopyToast === 1">
      <div class="alert alert-success">
        <div class="text-xs md:!text-sm">
          <span>{{ tipMsg.msg }}</span>
        </div>
      </div>
    </div>
    <div class="toast" v-show="showCopyToast === 2">
      <div class="alert alert-error">
        <div class="text-xs md:!text-sm">
          <span>{{ tipMsg.msg }}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- connect wallet -->
  <div>

    <div v-if="showModal" class="cursor-pointer modal !pointer-events-auto !opacity-100 !visible"
      @click="showModal = false">
      <div class="relative modal-box cursor-default">
        <!-- header -->
        <div class="flex items-center justify-between">
          <div class="text-lg font-bold flex flex-col md:!flex-row justify-between items-baseline">
            <span class="mr-2">Connect Wallet</span>
          </div>
          <label htmlFor="modal-pool-modal" class="cursor-pointer" @click="showModal = false">
            <Icon icon="zondicons:close-outline" class="text-2xl text-gray-500 dark:text-gray-400" />
          </label>
        </div>
        <!-- body -->
        <div class="mt-4">
          <div class="">
            <div class="mt-2 text-right text-sm">
              <div class="block justify-items-start space-y-4">
                <div class="w-full h-fit p-3 flex flex-row  border-2 rounded-xl 
                hover:bg-gray-100 dark:hover:bg-[#373f59] cursor-pointer"
                @click="ConnectWallet"
                >
                  <div class="basis-1/4 pl-3"><img class="w-10" src="./../../assets/wallets//t3wallet.png" /></div>
                  <div class="text-base basis-1/2 font-bold">{{ "Connect T3 wallet" }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- <ping-connect-wallet :chain-id="baseStore.currentChainId || 'cosmoshub-4'" :hd-path="chainStore.defaultHDPath"
      :addr-prefix="chainStore.current?.bech32Prefix || 'cosmos'" @connect="walletStateChange"
      @keplr-config="walletStore.suggestChain()"  :params="params" /> -->

</template>

<style>
.ping-connect-btn,
.ping-connect-dropdown {
  display: none !important;
}
</style>
