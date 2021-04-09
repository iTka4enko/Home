import $ from 'jquery';
import "slick-slider";

$(window).on('load', () => {
    $('.slider').slick({
        infinite: true,
        autoplay: true,
        fade: true,
        speed: 1000,
    });
})