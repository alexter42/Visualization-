queue()
    .defer(d3.json, "/challengeData/pst")
    .await(makeGraphs);

function makeGraphs(error, dataJson) {

	//Clean projectsJson data
	var challengeData = dataJson;
	var dateFormat = d3.time.format("%d/%m/%Y");

	challengeData.forEach(function(d) {
		console.log(d["FECHA"]);
		d["FECHA"] = dateFormat.parse(String(d["FECHA"]));
		console.log(d["FECHA"]);
		d["FECHA"].setDate(1);

	});

	//Create a Crossfilter instance
	var ndx = crossfilter(challengeData);

	//Define Dimensions
	var dateDim = ndx.dimension(function(d) { return d["FECHA"]; });

	//Calculate metrics
	var numPSTByDate = dateDim.group(); 


	//Define values (to be used in charts)
	var minDate = dateDim.bottom(1)[0]["FECHA"];
	var maxDate = dateDim.top(1)[0]["FECHA"];

    //Chart
	var timeChart = dc.barChart("#time-chart");
	
	timeChart
		.width(600)
		.height(160)
		.margins({top: 10, right: 50, bottom: 30, left: 50})
		.dimension(dateDim)
		.group(numPSTByDate)
		.transitionDuration(500)
		.x(d3.time.scale().domain([minDate, maxDate]))
		.elasticY(true)
		.xAxisLabel("Time")
		.yAxis().ticks(4);

    dc.renderAll();

};
