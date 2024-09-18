import React, { createContext, useContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CryptoContextProvider = (props) => {
  const [allcoin, setAllcoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetallcoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-QnxbDn1iE42KmDsPPKQ9onug",
      },
    };

    // Fix the API URL to include the required parameter
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setAllcoin(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetallcoin();
  }, [currency]);

  const contextvalue = {
    allcoin,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextvalue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CryptoContextProvider;
