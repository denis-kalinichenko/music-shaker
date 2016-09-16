$(document).ready(function () {
    var coordinates = function(element) {
        element = $(element);
        var top = element.position().top;
        var left = element.position().left;
        $('#results').text('X: ' + left + ' ' + 'Y: ' + top);
    };

    $("#box").position({
        my: "center",
        of: "#canvas"
    });

    $("#box").draggable({
        containment: '#canvas',
        start: function() {
            coordinates('#box');
        },
        stop: function() {
            coordinates('#box');
        }
    });
});

