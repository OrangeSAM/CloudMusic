{
    let view = {
        el: '.wrapper > .songlist',
        template: `
        <ul>
            <li>
                <div>
                    <span>歌曲名</span>
                    <span>歌手名</span>
                </div>
            </li>
        </ul>
        `,
        render(data) {
            let $el = $(this.el);
            $el.html(this.template);
            let {
                songs
            } = data;
            console.log(222)
            let liList = songs.map((song) => $('<li></li>').html(`<div><span>${song.songName}</span><span>${song.singer}</span></div>`));
            $el.find('ul').empty();
            liList.map((domLi) => {
                $el.find('ul').append(domLi);
            })
        },
    }
    let model = {
        data: {
            songs: [],
        }
    };
    let controller = {
        init(view, model) {
            this.view = view;
            this.model = model;
            this.view.render(this.model.data);
            window.eventHub.on('create', (data) => {
                console.log(data);
                this.model.data.songs.push(data);
                this.view.render(this.model.data);
                console.log(this.model.data);
            })
        },
        initList() {
            // 歌曲获取
            var query = new AV.Query('song');
            query.find().then((result) => {
                console.log(result[0]._serverData);
            }).catch((err) => {
                console.log(err);
            });
        }
    }
    controller.init(view, model);
}