import React, { useEffect, useState } from "react";
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const UserCoinbalance = ({ useradd }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = `query ($network: EthereumNetwork!, $address: String!) {
        ethereum(network: $network) {
          address(address: {is: $address}) {
            balances {
              value
              currency {
                address
                symbol
                tokenType
              }
            }
          }
        }
      }`;

      const variables = {
        network: "ethereum",
        address: useradd,
      };

      try {
        const response = await fetch('https://graphql.bitquery.io', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'BQY6JYVGt1vYuCbeBfHquPIZ3YywKiIH',
            'Authorization': 'Bearer ory_at_s1SeCKkYhNO7IbZJhryC4gDlAUecinyrDxp1TJsVcuI.bR3o650sXSUbXabghtgUhUFh7WB42e9vL6203bRl2xM'
          },
          body: JSON.stringify({
            query: query,
            variables: variables
          })
        });

        const json = await response.json();
        console.log("API Response:", json); // Log the API response
        if (json.data?.ethereum?.address?.balances) {
          setData(json.data.ethereum.address.balances);
        } else {
          throw new Error("No balances data found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    if (useradd) {
      fetchData();
    }
  }, [useradd]);

  if (error) {
    return (
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>Error</Typography>
        <Typography>{error}</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom>Address Balances</Typography>
      {data ? (
        <List>
          {data.map((balance, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${balance.value} ${balance.currency.symbol}`}
                secondary={`Token Address: ${balance.currency.address} | Token Type: ${balance.currency.tokenType}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Paper>
  );
};

export default UserCoinbalance;
