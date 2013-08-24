jQuery(function($) {
    $( '#ddg-form' ).on( 'submit', function(e) {
        e.preventDefault();
        var self = $( this );

        $.ajax({
            url          : this.action,
            data         : self.serialize(),
            dataType     : 'jsonp',
            jsonCallback : 'ffos',
            success      : function( data ) {
                console.log( data );
            },
            error        : function( data ) {
                console.log( 'meep... error... meep...' );
            }
        });
    });

});