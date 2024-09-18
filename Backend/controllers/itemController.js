const pool = require('../database/db');

exports.getItemSales = async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT 
        p.product_name AS product_name,
        pv.product_id,
        pv.prod_var_name,
        pv.sku,
        pv.cost_price,
        pv.sale_price,
        pv.gtin,
        p.category_id,
        soi.total_qty,
        dd.id,
        dd.label,
        dd.data_type,
        soi.total_qty * pv.sale_price AS gross_sell
    FROM 
        osgs.product p
    JOIN 
        osgs.product_variation pv ON p.id = pv.product_id
    LEFT JOIN 
        (
            SELECT 
                prod_var_id,
                SUM(qty) AS total_qty
            FROM 
                osgs.sale_order_item
            GROUP BY 
                prod_var_id
        ) soi ON pv.product_id = soi.prod_var_id
    LEFT JOIN 
        (
            SELECT 
                id,
                label,
                data_type
            FROM 
                osgs.data_dictionaries
        ) dd ON p.category_id = dd.id
    WHERE
        p.category_id = dd.id
    ORDER BY 
        p.product_name`);
        const data = result.rows;
        await client.release();

        res.send(data);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
};
exports.getChartData = async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT 
        product_id,
        qty,
        price_per_unit,
        qty * price_per_unit AS total_price,
        created_time
    FROM 
        osgs.sta_item_sale;
    `);
        const data = result.rows;
        await client.release();

        res.send(data);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
};
