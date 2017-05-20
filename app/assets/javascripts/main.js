$(document).ready(function(){
  // we don't really need this
  $("input").click(function(){
    $(this).select();
  });




  $(".datepicker").datepicker({
    format: "yyyy-mm-dd"
  });

  // append date after clicking on calendar
  $("#invoice_date").datepicker().on("changeDate",function(){
    var date = $(this).val()
    $(".invoice_header_date").empty()
    $(".invoice_header_date").append(date)
  })

  // update the subtotal + tax
  $("#9").blur(update_balance)

  $("#addrow").click(function(){
    $(".item-row:last").after('<tr class="item-row"><td><input class="form-control item_name" placeholder="Item name" /></td><td><input class="form-control item_desc" placeholder="Item Description"/></td><td><input class="form-control cost" value="0.00" /></td><td><input class="form-control qty" value="0" /></td><td class="price_td"><span class="price">0.00</span><span class="subtotal_currency"></span></td><td class="delete_td"><a class="delete" href="javascript:;" title="Remove row"><span class="ti-close"></span></a></td></tr>');
    if($(".delete").length > 0) {
      $(".delete").show();
    }
    bind1();
  });

  bind1();

   $("body").on("click",".delete",function(){
      $(this).parents(".item-row").remove();
      update_subtotal();
      if($(".delete").length < 2) {
        $(".delete").hide();
      }
    });

   // the currency
   $("body").on("keyup","#invoice_currency",function(){
      var c = $(this).val();
      $(".subtotal_currency").empty();
      $(".subtotal_currency").append(" " + c);
   });

   $("body").on("click", "#submit_invoice",function(){
      // we use text because its not an input
      var amount = $("#invoice_total").text();
      $("#invoice_total1").empty();
      $("#invoice_total1").val(Number(amount));
   })

   $("body").on("click", "#invoice_button",function(){
      // PRINTING
      for(var i = 1; i < 11; i++){
        var id = i.toString();
        bind($("#"+id),$("#modal_" + id));
      }

      // // INVOICE NUMBER
      // var n = $("#invoice_number").text();
      // $("#modal_invoice_number").empty();
      // $("#modal_invoice_number").append(n);
      bind2($("#invoice_number"), $("#modal_invoice_number"))

      // // SUBTOTAL
      // var subtotal = $("#subtotal").text();
      // $("#modal_subtotal").empty();
      // $("#modal_subtotal").append(" " + subtotal);
      bind2($("#subtotal"), $("#modal_subtotal"))

      // gets all the row from the form
      var rows = $(".item-row");
      $("#modal_tbody").empty();

      for(i = 0; i < rows.length; i ++){
        var row = rows[i];
        var name =  $(row).find(".item_name").val()
        //creates empty row
        $("#modal_tbody").append("<tr class='modal-item-row'></tr>");
        $(".modal-item-row:last").append("<td>" + name + "</td>")

        var desc = $(row).find(".item_desc").val();
        $(".modal-item-row:last").append("<td>" + desc + "</td>");

        var cost = $(row).find(".cost").val()
        $(".modal-item-row:last").append("<td>" + cost + "</td>");


        var qty =  $(row).find(".qty").val()
        $(".modal-item-row:last").append("<td>" + qty + "</td>");

        // price is span
        var price =  $(row).find(".price").text()
        var curr = $("#invoice_currency").val();
        $(".modal-item-row:last").append("<td>" + price + " " + "<span>" + curr + "</span></td>")



      }

   });




});
