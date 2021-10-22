import * as cluster from 'cluster';
import * as os from 'os';
import app from './index';

const numCPUs = os.cpus().length;
const port = 3002;

/**
 * 多进程，Node.js 中的多进程是 Master / Worker 机制
 * Master 进程负责管理 Worker 进程的创建与异常退出的重新启动
 * Worker 进程负责监听端口，处理业务
 * 注意 Session 不共享，所以业务中应当使用 json web token，或者 session 数据持久化进 redis
 */
if (cluster.isMaster) {
  // Fork启一个Worker 进程
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('listening', (worker, address) => {
    console.log(`worker ${worker.process.pid}, listen: ${address.address}:${address.port}`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `worker ${worker.process.pid} exited with code ${code}
      ${signal}`,
    );
    // 重启一个worker进程
    cluster.fork();
  });
} else {
  // Worker 进程之间可以共享任何形式的TCP连接
  // 也可以启动一个express的web服务
  // app.listen(app.get('port'));
  // Listen on provided port, on all network interfaces.
  app.listen(port);
  // app.on('error', onError);
  // app.on('listening', onListening);
}
