class PieChart {
    constructor (config) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
            inner_radius: config.inner_radius || 0,
            outer_radius: config.outer_radius || (config.width - config.margin.left - config.margin.right)/2,
            title: config.title || '',
            cscale: config.cscale
        };
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select(self.config.parent)
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        const center_x = self.config.margin.left + self.inner_width/2;
        const center_y = self.config.margin.top + self.inner_height/2;
        self.chart = self.svg.append('g')
            .attr('transform', `translate(${center_x},${center_y})`);

        self.arc = d3.arc()
            .innerRadius(self.config.inner_radius)
            .outerRadius(self.config.outer_radius);

        self.arc_parcent = d3.arc()
            .innerRadius(self.config.inner_radius)
            .outerRadius(self.config.outer_radius+120);

        self.radius = Math.min(self.inner_width, self.inner_height) / 2;

        const title_space = 70;
        self.svg.append('text')
            .style('font-size', '20px')
            .style('font-weight', 'bold')
            .attr('text-anchor', 'middle')
            .attr('x', self.config.width/2)
            .attr('y', self.config.margin.top - title_space)
            .text( self.config.title );
        
        //ここから下は判例
        self.chart.append('text')
            .style('font-size', '10px')
            .style('text-anchor', 'left')
            .attr('x', -self.inner_width/2.5)
            .attr('y', self.config.height/3)
            .text('Less than 3 minutes');
            
        self.chart.append('rect')
            .attr('x', 30)
            .attr('y', self.config.height/3-10)
            .attr("width", 30)
            .attr("height", 10)
            .attr("fill", self.config.cscale('a'));

        self.chart.append('text')
            .style('font-size', '10px')
            .style('text-anchor', 'left')
            .attr('x', -self.inner_width/2.5)
            .attr('y', self.config.height/3+10)
            .text('3〜5 minutes');
            
        self.chart.append('rect')
            .attr('x', 30)
            .attr('y', self.config.height/3)
            .attr("width", 30)
            .attr("height", 10)
            .attr("fill", self.config.cscale('b'));
        
        self.chart.append('text')
            .style('font-size', '10px')
            .style('text-anchor', 'left')
            .attr('x', -self.inner_width/2.5)
            .attr('y', self.config.height/3+20)
            .text('5〜10 minutes');
            
        self.chart.append('rect')
            .attr('x', 30)
            .attr('y', self.config.height/3+10)
            .attr("width", 30)
            .attr("height", 10)
            .attr("fill", self.config.cscale('c'));

        self.chart.append('text')
            .style('font-size', '10px')
            .style('text-anchor', 'left')
            .attr('x', -self.inner_width/2.5)
            .attr('y', self.config.height/3+30)
            .text('10〜20 minutes');
            
        self.chart.append('rect')
            .attr('x', 30)
            .attr('y', self.config.height/3+20)
            .attr("width", 30)
            .attr("height", 10)
            .attr("fill", self.config.cscale('d'));

        self.chart.append('text')
            .style('font-size', '10px')
            .style('text-anchor', 'left')
            .attr('x', -self.inner_width/2.5)
            .attr('y', self.config.height/3+40)
            .text('More than 20 minutes');
            
        self.chart.append('rect')
            .attr('x', 30)
            .attr('y', self.config.height/3+30)
            .attr("width", 30)
            .attr("height", 10)
            .attr("fill", self.config.cscale('e'));

        self.parcent = self.svg.append('g')
            .attr('transform', `translate(${center_x},${center_y})`);
    }

    update(draw_data) {
        let self = this;

        self.pie = d3.pie()
            .value( d => d[1])
            .sort(function(a, b) { return d3.ascending(a.key, b.key);} );
        
        const data_ready = self.pie(Object.entries(draw_data))

        self.render(data_ready);
    }

    render(data_ready) {
        let self = this;

        self.chart.selectAll('path')
            .data(data_ready)
            .join('path')
            .transition()
            .duration(1000)
            .attr('d', self.arc)
            .attr('fill', d => self.config.cscale(d.data[0]))
            .attr('stroke', 'white')
            .style('stroke-width', '2px');
        
        self.parcent.selectAll('text')
            .data(data_ready)
            .join('text')
            .attr('fill', 'brack')
            .attr('transform', d => `translate(${self.arc_parcent.centroid(d)})`)
            .style('font-size', '5px')
            .attr('text-anchor', 'middle')
            .text(function(d){
                var sum = 0;
                for(let i=0;i<5;i++){
                    sum += parseInt(data_ready[i].data[1]);
                }

                var tmp = (d.data[1]/sum)*1000;

                tmp = Math.round(tmp)/10;

                return "" + tmp + "%";
            });
    }
}