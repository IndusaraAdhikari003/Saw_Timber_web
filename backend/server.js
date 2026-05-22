import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Saw Timba API running' }));

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await pool.query('SELECT id, name, email FROM admins WHERE email=? AND password=?', [email, password]);
  if (!rows.length) return res.status(401).json({ message: 'Invalid email or password' });
  res.json({ admin: rows[0] });
});

app.get('/api/products', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC');
  res.json(rows);
});

app.post('/api/products', async (req, res) => {
  const { name, category, price, image, description, stock, is_featured } = req.body;
  const [result] = await pool.query(
    'INSERT INTO products (name, category, price, image, description, stock, is_featured) VALUES (?,?,?,?,?,?,?)',
    [name, category, price, image, description, stock || 0, is_featured ? 1 : 0]
  );
  res.json({ id: result.insertId, message: 'Product added' });
});

app.put('/api/products/:id', async (req, res) => {
  const { name, category, price, image, description, stock, is_featured } = req.body;
  await pool.query(
    'UPDATE products SET name=?, category=?, price=?, image=?, description=?, stock=?, is_featured=? WHERE id=?',
    [name, category, price, image, description, stock || 0, is_featured ? 1 : 0, req.params.id]
  );
  res.json({ message: 'Product updated' });
});

app.delete('/api/products/:id', async (req, res) => {
  await pool.query('DELETE FROM products WHERE id=?', [req.params.id]);
  res.json({ message: 'Product deleted' });
});

app.get('/api/timber-prices', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM timber_prices ORDER BY id DESC');
  res.json(rows);
});

app.post('/api/timber-prices', async (req, res) => {
  const { wood_type, size, unit, price, availability } = req.body;
  const [result] = await pool.query(
    'INSERT INTO timber_prices (wood_type, size, unit, price, availability) VALUES (?,?,?,?,?)',
    [wood_type, size, unit, price, availability || 'Available']
  );
  res.json({ id: result.insertId, message: 'Timber price added' });
});

app.put('/api/timber-prices/:id', async (req, res) => {
  const { wood_type, size, unit, price, availability } = req.body;
  await pool.query(
    'UPDATE timber_prices SET wood_type=?, size=?, unit=?, price=?, availability=? WHERE id=?',
    [wood_type, size, unit, price, availability, req.params.id]
  );
  res.json({ message: 'Timber price updated' });
});

app.delete('/api/timber-prices/:id', async (req, res) => {
  await pool.query('DELETE FROM timber_prices WHERE id=?', [req.params.id]);
  res.json({ message: 'Timber price deleted' });
});

app.post('/api/orders', async (req, res) => {
  const { customer_name, phone, address, items, total } = req.body;
  const [result] = await pool.query(
    'INSERT INTO orders (customer_name, phone, address, items, total) VALUES (?,?,?,?,?)',
    [customer_name, phone, address, JSON.stringify(items), total]
  );
  res.json({ id: result.insertId, message: 'Order placed successfully' });
});

app.get('/api/orders', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM orders ORDER BY id DESC');
  res.json(rows);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
