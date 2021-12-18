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

var temporary = [];
var aircrafttime = [];


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
        }
    });
});
$(document).ready(function () {
    $.ajax({
        url: "http://127.0.0.1:8887/flight_tracks.csv",
        dataType: "text",
        success: function (data) {
            var aircraft_data = data.split(/\r?\n|\r/);

            for (var count = 0; count < aircraft_data.length - 1; count++) {
                var flight_found = 0;
                var store;
                var cell_data = aircraft_data[count].split(",");
                MSG = cell_data[0];
                message_type = cell_data[1];
                a = cell_data[2];
                b = cell_data[3];
                HEX_code = cell_data[4];
                c = cell_data[5];
                received_date = cell_data[6];
                received_time = cell_data[7];
                transmitted_date = cell_data[8];
                transmitted_time = cell_data[9];
                flight_No = cell_data[10];
                altitude = cell_data[11];
                speed = cell_data[12];
                heading = cell_data[13];
                latitude = cell_data[14];
                longitude = cell_data[15];
                verticle_speed = cell_data[16];
                squawk = cell_data[17];
                origin = cell_data[18];
                destination = cell_data[19];
                f = cell_data[20];
                g = cell_data[21];

                table[flight_recorded] = [MSG, message_type, HEX_code, received_date, received_time, transmitted_date, transmitted_time, flight_No, altitude, speed, heading, latitude, longitude, verticle_speed, squawk, origin, destination];
                var time = table[flight_recorded][4].split(":");
                var second = time[2].split(".");
                var timeinnumber = ((time[0] * 3600) + (time[1] * 60) + Number(second[0])) + (second[1]);
                table[flight_recorded][16] = ((time[0] * 3600) + (time[1] * 60) + Number(second[0])) + (second[1]);
                flight_recorded = flight_recorded + 1;

                for (var i = 0; i < aircraft_table.length; i++) {
                    if (HEX_code == aircraft_table[i][0]) {
                        flight_found = 1;
                        store = i;
                        break;
                    }
                }


                if (flight_found == 1) {
                    if (aircraft_table[store][1] == "") {
                        aircraft_table[store][1] = flight_No;
                    }
                    aircraft_table[store][2][aircraft_table[i][2].length] = [received_date, received_time, transmitted_date, transmitted_time, altitude, speed, heading, latitude, longitude, verticle_speed, squawk, timeinnumber, origin, destination, timeinnumber];
                }
                else {
                    var k = aircraft_table.length;
                    aircraft_table[k] = [];
                    aircraft_table[k][0] = HEX_code;
                    aircraft_table[k][1] = flight_No;
                    aircraft_table[k][2] = [];
                    aircraft_table[k][2][0] = [received_date, received_time, transmitted_date, transmitted_time, altitude, speed, heading, latitude, longitude, verticle_speed, squawk, timeinnumber, origin, destination, timeinnumber];

                }

            }
            table_data += '<tr>';
            table_data += '<td>' + 'Flight_No' + '</td>';
            table_data += '<td>' + 'Aircraft Type' + '</td>';
            table_data += '<td>' + 'ICAO' + '</td>';
            table_data += '<td>' + 'Altitude' + '</td>';
            table_data += '<td>' + 'Speed' + '</td>';
            table_data += '<td>' + 'heading' + '</td>';
            table_data += '<td>' + 'Latitude' + '</td>';
            table_data += '<td>' + 'Longitude' + '</td>';
            table_data += '<td>' + 'Origin' + '</td>';
            table_data += '<td>' + 'Destination' + '</td>';
            table_data += '<td>' + 'Data recorded' + '</td>';
            table_data += '</tr>';
            for (var i = 0; i < aircraft_table.length; i++) {
                for (var temp = 0; temp < 7; temp++) {
                    temporary[temp] = '';
                }
                table_data += '<tr>';
                table_data += '<td>' + aircraft_table[i][0] + '</td>';
                table_data += '<td>' + aircraft_table[i][1] + '</td>';
                for (var j = aircraft_table[i][2].length - 1; j >= 0; j--) {
                    if (aircraft_table[i][2][j][4] != "") {
                        temporary[1] = aircraft_table[i][2][j][4];
                        break;
                    }
                }
                for (var j = aircraft_table[i][2].length - 1; j >= 0; j--) {
                    if (aircraft_table[i][2][j][5] != "") {
                        temporary[2] = aircraft_table[i][2][j][5];
                        break;
                    }
                }
                for (var j = aircraft_table[i][2].length - 1; j >= 0; j--) {
                    if (aircraft_table[i][2][j][6] != "") {
                        temporary[3] = aircraft_table[i][2][j][6];
                        break;
                    }
                }
                for (var j = aircraft_table[i][2].length - 1; j >= 0; j--) {
                    if (aircraft_table[i][2][j][7] != "") {
                        temporary[4] = aircraft_table[i][2][j][7];
                        break;
                    }
                }
                for (var j = aircraft_table[i][2].length - 1; j >= 0; j--) {
                    if (aircraft_table[i][2][j][8] != "") {
                        temporary[5] = aircraft_table[i][2][j][8];
                        break;
                    }
                }
                for (var j = aircraft_table[i][2].length - 1; j >= 0; j--) {
                    if (aircraft_table[i][2][j][12] != "") {
                        temporary[6] = aircraft_table[i][2][j][12];
                        break;
                    }
                }
                for (var j = aircraft_table[i][2].length - 1; j >= 0; j--) {
                    if (aircraft_table[i][2][j][13] != "") {
                        temporary[7] = aircraft_table[i][2][j][13];
                        break;
                    }
                }
                for (var m = 0; m < aircraft_type.length; m++) {
                    if (aircraft_table[i][0] == aircraft_type[m][0]) {
                        temporary[0] = aircraft_type[m][1];

                        break;
                    }
                }
                table_data += '<td>' + temporary[0] + '</td>';
                table_data += '<td>' + temporary[1] + '</td>';
                table_data += '<td>' + temporary[2] + '</td>';
 
                table_data += '<td>' + aircraft_table[i][2].length + '</td>';
                table_data += '</tr>';
            }
            table_data += '</table>';
            $('#flight_table').html(route1data);
        }
        
    });

    
});
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


                table[flight_recorded][5] = (Number(time[0] * 3600) + Number(time[1] * 60) + Number(time[2])) * 1000;
                flight_recorded = flight_recorded + 1;





            }
            table_data += '<tr>';
            table_data += '<td>' + 'Flight_No' + '</td>';



            table_data += '<td>' + 'Max Speed' + '</td>';


            table_data += '<td>' + 'Received time' + '</td>';
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
$(document).ready(function () {
    $.ajax({
        url: "http://127.0.0.1:8887/time.csv",
        dataType: "text",
        success: function (data) {
            var timeatpoint = data.split(/\r?\n|\r/);
            for (var i = 0; i < timeatpoint.length - 1; i++) {
                var aircraftapiaf = timeatpoint[i].split(",");
                var timetransformap = aircraftapiaf[1].split(":");
                var timetransformiaf = aircraftapiaf[2].split(":");
                aircraftapiaf[3] = (Number(timetransformap[0]) * 3600 + Number(timetransformap[1]) * 60 + Number(timetransformap[2])) * 1000;
                aircraftapiaf[4] = (Number(timetransformiaf[0]) * 3600 + Number(timetransformiaf[1]) * 60 + Number(timetransformiaf[2])) * 1000;
                aircrafttime[i] = [aircraftapiaf[0], aircraftapiaf[1], aircraftapiaf[2], aircraftapiaf[3], aircraftapiaf[4]];

            }
        }
    });
});
function algorithm() {
    var route1_table = '<table class="table table-bordered table-striped">';
    var route2_table = '<table class="table table-bordered table-striped">';
    sloting();
    route1_table += '<tr>';
    route1_table += '<td>' + "Flight Number" + '</td>';


    route1_table += '<td>' + "Destination" + '</td>';



    route1_table += '<td>' + "Assigned speed" + '</td>';
    route1_table += '<td>' + "Estimated arrival time" + '</td>';
    



    route1_table += '</tr>';
    route2_table += '<tr>';



    route2_table += '</tr>';

    for (var i = 0; i < route_1.length; i++) {

        route1_table += '<tr>';
        route1_table += '<td>' + route_1[i][0] + '</td>';
    
        
        route1_table += '<td>' + route_1[i][3] + '</td>';
       
        
        
        route1_table += '<td>' + String(route_1[i][7]).slice(0,7) + '</td>';
        route1_table += '<td>' + route_1[i][8] + '</td>';
       



        route1_table += '</tr>';
    }
    for (var i = 0; i < route_2.length; i++) {

        route2_table += '<tr>';
        route2_table += '<td>' + route_2[i][0] + '</td>';


        route2_table += '<td>' + route_2[i][3] + '</td>';



        route2_table += '<td>' + String(route_2[i][7]).slice(0,7) + '</td>';
        route2_table += '<td>' + route_2[i][8] + '</td>';




        route2_table += '</tr>';
    }
    route1_table += '</table>';
    route2_table += '</table>';
    $('#route1data').html(route1_table);
    $('#route2data').html(route2_table);

}
function sloting() {
    var route1_aircraft = 0;
    var route2_aircraft = 0;
    for (var i = 0; i <= table.length - 1; i++) {
        if (table[i][3] == "VHHH") {
            route_1[route1_aircraft] = [table[i][0], table[i][1], table[i][2], table[i][3], table[i][4], table[i][5]];
            route_1[route1_aircraft][6] = route_1[route1_aircraft][5] + (route_1[route1_aircraft][4] * 3600 / (route_1[route1_aircraft][1] * 1.852) * 1000);
            route_1[route1_aircraft][7] = table[i][1];
            route_1[route1_aircraft][9] = route_1[route1_aircraft][5];
            route1_aircraft++;
        }
        else if (table[i][3] == "ZSPD") {
            route_2[route2_aircraft] = [table[i][0], table[i][1], table[i][2], table[i][3], table[i][4], table[i][5]];
            route_2[route2_aircraft][6] = route_2[route2_aircraft][5] + (route_2[route2_aircraft][4] * 3600 / (route_2[route2_aircraft][1] * 1.852) * 1000);
            route_2[route2_aircraft][7] = table[i][1];
            route_2[route2_aircraft][9] = route_2[route2_aircraft][5];
            route2_aircraft++;
        }
    }

    for (var i = 1; i <= route_1.length - 1; i++) {
        for (var j = 0; j <= i - 1; j++) {

            if (route_1[i][6] < route_1[j][6]) {
                // check the aircraft assigned speed not to fall below 200 knots;
                if (((route_1[j][4] - ((route_1[i][5] - route_1[j][9]) / 1000 / 3600 * (route_1[j][7] * 1.852))) / (((route_1[j][6] + 120000) - route_1[i][5]) / 1000 / 3600) / 1.852) > 200) {
                    var store = route_1[j];
                    route_1[j] = route_1[i];
                    for (var k = i; k > j; k--) {
                        route_1[k] = route_1[k - 1];
                    }
                    route_1[j + 1] = store;
                    if (j != 0) {
                        if ((route_1[j][6] - route_1[j - 1][6]) < 120000) {

                            route_1[j][6] = route_1[j - 1][6] + 120000;

                            route_1[j][7] = (route_1[j][4] / ((route_1[j][6] - route_1[j][5]) / 1000 / 3600)) / 1.852;

                            for (var k = j + 1; k <= i; k++) {
                                if ((route_1[k][6] - route_1[k - 1][6]) < 120000) {

                                    route_1[k][6] = route_1[k - 1][6] + 120000;
                                    route_1[k][4] = route_1[k][4] - ((route_1[j][5] - route_1[k][9]) / 1000 / 3600 * (route_1[k][7] * 1.852));
                                    route_1[k][9] = route_1[j][5];
                                    route_1[k][7] = (route_1[k][4] / ((route_1[k][6] - route_1[k][9]) / 1000 / 3600)) / 1.852;

                                }
                            }
                        }

                    }
                }



            }

        }




        if ((route_1[i][6] - route_1[i - 1][6]) < 120000) {

            route_1[i][6] = route_1[i - 1][6] + 120000;
            route_1[i][7] = (route_1[i][4] / ((route_1[i][6] - route_1[i][5]) / 1000 / 3600)) / 1.852;


        }

    }

    for (var i = 1; i <= route_2.length - 1; i++) {
        for (var j = 0; j <= i - 1; j++) {

            if (route_2[i][6] < route_2[j][6]) {
                if (((route_2[j][4] - ((route_2[i][5] - route_2[j][9]) / 1000 / 3600 * (route_2[j][7] * 1.852))) / (((route_2[j][6] + 120000) - route_2[i][5]) / 1000 / 3600) / 1.852) > 200) {
                    var store = route_2[j];
                    route_2[j] = route_2[i];
                    for (var k = i; k > j; k--) {
                        route_2[k] = route_2[k - 1];
                    }
                    route_2[j + 1] = store;
                    if (j != 0) {
                        if ((route_2[j][6] - route_2[j - 1][6]) < 120000) {
                            route_2[j][6] = route_2[j - 1][6] + 120000;
                            route_2[j][7] = (route_2[j][4] / ((route_2[j][6] - route_2[j][5]) / 1000 / 3600)) / 1.852;

                            for (var k = j + 1; k <= i; k++) {
                                if ((route_2[k][6] - route_2[k - 1][6]) < 120000) {
                                    route_2[k][6] = route_2[k - 1][6] + 120000;
                                    route_2[k][4] = route_2[k][4] - ((route_2[j][5] - route_2[k][9]) / 1000 / 3600 * (route_2[k][7] * 1.852));
                                    route_2[k][9] = route_2[j][5];
                                    route_2[k][7] = (route_2[k][4] / ((route_2[k][6] - route_2[k][5]) / 1000 / 3600)) / 1.852;
                                }
                            }
                        }
                    }
                }
            }


        }

        if ((route_2[i][6] - route_2[i - 1][6]) < 120000) {

            route_2[i][6] = route_2[i - 1][6] + 120000;
            route_2[i][7] = (route_2[i][4] / ((route_2[i][6] - route_2[i][5]) / 1000 / 3600)) / 1.852;

        }


    }
    for (var i = 0; i <= route_1.length - 1; i++) {

        var time = route_1[i][6] / 1000;
        var timeinstring = String(time);
        var part = timeinstring.split(".");
        var number_part = Number(part[0]);
        var number_mini_seconds = Number(part[1])
        var hours = Math.floor(number_part / 3600);
        var minutes = Math.floor((number_part % 3600) / 60);
        var seconds = (number_part % 3600) % 60;
        var mini_seconds = number_mini_seconds;
        var initial_time = String(hours).concat(":", String(minutes), ":", String(seconds), ".", String(mini_seconds).slice(0,3));
        route_1[i][8] = initial_time;
    }
    for (var i = 0; i <= route_2.length - 1; i++) {

        var time = route_2[i][6] / 1000;
        var timeinstring = String(time);
        var part = timeinstring.split(".");
        var number_part = Number(part[0]);
        var number_mini_seconds = Number(part[1])
        var hours = Math.floor(number_part / 3600);
        var minutes = Math.floor((number_part % 3600) / 60);
        var seconds = (number_part % 3600) % 60;
        var mini_seconds = number_mini_seconds;
        var initial_time = String(hours).concat(":", String(minutes), ":", String(seconds), ".", String(mini_seconds).slice(0,3));
        route_2[i][8] = initial_time;
    }
}



