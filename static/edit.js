$(document).ready(function () {
    $("#edit-form").submit(function (event) {
        event.preventDefault(); 
        let formData = {
            title: $("#title").val().trim(),
            desc: $("#desc").val().trim(),
            img: $("#img").val().trim(),
            agg_rating: parseFloat($("#agg_rating").val().trim()),
            address: $("#address").val().trim(),
            notes: $("#notes").val().trim(),
            reviews: [] 
        };
        $(".review-entry").each(function () {
            let reviewer = $(this).find(".reviewer").val().trim();
            let rating = $(this).find(".review-rating").val().trim();
            let reviewText = $(this).find(".review-text").val().trim();
            let reviewId = $(this).data("review-id"); 

            if (reviewer && rating && reviewText) {
                formData.reviews.push({
                    id: reviewId,  
                    author: reviewer,
                    rating: parseFloat(rating),
                    review: reviewText
                });
            }
        });

        $.ajax({
            type: "POST",
            url: "/edit/" + storeId,   
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(formData),
            success: function(result){
                console.log("success edit")
                if (result.redirect_url) {
                    window.location.href = result.redirect_url; 
                }
            },
            error: function(request, status, error){
                console.log("Error");
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });
    });

    $("#discard-btn").click(function () {
        let confirmDiscard = confirm("Are you sure you want to discard changes?");
        if (confirmDiscard) {
            window.location.href = "/edit/" + storeId; 
        }
    });
});
