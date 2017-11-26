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
        success: function (result) {
            jsontree = result;
            $.each(jsontree, function (key, value) {
                if (key == "success") {
                    $("#myDiv").append(key + "-------" + value + "  ++ ");
                    if (value == "no") {
                        return;
                    }
                }
                if (key == "thumbnail") {
                    var img = "<img src=\" " + value + " \"> ";
                    $("#thumbnail").append(img);

                }
                if (key == "title") {
                    var title = "<p style=\"font-size: medium;font-weight: bold \"> " + value + " </p>  ";
                    $("#title").append(title);
                }

                if (key == "duration") {
                    var durationValue = parseInt(value);
                    durationValueInt=parseInt(durationValue/60) ;
                    durationValueFloat=durationValue-durationValueInt*60;

                    var duration = "<p style=\"font-size: medium; \">  Duration: " + durationValueInt.toString() + " min "+durationValueFloat.toString()+
                        " s</p>  ";
                    $("#duration").append(duration);
                }
                // if (key == "description") {
                //     var description = "<p style=\"font-size: medium; \">  Description: " + value + " </p>  ";
                //     $("#description").append(description);
                // }

                if (key == "audio") {
                    audio = value;
                    $.each(audio, function (key, value) {

                      var video="<div class=\"col-md-12 \" id=\"hd720\" style=\"height: 30px\">\n" +
                          "            <a href=\"#\" >\n" +
                          "              免费域名注册\n" +
                          "            </a>\n" +
                          "          </div>"
                      $("#video").append(video);

                    })
                }
                if (key == "videosSmall") {
                    videosSmall = value;
                }
                if (key == "videosMedium") {
                    videosMedium = value;
                }
                if (key == "videoHd720") {
                    videoHd720 = value;
                }
            });
        }
    });


}
