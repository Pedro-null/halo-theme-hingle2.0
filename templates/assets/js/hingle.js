/* ----

# Hingle Theme
# By: Dreamer-Paul
# Last Update: 2021.10.25

一个简洁大气，含夜间模式的 Hexo 博客模板。

本代码为奇趣保罗原创，并遵守 MIT 开源协议。欢迎访问我的博客：https://paugram.com

---- */

var Paul_Hingle = function (config) {
    var body = document.body;
    var content = ks.select(".post-content:not(.is-special), .page-content:not(.is-special)");

    // 菜单按钮
    this.header = function () {
        var menu = document.getElementsByClassName("head-menu")[0];

        ks.select(".toggle-btn").onclick = function () {
            menu.classList.toggle("active");
        };

        ks.select(".light-btn").onclick = this.night;
    };

    // 关灯切换
    this.night = function () {
        //如果开启了评论组件，且评论组件没更新的话
        if (document.getElementById("halo-comment") && document.querySelector("div#halo-comment > div > div")){
            var comment_on = true;
            var ii = document.querySelector("div#halo-comment > div > div");
            var comment_box = ii.shadowRoot.querySelector("div.halo-comment-widget");
        }else{
            comment_on = false;
        };
        if(body.classList.contains("dark-theme")){
            body.classList.remove("dark-theme", "color-scheme-dark");
            body.classList.add("color-scheme-light");
            if(comment_on){
                comment_box.classList.remove("dark");
                comment_box.classList.add("light");
            }
            document.cookie = "night=false;" + "path=/;" + "max-age=21600";
        }
        else{
            body.classList.remove("color-scheme-light");
            body.classList.add("dark-theme", "color-scheme-dark");
            if(comment_on){
                comment_box.classList.remove("light");
                comment_box.classList.add("dark");
            }
            document.cookie = "night=true;" + "path=/;" + "max-age=21600";
        }
    };

    // 目录树
    this.tree = function () {
        if(isPost){
            var id = 1;
            var wrap = ks.select(".wrap");
            var headings = content.querySelectorAll("h1, h2, h3, h4, h5, h6");

            if(headings.length > 0){
                body.classList.add("has-trees");

                var trees = ks.create("section", {
                    class: "article-list",
                    html: "<h4><span class=\"title\">目录</span></h4>"
                });

                ks.each(headings, function (t) {
                    var cls, text = t.innerText;

                    t.id = "title-" + id;

                    switch (t.tagName){
                        case "H2": cls = "item-2"; break;
                        case "H3": cls = "item-3"; break;
                        case "H4": cls = "item-4"; break;
                        case "H5": cls = "item-5"; break;
                        case "H6": cls = "item-6"; break;
                    }

                    trees.appendChild(ks.create("a", {class: cls, text: text, href: "#title-" + id}));

                    id++;
                });

                wrap.appendChild(trees);

                function toggle_tree() {
                    var buttons = ks.select("footer .buttons");
                    var btn = ks.create("a", {class: "toggle-list"});
                    buttons.appendChild(btn);

                    btn.addEventListener("click", function () {
                        trees.classList.toggle("active");
                    })
                }
                toggle_tree();
            }
        }
        
    };


    // 返回页首
    this.to_top = function () {
        var btn = document.getElementsByClassName("to-top")[0];
        var scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

        scroll >= window.innerHeight / 2 ? btn.classList.add("active") : btn.classList.remove("active");
    };

    this.header();

    if(content){
        this.tree();
    }

    // 返回页首
    window.addEventListener("scroll", this.to_top);

    // 如果开启自动夜间模式
    if(ThemeConfig.night){
        var hour = new Date().getHours();

        if(document.cookie.indexOf("night") === -1 && (hour <= 5 || hour >= 22)){
            document.body.classList.remove("color-scheme-light");
            document.body.classList.add("dark-theme", "color-scheme-dark");
            document.cookie = "night=true;" + "path=/;" + "max-age=21600";
        }
    }
    else if(document.cookie.indexOf("night") !== -1){
        if(document.cookie.indexOf("night=true") !== -1){
            document.body.classList.remove("color-scheme-light");
            document.body.classList.add("dark-theme", "color-scheme-dark");
        }
        else{
            document.body.classList.remove("dark-theme", "color-scheme-dark");
            document.body.classList.add("color-scheme-light");
        }
    }

    // 如果开启复制内容提示
    if(ThemeConfig.copyright){
        document.oncopy = function () {
            ks.notice("复制内容请注明来源并保留版权信息！", {color: "yellow", overlay: true})
        };
    }
    
};

// 图片缩放
ks.image(".post-content:not(.is-special) img, .page-content:not(.is-special) img");

// 请保留版权说明
if(window.console && window.console.log){
    console.log("%c Hingle %c https://paugram.com ","color: #fff; margin: 1em 0; padding: 5px 0; background: #6f9fc7;","margin: 1em 0; padding: 5px 0; background: #efefef;");
}
