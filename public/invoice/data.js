/**
 * Data and settings for the company
 *
 * How to properly enter your data:
 * Be sure when entering your information to enclose that data with double quotes. When entering numbers they
 * don't need to be enclosed with quotes, in general the sample data below should be used as general guide on
 * how to properly enter your data. And if you have double (or single) quotes in your data (like My "Awesome" Company)
 * than you should use something we call escaping special characters with the backslash sign (\) so the final
 * company name will be "My \"Awesome\" Company".
 */

var ib_invoice_data = {
  "{company_logo}"          : "data:image/png;base64,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", // base64 encoded data URI of PNG image
  "{company_name}"          : "WOW",
  "{company_address}"       : "Vasant Vihar Road, Sudke Mala, Ahmednagar, Maharashtra",
  "{company_city_zip_state}": "414001",
  "{company_phone_fax}"     : "+91-9822286898",
  "{company_email_web}"     : "wow@gmail.com",
  "{payment_info1}"         : "Payment details:",
  "{payment_info2}"         : "",
  "{payment_info3}"         : "",
  "{payment_info4}"         : "",
  "{payment_info5}"         : "",
  "{issue_date_label}"      : "Issue Date:",
  "{issue_date}"            : "",
  "{net_term_label}"        : "Net:",
  "{net_term}"              : "",
  "{due_date_label}"        : "Due Date:",
  "{due_date}"              : "",
  "{currency_label}"        : "Currency:",
  "{currency}"              : "INR",
  "{po_number_label}"       : "P.O. #",
  "{po_number}"             : "",
  "{bill_to_label}"         : "Bill to:",
  "{client_name}"           : "",
  "{client_address}"        : "",
  "{client_city_zip_state}" : "",
  "{client_phone_fax}"      : "",
  "{client_email}"          : "",
  "{client_other}"          : "",
  "{invoice_title}"         : "INVOICE",
  "{invoice_number}"        : "#1",
  "{item_row_number_label}" : "",
  "{item_description_label}": "Item",
  "{item_quantity_label}"   : "Quantity",
  "{item_price_label}"      : "Price",
  "{item_discount_label}"   : "Discount",
  "{item_tax_label}"        : "Tax",
  "{item_line_total_label}" : "Linetotal",
  "{item_row_number}"       : "",
  "{item_description}"      : "",
  "{item_quantity}"         : "",
  "{item_price}"            : "",
  "{item_discount}"         : "",
  "{item_tax}"              : "",
  "{item_line_total}"       : "",
  "{amount_subtotal_label}" : "Subtotal:",
  "{amount_subtotal}"       : "",
  "{tax_name}"              : "Tax:",
  "{tax_value}"             : "",
  "{amount_total_label}"    : "Total:",
  "{amount_total}"          : "",
  "{amount_paid_label}"     : "Paid:",
  "{amount_due_label}"      : "Amount Due:",
  "{amount_due}"            : "",
  "{terms_label}"           : "Terms & Notes",
  "{terms}"                 : "Thank you very much. We really appreciate your business.<br />Damaged Items can not replaced or exchanged.",

  // Settings
  "date_format"             : "mm/dd/yyyy", // One of dd/mm/yyyy, dd-mm-yyyy, mm/dd/yyyy, mm-dd-yyyy
  "currency_position"       : "left", // One of left or right
  "default_columns"         : ["item_row_number", "item_description", "item_quantity", "item_price", "item_discount", "item_tax", "item_line_total"],
  "default_quantity"        : "1",
  "default_price"           : "0",
  "default_discount"        : "0",
  "default_tax"             : "0",
  "default_number_rows"     : 3,
  "auto_calculate_dates"    : true,
  "load_items"              : true,
  "invoicebus_fineprint"    : true


};
test((function(resp){
  ib_invoice_data.items = resp;
}))


function test(callback){

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


      var data = JSON.parse(xmlhttp.responseText);

      console.log(data);
      var final = []
      for (var cnt =0 ; cnt < data.length; cnt++) {

        var currntObj = data[cnt];
        var newObj = {};

        newObj.item_description = currntObj.category +", "+currntObj.brand + ", " +currntObj.size;
        newObj.item_quantity = currntObj.inCartQuantity;
        newObj.item_price = currntObj.price;
        newObj.item_discount = currntObj.discount +"%";
        newObj.item_tax = "0%"
        final.push(newObj);
      }
      console.log(final);
      //return final;
      callback(final);
    }else{
      //callback(3002);
      return;
    }
  }
  xmlhttp.open("GET","http://localhost:3000/getAllProductIncart",true);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send();

};