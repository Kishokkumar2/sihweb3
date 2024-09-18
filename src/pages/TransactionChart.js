import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography } from '@mui/material';

const TransactionChart = ({ useradd }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  console.log("Received useradd: ", useradd);

  useEffect(() => {
    const fetchData = async () => {
      const query = `query ($network: EthereumNetwork!, $dateFormat: String!, $address: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
        ethereum(network: $network) {
          transactions(
            options: {asc: "date.date"}
            date: {since: $from, till: $till}
            txSender: {is: $address}
          ) {
            date {
              date(format: $dateFormat)
            }
            count: countBigInt
            gasValue
          }
        }
      }`;

      const variables = {
        limit: 10,
        offset: 0,
        network: "ethereum",
        address: useradd,
        from: "2024-09-11",
        till: "2024-09-18T23:59:59",
        dateFormat: "%Y-%m-%d",
      };

      try {
        const response = await fetch('https://graphql.bitquery.io', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'BQY6JYVGt1vYuCbeBfHquPIZ3YywKiIH',
            'Authorization': 'Bearer ory_at_2IHJJxNxLJ2zN60jv8PGn_s7vzuur__lHLNmL6T39sc.UdoV2xAN6nUZLm9OG5s4mfjci_ETxlSRHYogFfPmSko'
          },
          body: JSON.stringify({
            query: query,
            variables: variables
          })
        });

        const json = await response.json();
        console.log("API Response: ", json); // Check the structure of the response

        if (json?.data?.ethereum?.transactions) {
          setData(json.data.ethereum.transactions);
        } else {
          throw new Error("No transactions data found.");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    if (useradd) {
      fetchData();
    }
  }, [useradd]);

  // Transform data for charting
  const transformData = (rawData) => {
    return rawData.map(item => ({
      date: item.date.date,
      count: parseInt(item.count, 10),
      gasValue: parseFloat(item.gasValue),
    }));
  };

  if (error) {
    return (
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>Error</Typography>
        <Typography>{error}</Typography>
      </Paper>
    );
  }

  return (
    useradd === "" ? null : (
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>Transactions By Date</Typography>
        {data ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={transformData(data)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" name="Transaction Count" />
              <Bar dataKey="gasValue" fill="#82ca9d" name="Gas Value" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Paper>
    )
  );
};

export default TransactionChart;
