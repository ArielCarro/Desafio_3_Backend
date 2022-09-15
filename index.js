const express= require('express')
const app=express()
const Container= require('./container')
const PORT=8080

const products = new Container('./products.txt')


app.get('/',(req,res)=>{
    res.send('Bienvenido al Desafio 3')
})

app.get('/randomProduct',(req,res)=>{
    products.getRandom().then((prods)=>{
        res.json(prods);
    })
})

app.get('/products',(req,res)=>{
products.getAll().then((prods)=>{
        res.json(prods);
    })
})
app.listen(PORT, ()=>console.log(`El servidor esta escuchando el puerto ${PORT}`))