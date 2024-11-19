// @ts-nocheck
import { Registry, TxBodyEncodeObject, encodePubkey } from '@cosmjs/proto-signing';
import { MsgSend } from 'cosmjs-types/cosmos/bank/v1beta1/tx';
import { makeSignDoc, DirectSecp256k1Wallet } from '@cosmjs/proto-signing';
import { assertIsBroadcastTxSuccess, SigningStargateClient } from '@cosmjs/stargate';

import type { WalletConnected } from '@/types';

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
      wallet: 'cosmos',
      cosmosAddress: account.address,
      hdPath: chainStore.defaultHDPath,
    };
    return walletInfo;
  } catch (e) {
    console.log(e.message);
  }
}
export async function SendFunds(amount, sender, receiver) {
  try {
    // console.log(amount, sender, receiver);

    // Fetch sender's account details
    // const chainId = 'sov-6';
    // const authResponse = await fetch(`https://explorer-restapi.sovereignty.one/cosmos/auth/v1beta1/accounts/${sender}`);
    // const authData = await authResponse.json();
    // const { account_number, sequence } = authData.account;
    // const key = authData.account.pub_key.key
    
    // const doc = {
    //   chain_id: "cosmoshub-4",
      // fee: { amount: [{ denom: "usoid", amount: "5000" }], gas: "200000" },
      // memo: "",
      // msgs: [
      //   {
      //     type: "cosmos-sdk/MsgSend",
      //     value: {
      //       from_address: sender,
      //       to_address: receiver,
      //       amount: [{ denom: "usoid", amount: "50000" }],
      //     },
      //   },
      // ],
      // sequence: sequence,
      // account_number: account_number,
    // },
   
    // const doc = {
    //   chain_id: 'sov-6',
    //   sequence: sequence.toString(),
    //   account_number: account_number.toString(),
    //   fee: {
    //     amount: [
    //       {
    //         denom: 'usoid',
    //         amount: '500',
    //       },
    //     ],
    //     gas: '200000',
    //   },
    //   msgs: [
    //     {
    //       type: 'cosmos.bank.v1beta1.MsgSend',
    //       value: {
    //         from_address: sender,
    //         to_address: receiver,
    //         amount: [
    //           {
    //             denom: 'usoid',
    //             amount: amount.toString(),
    //           },
    //         ],
    //       },
    //     },
    //   ],
    //   memo: 'Transaction memo',
    // };

    // Request signature from Cosmostation
    // if (!window.cosmostation) {
    //   alert('Please install cosmostation extension');
    // } else {
    //   const chainId = 'sov-6';
   
    //   await window.cosmostation.providers.keplr.enable(chainId);
   
    //   const tx = window.cosmostation.providers.keplr.sendTx();
   
    //   console.log('accounts:', tx);
    // }
    // const response = await window.cosmostation.cosmos;
    

    // const txBody = {
    //   messages: doc.msgs,
    //   memo: doc.memo,
    // };

    // const authInfo = {
    //   fee: {
    //     amount: doc.fee.amount,
    //     gasLimit: doc.fee.gas,
    //   },
    //   signerInfos: [
    //     {
    //       publicKey: encodePubkey({
    //         type: 'tendermint/PubKeySecp256k1',
    //         value: response.pub_key,
    //       }),
    //       sequence: Number(doc.sequence),
    //     },
    //   ],
    // };

    // const txRaw = TxRaw.fromPartial({
    //   bodyBytes: TxBodyEncodeObject.encode(txBody).finish(),
    //   authInfoBytes: makeSignDocAmino(authInfo).finish(),
    //   signatures: [fromBase64(response.signature)],
    // });

    // const txBytes = TxRaw.encode(txRaw).finish();

    // // Broadcast the transaction
    // const rpcUrl = 'https://explorer-restapi.sovereignty.one/cosmos/tx/v1beta1/txs';
    // const broadcastResponse = await fetch(rpcUrl, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     tx_bytes: toBase64(txBytes),
    //     mode: 'BROADCAST_MODE_BLOCK',
    //   }),
    // });

    // const result = await broadcastResponse.json();
    // console.log('Broadcast Result:', result);
  } catch (e) {
    console.log('Error:', e);
  }
}