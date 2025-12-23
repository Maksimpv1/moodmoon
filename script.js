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
        // Open modal form
        if (typeof openModal === 'function') {
            openModal();
        }
    });

    // Pressed state handlers
    button.addEventListener('mousedown', function() {
        button.classList.add('button--pressed');
        // Сразу синхронизируем цвет внутренних кругов с цветом нажатой кнопки
        button.style.setProperty('--button-bg-color', '#2C2C2C');
    });

    button.addEventListener('mouseup', function() {
        button.classList.remove('button--pressed');
    });

    button.addEventListener('mouseleave', function() {
        button.classList.remove('button--pressed');
    });

    // Touch support
    button.addEventListener('touchstart', function() {
        button.classList.add('button--pressed');
        button.style.setProperty('--button-bg-color', '#2C2C2C');
    });

    button.addEventListener('touchend', function() {
        button.classList.remove('button--pressed');
    });

    // Синхронизация цвета ::after с цветом фона кнопки в реальном времени
    function syncBgColor() {
        if (!button.classList.contains('button--pressed')) {
            const bgColor = getComputedStyle(button).backgroundColor;
            button.style.setProperty('--button-bg-color', bgColor);
        }
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
    const aboutTextSecondaryMobile = document.querySelector('.about__text--secondary_mobile');
    
    if (!aboutContainer || !aboutContent || !aboutGallery) return;
    
    if (window.innerWidth < 600) {
        // Перемещаем вторичный текст после галереи
        if (aboutTextSecondary && aboutTextSecondary.parentNode === aboutContent) {
            aboutContainer.insertBefore(aboutTextSecondary, aboutGallery.nextSibling);
        }
        if (aboutTextSecondaryMobile && aboutTextSecondaryMobile.parentNode === aboutContent) {
            aboutContainer.insertBefore(aboutTextSecondaryMobile, aboutGallery.nextSibling);
        }
    } else {
        // Возвращаем вторичный текст обратно в content
        if (aboutTextSecondary && aboutTextSecondary.parentNode === aboutContainer) {
            aboutContent.appendChild(aboutTextSecondary);
        }
        if (aboutTextSecondaryMobile && aboutTextSecondaryMobile.parentNode === aboutContainer) {
            aboutContent.appendChild(aboutTextSecondaryMobile);
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
    const row = stagesContent.querySelector('.stages__row');

    if (isMobile) {
        // Скрываем ряд
        if (row) row.style.display = 'none';

        // Если слайдер уже есть - выходим
        if (existingSlider) return;

        // Собираем карточки из одной строки
        const cards = [];
        if (row) {
            row.querySelectorAll('.stage-card').forEach(card => cards.push(card));
        }

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
        // На десктопе удаляем слайдер и показываем ряд
        if (existingSlider) {
            existingSlider.remove();
        }
        if (row) row.style.display = '';
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

// ==================== MODAL ====================
const modal = document.getElementById('contactModal');
const modalForm = document.getElementById('modalForm');
const modalSuccess = document.getElementById('modalSuccess');
const consultForm = document.getElementById('consultForm');
const modalCloseBtn = document.getElementById('modalClose');
const modalCloseSuccessBtn = document.getElementById('modalCloseSuccess');
const modalOverlay = document.querySelector('.modal__overlay');

function openModal() {
    modal.classList.add('modal--open');
    modalForm.classList.add('modal__content--active');
    modalSuccess.classList.remove('modal__content--active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('modal--open');
    modalForm.classList.remove('modal__content--active');
    modalSuccess.classList.remove('modal__content--active');
    document.body.style.overflow = '';
    // Reset form
    if (consultForm) {
        consultForm.reset();
    }
}

function showSuccess() {
    modalForm.classList.remove('modal__content--active');
    modalSuccess.classList.add('modal__content--active');
}

// Close modal on button click
if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
}
if (modalCloseSuccessBtn) {
    modalCloseSuccessBtn.addEventListener('click', closeModal);
}

// Close modal on overlay click
if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal--open')) {
        closeModal();
    }
});

// Form submit
if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you can add form data sending logic
        showSuccess();
    });
}

