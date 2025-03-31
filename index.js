$(document).ready(function() {
    let popularItems = data.slice(0,3);
    popularItems.forEach(item => {
        $('#popular-items').append(
            `<div class="col-md-4">
                <div class="card shadow-sm border-0">
                    <a href="/view/${item.id}">
                        <img src="${item.img}"
                            alt="Image of ${item.title}" 
                            class="card-img-top">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">
                            <a href="/view/${item.id}" class="text-dark text-decoration-none">
                                ${item.title}
                            </a>
                        </h5>
                        <p class="card-text">${item.notes}</p>
                        <a href="/view/${item.id}" class="btn btn-sm btn-outline-primary view-more">View More</a>
                    </div>
                </div>
            </div>`
        );  
    });

    $("#search-form").submit(function (event) {
        let query = $("#search-bar").val().trim(); 
        if (query === "") {
            event.preventDefault(); 
            $("#search-bar").val("").focus(); 
        }
    });
});
