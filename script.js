// DOMコンテンツ読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ニュースティッカー
    const newsTicker = document.querySelector('.news-ticker');
    if (newsTicker) {
        let newsItems = [
            { date: '2024-03-20', title: '最新のお知らせ：2024年度イノベーション賞を受賞' },
            { date: '2024-03-15', title: '年次技術カンファレンスを開催しました' },
            { date: '2024-03-10', title: '新製品発表会を実施しました' }
        ];
        
        let currentIndex = 0;
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % newsItems.length;
            newsTicker.innerHTML = `
                <span class="news-date">${newsItems[currentIndex].date}</span>
                <span class="news-title">${newsItems[currentIndex].title}</span>
            `;
        }, 5000);
    }

    // スクロール時のヘッダー処理
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        const currentScroll = window.pageYOffset;
        const headerHeight = header.offsetHeight;

        // 在页面顶部时
        if (currentScroll <= headerHeight) {
            header.style.transform = 'translateY(0)';
            header.classList.remove('scrolled');
            return;
        }

        // 向下滚动时，页眉消失
        if (currentScroll > lastScroll && currentScroll > headerHeight) {
            header.style.transform = `translateY(-${headerHeight}px)`;
        } 
        // 向上滚动时，页眉出现
        else {
            header.style.transform = 'translateY(0)';
            if (currentScroll > headerHeight) {
                header.classList.add('scrolled');
            }
        }

        lastScroll = currentScroll;
    });

    // 确保页眉在滚动到顶部时可以点击
    document.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.pageYOffset === 0) {
            header.style.pointerEvents = 'auto';
        }
    });

    // スクロールトップボタン
    const scrollToTopButton = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.add('show');
        } else {
            scrollToTopButton.classList.remove('show');
        }
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // モバイルメニューの制御
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileMenuToggle.innerHTML = mobileMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // 画面外クリックでメニューを閉じる
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // モバイルドロップダウンの制御
    document.querySelectorAll('.mobile-dropdown').forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const submenu = dropdown.querySelector('.mobile-submenu');
        
        if (link && submenu) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                submenu.style.display = 
                    submenu.style.display === 'block' ? 'none' : 'block';
            });
        }
    });

    // 图片懒加载
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // 平滑滚动增强
    function smoothScroll(target, duration) {
        const targetPosition = target.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }
}); 