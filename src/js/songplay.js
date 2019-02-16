var APP_ID = "8FXe5ffF8dBGfBzQrJDXJPNB-gzGzoHsz";
var APP_KEY = "fvva0OpwSWKOUx1dpYttFSpb";

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
let songId = sessionStorage.getItem("songId");

var querySong = new AV.Query("song");
let audioEle = document.createElement("audio");

let lyric = document.querySelector('.lyric');
let lyricCont = document.querySelector(".lyric-detail");
let lyricWrap = document.querySelector(".lyric-wrap");

querySong.get(songId).then((response) => {
    console.log(response);
    audioEle.src = response.attributes.externalUrl || "http://sam.cloudmusic.yuanq.club/%E5%BC%A0%E5%9B%BD%E8%8D%A3%20-%20%E4%BA%BA%E7%94%9F%E8%B7%AF.mp3";
    let songTitle = document.createElement("h3");
    let songTitleCont = response.attributes.songName + ' - ' + response.attributes.singer;
    songTitle.innerText = songTitleCont;
    document.getElementById("sitetitle").innerText = songTitleCont;
    lyric.insertBefore(songTitle, lyricCont);
    formatLyric(response.attributes.lyric.lyric);
    //获取歌词这里踩了大坑  应该用对象格式存
})

function formatLyric(lyric) {
    let array = lyric.split("\n");
    let regex = /^\[(.+)\](.*)/;
    array = array.map(function (string) {
        let matches = string.match(regex);
        if (matches) {
            let para = document.createElement("p");
            para.innerText = matches[2];
            para.setAttribute("data-time", matches[1]);
            lyricWrap.append(para);
            return {
                time: matches[1],
                words: matches[2]
            };
        }
    });
}

// function getlyric() {
//     $.get("./js/lyric11.json").then(
//         lyric => {
//             let array = lyric.lyric.split("\n");
//             console.log(array);
//             let regex = /^\[(.+)\](.*)/;
//             array = array.map(function (string) {
//                 let matches = string.match(regex);
//                 if (matches) {
//                     let para = document.createElement("p");
//                     let lyric = $(".lyric-detail");
//                     para.innerText = matches[2];
//                     para.setAttribute("data-time", matches[1]);
//                     lyric.append(para);
//                     return {
//                         time: matches[1],
//                         words: matches[2]
//                     };
//                 }
//             });
//         },
//         err => {
//             console.log(err);
//         }
//     );
// }
// getlyric();


audioEle.addEventListener('ended', function () {
    $(".disc-ring").addClass("playing");
    $(".disc-default").addClass("playing");
    $(".cover").addClass("playing");
})


let $playbtn = $(".disc");
let $playicon = $(".playbtn");

let played = true;

function play() {
    $playicon.toggleClass("active");
    $(".disc-ring").toggleClass("playing");
    $(".disc-default").toggleClass("playing");
    $(".cover").toggleClass("playing");
    if (played) {
        audioEle.play();
        played = false;
    } else {
        audioEle.pause();
        played = true;
    }
}
play();

// jq和原生的用法要分开
// 之前用addevent和onclick都没有用
$playbtn.click(function () {
    play();
});