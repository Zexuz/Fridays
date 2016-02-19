
$(function () {
    $('#top-right').click(function ( event ) {
        //This is used in index2
        //$(this).toggleClass('zoom');

        $( this ).toggleClass( "zoom",400 );
        $( '#bottom-right' ).toggleClass( "a",400);
        $( '#left' ).toggleClass( "left",400 );

    });

});