import express from 'express';
import cors from 'cors';
import connectToDB from './config/db';
import userRoutes from './routes/userRoutes';

const app = express();
const port = 3005;

app.use(cors());
app.use(express.json());

connectToDB();

app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`User management app listening on port ${port}`);
});
