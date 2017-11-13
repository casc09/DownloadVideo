


function download() {

  var getVideoInfoUrl;
  var url = window.location.href;
  url = url.split("?q=")[1];


  // videoUrl = $("#videoUrl").val();
  getVideoInfoUrl = "http://67.209.177.82:8000/search/?downloadUrl=" + url;


  var jsontree = [];
  var audio = [];
  var videosSmall = [];
  var videosMedium = [];
  var videoHd720 = [];

  $.ajax({
    url: getVideoInfoUrl,
    type: "GET",
    dataType: 'JSON',
    success: function(result){
      jsontree = result;
      $.each(jsontree, function(key, value) {
        if(key == "success"){
          $("#myDiv").append(key+"-------"+value+"  ++ ");
        }
        if(key == "audio"){
           audio = value;
        }
        if(key == "videosSmall"){
          videosSmall = value;
        }
        if(key == "videosMedium"){
          videosMedium = value;
        }
        if(key == "videoHd720"){
          videoHd720 = value;
        }
      });
    }
  });








}
