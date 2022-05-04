# p5js-Pxl-invaders

A port from an old Flash MX Game i made in 2002 - Early-early beta version !

+ Final Aim : 
  + Control spaceship by moving head on right/left side + eyes blinking to shoot [ actual control with mouse ]
  + Using P5 Webcam functions to capture head moves + eyes blinking
+ 2D Canvas:
  + Every sprite is generated on the fly with a single brick/square, over a json file containing pixel matrix and color palette.
  + Once a sprite explode, it is removed and replaced by a 'pixel perfect' set of bricks corresponding to it and is so, able to explode.
  + When a sprite is hitted, we fastly show his color mask [ XOR bitwise Mask ]
  + NB : Sprites are made with a graphic web tool i built to draw/generate json matrix files.
+ So, once destroyed, every elements : Monsters, ship, tray, scores extra life [ whatever you want in fact ] can explode.  
+ POO :
  + 'Sprites' are made of 'Fragments' [ Moving 'Dots' ] which are basicly...'Dots'
  + Example :
    + An 'Invader' inherit from 'Sprite' Class, which are made of 'Fragments', which themselves inherits from 'Dot' 
    + Same thing for the 'Ship', inherits from 'Sprite', made of 'Fragments', which inherits from 'Dot'
    + In the 'Scene' Class, i store and manage 'Sprites' positions whereas in the 'Sprite', 'Dots' positions are managed relatively to their Scene Position...
+ [.oO° Very early beta Demo °Oo.](https://captainfurax.github.io/p5xjs-pxl-invadrs/)

![pxlinvadrs](https://github.com/CaptainFurax/p5xjs-pxl-invadrs/blob/main/CPT2205040933-1268x951.png)

