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
                    durationValue=durationValue/60;
                    var duration = "<p style=\"font-size: medium; \">  Duration: " + durationValue.toString() + " min</p>  ";
                    $("#duration").append(duration);
                }
                // if (key == "description") {
                //     var description = "<p style=\"font-size: medium; \">  Description: " + value + " </p>  ";
                //     $("#description").append(description);
                // }

                if (key == "audio") {
                    audio = value;
                    $.each(audio, function (key, value) {


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
