import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dataRouter from './routers/Roters.js'; 

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(dataRouter); 

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
