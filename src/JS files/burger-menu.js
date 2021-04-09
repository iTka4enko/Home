import $ from 'jquery';

$('.burger-menu__button').on('click', () => {
    $('.burger-menu__list').slideToggle('fast')
})
$('body').on('click', (e) => {
    let elem = e.target.classList[0]
    if(elem !== 'burger-menu__button' && elem !== 'burger-menu__buttonElem'){
        $('.burger-menu__list').slideUp('fast')
    }
})