var aircraft_table = [];
var table = [];
var route_1 = [];
var route_2 = [];

var received_time;
var received_hh;
var received_mm;
var received_ss;
var received_ms;
var flight_No;
var speed;

var distance;
var destination;

var flight_recorded = 0;
var aircraft_type = [];
var table_data = '<table class="table table-bordered table-striped">';
var route1_table = '<table class="table table-bordered table-striped">';
var temporary = [];





$(document).ready(function () {
    $.ajax({
        url: "http://127.0.0.1:8887/icao24plus.txt",
        dataType: "text",
        success: function (data) {
            var icao = data.split(/\r?\n|\r/);
            for (var i = 0; i < icao.length - 1; i++) {
                var icao_list = icao[i].split(/\t/);
                aircraft_type[i] = [icao_list[0], icao_list[2]];

            }


            $(document).ready(function () {
                $.ajax({
                    url: "http://127.0.0.1:8887/FYP.csv",
                    dataType: "text",
                    success: function (data) {
                        var aircraft_data = data.split(/\r?\n|\r/);

                        for (var count = 0; count < aircraft_data.length - 1; count++) {
                            var flight_found = 0;
                            var store;
                            var cell_data = aircraft_data[count].split(",");
                            var timeinnumber;
                        
                            received_time = cell_data[2];
                           
                            flight_No = cell_data[0];
                           
                            speed = cell_data[1];
                            

                            destination = cell_data[3];

                            distance = cell_data[4];

                            table[flight_recorded] = [flight_No, speed, received_time, destination, distance];
                            var time = table[flight_recorded][2].split(":");
                            
                            
                            table[flight_recorded][5] = (Number(time[0] * 3600) + Number(time[1] * 60) + Number(time[2]))*1000;
                            flight_recorded = flight_recorded + 1;

                            

                    

                        }
                        table_data += '<tr>';
                        table_data += '<td>' + 'Flight_No' + '</td>';
                    
                       
                      
                        table_data += '<td>' + 'Max Speed' + '</td>';
                      
                
                        table_data += '<td>' + 'Received time' +   '</td>';
                        table_data += '<td>' + 'Destination' + '</td>';
                        table_data += '<td>' + 'Distance from Ap to IAF' + '</td>';
                        table_data += '</tr>';
                        for (var i = 0; i < table.length; i++) {

                            table_data += '<tr>';
                            table_data += '<td>' + table[i][0] + '</td>';
                            table_data += '<td>' + table[i][1] + '</td>';
                            table_data += '<td>' + table[i][2] + '</td>';
                            table_data += '<td>' + table[i][3] + '</td>';
                            table_data += '<td>' + table[i][4] + '</td>';

                            table_data += '</tr>';
                        }

                        table_data += '</table>';
                        $('#flight_table').html(table_data);
                    }
                });


            });
        }
    });
});

function algorithm() {
    
    var route1_aircraft = 0;
    var route2_aircraft = 0;
    for (var i = 0; i <= table.length - 1; i++) {
        if (table[i][3] == "ZSSS") {
            route_1[route1_aircraft] = [table[i][0], table[i][1], table[i][2], table[i][3], table[i][4], table[i][5]];
            route_1[route1_aircraft][6] = route_1[route1_aircraft][5] + (route_1[route1_aircraft][4] * 3600 / (route_1[route1_aircraft][1] * 1.852) * 1000);
            route_1[route1_aircraft][7] = table[i][1];
            route1_aircraft++;
        }
        else if (table[i][3] == "ZSPD") {
            route_2[route2_aircraft] = [table[i][0], table[i][1], table[i][2], table[i][3], table[i][4], table[i][5]];
            route_2[route2_aircraft][6] = route_2[route2_aircraft][5] + (route_2[route2_aircraft][4] * 3600 / (route_2[route2_aircraft][1] * 1.852) * 1000);
            route_2[route2_aircraft][7] = table[i][1];
            route2_aircraft++;
        }
    }
    for (var i = 1; i <= route_1.length - 1; i++) {
        for (var j = 0 ; j <= i-1; j++) {
            if (route_1[i][6] < route_1[j][6]) {
                var store = route_1[j];
                route_1[j] = route_1[i];
                if (j != 0) {
                    if ((route_1[j][6] - route_1[j - 1][6]) < 120000) {
                        route_1[j][6] = route_1[j - 1][6] + 120000;
                        route_1[j][7] = (route_1[j][4] / ((route_1[j][6] - route_1[j][5])/1000/3600)/1.852;
                        for (var k = i; k > j; k--) {
                            route_1[k] = route_1[k - 1];
                        }
                        route_1[j + 1] = store;
                        for (var k = j + 1; k <= i; k++) {
                            if ((route_1[k][6] - route_1[k - 1][6]) < 120000) {
                                route_1[k][6] = route_1[k - 1][6] + 120000;
                                route_1[k][7] = (route_1[k][4] / ((route_1[k][6] - route_1[k][5]) / 1000 / 3600) / 1.852;
                            }
                        }
                    }
                }
                
            }
        }
    }
    for (var i = 0; i < route_1.length; i++) {

        route1_table += '<tr>';
        route1_table += '<td>' + route_1[i][0] + '</td>';
        route1_table += '<td>' + route_1[i][1] + '</td>';
        route1_table += '<td>' + route_1[i][2] + '</td>';
        route1_table += '<td>' + route_1[i][3] + '</td>';
        route1_table += '<td>' + route_1[i][4] + '</td>';
        route1_table += '<td>' + route_1[i][5] + '</td>';
        route1_table += '<td>' + route_1[i][6] + '</td>';
        route1_table += '<td>' + route_1[i][7] + '</td>';


        route1_table += '</tr>';
    }
    route1_table += '</table>';
    $('#route1data').html(route1_table);
   

   
}
