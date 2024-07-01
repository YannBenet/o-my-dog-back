import 'dotenv/config';
import { createServer } from 'http';
import app from './app/index.app.js';

const httpServer = createServer(app);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server launched at http://localhost:${PORT}`);
});