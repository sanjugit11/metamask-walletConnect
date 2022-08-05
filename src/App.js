import React, { useState } from 'react';
import './App.css';
import Web3 from 'web3';
import { useDispatch } from 'react-redux';
import WalletConnectProvider from "@walletconnect/web3-provider";

function App() {
  const [setAccount,getAccount] = useState(" ");
  // const web31 = new Web3(Web3.givenProvider);
  const dispatch = useDispatch()

  const CWprovider = new WalletConnectProvider({
    infuraId: "e9ef53e4b59f472b892524a49146d3b1",     //etherteum main nertwallet will connect

  });

  const connectMetamask = async () => {
    // Check if MetaMask is installed on user's browser
    try{
    
      if (window.ethereum ) {
        // debugger;
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });

        if(!chainId ==='338'){
          alert("select cronos testnet");
        }
      
        await window.ethereum.enable();
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const chainId1 = await window.ethereum.request({ method: 'eth_chainId' });
        getAccount(
          accounts[0].slice(0,accounts[0].length/9)+
          "..."+
          accounts[0].slice(38,accounts[0].length/1)

          );
        // alert(accounts[0]);
        // alert(chainId1);
      } else {
        // Show alert if Ethereum provider is not detected
        alert("Please install Mask");
      }
    }catch(e){
        console.log(e.error);
    }
  }
//connectWallet
  const connectWallet= async()=>{
    try{
      
      //  Enable session (triggers QR Code modal)
  
        await CWprovider.enable();

        const account= await CWprovider.accounts;
        console.log(account[0]);
        getAccount(
          account[0].slice(0,account[0].length/9)+
          "..."+
          account[0].slice(38,account[0].length/1)
          
          );
        
  

     
  }catch(e){
    console.log(e.error);
  }
}
  
//disconnect
  const disconnectMetamask= async () =>{
   await getAccount(" ");
   await window.location.reload(true);
  await dispatch(getAccount(" "));
  }
  return (
    <div className="App">
      <header className="App-header">
        <p> wallet connect</p>
        <button onClick={connectMetamask}>MetaMask</button>
        <br></br>
        <button onClick={connectWallet}>connectWallet</button>
        <br></br>
        <p>Address:{setAccount}</p>
        <br></br>
        <button onClick={disconnectMetamask}>Disconnect</button>
        <br></br>

      </header>
    </div>
  );
}

export default App;


