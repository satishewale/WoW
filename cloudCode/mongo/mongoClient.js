var mongo = require('mongodb');

var MongoClient = mongo.MongoClient;

var myCollection;
var userCollection;
var cartCollection;
var billingCollection;
var productInfoCollection;
var ObjectID = mongo.ObjectID;

var initMongoClient = function(){

    db = MongoClient.connect('mongodb://127.0.0.1:27017/shop', function(err, db) {
        if(err){
            console.log("Erroe while creareting connection" + JSON.stringify(err));
            return
        }

        console.log("connected to the mongoDB !");
        myCollection = db.collection('products');
        userCollection = db.collection('users');
        cartCollection = db.collection('cart');
        billingCollection = db.collection('bills');
        productInfoCollection = db.collection('setup');
    });
};

initMongoClient.prototype.insertProduct = function(requestBody,callback){
    console.log("mongoClient.js >> Came into insertProduct");

    myCollection.insert(requestBody,function(error,result){

        if(error){
            callback("error occured")
            return;
        }

        callback(null,result);

    });
}

initMongoClient.prototype.updateProduct = function(requestBody,id,callback){
    console.log("mongoClient.js >> Came into updateProduct");
    var queryObj = {_id: ObjectID(id)};

    myCollection.update(queryObj,{$set: requestBody},function(error,result){

        if(error){
            callback("error occured")
            return;
        }

        callback(null,result);

    });
}

initMongoClient.prototype.getProducts = function(requestBody,callback){

    console.log("mongoClient.js >> Came into getProducts");
    console.log(requestBody);

    myCollection.find(requestBody).toArray(function(err,items){
        if(err){
            callback("error occured" + JSON.stringify(err));
            return;
        }
        //console.log(items);
        callback(null,items);
    });
}

initMongoClient.prototype.getSortedProducts = function(requestBody,callback){

    console.log("mongoClient.js >> Came into getSortedProducts");
    console.log(JSON.stringify(requestBody));

    myCollection.find(requestBody.category).sort(requestBody.sortCriteria).toArray(function(err,items){
        if(err){
            callback("error occured" + JSON.stringify(err));
            return;
        }
        //console.log(items);
        callback(null,items);
    });
}

initMongoClient.prototype.getProductById = function(id,callback){
    console.log("mongoClient.js >> Came into getProductById");

    var queryObj = {_id: ObjectID(id)};

    myCollection.findOne(queryObj,function(err,items){
        if(err){
            callback("error occured" + JSON.stringify(err));
            return;
        }
        //console.log(items);
        callback(null,items);
    });
}

initMongoClient.prototype.deleteProduct = function(id,callback){
    console.log("mongoClient.js >> Came into deleteProduct");

    var queryObj = {_id: ObjectID(id)};

    myCollection.remove(queryObj,function(err,items){
        if(err){
            callback("error occured" + JSON.stringify(err));
            return;
        }
        //console.log(items);
        callback(null,items);
    });
}

initMongoClient.prototype.updateSoldProduct = function(body, id,callback){
    console.log("mongoClient.js >> Came into updateSoldProduct");
    console.log(body);

    var queryObj = {_id: ObjectID(id)};

    myCollection.update(queryObj,{$set : body},function(err,items){
        if(err){
            callback("error occured" + JSON.stringify(err));
            return;
        }
        //console.log(items);
        callback(null,items);
    });
}

//Update the quantity
initMongoClient.prototype.reduceQuantity = function(body, id,callback){
    console.log("mongoClient.js >> Came into reduceQuantity");
    console.log(body);

    var queryObj = {_id: ObjectID(id)};

    myCollection.update(queryObj,{$set : body},function(err,items){
        if(err){
            callback("error occured" + JSON.stringify(err));
            return;
        }
        //console.log(items);
        callback(null,items);
    });
}


initMongoClient.prototype.authenticate = function(request,callback){
    console.log("mongoClient.js >> Came into authenticate");

    var queryObj = {"username" :request.username ,"password" : request.password};

    console.log(queryObj);

    userCollection.findOne(queryObj,function(err,items){

        if(err || !items){
            callback("error occured" + JSON.stringify(err));
            return;
        }
        console.log(items);
        callback(null,items);

    });
}

//insert into cart
initMongoClient.prototype.insertCart = function(id,callback){
    console.log("mongoClient.js >> Came into insertCart");

    cartCollection.findOne({"productId" : id},function(error,result){

        if(error){
            callback("error occured")
            return;
        }

        if(result){

            console.log(result);

            var quantity = result.quantity;
            quantity++;
            var queryObj = {_id: result._id};
            cartCollection.update(queryObj,{$set : {"quantity" : quantity}},function(err,items){
                if(err){
                    callback("error occured" + JSON.stringify(err));
                    return;
                }
                //console.log(items);
                callback(null,items);
            });
        }else{
            cartCollection.insert({"productId" : id, "quantity" : 1},function(error,result){

                if(error){
                    callback("error occured")
                    return;
                }

                callback(null,result);
            });
        }
    });
}

