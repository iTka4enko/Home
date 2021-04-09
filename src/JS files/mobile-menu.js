import $ from 'jquery';

$(window).on('load', () =>{
    if($(window).width() <= 790){
        $('.mobile-menu').show()
        $('.main__nav>ul').hide()
    }else{
        $('.mobile-menu').hide()
        $('.main__nav>ul').show()
    }
})

