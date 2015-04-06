/**
 * File use to do Authentication
 * @Satish
 */


var Authentication = function(){

    this.authenticateUser = authenticateUser;

    function authenticateUser(params,callback){

        var userName = params.username;
        var password = params.password;

        if(username === "root" && password ==  "root"){
            return callback("success");
        }else{
            callback("failure")
        }
    }
};


module.exports = new Authentication();