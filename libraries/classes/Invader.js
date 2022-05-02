class Invader extends Sprite
{
    constructor( src, v )
    {
        super(src, v);
        this.Resistance = this.DataSource.w * 3.5;
    }
    /**/
    Render( frontiers = false )
    {
      super.Calc();
      super.Render( frontiers );
    }
    /**/
    GridRender( v, frontiers = false )
    {
      this.#Move( v );
      super.Render( frontiers );
    }
    /*
      Moves !
    */
    Move_In_Circle()
    {
      this.Position.x = this.InitPos.x + cos( frameCount ) * 20;
      this.Position.y = this.InitPos.y + sin( frameCount ) * 30;
    }
    /**/
    #Move( v )
    {
      this.Position = p5.Vector.add( this.InitPos, v );
      super.Calc();
    }
}