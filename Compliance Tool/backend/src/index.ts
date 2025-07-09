import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import scanRoutes from './routes/scan';
import reportRoutes from './routes/report';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/scan', scanRoutes);
app.use('/generate-report', reportRoutes);

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 4000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
  });
}

export default app; 