$( document ).ready(function(){
    $(".dropdown-trigger").dropdown();
    $('select').formSelect();  
    $('.sidenav').sidenav();
    $('.collapsible').collapsible();
    $('.tooltipped').tooltip();
    $('.fixed-action-btn').floatingActionButton();
    $('#custom_timer').modal();
    $('#modal_timer').modal({
        'opacity': 0,
        'dismissible': false,
        'preventScrolling': false
    });

    // override default click option for floating button if on mobile device
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        $('.fixed-action-btn').floatingActionButton('_removeEventHandlers');
        $('.fixed-action-btn').click(function(){
            if($(this).hasClass('active')){
                $(this).floatingActionButton('close');
            }
            else{
                $(this).floatingActionButton('open');
            }
        });
    }

    $('.show-detail').click(showDetail);
    $('#timer_30').click(function(){
        startTimer(30);
    });
    $('#timer_60').click(function(){
        startTimer(60);
    });
    $('#timer_90').click(function(){
        startTimer(90);
    });
    $('.cookie-select').change(function(){
        Cookies.set(this.id, this.value, { path: '', expires: 365 });
    });
    $('#custom_timer_submit').click(function(){
        var minutes = $('#custom_timer_min').val();
        var seconds = $('#custom_timer_sec').val();
        //delay to allow scrolling
        setTimeout(function(){
            startTimer(parseInt(minutes) * 60 + parseInt(seconds));
        }, 5);
    });
    $('input.time').click(function(){
        $(this).val('');
    });
    $('input.time').change(function(){
        if($(this).val().length == 1){
            $(this).val('0' + $(this).val());
        }
        
        Cookies.set(this.id, this.value, { path: '', expires: 365 });
    });
});

var timer_interval;
var startTimer = function(duration) {
    $('.fixed-action-btn').floatingActionButton('close');
    clearInterval(timer_interval);
    var start = Date.now(), diff, minutes, seconds;
    var currentDuration = duration;
    var modal = $('#modal_timer');
    var target = $('#timer');

    modal.modal('open');

    var timer = function() {
        diff = currentDuration - (((Date.now() - start) / 1000) | 0);

        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        time = minutes + ":" + seconds;

        if (diff <= 0) {
            clearInterval(timer_interval);
            modal.modal('close');
            $('#beep')[0].play();
        }

        target.html(time);
    };
    timer();
    timer_interval = setInterval(timer, 100);

    var pause = $('#pause_timer');
    pause.off('click');
    pause.html('pause');
    pause.click(function(){
        if(pause.html() == 'pause'){
            pause.html('play_arrow');
            clearInterval(timer_interval);
            currentDuration = diff;
        }
        else if(pause.html() == 'play_arrow'){
            pause.html('pause');
            timer_interval = setInterval(timer, 100);
            start = Date.now()
        }
    });
    var reset = $('#reset_timer');
    reset.off('click');
    reset.click(function(){
        currentDuration = duration;
        start = Date.now();
        timer();
    });
    var cancel = $('#cancel_timer');
    cancel.off('click');
    cancel.click(function(){
        clearInterval(timer_interval);
        modal.modal('close');
    });
}

var showDetail = function(){
    var exercise_id = $(this).parent().find('select').val();
    var progression_id = $(this).siblings('input').val();
    var card = $(this).closest('.card');
    var cardReveal = card.children('.card-reveal');
    var cardContent = card.children('.card-content');
    var cardHeight = cardContent.height();
    
    $.ajax({
        url: ajax_details_url,
        data: {
            exercise_id: exercise_id,
            progression_id: progression_id,
        },
        dataType: 'html',
        error: function() {
            cardReveal.html(`
                <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
                <div class="valign-wrapper full-height">
                    <div class="center-align full-width">
                        <i class="material-icons large grey-text">error</i>
                    </div>
                </div>
            `);
            console.log('An error occured when trying to load the exercise details.');
        },
        success: function(data) {

            cardContent.height(50);
            cardReveal.html(data);
            cardContent.height(cardReveal[0].scrollHeight);

            cardReveal.children('.card-title').click(function(){
                window.setTimeout(function(){
                    cardContent.height(cardHeight);
                    cardReveal.html(`
                        <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
                        <div class="valign-wrapper full-height">
                            <div class="center-align full-width">
                                <div class="preloader-wrapper big active">
                                    <div class="spinner-layer spinner-blue-only">
                                        <div class="circle-clipper left">
                                        <div class="circle"></div>
                                        </div><div class="gap-patch">
                                        <div class="circle"></div>
                                        </div><div class="circle-clipper right">
                                        <div class="circle"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
                    cardReveal.children('.card-title').off('click');
                }, 50);
            });
        }
      });
}