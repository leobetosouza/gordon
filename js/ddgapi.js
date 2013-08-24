jQuery(function($) {
    var resultsArea = $( '.search-results' );

    function processTopics( topics ) {
        var resultList = $( '<ul></ul>'),
            listItem;

        topics.forEach(function( topic ) {
            $( '<li></li>' )
                .html( topic.Result )
                .appendTo( resultList );
        });

        resultList.appendTo( resultsArea ); 

    }

    function processDefinition( definition, source, sourceURL, heading ) {
        if ( heading ) {
            $( '<h1></h1>' ).html( heading ).appendTo( resultsArea );
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
                $( '.search-results' ).empty();

                if ( data.Definition ) {
                    processDefinition( data.Definition, data.AbstractSource, data.AbstractURL, data.Heading );
                }

                if ( data.Topics ) {
                    processTopics( data.Topics );
                }

                if ( data.RelatedTopics ) {
                    processTopics( data.RelatedTopics );
                }
            },
            error        : function( data ) {
                console.log( 'meep... error... meep...' );
            }
        });
    });

});