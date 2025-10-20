const express = require('express');
let mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Luhur2004_',
    database: 'mahasiswa',
    port: 3308 
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:' + err.stack);
        return;
    }
    console.log('Connected to the MySQL database.');
});

//buat metode GET dan POST untuk menampilkan dan menambahkan data mahasiswa
app.get('/mahasiswa', (req, res) => {
    db.query('SELECT * FROM mahasiswa', (err, results) => {
        if (err) {
           console.error('Error fetching data:', err.stack);
            res.status(500).send('Error fetching data');
        } else {
            res.json(results);
        }       
    });
});

//menambahkan data mahasiswa
app.post('/mahasiswa', (req, res) => {
    const { nama, nim, kelas } = req.body;
    if (!nama || !nim || !kelas) {
        return res.status(400).json({ message : 'Wjib diisi semua'});
    }
    db.query('INSERT INTO mahasiswa (nama, nim, kelas) VALUES (?, ?, ?)', [nama, nim, kelas], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error inserting data' });
        } else {
            res.status(201).json({ message: 'Data inserted successfully'});
        }
    });
});

app.put('/mahasiswa/:id', (req, res) => {
    const  userId  = req.params.id;
    const { nama, nim, kelas } = req.body;
    db.query('UPDATE mahasiswa SET nama = ?, nim = ?, kelas = ? WHERE id = ?', [nama, nim, kelas, userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error updating data' });
        } else {
            res.json({ message: 'Data updated successfully' } );
        }
    });
});

app.delete('/mahasiswa/:id', (req, res) => {
    const  userId  = req.params.id;
    db.query('DELETE FROM mahasiswa WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error deleting data' });
        } else {
            res.json({ message: 'Data deleted successfully' });
        }
    });
});