//insert into cart
initMongoClient.prototype.deleteFromCart = function(body,id,callback){
    console.log("mongoClient.js >> Came into deleteFromCart");

    var queryObj = {"productId" : id};
    cartCollection.update(queryObj,{$set : body},function(err,items){
        if(err){
            callback("error occured" + JSON.stringify(err));
            return;
        }
        //console.log(items);
        callback(null,items);
    });
}


initMongoClient.prototype.getAllProductIncart = function(callback){
    console.log("mongoClient.js >> Came into insertCart");

    cartCollection.find().toArray(function(err,response){

        if(err){
            callback("error occured")
            return;
        }

        if(response && response.length == 0){
            callback("Nothing in cart")
            return;
        }

        var arr= [];
        for(var cnt = 0 ; cnt < response.length; cnt++){
            arr.push(ObjectID(response[cnt].productId));
        };

        console.log("arr",arr);


        myCollection.find({_id: {$in: arr}}).toArray(function(err,resp){

            if(err){
                callback("error occured")
                return;
            }

            console.log("Response : " + JSON.stringify(resp));

            for(var cnt = 0; cnt < response.length; cnt ++) {

                var cartObj = response[cnt];
                for (var i = 0; i < resp.length; i++) {
                    var prodObj = resp[i];

                    if(prodObj._id == cartObj.productId){
                        prodObj.inCartQuantity = cartObj.quantity;
                        //prodObj.quantity = cartObj.quantity;
                        break;
                    }
                }
            }
            callback(null,resp);

        })
    });
}


/**
 * Function to clear Bag Collection After login
 * @type {initMongoClient}
 */

function clearCart(body,callback){

    cartCollection.find(body).toArray(function(err,response){

        if(err){
            callback("error occured")
            return;
        }

        if(response && response.length == 0){
            callback("Nothing in cart")
            return;
        }

        var arr= [];
        for(var cnt = 0 ; cnt < response.length; cnt++){

            console.log("response : " + JSON.stringify(response[cnt]));

            var thisObj = response[cnt];
            var quantity = thisObj.quantity;

            var firestQuery = {_id: ObjectID(thisObj.productId)};

            console.log("firestQuery : " + JSON.stringify(firestQuery));

            myCollection.findOne(firestQuery,function(error,result) {

                if (error) {
                    //callback("error occured")
                    return;
                }

                myCollection.update({_id: ObjectID(thisObj.productId)},{$set : {"quantity" : result.quantity + quantity}},function(err,resp){

                    if(err){
                        //callback("error occured")
                        return;
                    }

                    console.log("Response : " + JSON.stringify(resp));
                    //callback(null,resp);
                })
            });

        };

        cartCollection.remove(body, function (err, noOfRecordsDeleted) {

            console.log("came into condtion : "  + err);
            callback(err, noOfRecordsDeleted);
        });
    });
}
initMongoClient.prototype.clearCart = clearCart;


//Billing related WORK
initMongoClient.prototype.insertBill = function(requestBody,callback){
    console.log("mongoClient.js >> Came into insertBill");

    billingCollection.insert(requestBody,function(error,result){

        if(error){
            callback("error occured")
            return;
        }

        callback(null,result);

    });
}


//
//Product Info


function getProductInfoSep(name,callback){
    console.log("mongoClient.js >> Came into getProductInfo");

    productInfoCollection.find(name == "all" ? {}:{"name" : name}).toArray(function(err,response) {

        if (err) {
            callback("error occured")
            return;
        }

        //console.log(response);

        callback(null,response);
        return;
    });
}

initMongoClient.prototype.getProductInfo = getProductInfoSep;

initMongoClient.prototype.insertSetup = function(body,name,callback){
    console.log("mongoClient.js >> Came into insertSetup : " + name);

    productInfoCollection.findOne({"name" : name,"value" : body.value},function(error,result) {

        if (error) {
            //callback("error occured")
            getProductInfoSep(name,callback);
        }

        if(!result){
            productInfoCollection.insert({"name" : name,"value" : body.value},function(error,result){

                if(error){
                    callback("error occured")
                    return;
                }


                getProductInfoSep(name,callback);
            });
        }else{
            getProductInfoSep(name,callback);
        }

    });
}


initMongoClient.prototype.updateSetup = function(body,name,callback){
    console.log("mongoClient.js >> Came into updateSetup");


    productInfoCollection.update({"name" : name,"value" : body.oldValue},{$set : {"value" : body.value}},function(err,resp){

            if(err){
                //callback("error occured")
                return;
            }

            console.log("Response : " + JSON.stringify(resp));

            getProductInfoSep(name,callback);
            return;
            //callback(null,resp);
        })

        //console.log(response);

}

initMongoClient.prototype.deleteSetup = function(body,name,callback){
    console.log("mongoClient.js >> Came into deleteSetup : " + name);


    productInfoCollection.remove({"name" : name,"value" : body.value},function(error,result){

        if(error){
            callback("error occured")
            return;
        }


        getProductInfoSep(name,callback);
    });
}
module.exports = new initMongoClient();