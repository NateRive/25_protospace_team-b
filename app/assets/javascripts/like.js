$(function() {
  var likeId = $(".fa-heart").data("likeid");
  $("#like-button").click(function() {
    if ($(this).find("i").hasClass("like-clicked")) {
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
        $("#like-button").find("i").removeClass("like-clicked");
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
        $("#like-button").find("i").addClass("like-clicked");
      })
      .fail(function(data) {
        alert("errors");
      })
    }
  })
})
