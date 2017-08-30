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
		console.log("lol")
	});

	//Create a Crossfilter instance
	var ndx = crossfilter(challengeData);

	//Define Dimensions
	var dateDim = ndx.dimension(function(d) { return d["FECHA"]; });
	var povertyLevelDim = ndx.dimension(function(d) { return d["XAL"]; });

	//Calculate metrics
	var numProjectsByDate = dateDim.group(); 
	var numProjectsByPovertyLevel = povertyLevelDim.group();


	//Define values (to be used in charts)
	var minDate = dateDim.bottom(1)[0]["FECHA"];
	var maxDate = dateDim.top(1)[0]["FECHA"];

    //Charts
	var timeChart = dc.barChart("#time-chart");
	var povertyLevelChart = dc.rowChart("#poverty-level-row-chart");
	
	timeChart
		.width(600)
		.height(160)
		.margins({top: 10, right: 50, bottom: 30, left: 50})
		.dimension(dateDim)
		.group(numProjectsByDate)
		.transitionDuration(500)
		.x(d3.time.scale().domain([minDate, maxDate]))
		.elasticY(true)
		.xAxisLabel("Year")
		.yAxis().ticks(4);

	povertyLevelChart
		.width(300)
		.height(250)
        .dimension(povertyLevelDim)
        .group(numProjectsByPovertyLevel)
        .xAxis().ticks(4);

    dc.renderAll();

};