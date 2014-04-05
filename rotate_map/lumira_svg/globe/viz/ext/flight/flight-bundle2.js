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
	function render(data, vis, width, height, colorPalette, properties, dispatch) {
		// This function is not used anymore - therefore the paint function is used.
	}

	/* Function renders the datamaps map*/
	function paint(divExtension, vis, data) { //, width, height, colorPalette, properties, dispatch) {
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
		
		// Exceptionhandling - just in case
		try {
			// Minimize all svg elements to get the full canvas
			vis.attr("height", "1px").attr("width", "1px");
			$(".v-m-root").attr("height", "1px").attr("width", "1px");
			$(".datamap").attr("height", "1px").attr("width", "1px");
			
			// define require.js libs (based on the file location). If the file is used in the extensionfolder use a /sap/ui/ in front.
			// else use the normal filepath. Please see the difference in the uncommented d3 call
			require.config({
				'paths': {
					'app': 'app',
					'jquery': 'jquery',
					//'d3': '../bundles/schwarzm/viz/ext/geoworld/d3.v3', // when used in Extension
					//'d3': '../sap/bi/bundles/schwarzm/viz/ext/geoworld/d3.v3',
					'd3': '../schwarzm/viz/ext/geoworld/d3.v3', // when used in myExtension
					'topojson': '../schwarzm/viz/ext/geoworld/topojson.v1.min',
					//'topojson': '../sap/bi/bundles/schwarzm/viz/ext/geoworld/topojson.v1.min',
					'datamaps': '../schwarzm/viz/ext/geoworld/datamaps_rw.min',
					//'datamaps': '../sap/bi/bundles/schwarzm/viz/ext/geoworld/datamaps_rw.min',
					'domReady': '../schwarzm/viz/ext/geoworld/domReady',
					//'domReady': '../sap/bi/bundles/schwarzm/viz/ext/geoworld/domReady',
				},
				shim: {
					d3: {
						exports: 'd3'
					},
					topojson: {
						deps: ['d3'],
						exports: 'topojson'
					},
					datamaps: {
						deps: ['d3', 'topojson'],
					},
				}
			});

			// Define require.js module with all needed js libs
			define("runtime", function(require) {
				var $ = require('jquery');
				var d3 = require('d3');
				var topojson = require('topojson');
				var Datamap = require('datamaps');
				var domReady = require('domReady');
				// return the required objects - can be used when module is used inside a require function
				return {
					topojson: topojson,
					Datamap: Datamap,
					domReady: domReady,
					$:$,
					d3:d3
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
			
			// execute the real code to draw a map with the datamaps.js library
			// https://github.com/markmarkoh/datamaps/blob/master/README.md#getting-started
			require(["runtime"], function(runt) {
				// set the div passed by the function parameter
				var Test = divExtension;
				
				// use domready to execute it after all of the dom is load
				runt.domReady(function() {
					// example of markmarkoh github
					var map = new runt.Datamap({
						scope: 'world',
						//element: runt.$('#geomapCont')[0],
						element: Test,
						projection: 'mercator',

						fills: {
						  defaultFill: '#f0af0a',
						  lt50: 'rgba(0,244,244,0.9)',
						  gt50: 'red'
						},

						// highlighting of countries
						data: {
						  USA: {fillKey: 'lt50' },
						  RUS: {fillKey: 'lt50' },
						  CAN: {fillKey: 'lt50' },
						  BRA: {fillKey: 'gt50' },
						  ARG: {fillKey: 'gt50'},
						  COL: {fillKey: 'gt50' },
						  AUS: {fillKey: 'gt50' },
						  ZAF: {fillKey: 'gt50' },
						  MAD: {fillKey: 'gt50' }       
						},

						// defining on click handler of countries
						done: function(datamap) {
						    datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
							alert(geography.properties.name);
						    });
						}

					})

					// initialize variables for data insertions
					var divider = "-----";
					var nDim = 0; // Zaehler fuer die Anzahl der Datensaetze
					var nDimAll = 0;
					var nInfowindows = 0;
					var aInfoWindowsStrings = [];
					var aInfoWindows = [];
					var maximumValueInArray = 0;
					var nmaxStroke = 1;
					var nstrokeWidth = 0;
					var markers = [];
					
					// retrieve maximum and n numbers of elements
					for (var datasetsmax in fdata) {
						nDimAll += 1;
						if (fdata[datasetsmax][1] != NaN) {
							if (fdata[datasetsmax][1] > maximumValueInArray){
								maximumValueInArray = fdata[datasetsmax][1]
							}
						}
					}

					// define arrays for arcs and bubbles
					var arcs = [];
					var bubbles = [];
					// run through all rows datasets
					for (var datasets in fdata) {
						// Convert Lat and Long into . and use them
						// access rowdata of dataset
						var Dim1 = fdata[datasets][0];
						var Dim1Split = Dim1.split(" / ");
						// read and clean lat and Long values - define a default for no good values
						var 	sorLat = (Dim1Split[1]==undefined || Dim1Split[1]=="") ? "45": Dim1Split[1], 
							sorLong = (Dim1Split[2]==undefined || Dim1Split[2]=="") ? "45": Dim1Split[2],
							tarLat = (Dim1Split[4]==undefined || Dim1Split[4]=="") ? "45": Dim1Split[4], 
							tarLong = (Dim1Split[5]==undefined || Dim1Split[5]=="") ? "45": Dim1Split[5],
							nsorLat = parseFloat( sorLat.replace(",", ".") ), nsorLong = parseFloat( sorLong.replace(",", ".") ),
							ntarLat = parseFloat( tarLat.replace(",", ".") ), ntarLong = parseFloat( tarLong.replace(",", ".") );

						// Get the value of the dataset and define the thickness of the line
						if (fdata[datasets][1] == NaN) {
							nstrokeWidth = 1;
						} else {
							nstrokeWidth = (fdata[datasets][1] / maximumValueInArray) * nmaxStroke;
						}
						// define element in the arcs arrays
						arcs[nDim] = {
							origin: {
								latitude: nsorLat,
								longitude: nsorLong
							},
							destination: {
								latitude: ntarLat,
								longitude: ntarLong
							}
						};
						// Add Targetmarkers to bubble array
						bubbles[nDim] = {
							name: Dim1Split[0], 
							latitude: nsorLat, 
							longitude: nsorLong, 
							radius: 3,//nstrokeWidth, 
							fillKey: 'gt50'
						};
						// Add Sourcemarkers to bubble array
						bubbles[nDimAll + nDim] = {
							name: Dim1Split[3], 
							latitude: ntarLat, 
							longitude: ntarLong, 
							radius: 3,//nstrokeWidth, 
							fillKey: 'lt50'
						};
						// Increase DimCounter by 1
						nDim += 1;
					}

					// paint all the arcs with the dynamically filled array arcs
					map.arc(
						arcs, 
						{strokeWidth: 2}/*,
						{
							popupTemplate: function(geo, data) {
								return "<div class='hoverinfo'>This is " + data.name + "</div>";
							}
						}*/
					);
					
					// paint all the bubbles with the dynamically filled source and target markers
					//bubbles, custom popup on hover template
					map.bubbles(
						bubbles, 
						{
							popupTemplate: function(geo, data) {
								return "<div class='hoverinfo'>This is " + data.name + "</div>";
							}
						}
					);
				});
			});
		} catch (Exception) {
			alert("Error: " + Exception)
		}
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
		var divExtension = $(selection.node().parentNode.parentNode).offsetParent()[0];
		
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
			//render.call(this, _data, vis, _width, _height, _colorPalette, _properties, _dispatch);
			//MASC 
			// call paint instead of render ;)
			paint(divExtension, vis, _data); //, _width, _height);
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
                id : 'schwarzm.viz.ext.geoworld',
                name : 'Geoworld',
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
            var legendElement  = sap.viz.extapi.Flow.createElement({
                id : 'sap.viz.chart.elements.ColorLegend',
                name : 'Legend',
                dimensionIndex: [1],
            });
            flow.addElement({
                'element':legendElement,
                'propertyCategory':'legend',
                'place':'right'
            });
            var element  = sap.viz.extapi.Flow.createElement({
                id : 'schwarzm.viz.ext.module.geoworld',
                name : 'Geoworld Module',
            });
            element.implement('sap.viz.elements.common.BaseGraphic', moduleFunc);
            /*Feeds Definition*/
            //ds1: City, Year
            var ds1 = {
                "id": "schwarzm.viz.ext.module.geoworld.DS1",
                "name": "Sourcename, Lat, Long, Targetname, Lat, Long",
                "type": "Dimension",
                "min": 0,
                "max": 6,
                "aaIndex": 1
            };
            _util.mapping.dses.push("Sourcename, Lat, Long, Targetname, Lat, Long");
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
                "id": "schwarzm.viz.ext.module.geoworld.MS1",
                "name": "Keyfigure Geomap",
                "type": "Measure",
                "min": 0,
                "max": 1,
                "mgIndex": 1
            };
            _util.mapping.mses.push("Keyfigure Geomap");
            element.addFeed(ds1);
	    /*element.addFeed(ds2);
	    element.addFeed(ds3);
	    element.addFeed(ds4);
	    element.addFeed(ds5);
	    element.addFeed(ds6);*/
            element.addFeed(ms1);
            flow.addElement({
                'element':element,
                'propertyCategory' : 'schwarzm.viz.ext.geoworld'
            });
            sap.viz.extapi.Flow.registerFlow(flow);
        };
        flowRegisterFunc.id = 'schwarzm.viz.ext.geoworld';
         
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
            "id" : "schwarzm.viz.ext.geoworld",
            "loadAfter" : ["sap.viz.aio"],
            "components" : [{
                "id" : "schwarzm.viz.ext.geoworld",
                "provide" : "sap.viz.impls",
                "instance" : vizExtImpl,
                "customProperties" : {
                    "name" : "Geoworld",
                    "description" : "Geoworld",
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