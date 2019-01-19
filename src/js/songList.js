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
        },
        //歌曲获取
        fetch() {
            var query = new AV.Query('song');
            return query.find().then((result) => {
                result.map(item => {
                    return this.data.songs.push(item._serverData);
                })
                return this.data.songs;
            });
        }
    };
    let controller = {
        init(view, model) {
            this.view = view;
            this.model = model;
            this.view.render(this.model.data);
            window.eventHub.on('create', (data) => {
                this.model.data.songs.push(data);
                this.view.render(this.model.data);
            });
            this.model.fetch().then(() => {
                this.view.render(this.model.data);
            })
        },
    }
    controller.init(view, model);
}