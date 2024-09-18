import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Loader from './Loader'; 

interface Item {
    product_name: string;
    gtin: string;
    sku: string;
    data_type: string;
    gross_sell: string;
    id: string;
    total_qty: number;
    prod_var_name?: string;
    label?: string;
}

interface BasicTableProps {
    data: Item[];
    totalItemSold: number;
    totalGrossSales: number;
    loading: boolean; // Add loading prop
}

const BasicTable: React.FC<BasicTableProps> = ({ data, totalItemSold, totalGrossSales, loading }) => {
    return (
        <TableContainer component={Paper} sx={{ width: '80%', marginLeft: '250px', minHeight: '400px' }}> 
            {loading ? (
               <div >
                 <Loader />
               </div>
            ) : (
                <Table sx={{ minWidth: 650, borderTop: '1px solid rgba(224, 224, 224, 1)' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table-cell"><b>Item</b></TableCell>
                            <TableCell align="right"><b>GTIN</b></TableCell>
                            <TableCell align="right"><b>SKU</b></TableCell>
                            <TableCell align="right"><b>Category</b></TableCell>
                            <TableCell align="right"><b>Gross Sales</b></TableCell>
                            <TableCell align="right"><b>Discount</b></TableCell>
                            <TableCell align="right"><b>Items Sold</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <React.Fragment key={row.product_name}>
                                <TableRow>
                                    <TableCell component="th" scope="row" className="table-cell">
                                        {row.product_name}
                                    </TableCell>
                                    <TableCell align="right">{row.gtin}</TableCell>
                                    <TableCell align="right">{row.sku}</TableCell>
                                    <TableCell align="right">{row.data_type}</TableCell>
                                    <TableCell align="right">{row.gross_sell}</TableCell>
                                    <TableCell align="right">{row.id}</TableCell>
                                    <TableCell align="right">${row.total_qty}</TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                        <TableRow>
                            <TableCell className="table-cell"><b>Total</b></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">{totalGrossSales}</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">{totalItemSold}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    );
};

export default BasicTable;
