jQuery(function($) {
    var resultsArea = $( '.search-results' );

    function processTopic( topic ) {
        var resultList = $( '<ul></ul>'),
            listItem,
            resultText = '';

        if ( topic.Icon && topic.Icon.URL ) {
            resultText = '<aside class="pack-end"><img alt="placeholder" src="' + topic.Icon.URL + '"></aside>';
        }

        resultText += '<a href="' + topic.FirstURL + '"><p>' + topic.Text + '</p></a>';

        $( '<li></li>' )
            .html( resultText )
            .appendTo( resultList );

        resultList.appendTo( resultsArea ); 
    }

    function processResults( topics ) {
        topics.forEach(function( topic ) {
            var resultText = '';

            if ( topic.Topics ) {
                processResults( topic.Topics );
            } else if ( topic.Result ) {
                processTopic( topic );
            }
        });

    }

    function processDefinition( definition, source, sourceURL, heading ) {
        if ( heading ) {
            $( '<header></header>' ).html( heading ).appendTo( resultsArea );
        }
        $( '<h2></h2>' ).html( definition ).appendTo( resultsArea );
        $( '<h3></h3>' ).html( 'Source: <a href="' + sourceURL + '">' + source + '</a>' ).appendTo( resultsArea );
        $( '<hr/>' ).appendTo( resultsArea );
    }

    $( '#ddg-form' ).on( 'submit', function(e) {
        e.preventDefault();
        var self = $( this );

        $.ajax({
            url          : this.action,
            data         : self.serialize(),
            dataType     : 'jsonp',
            jsonCallback : 'ffos',
            success      : function( data ) {
                if ( data.Redirect ) {
                    window.location.href = data.Redirect;
                }

                $( '.search-results' ).empty();

                if ( data.Definition ) {
                    processDefinition( data.Definition, data.AbstractSource, data.AbstractURL, data.Heading );
                }

                if ( data.RelatedTopics ) {
                    processResults( data.RelatedTopics );
                    if ( resultsArea.text() ) {
                        resultsArea.preppend( '<header>I also found...</header>' );
                    } else {
                        resultsArea.html( '<header>No clues so far...</header><div id="gordon_image"><img src="images/gordon.jpg"></div>' );
                    }
                }
            },
            error        : function( data ) {
                console.log( 'meep... error... meep...' );
            }
        });
    });

});