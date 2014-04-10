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
                        width: 200px;\
                        height: 60px;\
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
                    //'D3': '../sap/bi/bundles/globe/viz/ext/flight/d3.v3.min', // when used in myExtension
                    'D3': '../globe/viz/ext/flight/d3.v3.min',
                    //'topojson': '../sap/bi/bundles/globe/viz/ext/flight/topojson.v1.min',
                    'topojson': '../globe/viz/ext/flight/topojson.v1.min',
                    //'datamaps': '../sap/bi/bundles/globe/viz/ext/flight/world-110m',
                    'datamaps': '../globe/viz/ext/flight/world-110m',
                    /////'datamaps': '../sap/bi/bundles/globe/viz/ext/flight/datamaps_rw.min',
                    'domReady': '../globe/viz/ext/flight/domReady',
                    //'domReady': '../sap/bi/bundles/globe/viz/ext/flight/domReady',
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
                    var source, dest;

                    // var width = 960,
                    //     height = 550;

                        //var data = fdata;
                        //console.log("data var" + data);

                    //tooltips!
                    var div = runt.D3.select("body").append("div")   
                        .attr("class", "tooltipsss")               
                        .style("opacity", 0);

                    var projection = runt.D3.geo.orthographic()
                        .scale(200)
                        .translate([width / 2, height / 2])
                        .clipAngle(90);

                    var path = runt.D3.geo.path()
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
                          .style("stroke-width", "0.5px")
                          .style("stroke", "rgb(255,255,255)")
                          .call(drag); 


                    //get data from backend
                    //"Date, Operator, FROM, FROM_LONGITUDE, FROM_LATITUDE, TO, TO_LONGITUDE, TO_LATITUDE",
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
                            toLat = (Dim1Split[7]==undefined || Dim1Split[7]=="NA") ? "": Dim1Split[7];
                           
                           flights[nDim] = {
                            date: flightDate, fname: operator, from: fromName, fromLong: fromLong, fromLat: fromLat,
                            to:to, toLong:toLong, toLat:toLat
                            };

                            var x = [flights[nDim].fromLong, flights[nDim].fromLat];
                            var y = [flights[nDim].toLong, flights[nDim].toLat];

                            drawPath(x, y, flights[nDim].date, flights[nDim].fname, flights[nDim].from, flights[nDim].to);
                            drawCity(x);
                            drawCity(y);

                            // vis.append("path")
                            //             .datum({type: "LineString", coordinates: [(flights[nDim].fromLong,
                            //                 flights[nDim].fromLat),
                            //                 (flights[nDim].toLong, flights[nDim].toLat)]
                            //             })
                            //         .attr("class", "route")
                            //        .attr("d", path)
                            //        //.attr("text", x+","+y)
                            //        .style("stroke", "rgb(255,255,255)")
                            //        .style("stroke-width", 3)
                            //        .style("stroke-opacity", 0.8)
                            //        .attr("fill", "none");

                        nDim += 1;
                    }

                    console.log(flights);
                    showDonut();
                    // vis.on("click", function(){
                    //         //vis.on("mousemove", function() {
                    //           //
                    //             px = curx;
                    //             py = cury;
                    //           //}
                    //           //console.log(d3.event.target);
                    //           var p = d3.mouse(this);


                    //           curx = (p[0] + ox) % 180;
                    //           cury = (p[1] + oy) % 90;
                    //           projection.rotate([curx, cury]);
                    //           vis.selectAll("path").attr("d", path);

                    //           if(px != undefined && py != undefined){
                    //             accx = px - curx;
                    //             accy = py - cury;
                    //           }

                    //           //console.log(curx, cury);
                    //         }); 

                    //         vis.on("mouseout", function() {

                    //             ox =  curx;
                    //             oy = cury;

                    //         }); 
                
                    // var routes = vis.selectAll("path")
                    //                 .data(flights)
                    //                 .enter()
                    //                 .append("path")
                    //                     .data({type: "Line", coordinates: function(d){
                    //                         console.log("data -->" +d);
                    //                         if(d.fromLong == "NA" || d.fromLat == "NA" || d.toLong == "NA" || d.toLat == "NA")
                    //                             return;
                    //                         return [(d.fromLong,d.fromLat),(d.toLong, d.toLat)];
                    //                     }})
                    //                 .attr("class", "route")
                    //                .attr("d", path)
                    //                //.attr("text", x+","+y)
                    //                .style("stroke", "rgb(255,255,255)")
                    //                .style("stroke-width", 3)
                    //                .style("stroke-opacity", 0.8)
                    //                .attr("fill", "none");
    

                            function drawPath(x,y, date, fname, from, to){
                                var route = vis.append("path")
                                   .datum({type: "LineString", coordinates: [x, y]})
                                   .attr("class", "route")
                                   .attr("d", path)
                                   .attr("text", x+","+y)
                                   .style("stroke", "rgb(255,255,255)")
                                   .style("stroke-width", 3)
                                   .style("stroke-opacity", 0.8)
                                   .attr("fill", "none");

                                   //var tooltip = route.append("text").attr("class", "tooltip hidden");

                                   route.on("mouseover", function(d) {
                                        div.transition()
                                        .duration(200)
                                        .style("opacity", .9);

                                        div.html("Date: "+ date + "<br/>" + "Flight Type: "+ fname + "<br/>"+ "From: "+from+ "<br/>" + "To: "+ to)
                                        .style("left", (d3.event.pageX) + "px")
                                        .style("top", (d3.event.pageY - 28) + "px");

                                       })
                                        .on("mouseout", function(d) {
                                        div.transition()
                                        .duration(500)
                                        .style("opacity", 0);
                                        });

                            }

                            function drawCity(x){

                                var cir = vis.append("path")
                                   .datum({type: "Point", coordinates: x})
                                   .attr("class", "city")
                                   .attr("d", path)
                                   .style("fill", "red")
                                   .style("stroke", "rgb(0,0,0)")
                                   .style("stroke-width", 3);

                            }

                            //zoom testing
                            var zoom = d3.behavior.zoom()
                                .on("zoom",function() {
                                vis.attr("transform","translate("+
                                d3.event.translate.join(",")+")scale("+d3.event.scale+")");
                                vis.selectAll(".sea .countries .land path")
                                .attr("d", path.projection(projection));
                                //console.log(d3.event.scale);
                                });

                            //restrict zoom
                            zoom.scaleExtent([0.8, 1.2]);
                            //zoom.center([width / 2, height / 2]);
                            vis.call(zoom);
                            //var zoom = runt.rotate.d3.geo.zoom;
                            //vis.call(d3.geo.zoom);

                            //eating donut time
                            function showDonut(){

                                var dwidth = width + 100;
                                var dheight = height + 100;

                                var radius = Math.min(dwidth, dheight) / 2;

                                var ddata = [
                                    {dname: "<5", dvalue: "2704659"},
                                    {dname: "5-13", dvalue: "4499890"},
                                    {dname: "14-17", dvalue: "2159981"},
                                    {dname: "18-24", dvalue: "3853788"},
                                    {dname: "25-44", dvalue: "14106543"},
                                    {dname: "45-64", dvalue: "8819342"},
                                    {dname: "≥65", dvalue: "612463"},
                                    ];

                                var color = d3.scale.ordinal()
                                    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

                                var arc = d3.svg.arc()
                                    .outerRadius(radius - 10)
                                    .innerRadius(radius - 50);

                                var pie = d3.layout.pie()
                                    .sort(null)
                                    .value(function(d) { return d.dvalue; });

                                // var don = d3.select("body").append("svg")
                                //     .attr("width", dwidth)
                                //     .attr("height", dheight)
                                //   .append("g")
                                //     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


                              var g = vis.selectAll(".arc")
                                  .data(pie(ddata))
                                .enter().append("g")
                                  .attr("class", "arc")
                                  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
                                  //.on("click", function(d){ alert(d);});
                                  //.style("pointer-events", "none");

                              g.append("path")
                                  .attr("d", arc)
                                  //.style("pointer-events", "none")
                                  //.on("click", function(){ alert('hello!');})
                                  .on("click", function(d){ alert(d.data.dvalue);})
                                  //.on("drag", function(d){})
                                  .style("fill", function(d) { return color(d.data.dvalue); });

                              g.append("text")
                                  .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
                                  .attr("dy", ".35em")
                                  .on("click", function(d){ alert(d.data.dvalue);})
                                  .style("text-anchor", "middle")
                                  .text(function(d) { return d.data.dvalue; });

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