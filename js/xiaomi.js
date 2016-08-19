var oDiv = document.getElementById('shopCart');
var shopText = oDiv.getElementsByTagName('div')[0];
var searchInp = document.getElementById('search');
var searchList = document.getElementById('searchList');
var glass = document.getElementById('glass');
var product = document.getElementById('product');
var header = document.getElementById('header');
var oUl = header.getElementsByTagName('ul')[0];
var aLi = utils.getByClass(oUl, 'aLi');
var aA = utils.getByClass(oUl, 'pro');
var phoneHidden = utils.getByClass(oUl, 'phoneHidden');


//购物车
oDiv.onmouseover = function () {
    zhufengAnimate(shopText, {height: 98, zIndex: 15, display: 'block'}, 200, 5)
};
oDiv.onmouseout = function () {
    zhufengAnimate(shopText, {height: 0, display: 'none'}, 150);
};
//购物车结束
//搜索框
searchInp.onfocus = function () {
    //utils.css(searchList,'display','block');
    //searchList.style.display='block';
    //searchList.style.display='none'?'block':'none';
    if (searchList.style.display = 'none') {
        searchList.style.display = 'block'
    } else {
        searchList.style.display = 'none'
    }
    utils.css(glass, 'borderColor', '#ff6700');
    zhufengAnimate(product, {display: 'none'}, 200)
};
document.body.onclick = function () {
    //utils.css(searchList,'display','none');
    searchList.style.display = 'none';
    utils.css(glass, 'borderColor', '#e0e0e0');
    zhufengAnimate(product, {display: 'block'}, 200)
};
searchInp.onclick = function (e) {
    e = e || window.event;
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
};
//搜索框
//导航栏
for (var i = 0; i < aA.length; i++) {
    (function (index) {
        for (var k = 0; k < phoneHidden.length; k++) {
            aA[index].onmouseover = function () {
                utils.css(phoneHidden[index], 'zIndex', '11');
                zhufengAnimate(phoneHidden[index], {display: 'block'}, 200, 5)
            };
            aA[index].onmouseout = function () {
                utils.css(phoneHidden[index], 'zIndex', '11');
                zhufengAnimate(phoneHidden[index], {display: 'none'}, 200, 5)
            };
        }
    })(i);
}
//导航栏
//轮播图
(function () {
    var autoMove = document.getElementById('autoMove');
    //var posit=document.getElementById('autoMove');
    var aList = autoMove.getElementsByTagName('li');
    var aImg = autoMove.getElementsByTagName('img');
    var bannerPoint = document.getElementById('bannerTip');
    var aTip = bannerPoint.getElementsByTagName('li');
    var handChange = document.getElementById('handChange');
    var aBtnLeft = handChange.getElementsByTagName('a')[0];
    var aBtnRight = handChange.getElementsByTagName('a')[1];
    var step = 0;
    var interval = 3000;
    var data = null;
    //1
    getData();
    function getData() {
        var xml = new XMLHttpRequest;
        xml.open('get', 'json/data.txt?=' + Math.random(), false);
        xml.onreadystatechange = function () {
            if (xml.readyState === 4 && /^2\d{2}$/.test(xml.status)) {
                data = utils.jsonParse(xml.responseText);
                //console.log(data)
            }
        };
        xml.send(null);
    }

    //2
    bind();
    function bind() {
        var str1 = '', str2 = '';
        for (var i = 0; i < data.length; i++) {
            str1 += '<li><a href="javascript:;"><img realImg="' + data[i].imgSrc + '" alt=""/></a></li>';
            str2 += i === 0 ? '<li class="bg"></li>' : '<li></li>';
        }
        autoMove.innerHTML = str1;
        bannerPoint.innerHTML = str2;
    }

    //3
    lazyImg();
    function lazyImg() {
        for (var i = 0; i < aImg.length; i++) {
            (function (index) {
                var tmpImg = new Image;
                tmpImg.src = aImg[index].getAttribute('realImg');
                tmpImg.onload = function () {
                    aImg[index].src = this.src;
                    utils.css(aList[0], 'zIndex', 1);
                    zhufengAnimate(aList[0], {opacity: 1}, 500);
                }
            })(i);
        }
    }

    //4
    clearInterval(autoTimer);
    var autoTimer = setInterval(autoMoveBanner, interval);

    function autoMoveBanner() {
        if (step >= aList.length - 1) {
            step = -1;
        }
        step++;
        setBanner();
    }

    function setBanner() {
        for (var i = 0; i < aList.length; i++) {
            var curEle = aList[i];
            if (i === step) {
                utils.css(curEle, 'zIndex', 3);
                zhufengAnimate(curEle, {opacity: 1}, 1000, function () {
                    var siblings = utils.siblings(this);
                    for (var k = 0; k < siblings.length; k++) {
                        utils.css(siblings[k], 'opacity', 0);
                    }
                });
            } else {
                utils.css(curEle, 'zIndex', 0);
            }
        }
        bannerTip();
    }

    //5
    function bannerTip() {
        for (var i = 0; i < aTip.length; i++) {
            aTip[i].className = i === step ? 'bg' : '';
        }
    }

    //6
    bannerPoint.onmousemove = aBtnLeft.onmousemove = aBtnRight.onmousemove = autoMove.onmousemove = function () {
        clearInterval(autoTimer);
    };
    bannerPoint.onmouseout = aBtnLeft.onmouseout = aBtnRight.onmouseout = autoMove.onmouseout = function () {
        autoTimer = setInterval(autoMoveBanner, interval);
    };
    //7
    handChangeTip();
    function handChangeTip() {
        for (var i = 0; i < aTip.length; i++) {
            (function (index) {
                aTip[index].onclick = function () {
                    step = index;
                    setBanner();
                }
            })(i);
        }
    }

    //8
    aBtnLeft.onclick = function () {
        if (step <= 0) {
            step = aTip.length;
        }
        step--;
        setBanner();
    };
    aBtnRight.onclick = autoMoveBanner;
})();
//轮播图
//盒子阴影
(function () {
    function box(curEle) {
        for (var i = 0; i < curEle.length; i++) {
            curEle[i].onmouseover = function () {
                zhufengAnimate(this, {boxShadow: '0 15px 40px rgba(0,0,0,.1)', top: -2}, 50)
            };
            curEle[i].onmouseout = function () {
                zhufengAnimate(this, {boxShadow: '0 15px 40px rgba(0,0,0,0)', top: 0}, 50)
            }
        }
    }

    window.myBoxShadow = box;
})();
var videoList = document.getElementById('videoList');
var video = utils.getByClass(videoList, 'videoItem');
myBoxShadow(video);

