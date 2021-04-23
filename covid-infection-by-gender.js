function CovidInfectionsByGender(x, y, diameter) {

    // Name for the visualisation to appear in the menu bar.
    this.name = 'Active Covid Infections By Gender in Saint Lucia';

    // Each visualisation must have a unique ID with no special
    // characters.
    this.id = 'covid-infections-gender';

    // Title to display above the plot.
    this.title = 'Active Covid Infections By Gender in Saint Lucia 2020-2021.';

    // Property to represent whether data has been loaded.
    this.loaded = false;

    // Preload the data. This function is called automatically by the
    // gallery when a visualisation is added.
    this.preload = function() {
        var self = this;
        this.data = loadTable(
        './data/map/districts.csv', 'csv', 'header',
        // Callback function to set the value
        // this.loaded to true.
        function(table) {
            self.loaded = true;
        });
    };

    this.setup = function() {
        if (!this.loaded) {
        console.log('Data not yet loaded');
        return;
        }

        // Create a select DOM element.
        this.select = createSelect();
        this.select.position(850, 40);

        // Fill the options with all district names.
        var districts = this.data.columns;
        // First entry is empty.
        for (let i = 1; i < districts.length; i++) {
            this.select.option(districts[i]);
        }


    };

    this.destroy = function() {
        this.select.remove();
    };

    // Create a new pie chart object.
    this.pie = new PieChart(width / 2, height / 2, width * 0.2);

    this.draw = function() {
        if (!this.loaded) {
            console.log('Data not yet loaded');
            return;
        }

        // Get the value of the company we're interested in from the
        // select item.
        var districtName = this.select.value();

        // Get the column of raw data for district.
        var col = this.data.getColumn(districtName);

        // Convert all data strings to numbers.
        col = stringsToNumbers(col);

        // Total Cases for district
        var sums = sum(col);

        // Copy the row labels from the table (the first item of each row).
        var labels = this.data.getColumn(0);

        // Colour to use for each category.
        var colours = ['blue', 'pink'];

        //Percentages of genders infected.
        var malePercent = Math.round((col[0]/sums) * 100);
        var femalePercent = Math.round((col[1]/sums) * 100);

        // Make a title.
        var title = 'Percentages of Active COVID-19 Infections Recorded In ' + districtName;

        

        // Draw the pie chart!
        this.pie.draw(col, labels, colours, title, malePercent, femalePercent);



    };


    
    
  }