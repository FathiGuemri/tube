$(function() {




    $(window).keydown(function(event) {
        if (event.shiftKey && event.keyCode == 68) {
            event.preventDefault();
            window.location.pathname = '/dashboard';
        } else if (event.shiftKey && event.keyCode == 72) {
            event.preventDefault();
            window.location.pathname = '/';
        }
    });
    let lecter = $('.lecter');
    // open video on click link


    var close = setTimeout(function() {
        $('.alert').fadeOut().remove()
    }, 5000);
    var alert = $('.alert');
    var status = alert.attr('data-msg-status')




    if (status == 'success') alert.addClass("alert-success");
    else alert.addClass("alert-danger");


    // add new type


    $('.responsive').slick({
        infinite: false,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
    $('.prev').on('click', () => {
        $('.slick-prev').click();
    });

    $('.next').on('click', () => {
        $('.slick-next').click();
    });

    var mixer = mixitup('#container');

    $('.btn-toolbar .btn').on('click', function() {
        $(this).addClass("active").siblings().removeClass("active");
    })
});