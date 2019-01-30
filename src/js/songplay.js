function getlyric() {
    $.get('./js/lyric.json').then((lyric) => {
        let array = lyric.lyric.split('\n');
        let regex = /^\[(.+)\](.*)/;
        array = array.map(function (string) {
            let matches = string.match(regex);
            if (matches) {
                let para = document.createElement('p');
                let lyric = $('.lyric-detail');
                para.innerText = matches[2];
                para.setAttribute('data-time', matches[1]);
                lyric.append(para);
                return {
                    time: matches[1],
                    words: matches[2]
                };
            }
        })
    }, (err) => {
        console.log(err);
    });
};
getlyric();


let audioEle = document.createElement('audio');
audioEle.src = "http://117.169.85.25/amobile.music.tc.qq.com/C4000012jhy63iVTH3.m4a?guid=4593615744&vkey=123FC37C2D4D03D7AF70F7314148D5809174D1DB8806CDC3841C905D89B0B636E6AC2E0A8DA9EAC8CD2A3D47F4EEB1509140B9CA2DE573E9&uin=8130&fromtag=66";
let $playbtn = $('.disc');
let $playicon = $('.playbtn');

let played = false;

function play() {
    $playicon.toggleClass('active');
    $('.disc-ring').toggleClass('playing');
    $('.disc-default').toggleClass('playing');
    $('.cover').toggleClass('playing');
    if (played) {
        console.log('现在需要播放')
        audioEle.pause();
        played = false;
    } else {
        console.log('现在需要暂停')
        audioEle.play();
        played = true;
    }
}

// jq和原生的用法要分开
// 之前用addevent和onclick都没有用
$playbtn.click(function () {
    play();
});