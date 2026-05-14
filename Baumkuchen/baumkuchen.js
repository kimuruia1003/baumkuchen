// 1. スクロールバーの処理
const handleScroll = () => {
    const yOffset = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight;
    const viewHeight = document.documentElement.clientHeight;
    const percentage = (yOffset / (totalHeight - viewHeight)) * 100;
    document.querySelector('#bar').style.width = `${percentage}%`;
};
// スクロールイベントのパフォーマンス向上のため { passive: true } を追加
window.addEventListener('scroll', handleScroll, { passive: true });

// 2. 共通のキーフレーム（全アニメーションで共通するため定数化）
const fadeFrames = [
    { opacity: 0, offset: 0.7 },
    { opacity: 1, offset: 1 }
];

// 3. ギャラリーアイテムのアニメーションを共通関数化
const animateItems = (selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, i) => {
        el.animate(fadeFrames, {
            duration: 1000,
            easing: 'ease-out',
            delay: i * 300,
            fill: 'forwards',
        });
    });
};

// 関数を呼び出して実行
animateItems('.gallery-item');
animateItems('.gallery-item2');

// 4. #show の IntersectionObserver
const observer1 = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.animate(fadeFrames, {
                duration: 2000,
                easing: 'ease-out',
                fill: 'forwards',
            });
            obs.unobserve(entry.target);
        }
    });
});
const showElement = document.querySelector('#show');
if (showElement) observer1.observe(showElement); // 要素が存在する場合のみ監視

// 5. #show2 の IntersectionObserver と .feature のアニメーション
const features = document.querySelectorAll('.feature');
const observer2 = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // isIntersecting が true の場合のみループ処理を実行
            features.forEach((feature, i) => {
                feature.animate(fadeFrames, {
                    duration: 2000,
                    easing: 'ease-out',
                    delay: i * 1000,
                    fill: 'forwards',
                });
            });
            obs.unobserve(entry.target);
        }
    });
});
const show2Element = document.querySelector('#show2');
if (show2Element) observer2.observe(show2Element);