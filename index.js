const express = require('express');
const path = require('path');
// const members = require('./Members');
const app  = express();
const logger = require('./public/middleware/logger')  ;
app.use(express.json());

// app.use(logger);



const PORT  = process.env.PORT || 5000;
// app.get('/', ( req , res )=>{
//     // res.send('<h1>Hello World!!</h1>');
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));

// })

// app.get('/api/members/:id' , (req , res) =>{

// const found  = members.some(member => member.id === parseInt(req.params.id))

// if(found){
//     res.json(members.filter(member=> member.id === parseInt(req.params.id)) )

// }
// else{
//     res.status(400).json({msg: `user not found with this Id ${req.params.id}`})
// }
// });

// app.get('/api/members/:id' , (req , res) =>{
//     res.json(members.filter(member=> member.id === parseInt(req.params.id)) )
// });

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/members' , require('./routes/api/members'))



// app.get('/api/members', ( req , res )=>{
//     res.json(members);
// })


app.listen(PORT , () => console.log(`the server listen on Port ${PORT}`));