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
            <a rel="nofollow" data-method="delete" href="/prototypes/18/comments/${comment.id}" method = "delete">
              <i class='fa fa-trash color'></i>
            </a>
          </div>
          <div class='list-ui' style='list-style:none'>
            <a href="/prototypes/18/comments/${comment.id}/edit" method= "patch">
              <i class='fa fa-edit color'></i>
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
  })
});
