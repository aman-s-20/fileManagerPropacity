const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db  = require('./src/config/db');
app.use(bodyParser.json());
app.use(cors());



// Set up routes (authentication, folders, files)
app.use('/auth', require('./src/routes/authRoutes'));
app.use('/folders', require('./src/routes/folderRoutes'));
app.use('/files', require('./src/routes/fileRoutes'));

db
  .authenticate()
  .then(() => {
    console.log('Connection to the PostgreSQL database has been established successfully.');
    // Start the Express server after successful database connection
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the PostgreSQL database:', error);
  });