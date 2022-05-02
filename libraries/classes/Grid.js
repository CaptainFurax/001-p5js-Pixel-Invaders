class Grid extends Scene
{
    constructor( invader, cols, rows )
    {
        super( createVector(0,0) );
        this.Invaders = new Array();
        this.SourceMap = Array.from( SpritesFile.Invaders ).find((i) => i.name == invader );
        this.Direction = createVector(2,0);
        let row = 0;
        for ( let i = 0; i < ( cols * rows ); i++ )
        {
            let posX = i%cols * this.SourceMap.w * (blockSize + blockSpacing);
            let posY = row * this.SourceMap.h * (blockSize + blockSpacing);  
            if ( i%cols == cols-1 ) row++;
            this.Invaders.push( new Invader( this.SourceMap, createVector( posX, posY ) ) );
        }
        this.Dim = p5.Vector.sub( p5.Vector.add( this.Invaders[ this.Invaders.length-1 ].Position , this.Invaders[ this.Invaders.length-1 ].Dim ), this.Invaders[0].Position ); 
    }
    /**/
    #Calc()
    {
        super.Calc();
    }
    /**/
    Render( move, frontiers = false )
    {
        if ( frontiers )
        {
            fill(0,0);
            stroke( 255, 0, 0 );
            rect( this.ScenePosition.x, this.ScenePosition.y ,this.Dim.x, this.Dim.y );    
        }
        for ( let invader of this.Invaders )
        {
            invader.GridRender( this.ScenePosition );
        }
        switch (move )
        {
            case 0:
                break;
            case 1:
                if (  this.Position.x > width - this.Dim.x  || this.Position.x < 0 ) 
                {
                    this.Direction.x *= - 1;
                }
                this.Position.add( this.Direction );
            break;        
            case 2:
                if (  this.Position.x > width - this.Dim.x || this.Position.x < 0 ) 
                {
                    this.Direction.x *= - 1;
                    this.Position.y += blockSize + blockSpacing;
                }
                this.Position.add( this.Direction );
            break;
        //        
        }
        this.#Calc();
    }
    UpdateGridDim()
    {   
        let farthest = createVector(0,0);
        for ( i of this.Invaders )
        {
            if ( i.ScenePosition.x >= farthest.x ) farthest.x = i.ScenePosition.x;
            if ( i.ScenePosition.y >= farthest.y ) farthest.y = i.ScenePosition.y;
        }
        this.Dim = p5.Vector.sub( p5.Vector.add( farthest , this.Invaders[this.Invaders.length-1].Dim ), this.Invaders[0].Position ); 
    }
}
