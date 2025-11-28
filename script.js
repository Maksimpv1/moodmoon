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
        // Здесь можно добавить логику отправки формы или открытия модального окна
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

// Stages slider for mobile
function initStagesSlider() {
    const stagesContent = document.querySelector('.stages__content');
    if (!stagesContent) return;

    const isMobile = window.innerWidth < 600;
    const sliderContainer = stagesContent.querySelector('.stages__slider-container');
    const sliderWrapper = stagesContent.querySelector('.stages__slider-wrapper');
    const indicator = stagesContent.querySelector('.stages__slider-indicator');

    if (!sliderContainer || !sliderWrapper || !indicator) return;

    if (isMobile) {
        const allRows = stagesContent.querySelectorAll('.stages__row');
        const cardsArray = [];

        allRows.forEach(row => {
            const cards = row.querySelectorAll('.stage-card');
            cards.forEach(card => cardsArray.push(card));
        });

        if (cardsArray.length === 0) return;

        sliderContainer.style.display = 'block';
        allRows.forEach(row => row.style.display = 'none');

        sliderWrapper.innerHTML = '';
        indicator.innerHTML = '';

        cardsArray.forEach((card, index) => {
            const slide = document.createElement('div');
            slide.className = 'stages__slide';

            const clonedCard = card.cloneNode(true);
            slide.appendChild(clonedCard);
            sliderWrapper.appendChild(slide);

            const dot = document.createElement('div');
            dot.className = 'stages__indicator-dot';
            if (index === 0) dot.classList.add('stages__indicator-dot--active');
            indicator.appendChild(dot);
        });

        startStagesSlider(sliderWrapper, indicator);
    } else {
        sliderContainer.style.display = 'none';
        const allRows = stagesContent.querySelectorAll('.stages__row');
        allRows.forEach(row => row.style.display = 'flex');
    }
}

let stagesSliderInterval = null;

function startStagesSlider(wrapper, indicator) {
    if (stagesSliderInterval) {
        clearInterval(stagesSliderInterval);
    }

    const slides = wrapper.querySelectorAll('.stages__slide');
    const dots = indicator.querySelectorAll('.stages__indicator-dot');
    if (slides.length === 0) return;

    let currentIndex = 0;

    function updateSlider() {
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('stages__indicator-dot--active');
            } else {
                dot.classList.remove('stages__indicator-dot--active');
            }
        });
    }

    stagesSliderInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }, 3000);

    updateSlider();
}

function handleStagesSection() {
    initStagesSlider();
}

window.addEventListener('load', handleStagesSection);
window.addEventListener('resize', handleStagesSection);

