(function() {
    /**
	* This function is a drawing function; you should put all your drawing logic in it.
	* it's called in moduleFunc.prototype.render
	* @param {Object} data - data set passed in
	* @param {SVG Group} vis - canvas which is an svg group element
	* @param {float} width - width of canvas
	* @param {float} height - height of canvas
	* @param {Array of color string} colorPalette - color palette
	* @param {Object} properties - properties of chart
	* @param {Object} dispatch - event dispatcher
	*/

    var mystyle = ".sea { fill:#4682b4 !important; }";

    var tooltipsytle = "div.tooltipsss {\
                        position: absolute;\
                        text-align: center;\
                        width: 250px;\
                        height: 117px;\
                        padding: 2px;\
                        font: 12px sans-serif;\
                        background: lightsteelblue;\
                        border: 0px;\
                        border-radius: 8px;\
                        pointer-events: none;\
                        }";

    $('head').append("<style>" + mystyle + tooltipsytle + "</style>");

    tooltipsytle = "div.donuttipsss {\
                        position: absolute;\
                        text-align: center;\
                        width: 100px;\
                        height: 30px;\
                        padding: 2px;\
                        font: 12px sans-serif;\
                        background: lightsteelblue;\
                        border: 0px;\
                        border-radius: 8px;\
                        pointer-events: none;\
                        }";

    $('head').append("<style>" + mystyle + tooltipsytle + "</style>");


    // var str = "container";
    // $('body').append("<div id="+ str +"></div>")

	function render(data, vis, width, height, colorPalette, properties, dispatch) {
		// This function is not used anymore - therefore the paint function is used.

        // retrieve data - just like in the render function
        var fdata = _util.toFlattenTable(data);
        if (!fdata) {
            return;
        }

        
        var dsName = _util.mapping.dses[0], //use first dimension set as data source of x axis
        dims = fdata.meta[dsName] || [], msName = _util.mapping.mses[0], //use first measure set as data source of y axis
        measure = fdata.meta[msName][0];
        //convert data to 2-fields table: field 0 is combination of all dimensions, and field 1 is measure value
        fdata = fdata.map(function(d) {
            var val = parseFloat(d[msName][0]), //use data of first measure of first measure set
            mems = d[dsName] || [];
            val = isNaN(val) ? 0 : val;
            return [mems.join(" / "), val];
        });
        
        //console.log("fdata var" + fdata);

        // Exceptionhandling - just in case
        try {
            // Minimize all svg elements to get the full canvas
            //vis.attr("height", "1px").attr("width", "1px");
            //$(".v-m-root").attr("height", "1px").attr("width", "1px");
            //$(".datamap").attr("height", "1px").attr("width", "1px");
            
            // define require.js libs (based on the file location). If the file is used in the extensionfolder use a /sap/ui/ in front.
            // else use the normal filepath. Please see the difference in the uncommented d3 call
            require.config({
                'paths': {
                    'app': 'app',
                    'jquery': 'jquery',
                    //////'d3': '../bundles/schwarzm/viz/ext/geoworld/d3.v3', // when used in Extension
                    //////'d3': '../sap/bi/bundles/schwarzm/viz/ext/geoworld/d3.v3',
                    'D3': '../sap/bi/bundles/globe/viz/ext/flight/d3.v3.min', // when used in myExtension
                    'topojson': '../sap/bi/bundles/globe/viz/ext/flight/topojson.v1.min',
                    'datamaps': '../sap/bi/bundles/globe/viz/ext/flight/world-110m',
                    'domReady': '../sap/bi/bundles/globe/viz/ext/flight/domReady',
                    // 'D3': '../globe/viz/ext/flight/d3.v3.min',
                    // 'topojson': '../globe/viz/ext/flight/topojson.v1.min',
                    // 'domReady': '../globe/viz/ext/flight/domReady',
                    // 'datamaps': '../globe/viz/ext/flight/world-110m',
                    //'rotate': '../globe/viz/ext/flight/d3.geo.zoom',
                    //'rotate': '../sap/bi/bundles/globe/viz/ext/flight/d3.geo.zoom',
                },
                shim: {
                    D3: {
                        exports: 'D3'
                    },
                    // rotate: {
                    //     exports: 'rotate'
                    // },
                    topojson: {
                        deps: ['D3'],
                        exports: 'topojson'
                    },
                    datamaps: {
                        deps: ['D3', 'topojson'], //, 'rotate'],
                    },
                }
            });

            // Define require.js module with all needed js libs
            define("runtime", function(require) {
                var $ = require('jquery');
                var D3 = require('D3');
                var topojson = require('topojson');
                var Datamap = require('datamaps');
                var domReady = require('domReady');
                //var rotate = require('rotate');
                // return the required objects - can be used when module is used inside a require function
                return {
                    topojson: topojson,
                    Datamap: Datamap,
                    domReady: domReady,
                    $:$,
                    D3:D3
                    //rotate:rotate
                }
            });
            
            // Exception handling for require.js In case of an error it alerts the message. For example if gmaps could not be loaded
            require.onError = function (err) {
                if (err.requireType === 'timeout') {
                    alert("error: "+err);
                } else {
                    throw err;
                }   
            };
            
            /////// execute the real code to draw a map with the datamaps.js library
            // https://github.com/markmarkoh/datamaps/blob/master/README.md#getting-started
            require(["runtime"], function(runt) {
                // set the div passed by the function parameter
                //var Test = divExtension;
                
                // use domready to execute it after all of the dom is load
                runt.domReady(function() {
                    
                    //+++ragha+++ this is where my code goes!
                    var curx, cury, px, py, accx, accy, ox = 0, oy = 0;
                    var source, dest, option = "none", routeFlag = "Show Only Selected Routes", routeCount = 0;
                    var geoRadius = 200;

                    // var width = 960,
                    //     height = 550;

                    //tooltips!
                    var div = runt.D3.select("body").append("div")   
                        .attr("class", "tooltipsss")               
                        .style("opacity", 0);

                    var div2 = runt.D3.select("body").append("div")   
                        .attr("class", "donuttipsss")               
                        .style("opacity", 0);

                    //button options
                    showMenu();

                    var projection = runt.D3.geo.orthographic()
                        .scale(geoRadius)
                        .translate([width / 2, height / 2])
                        .clipAngle(90);

                    var path = runt.D3.geo.path()
                        .pointRadius(3)
                        .projection(projection);

                    var λ = runt.D3.scale.linear()
                        .domain([0, width])
                        .range([-360, 360]);

                    var φ = runt.D3.scale.linear()
                        .domain([0, height])
                        .range([180, -180]);

                       

                    //drag behaviour
                    var drag = d3.behavior.drag()
                        .on("drag", function(d,i) {

                          var p = d3.mouse(this);

                          curx = (p[0] ) ;
                          cury = (p[1] ) ;

                          projection.rotate([λ(curx), φ(cury)]);
                          projection.center([0, 0]);
                          vis.selectAll(".countries").attr("d", path);
                          vis.selectAll(".land").attr("d", path);
                          vis.selectAll(".route").attr("d", path);
                          vis.selectAll(".city").attr("d", path);
                          //vis.selectAll(":not(.arc)").attr("d", path); 
                          //showDonut();
                          //vis.selectAll("arc").attr("d", path);
                        });

                    //vis.on("dblclick.zoom", null);
                    var backgroundCircle = vis.append("circle")
                            .attr("cx", width / 2)
                            .attr("cy", height / 2)
                            .attr("r", projection.scale())
                            .attr("class", "sea")
                            .attr("id", "background")
                            .call(drag);

                    var land = vis.append("path")
                          .datum(runt.topojson.feature(mapdata, mapdata.objects.land))
                          .attr("class", "land")
                          .attr("d", path)
                          .call(drag);

                    vis.append("path")
                          .datum(runt.topojson.feature(mapdata, mapdata.objects.countries))
                          .attr("class", "countries")
                          .attr("d", path)
                          .attr("fill", "#f4a460")
                          //.attr("fill", "#d3d3d3")
                          .style("stroke-width", "0.5px")
                          .style("stroke", "rgb(255,255,255)")
                          .call(drag); 


                    //get data from backend
                    //"Date, OPERATOR_TYPE, FROM, FROM_LONGITUDE, FROM_LATITUDE, TO, TO_LONGITUDE, TO_LATITUDE, CRASH_LOC, REASON, Fatilities",
                    var flights = [];
                    var nDim = 0; 
                    for (var datasets in fdata) {
                        // access rowdata of dataset
                        var Dim1 = fdata[datasets][0];
                        var Dim1Split = Dim1.split(" / ");

                        var flightDate =  Dim1Split[0], 
                            operator =  Dim1Split[1],
                            fromName =  Dim1Split[2], 
                            fromLong = (Dim1Split[3]==undefined || Dim1Split[3]=="NA") ? "": Dim1Split[3],
                            fromLat = (Dim1Split[4]==undefined || Dim1Split[4]=="NA") ? "": Dim1Split[4],
                            to = Dim1Split[5],
                            toLong = (Dim1Split[6]==undefined || Dim1Split[6]=="NA") ? "": Dim1Split[6],
                            toLat = (Dim1Split[7]==undefined || Dim1Split[7]=="NA") ? "": Dim1Split[7],
                            crashLoc = Dim1Split[8],
                            reason = Dim1Split[9],
                            fatilities = Dim1Split[10];

                            // 1 – Pilot Error
                            // 2 – Weather
                            // 3- Engine fault
                            // 4- Sabotage
                            // 5- Fire
                            // 0 - Others

                            if (operator == "Others"){
                                operator = "Commercial";
                            }

                            if(reason == 1){ reason = "Pilot Error";}
                            else if(reason == 2){ reason = "Weather";}
                            else if(reason == 3){ reason = "Engine fault";}
                            else if(reason == 4){ reason = "Sabotage";}
                            else if(reason == 5){ reason = "Fire";}
                            else {reason = "Others";}

                           flights[nDim] = {
                            date: flightDate, fname: operator, from: fromName, fromLong: fromLong, fromLat: fromLat,
                            to:to, toLong:toLong, toLat:toLat, crashLoc:crashLoc, reason:reason, fatilities:fatilities
                            };

                            if(flights[nDim].fromLong != "" && flights[nDim].fromLat != "" && flights[nDim].toLong != "" && flights[nDim].toLat != ""){
                                var x = [flights[nDim].fromLong, flights[nDim].fromLat];
                                var y = [flights[nDim].toLong, flights[nDim].toLat];

                                drawPath(x, y, flights[nDim].date, flights[nDim].fname, flights[nDim].from, flights[nDim].to, flights[nDim].crashLoc, flights[nDim].reason, flights[nDim].fatilities);
                                drawCity(x, "first");
                                drawCity(y, "second");

                                routeCount ++;
                            }
                        nDim += 1;
                    }

                    //console.log(flights);

                    function showRing(opt){

                        if(opt == 1){ //by year
                            var ddata  = [];
                            //JSONArray ddata = new JSONArray();

                            for(fl in flights){

                                //console.log(flights[fl].date);
                                var datesplit = flights[fl].date.split("/");
                                var found = 0;
                                for(da in ddata){
                                    if(ddata[da].dname == [datesplit[2]]){
                                        ddata[da].dvalue += 1;
                                        found = 1;
                                    }
                                }

                                //new object
                                if(found == 0){
                                    if(datesplit[2] != "")
                                    ddata.push({'dname': datesplit[2], 'dvalue': 1});
                                }
                            }

                            //console.log(ddata);
                            showDonut(ddata);
                        }
                        else if(opt == 2){ //by flight type
                            var ddata  = [];
                            //JSONArray ddata = new JSONArray();

                            for(fl in flights){

                                //console.log(flights[fl].date);
                                var ftype = flights[fl].fname;
                                var found = 0;
                                for(da in ddata){
                                    if(ddata[da].dname == ftype){
                                        ddata[da].dvalue += 1;
                                        found = 1;
                                    }
                                }

                                //new object
                                if(found == 0){
                                    if(ftype != "")
                                    ddata.push({'dname': ftype, 'dvalue': 1});
                                }
                            }

                            //console.log(ddata);
                            showDonut(ddata);
                        }
                        else if(opt == 3){ //by crash type
                            var ddata  = [];
                            //JSONArray ddata = new JSONArray();

                            for(fl in flights){

                                //console.log(flights[fl].date);
                                var ftype = flights[fl].reason;
                                var found = 0;
                                for(da in ddata){
                                    if(ddata[da].dname == ftype){
                                        ddata[da].dvalue += 1;
                                        found = 1;
                                    }
                                }

                                //new object
                                if(found == 0){
                                    if(ftype != "")
                                    ddata.push({'dname': ftype, 'dvalue': 1});
                                }
                            }

                            //console.log(ddata);
                            showDonut(ddata);
                        }
                        else if(opt == 4){ //by fatilities
                            var ddata  = [{'dname':'0 Fatalities', 'dvalue': 0},
                            {'dname':'1-10', 'dvalue': 0},
                            {'dname':'11-50', 'dvalue': 0},
                            {'dname':'51-100', 'dvalue': 0},
                            {'dname':'101-200', 'dvalue': 0},
                            {'dname':'> 200', 'dvalue': 0}];

                            var idx = 0;
 
                            for(fl in flights){
                                if(flights[fl].fatilities == 0)
                                    idx = 0;
                                else if(flights[fl].fatilities > 0 && flights[fl].fatilities <= 10)
                                    idx = 1;
                                else if(flights[fl].fatilities > 10 && flights[fl].fatilities <= 50)
                                    idx = 2;
                                else if(flights[fl].fatilities > 50 && flights[fl].fatilities <= 100)
                                    idx = 3;
                                else if(flights[fl].fatilities > 100 && flights[fl].fatilities <= 200)
                                    idx = 4;
                                else if(flights[fl].fatilities > 200)
                                    idx = 5;

                                    //ddata.push({'dname': flights[fl].date, 'dvalue': flights[fl].fatilities});
                                ddata[idx].dvalue += 1;
                            }

                            //console.log(ddata);
                            showDonut(ddata);
                        }
                        else{
                            //var ddata = [];
                            showDonut();
                        }
                    }

                    function showMenu(){

                        var offsx = 0;

                        var mg = vis.append("g");
                        //by date
                     var opt = mg
                      .append("rect")
                      .attr("id","opt1")
                      .attr("x", 0+offsx)
                      .attr("y", 0 )
                      .attr("width", 200)
                      .attr("height", "20")
                      .on("click", function(){option = 1; showRing(option);})
                      .on("mouseover",function(){d3.select(this).style("fill", "lightsteelblue");})
                      .on("mouseout",function(){d3.select(this).style("fill", "lavender");})
                      .style("fill","lavender")
                      .style("stroke","blue");

                      mg.append("text")
                        .attr("x", 0+offsx)
                        .attr("y", 0)
                        .attr("dy", ".99em")
                        .attr("dx", "4px")
                        .on("click", function(){option = 1; showRing(option);})
                        .on("mouseover",function(){vis.select("#opt1").style("fill", "lightsteelblue");})
                        .on("mouseout",function(){vis.select("#opt1").style("fill", "lavender");})
                        .style("font-size","15px")
                        .text("Yearly Analysis");

                        //by operator type
                        mg
                      .append("rect")
                      .attr("id","opt2")
                      .attr("x", 0+offsx)
                      .attr("y", 30 )
                      .attr("width", 200)
                      .attr("height", "20")
                      .on("click", function(){option = 2; showRing(option);})
                      .on("mouseover",function(){d3.select(this).style("fill", "lightsteelblue");})
                      .on("mouseout",function(){d3.select(this).style("fill", "lavender");})
                      .style("fill","lavender")
                      .style("stroke","blue");

                      mg.append("text")
                        .attr("x", 0+offsx)
                        .attr("y", 30)
                        .attr("dy", ".99em")
                        .attr("dx", "4px")
                        .on("click", function(){option = 2; showRing(option);})
                        .on("mouseover",function(){vis.select("#opt2").style("fill", "lightsteelblue");})
                        .on("mouseout",function(){vis.select("#opt2").style("fill", "lavender");})
                        .style("font-size","15px")
                        .text("Flight Type Analysis");

                        //by reason
                        mg
                      .append("rect")
                      .attr("id","opt3")
                      .attr("x", 0+offsx)
                      .attr("y", 60 )
                      .attr("width", 200)
                      .attr("height", "20")
                      .on("click", function(){option = 3; showRing(option);})
                      .on("mouseover",function(){d3.select(this).style("fill", "lightsteelblue");})
                      .on("mouseout",function(){d3.select(this).style("fill", "lavender");})
                      .style("fill","lavender")
                      .style("stroke","blue");

                      mg.append("text")
                        .attr("x", 0+offsx)
                        .attr("y", 60)
                        .attr("dy", ".99em")
                        .attr("dx", "4px")
                        .on("click", function(){option = 3; showRing(option);})
                        .on("mouseover",function(){vis.select("#opt3").style("fill", "lightsteelblue");})
                        .on("mouseout",function(){vis.select("#opt3").style("fill", "lavender");})
                        .style("font-size","15px")
                        .text("Crash Reason Analysis");

                        //by fatality
                        mg
                      .append("rect")
                      .attr("id","opt4")
                      .attr("x", 0+offsx)
                      .attr("y", 90 )
                      .attr("width", 200)
                      .attr("height", "20")
                      .on("click", function(){option = 4; showRing(option);})
                      .on("mouseover",function(){d3.select(this).style("fill", "lightsteelblue");})
                      .on("mouseout",function(){d3.select(this).style("fill", "lavender");})
                      .style("fill","lavender")
                      .style("stroke","blue");

                      mg.append("text")
                        .attr("x", 0+offsx)
                        .attr("y", 90)
                        .attr("dy", ".99em")
                        .attr("dx", "4px")
                        .on("click", function(){option = 4; showRing(option);})
                        .on("mouseover",function(){vis.select("#opt4").style("fill", "lightsteelblue");})
                        .on("mouseout",function(){vis.select("#opt4").style("fill", "lavender");})
                        .style("font-size","15px")
                        .text("Fatalities Range Analysis");

                        //control routes selection
                        mg
                      .append("rect")
                      .attr("id","opt5")
                      .attr("x", 0+offsx)
                      .attr("y", 120 )
                      .attr("width", 200)
                      .attr("height", "20")
                      .on("click", function(){
                        //option = 9; 
                        if(routeFlag == "all"){
                                routeFlag = "selected"; 
                            }
                            else{
                                routeFlag = "all";
                                option = 8; 
                        }
                        mg.select("#opt5txt").text(function(){ return routeFlag=="all" ? "Show Only Selected Routes": "Show All Routes"});
                        showRing(option);
                        })
                      .on("mouseover",function(){d3.select(this).style("fill", "lightsteelblue");})
                      .on("mouseout",function(){d3.select(this).style("fill", "lavender");})
                      .style("fill","lavender")
                      .style("stroke","blue");

                      var toggle = mg.append("text")
                        .attr("id","opt5txt")
                        .attr("x", 0+offsx)
                        .attr("y", 120)
                        .attr("dy", ".99em")
                        .attr("dx", "4px")
                        .on("click", function(){ 

                            if(routeFlag == "all"){
                                routeFlag = "selected"; 
                            }
                            else{
                                routeFlag = "all";
                                //option = 9; 
                            }

                            option = 8; 
                            toggle.text(function(){ return routeFlag=="all" ? "Show Only Selected Routes": "Show All Routes"});
                            showRing(option);
                        })
                        .on("mouseover",function(){vis.select("#opt5").style("fill", "lightsteelblue");})
                        .on("mouseout",function(){vis.select("#opt5").style("fill", "lavender");})
                        .style("font-size","15px")
                        .text(function(){ return routeFlag=="all" ? "Show Only Selected Routes": "Show All Routes"});

                        //Disable chart
                        mg
                      .append("rect")
                      .attr("id","opt6")
                      .attr("x", 0+offsx)
                      .attr("y", 150 )
                      .attr("width", 200)
                      .attr("height", "20")
                      .on("click", function(){option = 9; showRing(option);})
                      .on("mouseover",function(){d3.select(this).style("fill", "lightsteelblue");})
                      .on("mouseout",function(){d3.select(this).style("fill", "lavender");})
                      .style("fill","lavender")
                      .style("stroke","blue");

                      mg.append("text")
                        .attr("x", 0+offsx)
                        .attr("y", 150)
                        .attr("dy", ".99em")
                        .attr("dx", "4px")
                        .on("click", function(){option = 9; showRing(option);})
                        .on("mouseover",function(){vis.select("#opt6").style("fill", "lightsteelblue");})
                        .on("mouseout",function(){vis.select("#opt6").style("fill", "lavender");})
                        .style("font-size","15px")
                        .text("Disable Chart");

                        //Instructions panel
                        mg
                      .append("rect")
                      .attr("id","opt7")
                      .attr("x", 0+offsx)
                      .attr("y", 200 )
                      .attr("width", 200)
                      .attr("height", "230")
                      .style("fill","lavender")
                      .style("stroke","blue");

                      mg.append("text")
                        .attr("x", 0+offsx)
                        .attr("y", 200)
                        .attr("dy", ".99em")
                        .attr("dx", "4px")
                        .style("font-size","15px")
                        .style("font-weight", "bold")
                        .text("Usage Instructions:");

                      mg.append("text")
                        .attr("x", 0+offsx)
                        .attr("y", 230)
                        .attr("dy", ".99em")
                        .attr("dx", "4px")
                        .style("font-size","15px")
                        .text("Use zoom in the middle of");

                      mg.append("text")
                        .attr("x", 0+offsx)
                        .attr("y", 250)
                        .attr("dy", ".99em")
                        .attr("dx", "4px")
                        .style("font-size","15px")
                        .text("the globe for best results.");

                      mg.append("text")
                        .attr("x", 0+offsx)
                        .attr("y", 280)
                        .attr("dy", ".99em")
                        .attr("dx", "4px")
                        .style("font-size","15px")
                        .text("Click and Drag on donut");

                        mg.append("text")
                        .attr("x", 0+offsx)
                        .attr("y", 300)
                        .attr("dy", ".99em")
                        .attr("dx", "4px")
                        .style("font-size","15px")
                        .text("ring to pan the whole view.");

                        mg.append("text")
                        .attr("x", 0+offsx)
                        .attr("y", 330)
                        .attr("dy", ".99em")
                        .attr("dx", "4px")
                        .style("font-size","15px")
                        .text("Pan works the best when");

                        mg.append("text")
                        .attr("x", 0+offsx)
                        .attr("y", 350)
                        .attr("dy", ".99em")
                        .attr("dx", "4px")
                        .style("font-size","15px")
                        .text("the view is zoomed in.");

                        mg.append("text")
                        .attr("x", 0+offsx)
                        .attr("y", 380)
                        .attr("dy", ".99em")
                        .attr("dx", "4px")
                        .style("font-size","15px")
                        .text("Click on 'Maximize/Restore'");

                        mg.append("text")
                        .attr("x", 0+offsx)
                        .attr("y", 400)
                        .attr("dy", ".99em")
                        .attr("dx", "4px")
                        .style("font-size","15px")
                        .text("on top right to reset view.");

                    }

                    function repaintRoutes(clr, info){
                        //how to?
                        // var routs = vis.selectAll(".route").each(function(d,i){

                        //     console.log(d);
                        // });
                        var routs = vis.selectAll(".route");
                        var i = 0;
                        for(var j = 0; j < routs[0].length; j++){
                            //if(routs[0])
                            console.log(routs.length);
                            //$(routs[rout][0]).attr("text");
                            var num = $(routs[0][i]).attr("id").substring(10);
                            //console.log(num);
                            if (option == 1) //by date
                            {
                                //console.log(routs[rout][0]);
                                if($(routs[0][i]).attr("text").split('|')[0].split('/')[2] == info){
                                    //$(routs[0][i]).style("stroke",clr);
                                    $(routs[0][i]).css("stroke", clr);
                                    $(routs[0][i]).css("opacity", 1);
                                    $(routs[0][i]).css("visibility","visible");
                                    $("#cityfirst"+num).css("visibility","visible");
                                    $("#citysecond"+num).css("visibility","visible");
                                }
                                else{
                                    $(routs[0][i]).css("stroke", "white");
                                    if(routeFlag != "all"){
                                        $(routs[0][i]).css("opacity", 0);
                                        $(routs[0][i]).css("visibility","hidden");
                                        $("#cityfirst"+num).css("visibility","hidden");
                                        $("#citysecond"+num).css("visibility","hidden");
                                    }
                                }
                            }
                            else if (option == 2) //by flight type
                            {
                                if($(routs[0][i]).attr("text").split('|')[1] == info){
                                    $(routs[0][i]).css("stroke", clr);
                                    $(routs[0][i]).css("opacity", 1);
                                    $(routs[0][i]).css("visibility","visible");
                                    $("#cityfirst"+num).css("visibility","visible");
                                    $("#citysecond"+num).css("visibility","visible");
                                }
                                else{
                                    $(routs[0][i]).css("stroke", "white");
                                    if(routeFlag != "all"){
                                        $(routs[0][i]).css("opacity", 0);
                                        $(routs[0][i]).css("visibility","hidden");
                                        $("#cityfirst"+num).css("visibility","hidden");
                                        $("#citysecond"+num).css("visibility","hidden");
                                    }
                                }
                            }
                            else if (option == 3) //by crash reason
                            {
                                if($(routs[0][i]).attr("text").split('|')[2] == info){
                                    $(routs[0][i]).css("stroke", clr);
                                    $(routs[0][i]).css("opacity", 1);
                                    $(routs[0][i]).css("visibility","visible");
                                    $("#cityfirst"+num).css("visibility","visible");
                                    $("#citysecond"+num).css("visibility","visible");
                                }
                                else{
                                    $(routs[0][i]).css("stroke", "white");
                                    if(routeFlag != "all"){
                                        $(routs[0][i]).css("opacity", 0);
                                        $(routs[0][i]).css("visibility","hidden");
                                        $("#cityfirst"+num).css("visibility","hidden");
                                        $("#citysecond"+num).css("visibility","hidden");
                                    }
                                }
                            }
                            else if (option == 4) //by fatalities
                            {

                                // var ddata  = [{'dname':'0 Fatalities', 'dvalue': 0},
                                //     {'dname':'1-10', 'dvalue': 0},
                                //     {'dname':'11-50', 'dvalue': 0},
                                //     {'dname':'51-100', 'dvalue': 0},
                                //     {'dname':'101-200', 'dvalue': 0},
                                //     {'dname':'> 200', 'dvalue': 0}];

                                var fata = $(routs[0][i]).attr("text").split('|')[3];

                                if( (fata == 0 && info == '0 Fatalities') || (fata > 0 && fata <=10 && info == '1-10')
                                    || (fata > 10 && fata <=50 && info == '11-50') || (fata > 50 && fata <=100 && info == '51-100')
                                    || (fata > 100 && fata <=200 && info == '101-200') || (fata > 200 && info == '> 200')){
                                    $(routs[0][i]).css("stroke", clr);
                                    $(routs[0][i]).css("opacity", 1);
                                    $(routs[0][i]).css("visibility","visible");
                                    $("#cityfirst"+num).css("visibility","visible");
                                    $("#citysecond"+num).css("visibility","visible");
                                }
                                else{
                                    $(routs[0][i]).css("stroke", "white");
                                    if(routeFlag != "all"){
                                        $(routs[0][i]).css("opacity", 0);
                                        $(routs[0][i]).css("visibility","hidden");
                                        $("#cityfirst"+num).css("visibility","hidden");
                                        $("#citysecond"+num).css("visibility","hidden");
                                    }
                                }
                            }
                            else{
                                    $(routs[0][i]).css("stroke", "white");
                                    $(routs[0][i]).css("opacity", 0.9);
                                    $(routs[0][i]).css("visibility","visible");
                                    $("#cityfirst"+num).css("visibility","visible");
                                    $("#citysecond"+num).css("visibility","visible");
                                }

                            i++;
                            //j++;
                        }
                    }

                    function drawPath(x,y, date, fname, from, to, cloc, res, fat){
                        var route = vis.append("path")
                           .datum({type: "LineString", coordinates: [x, y]})
                           .attr("class", "route")
                           .attr("d", path)
                           .attr("id","routecount"+routeCount)
                           //.attr("text", x+","+y)
                           .attr("text", date+"|"+fname+"|"+res+"|"+ fat)
                           .style("stroke", "rgb(255,255,255)")
                           .style("stroke-width", 3)
                           .style("stroke-opacity", 0.8)
                           .attr("fill", "none")
                           .call(drag); 


                           //route.on("drag", function(){});

                           //var tooltip = route.append("text").attr("class", "tooltip hidden");

                           route.on("mouseover", function(d) {
                                div.transition()
                                .duration(200)
                                .style("opacity", .9);

                                div.html("Date: "+ date + "<br/>" + "Flight Type: "+ fname + "<br/>"+ "From: "+from+ "<br/>" + "To: "+ to
                                    + "<br/>" + "Crash Location: " + cloc + "<br/>" + "Crash Reason: " + res+ "<br/>" + "Fatalities: "+ fat)
                                .style("left", (d3.event.pageX) + "px")
                                .style("top", (d3.event.pageY - 28) + "px");

                               })
                                .on("mouseout", function(d) {
                                div.transition()
                                .duration(500)
                                .style("opacity", 0);
                                });

                    }

                    function drawCity(x, tag){

                        var cir = vis.append("path")
                           .datum({type: "Point", coordinates: x})
                           .attr("class", "city")
                           .attr("id","city"+tag+routeCount)
                           .attr("d", path)
                           .style("fill", "red")
                           .style("stroke", "rgb(0,0,0)")
                           .style("stroke-width", 2)
                           .call(drag); 

                        // cir.on("mouseover", function(){$("#routecount"+routeCount).trigger("mouseover")});
                        // cir.on("mouseout", function(){$("#routecount"+routeCount).trigger("mouseout")});

                    }

                    //zoom testing
                    var zoom = d3.behavior.zoom()
                        //.center([width / 2, height / 2])
                        .on("zoom",function() {
                        vis.attr("transform","translate("+
                        d3.event.translate.join(",")+")scale("+d3.event.scale+")");

                        if (d3.event.scale > 1.3){
                            path.pointRadius(2.5);
                        }
                        else{
                            path.pointRadius(3);
                        }
                        vis.selectAll(".sea .countries .land path")
                        .attr("d", path.projection(projection));
                        //console.log(d3.event.scale);
                        });

                        ///zoom.on("dblclick.zoom", null);

                    //restrict zoom
                    zoom.scaleExtent([0.8, 1.8]);
                    //zoom.center([width / 2, height / 2]);
                    vis.call(zoom);
                    //var zoom = runt.rotate.d3.geo.zoom;
                    //vis.call(d3.geo.zoom);

                    //eating donut time
                    function showDonut(ddata){

                        repaintRoutes("white", undefined);

                        if (!ddata){
                            vis.selectAll(".arc")
                            .transition().duration(400).style("opacity", 0);
                            //repaintRoutes("white", undefined);
                            //vis.selectAll(".arc").remove();
                            return;
                        }
                        vis.selectAll(".arc").remove();
                        var dwidth = width + 100;
                        var dheight = height + 100;
                        var paintClr = ["#FF21F4" ,"#FF0000", "#FBFB08", "#00FF00", "#4444FF", "#02FAFE"];

                        //var radius = Math.min(dwidth, dheight) / 2;


                        // if(option == 1){
                            var color = d3.scale.ordinal()
                            .range(["#FF89F9" ,"#FA5151", "#F5F580", "#79F179", "#8B8BF8", "#7CEBED"]);
                        // }
                        // else{
                        //     var color = d3.scale.ordinal()
                        //         .range(["#7fff00", "#FF0133", "#02FAFE", "#FF60B5", "#FD6131", "#FFF700"]);
                        // }

                        var arc = d3.svg.arc()
                            .outerRadius(geoRadius+90 - 10)
                            .innerRadius(geoRadius+90 - 50);

                        var pie = d3.layout.pie()
                            .sort(null)
                            .value(function(d) { return d.dvalue; });

                      var g = vis.selectAll(".arc")
                          .data(pie(ddata))
                        .enter().
                        append("g")
                          .attr("class", "arc")
                          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
                          //.call(drag2);
                          //.on("click", function(d){ alert(d);});

                          // var drag2 = d3.behavior.drag()
                          //   .on("drag", function(d,i) {

                          //     var p = d3.mouse(this);

                          //     curx = (p[0] ) ;
                          //     cury = (p[1] ) ;
                          //     vis.attr("transform", "translate("+curx+","+cury+")");
                          //   });  

                          // g.call(drag2);
                      g.append("path")
                          .attr("d", arc)
                          //.on("click", function(){ alert('hello!');})
                          .on("mouseover", function(d) {
                                div2.transition()
                                .duration(200)
                                .style("opacity", .9);

                                div2.html(d.data.dname + "<br/>" + d.data.dvalue)
                                .style("left", (d3.event.pageX) + "px")
                                .style("top", (d3.event.pageY - 28) + "px");

                               })
                        .on("mouseout", function(d) {
                        div2.transition()
                        .duration(500)
                        .style("opacity", 0);
                        })
                          .on("click", function(d){ 
                            //alert(d.data.dvalue);
                            //repaintRoutes(color(d.data.dvalue), (option==4) ? d.data.dvalue : d.data.dname);
                            repaintRoutes(getPaintClr(color(d.data.dvalue)), d.data.dname);
                        })
                          //.on("drag", function(d){})
                          .transition().duration(250)
                          .style("stroke", "#FFFFFF")
                          .style("fill", function(d) { return color(d.data.dvalue); });

                      g.append("text")
                          .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
                          .attr("dy", ".35em")
                          .on("click", function(d){ 
                            //repaintRoutes(color(d.data.dvalue), (option==4) ? d.data.dvalue : d.data.dname);
                            repaintRoutes(getPaintClr(color(d.data.dvalue)), d.data.dname);
                        })
                          .transition().duration(330)
                          .style("text-anchor", "middle")
                          .style("font-weight", "bold")
                          .text(function(d) { 
                            //return (option==4) ? d.data.dvalue : d.data.dname + ":" +d.data.dvalue; 
                            return d.data.dname;
                        });

                         function getPaintClr(c){
                            //["#FF89F9" ,"#FA5151", "#F5F580", "#79F179", "#8B8BF8", "#7CEBED"]
                            //["#FF21F4" ,"#FF0000", "#FBFB08", "#00FF00", "#4444FF", "#02FAFE"];
                            if(c == "#FF89F9"){
                                return "#FF21F4";
                            }
                            else if(c == "#FA5151"){
                                return "#FF0000";
                            }
                            else if(c == "#F5F580"){
                                return "#FBFB08";
                            }
                            else if(c == "#79F179"){
                                return "#00FF00";
                            }
                            else if(c == "#8B8BF8"){
                                return "#4444FF";
                            }
                            else if(c == "#7CEBED"){
                                return "#02FAFE";
                            }
                         }
                    };

                    

                }); //my code end

            }); //domready end
        } catch (Exception) {
            alert("Error: " + Exception)
        }
	}

	/* Function renders the datamaps map*/
	function paint(divExtension, vis, data) { //, width, height, colorPalette, properties, dispatch) {
		
	}
    /*------------------------------------------------------------------------*/

    /*
     * In most cases, you don't need to modify the following code.
     */

    var _util = {/*__FOLD__*/
        mapping : {
            dses : [],
            mses : []
        },
        /**
         * extract dimension sets from data
         * @param data [Crosstable Dataset] crosstable dataset
         * @returns array of dimension sets, and each dimension set is an object of {dimension: "dimension name", data: [members]}.
         * e.g. [{dimension: 'country', data: ['China', 'US', ...]}, {dimension: 'year', data: ['2010', '2011', ...]}, ...]
         */
        extractDimSets : function(data) {
            var dimSet1, dimSet2, res = [];
            if (data.getAnalysisAxisDataByIdx) {
                dimSet1 = data.getAnalysisAxisDataByIdx(0);
                dimSet2 = data.getAnalysisAxisDataByIdx(1);
            } else if (data.dataset && data.dataset.data) {
                data.dataset.data().analysisAxis.forEach(function(g){
                    var resg = [];
                    g.data.forEach(function(d){
                        var length = d.values.length;
                        var result = {};
                        result.data = [];
                        for(var i in d.values){
                            result.data[i] = d.values[i];
                        };
                        result.dimension = d.name;
                        resg.push(result);
                    });
                    res.push(resg);
                });
                return res;
            };

            $.each([dimSet1, dimSet2], function(idx, dimSet) {
                dimSet = dimSet ? dimSet.values : undefined;
                if (!dimSet)
                    return;
                var dims = [], dim;
                for (var i = 0; i < dimSet.length; i++) {
                    dim = {
                        dimension : dimSet[i].col.val,
                        data : []
                    };
                    for (var j = 0; j < dimSet[i].rows.length; j++)
                        dim.data.push(dimSet[i].rows[j].val);
                    dims.push(dim);
                }
                res.push(dims);
            });
            return res;
        },
        /**
         * extract measure sets from data
         * @param data [Crosstable Dataset] crosstable dataset
         * @returns array of measures, and each measure is an object of {measure: "measure name", data: [measure data]}.
         * for example, [[{measure: 'income', data: [555, 666, 777, ...]}, {measure: 'cost', data:[55, 66, 77, ...]}, ...], ...]
         */
        extractMeasureSets : function(data) {

            var measureSet1, measureSet2, measureSet3, reses = [];
            if (data.getMeasureValuesGroupDataByIdx) {
                measureSet1 = data.getMeasureValuesGroupDataByIdx(0);
                measureSet2 = data.getMeasureValuesGroupDataByIdx(1);
                measureSet3 = data.getMeasureValuesGroupDataByIdx(2);
            }
            else if (data.dataset && data.dataset.data) {
                data.dataset.data().measureValuesGroup.forEach(function(g){
                    var resg = [];
                    g.data.forEach(function(d){
                        var length = d.values.length;
                        var result = {};
                        result.data = [];
                        for (var i in d.values) {
                            result.data[i] = d.values[i];
                        };
                        result.measure = d.name;
                        resg.push(result);
                    });
                    reses.push(resg);
                });
                return reses;
            };

            $.each([measureSet1, measureSet2, measureSet3], function(idx, measureSet) {
                measureSet = measureSet ? measureSet.values : undefined;
                if (!measureSet)
                    return;
                var res = [], resItem, resData, measure;
                for (var k = 0; k < measureSet.length; k++) {
                    measure = measureSet[k];
                    resItem = {
                        measure : measure.col,
                        data : []
                    };
                    resData = resItem.data;
                    for (var i = 0; i < measure.rows.length; i++) {
                        resData[i] = [];
                        for (var j = 0; j < measure.rows[i].length; j++) {
                            resData[i].push(measure.rows[i][j].val);
                        }
                    }
                    res.push(resItem);
                }
                reses.push(res);
            });

            return reses;
        },

        /**
         * convert crosstable data to flatten table data
         * @param data [Crosstable Dataset] crosstable dataset
         * @returns array of objects, and each object represents a row of data table:
         * [{"dim set name": [dim1 member, dim2 member, ...], ..., "measure set name": [measure1 value, measure2 value, ...]}, ...]
         * e.g. [{Time: ['2010', 'Jan'], Entity: ['China'], Profit: [555, 444]},  ...]
         *
         * In addition, the array has a meta data property; its name is meta.
         * It is an object with dim set name or measure set name as key,
         * and names of dims and names of measures as value:
         * {"dim set name": [dim1 name, dim2name, ...], ..., "measure set name": [measure1 name, measure2 name, ...], ...}
         * for example, {Time: ['Year', 'Month'], Entity: ['Country'], Profit: ['Gross Profit', 'Net Profit']}
         */
        toFlattenTable : function(data) {
            var dimSets = this.extractDimSets(data), measureSets = this.extractMeasureSets(data), fdata = [], datum, measure0Data, measure, me = this;
            //measureValueGroup is necessary in crosstable dataset
            //please directly call _util.extractDimSets() to get dimension values 
            if (measureSets.length === 0) {
                return;
            }
            var i, j, k, m;
            //fill meta data
            fdata.meta = {};
            $.each(dimSets, function(idx, dset) {
                if (!dset)
                    return;
                var name = me.mapping.dses[idx];
                fdata.meta[name] = dset.map(function(ele) {
                    return ele.dimension;
                });
            });
            $.each(measureSets, function(idx, mset) {
                if (!mset)
                    return;
                var name = me.mapping.mses[idx];
                fdata.meta[name] = mset.map(function(ele) {
                    return ele.measure;
                });
            });
            //convert data from ct to flat
            measure0Data = measureSets[0][0].data;
            for ( i = 0; i < measure0Data.length; i++) {
                for ( j = 0; j < measure0Data[i].length; j++) {
                    datum = {};
                    $.each(dimSets, function(idx, dimSet) {
                        if (!dimSet)
                            return;
                        var name = me.mapping.dses[idx];
                        var val = datum[name] = datum[name] || [];
                        var counter = idx === 0 ? j : i;
                        for ( m = 0; m < dimSet.length; m++) {
                            val.push(dimSet[m].data[counter]);
                        }
                    });
                    $.each(measureSets, function(idx, measureSet) {
                        if (!measureSet)
                            return;
                        var name = me.mapping.mses[idx];
                        var val = datum[name] = datum[name] || [];
                        for ( m = 0; m < measureSet.length; m++) {
                            measure = measureSet[m];
                            val.push(measure.data[i][j]);
                        }
                    });
                    fdata.push(datum);
                }
            }
            return fdata;
        }
    };

    (function() {/*__FOLD__*/
        // Drawing Function used by new created module
        var moduleFunc = {
            _colorPalette : d3.scale.category20().range().concat(d3.scale.category20b().range()).concat(d3.scale.category20c().range()), // color palette used by chart
            _dispatch : d3.dispatch("initialized", "startToInit", 'barData') //event dispatcher
        };

        moduleFunc.dispatch = function(_){
            if(!arguments.length){
                return this._dispatch;
            }
            this._dispatch = _;
            return this;
        };

        //a temp flag used to distinguish new and old module style in manifest

        /*
         * function of drawing chart
         */
        moduleFunc.render = function(selection) {
		//MASC
		// read used div in the render function to be able to pass it to the paint function. (datamaps need a div and not a svg
		//var divExtension = $(selection.node().parentNode.parentNode).offsetParent()[0];
		
		//add xml ns for root svg element, so the image element can be exported to canvas
		$(selection.node().parentNode.parentNode).attr("xmlns:xlink", "http://www.w3.org/1999/xlink");

		//save instance variables to local variables because *this* is not referenced to instance in selection.each
		var _data = this._data, _width = this._width, _height = this._height, _colorPalette = this._colorPalette, _properties = this._properties, _dispatch = this._dispatch;
		_dispatch.startToInit();
		selection.each(function() {
			//prepare canvas with width and height of div container
			d3.select(this).selectAll('g.vis').remove();
			var vis = d3.select(this).append('g').attr('class', 'vis').attr('width', _width).attr('height', _height);

			//is not used anymore - could be commented
			render.call(this, _data, vis, _width, _height, _colorPalette, _properties, _dispatch);
			//MASC 
			// call paint instead of render ;)
			//paint(divExtension, vis, _data); //, _width, _height);
		});
		_dispatch.initialized({
			name : "initialized"
		});
        };

        /*
         * get/set your color palette if you support color palette
         */
        moduleFunc.colorPalette = function(_) {
            if (!arguments.length) {
                return this._colorPalette;
            }
            this._colorPalette = _;
            return this;
        };

        /*flow Definition*/
        /*<<flow*/
        var flowRegisterFunc = function(){
            var flow = sap.viz.extapi.Flow.createFlow({
                id : 'globe.viz.ext.flight',
                name : 'Flight',
                dataModel : 'sap.viz.api.data.CrosstableDataset',
                type : 'BorderSVGFlow'
            });
            var titleElement  = sap.viz.extapi.Flow.createElement({
                id : 'sap.viz.chart.elements.Title',
                name : 'Title',
            });
            flow.addElement({
                'element':titleElement,
                'propertyCategory':'title',
                'place':'top'
            });
            // var legendElement  = sap.viz.extapi.Flow.createElement({
            //     id : 'sap.viz.chart.elements.ColorLegend',
            //     name : 'Legend',
            //     dimensionIndex: [1],
            // });
            // flow.addElement({
            //     'element':legendElement,
            //     'propertyCategory':'legend',
            //     'place':'right'
            // });
            var element  = sap.viz.extapi.Flow.createElement({
                id : 'globe.viz.ext.module.flight',
                name : 'Flight Module',
            });
            element.implement('sap.viz.elements.common.BaseGraphic', moduleFunc);
            /*Feeds Definition*/
            //ds1: City, Year
            var ds1 = {
                "id": "globe.viz.ext.module.flight.DS1",
                "name": "Date, Operator, FROM, FROM_LONGITUDE, FROM_LATITUDE, TO, TO_LONGITUDE, TO_LATITUDE",
                "type": "Dimension",
                "min": 0,
                "max": 8,
                "aaIndex": 1
            };
            _util.mapping.dses.push("Date, Operator, FROM, FROM_LONGITUDE, FROM_LATITUDE, TO, TO_LONGITUDE, TO_LATITUDE");
	    // MASC: I don't get it why i can only use two dimensions ? If i want to use more i can'T drag'n'drop dimension 
	    
	    /*var ds3 = {
                "id": "camelotitlabgmapmodule.DS2",
                "name": "Source Latitude",
                "type": "Dimension",
                "min": 1,
                "max": 1,
                "aaIndex": 3
            };
            _util.mapping.dses.push("Source Latitude");
	    var ds3 = {
                "id": "camelotitlabgmapmodule.DS3",
                "name": "Source Longitude",
                "type": "Dimension",
                "min": 1,
                "max": 1,
                "aaIndex": 4
            };
            _util.mapping.dses.push("Source Longitude");
	    var ds2 = {
                "id": "camelotitlabgmapmodule.DS4",
                "name": "Target",
                "type": "Dimension",
                "min": 0,
                "max": 6,
                "aaIndex": 2
            };
            _util.mapping.dses.push("Target");
	    /*
	    var ds5 = {
                "id": "camelotitlabgmapmodule.DS5",
                "name": "Target Latitude",
                "type": "Dimension",
                "min": 1,
                "max": 1,
                "aaIndex": 5
            };
            _util.mapping.dses.push("Target Latitude");
	    var ds6 = {
                "id": "camelotitlabgmapmodule.DS6",
                "name": "Target Longitude",
                "type": "Dimension",
                "min": 1,
                "max": 1,
                "aaIndex": 6
            };
            _util.mapping.dses.push("Target Longitude");*/
	    
	    //MASC: How do i have to make entries her to get more dimension ?
	    // Why can i drop more than 6 dimensions if i define a max of 6 ?
	    
            //ms1: Margin, Quantity sold, Sales revenue
            var ms1 = {
                "id": "globe.viz.ext.module.flight.MS1",
                "name": "Keyfigure Flight",
                "type": "Measure",
                "min": 0,
                "max": 3,
                "mgIndex": 1
            };
            _util.mapping.mses.push("Keyfigure Flight");
            element.addFeed(ds1);
	    /*element.addFeed(ds2);
	    element.addFeed(ds3);
	    element.addFeed(ds4);
	    element.addFeed(ds5);
	    element.addFeed(ds6);*/
            element.addFeed(ms1);
            flow.addElement({
                'element':element,
                'propertyCategory' : 'globe.viz.ext.flight'
            });
            sap.viz.extapi.Flow.registerFlow(flow);
        };
        flowRegisterFunc.id = 'globe.viz.ext.flight';
         
        /*flow>>*/  
        var flowDefinition = {
          id:flowRegisterFunc.id,
          init:flowRegisterFunc  
        };

        /*<<bundle*/
        var vizExtImpl = {
            viz   : [flowDefinition],
            module: [],
            feeds : []
        };
        var vizExtBundle = sap.bi.framework.declareBundle({
            "id" : "globe.viz.ext.flight",
            "loadAfter" : ["sap.viz.aio"],
            "components" : [{
                "id" : "globe.viz.ext.flight",
                "provide" : "sap.viz.impls",
                "instance" : vizExtImpl,
                "customProperties" : {
                    "name" : "Flight",
                    "description" : "Flight",
                    "icon" : {"path" : ""},
                    "category" : [],
                    "resources" : [{"key":"sap.viz.api.env.Template.loadPaths", "path":"./resources/templates"}]
                }
            }]
       });
       // sap.bi.framework.getService is defined in BundleLoader, which is
       // always available at this timeframe
       // in standalone mode sap.viz.js will force load and active the
       // "sap.viz.aio" bundle
       if (sap.bi.framework.getService("sap.viz.aio", "sap.viz.extapi")) {
           // if in standalone mode, sap.viz.loadBundle will be available,
           // and we load the bundle directly
           sap.bi.framework.getService("sap.viz.aio", "sap.viz.extapi").core.registerBundle(vizExtBundle);
       } else {
           // if loaded by extension framework, return the "sap.viz.impls"
           // provider component via define()
           define(function() {
               return vizExtBundle;
           });
       } 
        /*bundle>>*/ 

        //register the chart so it can be created
    })();	
})();