<script>
import QRCode from 'qrcode';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

export default {
    name: 'QrCode',
    props: {
        modelValue: {
            type: Boolean,
            default: true,
        },
        senderAddress: {
            type: String,
            required: false,
        },
    },
    data() {
        return {
            qrCodeDataUrl: '', // Holds the generated QR code image URL
            showCopyToast: 0, // 0: No toast, 1: Success, 2: Error
        };
    },
    computed: {
        isVisible: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            },
        },
        tipMsg() {
            return this.showCopyToast === 2
                ? { class: 'error', msg: 'Copy Error!' }
                : { class: 'success', msg: 'Copy Success!' };
        },
    },
    methods: {
        closeModal() {
            this.isVisible = false;
        },
        generateQRCode() {
            if (this.senderAddress) {
                QRCode.toDataURL(this.senderAddress)
                    .then((url) => {
                        this.qrCodeDataUrl = url; // Store the QR code image URL
                    })
                    .catch((err) => {
                        console.error('QR Code generation failed:', err);
                    });
            }
        },
        async copyAddress() {
            try {
                await navigator.clipboard.writeText(this.senderAddress);
                this.showCopyToast = 1; // Success state
                setTimeout(() => {
                    this.showCopyToast = 0; // Reset state
                }, 1000);
            } catch (err) {
                this.showCopyToast = 2; // Error state
                setTimeout(() => {
                    this.showCopyToast = 0; // Reset state
                }, 1000);
            }
        },
    },
    watch: {
        senderAddress: 'generateQRCode', // Re-generate the QR code if senderAddress changes
    },
    mounted() {
        this.generateQRCode(); // Generate QR code when the component is mounted
    },
};
</script>

<template>
    <div v-if="isVisible"
        class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-75">
        <div class="relative w-full max-w-lg mx-2 my-6 ">
            <div class="relative bg-white rounded-lg shadow dark:bg-[#29324C]">
                <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Receive assets
                    </h3>
                    <button type="button" @click="closeModal"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
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
                    <div class="block">
                        <div class="flex justify-center mb-2">
                            <img v-if="qrCodeDataUrl" :src="qrCodeDataUrl" alt="QR Code" />
                            <p v-else class="text-sm text-gray-500 dark:text-gray-400">
                                Generating QR Code...
                            </p>
                        </div>
                        <div class="flex justify-center">
                            <span class="truncate">{{ senderAddress }}</span>
                            <img @click="copyAddress"
                                src="data:image/png;base64,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"
                                class="cursor-pointer w-6" />
                        </div>
                    </div>
                </div>
                <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                    <button type="button" @click="closeModal"
                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-500 dark:focus:ring-gray-700">
                        Close
                    </button>
                    <div>
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
                </div>
            </div>
        </div>
    </div>

</template>

<style>
/* Add your styles here */
</style>