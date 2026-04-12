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
    if (event.key === "ArrowRight") {
        moveSlide(1); // ចុចព្រួញស្ដាំ ទៅមុខ
    } else if (event.key === "ArrowLeft") {
        moveSlide(-1); // ចុចព្រួញឆ្វេង ថយក្រោយ
    }
});

// ហៅឱ្យដំណើរការដំបូងពេលបើកហ្វាយ
updateSlide();