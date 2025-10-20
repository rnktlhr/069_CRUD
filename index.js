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
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Luhur2004_',
    database: 'mahasiswa',
    port: 3308
});

db.connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
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
    const query = 'INSERT INTO mahasiswa (nama, nim, kelas) VALUES (?, ?, ?)';
    db.query(query, [nama, nim, kelas], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Data Base Error' });
        } else {
            res.status(201).send('Data inserted successfully');
        }
    }); 
});
