d3.csv("./task2_data.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top: 25, right:10, bottom:80, left:60},
        };

        const line_chart = new LineChart( config, data);
        line_chart.update();
    })
    .catch( error => {
        console.log( error );
    });