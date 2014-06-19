ROT.RNG.setSeed(1234);
DISPLAY_WIDTH = 80;
DISPLAY_HEIGHT = 30;

var TileListing = { 0: ' ', 1: '@' };

var Game = {
    display: null,
    map: [],

    mapWidth: 200,
    mapHeight: 200,

    cameraX: 50,
    cameraY: 50,

    init: function() {
        this.display = new ROT.Display( { width: DISPLAY_WIDTH, height: DISPLAY_HEIGHT } );
        document.body.appendChild( this.display.getContainer() );
    },

    initMap: function() {
        var digger = new ROT.Map.Digger( this.mapWidth, this.mapHeight );

        for ( var x = 0; x < this.mapWidth; x++ ) {
            this.map.push([]);
            map = this.map[x];

            for ( var y = 0; y < this.mapHeight; y++ ) {
                map.push( 0 );
            }
        }

        digger.create();
        var rooms = digger.getRooms();
        for ( var i = 0; i < rooms.length; i++ ) {
            var room = rooms[ i ];
            console.log( rooms[ i ] );

            for ( var _x = room._x1; _x < room._x2; _x++ ) {
                for ( var _y = room._y1; _y < room._y2; _y++ ) {
                    this.map[_x][_y] = 1;
                }
            }
        }
    },

    draw: function() {
        for ( var x = 0; x < DISPLAY_WIDTH; x++ ) {
            if ( ! ( x in this.map ) ) {
                continue;
            }

            map = this.map[ x + this.cameraX ];

            for ( var y = 0; y < DISPLAY_HEIGHT; y++ ) {
                tile = TileListing[map[ y + this.cameraY ]];

                if ( tile !== undefined )
                    tileChar = tile[0];
                    tileCol = tile[1];
                    tileBg = tile[2];

                    this.display.draw( x, y, tileChar,tileCol,tileBg );
            }
        }

    },
}

function init() {
    Game.init();
    Game.initMap();

    Game.draw();
}
