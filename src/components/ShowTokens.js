import React from 'react'

import { useState, useEffect } from 'react';
import Loading from './Loading';



function ShowTokens(props) {


const BCHJS = require('@psf/bch-js')
const NETWORK = 'mainnet'
// REST API servers.
const BCHN_MAINNET = 'https://bchn.fullstack.cash/v5/'
// const ABC_MAINNET = 'https://abc.fullstack.cash/v4/'
const TESTNET3 = 'https://testnet3.fullstack.cash/v4/'

let bchjs
if (NETWORK === 'mainnet') bchjs = new BCHJS({ restURL: BCHN_MAINNET })
else bchjs = new BCHJS({ restURL: TESTNET3 })

    const [loading, setLoading] = useState(false)
    const [tokenArray, setToken] = useState([])
    //Get the balance of the address.
        const getTokeninfo = async  () => {
           
          setLoading(true)

            try {
            const toSlpAddr = await bchjs.SLP.Address.toSLPAddress(props.props)
            const slpInfo = await bchjs.SLP.Utils.balancesForAddress(toSlpAddr)
           
            const tokenInfo = await bchjs.SLP.Utils.list(slpInfo[0].tokenId);
                //  const tokenTostring = JSON.stringify(tokenInfo, null, 2)
            
             
         // console.log(tokenInfo)
            const TokDetails = {
              name: tokenInfo.name,
              symbol: tokenInfo.symbol,
              balance: slpInfo[0].balance,
              blockCreated: tokenInfo.blockCreated
              
          }
        const tokenArray = [TokDetails]
            //console.log(tokenArray)
            console.log(tokenArray.status)
            setLoading(false)
            setToken(tokenArray)
                   
                
            } catch (error) {
                setLoading(false)
                console.log(error)
                
            }

        }

 useEffect(() => {
    getTokeninfo()
    
  }, [])

   if (loading) {
        return (
          <div>
            <h2>Loading SLP info</h2>
              <Loading />
          </div>
        )

      } 
        if (tokenArray.length === 0) {
          return (
            <main>
              <div className='section'>
                <h2>No SLP tokens</h2>
                
              </div>
            </main>
          )
          
        }    
   
      return tokenArray.map((item)=> {
        return (
          <div key={item.id}>
           
             <h2 className='section2' >
               Token: {item.name}          
              </h2>
              <h3 className="h3">
                 Symbol: {item.symbol}
              </h3>
              <h3  className="h3">
                Balance: {item.balance}
              </h3>
              <ul  className="h3">
                BlockCreated: {item.blockCreated}
              </ul>
             
          </div>
      )
      });

  
}

export default ShowTokens
