let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const indicator = document.getElementById('slide-indicator');

function updateSlide() {
    // លាក់ស្លាយទាំងអស់ដោយដក class active ចេញ
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // បង្ហាញស្លាយបច្ចុប្បន្នដោយបន្ថែម class active
    slides[currentSlideIndex].classList.add('active');
    
    // ប្ដូរលេខរៀងសូចនាករ (ឧទាហរណ៍ 1 / 4)
    indicator.innerText = (currentSlideIndex + 1) + " / " + slides.length;

    // Scroll to top of the slide when changing
    slides[currentSlideIndex].scrollTop = 0;
}

function moveSlide(step) {
    currentSlideIndex += step;
    
    // បើសិនជាហួសស្លាយចុងក្រោយ ឱ្យត្រឡប់ទៅស្លាយទី១ វិញ
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    }
    
    // បើសិនជាថយក្រោយហួសស្លាយទី១ ឱ្យទៅស្លាយចុងក្រោយវិញ
    if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    updateSlide();
}

// បន្ថែមការបញ្ជាតាមរយៈក្តារចុច (Keyboard)
document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowRight" || event.key === " ") {
        moveSlide(1); // ចុចព្រួញស្ដាំ ឬ Space ទៅមុខ
    } else if (event.key === "ArrowLeft") {
        moveSlide(-1); // ចុចព្រួញឆ្វេង ថយក្រោយ
    }
});

// Touch Swipe Support
let touchstartX = 0;
let touchendX = 0;
let touchstartY = 0;
let touchendY = 0;

function handleGesture() {
    const dx = touchendX - touchstartX;
    const dy = touchendY - touchstartY;
    
    // Only trigger if horizontal swipe is more significant than vertical
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0) {
            moveSlide(1); // Swipe Left -> Next
        } else {
            moveSlide(-1); // Swipe Right -> Prev
        }
    }
}

document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
    touchstartY = e.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    touchendY = e.changedTouches[0].screenY;
    handleGesture();
}, false);

// ហៅឱ្យដំណើរការដំបូងពេលបើកហ្វាយ
updateSlide();