const knrPlayList = $(".knr_palyer_pl_play");
if (knrPlayList.length > 0) {
    for (let i = 0; i < knrPlayList.length; i++) {
        initAudio(knrPlayList[i]);
    }
}

function initAudio(player) {
    let audio;

    const element = $(player).find('.playlist li:first-child');
    const playlist = $(player).find('.playlist');

    audio = playAudio(element, player);

    const play = $(player).find('.play'),
        pause = $(player).find('.pause'),
        stop = $(player).find('.stop'),
        next = $(player).find('.next'),
        prev = $(player).find('.prev'),
        volume = $(player).find('.volume');

    $(pause).hide();

    //Next button
    $(next).click(function() {
        audio.pause();
        var nex = $(playlist).find($('li.active')).next();
        if (nex.length == 0) {
            nex = $(playlist).find($('li:first-child'));
        }
        audio = playAudio(nex, player);
        audio.play();
    });

    //Prev button
    $(prev).click(function() {
        audio.pause();
        var pre = $(playlist).find($('li.active')).prev();
        if (pre.length == 0) {
            pre = $(playlist).find($('li:last-child'));
        }
        audio = playAudio(pre, player);
        audio.play();
    });

    //Playlist song click
    $(playlist).find($('li')).click(function() {
        audio.pause();
        audio = playAudio(this, player);
        $(play).hide();
        $(pause).show();
        audio.play();
    });


    //Play button
    $(play).click(function() {
        audio.play();
        $(this).hide();
        $(pause).show();
    });

    //Pause button
    $(pause).click(function() {
        audio.pause();
        $(play).show();
        $(this).hide();
    });

    //Stop button
    $(stop).click(function() {
        audio.pause();
        audio.currentTime = 0;
        $(play).show();
        $(pause).hide();
    });

    //Volume control
    $(volume).change(function() {
        audio.volume = parseFloat(this.value / 10);
    });
$(volume)

}

function playAudio(element, player) {
    let audio;

    const song = $(element).attr('song');
    const title = $(element).text();
    const cover = $(element).attr('cover');
    const artist = $(element).attr('artist');


    const duration = $(player).find('.duration'),
        progress = $(player).find('.progress-bar-inner.progress'),
        volume_d = $(player).find('.volume').val();

    //Create audio object
    audio = new Audio(song);
    audio.volume = parseFloat(volume_d / 10);

    //Insert audio info
    $(player).find($('.artist')).text(artist);
    $(player).find($('.title')).text(title);

    //Insert song cover
    $(player).find($('.audio-image')).css('background-image', 'url(' + cover + ')');

    $(player).find($('.playlist li')).removeClass('active');
    $(element).addClass('active');

    audio.onplaying = function() {
        showDuration(audio, duration, progress);
    };

    audio.addEventListener('ended', function() {
        audio.currentTime = 0;
        $(player).find('.play').show();
        $(player).find('.pause').hide();
        $(progress).css('width', '0');
        $(duration).html('0:00');
    });

    return audio;
}

//Time/Duration
function showDuration(audio, duration, progress) {
    $(audio).bind('timeupdate', function() {
        //Get hours and minutes
        var s = parseInt(audio.currentTime % 60);
        var m = parseInt(audio.currentTime / 60) % 60;
        if (s < 10) {
            s = '0' + s;
        }
        $(duration).html(m + ':' + s);
        var value = 0;
        if (audio.currentTime > 0) {
            value = Math.floor((100 / audio.duration) * audio.currentTime);
        }
        $(progress).css('width', value + '%');
    });
}