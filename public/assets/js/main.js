$(function () {

    


$(window).keydown(function(event) {
    if(event.shiftKey && event.keyCode == 68 ){
        event.preventDefault();
        window.location.pathname = '/dashboard';
    }else if (event.shiftKey && event.keyCode == 72 ) {
        event.preventDefault();
        window.location.pathname = '/';
    }
});
let lecter = $('.lecter');
// open video on click link

    $('.open').on('click', function () {
        let urlVideo = $(this).attr('data-video');
        lecter.attr('src', urlVideo);
    });

var close = setTimeout(function () {
        $('.alert').fadeOut();
   }, 3000);
});