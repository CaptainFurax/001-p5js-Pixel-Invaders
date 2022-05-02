class Shield extends Sprite
{
    constructor( src, v = createVector(0,0) )
    {
        super( src, v );
        this.Resistance = this.DataSource.w/2;
    }
    Calc()
    {
        this.Position.x = this.InitPos.x + cos( frameCount ) * (width-this.Dim.x)/2; 
        super.Calc();
    }
    Render( frontiers = false )
    {
        this.Calc(); 
        super.Render( frontiers );
    }
    UpdateSprite()
    {
        super.UpdateDim();
        this.CreateSprite();
    }
    Shrink()
    {
        //
        let rowLength = this.Fragments.length / this.DataSource.h;
        for ( let i = this.DataSource.h; i > 0; i-- ) { this.Fragments.splice( i * rowLength-1, 1 ); }
        //
        this.Dim.x = (this.Dim.x - this.offset);
        this.GPoint = p5.Vector.div( this.Dim,2 );
        this.CreateSprite();
        //
    }
} 
/* Garbage : 
*/