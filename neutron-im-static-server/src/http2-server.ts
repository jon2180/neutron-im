import { createSecureServer } from 'http2';
import { readFileSync } from 'fs';

import app from '@/index';
import { pathCert, pathKey } from './config/paths';

const port = 3002;

createSecureServer({
  key: readFileSync(pathKey),
  cert: readFileSync(pathCert),
}, app.callback()).listen(port, 'wuog.top', () => {
  console.log(`Server running on port ${port}`);
});

// 生成 ssl
// openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost'
// -keyout localhost-privkey.pem -out localhost-cert.pem

// port, 'localhost', () => {
//   console.log(`Server running on port ${port}`);
// }

// createSecureServer({
//   key: readFileSync(pathKey),
//   cert: readFileSync(pathCert),
// }, app.callback()).listen(port, 'localhost', () => {
//   console.log(`Server running on port ${port}`);
// });
// const server = app.listen(port, 'localhost', () => {
//   console.log(`Server running on port ${port}`);
// });

// ServerOptions
// const nsp = new Namespace(server, 'test');
// new Socket(new Namespace(serv, 'test'),);

// openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost'
// -keyout localhost-privkey.pem -out localhost-cert.pem
