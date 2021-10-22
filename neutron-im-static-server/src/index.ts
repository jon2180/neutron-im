import Koa from 'koa';
import koaStatic from 'koa-static';
import mount from 'koa-mount';
import path from 'path';
import Router from '@koa/router';
import koaBody from 'koa-body';

const app = new Koa();

const router = new Router();

app.use(koaBody({
  // 支持文件格式
  multipart: true,
  formidable: {
    // 上传目录
    uploadDir: path.join(__dirname, './upload'),
    // 保留文件扩展名
    keepExtensions: true,
  },
}));

// app.use(mount('/upload', koaStatic(path.join(__dirname, '../upload'))));
// app.use(mount('/static', koaStatic(path.join(__dirname, '../static'))));
// app.use(mount('/upload', koaStatic('/www/wwwroot/assets/upload')));
// app.use(mount('/static', koaStatic('/www/wwwroot/assets/static')));
// app.use(mount('/avatar', koaStatic('/www/wwwroot/assets/avatar')));
// app.use(mount('/', koaStatic('/www/wwwroot/assets')));

const pathes = {
  dev: {
    upload: 'D:/Downloads/assets/upload',
    static: 'D:/Downloads/assets/static',
    avatar: 'D:/Downloads/assets/avatar',
  },
  prod: {
    upload: '/www/wwwroot/assets/upload',
    static: '/www/wwwroot/assets/static',
    avatar: '/www/wwwroot/assets/avatar',
  },
};

app.use(mount('/upload', koaStatic(pathes.dev.upload)));
app.use(mount('/static', koaStatic(pathes.dev.static)));
app.use(mount('/avatar', koaStatic(pathes.dev.avatar)));

// app.use(mount('/upload', koaStatic(pathes.prod.upload)));
// app.use(mount('/static', koaStatic(pathes.prod.static)));
// app.use(mount('/avatar', koaStatic(pathes.prod.avatar)));

router.get('/', (ctx) => {
  if (Math.random()) {
    console.log('');
  }
  ctx.body = 'hello world';
});

router.post('/upload-pic', (ctx) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
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
