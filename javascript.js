var superheroes = ["Ironman", "Spiderman", "Superman", "Batman"]


function superheroGIPHY() {
    var heroes = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + heroes + "&api_key=dc6zaTOxFJmzC&limit=10";

    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var results = response.data
        for (var i = 0; i < results.length; i++){
        	var showDiv = $("<div>");
        	var rating = results[i].rating;
        	var defaultAnimatedSrc = results[i].images.fixed_height.url;
        	var staticSrc = results[i].images.fixed_height_still.url;
        	var showImage = $("<img>");
        	var p = $("<p>").text("Rating: " + rating);
        	showImage.attr("src", staticSrc);
        	showImage.addClass("gif");
        	showImage.attr("data-state", "still");
        	showImage.attr("data-still", staticSrc);
        	showImage.attr("data-animate", defaultAnimatedSrc);
        	showDiv.append(p);
        	showDiv.append(showImage);
        	$("#gifsHere").prepend(showDiv);
        }

    })

}

$("#submitHero").on('click', function (event) {
    event.preventDefault();
    var heroes = $("#hero-input").val().trim();
    superheroes.push(heroes);
    showButtons();
})


function showButtons() {
    $("#buttons").empty();
    for (var i = 0; i < superheroes.length; i++) {
        var button = $("<button>");
        button.addClass("heroes");
        button.attr("data-name", superheroes[i]);
        button.text(superheroes[i]);
        $("#buttons").append(button);
    }
}



function gifAniamte() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}


$(document).on("click", ".gif", gifAniamte);
$(document).on("click", ".heroes", superheroGIPHY);


showButtons();
