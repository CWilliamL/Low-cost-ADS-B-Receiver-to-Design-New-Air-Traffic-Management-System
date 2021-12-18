var slider;
var output;
function con_bar() {
    var minimum = aircraft_table[0][2][0][11];
    var maximum = aircraft_table[0][2][0][11];
    for (var i = 0; i < aircraft_table.length; i++) {
        for (var j = 0; j < aircraft_table[i][2].length; j++) {
            if (aircraft_table[i][2][j][11] < Number(minimum)) {
                minimum = aircraft_table[i][2][j][11]
            }
        }
    }
    for (var i = 0; i < aircraft_table.length; i++) {
        for (var j = 0; j < aircraft_table[i][2].length; j++) {
            if (aircraft_table[i][2][j][11] > Number(maximum)) {
                maximum = aircraft_table[i][2][j][11]
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

            route1_aircraft++;
        }
        else if (table[i][3] == "ZSPD") {
            route_2[route2_aircraft] = [table[i][0], table[i][1], table[i][2], table[i][3], table[i][4], table[i][5]];
            route_2[route2_aircraft][6] = route_2[route2_aircraft][5] + (route_2[route2_aircraft][4] * 3600 / (route_2[route2_aircraft][1] * 1.852) * 1000);
            route_2[route2_aircraft][7] = table[i][1];
            route2_aircraft++;
        }
    }
    
    document.getElementById("myRange").min = minimum;
    document.getElementById("myRange").max = maximum;
    document.getElementById("myRange").value = minimum;
    slider = document.getElementById("myRange");
    output = document.getElementById("bar");
    var hours = Math.floor(slider.value.slice(0, document.getElementById("myRange").value.length - 3) / 3600);
    var minutes = Math.floor((slider.value.slice(0, document.getElementById("myRange").value.length - 3) % 3600) / 60);
    var seconds = (slider.value.slice(0, document.getElementById("myRange").value.length - 3) % 3600) % 60;
    var mini_seconds = slider.value.slice(document.getElementById("myRange").value.length - 3, document.getElementById("myRange").value.length);
    var initial_time = String(hours).concat(":", String(minutes), ":", String(seconds), ".", mini_seconds);
    output.innerHTML = initial_time;
    slider.oninput = function () {
        controlable();

        var hours = Math.floor(this.value.slice(0, document.getElementById("myRange").value.length - 3) / 3600);
        var minutes = Math.floor((this.value.slice(0, document.getElementById("myRange").value.length - 3) % 3600) / 60);
        var seconds = (this.value.slice(0, document.getElementById("myRange").value.length - 3) % 3600) % 60;
        var mini_seconds = this.value.slice(document.getElementById("myRange").value.length - 3, document.getElementById("myRange").value.length);
        var dynamic_time = String(hours).concat(":", String(minutes), ":", String(seconds), ".", mini_seconds);
        output.innerHTML = dynamic_time;
    }

    var airtable = '<table class="table table-bordered table-striped">';
    airtable += '<tr>';
    airtable += '<td>' + "Flight Number" + '</td>';
    airtable += '<td>' + "Aircraft Type" + '</td>';
    airtable += '</tr>';
    for (i = 0; i < aircraft_table.length; i++) {
        airtable += '<tr>';
        airtable += '<td>' + aircraft_table[i][0] + '</td>';
        airtable += '<td>' + aircraft_table[i][1] + '</td>';
        airtable += '</tr>';
    }
    airtable += '</table>';
    document.getElementById("route1data").innerHTML = airtable;
    document.getElementById("route2data").innerHTML = "";
};