const express=require('express');
const app=express();
const path=require('path');
const ejsMate=require('ejs-mate');
const methodOverride = require('method-override');
const { resolveSoa } = require('dns');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("views"));
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.get('/',(req,res)=>{
    res.render('home');
});
app.get('/chatroom',(req,res)=>{
    res.render('home');
});
app.get('/chatroom/room',(req,res)=>{
    res.render('entertainment');
});
app.get('/chatroom/room/chat',(req,res)=>{
    res.render('firebase');
});
app.get('/chatroom/room/chat/:id',(req,res)=>{
    const {id}=req.params;
    console.log(id);
    res.render('firebase',{id});
});
app.get('/chatroom/contact',(req,res)=>{
    res.render("contact")
});
app.post('/chatroom/contact',(req,res)=>{
    res.send("thanks for reviewing us")
});
app.post("/chatroom",(req,res)=>{
    const {choice}=req.body;
    res.redirect(`/chatroom/room#${choice}`);
});
app.post('/chatroom/room/chat',(req,res)=>{
    const {custom}=req.body;
    res.redirect(`/chatroom/room/chat/${custom}`);
});
// app.all('*', (req, res, next) => {
//     next(new ExpressError('Page Not Found', 404))
// })
// app.use((err, req, res, next) => {
//     const { statusCode = 500 } = err;
//     if (!err.message) err.message = 'Oh No, Something Went Wrong!'
//     res.status(statusCode).render('error', { err })
// })
app.listen(process.env.PORT || 3000,()=>{
    console.log('Listening to port 3000');
})