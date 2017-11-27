function download() {

    var getVideoInfoUrl;
    var url = window.location.href;
    url = url.split("?q=")[1];


    // videoUrl = $("#videoUrl").val();
    getVideoInfoUrl = "http://67.209.177.82:8000/search/?downloadUrl=" + url;


    var jsontree = [];


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
                    var img = "<img style=\" width: auto;\n" +
                        "    height: 90px;\n" +
                        "    objec-fit: cover;\" src=\" " + value + " \"> ";
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

                if (key == "audios") {

                    $.each(value, function (key, value) {
                       var audioFormat;
                       var audioAbr;
                       var audioUrl;
                       $.each(value, function (key, value) {
                           if (key == "format_note"){
                             audioFormat = value;
                           }
                           if (key == "abr"){
                               audioAbr = value;
                           }
                           if (key == "url"){
                               audioUrl = value;
                           }
                       })
                       var audioHtml="<div class=\"col-md-12 \" id=\"hd720\" style=\"height: 30px\">" +
                           "            <a href=\"" + audioUrl+"\" >" +
                           audioFormat + "(" + audioAbr + "kbps)"
                           "            </a>" +
                           "          </div>"
                       $("#audio").append(audioHtml);
                   })

                }
                if (key == "videosSmall") {
                    addListToHtml(value);
                }
                if (key == "videosMedium") {
                    addListToHtml(value);
                }
                if (key == "videoHd720") {
                    addListToHtml(value);
                }
            });
        }
    });


}

function  addListToHtml(value) {
    $.each(value, function (key, value) {
        var videoFormat;
        var videoResolution ;
        var videoUrl;
        $.each(value, function (key, value) {
            if (key == "ext"){
                videoFormat = value;
            }
            if (key == "resolution"){
                videoResolution = value;
            }
            if (key == "url"){
                videoUrl = value;
            }
        })
        var videoHtml="<div class=\"col-md-12 \" id=\"hd720\" style=\"height: 30px\">" +
            "            <a href=\"" + videoUrl+"\" >" +
            videoFormat + "(" + videoResolution + ")"
        "            </a>" +
        "          </div>"
        $("#video").append(videoHtml);
    })

}
