var topics = ["Batman", "Wonder Woman", "Shazam", " Black Canary"];
var topic = '';

function renderButtons() {
  $("#buttons-go-here").empty();
  $("#heroes-input").empty();
  for (var i = 0; i < topics.length; i++) {
    var a = $("<button>");
    a.addClass("superhero-btn");
    a.attr("data-person", topics[i]);
    a.text(topics[i]);
    $("#buttons-go-here").append(a);
  };
};

$('#addHero').on('click', function(event) {
  event.preventDefault();
  topic = $('#heroes-input').val().trim();
  if(topics.indexOf(topic) === -1) {
    topics.push(topic)
  }
  renderButtons();
});

var ajaxCall = function () {

    var person = $(this).attr("data-person");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      person + "&api_key=yC00khS66NHHHHxyC4azZPgAS16agWqJ&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
          var superDiv = $("<div>");
          var p = $("<p>").text("Rating: " + results[i].rating);
          var interactiveImage = $("<img>");
          var stillImage = results[i].images.fixed_height_still.url;
          var animatedImage = results[i].images.fixed_height.url;
          interactiveImage.attr("src", results[i].images.fixed_height.url);
          interactiveImage.attr("data-still", stillImage)
          interactiveImage.attr("data-animate", animatedImage)
          interactiveImage.attr("data-ispaused", true)
          interactiveImage.addClass("gif")
          superDiv.prepend(p);
          superDiv.prepend(interactiveImage);
          $("#gifs-appear-here").prepend(superDiv);
        }
      });
  };

  $(document.body).on("click", ".gif", function () {
    let paused = $(this).data('ispaused');
    let stillGif = $(this).data('still');
    var animateGif = $(this).data('animate');

    if (paused) {
        $(this).attr("src", stillGif)
        $(this).data("ispaused", false)
    } else {
        $(this).attr("src", animateGif)
        $(this).data("ispaused", true)
    }
});

  $(document).on("click", ".superhero-btn", ajaxCall);

  renderButtons();
