$(function() {
    let resizeTimer;
    
    function adjustFooter() {
        const windowHeight = $(window).height();
        const bodyHeight = $('body').height();
        const footerHeight = $('.footer').outerHeight();
        const mainContent = $('.main').outerHeight();
        
        // 确保内容高度足够时不固定footer
        if (mainContent + footerHeight < windowHeight) {
            $('.footer').css({
                'position': 'fixed',
                'bottom': 0,
                'width': '100%'
            });
            $('#wrapper').css('padding-bottom', footerHeight);
        } else {
            $('.footer').css({
                'position': 'relative',
                'width': '100%'
            });
            $('#wrapper').css('padding-bottom', 0);
        }
    }

    // 使用防抖处理resize事件
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(adjustFooter, 250);
    });

    // 页面加载完成后执行
    $(window).on('load', function() {
        adjustFooter();
    });
}); 