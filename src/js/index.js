var APP_ID = "8FXe5ffF8dBGfBzQrJDXJPNB-gzGzoHsz";
var APP_KEY = "fvva0OpwSWKOUx1dpYttFSpb";

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
var query = new AV.Query("song");
let songlist = document.querySelector(".songList");
query
  .find()
  .then(function (song) {
    song.forEach(function (object) {
      let singlesong = document.createElement("div");
      singlesong.classList.add("singleSong");
      singlesong.classList.add('hereforclick');
      singlesong.setAttribute('data-songId', object.id)
      singlesong.innerHTML = `
            <div>
                <div class="songName">${object.attributes.songName}</div>
                <div class="songDetail">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-wusunyinzhi"></use>
                    </svg>
                    <span class="singer">${
                      object.attributes.singer
                    }</span> -<span class="album">飞行器的执行周期</span>
                </div>
            </div>
            <div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang"></use>
                </svg>
            </div>`;
      songlist.appendChild(singlesong);
      //但是这样就多了一个div元素，之前是直接append反字符串内容 所以没用 ，解决方法只有jquery吗?
      //已解决 view里少个div不就行了
      //待做  页面间的数据传递
    });
  })
  .then(
    function () {
      let clickEvent = document.querySelectorAll(".hereforclick");
      // clickEvent.forEach((curv) => {
      //     console.log(curv);
      //     addEventListener('click', function (e) {
      //         e.preventDefault();
      //         console.log(e);
      //         console.log(e.target.dataset.url);
      //         let a = e.target.dataset.url;
      //         sessionStorage.setItem('externalUrl', a);
      //         // window.location.href = 'http://127.0.0.1:8080/src/song.html';
      //     })
      // });
      for (let i = 0; i < clickEvent.length; i++) {
        clickEvent[i].addEventListener(
          "click",
          function (e) {
            e.preventDefault();
            let songId = e.target.dataset.songid;
            sessionStorage.setItem("songId", songId);
            window.location.href = 'http://127.0.0.1:8080/src/song.html';
          }, true
        );
      }
    },
    function (error) {
      console.log(error); // 异常处理
    }
  );