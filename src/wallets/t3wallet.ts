// @ts-nocheck
import type {
  WalletConnected,
} from '@/types';


export async function T3ConnectWallet(chainID: any, chainStore: any) {
  try {
    if (!window.cosmostation) {
      throw new Error('Cosmostation extension not installed');
    }
    const account = await window.cosmostation.cosmos.request({
      method: 'cos_requestAccount',
      params: { chainName: chainID?.currentChainId },
    });

    const walletInfo: WalletConnected = {
      wallet: "cosmos",
      cosmosAddress: account.address, 
      hdPath: chainStore.defaultHDPath 
    };
    return walletInfo
  } catch (e) {
    console.log(e.message);
  }
}