// ==================== KNOWHOW GALLERY SLIDER ====================
function initKnowhowGallery() {
    const gallery = document.querySelector('.knowhow__gallery');
    if (!gallery) return;

    const track = gallery.querySelector('.knowhow__gallery-track');
    const dots = gallery.querySelectorAll('.knowhow__dot');
    const images = gallery.querySelectorAll('.knowhow__gallery-image');
    
    if (!track || images.length === 0) return;

    const total = images.length;
    let current = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let autoplayInterval = null;

    function goTo(index) {
        current = Math.max(0, Math.min(index, total - 1));
        // Учитываем gap между слайдами
        const slideWidth = images[0].offsetWidth;
        const gap = 20; // 2rem = 20px
        const offset = current * (slideWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('knowhow__dot--active', i === current);
        });
    }

    function nextSlide() {
        goTo((current + 1) % total);
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    const gap = 20; // 2rem = 20px

    function getSlideOffset() {
        const slideWidth = images[0].offsetWidth;
        return current * (slideWidth + gap);
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
        const offset = getSlideOffset() - diff;
        track.style.transform = `translateX(-${offset}px)`;
    }, { passive: true });

    track.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        track.style.transition = 'transform 0.5s ease-out';
        
        const diff = currentX - startX;
        const threshold = gallery.offsetWidth * 0.15;

        if (diff > threshold && current > 0) {
            goTo(current - 1);
        } else if (diff < -threshold && current < total - 1) {
            goTo(current + 1);
        } else {
            goTo(current);
        }

        startAutoplay();
    });

    // Mouse drag events
    let mouseStartX = 0;
    let mouseCurrentX = 0;
    let isMouseDragging = false;

    track.addEventListener('mousedown', (e) => {
        isMouseDragging = true;
        mouseStartX = e.clientX;
        track.style.transition = 'none';
        track.style.cursor = 'grabbing';
        stopAutoplay();
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isMouseDragging) return;
        mouseCurrentX = e.clientX;
        const diff = mouseCurrentX - mouseStartX;
        const offset = getSlideOffset() - diff;
        track.style.transform = `translateX(-${offset}px)`;
    });

    document.addEventListener('mouseup', () => {
        if (!isMouseDragging) return;
        isMouseDragging = false;
        track.style.transition = 'transform 0.5s ease-out';
        track.style.cursor = 'grab';
        
        const diff = mouseCurrentX - mouseStartX;
        const threshold = gallery.offsetWidth * 0.15;

        if (diff > threshold && current > 0) {
            goTo(current - 1);
        } else if (diff < -threshold && current < total - 1) {
            goTo(current + 1);
        } else {
            goTo(current);
        }

        startAutoplay();
    });

    // Dot clicks
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goTo(parseInt(dot.dataset.index));
            startAutoplay();
        });
    });

    // Initial setup
    track.style.cursor = 'grab';
    goTo(0);
    startAutoplay();
}

// Слайдер для картинок Equipment Homes
function initEquipmentHomesSlider() {
    const equipmentGallery = document.querySelector('.equipment-homes__gallery');
    if (!equipmentGallery) return;

    const images = equipmentGallery.querySelectorAll('.equipment-homes__gallery-image');
    if (images.length === 0) return;

    const isMobile = window.innerWidth < 600;
    const existingSlider = equipmentGallery.querySelector('.equipment-homes__gallery-slider');

    if (isMobile) {
        // Создаем слайдер если его еще нет
        if (!existingSlider) {
            const slider = document.createElement('div');
            slider.className = 'equipment-homes__gallery-slider';
            
            const wrapper = document.createElement('div');
            wrapper.className = 'equipment-homes__gallery-slider-wrapper';
            
            // Клонируем картинки в слайдер
            images.forEach(img => {
                const slide = document.createElement('div');
                slide.className = 'equipment-homes__gallery-slide';
                const imgClone = img.cloneNode(true);
                slide.appendChild(imgClone);
                wrapper.appendChild(slide);
            });
            
            slider.appendChild(wrapper);
            equipmentGallery.innerHTML = '';
            equipmentGallery.appendChild(slider);
            
            // Запускаем автоматическое переключение
            startEquipmentHomesSlider(wrapper);
        }
    } else {
        // Удаляем слайдер и возвращаем оригинальные картинки
        if (existingSlider) {
            const slides = existingSlider.querySelectorAll('.equipment-homes__gallery-slide');
            equipmentGallery.innerHTML = '';
            
            slides.forEach(slide => {
                const img = slide.querySelector('img');
                if (img) {
                    img.classList.add('equipment-homes__gallery-image');
                    img.classList.remove('equipment-homes__gallery-slide');
                    equipmentGallery.appendChild(img);
                }
            });
        }
    }
}

