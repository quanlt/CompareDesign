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
  console.log("input " + this.value);
  $("#image_1").fadeTo(0, this.value/100);
})