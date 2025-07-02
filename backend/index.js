const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({   //db creds call
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get('/health', (req, res) => res.send('OK'));

app.get('/messages', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/messages', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Missing 'text' in request body" });

  try {
    const { rows } = await pool.query(
      'INSERT INTO messages (text) VALUES ($1) RETURNING *',
      [text]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error inserting message:", error);
    res.status(500).json({ error: 'Database error' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`API server running on port ${port}`));
