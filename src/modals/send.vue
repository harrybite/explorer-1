<!-- <template>
    <div v-if="false" class="cursor-pointer modal !pointer-events-auto !opacity-100 !visible">
      <div class="relative modal-box cursor-default">
   
        <div class="flex items-center justify-between">
          <div class="text-lg font-bold flex flex-col md:!flex-row justify-between items-baseline">
            <span class="mr-2">Send</span>
          </div>
          <label htmlFor="modal-pool-modal" class="cursor-pointer">
            <Icon icon="zondicons:close-outline" class="text-2xl text-gray-500 dark:text-gray-400" />
          </label>
        </div>

        <div class="mt-4">
          <div class="">
            <div class="mt-2 text-right text-sm">
              <div class="block justify-items-start space-y-4">
                <div class="w-full h-fit p-3 flex flex-row  border-2 rounded-xl"
                >
    
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template> -->


<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-75"
    v-if="isVisible">
    <div class="relative w-full max-w-lg mx-2 my-6 ">
      <div class="relative bg-white rounded-lg shadow dark:bg-[#29324C]">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Send
          </h3>
          <button type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="closeModal">
            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="p-6 space-y-6">
          <div class="block ">
            <div class="mb-4">
              <label for="sender" class="block mb-2 text-sm font-normal text-gray-900 dark:text-white">Sender</label>
              <input type="text" name="sender" id="sender"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="" disabled :value="senderAddress" >
            </div>

            <!-- <div class="mb-4">
              <label for="balances" class="block  mb-2 text-sm font-normal text-gray-900 dark:text-white">Balances</label>
              <select id="balances"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="token1">Token 1</option>
                <option value="token2">Token 2</option>
                <option value="token3">Token 3</option>
              </select>
            </div> -->

            <div class="mb-4">
              <label for="recipient" class="block  mb-2 text-sm font-normal text-gray-900 dark:text-white">Recipient</label>
              <input type="text" name="recipient" id="recipient"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter recipient address"
                v-model="receiveraddress" 
                />
            </div>

            <div class="mb-1">
              <div class="flex justify-between">
                <label for="amount" class="block  mb-2 text-sm font-normal text-gray-900 dark:text-white">Amount</label>
                <label for="amount" class="block  mb-2 text-sm font-normal text-gray-900 dark:text-white">Available Balance: {{ balance }}</label>
              </div>
              <input type="number" name="amount" id="amount"
                v-model="sendamount"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        
                />
            </div>
            <!-- <label for="available" class="block text-sm font-normal text-gray-900 dark:text-white">Available</label>
            <select id="available"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select> -->
          </div>
        </div>
        <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
          <button type="button"
            class="text-white bg-[#3FB68B]  focus:ring-4 focus:ring-lime-300 font-medium rounded-lg
             text-sm px-5 py-2.5 text-center dark:bg-[#3FB68B] dark:focus:ring-lime-800"
            @click="calle"
             >
            Send
          </button>
          <button type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-500 dark:focus:ring-gray-700"
            @click="closeModal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SendModal',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    senderAddress: {
      type: String,
      required: false,
    },
    balance: {
      type: Number,
      required: false,
    },
  },
  computed: {
    isVisible: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  methods: {
    closeModal() {
      this.isVisible = false;
    },
  },
  setup() {
    const receiveraddress = ref(""); 
    const sendamount = ref(0); 
    function calle() {
      SendFunds(111, "ssi1d2g0fjdp6xqcysf94kqfs0f0nt0cqhpw8zf3za", "ssi1k8upyxjm03dgactlx8a23v8cct96vc5dph88kk")
    }
    return { receiveraddress, sendamount, calle };
  }
};
import { onMounted, ref } from 'vue';
import { SendFunds } from "./../wallets/t3wallet"

</script>

<style scoped>
/* your style here */
</style>