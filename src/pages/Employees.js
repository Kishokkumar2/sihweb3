import React, { useContext, useState, useEffect } from 'react';
import { CoinContext } from '../Api/Coincontext';
import PopularBitcoinbar from '../Api/Graph/PopularBitcoinbar';
import './Order.css';


const Employees = () => {
  const { allcoin } = useContext(CoinContext);
  const [conversionRate, setConversionRate] = useState(83); 



  return (
    <div>
      
      <div>
        <h2 className='order1'>Live-Transcation</h2>
      </div>
      <div className="order3">
        <table className="table">
          <thead className='table2'>
            <tr>
            <th>#</th>
              <th>From</th>
              <th>Value</th>
              <th>Time</th>
              <th>Status</th>
              <th>Bit-Coin-Type</th>
              <th>To</th>
            </tr>
          </thead>
          {/* <tbody>
            {allcoin.map((coin, index) => {
              const priceInINR = (coin.current_price * conversionRate).toFixed(2); 

              return (
                <tr key={coin.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={coin.image} className="orderimg" alt={coin.name} /> {coin.name}
                  </td>
                  <td>{coin.current_price}$</td>
                  <td>{priceInINR}₹</td>
                  <td>
                    {coin.price_change_percentage_24h < 0 ? (
                      <p className='coin2'>{coin.price_change_percentage_24h}%</p>
                    ) : (
                      <p className='coin1'>{coin.price_change_percentage_24h}%</p>
                    )}
                  </td>
                  <td>
                    <p className='bitsym'>{coin.symbol.toUpperCase()}</p>
                  </td>
                  <td>{coin.market_cap}</td>
                </tr>
              );
            })}
          </tbody> */}
        </table>
      </div>
    </div>
  );
};

export default Employees;
