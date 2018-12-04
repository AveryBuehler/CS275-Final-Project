var colors = ["White", "Silver", "Gray", "Black", "Red", "Maroon", "Yellow", "Olive", "Lime", "Green", "Aqua", "Teal", "Blue", "Navy", "Fuchsia", "Purple"];
var count = 1;
setInterval(function() {
  var ranCol = Math.floor(Math.random() * colors.length);
  document.body.style.backgroundColor = colors[ranCol];
  console.log(count);
  count++;
}, 100);