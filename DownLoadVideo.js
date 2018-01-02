
var urlvalue;
var titlevalue;
var urlvalueaudio;
function download() {

    var getVideoInfoUrl;
    var url = window.location.href;
    url = url.split("?q=")[1];


    // videoUrl = $("#videoUrl").val();
    getVideoInfoUrl = "http://67.209.177.82:8001/search/?downloadUrl=" + url;


    var jsontree = [];
    var justDashVideo;

    $.ajax({
        url: getVideoInfoUrl,
        type: "GET",
        dataType: 'JSON',
        success: function (result) {
            jsontree = result;
            //first time get info
            $.each(jsontree, function (key, value) {
                if (key == "success") {

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
                    titlevalue=value;
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

                if (key == "justDashVideo"){
                    justDashVideo = value;
                }
            });
            //second time get link
            $.each(jsontree, function (key, value) {
                if (key == "audios") {
                    $.each(value, function (key, value) {
                        var audioFormat;
                        var audioAbr;
                        var audioUrl;
                        $.each(value, function (key, value) {
                            if (key == "format_note") {
                                audioFormat = value;
                            }
                            if (key == "abr") {
                                audioAbr = value;
                            }
                            if (key == "url") {
                                audioUrl = value;
                            }
                        })
                        var audioHtml = "<div class=\"col-md-12 \" id=\"hd720\" target=\"blank\" style=\"height: 30px\">" +
                            "            <a   onclick=\"clicklinkAudio(this)\"   id="+ audioUrl+
                            " class=\"downloadLink\" style= \" cursor:pointer \" > " +
                            audioFormat + "(" + audioAbr + "kbps)"
                        "            </a>" +
                        "          </div>"
                        $("#audio").append(audioHtml);
                    })

                }
                if (key == "videosSmall") {
                    addListToHtml(value, titlevalue);
                }
                if (key == "videosMedium") {
                    addListToHtml(value, titlevalue);
                }
                if (key == "videoHd720") {
                    addListToHtml(value, titlevalue);
                }
                if (justDashVideo == "yes"){
                    if (key == "videoDash"){
                        addListToHtml(value,titlevalue);
                    }
                }

            })
        }
    });


}

function  addListToHtml(value,title) {
    $.each(value, function (key, value) {
        var videoFormat;
        var videoResolution ;
        var videoUrl;
        var format_id;
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
            if (key == "format_id"){
                format_id = value;
            }

        })

        var videoHtml="<div class=\"col-md-12 \" id =  "+ format_id + " style=\"height: 30px\"> " +
            "            <a   onclick=\"clicklink(this)\"   id="+ videoUrl+
            " class=\"downloadLink\" style= \" cursor:pointer \" > " +
            videoFormat + "(" + videoResolution + ")"
        "            </a>" +
        "          </div>"
        $("#video").append(videoHtml);
    })

}

function clicklink(obj) {

    var url ;
    urlvalue=obj.id;
    url="DownloadResult.html?q=" + urlvalue;
    location.href = url;


}

function clicklinkAudio(obj) {

    var url ;
    urlvalueaudio=obj.id;
    url="DownloadResult.html?q=" + urlvalueaudio;
    location.href = url;


}

function startDownload() {

    var url = window.location.href;
    url = url.split("?q=")[1];

    var a= "<a id=\"link\" class=\"downloadLink\" download=\" " + titlevalue + "\"href=\"" + url + "\" >"
    $('#myDiv').append(a);
    $('#link')[0].click();

}


