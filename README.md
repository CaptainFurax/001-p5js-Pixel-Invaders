# p5js-Pxl-invaders

A port from an old Flash MX Game i made in 2002 - Early-early beta version !

![pxlinvadrs](https://github.com/CaptainFurax/p5xjs-pxl-invadrs/blob/main/CPT2205040933-1268x951.png)

+ [.oO° Very early beta Prototype Demo °Oo.](https://captainfurax.github.io/001-p5js-Pixel-Invaders/)
+ Final Aim : 
  + Control spaceship with mouse
+ 2D Canvas:
  + Every sprite is generated on the fly in an off-screen graphic buffer with a single brick/square, over a json file containing pixel matrix and color palette.
  + Once a sprite explode, it is removed and replaced by a 'pixel perfect' set of bricks corresponding to it and is so, able to explode.
  + When a sprite is hitted, we fastly show his color mask [ XOR bitwise Mask ]
  + NB : Sprites are made with a graphic web tool i built to draw/generate json matrix files.
+ So, once destroyed, every elements : Monsters, ship, tray, scores extra life [ whatever you want in fact ] can explode.  
+ POO :
  + 'Sprites' are made of 'Fragments' [ Moving 'Dots' ] which are basicly...'Dot' Class
  + Example :
    + An 'Invader' inherit from 'Sprite' Class, which are made of 'Fragments', which themselves inherits from 'Dot' 
    + Same thing for the 'Ship', inherits from 'Sprite', made of 'Fragments', which inherits from 'Dot'
    + A shot or an explosion's fragment, is a single 'Fragment' inheriting from Dot - No need of off-screen buffer here.
    + In the 'Scene' Class, i store and manage 'Sprites' positions whereas in the 'Sprite', 'Dots' positions are managed relatively to their Scene Position...

