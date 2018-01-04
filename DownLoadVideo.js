
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

    showdiv("Preparing download links.. please wait ..")
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
                        var height=window.screen.height;
                        var width=window.screen.width;
                        if ((height/width) > 1.7){
                            audioFormat = "audio"
                        }
                        var audioHtml = "<div class=\"col-md-12 \" id=\"audio\" target=\"blank\" style=\"height: 30px\">" +
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
            closediv()
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


function closediv() {
    //Close Div
    document.body.removeChild(document.getElementById("bgDiv"));
    document.getElementById("msgDiv").removeChild(document.getElementById("msgTitle"));
    document.body.removeChild(document.getElementById("msgDiv"));
}

function showdiv(str) {
    var msgw, msgh, bordercolor;
    msgw = 400;
    msgh = 300;
    bordercolor = "#FFFFFF";
    titlecolor = "#99CCFF";

    sWidth  = document.body.clientWidth;
    sHeight = window.screen.availHeight;

    if(msgw >= sWidth){
        msgw = sWidth-10
    }

    var height=window.screen.height;
    var width=window.screen.width;
    if ((height/width) < 1){
        sHeight = window.screen.availHeight-document.body.clientHeight;
    }



    var bgObj = document.createElement("div");
    bgObj.setAttribute('id', 'bgDiv');
    bgObj.style.position = "absolute";
    bgObj.style.top = "0";
    bgObj.style.background = "#777";
    bgObj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75";
    bgObj.style.opacity = "0.6";
    bgObj.style.left = "0";
    bgObj.style.width = sWidth + "px";
    bgObj.style.height = sHeight + "px";
    document.body.appendChild(bgObj);
    var msgObj = document.createElement("div")
    msgObj.setAttribute("id", "msgDiv");
    msgObj.setAttribute("align", "center");
    msgObj.style.position = "absolute";
    msgObj.style.background = "white";
    msgObj.style.font = "12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";
    msgObj.style.border = "1px solid " + bordercolor;
    msgObj.style.width = msgw + "px";
    msgObj.style.height = msgh + "px";
    msgObj.style.top = (document.documentElement.scrollTop + (sHeight - msgh) / 2-50) + "px";
    msgObj.style.left = (sWidth - msgw) / 2 + "px";
    var title = document.createElement("h4");
    title.setAttribute("id", "msgTitle");
    title.setAttribute("align", "right");
    title.style.margin = "0";
    title.style.padding = "3px";
    title.style.background = bordercolor;
    title.style.filter = "progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);";
    title.style.opacity = "0.75";
    title.style.border = "1px solid " + bordercolor;
    title.style.height = "18px";
    title.style.font = "12px Verdana, Geneva, Arial, Helvetica, sans-serif";
    title.style.color = "white";

    var titleD = document.createElement("h2");
    titleD.setAttribute("align", "center");
    titleD.style.marginTop = "80px";
    titleD.style.padding = "3px";
    titleD.style.background = bordercolor;
    titleD.style.filter = "progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);";
    titleD.style.opacity = "0.75";
    titleD.style.border = "1px solid " + bordercolor;
    titleD.style.textAlign = "center"
    titleD.style.font = "32px Verdana, Geneva, Arial, Helvetica, sans-serif";
    titleD.style.color = "black";
    titleD.innerHTML = "Video-Save.site"
    document.body.appendChild(msgObj);
    document.getElementById("msgDiv").appendChild(title);
    var txt = document.createElement("p");
    txt.style.margin = "1em 0"
    txt.setAttribute("id", "msgTxt");
    txt.innerHTML = str;
    document.getElementById("msgDiv").appendChild(txt);
    document.getElementById("msgDiv").appendChild(titleD);
}

//document.onkeydown = mykeydown;
//function mykeydown() {
//    if (event.keyCode == 116)
//    {
//        window.event.keyCode = 0;
//        return false;
//    }
//}
