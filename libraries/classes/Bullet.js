class Bullet extends Dot
{
    constructor( v, clr, size, s )
    {
        super( v, clr, size );
        this.vel = createVector( 0, s );
    }
    /**/
    #Calc()
    {
        this.Position.add( this.vel );
        super.Calc();
    }
    /**/
    Render()
    {
        this.#Calc();
        super.Render();
    }
    /**/
    OutOfRange()
    {
        return ( this.ScenePosition.y < 0 );
    }
    /**/
}