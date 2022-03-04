import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import InfosAccount from './components/InfosAccount';
// On importe le component
import AddWhitelist from './components/AddWhitelist';
import firebase from './Firebase';
import './App.css';

const ref = firebase.firestore().collection('whitelist');

function App() {

  const [countData, setCountData] = useState(0);
  const [loader, setLoader] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState();
  const [succes, setSucces] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getAccounts();
    setLoader(false);
    getCount();
  }, [])

  window.ethereum.addListener('connect', async(reponse) => {
    getAccounts();
    console.log('ok');
  })

  window.ethereum.on('accountsChanged', () => {
    window.location.reload();
  })

  window.ethereum.on('chainChanged', () => {
    window.location.reload();
  })

  window.ethereum.on('disconnect', () => {
    window.location.reload();
  })

  function getCount() {
    ref.get().then(function(querySnapshot) {
      setCountData(querySnapshot.size);
    })
  }

  async function getAccounts() {
    if(typeof window.ethereum !== 'undefined') {
      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccounts(accounts);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(accounts[0]);
      const balanceInEth = ethers.utils.formatEther(balance);
      setBalance(balanceInEth);
    }
  }

  return (
    <div className="App">
      {error && <p className='alert error'>{error}</p>}
      {succes && <p className='alert succes'>{succes}</p>}
      <InfosAccount accounts={accounts} balance={balance} loader={loader}/>
      <AddWhitelist accounts={accounts} countData={countData} setCountData={setCountData} getCount={getCount} balance={balance}
       setBalance={setBalance} setError={setError} setSucces={setSucces} />
    </div>
  );
}

export {ref}
export default App;
