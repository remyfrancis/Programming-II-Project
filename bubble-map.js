function BubbleMap() {

    //Visualization Name
    this.name = 'Bubble Map';

    //Visualization id
    this.id = 'saint-lucia-choropleth-chart';

    // Title to display above the plot.
    this.title = 'Bubble Map of COVID Cases in Saint Lucia';

    // Property to represent whether data has been loaded.
    this.loaded = false;

    // Position of map data
    this.keyPos = 135;

    // Constructor for Districts
    class District{
        constructor(name, maleCases, femaleCases, xPos, yPos, bubbleXPos, bubbleYPos){
            this.name = name;
            this.maleCases = maleCases;
            this.femaleCases = femaleCases;
            this.xPos = xPos;
            this.yPos = yPos;
            this.bubbleXPos = bubbleXPos;
            this.bubbleYPos = bubbleYPos;
        }
        totalCases(){
            let total = parseInt(this.maleCases) + parseInt(this.femaleCases);
            return total;
        }
        // The bubble() method calculates the size of the bubbles
        bubble(){
            let ratio = 2.5 * (Math.ceil(((parseInt(this.maleCases) + parseInt(this.femaleCases)) / 3791) * 100));
            return ratio++;
        }
    }

    // Constructor for Countries.
    // Would like to use this for other Countries down the line,
    // so I abstracted it as a counstructor instead of an Object
    class Country{
        constructor(name, activeCases, criticalCases, recoveries, vaccinations, deaths, tests, date){
            this.name = name;
            this.activeCases = activeCases;
            this.criticalCases = criticalCases;
            this.recoveries = recoveries;
            this.vaccinations = vaccinations;
            this.deaths = deaths;
            this.tests = tests;
            this.date = date;
        }
    }


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
        // SVG Map of Saint Lucia loaded and stored in this.map variable
        this.map = loadImage('resources/stLuciaHigh.svg');            
    };
  
    this.destroy = function() {
    };


    this.draw = function() {
        if (!this.loaded) {
            console.log('Data not yet loaded');
            return;
        }

        // Retrieve male and female values from the districts.csv table
        let maleRow = this.data.getRow(0);
        let femaleRow = this.data.getRow(1);

        // Arrays serving as temporary storage for data values retrieved 
        // in maleRow and femaleRow variables
        let maleStore = [];
        let femaleStore = [];

        // The following two loops populate the maleStore and femaleStore arrays:
        for(let i = 1; i < this.data.getColumnCount(); i++){
            maleStore.push(maleRow.getString(i));
        }
        for(let j = 1; j < this.data.getColumnCount(); j++){
            femaleStore.push(femaleRow.getString(j));
        }

        // Total male and female cases
        this.maleTotal = sum(maleStore);
        this.femaleTotal = sum(femaleStore);
        this.confirmedCases = this.maleTotal + this.femaleTotal;

        // Ratio variable for calulating bubble size
        let casePercentage = Math.ceil((this.gIslet / this.confirmedCases) * 100);
        this.ratio = Math.ceil((casePercentage / 100) * 255);

        // District Objects created using the "District" Constructor
        const grosIslet = new District("Gros-Islet", this.data.getColumn(1)[0], this.data.getColumn(1)[1], 410, 180, 410, 180);
        const castries = new District("Castries", this.data.getColumn(2)[0], this.data.getColumn(2)[1], 320, 240, 320, 240);
        const dennery = new District("Dennery", this.data.getColumn(3)[0], this.data.getColumn(3)[1], 420, 320, 420, 330);
        const anseLaRaye = new District("Anse La Raye", this.data.getColumn(4)[0], this.data.getColumn(4)[1], 220, 290, 280, 300);
        const canaries = new District("Canaries", this.data.getColumn(5)[0], this.data.getColumn(5)[1], 230, 320, 260, 330)
        const soufriere = new District("Soufriere", this.data.getColumn(6)[0], this.data.getColumn(6)[1], 180, 390, 230, 380);
        const choiseul = new District("Choiseul", this.data.getColumn(7)[0], this.data.getColumn(7)[1], 220, 450, 240, 460);
        const laborie = new District("Laborie", this.data.getColumn(8)[0], this.data.getColumn(8)[1], 300, 480, 300, 460);
        const micoud = new District("Micoud", this.data.getColumn(9)[0], this.data.getColumn(9)[1], 400, 410, 400, 420);
        const vieuxFort = new District("Vieux-Fort", this.data.getColumn(10)[0], this.data.getColumn(10)[1], 400, 490, 380, 500);

        // Generated District Objects are placed in an Array so that its elements 
        // and properties can be looped through with ease
        const districts = [grosIslet, castries, dennery, anseLaRaye, canaries, soufriere, choiseul, laborie, micoud, vieuxFort];
        
        // Country Data. Only generated a Country object for Saint Lucia using
        // the Country constructor, however the Country Class can be utilized to
        // create objects for other countries
        const saintLucia = new Country("Saint Lucia", 113, 2, 4099, 20247, 58, 32827, "Updated: 23 March, 2021");

        
        // Map of Saint Lucia object containing positional data relative to the canvas
        const mapPosition = {
            xPos: 200,
            yPos: 120,
            width: 700,
            height: 1100
        }

        // Visualization background colour
        background(0, 191, 255);

        // Map of Saint Lucia image displayed on canvas
        image(this.map, mapPosition.xPos, mapPosition.yPos, mapPosition.width, mapPosition.height);

        // Text size used in visualization for statistical data and labels
        textSize(18); 

        //Bubble colour
        fill(255, 0, 0, 127);

        // This loop generates the bubbles at the districts
        for(let k = 0; k < districts.length; k++){
            ellipse(districts[k].bubbleXPos, districts[k].bubbleYPos, districts[k].bubble());
        }

        // District Names and placement
        fill('#222');
        textAlign(CENTER);
        // This loop generates the district names and their placement
        for(l = 0; l < districts.length; l++){
            text(districts[l].name, districts[l].xPos, districts[l].yPos);
        }

        //Panel 1
        fill('#222');
        text(saintLucia.date, 135, 100);
        
        //Panel 2
        fill('#222');
        textAlign('center');
        text('Active cases: ' + saintLucia.activeCases, this.keyPos, 130);
        text('Critical cases: ' + saintLucia.criticalCases, this.keyPos, 150);
        text('Vaccinations: ' + saintLucia.vaccinations, this.keyPos, 170);
        text('Recovered: ' + saintLucia.recoveries, this.keyPos, 190);
        text('Deaths: ' + saintLucia.deaths, this.keyPos, 210);
    }
}

