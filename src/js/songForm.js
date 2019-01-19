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
        reset() {
            this.render({});
        }
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
            return upload.save(data);
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
            //view中的子选择器form发生提交事件时
            //禁止默认事件，并且手机表单中信息存放到data对象中
            //调用model的save方法保存到leancloud,
            this.view.$el.on('submit', 'form', (e) => {
                e.preventDefault();
                let needs = 'songName singer externalUrl'.split(' ');
                let data = {};
                needs.map((string) => {
                    data[string] = this.view.$el.find(`[name="${string}"]`).val();
                })
                this.model.save(data).then(() => {
                    console.log('上传到leancloud成功');
                    this.view.reset();
                    //此时this.model.data为空
                    window.eventHub.emit('create', data);
                    console.log('发布了来自songform的data')
                }, function (err) {
                    console.log(err);
                });
            })
        }
    }
    controller.init(view, model)
}