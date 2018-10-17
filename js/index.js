function renderImage(file, target){
  var reader = new FileReader();
  reader.onload = function(event){
    url = event.target.result
    target.attr("src", url);
  }
  reader.readAsDataURL(file);
}
$("#designer_file").change(function(){
  renderImage(this.files[0], $("#image_1"));
  renderImage(this.files[1], $("#image_2"));
  console.log("file was selected");
  
})

$("#opacityRange").on("input", function(){
  $("#opacity").html(this.value+"%");
  $("#image_2").fadeTo(0, this.value/100);
})

function toggleCompareMode(){
  $("#overlay").toggleClass("disabled");
  $("#split").toggleClass("disabled");
  $("#opacityRange").prop("disabled",!$("#overlay").hasClass("disabled"));
  $("#preview").toggleClass("cocoen");
  $("#image_1").toggleClass("actual");
  $("#image_2").toggleClass("expected");
  $(".cocoen-drag").toggle();
  if($("#overlay").hasClass("disabled")){
    $("#image_2").fadeTo(0, $("#opacityRange").val()/100);
    $("#image_1").css({'width':'', 'height': ''});
  } else {
    $("#image_2").fadeTo(0, 1);
  }
}
function updateImageSize(){
  $('#image_2').css({'width' :$("#width").val() + "px" , 'height' : $("#height").val() + "px"});
  $('#image_1').css({'width' :$("#width").val() + "px" , 'height' : $("#height").val() + "px"});
}

$("#overlay").click(toggleCompareMode);
$("#split").click(toggleCompareMode);
$("#overwriteDimenion").change(function(){
  $("#submitSize").toggleClass("disabled");
  if(this.checked){
    updateImageSize();
  } else {
    $('#image_2').css({'width' : '' , 'height' : ''});
    $('#image_1').css({'width' : '' , 'height' : ''});
  }
})
$("#submitSize").click(function(){
  updateImageSize();
});