// Автоматическое переключение слайдов Equipment Homes
let equipmentHomesSliderInterval = null;

function startEquipmentHomesSlider(wrapper) {
    if (equipmentHomesSliderInterval) {
        clearInterval(equipmentHomesSliderInterval);
    }
    
    const slides = wrapper.querySelectorAll('.equipment-homes__gallery-slide');
    if (slides.length === 0) return;
    
    let currentIndex = 0;
    
    equipmentHomesSliderInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        wrapper.style.transform = `translateX(-${currentIndex * 25}%)`;
    }, 3000);
}

// Выполняем при загрузке и изменении размера окна
function handleEquipmentHomesSection() {
    initEquipmentHomesSlider();
}

window.addEventListener('load', handleEquipmentHomesSection);
window.addEventListener('resize', handleEquipmentHomesSection);

window.addEventListener('load', initKnowhowGallery);

// ==================== RETAIL GALLERY SLIDER ====================
function initRetailGallerySlider() {
    const gallery = document.querySelector('.retail-gallery__gallery');
    const container = document.querySelector('.retail-gallery__container');
    if (!gallery || !container) return;

    const images = gallery.querySelectorAll('.retail-gallery__image');
    if (images.length === 0) return;

    const isMobile = window.innerWidth < 600;
    const existingSlider = container.querySelector('.retail-gallery__slider');

    if (isMobile) {
        // Скрываем обычную галерею
        gallery.style.display = 'none';

        // Создаем слайдер если его еще нет
        if (!existingSlider) {
            const slider = document.createElement('div');
            slider.className = 'retail-gallery__slider';

            const track = document.createElement('div');
            track.className = 'retail-gallery__slider-track';

            const dots = document.createElement('div');
            dots.className = 'retail-gallery__dots';

            images.forEach((img, i) => {
                const slide = document.createElement('div');
                slide.className = 'retail-gallery__slider-slide';
                const imgClone = img.cloneNode(true);
                slide.appendChild(imgClone);
                track.appendChild(slide);

                const dot = document.createElement('div');
                dot.className = 'retail-gallery__dot' + (i === 0 ? ' retail-gallery__dot--active' : '');
                dot.dataset.index = i;
                dots.appendChild(dot);
            });

            slider.appendChild(track);
            slider.appendChild(dots);
            container.appendChild(slider);

            // Инициализируем свайп
            initRetailSwipe(slider, track, dots, images.length);
        }
    } else {
        // На десктопе показываем галерею и удаляем слайдер
        gallery.style.display = '';
        if (existingSlider) {
            existingSlider.remove();
        }
    }
}

function initRetailSwipe(slider, track, dotsContainer, total) {
    let current = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let autoplayInterval = null;

    const dots = dotsContainer.querySelectorAll('.retail-gallery__dot');

    function goTo(index) {
        current = Math.max(0, Math.min(index, total - 1));
        track.style.transform = `translateX(-${current * 100}%)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle('retail-gallery__dot--active', i === current);
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
        track.style.transition = 'transform 0.5s ease-out';

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

window.addEventListener('load', initRetailGallerySlider);
window.addEventListener('resize', initRetailGallerySlider);
