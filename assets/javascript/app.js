var animals = ["dog", "cat", "bird", "giraffe", "fish", "seal", "hedgehog", "hamster", "zebra", "elephant", "frog"]

// Create button for each animal
animals.forEach(function (animal) {
  var button = $("<button>");

  button.text(animal);
  button.val(animal);
  button.addClass("animal-button");

  $("#button-div").append(button);
});

// Click handler for button
$(document.body).on("click", ".animal-button", function () {
  // Display 10 gifs with rating under
  var animal = $(this).val();
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=pyrPRPiNNoIhtHbik0pzi1MM6j1m7Qdn&q=" + animal + "&limit=10";

  $("#gif-div").empty();

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    for (var i = 0; i < 10; i++) {
      var newDiv = $("<div>");
      var img = $("<img>");
      var rating = $("<h2>");

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


});





// Click handler for static image
$(document.body).on("click", ".animal-gif", function () {
  // toggle animate
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});