// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br /><br />" + data[i].link + "<br /><br />" + data[i].teaser + "</p>");

    $("#articles").append("<p data-id='" + data[i]._id + "'> <a href='" + data[i].link + "'>" + data[i].title +  "</a><br /><br />" + data[i].teaser + "</p>");
  }
});

// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // First show old notes
      // $("#notes").append("<h1>Saved Notes:</h1><div id='pastNotes'>No saved notes... yet!</div><br><hr>");

      // Add note for...
      // $("#notes").append("<h1>Add Note For:</h1>");

      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
        // If the note exists, include a delete button
        // $("#notes").append("<button data-id='" + data.note._id + "' id='deletenote'>Delete Note</button>");

        //Display the old note above the form
        // $("#pastNotes").html("<h3>" + data.note.title + "</h3><ul><li>" + data.note.body + "</li><ul>");
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

// // When you click the deletenote button
// $(document).on("click", "#deletenote", function() {
//   // Grab the id associated with the article from the delete button
//   var thisId = $(this).attr("data-id");

//   // Run a DELETE request to change the note, using what's entered in the inputs
//   $.ajax({
//     method: "DELETE",
//     url: "/articles/" + thisId
//   })
//     // With that done
//     .then(function(data) {
//       // Log the response
//       console.log(data);
//       // Empty the notes section
//       $("#notes").empty();
//     });

//   // Also, remove the values entered in the input and textarea for note entry
//   $("#titleinput").val("");
//   $("#bodyinput").val("");
// });

$("#scrapeNew").on("click", function() {
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
  .then(function(data){
    console.log("New Articles Scraped!");
    location.reload();
  })
});