// This particular utilization of Snap SVG can only load after window loads
window.onload = function() {
    var s = Snap("#svg");
    
    var map = Snap.load("resources/stLuciaHigh.svg", function (f) {
        var g = f.select("g");
        s.append(g);
        
        var data = [
            {
              "Gros-Islet": 802,
              "Castries": 1986,
              "Dennery": 154,
              "Anse La Raye": 228,
              "Canaries": 19,
              "Soufriere": 87,
              "Choiseul": 59,
              "Laborie": 57,
              "Micoud": 156,
              "Vieux-Fort": 203
            },
        ];

        
        var totalCases = data[0]["Gros-Islet"] + data[0]["Castries"] + data[0]["Dennery"] +
                            data[0]["Anse La Raye"] + data[0]["Canaries"] + data[0]["Soufriere"] +
                            data[0]["Choiseul"] + data[0]["Laborie"] + data[0]["Micoud"] +
                            data[0]["Vieux-Fort"];

        var numberOfCases = [802, 1986, 154, 228, 19, 87, 59, 57, 156, 203];
        

        // Percentages of total number of cases in district against the total
        // number of cases in the country
        var grosIsletPercent = floor((data[0]["Gros-Islet"] / totalCases) * 100);
        var castriesPercent = floor((data[0]["Castries"] / totalCases) * 100);
        var denneryPercent = floor((data[0]["Dennery"] / totalCases) * 100);
        var anseLaRayePercent = floor((data[0]["Anse La Raye"] / totalCases) * 100);
        var canariesPercent = floor((data[0]["Canaries"] / totalCases) * 100);
        var soufrierePercent = floor((data[0]["Soufriere"] / totalCases) * 100);
        var choiseulPercent = floor((data[0]["Choiseul"] / totalCases) * 100);
        var laboriePercent = floor((data[0]["Laborie"] / totalCases) * 100);
        var micoudPercent = floor((data[0]["Micoud"] / totalCases) * 100);
        var vieuxFortPercent = floor((data[0]["Vieux-Fort"] / totalCases) * 100);

        // District Names
        var anseLaRaye = "Anse La Raye";
        var castries = "Castries";
        var choiseul = "Choiseul";
        var dennery = "Dennery";
        var grosIslet = "Gros-Islet";
        var laborie = "Laborie";
        var micoud = "Micoud";
        var soufriere = "Soufriere";
        var vieuxFort = "Vieux-Fort";
        var canaries = "Canaries";

        // Key Colours
        const extreme = "#191919";
        const high = "#DC162F";
        const considerable = "#ED893E";
        const moderate = "#FFF04B";
        const low = "#46AF53";

        // District Boundaries in SVG image stored into variables
        var anseLaRayeBoundary = g.select('#LC-01');
        var castriesBoundary = g.select("#LC-02");
        var choiseulBoundary = g.select("#LC-03");
        var denneryBoundary = g.select("#LC-05");
        var grosIsletBoundary = g.select('#LC-06');
        var laborieBoundary = g.select('#LC-07');
        var micoudBoundary = g.select('#LC-08');
        var soufriereBoundary = g.select('#LC-10');
        var vieuxFortBoundary = g.select('#LC-11');
        var canariesBoundary = g.select('#LC-12');

        // Fallback colour of map in case colour coding fails, as well as setting the size of the viewBox
        // for the SVG image so that it fits on screen
        s.attr({
            fill:"#FEFEE9",
            viewBox: "0 -100 1000 1000"
        });

        
        // District Arrays
        const districtPercentages = [
            grosIsletPercent,
            castriesPercent,
            denneryPercent,
            anseLaRayePercent,
            canariesPercent,
            soufrierePercent,
            choiseulPercent,
            laboriePercent,
            micoudPercent,
            vieuxFortPercent
        ];

        const districtBoundaries = [
            grosIsletBoundary,
            castriesBoundary,
            denneryBoundary,
            anseLaRayeBoundary,
            canariesBoundary,
            soufriereBoundary,
            choiseulBoundary,
            laborieBoundary,
            micoudBoundary,
            vieuxFortBoundary,
        ];

        const districtTextDisplay = [
            grosIslet,
            castries,
            dennery,
            anseLaRaye,
            canaries,
            soufriere,
            choiseul,
            laborie,
            micoud, 
            vieuxFort,   
        ];


        // Loop colours the districts according to what percentile of cases they fall into
        for(let i = 0; i < districtPercentages.length; i++){
            if(districtPercentages[i] >= 80){
                districtBoundaries[i].attr({
                    fill: extreme,
                }) 
            } else if(districtPercentages[i] < 80 && districtPercentages[i] >= 60){
                districtBoundaries[i].attr({
                    fill: high,
                }) 
            } else if(districtPercentages[i] < 60 && districtPercentages[i] >= 40){
                districtBoundaries[i].attr({
                    fill: considerable,
                }) 
            } else if(districtPercentages[i] < 40 && districtPercentages[i] >= 20){
                districtBoundaries[i].attr({
                    fill: moderate,
                }) 
            } else {
                districtBoundaries[i].attr({
                    fill: low,
                }) 
            }
        }


        // Instructional text
        var instruction = g.text(530, 30, "Hover Your Cursor Over A District");
        instruction.attr({
            fontSize: "30px",
        })

        // Text for Key
        var keyText = g.text(800, 465, "Key");
        keyText.attr({
            fontSize: "30px"
        })

        // Section containing key information
        var key = g.rect(800, 480, 200, 300);
        key.attr({
            fill:"#fff",
            stroke:"#000",
            strokeWidth:4
        })
        
        // This loop thickens the border lines around a district
        // to indicate the selection of the district.
        // It also displays informational text to the screen once
        // a district is hovered over.
        for(let j = 0; j < districtBoundaries.length; j++){
            districtBoundaries[j].hover(function(){
                districtBoundaries[j].attr({
                    strokeWidth: 10,
                })
                statsBox = s.rect(570, 50, 240, 150);
                statsBox.attr({
                    fill:"#fff",
                    stroke:"#000",
                    strokeWidth:4
                })
                districtName = s.text(590, 80, districtTextDisplay[j] + ":");
                districtCovidData = s.text(590, 110, numberOfCases[j] + " cases");
                districtName.attr({
                    fill: "#000",
                    fontSize: "30px"
                })
                districtCovidData.attr({
                    fill: "#000",
                    fontSize: "30px"
                })
            }, function() {
                districtBoundaries[j].attr({
                    strokeWidth: 4,
                })
                districtName.remove();
                districtCovidData.remove();
                statsBox.remove();
            });
        }

        

        
        // Key Colors
        const fivePercent = g.rect(820, 500, 80, 40);
        fivePercent.attr({
            fill: low
        })

        const ninePercent = g.rect(820, 550, 80, 40);
        ninePercent.attr({
            fill: moderate
        })

        const nineteenPercent = g.rect(820, 600, 80, 40);
        nineteenPercent.attr({
            fill: considerable
        })

        const twentyninePercent = g.rect(820, 650, 80, 40);
        twentyninePercent.attr({
            fill: high
        })

        const thirtyPercent = g.rect(820, 700, 80, 40);
        thirtyPercent.attr({
            fill: extreme
        })


        // Key labels
        var fivePercentText = g.text(910, 530, "1-19%");
        fivePercentText.attr({
            fill:"#000",
            fontSize: "25px"
        })

        var ninePercentText = g.text(910, 580, "20-39%");
        ninePercentText.attr({
            fill:"#000",
            fontSize: "25px"
        })

        var nineteenPercentText = g.text(910, 630, "40-59%");
        nineteenPercentText.attr({
            fill:"#000",
            fontSize: "25px"
        })

        var twentyninePercentText = g.text(910, 680, "60-79%");
        twentyninePercentText.attr({
            fill:"#000",
            fontSize: "25px"
        })

        var thirtyPercentText = g.text(910, 730, "80%+");
        thirtyPercentText.attr({
            fill:"#000",
            fontSize: "25px"
        })

    } );



}

