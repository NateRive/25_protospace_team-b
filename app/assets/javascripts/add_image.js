$(function(){
  $('form').on('change', 'input[type="file"]', function(e) {
    var file = e.target.files[0],
    reader = new FileReader();
    selector = $(this).parent();
    selectorImg = $(selector).find("img");
    if (selectorImg) {
      $(selectorImg).remove();
    }
    $preview = $(selector);
    t = this;

    if(file.type.indexOf("image") < 0){
      return false;
    }

    function includeMain() {
      var className = selector.attr("class");
      if (className.match("main")) {
        return true;
      } else {
        return false;
      }
    }

    reader.onload = (function(file) {
      return function(e) {
        // $preview.empty();

        if (includeMain()) {
          $preview.append($('<img>').attr({
                    src: e.target.result,
                    width: "690px",
                    height: "500px",
                     class: "preview",
                    title: file.name
                }));
        } else {
          $preview.append($('<img>').attr({
                    src: e.target.result,
                    width: "660px",
                    height: "200px",
                     class: "preview",
                    title: file.name
                }));
        }
      };
    })(file);

    reader.readAsDataURL(file);
  });
});
