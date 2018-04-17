$(function() {
  $("#like-button").click(function() {
    if ($(this).hasClass("clicked")) {
      var url = window.location.href + "/likes/" + likeId
      $.ajax({
        url: url,
        type: "delete",
        data: {},
        dataType: "json"
      })
      .done(function(data) {
        var likes_number = $("#like-sum").text();
        $("#like-sum").text(Number(likes_number) - 1);
        $("#like-button").removeClass("clicked");
      })
      .fail(function(data) {
        alert("failed to delete likes");
      })
    } else {
      var url = window.location.href + "/likes"
      $.ajax({
        url: url,
        type: "post",
        data: {},
        dataType: "json"
      })
      .done(function(data) {
        var likesNumber = $("#like-sum").text();
        likeId = data.id
        $("#like-sum").text(Number(likesNumber) + 1);
        $("#like-button").addClass("clicked");
      })
      .fail(function(data) {
        alert("errors");
      })
    }
  })
})
