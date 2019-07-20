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

    $('.open').on('click', function() {
        let urlVideo = $(this).attr('data-video');
        lecter.attr('src', urlVideo);
        $(window).scrollTop(0);
        var data = JSON.parse($(this).attr('data-item'));
        $('.v-info strong').text(data.title);
    });

    var close = setTimeout(function() {
        $('.alert').fadeOut().remove()
    }, 5000);
    var alert = $('.alert');
    var status = alert.attr('data-msg-status')

    if (status == 'success') alert.addClass("alert-success");
    else alert.addClass("alert-danger");
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
});