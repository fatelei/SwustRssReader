/*
 * ¼ì²éÍøÂç
 */
function check_connection() {
    /*
     * UNKONW CONNETION -> 0
     * ETHERNET -> 1
     * WIFI -> 2
     * CELL 2G -> 3
     * CELL 3G -> 4
     * CELL 4G -> 5
     * NONE -> 6
     */
     var networkState = navigator.network.connection.type;
     switch (networkState) {
         case Connection.ETHERNET:
         case Connection.WIFI:
         case Connection.CELL_2G:
         case Connection.CELL_3G:
         case Connection.CELL_4G:
                return true;
         case Connection.UNKNOWN:
         case Connection.NONE:
                return false;
     }
}