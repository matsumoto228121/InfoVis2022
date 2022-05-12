d3.csv("./task1_data.csv")
    .then( data => {
        data.forEach( d => { d.label = d.label; d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top: 25, right:10, bottom:80, left:60},
            title: 'Sample Data',
            xlabel: 'Value'
        };

        const bar_chart = new BarChart( config, data);
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });