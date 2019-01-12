var animals = ["cat", "dog", "bird", "giraffe", "fish", "seal", "hedgehog", "hamster", "zebra", "elephant", "frog"]

function renderButtons() {
  $("#button-div").empty();

  // Create button for each animal
  animals.forEach(function (animal) {
    var button = $("<button>");

    button.text(animal);
    button.val(animal);
    button.addClass("animal-button");

    $("#button-div").append(button);
  });
};

function renderGifs(animal) {
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=pyrPRPiNNoIhtHbik0pzi1MM6j1m7Qdn&q=" + animal + "&limit=10";

  $("#gif-div").empty();

  // Get gifs from Giphy
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    // Display 10 gifs with rating beneath
    for (var i = 0; i < 10; i++) {
      var newDiv = $("<div>");
      var img = $("<img>");
      var rating = $("<p>");

      img.attr("src", response.data[i].images.fixed_height_still.url);
      img.attr("data-state", "still");
      img.attr("data-still", response.data[i].images.fixed_height_still.url);
      img.attr("data-animate", response.data[i].images.fixed_height.url);
      img.addClass("animal-gif");

      rating.text("Rating: " + response.data[i].rating);

      newDiv.append(img);
      newDiv.append(rating);
      newDiv.addClass("animal-div");

      $("#gif-div").append(newDiv);
    }
  });
}

// Initial render
renderButtons();
renderGifs("cat");

$(document.body).on("click", ".animal-button", function () {
  var animal = $(this).val();

  renderGifs(animal);
});

// Gif click handler to toggle animate
$(document.body).on("click", ".animal-gif", function () {
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

// Add new button from input field
$("#add-animal").on("click", function () {
  event.preventDefault();

  var animal = $("#new-animal").val().trim();

  if (animal !== "") {
    animals.push(animal);
    renderButtons();

    $("#new-animal").val("");
  }
});