function analysis() {
    var ZSSS = [];
    var hrsdZSSS = [];
    var hrZSSS = [];


    for (var i = 0; i <= 23; i++) {
        hrZSSS[i] = [];

    }
    var meanZSSS = 0;

    var maxZSSS = 0;

    var minZSSS = 0;

    var sdZSSS = [];

    var hrmeanZSSS = [];

    var hrmaxZSSS = [];


    var hrminZSSS = [];

    for (var i = 0; i <= 23; i++) {
        hrmeanZSSS[i] = 0;

        hrmaxZSSS[i] = 0;

        hrminZSSS[i] = 0;

        hrsdZSSS[i] = [];
 
    }
 
    sloting();

    for (var i = 0; i < route_1.length; i++) {
        for (var j = 0; j < aircrafttime.length; j++) {
            if (route_1[i][0] == aircrafttime[j][0]) {
                if (route_1[i][5] == aircrafttime[j][3]) {
                    ZSSS[i] = [route_1[i][0], Number(aircrafttime[j][4]) - Number(route_1[i][6]), aircrafttime[j][3]];

                    break;
                }
            }
        }
    }
   
    for (var i = 0; i < ZSSS.length; i++) {
        meanZSSS = meanZSSS + Number(ZSSS[i][1]);
    }

    meanZSSS = meanZSSS / ZSSS.length;

    for (var i = 0; i < ZSSS.length; i++) {
        if (ZSSS[i][1] > maxZSSS) {
            maxZSSS = ZSSS[i][1];
        }
    }

    minZSSS = ZSSS[0][1];
    for (var i = 0; i < ZSSS.length; i++) {
        if (ZSSS[i][1] < minZSSS) {
            minZSSS = ZSSS[i][1];
        }
    }

    for (var i = 0; i < ZSSS.length; i++) {
        sdZSSS[i] = ZSSS[i][1];
    }

    for (var i = 0; i < ZSSS.length; i++) {
        var hr = Math.floor(ZSSS[i][2] / 1000 / 3600);
        hrZSSS[hr][hrZSSS[hr].length] = [ZSSS[i][0], ZSSS[i][1], ZSSS[i][2]];
    }
   
    for (var i = 0; i <= 23; i++) {
        for (var j = 0; j < hrZSSS[i].length; j++) {
            hrmeanZSSS[i] = hrmeanZSSS[i] + hrZSSS[i][j][1];

        }
    }
   
    for (var i = 0; i <= 23; i++) {
        hrmeanZSSS[i] = hrmeanZSSS[i] / Number(hrZSSS[i].length);
    }
 
    for (var i = 0; i <= 23; i++) {
        for (var j = 0; j < hrZSSS[i].length; j++) {
            if (hrZSSS[i][j][1] > hrmaxZSSS[i]) {
                hrmaxZSSS[i] = hrZSSS[i][j][1];
            }
        }
    }
  
    for (var i = 0; i <= 23; i++) {
        if (hrZSSS[i].length !== 0) {
            hrminZSSS[i] = hrZSSS[i][0][1];
        }
        
        for (var j = 0; j < hrZSSS[i].length; j++) {
            if (hrZSSS[i][j][1] < hrminZSSS[i]) {
                hrminZSSS[i] = hrZSSS[i][j][1];
            }
        }
    }
   
    for (var i = 0; i <= 23; i++) {
        for (var j = 0; j < hrZSSS[i].length; j++) {
            hrsdZSSS[i][j] = Number(hrZSSS[i][j][1]);
            
        }
    }
   
    var daytable = '<table class="table table-bordered table-striped">';
    daytable += '<tr>';
    daytable += '<td>' + "24 Hours" + '</td>';
    daytable += '</tr>';
    daytable += '<tr>';
    daytable += '<td>' + "Route" + '</td>';
    daytable += '<td>' + "Handled" + '</td>';
    daytable += '<td>' + "SD" + '</td>';
    daytable += '<td>' + "Mean" + '</td>';
    daytable += '<td>' + "Max" + '</td>';
    daytable += '<td>' + "Min" + '</td>';
    daytable += '</tr>';
    daytable += '<tr>';
    daytable += '<td>' + "VHHH" + '</td>';
    daytable += '<td>' + route_1.length + '</td>';
    daytable += '<td>' + timetransform(sd(sdZSSS))+'</td>';
    daytable += '<td>' + timetransform(meanZSSS)+ '</td>';
    daytable += '<td>' + timetransform(maxZSSS) + '</td>';
    if (minZSSS < 0) {
        minZSSS = String(minZSSS);
        minZSSS = minZSSS.substring(1, minZSSS.length);
        minZSSS = Number(minZSSS);
        daytable += '<td>' + "-" + timetransform(Number(minZSSS)) + '</td>';
    } else {
        daytable += '<td>' + timetransform(minZSSS) + '</td>';
    }
    
    


    daytable += '</table>';
    document.getElementById("route1data").innerHTML = daytable;

    var hourtable = '<table class="table table-bordered table-striped">';
    hourtable += '<tr>';
    hourtable += '<td>' + "1 Hour   VHHH" + '</td>';
    hourtable += '</tr>';
    hourtable += '<tr>';
    hourtable += '<td>' + "Hour" + '</td>';
    hourtable += '<td>' + "Handled" + '</td>';
    hourtable += '<td>' + "SD" + '</td>';
    hourtable += '<td>' + "Mean" + '</td>';
    hourtable += '<td>' + "Max" + '</td>';
    hourtable += '<td>' + "Min" + '</td>';
    hourtable += '</tr>';
    for (var i = 0; i <= 23; i++) {
        hourtable += '<tr>';
        hourtable += '<td>' + i + '</td>';
        hourtable += '<td>' + hrZSSS[i].length + '</td>';
        if (hrZSSS[i].length !== 0) {
        hourtable += '<td>' + timetransform(sd(hrsdZSSS[i])) + '</td>';
        hourtable += '<td>' + timetransform(hrmeanZSSS[i]) + '</td>';
            hourtable += '<td>' + timetransform(Number(hrmaxZSSS[i])) + '</td>';
            if (hrminZSSS[i] < 0) {
                hrminZSSS[i] = String(hrminZSSS[i]);
                hrminZSSS[i] = hrminZSSS[i].substring(1, hrminZSSS[i].length);
                hrminZSSS[i] = Number(hrminZSSS[i]);
                hourtable += '<td>' + "-" + timetransform(Number(hrminZSSS[i])) + '</td>';
            } else {
                hourtable += '<td>' + timetransform(Number(hrminZSSS[i])) + '</td>';
            }
            
    }
    else {
        hourtable += '<td>' + "0" + '</td>';
        hourtable += '<td>' + "0" + '</td>';
            hourtable += '<td>' + "0" + '</td>';
            hourtable += '<td>' + "0" + '</td>';
    }
        hourtable += '</tr>';
    }
   


    hourtable += '</table>';
    document.getElementById("route2data").innerHTML = hourtable;
}

