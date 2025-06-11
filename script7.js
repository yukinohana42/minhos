document.addEventListener('DOMContentLoaded', () => {

  // --- 1. ヒーローセクションのポップアップアニメーション ---
  const popupElements = document.querySelectorAll('.popup-image');
  const heroVisual = document.querySelector('.visual-column');

  if (heroVisual) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        popupElements.forEach(element => {
          element.classList.add('is-visible');
        });
        observer.unobserve(heroVisual);
      }
    }, { threshold: 0.2 });
    observer.observe(heroVisual);
  }

  // --- 2. Swiper スライダー初期化 ---
  const swiper = new Swiper('.swiper', {
    slidesPerView: 3,
    spaceBetween: 20, // スライド間の余白
    loop: true,      // ループを有効に
    centeredSlides: true, // アクティブなスライドを中央に
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      900: { slidesPerView: 3 },
      700: { slidesPerView: 2 },
      0:   { slidesPerView: 1 }
    }
  });

  // --- 3. サービス紹介セクションのスライドショー ---
  const imageFiles = [
      'images7/Conference.png',
      'images7/round.png',
      'images7/round2.png',
      'images7/study.png',
  ];
  const intervalTime = 3000; // 3秒ごとに画像を切り替える
  const slides = document.querySelectorAll('.slide');

  if (slides.length > 0 && imageFiles.length > 0) {
    let currentImageIndex = 0;
    let currentSlideIndex = 0;

    slides[currentSlideIndex].style.backgroundImage = `url('${imageFiles[currentImageIndex]}')`;
    slides[currentSlideIndex].classList.add('active');

    if (imageFiles.length > 1 && slides.length > 1) {
      setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % imageFiles.length;
        const nextSlideIndex = (currentSlideIndex + 1) % slides.length;
        slides[nextSlideIndex].style.backgroundImage = `url('${imageFiles[currentImageIndex]}')`;
        slides[nextSlideIndex].classList.add('active');
        slides[currentSlideIndex].classList.remove('active');
        currentSlideIndex = nextSlideIndex;
      }, intervalTime);
    }
  }

  // --- 4. ポップアップ（モーダル）機能 ---
  const openButton = document.querySelector('.modal-open-button');
  const modal = document.getElementById('video-modal');

  if (openButton && modal) {
    const closeButton = modal.querySelector('.modal-close-button');
    openButton.addEventListener('click', () => modal.classList.add('is-open'));
    closeButton.addEventListener('click', () => modal.classList.remove('is-open'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('is-open');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === "Escape" && modal.classList.contains('is-open')) {
        modal.classList.remove('is-open');
      }
    });
  }

  // --- 5. ページ内リンクのスムーズスクロール（汎用版） ---
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  const offset = 80; // 上部に確保したい余白（ピクセル）

  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});