import Koa from 'koa';
import koaStatic from 'koa-static';
import mount from 'koa-mount';
import Router from '@koa/router';
import koaBody from 'koa-body';
import appPath from './config/paths';

console.log(appPath);

const app = new Koa();

const router = new Router();

app.use(koaBody({
  // 支持文件格式
  multipart: true,
  formidable: {
    // 上传目录
    uploadDir: appPath.dirUpload,
    // 保留文件扩展名
    keepExtensions: true,
  },
}));

app.use(mount('/upload', koaStatic(appPath.dirUpload)));
app.use(mount('/static', koaStatic(appPath.dirStatic)));

router.get('/', (ctx) => {
  ctx.body = 'hello world';
});

router.post('/upload-pic', (ctx) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
  );
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (!ctx.request.files) {
    ctx.body = {
      code: 4000,
      message: 'nothing',
    };
    return;
  }

  const { file } = ctx.request.files;
  if (!file) {
    ctx.body = {
      code: 4000,
      message: 'nothing',
    };
    return;
  }
  let paths: string[] = [];
  if (Array.isArray(file)) {
    paths = file.map((value) => value.path);
  } else {
    paths = [file.path];
  }

  ctx.body = { path: paths };
});

app.use(router.routes()).use(router.allowedMethods());

export default app;