//左右切换轮播图
(function () {
    var around = document.getElementById('bannerInf');
    var left=document.getElementById('semi').getElementsByTagName('a')[0];
    var right=document.getElementById('semi').getElementsByTagName('a')[1];
    var oUl = around.getElementsByTagName('ul')[0];
    var step = 0;
    var interval = 5000;
    clearInterval(autoTimer);
    var autoTimer = setInterval(autoMove, interval);
    function autoMove() {
        if (step >= 1) {
            step = -1;
        }
        step++;
        setBanner();
        console.log(step)
    }
    function setBanner() {
        step === 0 ? zhufengAnimate(oUl, {marginLeft: '0'}, 300) : zhufengAnimate(oUl, {marginLeft: '-1226'}, 300)
    }
    left.onclick=function(){
        step=0;
        clearInterval(autoTimer);
        setBanner();

    };
    right.onclick=function(){
        clearInterval(autoTimer);
        step=1;
        setBanner();
    };
})();
//左右切换轮播图
//手动切换轮播图
(function () {
    function lj(id) {
        var win = document.getElementById(id);
        var oDiv = utils.getByClass(win, 'handChange')[0];
        var aLeft = oDiv.getElementsByTagName('a')[0];
        var aRight = oDiv.getElementsByTagName('a')[1];
        var aLi = win.getElementsByTagName('li');
        var span = win.getElementsByTagName('span');
        var step = 0;

        function bannerTip() {
            for (var i = 0; i < aLi.length; i++) {
                i === step ? aLi[i].className = 'bg' : aLi[i].className = '';
            }
        }

        handleChange();
        function handleChange() {
            for (var i = 0; i < aLi.length; i++) {
                aLi[i].index = i;
                aLi[i].onclick = function () {
                    step = this.index;
                    zhufengAnimate(win, {marginLeft: -step * 296}, 500);
                    bannerTip();
                }
            }
        }

        aRight.onclick = function () {
            step++;
            if (step >= aLi.length - 1) {
                step = aLi.length - 1;
            }
            zhufengAnimate(win, {marginLeft: -step * 296}, 500);
            bannerTip();
        };
        aLeft.onclick = function () {
            step--;
            if (step <= 0) {
                step = 0;
            }
            zhufengAnimate(win, {marginLeft: -step * 296}, 500);
            bannerTip();
        }
    }

    window.ljBanner = lj;
})();
ljBanner('window');
ljBanner('window2');
ljBanner('window3');
ljBanner('window4');

//手动切换轮播图
//米兔推荐
(function () {
    var banner = document.getElementById('rabbit');
    var oUl = banner.getElementsByTagName('ul')[0];
    var left = document.getElementById('rabbitInfo').getElementsByTagName('a')[0];
    var right = document.getElementById('rabbitInfo').getElementsByTagName('a')[1];
    var step = 0;

    function RR() {
        if (step >= 3) {
            step = 3;
            return;
        }
        step++;
        zhufengAnimate(oUl, {marginLeft: step * -1226 + 'px'}, 100);
    }

    right.onclick = RR;
    function LL() {
        if (step == 0) {
            step = 0;
            return;
        }
        step--;
        zhufengAnimate(oUl, {marginLeft: step * -1226 + 'px'}, 100);
    }

    left.onclick = LL;
    left.onmouseover = function () {
        if (step == 0) {
            utils.css(left, {cursor: 'default'});
            utils.removeClass(left, 'bg');
            return;
        }
        utils.addClass(left, 'bg');
        utils.css(left, {cursor: 'pointer'})
    };
    left.onmouseout = function () {
        utils.removeClass(left, 'bg')
    };
    right.onmouseover = function () {
        if (step == 3) {
            utils.css(right, {cursor: 'default'});
            utils.removeClass(right, 'bg');
            return;
        }
        utils.addClass(right, 'bg');
        utils.css(right, {cursor: 'pointer'});
    };
    right.onmouseout = function () {
        utils.removeClass(right, 'bg')
    };
})();
//米兔推荐
//搭配选项卡
var oLi = document.getElementById('tabList').getElementsByTagName('li');

var oU = document.getElementById('unset').getElementsByTagName('ul');
for (var t = 0; t < oLi.length; t++) {
    oLi[t].index=t;
    oLi[t].onmousemove = function () {
        for (var k = 0; k < oU.length; k++) {
            oLi[k].className = '';
            oU[k].className = '';
        }
        oLi[this.index].className = 'bg';
        oU[this.index].className = 'show';
    }
}
//搭配选项卡








