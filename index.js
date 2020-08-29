let express = require('express')
let app = express();
let http = require('http').createServer(app);
app.use(express.static('public')) // relative path of client-side code
let io = require('socket.io')(http)

app.get('/', (req, res) => {
  // res.send('<h1>Hello word</h1>');
  console.log('new request',
    'serving the file ' + __dirname + '/index.html'
  )

  app.get('/', (req, res) => {
    try {
      res.sendFile('index.html', { root: __dirname })
    } catch (e) {
      console.error(e)
      res.send('error!')
    }

  });
});

io.on('connection', socket => {
  console.log('a user connected')

  socket.on('chat message', msg => {
    console.log(`message: ${msg}`)
    io.emit('chat message', msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

let port = 4000
http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
