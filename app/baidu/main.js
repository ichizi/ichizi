window.onload = function () {

    if (!!window.location.search){
        var search = window.location.search
        var kw
        if (typeof URLSearchParams !== 'undefined') {
          var s = new URLSearchParams(search)
          kw = s.get('q')
        } else {
          var match = window.location.search.match(/q=(.*?)(?:&|$)/)
          if (match) {
            kw = decodeURIComponent(match[1]);
          }
        }
        if (!kw) kw = decodeURIComponent(window.location.search.substr(1))
        var $instructions = document.getElementById("instructions");
        var $arrow = document.getElementById("mouse");
        setTimeout(function (){
            $instructions.text('1、把鼠标放到输入框上');
            $arrow.show().animate({
                left: $kw.offset().left + 10 + 'px',
                top: ($kw.offset().top + $kw.height()/2) + 'px'
            }, 2000, function (){
                $instructions.text('2、输入你的问题');
                $arrow.hide();
                var $kw = $('#kw');
                $kw.focus();
                var i = 0;
                var interval = setInterval(function (){
                    $kw.val(kw.substr(0,i));
                    i++;
                    if (i > kw.length){
                        clearInterval(interval);
                        $instructions.text('3、按下“百度一下”按钮');
                        $arrow.show();
                        var $search = $('#search');
                        $arrow.animate({
                            left: $search.offset().left + $search.width()/2 + 'px',
                            top: $search.offset().top + $search.height()/2 + 'px'
                        }, 1000, function () {
                            $instructions.html('<strong>这对你而言就是这么困难么？</strong>');
                            setTimeout(function (){
                                window.location = 'http://www.baidu.com/s?ie=utf-8&wd=' + encodeURIComponent(kw);
                            }, 2000);
                        })
                    }
                }, 200);
            });
        }, 1000);
    }
}
