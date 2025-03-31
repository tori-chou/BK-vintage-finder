$(document).ready(function () {
    let reviews = [];

    $("#add-item-form").submit(function (event) {
        event.preventDefault();

        let title = $("#title").val().trim();
        let desc = $("#desc").val().trim();
        let img = $("#img").val().trim();
        let agg_rating = $("#agg_rating").val().trim();
        let address = $("#address").val().trim();
        let notes = $("#notes").val().trim();
        let reviewer1 = $("#reviewer1").val().trim();
        let reviewer2 = $("#reviewer2").val().trim();
        let reviewer3 = $("#reviewer1").val().trim();
        let rating1 = $("#rating1").val().trim();
        let rating2 = $("#rating1").val().trim();
        let rating3 = $("#rating1").val().trim();
        let review1 = $("#reviewer1").val().trim();
        let review2 = $("#reviewer1").val().trim();
        let review3 = $("#reviewer1").val().trim();

        $(".form-control").removeClass("is-invalid");
        $(".invalid-feedback").remove();
        let hasError = false;

        function validateField(field, fieldId, message) {
            fieldId= $(fieldId)
            if (!field) {
                fieldId.addClass("is-invalid");
                fieldId.after(`<div class="invalid-feedback">${message}</div>`);
                fieldId.focus();
                hasError = true;
            }
        }
        validateField(review3, "#review3", "Field can't be blank.");
        validateField(review2, "#review2", "Field can't be blank.");
        validateField(review1, "#review1", "Field can't be blank.");
        validateField(rating3, "#rating3", "Field can't be blank.");
        validateField(rating2, "#rating2", "Field can't be blank.");
        validateField(rating1, "#rating1", "Field can't be blank.");
        validateField(reviewer3, "#reviewer3", "Field can't be blank.");
        validateField(reviewer2, "#reviewer2", "Field can't be blank.");
        validateField(reviewer1, "#reviewer1", "Field can't be blank.");
        validateField(notes, "#notes", "Notes can't be blank.");
        validateField(address, "#address", "Address can't be blank.");
        validateField(agg_rating, "#agg_rating", "Please enter a valid rating.");
        validateField(img, "#img", "Image URL can't be blank.");
        validateField(desc, "#desc", "Description can't be blank.");
        validateField(title, "#title", "Title can't be blank.");
        reviews = [
        {
            "author": reviewer1,
            "rating": rating1,
            "review": review1
        },
        {
            "author": reviewer2,
            "rating": rating2,
            "review": review2
        },
        {
            "author": reviewer3,
            "rating": rating3,
            "review": review3
        }]
         
        add_item({
            title: title,
            desc: desc,
            img: img,
            agg_rating: agg_rating,
            address: address,
            notes: notes,
            reviews: reviews
        })
    });
});

function add_item(item) {    
    $.ajax({
        type: "POST",
        url: "add_item",                
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(item),
        success: function(result){
            console.log("success add item")
            $("#success-message").removeClass("d-none").text(result.message);
            $("#next-steps").removeClass("d-none");
            $("#view-item-link").attr("href", "/view/" + result.item_id);
            $("#add-item-form")[0].reset();
            $("#title").focus();
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
} 