var router=require('express').Router();
router.get('/', (req,res)=>{
    res.json({mensaje:'Todos los clientes'})
})