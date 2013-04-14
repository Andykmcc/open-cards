Open-Cards
========
---

This jquery plug-in allows you to easy create an css3 effect similar to opening a greeting card. 

Usage
========
---

You must include the following two files.

1.  src/jquery.cards.min.js
2.  src/cards.min.css

You can target the elements you would like turned into a card using Javascript/Jquery like so.

`` $('.targetClass').cards(); ``

By default the card opens on mouseenter and closes on mouseleave. it is possible to change this to a click event. 

`` $('.targetClass').cards( { activate : 'click' } ); ``