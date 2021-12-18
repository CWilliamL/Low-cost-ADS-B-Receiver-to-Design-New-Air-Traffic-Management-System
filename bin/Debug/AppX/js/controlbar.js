var slider;
var output;
function con_bar() {
    var minimum = table[0][5];
    var maximum = table[table.length-1][5];
    for (var i = 0; i < table.length; i++) {
        
            if (table[i][5] < minimum) {
                minimum = table[i][5];
            }
        }
    
    for (var i = 0; i < table.length; i++) {
        
            if (table[i][5] > maximum) {
                maximum = table[i][5];
            }
        }
        
    
    document.getElementById("myRange").min = minimum;
    document.getElementById("myRange").max = maximum;
    document.getElementById("myRange").value = minimum;
    slider = document.getElementById("myRange");
    output = document.getElementById("bar");
    var hours = Math.floor(slider.value.slice(0, document.getElementById("myRange").value.length-3) / 3600);
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
};