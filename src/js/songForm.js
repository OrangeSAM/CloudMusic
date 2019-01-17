{
    let view = {
        el: '.wrapper > .songedit',
        template: `
            <form action="">
                    <div>
                        <label for="songName">歌名</label>
                        <input type="text" name="" id="songName">
                    </div>
                    <div>
                        <label for="singer">歌手</label>
                        <input type="text" name="" id="singer">
                    </div>
                    <div>
                        <label for="externalUrl">外链</label>
                        <input type="text" name="" id="externalUrl">
                    </div>
                    <input type="submit" name="" id="" value="提交修改">
            </form>`,
        render(h) {
            $(this.el).html(this.template);
        },
    }
    let model = {

    }
    let controller = {
        init(view, model) {
            this.view = view;
            this.model = model;
            this.view.render(this.model.data)
            window.eventHub.on('upload', (data) => {
                console.log('songform订阅到了')
                console.log(data);
            })
        }
    }
    controller.init(view, model)
}