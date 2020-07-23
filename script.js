var ss = document.getElementsByClassName('container');

[].forEach.call(ss, function (s) {
    var currentTimer = 0,
        interval = 0,
        lastUpdateTime = new Date().getTime(),
        start = s.querySelector('button.start'),
        stop = s.querySelector('button.stop'),
        reset = s.querySelector('button.reset'),
        mins = s.querySelector('span.minutes'),
        secs = s.querySelector('span.seconds'),
        cents = s.querySelector('span.centiseconds');

    start.addEventListener('click', startTimer);
    stop.addEventListener('click', stopTimer);
    reset.addEventListener('click', resetTimer);

    function pad (n) {
        return ('00' + n).substr(-2);
    }

    function update () {
        debugger
        var now = new Date().getTime(),
            dt = now - lastUpdateTime;

        currentTimer += dt;

        var gmtTime = new Date(currentTimer);
        var utcTime = convertDateToUTC(gmtTime);

        mins.innerHTML = pad(utcTime.getMinutes());
        secs.innerHTML = pad(utcTime.getSeconds());
        cents.innerHTML = pad(Math.floor(utcTime.getMilliseconds() / 10));

        lastUpdateTime = now;
    }

    function startTimer () {
        debugger;
        if (!interval) {
            lastUpdateTime = new Date().getTime();
            interval = setInterval(update, 1);
        }
    }

    function stopTimer () {
        clearInterval(interval);
        interval = 0;
    }

    function resetTimer () {
        stopTimer();

        currentTimer = 0;

        mins.innerHTML = secs.innerHTML = cents.innerHTML = pad(0);
    }
    function convertDateToUTC(date) {
     return new Date(date.getUTCFullYear(),
                     date.getUTCMonth(),
                     date.getUTCDate(),
                     date.getUTCHours(),
                     date.getUTCMinutes(), 
                     date.getUTCSeconds(),
                     date.getUTCMilliseconds());}
});