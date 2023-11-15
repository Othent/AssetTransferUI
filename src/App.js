import './App.css';
import { useEffect, useState } from 'react';
import { Othent } from 'othent';

function App() {

  const [othent, setOthent] = useState(null);
  useEffect(() => {
    async function initializeOthent() {
      try {
        const othentInstance = await Othent({});
        setOthent(othentInstance);
      } catch (error) {
        console.error('Error initializing Othent:', error);
      }
    }
    initializeOthent();
  }, []);


  const [recipientAddress, setRecipientAddress] = useState('');
  const handleRecipientAddressChange = (e) => {
    setRecipientAddress(e.target.value);
  };

  const [AAAddress, setAAAddress] = useState('');
  const handleAAIdChange = (e) => {
    setAAAddress(e.target.value);
  };

  const [amount, setAmount] = useState('');
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };


  const [userDetails, setUserDetails] = useState(null);
  async function login() {
    const userDetails = await othent.logIn()
    setUserDetails(userDetails)
    console.log(userDetails)
  }

  async function send() {

    console.log(AAAddress, amount, userDetails.email)

    // const signedWarpTransaction = await othent.signTransactionWarp({
    //   othentFunction: 'sendTransaction', 
    //   data: {
    //     toContractId: AAAddress, 
    //     toContractFunction: 'transfer', 
    //     txnData: { qty: amount } 
    //   }, 
    // });

    // const transaction = await othent.sendTransactionWarp(signedWarpTransaction);
    
    // console.log(transaction);
  }


  return (
    <div className="App">
      <h1>Transfer Atomic Asset</h1>

        <div>
          <h2>Step 1: Login</h2>
          <button onClick={login}>Login</button>
        </div>

        <div>
          <h2>Step 2: Enter transfer details</h2>
          <input
            type="text"
            placeholder="Atomic Asset ID"
            value={AAAddress}
            onChange={handleAAIdChange}
          />
          <input
            type="text"
            placeholder="Amount to send"
            value={amount}
            onChange={handleAmount}
          />
          <input
            type="text"
            placeholder="Recipient address"
            value={recipientAddress}
            onChange={handleRecipientAddressChange}
          />
        </div>


        <div>
          <h2>Step 3: Press send</h2>
          <button onClick={send}>Send</button>
        </div>

    </div>
  );
}

export default App;
