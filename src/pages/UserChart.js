import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography } from '@mui/material';
import TransactionChart from "./TransactionChart";

const UserChart = ({ useradd }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = `query ($network: EthereumNetwork!, $dateFormat: String!, $address: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
        ethereum(network: $network) {
          transfers(
            date: {since: $from, till: $till}
            amount: {gt: 0}
            options: {asc: "date.date"}
          ) {
            date {
              date(format: $dateFormat)
            }
            in_count: countBigInt(receiver: {is: $address})
            out_count: countBigInt(sender: {is: $address})
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

      const response = await fetch('https://graphql.bitquery.io', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'BQY6JYVGt1vYuCbeBfHquPIZ3YywKiIH',
          'Authorization': 'Bearer ory_at_VmLFsvemF2PU3VW7x9Xa7iqyj3-9ndANssG-aTupfn4.I79_PKs3DuVEpp9s_VwDZJH8cTLZ_j6djNbggYl3siY'
        },
        body: JSON.stringify({
          query: query,
          variables: variables
        })
      });

      const json = await response.json();
      setData(json.data.ethereum.transfers);
    };

    if (useradd) {
      fetchData();
    }
  }, [useradd]);

  const transformData = (rawData) => {
    return rawData.map(item => ({
      date: item.date.date,
      in_count: parseInt(item.in_count, 10),
      out_count: parseInt(item.out_count, 10),
    }));
  };

  return (
    useradd === "" ? null : (
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>In/Outbound transfer count by date</Typography>
        {data ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={transformData(data)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="in_count" fill="#8884d8" name="Receive Count" />
              <Bar dataKey="out_count" fill="#82ca9d" name="Send Count" />
            </BarChart>
            
          </ResponsiveContainer>
        ) : (
          <Typography>Loading...</Typography>
        )}

      </Paper>
    
    )
  );
};

export default UserChart;
