
/**
 * Function use to make a ajax call to perform operations
 * @param request
 * @param callback
 */
function makeAjaxRequest(request,url,callback)
{
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            callback(xmlhttp.responseText);
            return;
        }
    }
    xmlhttp.open("POST",url,true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(request));
}

/**
 * Function use to make a ajax call to perform operations
 * @param request
 * @param callback
 */
function makeGetAjaxRequest(request,url,callback)
{
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            callback(xmlhttp.responseText);
            return;
        }else{
            callback(3002);
            return;
        }
    }
    xmlhttp.open("GET",url,true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send();
}

function initTable(data){

    var finalString = '<table border="0" width="100%" cellpadding="0" cellspacing="0" id="product-table">'+
    '<tr>'+
    '<th class="table-header-check"><a id="toggle-all" ></a> </th>'+
    '<th class="table-header-repeat line-left minwidth-1"><a href="">Category</a></th>'+
    '<th class="table-header-repeat line-left minwidth-1"><a href="">Brand</a></th>'+
    '<th class="table-header-repeat line-left"><a href="">Size</a></th>'+
    '<th class="table-header-repeat line-left"><a href="">Price</a></th>'+
    '<th class="table-header-repeat line-left"><a href="">Quantity</a></th>'+
        '<th class="table-header-repeat line-left"><a href="">Discount</a></th>'+
    '<th class="table-header-options line-left"><a href="">Description</a></th>'+
    '</tr>';

    //console.log("Lenght" + currntObj._id);
    for (var cnt =0 ; cnt < data.length; cnt++){

        var currntObj = data[cnt];
        var editUrl = "/public/template/editProduct.html?id="+ currntObj._id;

        var tablrString = '<tr id="row_'+ currntObj._id +'">' +
            '<td><input  type="checkbox"/></td>'+
        '<td>' + currntObj.category + '</td>'+
        '<td>' +currntObj.brand +'</td>'+
        '<td><a href="">'+currntObj.size+'</a></td>'+
        '<td>R' + currntObj.price + '</td>'+
        '<td><a href="">'+currntObj.quantity +'</a></td>'+
            '<td><a href="">'+currntObj.discount +'</a></td>'+
        '<td class="options-width">'+
        '<a href="'+editUrl+'" title="Edit" class="icon-1 info-tooltip"></a>'+
        '<a  onclick="deleteProduct(this)" id='+currntObj._id+' title="Edit" class="icon-2 info-tooltip"></a>'+
        '<a href="" title="Edit" class="icon-3 info-tooltip"></a>'+
        '<a onclick="insertCart(this)" id='+currntObj._id+' title="Edit" class="icon-4 info-tooltip"></a>'+
        '<a onclick="updateSoldProduct(this)" id='+currntObj._id+' title="Edit" class="icon-5 info-tooltip"></a>'+
        '</td>'+
        '</tr>';

        console.log("######### : " + currntObj._id);

        finalString = finalString + tablrString;

    }

    finalString = finalString + '</table>';

    document.getElementById('mainform').innerHTML = finalString;
}

function initBillingTable(data){

    var finalString = '<table border="0" width="100%" cellpadding="0" cellspacing="0" id="product-table">'+
        '<tr>'+
         '<th class="table-header-repeat line-left minwidth-1"><a href="">Item</a></th>'+
        '<th class="table-header-repeat line-left minwidth-1"><a href="">Price</a></th>'+
        '<th class="table-header-repeat line-left"><a href="">Discount</a></th>'+
        '<th class="table-header-repeat line-left"><a href="">Quantity</a></th>'+
        '<th class="table-header-repeat line-left"><a href="">Total</a></th>'+
        '<th class="table-header-options line-left"><a href="">Description</a></th>'+
        '</tr>';

    //console.log("Lenght" + currntObj._id);
    var cnt = 0;
    var final = 0
    for (cnt =0 ; cnt < data.length; cnt++){

        var currntObj = data[cnt];

        var original = parseInt(currntObj.price) * parseInt(currntObj.inCartQuantity);
        var discounted = original * (parseInt(currntObj.discount) /100);
        var total = original - discounted;
        final+=total;

        var tablrString = '<tr id="row_'+ currntObj._id +'">' +
            '<td>' + currntObj.category +", "+currntObj.brand + ", " +currntObj.size + '</td>'+
            '<td>R' + currntObj.price + '</td>'+
            '<td>'+currntObj.discount +'</td>'+
            '<td>'+ currntObj.inCartQuantity +'</td>'+
            '<td>'+ total +'</td>'+
            '<td class="options-width">'+
            '<a onClick="onPlusClick(this)" id='+currntObj._id+' title="Edit" class="icon-1 info-tooltip"></a>'+
            '<a  onclick="onMinusClick(this)" id='+currntObj._id+' title="Edit" class="icon-2 info-tooltip"></a>'+
            '<a  onclick="onDeleteClick(this)" id='+currntObj._id+' title="Edit" class="icon-2 info-tooltip"></a>'+
            '</td>'+
            '</tr>';

        finalString = finalString + tablrString;
    }

    if(cnt<5){

        while(cnt != 10) {
            var tablrString = '<tr>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>'
            '</tr>';
            finalString = finalString + tablrString;
            cnt++;
        }
    }

    var tablrString = '<tr id="totalRow">' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
        '<td>Total</td>' +
        '<td>'+final+'</td>'+
        '<td>'+
        '<input type="button" value="Save"  onclick="onSublmitClick()" value="" class="form-submit" />'+
        '<input type="reset" value="" onclick="clearAllFields()" class="form-reset"  /></td>'+
    '   </tr>';
    finalString = finalString + tablrString;


    finalString = finalString + '</table>';

    document.getElementById('mainform').innerHTML = finalString;
}


function getQuerystringNameValue(name)
{
    // For example... passing a name parameter of "name1" will return a value of "100", etc.
    // page.htm?name1=100&name2=101&name3=102

    var winURL = window.location.href;

    if(!winURL){
        return null;
    }
    var queryStringArray = winURL.split("?");

    if(!queryStringArray || !queryStringArray[1]){
        return null;
    }

    console.log(queryStringArray[1]);


    var queryStringParamArray = queryStringArray[1].split("&");
    var nameValue = null;

    for ( var i=0; i<queryStringParamArray.length; i++ )
    {
        var queryStringNameValueArray = queryStringParamArray[i].split("=");

        if ( name == queryStringNameValueArray[0] )
        {
            nameValue = queryStringNameValueArray[1];
        }
    }

    return nameValue;
}