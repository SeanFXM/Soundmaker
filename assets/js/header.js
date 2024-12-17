$(function() {
    let lastScrollTop = 0;
    let headerHeight = $('.header').outerHeight();
    let ticking = false;

    // 优化滚动性能
    $(window).scroll(function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const st = $(window).scrollTop();
                
                // 仅在滚动距离大于header高度时触发隐藏
                if (st > headerHeight) {
                    if (st > lastScrollTop) {
                        $('.header').css({
                            'transform': 'translateY(-100%)',
                            'transition': 'transform 0.3s ease'
                        });
                    } else {
                        $('.header').css({
                            'transform': 'translateY(0)',
                            'transition': 'transform 0.3s ease'
                        });
                    }
                } else {
                    // 滚动到顶部时保持显示
                    $('.header').css({
                        'transform': 'translateY(0)',
                        'transition': 'transform 0.3s ease'
                    });
                }
                
                lastScrollTop = st;
                ticking = false;
            });
            
            ticking = true;
        }
    });

    // 优化移动端菜单
    $('.header-menu-btn').on('click', function() {
        $(this).toggleClass('active');
        $('.header-nav').fadeToggle(300).toggleClass('active');
        
        // 阻止菜单打开时页面滚动
        $('body').toggleClass('no-scroll');
    });
}); 