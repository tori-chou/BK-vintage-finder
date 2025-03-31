$(document).ready(function() {
    $("#search-form").submit(function (event) {
        let query = $("#search-bar").val().trim(); 
        if (query === "") {
            event.preventDefault(); 
            $("#search-bar").val("").focus(); 
        }
    });
});