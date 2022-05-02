class Dot extends Scene
{
  constructor( v, clr, size )
  {
    super( v );
    this.clr = clr;
    this.size = size;
  }
  /**/
  Render()
  {
    push();
      noStroke();
      fill( this.clr );
      rect( this.ScenePosition.x, this.ScenePosition.y, this.size );
    pop();
  }
  /**/
  Bingo( elm )
  {
    return ( this.ScenePosition.x > elm.ScenePosition.x && this.ScenePosition.x < elm.ScenePosition.x + elm.Dim.x && this.ScenePosition.y > elm.ScenePosition.y && this.ScenePosition.y < elm.ScenePosition.y + elm.Dim.y );
  }
}
