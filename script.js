// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Button click handlers
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function() {
        console.log('Консультация запрошена');
    });

    // Синхронизация цвета ::after с цветом фона кнопки в реальном времени
    function syncBgColor() {
        const bgColor = getComputedStyle(button).backgroundColor;
        button.style.setProperty('--button-bg-color', bgColor);
        requestAnimationFrame(syncBgColor);
    }
    syncBgColor();

    // Определяем размеры в зависимости от ширины экрана
    function getMoonSizes() {
        const width = window.innerWidth;
        
        if (width <= 600) {
            // Мобильные
            return {
                moonLeft: '0.6rem',
                moonLeftHidden: '1.4rem',
                innerWidth: '3.8rem',
                innerHeight: '4rem',
                innerWidthExpanded: '4rem',
                innerHeightExpanded: '4.2rem',
                innerLeft: '1.4rem',
                innerLeftExpanded: '1.3rem',
                moonRightHidden: '1.4rem',
                moonRight: '0.6rem',
                innerRightPos: '1.4rem',
                innerRightPosExpanded: '1.3rem'
            };
        } else if (width <= 1200) {
            // Планшеты
            return {
                moonLeft: '0.8rem',
                moonLeftHidden: '1.7rem',
                innerWidth: '4.6rem',
                innerHeight: '4.8rem',
                innerWidthExpanded: '4.8rem',
                innerHeightExpanded: '5rem',
                innerLeft: '1.7rem',
                innerLeftExpanded: '1.6rem',
                moonRightHidden: '1.7rem',
                moonRight: '0.8rem',
                innerRightPos: '1.7rem',
                innerRightPosExpanded: '1.6rem'
            };
        } else {
            // Десктоп
            return {
                moonLeft: '0.8rem',
                moonLeftHidden: '1.8rem',
                innerWidth: '4.8rem',
                innerHeight: '5rem',
                innerWidthExpanded: '5rem',
                innerHeightExpanded: '5.2rem',
                innerLeft: '1.8rem',
                innerLeftExpanded: '1.7rem',
                moonRightHidden: '1.8rem',
                moonRight: '0.8rem',
                innerRightPos: '1.8rem',
                innerRightPosExpanded: '1.7rem'
            };
        }
    }

    // Устанавливаем начальные значения CSS переменных для плавной первой анимации
    function setInitialMoonValues() {
        const sizes = getMoonSizes();
        // Левая луна (видна)
        button.style.setProperty('--moon-left', sizes.moonLeft);
        button.style.setProperty('--inner-width', sizes.innerWidth);
        button.style.setProperty('--inner-height', sizes.innerHeight);
        button.style.setProperty('--inner-left', sizes.innerLeft);
        // Правая луна (изначально спрятана за внутренним кругом - он увеличен на 2px)
        button.style.setProperty('--moon-right-pos', sizes.moonRightHidden);
        button.style.setProperty('--inner-right-width', sizes.innerWidthExpanded);
        button.style.setProperty('--inner-right-height', sizes.innerHeightExpanded);
        button.style.setProperty('--inner-right-pos', sizes.innerRightPosExpanded);
    }

    setInitialMoonValues();

    // Обновляем при изменении размера окна
    window.addEventListener('resize', setInitialMoonValues);

    let rightMoonTimeout = null;

    // Анимация луны - левая прячется, правая появляется
    button.addEventListener('mouseenter', function() {
        if (rightMoonTimeout) clearTimeout(rightMoonTimeout);
        const sizes = getMoonSizes();

        // Левая луна прячется (внутренний круг увеличивается на 2px)
        button.style.setProperty('--moon-left', sizes.moonLeftHidden);
        button.style.setProperty('--inner-width', sizes.innerWidthExpanded);
        button.style.setProperty('--inner-height', sizes.innerHeightExpanded);
        button.style.setProperty('--inner-left', sizes.innerLeftExpanded);

        // Правая луна появляется с задержкой (внутренний круг уменьшается)
        rightMoonTimeout = setTimeout(() => {
            button.style.setProperty('--moon-right-pos', sizes.moonRight);
            button.style.setProperty('--inner-right-width', sizes.innerWidth);
            button.style.setProperty('--inner-right-height', sizes.innerHeight);
            button.style.setProperty('--inner-right-pos', sizes.innerRightPos);
        }, 350);
    });

    button.addEventListener('mouseleave', function() {
        if (rightMoonTimeout) clearTimeout(rightMoonTimeout);
        const sizes = getMoonSizes();

        // Правая луна прячется (внутренний круг увеличивается на 2px)
        button.style.setProperty('--moon-right-pos', sizes.moonRightHidden);
        button.style.setProperty('--inner-right-width', sizes.innerWidthExpanded);
        button.style.setProperty('--inner-right-height', sizes.innerHeightExpanded);
        button.style.setProperty('--inner-right-pos', sizes.innerRightPosExpanded);

        // Левая луна появляется с задержкой (внутренний круг уменьшается)
        rightMoonTimeout = setTimeout(() => {
            button.style.setProperty('--moon-left', sizes.moonLeft);
            button.style.setProperty('--inner-width', sizes.innerWidth);
            button.style.setProperty('--inner-height', sizes.innerHeight);
            button.style.setProperty('--inner-left', sizes.innerLeft);
        }, 350);
    });
});

