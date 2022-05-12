class PieChart {

    constructor( config, data ){
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
            title: config.title || '',
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
            .attr('transform', `translate(${self.config.width/2}, ${self.config.height/2})`);
        
        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.radius = Math.min( self.inner_width, self.inner_height) / 2;
            
        const title_space = 10;
        self.svg.append('text')
            .style('font-size', '20px')
            .style('font-weight', 'bold')
            .attr('text-anchor', 'middle')
            .attr('x', self.config.width/2 )
            .attr('y', self.config.margin.top - title_space)
            .text( self.config.title)

        self.color = d3.scaleOrdinal()
            .range(["#A4243B", "#D8C99B", "#D8973C", "#BD632F", "#273E47"]);

    }
    
    update(){
        let self = this;

        self.render();
    }

    render(){
        let self = this;

        const pie = d3.pie()
                .value( d => d.value );

        const arc = d3.arc()
                .innerRadius(0)
                .outerRadius( self.radius );

        self.chart.selectAll('pie')
                    .data( pie(self.data) )
                    .enter()
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', d => self.color(d.index))
                    .attr('stroke', ' white')
                    .style('stroke-width', '2px')
    }
}