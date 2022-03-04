import { useState, useEffect } from 'react';

function InfosAccount(props) {
  return (
    <div>
      {!props.loader &&
        props.accounts.length > 0 ?
        <div>
          <p>Your are connected with this account : {props.accounts[0]}</p>
          {props.balance && <p>You have {props.balance} Eth on your account.</p>}
          {props.balance < 0.3 && <p className="info">You don't have enougth ETH on your account to go on our whitelist.</p>}
        </div>
        :
        <p>Your are not connected with Metamask to this website</p>
       }
    </div>
  )
}

export default InfosAccount;
