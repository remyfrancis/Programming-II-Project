
// Global variable to store the gallery object. The gallery object is
// a container for all the visualisations.
var gallery;

function setup() {
  // Create a canvas to fill the content div from index.html.
  canvasContainer = select('#app');
  // Changed size of p5js Canvas for 600px to accomodate Snap SVG canvas on screen
  var c = createCanvas(600, 600);
  c.parent('app');



  // Create a new gallery object.
  gallery = new Gallery();

  // Add the visualisation objects here.
  gallery.addVisual(new TechDiversityRace());
  gallery.addVisual(new TechDiversityGender());
  gallery.addVisual(new PayGapByJob2017());
  gallery.addVisual(new PayGapTimeSeries());
  gallery.addVisual(new ClimateChange());
  gallery.addVisual(new CovidInfectionsByGender());
  gallery.addVisual(new BubbleMap());
  gallery.addVisual(new Timeline());
}

function draw() {
  // Changed Visualization background colour to sky blue
  background(0, 191, 255);
  if (gallery.selectedVisual != null) {
    gallery.selectedVisual.draw();
  }
}
