$(function(){
    //点击位置显示弹出框
    $('.place').click(function(){
        $('.city-change .city-detail').addClass('toBig');
        $('.city-change').toggleClass('hidden');

    });
    //点击关闭按钮隐藏弹出框
    $('.close').click(function(){
        $('.city-change').addClass('hidden');
    })
    //阻止冒泡
    $('.city-detail').click(function(e){
        e.stopPropagation();
    })
    //点击其他区域隐藏弹出框
    $('.city-change').click(function(){
        $('.city-change').addClass('hidden');
        // console.log(233)
    })



    //文字上下轮播
    setInterval( function(){
        $('.house-num .num').animate({marginTop: '-35px'},1000,function(){
            $('.num').css('marginTop', 0).children('li:first').appendTo('.num');
        })
    },3000);

    //搜索框点击事件
    //直接点击搜框时的事件
    $('.search input').focus(function(){
        $('.search-show').eq(0).removeClass('hidden');
    }).blur(function(){
        $('.search-show').eq(0).addClass('hidden');
    })
    var indexSearch;
    $('.search-menu li').click(function(){
        var arr = ['请输入区域、商圈或小区名开始找房','请输入楼盘名开始找房','输入地铁站或地铁线可以找地铁附近的房源','请输入小区名开始查找小区','房产知识有疑问，来搜搜吧~']
        //点击鼠标切换字体颜色
        $(this).siblings('li').removeClass('addColor').end().addClass('addColor');
        // $(this).addClass('addColor');
        //获取当前点击对应的索引值
        indexSearch = $(this).index();
        //点击时切换输入框的提示内容
        $('.search input').attr('placeHolder', arr[indexSearch]);

        //点击时三角块移动
        var leftDes = $(this).position().left + $(this).outerWidth()/2 - $('.search-menu i ').outerWidth();
        // console.log(leftDes);'
        $('.search-menu i').animate({left: leftDes},300);
        $('.search input').focus(function(){
            //当前的显示
            $('.search-show').eq(indexSearch).siblings('.search-show').addClass('hidden').end().removeClass('hidden');
        }).blur(function(){
            $('.search-show').eq(indexSearch).addClass('hidden').end().siblings('.search-show').addClass('hidden');;
        })
    })

    //鼠标移入右侧导航显示隐藏的区域
    $('.side-item a').mouseover(function(){
        var Y  = $(this).css('background-position-y');
        if($(this).hasClass('side-cart')){
            $(this).css({backgroundPositionX: 0, backgroundPositionY: '-378px'} );
        }else {
            $(this).css({backgroundPositionX: 0, backgroundPositionY: Y} );
        }
        //侧边的其他的都不显示
        $(this).siblings('.side-none').hide();
        //显示当前的
        $(this).siblings('.side-none').show().animate({opacity: 1, right: '38px'} ,300);
    }).mouseout(function(){
        //鼠标移开隐藏所有
        $(this).siblings('.side-none').animate({right: '48px'},3).hide();
        //鼠标移开显示原背景图
        if($(this).hasClass('side-cart')){
            $(this).parent().children('a').css({backgroundPositionX: '-38px', backgroundPositionY: '-412px'})
        }else {
            $(this).parent().children('a').css('backgroundPositionX', '-38px')
        }
    })

    //点击返回顶部滑动返回到顶部
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
            console.log(23)
        })
    })


    //登录验证 手机号验证规则
    var reg = /^(13[0-9]|14[57]|15[012356789]|17[0135678]|18[0-9]|19[89])\d{8,11}$/;
    //短信验证码规则
    var regMsg = /^[\d]{4,6}$/;
    //图片验证码验证
    var regCode = /^[a-zA-Z0-9]{4}?$/;
    var phoneBool = false;
    var msgBool = false;
    var codeBool = false;

    //点击验证码图片时， 切换图片
    var indexNum = 0;
    $('.code-img').click(function(){
        var numArr = ['02', '03', '04', '05', '06'];
        $(this).attr('src', 'assets/images/index/'+numArr[indexNum]+'.jpeg')
        indexNum++;
        if(indexNum >= numArr.length){
            indexNum =0;
        }
    });
    //点击获取验证码时提示输入手机号
    $('.get-code').click(function(){
        //如果手机号为空/或不正确, 提示输入手机号
        if(($('.tel-phone').val().length <= 0 )){
            $('.num-msg').text('请输入有效手机号');
        }
    })
    //手机号登录
    $('.login-form .login-btn').click(function(){
        //验证手机号
        $('.tel-phone').blur(function(){
            if(reg.test($(this).val()) == true){
                phoneBool = true;
                $('.warn-msg .num-msg').css({'display': 'none','borderColor': '#dbdbdb'});
            }else {
                phoneBool = false;
            }
        })
        //验证手机验证码
        $('.msg-code').blur(function(){
            if(regMsg.test($(this).val()) == true){
                msgBool = true;
            }
        });
        //图片验证码
        $('.ver-code').blur(function(){
            if(regCode.test($(this).val()) == true) {
                codeBool = true;
            }
        })
        //手机号成立
        if($('.tel-phone').val().length > 0){
            if(phoneBool){
                $('.num-msg').text(' ');
                //如果手机号成立,短信码验证栏聚焦 边框颜色改变
                $('.tel-phone').css('border-color','#dbdbdb');
                $('.msg-code').focus();
                if($('.msg-code').val().length > 0){
                    //短信验证码成功
                    if(msgBool){
                        //边框恢复灰色，图片验证码框聚焦
                        $('.msg-code').css('borderColor', '#dbdbdb');
                        $('.ver-code').focus();
                        if($('.ver-code').val().length > 0){
                            //图片验证码成功通过
                            if(codeBool) {
                                codeBool = true;
                                $('.ver-code').css('borderColor', '#dbdbdb');
                                $('.num-msg').text(' ');
                            }
                        } else {
                            //图片验证码为通过
                            $('.num-msg').text('请输入验证码');
                            $('.ver-code').css('borderColor', 'red');
                        }
                    }else{
                        $('.num-msg').text('请输入验证码');
                    }
                }else {
                    //未输入短信验证码提交时
                    $('.msg-code').css('borderColor', 'red').focus();
                    $('.num-msg').text('请输入短信验证码')
                }
            }else {
                //如果手机号不成立， 手机号码栏边框颜色改变 给出提示信息
                $('.tel-phone').css('borderColor', 'red');
                $('.num-msg').text('请输入有效手机号');
            }
        } else {
            //如果手机号不成立， 手机号码栏边框颜色改变 给出提示信息
            $('.tel-phone').css('borderColor', 'red');
            $('.num-msg').text('请输入有效手机号');
        }
    })

    //

    //当验证都为真时，提交表单
    $('.login-form').submit(function(e){
        if(phoneBool && msgBool && codeBool){
            console.log('可以提交表单');
        } else {
            e.preventDefault();
            console.log('信息填写错误');
        }

    })

    //点击关闭登录页面
    $('.closed').click(function(){
        $('.login').hide();
    })

    $('.wrapper').click(function(e){
        e.stopPropagation();
    })

    $('body').click(function(){
        $('.login').hide();
    })



    //账号密码登录块验证
    var pwdBool = false;
    var regPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;
    // var regPwd = /^[0-9a-zA-Z]{8,12}$/;
    $('.password').blur(function(){
        if(regPwd.test($(this).val())){
            pwdBool == true;
            // console.log($(this).val);
        }
    })

    $('.account-form .login-btn').click(function(){
        var pwdVal = $('.password').val();
        var phoneVal = $('.account-phone').val();
        var acctVal = $('.account-code').children('input').val();
        if(phoneVal.length <= 0){
            $('.account-phone').css('borderColor', 'red');
            $('.account-msg').text('请输入有效手机号');

        }else if(reg.test(phoneVal)){
            //手机号验证通过
            $('.account-phone').css('borderColor', '#dbdbdb');
            $('.password').focus().css('borderColor', 'red');
            $('.account-msg').text('请输入密码');
            phoneBool = true;
            //当密码真时 输入图形验证码
            if(pwdVal.length > 0){
                if(regPwd.test(pwdVal) == true){
                    pwdBool = true;
                    $('.account-code').show()
                    $('.account-code  input').focus();
                    $('.password').css('borderColor', '#dbdbdb');
                    $('.account-msg').text('请输图形验证码');
                    //验证输入的图形验证码是否正确
                    if(acctVal.length > 0){
                        if(regCode.test(acctVal) == true){
                            codeBool = true;
                        }else {
                            $('.account-msg').text('验证码格式错误');
                        }
                    }

                } else {
                    $('.password').focus().css('borderColor', 'red');
                    $('.account-msg').text('请输入正确密码');
                }
            }
        }
    })
    $('.account-form').submit(function(e){
       if(pwdBool && phoneBool && codeBool){
           console.log('提交表单');
       }else {
           e.preventDefault();
       }
    })


    //修改密码验证
    $('.change-form .login-btn').click(function(){
        var phoneVal = $('.find-phone').val();
        var codeVal = $('.find-code').val();
        var msgVal = $('.find-msg').val();
        var pwdVal = $('.pwd-find').val();

        if(phoneVal.length > 0){
            //手机号验证正确
            if(reg.test(phoneVal)) {
                phoneBool = true;
                $('.pwd-find').focus();
                $('.find-phone').css('borderColor', '#dbdbdb');
                $('.f-msg').text('请输入不少于8位数的密码（数字+字母）');
                if(pwdVal.length > 0){
                    //密码验证正确
                    if(regPwd.test(pwdVal)){
                        pwdBool = true;
                        $('.find-msg').focus()
                        $('.find-msg').css('borderColor', '#dbdbdb');

                        $('.f-msg').text('请输入短信验证码');
                        if(msgVal.length > 0){
                            //短信验证码正确
                            if(regMsg.test(msgVal)){
                                msgBool = true;
                                $('.find-code').focus().css('borderColor', '#dbdbdb');
                                $('.f-msg').text('请输入图像验证码');
                                if(codeVal.length > 0){
                                    if(regCode.test(codeVal)){
                                        codeBool = true;
                                    }else {
                                        $('.find-code').focus().css('borderColor', 'red');
                                        $('.f-msg').text('验证码格式错误');
                                    }
                                }

                            }else{
                                $('.find-msg').focus().css('borderColor', 'red');
                                $('.f-msg').text('请重新输入正确的验证码');
                            }
                        }
                    } else {
                        $('.pwd-find').css('borderColor', 'red');
                    }
                }

            }
            else{
                $('.find-phone').css('borderColor', 'red');
                $('.f-msg').text('请输入有效的手机号码');
            }
            //未输入手机号时，提示输入手机号
        } else {

            $('.find-phone').css('borderColor', 'red');
            $('.f-msg').text('请输入有效的手机号码');
            // $('.num-msg').show().text('请输入有效的手机号码');
        }
    })
    $('.change-form').submit(function(e){
        if(phoneBool && msgBool && pwdBool && codeBool){
            console.log('提交信息');
        }else {
            e.preventDefault();
        }
    })

