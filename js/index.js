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

function createDownloadUri(uri, name) {
  var link = document.createElement("a");

  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

// MIT http://rem.mit-license.org

function trim(c) {
  var ctx = c.getContext('2d'),
    copy = document.createElement('canvas').getContext('2d'),
    pixels = ctx.getImageData(0, 0, c.width, c.height),
    l = pixels.data.length,
    i,
    bound = {
      top: null,
      left: null,
      right: null,
      bottom: null
    },
    x, y;

  for (i = 0; i < l; i += 4) {
    if (pixels.data[i+3] !== 0) {
      x = (i / 4) % c.width;
      y = ~~((i / 4) / c.width);
  
      if (bound.top === null) {
        bound.top = y;
      }
      
      if (bound.left === null) {
        bound.left = x; 
      } else if (x < bound.left) {
        bound.left = x;
      }
      
      if (bound.right === null) {
        bound.right = x; 
      } else if (bound.right < x) {
        bound.right = x;
      }
      
      if (bound.bottom === null) {
        bound.bottom = y;
      } else if (bound.bottom < y) {
        bound.bottom = y;
      }
    }
  }
    
  var trimHeight = bound.bottom - bound.top,
      trimWidth = bound.right - bound.left,
      trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);
  
  copy.canvas.width = trimWidth;
  copy.canvas.height = trimHeight;
  copy.putImageData(trimmed, 0, 0);
  
  // open new window with trimmed image:
  return copy.canvas;
}

function trimCanvas(c) {
  var ctx = c.getContext('2d'),
      copy = document.createElement('canvas').getContext('2d'),
      pixels = ctx.getImageData(0, 0, c.width, c.height),
      l = pixels.data.length,
      i,
      bound = {
          top: null,
          left: null,
          right: null,
          bottom: null
      },
      x, y;
  
  // Iterate over every pixel to find the highest
  // and where it ends on every axis ()
  for (i = 0; i < l; i += 4) {
      if (pixels.data[i + 3] !== 0) {
          x = (i / 4) % c.width;
          y = ~~((i / 4) / c.width);

          if (bound.top === null) {
              bound.top = y;
          }

          if (bound.left === null) {
              bound.left = x;
          } else if (x < bound.left) {
              bound.left = x;
          }

          if (bound.right === null) {
              bound.right = x;
          } else if (bound.right < x) {
              bound.right = x;
          }

          if (bound.bottom === null) {
              bound.bottom = y;
          } else if (bound.bottom < y) {
              bound.bottom = y;
          }
      }
  }
  
  // Calculate the height and width of the content
  var trimHeight = bound.bottom - bound.top,
      trimWidth = bound.right - bound.left,
      trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

  copy.canvas.width = trimWidth;
  copy.canvas.height = trimHeight;
  copy.putImageData(trimmed, 0, 0);

  // Return trimmed canvas
  return copy.canvas;
}


$("#export").click(function() { 
  html2canvas($("#preview"), {
      onrendered: function(canvas) {
        var trimmed = trimCanvas(canvas);
        createDownloadUri(trimmed.toDataURL(), "compare_design.png");
      }
  });
});