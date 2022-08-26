const Koa = require('koa');

console.log('yo');
const app = new Koa();
app.use((ctx) => {
  ctx.body = '2';
});

app.listen(3000);
