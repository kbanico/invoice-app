function update_subtotal(){
  var subtotal = 0;
  $(".price").each(function(i){
    var price = $(this).html();
    // check if not a number
    if(!isNaN(price)){
      subtotal += Number(price);
    }
  });



  // Round the value of the subtotal
  subtotal = subtotal.toFixed(2);
  $("#subtotal").html(subtotal)
  update_balance();
}

// subtotal with tax
// we use val if we are getting from an input
function update_balance(){
  var total = Number($("#subtotal").html()) + Number($("#9").val())
  total = total.toFixed(2);
  $(".due").html(total)
}

function update_price(){
  var row = $(this).parents(".item-row");
  var price = row.find(".cost").val() * row.find(".qty").val();
  price = price.toFixed(2);
  isNaN(price) ? row.find(".price").html("Not a number") : row.find(".price").html(price);
  update_subtotal();
}


function bind1(){
  $('.cost').blur(update_price);
  $('.qty').blur(update_price);
}


