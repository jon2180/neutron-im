import app from '@/index';
import { createServer } from 'http';

const port = 3002;

const httpServer = createServer(app.callback());

httpServer.listen(port, 'localhost', () => {
  console.log(`Server running on port ${port}`);
});
