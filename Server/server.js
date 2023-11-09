const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./Utils/config')
const utils = require('./Utils/utils')
const constants = require('./Utils/constants')
const jwt = require('jsonwebtoken')

const userRouter = require('./routes/users');
const quoteRouter = require('./routes/quotes')

const app = express();

app.use(cors('*'));
app.use(morgan('combined'))
app.use(express.static('uploads'))
app.use(express.json())

// user validation by middleware
app.use((request,response,next)=>{
    if(request.url == '/user/register' || request.url == '/user/login'){
        next();
    }else{
        const token = request.headers['token']
        console.log("token "+token)

        if(token == null){
            response.send(utils.createResult('missing token'))
            return
        }
        try{
            const payload = jwt.decode(token,config.secret)

            request.payload = payload
            next()
        }catch(ex){
            response.send("wrong token")
        }
    }
})


// importing routes


//specifing the routes as per  the request
app.use('/user',userRouter)
app.use('/quote',quoteRouter)



app.listen(constants.PORT,'0.0.0.0',()=>{
    console.log("Server started on PORT NO - "+ constants.PORT);
})