const express = require('express');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');
const { importExcel, upload } = require('./utils/excelImport');

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.post('/api/import', upload.single('file'), importExcel);

sequelize.sync().then(() => console.log('Database connected'));

module.exports = app;
