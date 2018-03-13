var topics = ["Dog", "Cat", "Lion", "Rabbit", "Goat", "Corgi"];

// Display the buttons on the screen
function createButtons() {
  $("#animalButtons").empty();

  for (var i = 0; i < topics.length; i++) {
    var a = $("<button>");
    a.addClass("animalBtn btn btn-primary");
    a.attr("data-name", topics[i].toLowerCase());
    a.text(topics[i]);
    $("#animalButtons").append(a);
  }
}

//Creates new buttons for the page
$("#addAnimal").on("click", function(event) {
  event.preventDefault();
  var animal = $("#animal-input")
    .val()
    .trim();
  if (animal != "") {
    topics.push(animal);
    createButtons();
    $("input[type='text']").val("");
  } else {
    alert("Please enter a value");
  }
});

//Displays the ainimal gifs on the page
function displayAnimals() {
  $("#animals").empty();
  var animal = $(this).attr("data-name");
  var queryUrl =
    "https://api.giphy.com/v1/gifs/search?q=" +
    animal +
    "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).done(function(res) {
    //puts still gifs on the page
    var result = res.data;

    for (var i = 0; i < result.length; i++) {
      console.log(res);
      var imgUrl = result[i].images.fixed_height_still.url;
      var image = $("<img>").attr("src", imgUrl);
      image.attr("data-still", result[i].images.fixed_height_still.url);
      image.attr("data-animate", result[i].images.fixed_height.url);
      image.attr("data-state", "still");
      image.addClass("animalClick card");
      $("#animals").append(image);
    }
  });
}

//click to animate --THIS FUNCTION--
$(document).on("click", ".animalClick", function() {
  var state = $(this).attr("data-state");

  if (state == "still") {
    var url = $(this).attr("data-animate");
    $(this).attr("data-state", "animate");
    $(this).attr("src", url);
  } else {
    var url = $(this).attr("data-still");
    $(this).attr("data-state", "still");
    $(this).attr("src", url);
  }
});

// click listener for executing displayAnimals function
$(document).on("click", ".animalBtn", displayAnimals);
//make the buttons
createButtons();
