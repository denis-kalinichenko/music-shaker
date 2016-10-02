$(function () {
    var tags_map = [
        "rock",
        "electronic",
        "alternative",
        "indie",
        "pop",
        "metal",
        "classical",
        "jazz",
        "experimental",
        "folk",
        "indie_rock",
        "punk",
        "hard_rock",
        "instrumental",
        "hip_hop",
        "dance",
        "80s",
        "90s",
        "hardcore",
        "heavy_metal",
        "soul",
        "chillout",
        "blues",
        "rap",
        "funk"
    ];

    $("[data-date]").each(function (index, date) {
        var unix = $(this).data("date");
        $("input[type=radio][name='options" + unix +"']").change(function () {
            var $radio = $(this);
            $radio.parents(".hide-area").hide().prev(".loader").removeClass("hide");
            var emotion_val = this.value;
            var emotion = null;
            if (emotion_val == 1) {
                emotion = "excited";
            }
            if (emotion_val == 2) {
                emotion = "happy";
            }
            if (emotion_val == 3) {
                emotion = "sad";
            }
            if (emotion_val == 4) {
                emotion = "angry";
            }
            $.post("/panel/", { date: unix }, function (tracks) {
                $radio.parents(".hide-area").prev(".loader").addClass("hide");

                if(!tracks) {
                    return alert("nothing");
                }
                var $progress = $radio.parents(".panel-body").find(".progress-status").removeClass("hide").find(".progress");

                var i = 1;

                var tags = [];

                async.eachSeries(tracks.track, function(track, next) {
                    setTimeout(function () {
                        $.getJSON("http://ws.audioscrobbler.com/2.0/?method=track.getTopTags&api_key=385980a161fa7f1aaf14eff57eacb790&artist="+track.artist['#text']+"&track="+track.name+"&format=json", function(data){
                            if(!data.error && data.toptags.tag.length) {
                                data.toptags.tag.forEach(function (tag) {
                                    if(_.includes(tags_map, tag.name)) {
                                        tags.push(tag.name);
                                    }
                                });
                            }

                            // update progress
                            var progress = (1 / tracks.track.length) * 100 * i;
                            setProgress($progress, progress);
                            i++;
                            next();
                        });
                    }, 1000);
                }, function(err) {
                    // if any of the file processing produced an error, err would equal that error
                    if( err ) {
                        // One of the iterations produced an error.
                        // All processing will now stop.
                        console.error('A track failed to process');
                    } else {
                        console.log('All tracks have been processed successfully');

                        var perc = 1 / tags.length * 100;
                        var results = {};
                        tags.forEach(function (tag) {
                            if(results[tag]) {
                                results[tag] += perc;
                            } else {
                                results[tag] = perc;
                            }
                        });
                        $.post("/panel/learn", { data: results, date: unix, emotion: emotion }, function (data) {
                            if(data == "done") {
                                $radio.parents(".panel-body").find(".alert").removeClass("hide");
                                $radio.parents(".panel-body").find(".progress-status").addClass("hide");
                            }
                        });
                    }
                });
            });
        });
    });

    var setProgress = function ($bar, progress) {
        progress = Math.round(progress);
        $bar.find(".progress-bar").attr("aria-valuenow", progress).text(progress+"%").css({ width: progress + "%" });
    }
});