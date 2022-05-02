class Scene
{
    static Frags = new Array();
    constructor( v )
    {
        this.InitPos = v.copy();
        this.Position = this.InitPos.copy();
        this.ScenePosition = this.Position.copy();
    }
    Calc()
    {
        this.ScenePosition = this.Position.copy();
    }
    Place( v )
    {
        this.InitPos = v.copy();
        this.Position = this.InitPos.copy();
        this.ScenePosition = this.Position.copy();
    }

    static ManageFragmentations( elm, elmArr = null )
    {
        elm.Hits++;
        elm.Impact = true;
        if ( elm.Hits > elm.Resistance )
        {
            this.Frags = this.Frags.concat( elm.Xplode() );
            ( elmArr != null )? elmArr.splice( elmArr.indexOf( elm ), 1 ) : elm.Dead = true; 
        }    
    }
}