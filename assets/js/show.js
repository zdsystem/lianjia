$(function () {
    //点击项目地址展示地图
    $('.addr').click(function (e) {
        $(this).children('.out').show();
        e.stopPropagation();
    })
    //点击关闭按钮
    $('.closed').click(function (e) {
        e.stopPropagation()
        $('.out').hide();
    })
    //点击最新开盘弹出提示细腻
    $('.time').click(function (e) {
        $('.time-item').show();
        e.stopPropagation();
    })
    $('.time-item .closed').click(function () {
        $('.time-item').hide();
    })
    /*点击户型切换展示的内容*/
    $('.house-type .floor-title').find('span').click(function () {
        $(this).siblings('span').removeClass('fontColor').end().addClass('fontColor');
        $('.element').eq($(this).index()).removeClass('hidden').end().eq($(this).index()).siblings('.element').addClass('hidden');
    })

    //定义空数组，用来判断滚动的距离在哪个范围内
    var arr = [];
    //获取每个楼层到页面的距离
    $('.floor').each(function () {
        arr.push($(this).offset().top + $(this).height());
    })
    //追加初始位置
    arr.unshift(0);
    //[0, 1050, 1656, 1985.5, 2608, 3291, 3830, 4449, 4862, 5199.5]
    $(window).scroll(function () {
        //当窗口滚动到一定距离时，导航栏固定在页面顶部
        if ($(window).scrollTop() >= $('.content').offset().top) {
            //屏幕滚动到一定距离时显示返回顶部的标志
            $('.back-top').show();
            $('.scroll-nav').css({'position': 'fixed', 'top': '-15px', 'z-index': '999', 'width': '1000px'});
        } else {
            $('.back-top').hide();
            $('.scroll-nav').css({'position': 'relative', 'top': '0',})
        }
        //屏幕滚动对应的楼层导航显示对应的背景颜色
        //当前屏幕的滚动距离
        var top = $(window).scrollTop();
        for (var i = 0; i < arr.length-3; i++) {
            if (arr[i] <= top && top < arr[i + 1]) {
                //除当前外其他的里去除字体颜色
                $('.scroll-nav').find('li').eq(i).siblings().removeClass('nav-item');
               //当前字体颜色为白色
                $('.scroll-nav').find('li').eq(i).addClass('nav-item');
                //设置背景颜色的的左偏移值
                var bgLeft = $('.scroll-nav').find('li').eq(i).position().left;
                $('.nav-active').css('left', bgLeft);
                //三角形移动的偏移值
                var moveLeft = $('.item').outerWidth() / 2 + $('.item').eq(i).position().left;
                $('.move').css('left', moveLeft);
            }
        }
    })
    $('a').click(function (e) {
        // e.preventDefault();
    })

    //楼栋信息点击拖动图片查看


    //点击返回顶部
    $('.back-top').click(function(){
        $('html, body').animate({'scrollTop': 0}, 'slow');
    })
    //点击图片弹出窗口左右切换查看户型
    $('.model-show').click(function(){
        $('.model-wrap').hide().fadeIn();
    })
    //点击右上角按钮关闭
    $('.mclose').click(function(){
        $('.model-wrap').fadeOut()
    })
    var index = 0;
    var len = $('.model-list li').length;
    //点击右按钮切换到下一张图片
    $('.right-arrow').click(function(){
        index++;
        if(index >= len){
            index = len - 1;
        }
        $('.model-list').css('margin-left', -1000*index +'px');
    })
    //点击左按钮切换到上一上图片
    $('.left-arrow').click(function(){
        index--;
        if(index < 0){
            index = 0;
        }
        $('.model-list').css('margin-left', -1000*index +'px');
    })

    $('.rim a').click(function(e){
        $(this).parent().siblings().children('a').removeClass('link_active');
        $(this).addClass('link_active');
        e.preventDefault();
    })

    //点击添加关注
    $('.add-focus').click(function(){

        if($(this).text() == '添加关注'){
            $(this).text('取消关注');
            $(this).css('backgroundColor', '#ddd');
        }else{
            $(this).text('添加关注');
            $(this).css('backgroundColor', '#fbfbfb');
        }
    });
    //在线咨询块
    $('.dialog .dialog-header').click(function () {
        //点击切换显示对话框
        $(this).next().slideToggle();
        $('.refer').addClass('hidden');
        $(this).children('.option').toggleClass('hidden');
    })
    $('.dialog .help').click(function () {
        $('.refer').toggleClass('hidden');

        $('.refer .option').click(function () {
            $('.refer').addClass('hidden');
        })
    })

    //   点击添加全部评论背景颜色
    $('.said-num a').click(function () {;
        $(this).toggleClass('numActive');
    })
    //点击方框切换本息和本金
    $('.exchange').click(function () {
        $('.exchange').removeClass('type-active');;
        $(this).addClass('type-active');
    })
    //点击切换首付成数和贷款类别以及时间
    $('.each-item  a').click(function(e){
        //获取点击对应文本信息
        var text = $(this).text();
        //写入到显示框中
        $(this).parents().children('.show').text(text);
        e.preventDefault();
    })
   // $('.each-item span').text($('.checked').text());
    //首页底部栏， 鼠标移入链接，显示对应的房子信息
    var footerNav = document.querySelectorAll('.footer-nav a');
    var navDetails = document.querySelectorAll('.nav-detail div');
    var indexFooter = 0;
    for (var i = 0; i < footerNav.length; i++) {
        //获取每次对应的导航的索引值
        footerNav[i].index = i;
        //当鼠标移入导航时，触发的事件
        footerNav[i].onmouseenter = function () {
            footerNav[indexFooter].style.background = '#121212';
            navDetails[indexFooter].style.display = 'none';
            //鼠标亦如是对应的索引值
            indexFooter = this.index;
            //当前的导航背景颜色发生改变
            this.style.background = ' #394043';
            navDetails[indexFooter].style.display = 'block'
        }
    }
})

window.onload = function(){
    var drag = document.querySelector('.tower .intro');
    var wrap = document.querySelector('.tower');
    var imgOut = document.querySelector('.tower .img')
    imgOut.onmousedown = function(e){
        drag.onmousemove = function(e){
            var diffX =  e.clientX - wrap.offsetLeft -  30 - imgOut.offsetWidth/2;
            var diffY = e.pageY - wrap.offsetTop -30 -  imgOut.offsetHeight /2 ;
            var left=diffX;
            var top=diffY;
            if(left>0 ){
                left=0;
            }else if(left < imgOut.offsetWidth-drag.offsetWidth){
                left = imgOut.offsetWidth-drag.offsetWidth;
            }
            if(top>0){
                top=0;
            }else if(top < imgOut.offsetHeight-drag.offsetHeight){
                top = imgOut.offsetHeight-drag.offsetHeight;
            }
            drag.style.left = left+ 'px';
            drag.style.top = top + 'px';
        }
    }
}
