$(document).ready(function () {
  $("#favorite").on("submit", function (e) {
    e.preventDefault();

    var id = $("#id").val();
    var channelName = $("#channel_Name").val();

    $.ajax({
      url: "/home",
      type: "POST",
      data: {
        id: id,
        channelName: channelName,
      },
      success: function () {
        //console.log(channelName);
      },
    });
  });
});
