import path from 'path';

const cwd = process.cwd();

export const pathKey = path.join(cwd, 'config/localhost-privkey.pem');
export const pathCert = path.join(cwd, 'config/localhost-cert.pem');

export default {
    dirRoot: cwd,
    dirSrc: path.resolve(cwd, 'src'),
    dirStatic: path.resolve(cwd, 'static'),
    dirUpload: path.resolve(cwd, 'upload')
};
