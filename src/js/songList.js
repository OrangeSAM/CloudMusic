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
            let liList = songs.map((song) => $('<li></li>').html(`<div data-songId=${song.id}><span>${song.songName}</span><span>${song.singer}</span></div>`));
            $el.find('ul').empty();
            liList.map((domLi) => {
                $el.find('ul').append(domLi);
            })
        },
        activeDiv(item) {
            $(item).addClass('active')
                .siblings('.active')
                .removeClass('active');
        }
    }
    let model = {
        data: {
            songs: [],
        },
        //歌曲获取
        fetch() {
            var query = new AV.Query('song');
            return query.find().then((result) => {
                this.data.songs = result.map((song) => {
                    return {
                        id: song.id,
                        ...song.attributes
                    }
                })
                return result;
                //为什么上面要返回result，不返回view就显示不了数据
                // 这是之前自己写的，只把一部分写进了data...                    
                // push(item._serverData);
            })
        }
    };
    let controller = {
        init(view, model) {
            this.view = view;
            this.model = model;
            this.view.render(this.model.data);
            this.bindEventHub();
            this.bindEvents();
            this.fetchAllSongs();

        },
        bindEvents() {
            $(this.view.el).on('click', 'li', (e) => {
                let modelsongs = this.model.data.songs;
                let tempdata;
                let songId = e.currentTarget.children[0].dataset.songid
                for (let i = 0; i < modelsongs.length; i++) {
                    if (modelsongs[i].id === songId) {
                        tempdata = modelsongs[i];
                    }

                }
                this.view.activeDiv(e.currentTarget);
                window.eventHub.emit('clicked', tempdata);
            })
        },
        fetchAllSongs() {
            this.model.fetch().then(() => {
                this.view.render(this.model.data);
            })
        },
        bindEventHub() {
            window.eventHub.on('create', (data) => {
                this.model.data.songs.push(data);
                this.view.render(this.model.data);
            });
        }

    }
    controller.init(view, model);
}