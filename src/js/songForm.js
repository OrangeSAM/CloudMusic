{
    let view = {
        el: '.wrapper > .songedit',
        init() {
            this.$el = $(this.el);
        }, //没懂这里
        template: `
            <form action="">
                    <div>
                        <label for="songName">歌名</label>
                        <input type="text" name="songName" id="songName" value="__key__">
                    </div>
                    <div>
                        <label for="singer">歌手</label>
                        <input type="text" name="singer" id="singer">
                    </div>
                    <div>
                        <label for="externalUrl">外链</label>
                        <input type="text" name="externalUrl" id="externalUrl" value="__link__">
                    </div>
                    <input type="submit" name="" id="" value="提交修改">
            </form>`,
        render(data = {}) {
            let placeholders = ['key', 'link']
            let html = this.template;
            placeholders.map((string) => {
                html = html.replace(`__${string}__`, data[string] || '')
            })
            $(this.el).html(html);
        },
    }
    let model = {
        data: {
            songName: '',
            singer: '',
            externalUrl: ''
        },
        save(data) {
            var song = AV.Object.extend('song');
            var upload = new song();
            upload.save(data
                // {
                // songName: 'stay with me ',
                // singer: 'test',
                // externalUrl: 'ddhaidjaoi'
                // }
            ).then(function (object) {
                console.log('LeanCloud Rocks!');
            }, function (err) {
                console.log(err);
            })
        }
    }
    let controller = {
        init(view, model) {
            this.view = view;
            this.model = model;
            this.view.init();
            this.view.render(this.model.data);
            this.bindEvents();
            window.eventHub.on('upload', (data) => {
                //当音乐上传模块上传完毕后，会通过事件中心告诉这里，
                //并且传递了上传的data，这里把data交给view渲染到页面上
                this.view.render(data);
            })
        },
        bindEvents() {
            this.view.$el.on('submit', 'form', (e) => {
                e.preventDefault();
                let needs = 'songName singer externalUrl'.split(' ');
                console.log(needs);
                let data = {};
                needs.map((string) => {
                    data[string] = this.view.$el.find(`[name="${string}"]`).val();
                })
                console.log(data);
                this.model.save(data);
            })
        }
    }
    controller.init(view, model)
}