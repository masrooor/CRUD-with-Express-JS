// const { application } = require('express');
const express = require('express');
// const app = express();
const router = express.Router();
const members = require('../../Members');


// app.use( express.json );


// app.get('/', ( req , res )=>{
//     // res.send('<h1>Hello World!!</h1>');
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));

// })
// console.log(members);
// Get single member
    router.get('/:id' , (req , res) =>{

        const found  = members.some(member => member.id === parseInt(req.params.id))
        
        if(found){
            res.json(members.filter(member=> member.id === parseInt(req.params.id)) )
        
        }
        else{
            res.status(400).json({msg: `user not found with this Id ${req.params.id}`})
        }
    });
    
    // app.get('/api/members/:id' , (req , res) =>{
    //     res.json(members.filter(member=> member.id === parseInt(req.params.id)) )
    // });
    
    // app.use(express.static(path.join(__dirname, 'public')))
    // Get all members
    router.get('/', ( req , res )=>{
        res.json(members);
    });
    router.post('/' ,  (req , res)=>{
        const newMember = {
            id: members.length + 1,
            name: req.body.name,
            email: req.body.email,
            status: 'active'

        }
        if(!newMember.name || !newMember.email){
        
        return res.status(400).json({ msg: 'Please insert name and email'});
        }
       
            members.push(newMember);
            res.json(members);
    
    })
    // Update Member

    router.put('/:id' , (req , res) =>{

        const found  = members.some(member => member.id === parseInt(req.params.id))
        
        if(found){
            const updMember = req.body;
            members.forEach(member => {
                if(member.id === parseInt(req.params.id)){
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;
                res.json({msg: 'Member Updated', members});

                }
            })
        
        
            }
            else{
            res.status(400).json({msg: `user not found with this Id ${req.params.id}`})
        }
    
    });

    // Delete Member
    router.delete('/:id' , (req , res) =>{

        const found  = members.some(member => member.id === parseInt(req.params.id))
        
        if(found){
            const updMember = req.body;
            members.forEach(member => {
                // if(member.id === parseInt(req.params.id)){
                // member.name = updMember.name ? updMember.name : member.name;
                // member.email = updMember.email ? updMember.email : member.email;
                res.json({msg: "Member Deleted" , members: members.filter(member=> member.id !== parseInt(req.params.id)) })

                // res.json( { msg : 'Member Deleted', members } );

                // }
            })
        
        
            }
            else{
            res.status(400).json({msg: `user not found with this Id ${req.params.id}`})
        }
    
    });
    module.exports = router;