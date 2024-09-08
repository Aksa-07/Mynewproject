var TIMEOUT = 6000; // Time between slides

var interval = setInterval(handleNext, TIMEOUT);

function handleNext() {
    var $radios = $('input[class*="slide-radio"]');
    var $activeRadio = $('input[class*="slide-radio"]:checked');

    var currentIndex = $radios.index($activeRadio);
    var radiosLength = $radios.length;

    // Uncheck the current radio button
    $activeRadio.prop('checked', false);

    // Check the next radio button, or loop back to the first
    if (currentIndex >= radiosLength - 1) {
        $radios.first().prop('checked', true);
    } else {
        $activeRadio.next('input[class*="slide-radio"]').prop('checked', true);
    }

    // Trigger the animation
    animateSlider();
}

function animateSlider() {
    var $slider = $('.css-slider-wrapper');
    var activeSlide = $('input[class*="slide-radio"]:checked').index() + 1;

    // Calculate the new margin-left based on the active slide
    var newMarginLeft = -(activeSlide - 1) * 100 + '%';

    // Animate the slider to the new position
    $slider.animate({
        'margin-left': newMarginLeft
    }, 500);
}


