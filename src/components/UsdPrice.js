import { useState,  useEffect } from 'react';
import Loading from './Loading';

const NETWORK = 'mainnet'

// REST API servers.
const BCHN_MAINNET = 'https://bchn.fullstack.cash/v4/'
// const ABC_MAINNET = 'https://abc.fullstack.cash/v4/'
const TESTNET3 = 'https://testnet3.fullstack.cash/v4/'

// bch-js-examples require code from the main bch-js repo
const BCHJS = require('@psf/bch-js')

let bchjs
if (NETWORK === 'mainnet') bchjs = new BCHJS({ restURL: BCHN_MAINNET })
else bchjs = new BCHJS({ restURL: TESTNET3 })

const UsdPrice = (balance) => {
    const [loading, setLoading] = useState(true)
   const [result, setResult] = useState([])
//  console.log(balance)

   const GetPrice = async  () => {
    setLoading(true)
  
        try {
          let currentPrice = await bchjs.Price.getUsd();
          const result =  [currentPrice]
        
          setLoading(false)
          setResult(result)
    
        } catch(error) {
            setLoading(false)
            console.log(error)
        } 
        
      };
      useEffect(() => {
        GetPrice()
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
              <h2>N/A</h2>
              
            </div>
          </main>
        )
      }

      function decimals(x) {
        return Number.parseFloat(x).toFixed(2);
      }

      return result.map((item)=> {
        return (
          <div key={item}>
           
             <h2 className='section' >
              
             USD: ${decimals(item * balance.balance)}
             
             
              </h2>
             
          </div>
      )
      })


    }

  export default UsdPrice