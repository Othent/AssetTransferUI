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
  const handleInputChange = (e) => {
    setRecipientAddress(e.target.value);
  };


  const [userDetails, setUserDetails] = useState(null);
  async function login() {
    const userDetails = await othent.logIn()
    setUserDetails(userDetails)
    console.log(userDetails)
  }

  async function send() {

    const signedWarpTransaction = await othent.signTransactionWarp({
      othentFunction: 'sendTransaction', 
      data: {
        toContractId: '2W9NoIJM1SuaFUaSOJsui_5lD_NvCHTjez5HKe2SjYU', 
        toContractFunction: 'createPost', 
        txnData: { blog_entry: 'Hello World!'} 
      }, 
    });

    const transaction = await othent.sendTransactionWarp(signedWarpTransaction);
    
    console.log(transaction);
  }


  return (
    <div className="App">
      <h1>Transfer Atomic Asset</h1>

        <div>
          <h2>Step 1: Login</h2>
          <button onClick={login}>Login</button>
        </div>

        <div>
          <h2>Step 2: Send Asset</h2>
          <input
            type="text"
            placeholder="Recipient address"
            value={recipientAddress}
            onChange={handleInputChange}
          />
          <button onClick={send}>Send</button>
        </div>

    </div>
  );
}

export default App;
