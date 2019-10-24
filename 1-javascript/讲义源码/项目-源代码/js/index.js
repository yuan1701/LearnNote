/*--String.prototype--*/
~function (pro) {
    function queryURLParameter() {
        var reg = /([^?=&#]+)=([^?=&#]+)/g,
            obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    }

    pro.queryURLParameter = queryURLParameter;
}(String.prototype);

/*--LOADING--*/
var loadingRender = (function () {
    var ary = ["icon.png", "zf_concatAddress.png", "zf_concatInfo.png", "zf_concatPhone.png", "zf_course.png", "zf_course1.png", "zf_course2.png", "zf_course3.png", "zf_course4.png", "zf_course5.png", "zf_course6.png", "zf_cube1.png", "zf_cube2.png", "zf_cube3.png", "zf_cube4.png", "zf_cube5.png", "zf_cube6.png", "zf_cubeBg.jpg", "zf_cubeTip.png", "zf_emploment.png", "zf_messageArrow1.png", "zf_messageArrow2.png", "zf_messageChat.png", "zf_messageKeyboard.png", "zf_messageLogo.png", "zf_messageStudent.png", "zf_outline.png", "zf_phoneBg.jpg", "zf_phoneDetail.png", "zf_phoneListen.png", "zf_phoneLogo.png", "zf_return.png", "zf_style1.jpg", "zf_style2.jpg", "zf_style3.jpg", "zf_styleTip1.png", "zf_styleTip2.png", "zf_teacher1.png", "zf_teacher2.png", "zf_teacher3.jpg", "zf_teacher4.png", "zf_teacher5.png", "zf_teacher6.png", "zf_teacherTip.png"];

    //->获取需要操作的元素
    var $loading = $('#loading'),
        $progressBox = $loading.find('.progressBox');
    var step = 0,
        total = ary.length;

    return {
        init: function () {
            $loading.css('display', 'block');

            //->循环加载所有的图片,控制进度条的宽度
            $.each(ary, function (index, item) {
                var oImg = new Image;
                oImg.src = 'img/' + item;
                oImg.onload = function () {
                    step++;
                    $progressBox.css('width', step / total * 100 + '%');
                    oImg = null;

                    //->所有图片都已经加载完毕:关闭LOADING,显示PHONE
                    if (step === total) {
                        if (page === 0) return;
                        window.setTimeout(function () {
                            $loading.css('display', 'none');
                            phoneRender.init();
                        }, 2000);
                    }
                }
            });
        }
    }
})();

/*--PHONE--*/
var phoneRender = (function () {
    var $phone = $('#phone'),
        $listen = $phone.children('.listen'),
        $listenTouch = $listen.children('.touch'),
        $details = $phone.children('.details'),
        $detailsTouch = $details.children('.touch'),
        $time = $phone.children('.time');

    var listenMusic = $('#listenMusic')[0],
        detailsMusic = $('#detailsMusic')[0],
        musicTimer = null;

    //->detailsMusicFn:播放自我介绍的音频,并且计算音频播放的进度
    function detailsMusicFn() {
        detailsMusic.play();
        musicTimer = window.setInterval(function () {
            var curTime = detailsMusic.currentTime,
                minute = Math.floor(curTime / 60),
                second = Math.floor(curTime);
            minute < 10 ? minute = '0' + minute : null;
            second < 10 ? second = '0' + second : null;
            $time.html(minute + ':' + second);

            //->音频播放完成
            if (curTime === detailsMusic.duration) {
                window.clearInterval(musicTimer);
                closePhone();
            }
        }, 1000);
    }

    //->closePhone:关闭当前的PHONE区域展示下一个区域
    function closePhone() {
        detailsMusic.pause();
        $phone.css('transform', 'translateY(' + document.documentElement.clientHeight + 'px)').on('webkitTransitionEnd', function () {
            $phone.css('display', 'none');
        });
        messageRender.init();
    }

    return {
        init: function () {
            $phone.css('display', 'block');
            listenMusic.play();

            //->给LISTEN中的TOUCH绑定单击事件:移动端的单击事件使用CLICK会存在一个300MS的延迟,我们需要使用touchstart/touchmove/touchend来进行模拟,Zepto中的singleTap就是封装好的一个操作方法
            $listenTouch.singleTap(function () {
                $listen.css('display', 'none');
                listenMusic.pause();

                $details.css('transform', 'translateY(0)');
                $time.css('display', 'block');
                detailsMusicFn();
            });

            //->给DETAILS中的TOUCH绑定单击事件
            $detailsTouch.singleTap(closePhone);
        }
    }
})();

/*--MESSAGE--*/
var messageRender = (function () {
    var $message = $('#message'),
        $messageList = $message.children('.messageList'),
        $list = $messageList.children('li'),
        $keyBoard = $message.children('.keyBoard'),
        $textTip = $keyBoard.children('.textTip'),
        $submit = $keyBoard.children('.submit');

    var autoTimer = null,
        step = -1,
        total = $list.length,
        bounceTop = 0;

    var messageMusic = $('#messageMusic')[0];

    //->messageMove:消息列表的发送
    function messageMove() {
        autoTimer = window.setInterval(function () {
            step++;
            var $cur = $list.eq(step);
            $cur.css({
                opacity: 1,
                transform: 'translateY(0)'
            });

            //->当发送完成第三条的时候，开启我们的键盘操作
            if (step === 2) {
                window.clearInterval(autoTimer);
                $keyBoard.css('transform', 'translateY(0)');
                $textTip.css('display', 'block');
                textMove();
            }

            //->从第四条开始,我们没法送一条消息，都需要让整个消息区域往上移动相关的距离
            if (step >= 3) {
                bounceTop -= $cur[0].offsetHeight + 10;
                $messageList.css('transform', 'translateY(' + bounceTop + 'px)');
            }

            //->当消息发送完成
            if (step === total - 1) {
                window.clearInterval(autoTimer);
                window.setTimeout(function () {
                    if (page === 2) return;
                    $message.css('display', 'none');
                    messageMusic.pause();
                    cubeRender.init();
                }, 1500);
            }
        }, 1500);
    }

    //->textMove:实现文字打印机
    function textMove() {
        var text = '都学了啊，可还是找不到工作!',
            n = -1,
            result = '';
        var textTimer = window.setInterval(function () {
            n++;
            result += text[n];
            $textTip.html(result);
            if (n === text.length - 1) {
                window.clearInterval(textTimer);
                $submit.css('display', 'block').singleTap(function () {
                    $textTip.css('display', 'none');
                    $keyBoard.css('transform', 'translateY(3.7rem)');
                    messageMove();
                });
            }
        }, 100);
    }


    return {
        init: function () {
            $message.css('display', 'block');
            messageMove();
            messageMusic.play();
        }
    }
})();

/*--CUBE--*/
var cubeRender = (function () {
    var $cube = $('#cube'),
        $cubeBox = $cube.children('.cubeBox'),
        $cubBoxLis = $cubeBox.children('li');

    //->滑动的处理
    function isSwipe(changeX, changeY) {
        return Math.abs(changeX) > 30 || Math.abs(changeY) > 0;
    }

    function start(ev) {
        var point = ev.touches[0];
        $(this).attr({
            strX: point.clientX,
            strY: point.clientY,
            changeX: 0,
            changeY: 0
        });
    }

    function move(ev) {
        var point = ev.touches[0];
        var changeX = point.clientX - $(this).attr('strX'),
            changeY = point.clientY - $(this).attr('strY');
        $(this).attr({
            changeX: changeX,
            changeY: changeY
        });
    }

    function end(ev) {
        var changeX = parseFloat($(this).attr('changeX')),
            changeY = parseFloat($(this).attr('changeY'));
        var rotateX = parseFloat($(this).attr('rotateX')),
            rotateY = parseFloat($(this).attr('rotateY'));
        if (isSwipe(changeX, changeY) === false) return;
        rotateX = rotateX - changeY / 3;
        rotateY = rotateY + changeX / 3;
        $(this).attr({
            rotateX: rotateX,
            rotateY: rotateY
        }).css('transform', 'scale(0.6) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
    }

    return {
        init: function () {
            $cube.css('display', 'block');

            //->魔方区域的滑动
            $cubeBox.attr({
                rotateX: -35,
                rotateY: 45
            }).on('touchstart', start).on('touchmove', move).on('touchend', end);

            //->每一个页面的点击操作
            $cubBoxLis.singleTap(function () {
                var index = $(this).index();
                $cube.css('display', 'none');
                swiperRender.init(index);
            });
        }
    }
})();

/*--SWIPER--*/
var swiperRender = (function () {
    var $swiper = $('#swiper'),
        $makisu = $('#makisu'),
        $return = $swiper.children('.return');

    //->change:实现每一屏幕滑动切换后控制页面的动画
    function change(example) {
        var slidesAry = example.slides,
            activeIndex = example.activeIndex;
        if (activeIndex === 0) {
            $makisu.makisu({
                selector: 'dd',
                overlap: 0.6,
                speed: 0.8
            });
            $makisu.makisu('open');
        } else {
            $makisu.makisu({
                selector: 'dd',
                overlap: 0.6,
                speed: 0
            });
            $makisu.makisu('close');
        }
        $.each(slidesAry, function (index, item) {
            if (index === activeIndex) {
                item.id = 'page' + (activeIndex + 1);
                return;
            }
            item.id = null;
        });
    }

    return {
        init: function (index) {
            $swiper.css('display', 'block');

            //->初始化SWIPER实现六个页面之间的切换
            var mySwiper = new Swiper('.swiper-container', {
                effect: 'coverflow',
                onTransitionEnd: change,
                onInit: change
            });
            index = index || 0;
            mySwiper.slideTo(index, 0);

            //->给返回按钮绑定单击事件
            $return.singleTap(function () {
                $swiper.css('display', 'none');
                $('#cube').css('display', 'block');
            });
        }
    }
})();

var urlObj = window.location.href.queryURLParameter(),
    page = parseFloat(urlObj['page']);

if (page === 0 || isNaN(page)) {
    loadingRender.init();
}

if (page === 1) {
    phoneRender.init();
}

if (page === 2) {
    messageRender.init();
}

if (page === 3) {
    cubeRender.init();
}

if (page == 4) {
    swiperRender.init(0);
}

