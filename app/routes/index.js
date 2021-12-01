var router= require('express').Router();
var producto=require('./producto');
var factura=require('./factura');
router.use('/producto',producto);
router.use('/factura',factura);
router.get('/',(req,res)=>{
    res.json({mensaje:'bienvenido a mi API'})
});

module.exports=router;