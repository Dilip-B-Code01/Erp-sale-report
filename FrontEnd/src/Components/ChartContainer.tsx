import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

interface ChartDataItem {
    product_id: string;
    product_name: string;
    total_price: string; // Assuming this is a string; adjust if it's a number
    gross_sell: string;  // Assuming this is a string; adjust if it's a number
    total_qty: number;   // Total quantity as a number
    created_time: string; // The time when the data was created
}

interface SimpleLineChartProps {
    data: ChartDataItem[];
    chartData: ChartDataItem[];
}

const useStyles = makeStyles({
    customLegend: {
        display: "none"
    },
});

const SimpleLineChart: React.FC<SimpleLineChartProps> = ({ data, chartData }) => {
    const classes = useStyles();

    const [topSalesData, setTopSalesData] = useState<ChartDataItem[]>([]);
    const [totalPriceArray, setTotalPriceArray] = useState<number[][]>([]);
    const [uniqueTimes, setUniqueTimes] = useState<string[]>([]);

    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
            const sortedData = data.sort((a, b) => parseFloat(b.gross_sell) - parseFloat(a.gross_sell));
            const top5Data = sortedData.slice(0, 5);
            setTopSalesData(top5Data);
        }
    }, [data]);

    useEffect(() => {
        if (chartData) {
            const groupedData: ChartDataItem[][] = chartData.reduce((acc: ChartDataItem[][], curr: ChartDataItem) => {
                const existingItem = acc.find(item => item[0]?.product_id === curr.product_id);
                if (existingItem) {
                    existingItem.push(curr);
                } else {
                    acc.push([curr]);
                }
                return acc;
            }, []);

            const totalPriceArray: number[][] = groupedData.map(group => {
                const prices = group.map(item => parseFloat(item.total_price));
                prices.unshift(0);
                prices.push(0);
                return prices;
            });
            setTotalPriceArray(totalPriceArray);

            const uniqueTimesSet = new Set(chartData.map(item => new Date(item.created_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })));
            const uniqueTimesArray = Array.from(uniqueTimesSet);

            const sortedTimes = uniqueTimesArray.sort((a, b) => {
                const timeA = new Date(`1970/01/01 ${a}`);
                const timeB = new Date(`1970/01/01 ${b}`);
                return timeA.getTime() - timeB.getTime();
            });

            while (sortedTimes.length < 6) {
                if (sortedTimes.length < 5) {
                    sortedTimes.unshift('00:00');
                    sortedTimes.push('23:59');
                } else {
                    sortedTimes.unshift('00:00');
                }
            }
            setUniqueTimes(sortedTimes);
        }
    }, [chartData]);

    const renderLineChart = () => {
        const initialArray = [0, 10, 0, 10, 10, 0];
        if (topSalesData.length > 0) {
            const series = topSalesData.map((item, index) => {
                const label = `${item.product_name.substring(0, 10)} $${item.total_qty}`;
                return { data: totalPriceArray[index] || initialArray, label };
            });
            return (
                <div style={{ width: '100%' }}>
                    <LineChart
                        height={300}
                        series={series}
                        xAxis={[{ scaleType: 'point', data: uniqueTimes }]}
                    />
                    {/* Hide legend using CSS */}
                    <style>
                        {`
                            .MuiLineChart-legend {
                                display: none;
                            }
                        `}
                    </style>
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{ marginLeft: '300px' }}>
            <Typography variant="h5" gutterBottom style={{ textAlign: 'left', marginTop: '50px' }}>
                <b>Jan 2023 - Dec 2023</b>
            </Typography>
            <Typography variant="body2" gutterBottom style={{ textAlign: 'left', marginTop: '20px' }}>
                <b>Top 5 items gross sales</b>
            </Typography>
            {renderLineChart()}
        </div>
    );
};

export default SimpleLineChart;
