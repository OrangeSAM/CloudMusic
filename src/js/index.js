var APP_ID = '8FXe5ffF8dBGfBzQrJDXJPNB-gzGzoHsz';
var APP_KEY = 'fvva0OpwSWKOUx1dpYttFSpb';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
var query = new AV.Query('song');
let songlist = document.querySelector('.songList');
query.find().then(function (song) {
    song.forEach(function (object) {
        var singlesong = document.createElement('div');
        singlesong.innerHTML = `<a href="">
        <div class="singleSong">    
            <div>
                <div class="songName">${object.attributes.songName}</div>
                <div class="songDetail">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-wusunyinzhi"></use>
                    </svg>
                    <span class="singer">${object.attributes.singer}</span> -<span class="album">飞行器的执行周期</span>
                </div>
            </div>
            <div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang"></use>
                </svg>
            </div>
        </div>
    </a>`;
        console.log(singlesong);
        songlist.appendChild(singlesong);
        //但是这样就多了一个div元素，之前是直接append反字符串内容 所以没用 ，解决方法只有jquery吗?
    });
}).then(function (song) {
    console.log(song); // 更新成功
}, function (error) {
    console.log(error); // 异常处理
});