// Footer button handlers
document.querySelectorAll('.footer__button').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        console.log(`Кнопка ${buttonText} нажата`);
        // Здесь можно добавить логику открытия мессенджеров
    });
});

// Перемещение элементов в About секции для мобильных устройств
function rearrangeAboutSection() {
    const aboutContainer = document.querySelector('.about__container');
    const aboutContent = document.querySelector('.about__content');
    const aboutGallery = document.querySelector('.about__gallery');
    const aboutTextSecondary = document.querySelector('.about__text--secondary');
    
    if (!aboutContainer || !aboutContent || !aboutGallery || !aboutTextSecondary) return;
    
    if (window.innerWidth < 600) {
        // Перемещаем вторичный текст после галереи
        if (aboutTextSecondary.parentNode === aboutContent) {
            aboutContainer.insertBefore(aboutTextSecondary, aboutGallery.nextSibling);
        }
    } else {
        // Возвращаем вторичный текст обратно в content
        if (aboutTextSecondary.parentNode === aboutContainer) {
            aboutContent.appendChild(aboutTextSecondary);
        }
    }
}

// Создание слайдера для картинок About секции
function initAboutSlider() {
    const aboutGallery = document.querySelector('.about__gallery');
    if (!aboutGallery) return;

    const images = aboutGallery.querySelectorAll('.about__gallery-image');
    if (images.length === 0) return;

    const isMobile = window.innerWidth < 600;
    const existingSlider = aboutGallery.querySelector('.about__gallery-slider');
    const existingWrapper = aboutGallery.querySelector('.about__gallery-slider-wrapper');

    if (isMobile) {
        // Создаем слайдер если его еще нет
        if (!existingSlider) {
            const slider = document.createElement('div');
            slider.className = 'about__gallery-slider';
            
            const wrapper = document.createElement('div');
            wrapper.className = 'about__gallery-slider-wrapper';
            
            // Клонируем картинки в слайдер
            images.forEach(img => {
                const slide = img.cloneNode(true);
                slide.classList.add('about__gallery-slide');
                wrapper.appendChild(slide);
            });
            
            slider.appendChild(wrapper);
            aboutGallery.innerHTML = '';
            aboutGallery.appendChild(slider);
            
            // Скрываем оригинальные картинки
            images.forEach(img => img.style.display = 'none');
            
            // Запускаем автоматическое переключение
            startAboutSlider(wrapper);
        }
    } else {
        // Удаляем слайдер и возвращаем оригинальные картинки
        if (existingSlider) {
            const slides = existingSlider.querySelectorAll('.about__gallery-slide');
            aboutGallery.innerHTML = '';
            
            slides.forEach(slide => {
                const img = slide.cloneNode(true);
                img.classList.remove('about__gallery-slide');
                aboutGallery.appendChild(img);
            });
        }
    }
}

