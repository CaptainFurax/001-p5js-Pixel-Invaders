class Sprite extends Scene
{
  constructor( src, v )
  {
    super( v );
    this.DataSource = src;
    //
    this.offset = blockSize + blockSpacing;
    this.Dim = createVector( this.DataSource.w * this.offset, this.DataSource.h * this.offset);
    this.Fragments = new Array();
    //
    this.GPoint = p5.Vector.div(this.Dim,2);
    this.SpritePalette = this.DataSource['palette'];
    //
    for ( let i in this.DataSource.data )
    {
      let posY = i * this.offset; // Rangées -> y
      for ( let j in this.DataSource.data[i] )
      {
          if ( this.DataSource.data[i][j] )
          {
            let posX = j * this.offset; // Colonnes -> x
            let clr = this.SpritePalette.find( (c) => c.id == this.DataSource.data[i][j] ).clr;
            this.Fragments.push( new Fragment(  createVector(posX, posY), this.GPoint, clr, blockSize ) );
          }
      }
    }  
    //    
    this.Hits = 0;
    this.Impact = false;
    //
    this.CreateSprite();
  }
  /**/
  Render( frontiers )
  {
    push();
      image( this.Sprite, this.ScenePosition.x, this.ScenePosition.y, this.Dim.x, this.Dim.y);
      // 
      if ( this.Impact )
      {
        push();
          blendMode(ADD);
          image( this.HitSprite, this.ScenePosition.x, this.ScenePosition.y, this.Dim.x, this.Dim.y );
        pop();
        this.Impact = !this.Impact;
      }
      // 
      if ( frontiers )
      {
        push();
          fill(0,0);
          stroke( "#fff");
          rect( this.ScenePosition.x, this.ScenePosition.y, this.Dim.x, this.Dim.y );
        pop();  
      }
      pop();
  }
  /**/
  Xplode()
  {
    return this.#PrepareFragments();
  }
  CenterX()
  {
    return (width - this.Dim.x)/2;
  }
  /**/
  #PrepareFragments()
  {
    for ( let i in this.Fragments )
      this.Fragments[i].Position = p5.Vector.add( this.Fragments[i].Position, this.ScenePosition );
    return this.Fragments;
  }
/*
*/
  CreateSprite()
  {
    this.Sprite = createGraphics(this.Dim.x, this.Dim.y);
    this.HitSprite = createGraphics(this.Dim.x, this.Dim.y);

    for ( let i in this.Fragments )
    {
      this.Sprite.noStroke();
      this.Sprite.fill( this.Fragments[i].clr );
      this.Sprite.rect( this.Fragments[i].Position.x, this.Fragments[i].Position.y, blockSize );
      //
      this.HitSprite.copy( this.Sprite, 0, 0, this.Dim.x, this.Dim.y, 0, 0, this.Dim.x, this.Dim.y );
      this.HitSprite.filter(THRESHOLD,0.0);
    }
  }
}



