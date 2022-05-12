class LineChart {

    constructor( config, data ){
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
        }
        this.data = data;
        this.init();
    }

    init(){
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);
        
        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);
        
        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleLinear()
            .range( [self.inner_height, 0] )
        
        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(3);
        
        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(3);
            
        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);
        
        self.yaxis_group = self.chart.append('g')
            
    }

    update(){
        let self = this;

        const xmin = 0;
        const xmax = d3.max( self.data, d => d.x );
        self.xscale.domain( [xmin, xmax] );

        const ymin = 0;
        const ymax = d3.max( self.data, d => d.y );
        self.yscale.domain( [ymin, ymax] );

        self.render();
    }

    render(){
        let self = this;

        const line = d3.line()
                .x( d => self.xscale(d.x))
                .y( d => self.yscale(d.y))
            
        self.chart.append("path")
                    .attr('d', line(self.data))
                    .attr('stroke', 'black')
                    .attr('fill', 'none')
        
        self.chart.selectAll("circle")
                    .data(self.data)
                    .enter()
                    .append("circle")
                    .attr("cx", d => self.xscale(d.x))
                    .attr("cy", d => self.yscale(d.y))
                    .attr("r", 5)
            

        self.xaxis_group
            .call( self.xaxis );
        
        self.yaxis_group
            .call( self.yaxis.tickSizeOuter(0) );
    }
}