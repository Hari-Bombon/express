const express = require('express')
const router = express.Router();
const uuid =require('uuid')
const members = require('../../members');
//get all member
router.get('/' , (req,res) =>{
    res.send(members)
});
//get single member
router.get('/:id' ,(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    }else{
        res.status(400).json({ message: `Member id not found  ${req.params.id}`});
    }
});

//create member
router.post('/', (req,res) => {
   const newMember ={
        id: uuid.v4(),
        name : req.body.name,
        email:req.body.email,
        status:'active'
   }

   if(!newMember.name || !newMember.email){
    res.status(400).json({message: 'Please include name and email'});
   }
   members.push(newMember);
   res.json(members);
});

//update member
router.put('/:id' ,(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        const updateMember = req.body;
        members.forEach(member =>{
            if(member.id === parseInt(req.params.id)){
                member.name = updateMember.name ? updateMember.name:member.name;
                member.email = updateMember.email ? updateMember.email: member.email;

                res.json({message :'Member update', member});
            }
        });
    }else{
        res.status(400).json({ message: `Member id not found  ${req.params.id}`});
    }
});

//delete member
router.delete('/:id' ,(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json({message: "Member deleted",members :members.filter(member => member.id !== parseInt(req.params.id))})
    }else{
        res.status(400).json({ message: `No member id not found  ${req.params.id}`});
    }
});

module.exports = router;