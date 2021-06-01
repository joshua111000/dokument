const mongoose = require('mongoose')
const Document = require('./Document')

mongoose.connect("mongodb://localhost/dokument", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const io = require('socket.io')(3001,{
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

const defaultValue = ''

io.on('connection', socket => {
    socket.on('get-document', async documentId => {
        const document = findOrCreateDocument(documentId)
        socket.join(documentId)
        socket.emit('load-document', document.data)
    
    socket.on('send-changes', delta => {
        // broad cast a message to everyone except us that changes have been made
       socket.broadcast.to(documentId).emit('recieve-changes', delta)
        })
    socket.on('save-document', async data => {
        await Document.findByIdAndUpdate(documentId, {data})
    })
    })
})

const findOrCreateDocument = async (id) => {
    if(id == null) return

    const document = await Document.findById(id)
    if (document) return document

    return await Document.create({
        _id: id,
        data: defaultValue
    })
}
