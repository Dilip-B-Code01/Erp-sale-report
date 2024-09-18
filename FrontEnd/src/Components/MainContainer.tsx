import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Filter from "./Filter";
import ChartContainer from "./ChartContainer";
import TableContainer from "./TableContainer";
import { endPoints } from "../utils/endpoint";

// Define your Item interface
interface Item {
  product_id: string;
  product_name: string;
  total_qty: string; 
  gross_sell: string; 
  created_time: string;
}

// Define your ChartDataItem interface
interface ChartDataItem {
  product_id: string;
  product_name: string;
  total_price: string; 
  gross_sell: string; 
  total_qty: number; 
  created_time: string;
}

export default function MainContainer() {
  const [data, setData] = useState<any>([]);
  const [totalItemSold, setTotalItemSold] = useState<number>(0);
  const [totalGrossSales, setTotalGrossSales] = useState<number>(0);
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        
        const [itemResponse, chartResponse] = await Promise.all([
          fetch(endPoints.getItems),
          fetch(endPoints.getItemsChart),
        ]);

        if (!itemResponse.ok)
          throw new Error("Network response was not ok for items");
        if (!chartResponse.ok)
          throw new Error("Network response was not ok for chart");

        const jsonData: Item[] = await itemResponse.json();
        const chartData: ChartDataItem[] = await chartResponse.json();

        // Process data for totals
        let totalQty = 0;
        let totalSalesPrice = 0;

        jsonData.forEach((element) => {
          const qty = parseInt(element.total_qty);
          const sales = parseInt(element.gross_sell);

          if (!isNaN(qty)) totalQty += qty;
          if (!isNaN(sales)) totalSalesPrice += sales;
        });

        // Update state
        setData(jsonData);
        setTotalGrossSales(totalSalesPrice);
        setTotalItemSold(totalQty);
        setChartData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Sidebar />
      <Filter />
      <div className="hg-wrap">
        <ChartContainer data={data} chartData={chartData} />
        <TableContainer
          data={data}
          totalItemSold={totalItemSold}
          totalGrossSales={totalGrossSales}
          loading={loading}
        />
      </div>
    </div>
  );
}
