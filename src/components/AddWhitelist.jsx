import { useState, useEffect } from 'react';
 import { ref } from './../App';
 import { v4 as uuidv4 } from 'uuid';

 function AddWhitelist(props) {

  function createDoc(newDataObj) {
    props.getCount();

    if(newDataObj.address.match(/^0x[a-fA-F0-9]{40}$/)) {
      if(props.countData < 5) {
        let i = 0;
        ref.where("address", "==", newDataObj.address)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            i++;
          })
          if(i < 1) {
            if(props.balance >= 0.3) {
              ref.doc(newDataObj.id).set(newDataObj)
              .then(result => {
                props.setSucces('You have been added to the whitelist !')
                props.setError((''));
              })
              .catch((err) => {
                props.setSucces('');
                props.setError('Error, we are sorry.');
              })
            }
            else {
              props.setSucces('');
              props.setError('Not enought funds on your wallet (0.3 minimum).')
            }
          }
          else {
            props.setSucces('');
            props.setError('This address is already on the whitelist !');
          }
        })
        .catch(function(error) {
          props.setSucces('');
          props.setError('Erro we are sorry.');
        })
      }
      else {
        props.setSucces('');
        props.setError('Whitelist max limit exceeded.');
      }
    }
    else {
      props.setSucces('');
      props.setError('Invalid address.');
    }
    setTimeout(props.getCount, 500);
  }

   return (
     <div>
       {props.balance >= 0.3 &&
        <button className="btn" onClick={() => {
          createDoc({address: props.accounts[0], id: uuidv4(), balance: props.balance})
        }}>Go on whitelist</button>
       }
     </div>
   )
 }

 export default AddWhitelist;
