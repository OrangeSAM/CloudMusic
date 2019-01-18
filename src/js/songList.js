{
    let view = {
        el: '.wrapper > .songlist',
        template: `
        <ul>
            <li>
                <div>
                    <span>千里之外</span>
                    <span>周杰伦</span>
                </div>
            </li>
            <li>
                <div>
                    <span>千里之外</span>
                    <span>周杰伦</span>
                </div>
            </li>
            <li>
                <div>
                    <span>千里之外</span>
                    <span>周杰伦</span>
                </div>
            </li>
            <li>
                <div>
                    <span>千里之外</span>
                    <span>周杰伦</span>
                </div>
            </li>
        </ul>
        `,
        render(h) {
            $(this.el).html(this.template)
        },
    }
    let model = {

    };
    let controller = {
        init(view, model) {
            this.view = view;
            this.model = model;
            this.view.render(this.model.data);
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