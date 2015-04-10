var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoClient = require('./cloudCode/mongo/mongoClient');

// all environments
app.set('port', process.env.PORT || 3000);

//app.configure(function(){
    app.use('/css', express.static("./public/template/css/"));
    //server.use(express.static(__dirname + '/public'));
//});


//Server static files
app.use('/css', express.static("./public/template/css/"));
app.use('/js/jquery', express.static("./public/template/js/jquery/"));
app.use('/images/shared', express.static("./public/template/images/shared"));
app.use('/images/shared/nav', express.static("./public/template/images/shared/nav"));
app.use('/images/login', express.static("./public/template/images/login"));
app.use('/images/forms', express.static("./public/template/images/forms"));
app.use('/images/table', express.static("./public/template/images/table"));
app.use('/public/template', express.static("./public/template"));
app.use('/public/invoice/generator', express.static("./public/invoice/generator"));
app.use('/public/invoice', express.static("./public/invoice"));

app.use(bodyParser.json());



app.get('/', function(req, res) {
    res.sendfile('./public/template/login.html')
});

/**
 * App apis goes here
 */

app.post('/authenticate', function(req, res) {
    console.log("In app.js authenticate Action : ");

    mongoClient.authenticate(req.body,function(error,response){

        if(error){
            res.send("failure");
            return;
        }
        res.send("success");
    })
});


app.post('/insertProduct', function(req, res) {
    console.log(req.body);
    mongoClient.insertProduct(req.body,function(){
        res.sendStatus(200);
    })
});

app.post('/updateProduct/:id', function(req, res) {
    console.log(req.body);
    var id = req.params.id;
    mongoClient.updateProduct(req.body,id,function(){
        res.sendStatus(200);
    })
});

app.post('/getProducts', function(req, res) {
    console.log(req.body);
    mongoClient.getProducts(req.body,function(err,resp){
        res.send(JSON.stringify(resp));
    })
});


app.post('/getSortedProducts', function(req, res) {
    console.log(req.body);
    mongoClient.getSortedProducts(req.body,function(err,resp){
        res.send(JSON.stringify(resp));
    })
});

app.get('/getProductById/:id', function(req, res) {

    var id = req.params.id;
    mongoClient.getProductById(id,function(err,resp){
        res.send(JSON.stringify(resp));
    })
});

app.get('/deleteProduct/:id', function(req, res) {

    var id = req.params.id;
    console.log("In delete Product : " + id);
    mongoClient.deleteProduct(id,function(err,resp){
        res.send(JSON.stringify(resp));
    })
});

app.post('/clearCart/', function(req, res) {

    var body = req.body;
    console.log("In delete clearCart : ");
    mongoClient.clearCart(body,function(err,resp){
        res.send(JSON.stringify(resp));
    });
});

app.post('/updateSoldProduct/:id', function(req, res) {

    var id = req.params.id;
    var body = req.body;
    console.log("In delete Product : " + id);
    mongoClient.updateSoldProduct(body, id,function(err,resp){
        res.send(JSON.stringify(resp));
    })
});

//endpoint to update exsting product

app.post('/reduceQuantity/:id', function(req, res) {

    var id = req.params.id;
    var body = req.body;
    console.log("In delete Product : " + id);
    mongoClient.reduceQuantity(body, id,function(err,resp){
        res.send(JSON.stringify(resp));
    })
});




//####################### CART Collection ##############

app.get('/insertCart/:id', function(req, res) {

    var id = req.params.id;
    console.log("In insertCart Product : " + id);
    mongoClient.insertCart(id,function(err,resp){
        res.send(JSON.stringify(resp));
    })
});


app.post('/deleteFromCart/:id', function(req, res) {

    var id = req.params.id;
    var body = req.body;
    console.log("In deleteFromCart Product : " + id);
    mongoClient.deleteFromCart(body,id,function(err,resp){
        res.send(JSON.stringify(resp));
    })
});



app.get('/getAllProductIncart/', function(req, res) {

    console.log("In getAllProductIncart Product : ");
    mongoClient.getAllProductIncart(function(err,resp){
        res.send(JSON.stringify(resp));
    })
});


//BIlling APIS

app.post('/insertBill/', function(req, res) {


    var body = req.body;
    console.log("In insertBill Product : ");
    mongoClient.insertBill(body,function(err,resp){
        res.send(JSON.stringify(resp));
    })
});


app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

//Product Info

app.get('/getProductInfo/:name', function(req, res) {

    var name = req.params.name;
    mongoClient.getProductInfo(name,function(err,resp){
        res.send(JSON.stringify(resp));
    })
});


app.post('/insertSetup/:name', function(req, res) {

    var name = req.params.name;
    var body = req.body;
    mongoClient.insertSetup(body,name,function(err,resp){
        res.send(JSON.stringify(resp));
    })
});

app.post('/updateSetup/:name', function(req, res) {

    var name = req.params.name;
    var body = req.body;
    mongoClient.updateSetup(body,name,function(err,resp){
        res.send(JSON.stringify(resp));
    })
});


app.post('/deleteSetup/:name', function(req, res) {

    var name = req.params.name;
    var body = req.body;
    mongoClient.deleteSetup(body,name,function(err,resp){
        res.send(JSON.stringify(resp));
    })
});


