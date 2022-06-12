let line_bar_chart_data;
let piechart_data;
let line_chart;
let pie_chart;

d3.csv("leftchart_data.csv")
    .then( data => {
        line_bar_chart_data = data;
        line_bar_chart_data.forEach( d => {
            d.y = +d.y;
            d.p = +d.p;
            d.a = +d.a;
        });

        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        color_scale.domain(['setosa','versicolor','virginica']);

        line_bar_chart = new LineBarChart( {
            parent: '#drawing_region_line_bar_chart',
            width: 800,
            height: 400,
            margin: {top:50, right:80, bottom:50, left:100},
            title: 'Number of cell phones/ambulances dispatched',
            xlabel: 'Year',
            y1label: 'Number of cell phones',
            y2label: 'Number of ambulances dispatched',
            cscale: color_scale
        }, line_bar_chart_data );

        line_bar_chart.update(2007);

    })
    .catch( error => {
        console.log( error );
    });

d3.csv("rightchart_data_copy.csv")
    .then( data => {
        piechart_data = data;

        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        //color_scale.domain(['setosa','versicolor','virginica']);

        pie_chart = new PieChart( {
            parent: '#drawing_region_piechart',
            width: 400,
            height: 400,
            margin: {top:100, right:100, bottom:100, left:100},
            inner_radious: 0,
            title: 'Time required to arrive on site',
            cscale: color_scale
        }, piechart_data );

        pie_chart.update(piechart_data[0]);

        d3.select('#Y07')
            .on('click', d =>{
                pie_chart.update(piechart_data[0]);
                line_bar_chart.update(2007);
            });

        d3.select('#Y08')
            .on('click', d =>{
                pie_chart.update(piechart_data[1]);
                line_bar_chart.update(2008);
            });

        d3.select('#Y09')
            .on('click', d =>{
                pie_chart.update(piechart_data[2]);
                line_bar_chart.update(2009);
            });

        d3.select('#Y10')
            .on('click', d =>{
                pie_chart.update(piechart_data[3]);
                line_bar_chart.update(2010);
            });

        d3.select('#Y11')
            .on('click', d =>{
                pie_chart.update(piechart_data[4]);
                line_bar_chart.update(2011);
            });

        d3.select('#Y12')
            .on('click', d =>{
                pie_chart.update(piechart_data[5]);
                line_bar_chart.update(2012);
            });
        
        d3.select('#Y13')
            .on('click', d =>{
                pie_chart.update(piechart_data[6]);
                line_bar_chart.update(2013);
            });

        d3.select('#Y14')
            .on('click', d =>{
                pie_chart.update(piechart_data[7]);
                line_bar_chart.update(2014);
            });

        d3.select('#Y15')
            .on('click', d =>{
                pie_chart.update(piechart_data[8]);
                line_bar_chart.update(2015);
            });
    
        d3.select('#Y16')
            .on('click', d =>{
                pie_chart.update(piechart_data[9]);
                line_bar_chart.update(2016);
            });

        d3.select('#Y17')
            .on('click', d =>{
                pie_chart.update(piechart_data[10]);
                line_bar_chart.update(2017);
            });

        d3.select('#Y18')
            .on('click', d =>{
                pie_chart.update(piechart_data[11]);
                line_bar_chart.update(2018);
            });
    })
    .catch( error => {
        console.log( error );
    });