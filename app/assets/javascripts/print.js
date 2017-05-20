function printDiv(div){
  // fetch div and create element
  var element = document.getElementById(div);
  var domClone = element.cloneNode(true);

  // print section
  var $printSection = document.createElement("div");
  $printSection.id = "printSection";
  $printSection.appendChild(domClone);
  document.body.insertBefore($printSection, document.body.firstChild);
  window.print();

  // clear print section
  var oldElement = document.getElementById("printSection")
  if(oldElement != null){
    oldElement.parentNode.removeChild(oldElement)
  }
  return true
}
