import React from 'react';
import { PieChart } from '@mui/x-charts';
import "./PopularBitcoin.css";

const PopularBitcoinbar = () => {
    return (
        <div className='PopularBitcoinbar'>
            <div className='PopularBitcoinbar1'>
                <h5>Popular-BitCoins</h5>
            </div>
            <div className='PopularBitcoinbar2'>


                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: 50, label: 'Bitcoin' },
                                { id: 1, value: 20, label: 'Ethereum' },
                                { id: 2, value: 8, label: 'Tether' },
                            ],
                            innerRadius: 50, // Makes it a donut chart
                            outerRadius: 100, // Controls the size of the outer radius
                            spacing: 5, // Adds some spacing between the segments
                        },
                    ]}
                    width={400}
                    height={400}
                />
            </div>
        </div>
    );
}

export default PopularBitcoinbar;
