$(function () {
    $(".choose").click(function () {
        var val = $(this).data("emotion");
        $.post("/generate", { emotion: val }, function (data) {
            console.info(data);
            $("#output").text(JSON.stringify(data));
        }, 'json');
    });
});
