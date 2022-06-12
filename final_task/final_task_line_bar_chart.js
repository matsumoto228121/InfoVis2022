class LineBarChart {

    constructor( config, data ){
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
            title: config.title || '',
            xlabel: config.xlabel || '',
            y1label: config.y1label || '',
            y2label: config.y2label || ''
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

        self.xscale_p = d3.scaleLinear()
            .range( [0, self.inner_width] );
        
        self.xscale_a = d3.scaleBand()
            .range( [0, self.inner_width] )
            .paddingInner(0.2)
            .paddingOuter(0.1);

        self.yscale_p = d3.scaleLinear()
            .range( [self.inner_height, 0] );
        
        self.yscale_a = d3.scaleLinear()
            .range( [self.inner_height, 0] );
        
        self.xaxis_p = d3.axisBottom( self.xscale_p )
            .ticks(10);
        
        self.yaxis_p = d3.axisLeft( self.yscale_p )
            .ticks(5);
        
        self.yaxis_a = d3.axisRight( self.yscale_a )
            .ticks(5);
            
        self.xaxis_p_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);
        
        self.yaxis_p_group = self.chart.append('g');

        self.yaxis_a_group = self.chart.append('g')
            .attr('transform', `translate(${self.inner_width}, 0)`);
        
        const title_space = 20;
        self.svg.append('text')
            .style('font-size', '20px')
            .style('font-weight', 'bold')
            .attr('text-anchor', 'middle')
            .attr('x', self.config.width/2)
            .attr('y', self.config.margin.top - title_space)
            .text( self.config.title );
    
        const xlabel_space = 40;
        self.svg.append('text')
            .attr('x', self.config.width / 2)
            .attr('y', self.inner_height + self.config.margin.top + xlabel_space)
            .text( self.config.xlabel );
    
        const y1label_space = 100;
        self.svg.append('text')
            .attr('transform', `rotate(-90)`)
            .attr('y', self.config.margin.left - y1label_space)
            .attr('x', -(self.config.height / 2))
            .attr('text-anchor', 'middle')
            .attr('dy', '1em')
            .text( self.config.y1label );
        
        const y2label_space = 60;
        self.svg.append('text')
            .attr('transform', `rotate(-90)`)
            .attr('y', self.inner_width + self.config.margin.left + y2label_space)
            .attr('x', -(self.config.height / 2))
            .attr('text-anchor', 'middle')
            .attr('dy', '1em')
            .text( self.config.y2label );

        //判例の表示
        self.chart.append('text')
            .attr('x', 10)
            .attr('y', 10)
            .text('phone');
        
        self.chart.append('text')
            .attr('x', 10)
            .attr('y', 25)
            .text('ambulance');
        
        self.chart.append('line')
            .attr('x1', 110)
            .attr('x2', 140)
            .attr('y1', 5)
            .attr('y2', 5)
            .attr("stroke-width",2)
            .attr("stroke","blue");
        
        self.chart.append('rect')
            .attr('x', 110)
            .attr('y', 15)
            .attr("width", 30)
            .attr("height", 10)
            .attr("fill", 'red');

        self.index = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);
    }

    update(year){
        let self = this;

        const xmin = 2006.5;
        const xmax = 2018.5;
        self.xscale_p.domain( [xmin, xmax] );

        self.xscale_a.domain( self.data.map(d => d.y));

        const ymin_p = 100000000;
        const ymax_p = 200000000;
        self.yscale_p.domain( [ymin_p, ymax_p] );

        const ymin_a = 5000000;
        const ymax_a = 7000000;
        self.yscale_a.domain( [ymin_a, ymax_a] );

        self.render(year);
    }

    render(year){
        let self = this;

        const line = d3.line()
                .x( d => self.xscale_p(d.y))
                .y( d => self.yscale_p(d.p));
        
        self.chart.selectAll("bar")
                .data(self.data)
                .enter()
                .append("rect")
                .attr("x", d => self.xscale_a(d.y) )
                .attr("y", d => self.yscale_a(d.a))
                .attr("width", self.xscale_a.bandwidth())
                .attr("height", d => self.inner_height - self.yscale_a(d.a))
                .attr("fill", "red");
            
        self.chart.append("path")
                    .attr('d', line(self.data))
                    .attr('stroke', 'blue')
                    .attr('fill', 'none')
        
        self.chart.selectAll("c1")
                    .data(self.data)
                    .enter()
                    .append("circle")
                    .attr("cx", d => self.xscale_p(d.y))
                    .attr("cy", d => self.yscale_p(d.p))
                    .attr("r", 5)
                    .attr("fill", "blue")
                    .on('mouseover', (e,d) => {
                        d3.select('#tooltip')
                            .style('opacity', 1)
                            .html(`<div class="tooltip-label">Position</div>(${d.y}, ${d.p})`);
                    })
                    .on('mousemove', (e) => {
                        const padding = 10;
                        d3.select('#tooltip')
                            .style('left', (e.pageX + padding) + 'px')
                            .style('top', (e.pageY + padding) + 'px');
                    })
                    .on('mouseleave', () => {
                        d3.select('#tooltip')
                            .style('opacity', 0);
                    });

        self.index.selectAll('line')
                    .data(self.data)
                    .join('line')
                    .attr('x1', self.xscale_p(year))
                    .attr('x2', self.xscale_p(year))
                    .attr('y1', 30)
                    .attr('y2', self.inner_height)
                    .attr("stroke-width",1)
                    .attr("stroke","black");
            
        self.xaxis_p_group
            .call( self.xaxis_p );
        
        self.yaxis_p_group
            .call( self.yaxis_p.tickSizeOuter(0) );

        self.yaxis_a_group
            .call( self.yaxis_a.tickSizeOuter(0) );
    }
}