function Timeline(){

    //Visualization name
    this.name = 'Covid Series Chart';

    //Visualization id
    this.id = 'covid-timeseries-chart';

    //Visualization title
    this.title = 'COVID-19: A Timeseries of Progression in Saint Lucia';

    // Property to represent whether data has been loaded.
    this.loaded = false;

    this.xAxisLabel = 'Months';
    this.yAxisLabel = 'People';

    var marginSize = 80;

    // Layout object to store all common plot layout parameters and
    // methods.
    this.layout = {
        marginSize: marginSize,

        // Locations of margin positions. Left and bottom have double margin
        // size due to axis and tick labels.
        leftMargin: marginSize * 2,
        rightMargin: width - marginSize,
        topMargin: marginSize,
        bottomMargin: height - marginSize * 2,
        pad: 5,

        plotWidth: function() {
        return this.rightMargin - this.leftMargin;
        },

        plotHeight: function() {
        return this.bottomMargin - this.topMargin;
        },

        // Boolean to enable/disable background grid.
        grid: true,

        // Number of axis tick labels to draw so that they are not drawn on
        // top of one another.
        numXTickLabels: 13,
        numYTickLabels: 10,
    };


    // Preload the data. This function is called automatically by the
    // gallery when a visualisation is added.
    this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/map/covid-by-month.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });
    };


    this.setup = function(){
        // Font defaults.
        textSize(16);

        
        let years = this.data.getColumn(0);
        
        // Start and end dates used for x-axis
        this.yearMin = years[0];
        this.yearMax = years[years.length - 1];

        // Numbers used for y-axis
        this.dataMin = 0;
        this.dataMax = max(this.data.getColumn('Total Vaccinations')); 
        
    };

    this.destroy = function(){

    }

    this.draw = function(){
        if (!this.loaded) {
            console.log('Data not yet loaded');
            return;
        }

        //Draw title
        this.drawTitle();

        //Draw x and y axis
        drawAxis(this.layout);

        //Draw y-axis labels
        drawYAxisTickLabels(this.dataMin, this.dataMax, this.layout, this.mapCasesToHeight.bind(this), 0);

        drawAxisLabels(this.xAxisLabel, this.yAxisLabel, this.layout);

        var previous;
        var timeGap = this.yearMax - this.yearMin;

        for(var i = 0; i < this.data.getRowCount(); i++){

            
            //Store data for current time period in object
            var current = {
                'timePeriod': this.data.getNum(i, 'Month Number'),
                'cases': this.data.getNum(i, 'Total Cases'),
                'deaths': this.data.getNum(i, 'Total Deaths'),
                'vaccinations': this.data.getNum(i, 'Total Vaccinations')
            };


            if (previous != null){
                //Draw line connecting previous time period to current time period for new cases

                strokeWeight(5)
                stroke(255, 204, 0);
                point(this.mapTimePeriodToWidth(previous.timePeriod), this.mapCasesToHeight(previous.cases));
                point(this.mapTimePeriodToWidth(current.timePeriod), this.mapCasesToHeight(current.cases));

                strokeWeight(2);
                stroke(255, 204, 0); // color of line
                smooth();
                line(this.mapTimePeriodToWidth(previous.timePeriod),
                     this.mapCasesToHeight(previous.cases),
                     this.mapTimePeriodToWidth(current.timePeriod),
                     this.mapCasesToHeight(current.cases));

                     
                //Draw line for vaccinations
                strokeWeight(5)
                stroke('green');
                point(this.mapTimePeriodToWidth(previous.timePeriod), this.mapCasesToHeight(previous.vaccinations));
                point(this.mapTimePeriodToWidth(current.timePeriod), this.mapCasesToHeight(current.vaccinations));

                strokeWeight(2);
                stroke('green'); // color of line
                
                smooth();
                line(this.mapTimePeriodToWidth(previous.timePeriod),
                     this.mapCasesToHeight(previous.vaccinations),
                     this.mapTimePeriodToWidth(current.timePeriod),
                     this.mapCasesToHeight(current.vaccinations));


                //Draw line for deaths
                strokeWeight(5)
                stroke('red');
                point(this.mapTimePeriodToWidth(previous.timePeriod), this.mapCasesToHeight(previous.deaths));
                point(this.mapTimePeriodToWidth(current.timePeriod), this.mapCasesToHeight(current.deaths));

                strokeWeight(2);
                stroke('red'); // color of line
                smooth();
                line(this.mapTimePeriodToWidth(previous.timePeriod),
                     this.mapCasesToHeight(previous.deaths),
                     this.mapTimePeriodToWidth(current.timePeriod),
                     this.mapCasesToHeight(current.deaths));

                //Number of xAxis labels to skip
                var xLabelSkip = ceil(timeGap / this.layout.numXTickLabels);

                if(i % xLabelSkip == 0){
                    drawXAxisTickLabel(previous.timePeriod, this.layout, this.mapTimePeriodToWidth.bind(this));
                }

            }
            previous = current;
        }

        fill("#fff");
        rect(20, 490, 150, 100);
        fill("#000");
        text("Vaccinations", 100, 510);

        fill("#46AF53");
        rect(25, 500, 20, 20);
        fill("#000");
        text("Infections", 100, 540);

        fill("#FFF04B");
        rect(25, 530, 20, 20);
        fill("#000");
        text("Deaths", 100, 570);

        fill("#DC162F");
        rect(25, 560, 20, 20);
        


    }

    this.drawTitle = function(){
        fill(0);
        noStroke();
        textAlign('center', 'center');

        text(this.title, (this.layout.plotWidth() / 2) + this.layout.leftMargin, this.layout.topMargin - (this.layout.marginSize / 2));
    }

    this.mapTimePeriodToWidth = function(value){
        return map(value, this.yearMin, this.yearMax, this.layout.leftMargin, this.layout.rightMargin);
    }

    this.mapCasesToHeight = function(value){
        return map(value, this.dataMin, this.dataMax, this.layout.bottomMargin, this.layout.topMargin);
    }


}