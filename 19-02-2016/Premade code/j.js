$(document).ready(function () {
    $("#zoom-main").on("click", function () {
        $("#x").hasClass("m") ? ($("#x").removeClass("m"), $("#zoom-main").text("Förstora Huvudyta")) : ($("#x").addClass("m"), $("#zoom-main").text("Minska Huvudyta"))
    })
}), $(document).ready(function () {
    $("#zoom-mainn").on("click", function () {
        $("#x").hasClass("m") ? ($("#x").removeClass("m"), $("#y").removeClass("m"), $("#z").removeClass("m"), $("#zoom-mainn").text("Förstora Huvudyta")) : ($("#x").addClass("m"), $("#y").addClass("m"), $("#z").addClass("m"), $("#zoom-mainn").text("Minska Huvudyta"))
    })
});