//验证手机号是否已被注册
    $('.reg-phone').blur(function(){
        var value = $(this).val();
        if(reg.test(value)){
            get('assets/php/reg.php?phone='+value, function(data){
                if(JSON.parse(data).success == 1){
                    $('.reg-phone').css('borderColor','red');
                    $('.r-msg').text('该手机号已被注册');
                    phoneBool = false;
                } else {
                    $('.reg-phone').css('borderColor','#dbdbdb');
                    $('.r-msg').text('该手号机可注册');
                    phoneBool = true;
                }
            })
        } else {
            $('.reg-phone').css('borderColor','red');
            $('.r-msg').text('请输入有效手号机');
            phoneBool = false;
        }
    }).keydown();
    //注册页面验证效果
    $('.reg-form .login-btn').click(function(){
        var phoneVal = $('.reg-phone').val();
        var codeVal = $('.reg-code').val();
        var msgVal = $('.reg-msg').val();
        var pwdVal = $('.reg-pwd').val();

        if(phoneVal.length > 0 && phoneBool){
            //手机号验证正确
            if(reg.test(phoneVal)) {
                phoneBool = true;
                $('.reg-phone').css('borderColor', '#dbdbdb');
                $('.reg-msg').focus().css('borderColor', 'red');
                $('r-msg').text(' ');
                // console.log(pwdVal);
                if(msgVal.length > 0){
                    //短信验证码验证正确
                    if(regMsg.test(msgVal)){
                        msgBool = true;
                        $('.reg-msg').css('borderColor', '#dbdbdb');
                        $('.reg-pwd').focus();
                        $('.r-msg').text('请输入不少于8位数的密码（数字+字母）');
                        if(pwdVal.length > 0){
                            //密码正确
                            if(regPwd.test(pwdVal)){
                                pwdBool = true;
                                $('.reg-code').focus().css('borderColor', '#dbdbdb');
                                $('.r-msg').text('请输入图像验证码');
                                if(codeVal.length > 0){
                                    if(regCode.test(codeVal)){
                                        codeBool = true;
                                    }else {
                                        $('.reg-code').focus().css('borderColor', 'red');
                                        $('.r-msg').text('验证码格式错误');
                                    }
                                }
                            }else{
                                $('.reg-pwd').focus().css('borderColor', 'red');
                                $('.r-msg').text('密码格式有误，请输入不少于8位数的密码（数字+字母)');
                            }
                        }
                    } else {
                        $('.reg-msg').css('borderColor', 'red');
                        $('.r-msg').text("验证码格式错误");
                    }
                }
            }
            else{
                $('.reg-phone').css('borderColor', 'red');
                $('.r-msg').text('请输入有效的手机号码');
            }
            //未输入手机号时，提示输入手机号
        } else {
            $('.reg-phone').css('borderColor', 'red');
            $('.r-msg').text('请输入有效的手机号码');
        }
    })
    $('.reg-form').submit(function(e){
        if(phoneBool && msgBool && pwdBool && codeBool){
            console.log('提交信息');
        }else {
            e.preventDefault();
        }
    })


    $('.user .log').click(function(e){
        $('.login').show();
        $('.login-phone').show();
        $('.regis').hide();
        e.stopPropagation();
    })
    $('.user .reg').click(function(e){
        e.stopPropagation();
        $('.login').show();
        $('.regis').show();
        $('.login-account').hide();
        $('.login-phone').hide();
        $('.find-pwd').hide();
    })


    //点击登录跳转到登录页面
    $('.link').click(function(){
        $('.regis').hide();
        $('.login').show();
        $('.login-phone').show();
    })
    //点击账号密码登录，切换页面
    $('.account-log').click(function(){
        $('.tel-phone').css('borderColor', '#dbdbdb');
        $('.warn-msg').hide();
        $('.login').show();
        $('.login-phone').toggle();
        $('.login-account').toggle();
        $('.find-pwd').hide();
    })
    //点击按钮显示密码
    $('.look-pwd').click(function(){
        if($(this).prev().attr('type') == 'password'){
            $(this).prev().attr('type','text');
        } else {
            $(this).prev().attr('type','password');
        }

    })
    //点击忘记密码切换页面
    $('.forget').click(function(){
        $('.login-account').hide();
        $('.login-phone').hide();
        $('.find-pwd').show();
    })


    //点击关闭下边栏
    $('.bottom i').click(function(e){
        $('.bottom').hide();
        e.stopPropagation()
    })
    $('.default').click(function(){
        $(this).toggleClass('bg-none');
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
    //滚动事件
    window.onscroll = function(){
        var destTop = document.querySelector('.content-nav').offsetTop + document.querySelector('.content-nav').offsetHeight/2;
        var  backTop = document.querySelector('.back-top');
        if(document.documentElement.scrollTop > destTop){
            backTop.style.display = 'block';
        }else {
            backTop.style.display = 'none';
        }
    }
})


