p5.disableFriendlyErrors = true;
// Main Objects
let cv;
let SpaceShip;
// Array of Bad, Ugly and..Invaders !
let Invaders = new Array(); let bullets = new Array();
let fragmentations; let DBug = new Array();
let Shields = []; let Grids = [];
// Scale Display Variables.
let Origin; let ratio; let cvSiz;
let blockSize = 6; let blockSpacing = 1.5;
//
function preload() { SpritesFile = loadJSON("sprites.json"); }
// Create a new canvas to the browser size
function setup() {
  pixelDensity(1);
  frameRate(50);
  angleMode(DEGREES);
  cursor(CROSS);
  //
  DBugFlag = false;
  cvSiz = createVector(1024,768);
  cv = createCanvas(cvSiz.x, cvSiz.y).id("cv");
  cv.mouseClicked( BangBang );
  Origin = createVector(width / 2, height / 2);
  //
  select("#dbug").style("width", cvSiz.x * 0.33 + "px");
  select("#dbug").style("height", cvSiz.y * 0.33 + "px");
  //
  SpaceShip = new Ship( SpritesFile.SpaceShip.find( (s) => s.name == "ship-2" ) );
  Grids.push( new Grid( "poulpi", 4, 4 ) );
 
  // Shields.push( new Shield( SpritesFile.Shields.find((i) => i.name == "Shield-1") ) );
  // Shields[0].Place( createVector( width-Shields[0].Dim.x, height - ( SpaceShip.Dim.y + SpaceShip.Dim.y*2) ) );
  //
  Shields.push( new Shield( SpritesFile.Shields.find((i) => i.name == "Shield-2") ) );
  Shields[0].Place( createVector( Shields[0].CenterX(), height - ( SpaceShip.Dim.y + SpaceShip.Dim.y*2) ) );
  //
  // Shields.push( new Shield( SpritesFile.Shields.find((i) => i.name == "Shield-1") ) );
  // Shields[2].Place( createVector( 0, height - ( SpaceShip.Dim.y + SpaceShip.Dim.y*2) ) );
  //
  windowResized();
}
// On window resize, update the canvas size.
function windowResized()
{
  ratio = createVector( windowWidth/cvSiz.x, windowHeight/cvSiz.y);
  if ( windowWidth > windowHeight && ratio.x > ratio.y )
  {
    select("#cv").style("width", cvSiz.x * ratio.y + "px");
    select("#cv").style("height", windowHeight + "px");
  } else 
  {
    select("#cv").style("width", windowWidth + "px");
    select("#cv").style("height", cvSiz.y * ratio.x + "px");
  }
  mouseX = SpaceShip.CenterX();
}
/*
  Bang-Bang !
*/
function BangBang() {
  if (!SpaceShip.Dead)
    bullets.push(new Bullet(SpaceShip.ScenePosition, "#FF0000", blockSize, -6));
}
/*
  Main Loop
*/
function draw() {
  background(0,0,0);
  if (DBugFlag) { 
    Help();
    DBug.push( "Ammo : " + bullets.length);
    DBug.push( "Mouse :" + round(mouseX) + ", " + round(mouseY) );
    DBug.push( "Frags : " + Scene.Frags.length );
    DBug.push( "ScreenSize : " + width + " - " + height );
  }
  /*
    Bullets : Rendu & Calculs + Collision avec Invaders, Shields
  */
  for ( let b of bullets )
  {
    b.Render();
    if ( b.OutOfRange() ) bullets.shift();
    // Bullets -> Invaders ## [ ~Detection à optimiser avec quadrants ]
    for ( let g of Grids )
    {
      for ( i of g.Invaders )
      {
        if ( b.Bingo(i) )
        {
          bullets.shift();
          Scene.ManageFragmentations( i, g.Invaders );
          ( g.Invaders.length > 0 ) ? g.UpdateGridDim() : Grids.splice( Grids.indexOf(g),1 );
        }  
      }
    }
  // Bullets -> Shields
  for ( let s of Shields )
  {
    if ( b.Bingo( s ) )
    {
      bullets.splice( bullets.indexOf( b ), 1 );
      Scene.ManageFragmentations( s, Shields );
      s.Shrink();
    }  
  }
}
  /*
    Fragmentations : Calculs & Rendu + Collision avec SpaceShip, Shield & Invaders
  */
  for ( let f of Scene.Frags )
  {
    // Frags -> Rendu et sortie de scene.
    f.Render();
    if ( f.OutOfRange() )
    {
      Scene.Frags.splice( Scene.Frags.indexOf( f ), 1);
    }
    // Frags -> SpaceShip
    if ( f.Bingo(SpaceShip) && !SpaceShip.Dead ) {
      Scene.Frags.splice(Scene.Frags.indexOf(f), 1);
      Scene.ManageFragmentations( SpaceShip );
    }
    // Frags -> Shields
    for ( let s of Shields )
    {
      if ( f.Bingo( s ) )
      {
        Scene.Frags.splice(Scene.Frags.indexOf(f), 1);
        s.Shrink(); 
        Scene.ManageFragmentations( s, Shields );
      }  
    }
    // Frags -> Invaders
    for ( let g of Grids )
    {
      for ( let i of g.Invaders ) {
        if ( f.Bingo( i ) )
        {
          Scene.Frags.splice(Scene.Frags.indexOf(f), 1);
          Scene.ManageFragmentations( i, g.Invaders );
          ( g.Invaders.length > 0 ) ? g.UpdateGridDim() : Grids.splice( Grids.indexOf(g),1 );
        }
      }  
    }
  }
  /* Invaders /3 : rendu & calculs */
    for ( var g of Grids ) g.Render( 2, false );
  /* Shields /2 */
  for ( let s of Shields ) s.Render( false );
  /* SpaceShip /1 : rendu et calcul! */
  if (!SpaceShip.Dead) SpaceShip.Render();
  //
}

/**/
function Help() {
  let txt = ""; DBug.forEach((t) => (txt += t + "<br/>"));
  select("#dbug").html(txt);
  DBug = new Array( "<p style='text-align:center'>D-Bug : </p>"  );
  //
  push();
    strokeWeight(0.2);
    stroke("#555555");
    line(width / 2, 0, width / 2, height);
    line(0, height / 2, width, height / 2);
  pop();
}
/* D-Bug */
function mouseWheel(event) {
  let dist = event.delta && DBugFlag ? "none" : "block";
  select("#dbug").style("display", dist);
  DBugFlag = !DBugFlag;
}
