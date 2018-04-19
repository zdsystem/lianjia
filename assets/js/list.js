$(function(){
    //点击搜索框显示对应的历史搜索和热点搜索信息
    $(".search input").click(function(e){
        $('.search-info').show();
        e.stopPropagation();
    })
    //点击其他位置关闭
    $(document).click(function(){
        $('.search-info').hide();
    })
    // 点击户型模式图显示户型图
    $('.house-type').click(function(){
        $(this).parent().addClass('model_active').end().addClass('active');
        $(this).siblings().removeClass('active');
        $('.type-img').slideDown();

    })

    var index = 0;
    //点击右箭头想左移动
    $('.next').click(function(){
        var len = $(this).parent().children('ul').children('li').length - 5;
        if(len > 0){
            //此时右箭头处于激活状态，表示可以点击
            $('.type-img').addClass('type-next-active');
            index++;
            //当点击到最后一张图片时。不能再像后移动图片
            if(index >= len){
                index = len;
                //按钮处于置灰状态
                $(this).parents('.type-img').removeClass('type-next-active');
            }

            $(this).parent('.show-pic').find('ul').animate({'margin-left': -198*index+'px'},'300');
            var left = $(this).parent('.show-pic').find('ul').css('margin-left');
        }
    })
    //点击左箭头想左移动
    $('.pre').click(function(){
        index--;
        if(index < 0){
            index = 0;
        }
        $(this).parents('.type-img').addClass('type-next-active');
        $(this).parent('.show-pic').children('ul').animate({'margin-left': -198*index+'px'},'300');
        if( $(this).parent('.show-pic').children('ul').css('margin-left') <= '0px') {
            $(this).parents('.type-img').removeClass('type-pre-active');
        }

    })

    //点击楼盘模式隐藏户型图
    $('.loupan-type').click(function(){
        $(this).parent().addClass('model_active').end().addClass('active');
        $(this).siblings().removeClass('active');
        $('.type-img').slideUp();

    })

    //懒加载图片
    $(window).scroll(function(){
        $('.lazy').each(function(){
            if ($(this).offset().top < $(window).scrollTop() + $(window).height()) {
                // 切换图片的src地址
                // 图片的真实地址
                var newSrc = $(this).attr('data-src');
                // 切换src地址
                $(this).attr('src', newSrc).hide().fadeIn('fast');
                // 一旦src地址呗切换，下次的循环就没有必要再循环了
                $(this).removeClass('lazy')
            }
        })
    })

    $('.lazy-pic').each(function(){
        if($(this).position().left < $('.type-img').width()){
            var newSrc = $(this).attr('data-src');
            $(this).attr('src', newSrc).hide().fadeIn(300);
            $(this).removeClass('lazy-pic');
        }
    })

    //鼠标移入右侧导航显示隐藏的区域
    $('.side-item a').mouseover(function(){
        var Y  = $(this).css('background-position-y');
        $(this).css({backgroundPositionX: 0, backgroundPositionY: Y} );
        //侧边的其他的都不显示
        $(this).siblings('.side-none').hide();
        //显示当前的
        $(this).siblings('.side-none').show().animate({opacity: 1, right: '38px'} ,300);
    }).mouseout(function(){
        //鼠标移开隐藏所有
        $(this).siblings('.side-none').animate({right: '48px'},3).hide();
        //鼠标移开显示原背景图
        $(this).parent().children('a').css('backgroundPositionX', '-38px')
    })
    //点击页码
    $('.page a').click(function(e){
        //默认隐藏上一页提示，显示页数大于1 之后显示
       if($(this).text() >= 2 || $(this).text() == '下一页' ) {
            $('.pre-page').show();
       } else {
           $('.pre-page').hide();
       }
       //点击改变页数的样式
        $(this).addClass('link_active');
        $(this).parent().siblings('li').children('a').removeClass('link_active');

        //点击页码数加载新的数据
        var page = $(this).text();
            $.get('assets/php/list.php?page=' + page, function (data) {

                var tmp = '';
                data.forEach(function (value, key) {
                    tmp += '<li class="list clear"> <a href="" class="img"> <img class="lazy" src="' + value.img + '" alt=""></a>'
                    tmp += '<div class="info"> <h3 class="title"> <a href="">' + value.title + '</a></h3>';
                    tmp += '<p class="place">'+value.place+'</p>';
                    tmp += '<p class="area">'+value.area+'</p>'
                    tmp += '<div class="desc"><span>'+value.desc1+'车位充足</span><span>'+value.desc2+'</span><span>'+value.desc3+'</span></div>'
                    tmp += ' <div class="state"><span>'+value.state1+'</span><span>'+value.state2+'</span><span>'+value.state3+'</span></div></div>'
                    tmp += '<div class="price clear">均价 <span>' + value.price + '</span> 元/平';
                    tmp += '</div></li>  ';
                })
                $('.detail').html(tmp);
            }, 'json');

    //阻值浏览器默认的a时间
        e.preventDefault();
    })
    //首页底部栏， 鼠标移入链接，显示对应的房子信息
    var footerNav = document.querySelectorAll('.footer-nav a');
    var navDetails = document.querySelectorAll('.nav-detail div');
    var indexFooter = 0;
    for(var i = 0; i <footerNav.length; i++){
        //获取每次对应的导航的索引值
        footerNav[i].index = i;
        //当鼠标移入导航时，触发的事件
        footerNav[i].onmouseenter =function(){
            footerNav[indexFooter].style.background = '#121212';
            navDetails[indexFooter].style.display= 'none';
            //鼠标亦如是对应的索引值
            indexFooter = this.index;
            //当前的导航背景颜色发生改变
            this.style.background = ' #394043';
            navDetails[indexFooter].style.display= 'block'
        }
    }
//点击返回顶部滑动返回到顶部
    window.onscroll = function(){
        var destTop = $('.detail').offset().top + $('.detail .list:eq(0)').outerHeight()/2;
        var  backTop =$('.back-top');
        if(document.documentElement.scrollTop > destTop){
            backTop.show();
        }else {
            backTop.hide();
        }
    }
    $('.back-top a').click(function(){
        $('html,body').animate({
            'scrollTop': 0
        },'slow');
    })

    // 右下角对话框
    $('.dialog .dialog-header').click(function(){
        //点击切换显示对话框
        $(this).next().slideToggle();
        $('.refer').addClass('hidden');
        $(this).children('.option').toggleClass('hidden');
    })

    $('.dialog .help').click(function(){
        $('.refer').toggleClass('hidden');

        $('.refer .option').click(function(){
            $('.refer').addClass('hidden');
        })
    })


})




