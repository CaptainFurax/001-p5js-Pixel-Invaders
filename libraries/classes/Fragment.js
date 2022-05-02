class Fragment extends Dot
{
  constructor(v, GPoint, clr, size) {
    super( v, clr, size);
    this.Direction = p5.Vector.sub(this.Position, GPoint).normalize();
    this.Direction.mult(random(3.5, 7.0));
  }
  /**/
  #Calc()
  {
    this.Position.add( this.Direction );
    super.Calc();
  }
  /**/
  Render() {
    this.#Calc();
    super.Render();
  }
  /**/
  OutOfRange() {
    return  this.ScenePosition.y < 0 || this.ScenePosition.y > height || this.ScenePosition.x < 0 || this.ScenePosition.x > width;
  }
}