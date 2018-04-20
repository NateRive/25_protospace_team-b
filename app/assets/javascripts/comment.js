$(function(){
  function buildHTML(comment){
      var html = `
      <div class='media'>
        <div class='media-left'>
          <a href='/users/${comment.user_id}' title='thumbnail'>
            <img class="media-object" src="${comment.avatar.url}" alt="Noimage" width="64" height="64"/>
          </a>
        </div>
        <div class='media-body'>
          <h4>
            ${comment.name}
          </h4>
          <p>
            ${comment.content}
          </p>
          <div class='list-ui' style='list-style:none'>
            <a rel="nofollow" data-method="delete" href="/prototypes/${comment.prototype_id}/comments/${comment.id}" data-remote ="true">
              <i class='fa fa-trash color'></i>
            </a>
          </div>
          <div class='list-ui' style='list-style:none'>
            <a method= "patch">
              <i class='fa fa-edit color' data-url="/prototypes/${comment.prototype_id}/comments/${comment.id}"></i>
            </a>
          </div>
        </div>
      </div>
      `
      $('body').scrollTop()
    return html;
  }
  $('#new_comment').on('submit', function(e){
    e.preventDefault();
    // var formData = new FormData($(this));
    var content = $("#comment_text").val();
    var href = window.location.href + '/comments'
        console.log(href);
    $.ajax({
      url: href,
      type: "POST",
      data: {
        content: content
      },
      dataType: 'json',
      // processData: false,
      // contentType: false
    })
    .done(function(data){
      // debugger;
      var html = buildHTML(data);
      $('#comment_list').append(html);
      // $('#new_comment')[0].reset();
      $("#comment_text").val("");
    })
    .fail(function(data){
      alert('error');
    })
  });


$("#comment_list").on("click", ".fa-trash", function(e) {
    e.preventDefault();
    var url = $(this).parent().attr("href");
    var deleteTarget = $(this).closest(".media");
    $.ajax({
      url: url,
      type: "DELETE",
      data: {},
      dataType: "json"
    })
    .done(function(data) {
      deleteTarget.remove();
    })
    .fail(function(data) {
      alert("errors");
    })
  });

  function appendModal() {
  var bg = `
  <div id="modal-bg"> </div>
  `
  $("body").append(bg);
}

$("#comment_list").on("click", ".fa-edit", function() {
  function modalResize() {
    var w = $(window).width();
    var h = $(window).height();
    var cw = $("#modal-main").outerWidth();
    var ch = $("#modal-main").outerHeight();
    $("#modal-main").css({
      "left": ((w - cw) / 2) + "px",
      "top": ((h - ch) / 2) + "px"
    });
  }

  appendModal();
  modalResize();
  var url = $(this).data("url");
  console.log(url);
  $("#modal-main").find("form").attr("action", url);
  $("#modal-bg,#modal-main").fadeIn("slow");
  return false;
});

$(".destroy").click(function() {
  $("#modal-bg, #modal-main").fadeOut("fast");
});

});
