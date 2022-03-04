import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebase from './../Firebase';
import { ref } from './../App';

function Admin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logged, setLogged] = useState(false);
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [address, setAddress] = useState('');
  const [succes, setSucces] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setLoaded(true);
  })


  function loggin() {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      setLogged(true);
      getData();
    })
    .catch((error) => {
      console.log('non');
    })
  }

  function getData() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      })
      setData(items);
    })
  }

  function deleteAddress(e) {
    ref.doc(e.target.value).delete();
  }

  function addOnWhitelist() {
    let balance = 0;
    let id = uuidv4();
    let obj = {
      address: address,
      id: id,
      balance: balance
    }
    ref.doc(obj.id).set(obj)
    .then(result => {
      setSucces('User added on the whitelist');
      setError('');
    })
    .catch((err) => {
      setError(err);
      setSucces('');
    })
  }

  return (

    <div>
      {!logged
        ?
        <div>
          Se logger à l'interface d'administration
          <input type="email" onChange={e => setEmail(e.target.value)} />
          <input type="password" onChange={e => setPassword(e.target.value)} />
          <button onClick={loggin}>Connexion</button>
        </div>
        :
        <div>
          {error && <p className='alert error'>{error}</p>}
          {succes && <p className='alert succes'>{succes}</p>}
          Listing of accounts on the whitelist
          {loaded &&
            data.map(element => {
              return <li key={element.id}>{element.address} - {element.balance}
              - <button value={element.id} onClick={deleteAddress}>Delete</button></li>
            })
          }

          Add an address on the Whitelist
          <input type="text" onChange={e => setAddress(e.target.value)} />
          <button onClick={addOnWhitelist}>Add on Whitelist</button>
        </div>
      }
    </div>
  )
}

export default Admin;
