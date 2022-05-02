class Ship extends Sprite
{
  constructor( src, v = createVector(0,0) )
  {
    super( src, v );
    this.Dead = false;
    this.Resistance = this.DataSource.w*2;
  }
  #Calc()
  {
    this.Position = createVector( mouseX, height - this.Dim.y );
    super.Calc();
  }
  Render( frontiers = false )
  {
    this.#Calc();
    super.Render( frontiers );
  }
}