function timetransform(caltime) {
    var time = caltime / 1000;
    var timeinstring = String(time);
    var part = timeinstring.split(".");
    var number_part = Number(part[0]);
    var number_mini_seconds = Number(part[1])
    var hours = Math.abs(Math.floor(number_part / 3600));
    var minutes = Math.abs(Math.floor((number_part % 3600) / 60));
    var seconds = Math.abs((number_part % 3600) % 60);
    var mini_seconds = Math.abs(number_mini_seconds);
    if (caltime < 0) {
        var initial_time = "-".concat(String(hours), ":", String(minutes), ":", String(seconds), ".", String(mini_seconds).slice(0,3));
    }
    else {
        var initial_time = String(hours).concat(":", String(minutes), ":", String(seconds), ".", String(mini_seconds).slice(0, 3));
    }

    return initial_time;
}

function sd(array) {
    var n = array.length;
    var mean = array.reduce((a, b) => a + b) / n;
    var s = Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
    return s;
}


function circulating() {
    var cirZSSS = '<table class="table table-bordered table-striped">';
    var cirZSPD = '<table class="table table-bordered table-striped">';
    for (var i = 0; i < aircraft_table.length; i++) {
        for (var j = aircraft_table[i][2].length-40; j >40; j--) {
            if (((Math.abs(Number(aircraft_table[i][2][j][6]) - Number(aircraft_table[i][2][j - 7][6])) > 80) && (Math.abs(Number(aircraft_table[i][2][j][6]) - Number(aircraft_table[i][2][j - 7][6])) < 180)) || ((Math.abs(Number(aircraft_table[i][2][j][6]) - Number(aircraft_table[i][2][j - 7][6])) < 280) && (Math.abs(Number(aircraft_table[i][2][j][6]) - Number(aircraft_table[i][2][j - 7][6])) > 180))) {
                if ((Number(aircraft_table[i][2][j][14]) - Number(aircraft_table[i][2][j - 10][14])) < 90000) {
                    if (aircraft_table[i][2][j][13] == "VHHH") {
                    cirZSSS += '<tr>';
                        cirZSSS += '<td>' + aircraft_table[i][0] + '</td>';
                        cirZSSS += '<td>' + aircraft_table[i][2][j][1] + '</td>';
                        cirZSSS += '<td>' + aircraft_table[i][2][j - 7][1] + '</td>';
                        cirZSSS += '<td>' + aircraft_table[i][2][j][6] + '</td>';
                        cirZSSS += '<td>' + aircraft_table[i][2][j-7][6] + '</td>';
                    cirZSSS += '</tr>';
                    }
                    else if (aircraft_table[i][2][j][13] == "ZSPD") {
                    cirZSPD += '<tr>';
                        cirZSPD += '<td>' + aircraft_table[i][0] + '</td>';
                        cirZSPD += '<td>' + aircraft_table[i][2][j][1] + '</td>';
                        cirZSPD += '<td>' + aircraft_table[i][2][j - 7][1] + '</td>';
                        cirZSPD += '<td>' + aircraft_table[i][2][j][6] + '</td>';
                        cirZSPD += '<td>' + aircraft_table[i][2][j - 7][6] + '</td>';
                    cirZSPD += '</tr>';
                    }
                }
                break;
            }
                
            
           
        }
    }
    cirZSSS += '</table>';
    cirZSPD += '</table>';
    document.getElementById("route1data").innerHTML = cirZSSS;
    document.getElementById("route2data").innerHTML = cirZSPD;
}
