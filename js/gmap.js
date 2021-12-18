var map;
var markers = [];
var t = 0;
var loop;

function initMap() {
    var HongKong = { lat: 22.396427, lng: 114.109497 };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: HongKong,
    });
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}
function clearMarkers() {
    setMapOnAll(null);
}


function addMarker(location,number,heading) {
    var planeSymbol = {
        path: 'M362.985,430.724l-10.248,51.234l62.332,57.969l-3.293,26.145 l-71.345-23.599l-2.001,13.069l-2.057-13.529l-71.278,22.928l-5.762-23.984l64.097-59.271l-8.913-51.359l0.858-114.43 l-21.945-11.338l-189.358,88.76l-1.18-32.262l213.344-180.08l0.875-107.436l7.973-32.005l7.642-12.054l7.377-3.958l9.238,3.65 l6.367,14.925l7.369,30.363v106.375l211.592,182.082l-1.496,32.247l-188.479-90.61l-21.616,10.087l-0.094,115.684',
        scale: 0.08,
        strokeOpacity: 1,
        color: '#FFFFFF',
        strokeWeight: 1,
        rotation: Number(heading),
        anchor: new google.maps.Point(400, 400)
    };
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: number,
        icon: planeSymbol
    });
    markers.push(marker);
}

function plotpoint() {
    clearMarkers();
    var x = document.getElementById("unwanted").value;
    var y = Number(x);
    var angle = 0;
    con_bar();
    for (var i = 0; i < aircraft_table.length; i++) {
        for (var j = aircraft_table[i][2].length - 1; j >= 0; j--) {
            if (aircraft_table[i][2][j][7] != "") {
                
                    for (var k = j - 1; k >= 0; k--) {
                        if (aircraft_table[i][2][k][6] != "") {
                            angle = aircraft_table[i][2][k][6];
                        }
                    }

                    var uluru = { lat: Number(aircraft_table[i][2][j][7]), lng: Number(aircraft_table[i][2][j][8]) };
                    var aircraft_no = aircraft_table[i][0] + "," + aircraft_table[i][1] + "at" + aircraft_table[i][2][j][4];
                    addMarker(uluru, aircraft_no, angle);
                
            }
        }
    }
}
function plotpoint_altitude() {
    clearMarkers();
    var x = document.getElementById("unwanted").value;
    var y = Number(x);
    var angle=0;
    con_bar();
    for (var i = 0; i < aircraft_table.length; i++) {
        for (var j = aircraft_table[i][2].length - 1; j >= 0; j--) {
            if (aircraft_table[i][2][j][7] != "") {
                if (aircraft_table[i][2][j][4] <= y) {
                    for (var k = j - 1; k>= 0; k--) {
                        if (aircraft_table[i][2][k][6] != "") {
                            angle = aircraft_table[i][2][k][6];
                        }
                    }
                   
                    var uluru = { lat: Number(aircraft_table[i][2][j][7]), lng: Number(aircraft_table[i][2][j][8]) };
                    var aircraft_no = aircraft_table[i][0]+","+aircraft_table[i][1]+"at"+aircraft_table[i][2][j][4];
                    addMarker(uluru, aircraft_no,angle);
                }
            }
        }
    }
}

function specific_aircraft() {
    
    clearMarkers();
    con_bar();
    var ICAO_code = document.getElementById("aircraft").value;
    for (var i = 0; i < aircraft_table.length; i++) {
        if (aircraft_table[i][0] == ICAO_code) {
            for (var j = 0; j < aircraft_table[i][2].length;j++) {
      
                    
                      
                                angle = aircraft_table[i][2][j][6];
           
                        var uluru = { lat: Number(aircraft_table[i][2][j][7]), lng: Number(aircraft_table[i][2][j][8]) };
                    var aircraft_no = aircraft_table[i][0] + "," + aircraft_table[i][1] + "at " + aircraft_table[i][2][j][4] + "," + angle + "," + aircraft_table[i][2][j][1];
                        addMarker(uluru, aircraft_no, angle);
                    
                
            }
        }
       
    }
}

