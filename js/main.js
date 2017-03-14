$(document).ready(function() {

    function getArticles(searchTerm) {
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=" + searchTerm,
            dataType: "jsonp",
            method: 'get'
        }).done(function(response) {
            console.log(response);
            // use the articleMaker function here and then
            // append each article to the DOM using jquery's .append() method
            $('#articlesContainer').empty();
            response.query.search.forEach(function(articleObject) {
              var article = articleMaker(articleObject.title, articleObject.snippet);
              $('#articlesContainer').append(article);
            })
        });
    }

    function articleMaker(title, snippet) {
        var article = '';
        article += '<a target="_blank" rel="noopener" class="article" href="https://en.wikipedia.org/wiki/' + title + '">';
        article +=      '<h3>' + title + '</h3>';
        article +=      '<p>' + snippet + '</p>';
        article += '</a>';
        return article;
    }

    // When click on "search" button, run the getArticles function and pass in
    // the value of the search box as the "searchTerm" parameter to the getArticles function
    $('#searchButton').click(function() {
        getArticles( $('#searchBox').val() );
    });


    // Extra Credit: do the same thing as clicking on the "search" button, but when the user hits the "enter" key
    $("#searchBox").on("keypress", function(event) {
        if(event.keyCode === 13) {
          getArticles( $('#searchBox').val() );
        }
    });

});
