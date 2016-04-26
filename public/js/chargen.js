(function ( window, document, $, undefined ) {
    function levelCost( stufe, prio ) {
        return Math.ceil( stufe * ( stufe + 1 ) / 2 / prio);
    }

    function abilityLP( stufe, prio ) {
        return levelCost( stufe, prio ) * prio - levelCost( stufe, 1 );
    }

    function getGP( evt ) {
        var gp = 0, sp = 0, col, gpa, spa;
 
        gpa = $( '#attribute .gp-input' )
            .map(function () {
                return this.value - $( this ).data( 'bonus' );
            })
            .get();

        spa = $( '#sense .gp-input' )
            .map(function () {
                return this.value - $( this ).data( 'bonus' );
            })
            .get();

        gp = gpa.reduce(function ( prev, curr ) {
                return prev + curr;
            }, gp );

        gp += 2 * gpa.filter(function ( value ) {
            return value > 20;
        }).length;

        gp += gpa.filter(function ( value ) {
            return value > 23;
        }).length;

        gp -= 4 * gpa.filter(function ( value ) {
            return value < 5;
        }).length;

        sp = spa.reduce(function ( prev, curr ) {
                return prev + curr;
            }, sp );
        gp += Math.ceil( sp / 3 );

        gp += spa.filter(function ( value ) {
            return value > 20;
        }).length;

        gp -= spa.filter(function ( value ) {
            return value < 10;
        }).length;

        gp -= 2 * spa.filter(function ( value ) {
            return value < 5;
        }).length;
        
        col = gp > $( '#gp' ).val() ? 'red' : 'black';

        $( '#gp-display' )
            .val( gp )
            .css( 'color', col );
    }

    var trk = [
        1, 2, 3, 3.5, 3.5, 4, 4, 4, 5, 5, 
        5, 5, 5, 5, 5, 6, 6, 6, 6.5, 6.5, 
        7, 7.5, 8, 8.5, 9, 9.5, 10, 11, 12, 13, 14
    ];
    var sbo = [
        -10, -5, -3, -2, -2, -1, -1, -1, 0, 0, 
        0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 
        3, 4, 4, 5, 5, 6, 7, 8, 9, 10, 11, 
    ];

    $( '#str' )
        .on( 'change', function ( evt ) {
            $( '#trk' ).val( trk[ +this.value ] );
            $( '#sbo' ).val( sbo[ +this.value ] );
        });

    $( '#bil, #cha, #cyb' )
        .on( 'change', function ( evt ) {
            var gst = 0;
            gst += +$( '#bil' ).val();
            gst += +$( '#cha' ).val();
            gst += +$( '#cyb' ).val();
            $( '#gst' ).val( Math.round( gst / 3 ) );
        });

    $( '.gp-input' )
        .on( 'change', getGP );

    $( '#rasse' )
        .on( 'change', getGP)
        .on( 'change', function ( evt ) {
            $( '#base-attributes' )[ 0 ].reset();
            var option = this.options[ this.selectedIndex ];
            $.each( option.dataset, function ( key, bonus ) {
                var $attr = $( '#' + key );
                $attr
                    .val( +$attr.val() + +bonus )
                    .data( 'bonus', bonus )
                    .trigger( 'change' );
            });
        });
})(window, document, jQuery.noConflict());
