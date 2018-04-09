$(function(){
  function buildHTML(comment){
    var html = `<div class="media">
                  <div class="media-left">
                    <a href="#" title="thumbnail">
                      <img src='', size: '64x64', class="media-object">
                    </a>
                  </div>
                  .media-body
                    %p
                      ${comment.content}
               </div>`
      $('body').scrollTop({}
    return html;
  }
  $('.btn-primary').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href + '/comments'
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.comments').append(html)
      $('.btn-primary').val('')
    .fail(function(){
      alert('error');
    })
    })
  })
});
