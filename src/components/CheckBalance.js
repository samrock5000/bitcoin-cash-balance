
//Set NETWORK to either testnet or mainnet

import React from 'react'
import { useState, useEffect } from 'react';
import Loading from './Loading';
import UsdPrice from './UsdPrice';





const CheckBalance =(props) => {
   //console.log(props)
  const NETWORK = 'mainnet'

// REST API servers.
const BCHN_MAINNET = 'https://bchn.fullstack.cash/v4/'
// const ABC_MAINNET = 'https://abc.fullstack.cash/v4/'
const TESTNET3 = 'https://testnet3.fullstack.cash/v4/'

// bch-js-examples require code from the main bch-js repo
const BCHJS = require('@psf/bch-js')

// Instantiate bch-js based on the network.
let bchjs
if (NETWORK === 'mainnet') bchjs = new BCHJS({ restURL: BCHN_MAINNET })
else bchjs = new BCHJS({ restURL: TESTNET3 })



const [loading, setLoading] = useState(true)
   const [result, setResult] = useState([])
  
  
//Get the balance of the wallet.
 const GetBalance = async  () => {
  setLoading(true)


  console.log(props)
  
    // first get BCH balance
    try {
    const balance = await bchjs.Electrumx.balance(props.props)
     
    const result =  [balance]

    setLoading(false)
    setResult(result)
      console.log(balance)
  } catch (error) {
    setLoading(false)
    console.log(error)
    
  }
}


useEffect(() => {
  GetBalance()
  
}, [])
 
    if (loading) {
      return (
        <div>
          <h2>Loading</h2>
          <Loading />
        </div>
      )
    } 
    if (result.length === 0) {
      return (
        <main>
          <div className='section'>
            <h2>Not Found</h2>
            
          </div>
        </main>
      )
    }
    
  return result.map((item)=> {
    return (
      <div id="body">
      
          <div key={item.id}>
          
            <h2 className='section' >
              Balance:{" "} 
            
            {bchjs.BitcoinCash.toBitcoinCash(item.balance.confirmed)}
              <h2>
              <UsdPrice balance={bchjs.BitcoinCash.toBitcoinCash(item.balance.confirmed)}/>
              </h2>
            
            
              </h2>
            
          </div>
       </div>
  )
  });
 
}


export default CheckBalance