// Автоматическое переключение слайдов
let aboutSliderInterval = null;

function startAboutSlider(wrapper) {
    if (aboutSliderInterval) {
        clearInterval(aboutSliderInterval);
    }
    
    const slides = wrapper.querySelectorAll('.about__gallery-slide');
    if (slides.length === 0) return;
    
    let currentIndex = 0;
    
    aboutSliderInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        wrapper.style.transform = `translateX(-${currentIndex * 33.333}%)`;
    }, 3000);
}

// Выполняем при загрузке и изменении размера окна
function handleAboutSection() {
    rearrangeAboutSection();
    initAboutSlider();
}

window.addEventListener('load', handleAboutSection);
window.addEventListener('resize', handleAboutSection);

// Слайдер карточек этапов для мобильных
function initStagesSlider() {
    const stagesContent = document.querySelector('.stages__content');
    if (!stagesContent) return;

    const isMobile = window.innerWidth < 600;
    const existingSlider = stagesContent.querySelector('.stages__slider');
    const rows = stagesContent.querySelectorAll('.stages__row');

    if (isMobile) {
        // Скрываем ряды
        rows.forEach(row => row.style.display = 'none');

        // Если слайдер уже есть - выходим
        if (existingSlider) return;

        // Собираем карточки
        const cards = [];
        rows.forEach(row => {
            row.querySelectorAll('.stage-card').forEach(card => cards.push(card));
        });

        if (cards.length === 0) return;

        // Создаём слайдер
        const slider = document.createElement('div');
        slider.className = 'stages__slider';

        const track = document.createElement('div');
        track.className = 'stages__slider-track';

        const dots = document.createElement('div');
        dots.className = 'stages__dots';

        cards.forEach((card, i) => {
            const slide = document.createElement('div');
            slide.className = 'stages__slide';
            slide.appendChild(card.cloneNode(true));
            track.appendChild(slide);

            const dot = document.createElement('div');
            dot.className = 'stages__dot' + (i === 0 ? ' stages__dot--active' : '');
            dot.dataset.index = i;
            dots.appendChild(dot);
        });

        slider.appendChild(track);
        slider.appendChild(dots);
        stagesContent.appendChild(slider);

        // Инициализируем свайп
        initSwipe(slider, track, dots, cards.length);
    } else {
        // На десктопе удаляем слайдер и показываем ряды
        if (existingSlider) {
            existingSlider.remove();
        }
        rows.forEach(row => row.style.display = '');
    }
}

function initSwipe(slider, track, dotsContainer, total) {
    let current = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let autoplayInterval = null;

    const dots = dotsContainer.querySelectorAll('.stages__dot');

    function goTo(index) {
        current = Math.max(0, Math.min(index, total - 1));
        track.style.transform = `translateX(-${current * 100}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('stages__dot--active', i === current);
        });
    }

    function nextSlide() {
        goTo((current + 1) % total);
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    // Touch events
    track.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        track.style.transition = 'none';
        stopAutoplay();
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        const offset = -current * 100 + (diff / slider.offsetWidth) * 100;
        track.style.transform = `translateX(${offset}%)`;
    }, { passive: true });

    track.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        track.style.transition = 'transform 0.3s ease-out';
        
        const diff = currentX - startX;
        const threshold = slider.offsetWidth * 0.2;

        if (diff > threshold && current > 0) {
            goTo(current - 1);
        } else if (diff < -threshold && current < total - 1) {
            goTo(current + 1);
        } else {
            goTo(current);
        }

        startAutoplay();
    });

    // Клик по точкам
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goTo(parseInt(dot.dataset.index));
            startAutoplay();
        });
    });

    goTo(0);
    startAutoplay();
}

window.addEventListener('load', initStagesSlider);
window.addEventListener('resize', initStagesSlider);