function controlable() {
    clearMarkers();
    for (var i = 0; i < aircraft_table.length; i++) {
        for (var j = aircraft_table[i][2].length - 1; j >= 0; j--) {
            if (aircraft_table[i][2][j][7] != "") {
                if (((document.getElementById("myRange").value - aircraft_table[i][2][j][11]) <= 5000) && ((document.getElementById("myRange").value - aircraft_table[i][2][j][11]) >= 0)) {
                    for (var k = j - 1; k >= 0; k--) {
                        if (aircraft_table[i][2][k][6] != "") {
                            var angle = aircraft_table[i][2][k][6];
                            break;
                        }
                    }
                    var uluru = { lat: Number(aircraft_table[i][2][j][7]), lng: Number(aircraft_table[i][2][j][8]) };
                    var aircraft_no = aircraft_table[i][0] + "," + aircraft_table[i][1] + "at " + aircraft_table[i][2][j][4] + "," + angle + "," + aircraft_table[i][2][j][7] + "," + Number(aircraft_table[i][2][j][8]);
                    addMarker(uluru, aircraft_no, angle);
                    break;
                }
            }
        }
    }

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
    var route1_table = '<table class="table table-bordered table-striped">';
    var route2_table = '<table class="table table-bordered table-striped">';
    for (var i = 1; i <= route_1.length - 1; i++) {
        for (var j = 0; j <= i - 1; j++) {
            if ((document.getElementById("myRange").value - route_1[i][5]) >= 0) {
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
        }



        if ((document.getElementById("myRange").value - route_1[i][5]) >= 0) {
            if ((route_1[i][6] - route_1[i - 1][6]) < 120000) {

                route_1[i][6] = route_1[i - 1][6] + 120000;
                route_1[i][7] = (route_1[i][4] / ((route_1[i][6] - route_1[i][5]) / 1000 / 3600)) / 1.852;


            }
        }
    }

    for (var i = 1; i <= route_2.length - 1; i++) {
        for (var j = 0; j <= i - 1; j++) {
            if ((document.getElementById("myRange").value - route_2[i][5]) >= 0) {
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

        }
        if ((document.getElementById("myRange").value - route_2[i][5]) >= 0) {
            if ((route_2[i][6] - route_2[i - 1][6]) < 120000) {

                route_2[i][6] = route_2[i - 1][6] + 120000;
                route_2[i][7] = (route_2[i][4] / ((route_2[i][6] - route_2[i][5]) / 1000 / 3600)) / 1.852;

            }
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
    route1_table += '<tr>';
    route1_table += '<td>' + "Flight Number" + '</td>';
    route1_table += '<td>' + "Destination" + '</td>';
    route1_table += '<td>' + "Assigned speed" + '</td>';
    route1_table += '<td>' + "Estimated arrival time" + '</td>';
    route1_table += '</tr>';
    route2_table += '<tr>';

    route2_table += '</tr>';

    for (var i = 0; i < route_1.length; i++) {
        if (((document.getElementById("myRange").value - route_1[i][5]) <= 1800000) && ((document.getElementById("myRange").value - route_1[i][5]) >= 0)) {
            route1_table += '<tr>';
            route1_table += '<td>' + route_1[i][0] + '</td>';


            route1_table += '<td>' + route_1[i][3] + '</td>';



            route1_table += '<td>' + String(route_1[i][7]).slice(0,7) + '</td>';
            route1_table += '<td>' + route_1[i][8] + '</td>';



            route1_table += '</tr>';
        }


    }
    for (var i = 0; i < route_2.length; i++) {
        if (((document.getElementById("myRange").value - route_2[i][5]) <= 1800000) && ((document.getElementById("myRange").value - route_2[i][5]) >= 0)) {
            route2_table += '<tr>';
            route2_table += '<td>' + route_2[i][0] + '</td>';


            route2_table += '<td>' + route_2[i][3] + '</td>';

            route2_table += '<td>' + String(route_2[i][7]).slice(0,7) + '</td>';
            route2_table += '<td>' + route_2[i][8] + '</td>';



            route2_table += '</tr>';
        }


    }

    route1_table += '</table>';
    route2_table += '</table>';


    document.getElementById("route1data").innerHTML = route1_table;
    document.getElementById("route2data").innerHTML = route2_table;
}



function plotanimation() {
    clearMarkers();
    t = Number(t) + 5000;
    document.getElementById("myRange").value = String(t);
    var hours = Math.floor(slider.value.slice(0, document.getElementById("myRange").value.length - 3) / 3600);
    var minutes = Math.floor((slider.value.slice(0, document.getElementById("myRange").value.length - 3) % 3600) / 60);
    var seconds = (slider.value.slice(0, document.getElementById("myRange").value.length - 3) % 3600) % 60;
    var mini_seconds = slider.value.slice(document.getElementById("myRange").value.length - 3, document.getElementById("myRange").value.length);
    var initial_time = String(hours).concat(":", String(minutes), ":", String(seconds), ".", mini_seconds);
    output.innerHTML = initial_time;
    for (var i = 0; i < aircraft_table.length; i++) {
        for (var j = aircraft_table[i][2].length - 1; j >= 0; j--) {
            if (aircraft_table[i][2][j][7] != "") {
                if (((document.getElementById("myRange").value - aircraft_table[i][2][j][11]) <= 10000) && ((document.getElementById("myRange").value - aircraft_table[i][2][j][11]) >= 0)) {
                    for (var k = j - 1; k >= 0; k--) {
                        if (aircraft_table[i][2][k][6] != "") {
                            var angle = aircraft_table[i][2][k][6];
                            break;
                        }
                    }
                    var uluru = { lat: Number(aircraft_table[i][2][j][7]), lng: Number(aircraft_table[i][2][j][8]) };
                    var aircraft_no = aircraft_table[i][0] + "," + aircraft_table[i][1] + "at " + aircraft_table[i][2][j][4] + "," + angle;
                    addMarker(uluru, aircraft_no, angle);
                    break;
                }
            }
        }
    }
}

function animation() {

    t = document.getElementById("myRange").value;
    loop = setInterval(plotanimation, 1000);
}

function end() {
    clearInterval(loop);
}