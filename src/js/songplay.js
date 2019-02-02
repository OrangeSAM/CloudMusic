function getlyric() {
    $.get("./js/lyric.json").then(
        lyric => {
            let array = lyric.lyric.split("\n");
            let regex = /^\[(.+)\](.*)/;
            array = array.map(function (string) {
                let matches = string.match(regex);
                if (matches) {
                    let para = document.createElement("p");
                    let lyric = $(".lyric-detail");
                    para.innerText = matches[2];
                    para.setAttribute("data-time", matches[1]);
                    lyric.append(para);
                    return {
                        time: matches[1],
                        words: matches[2]
                    };
                }
            });
        },
        err => {
            console.log(err);
        }
    );
}
getlyric();

let audioEle = document.createElement("audio");
audioEle.src = sessionStorage.getItem('externalUrl') || 'http://pla636c1g.bkt.clouddn.com/%E4%BE%A3%E8%A1%8C%E8%83%8C%E6%99%AF%E9%9F%B3%E4%B9%90.mp3';
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