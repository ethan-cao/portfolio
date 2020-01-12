---
title: JavaScript OOP
description: ""
date: 2019-06-14
path: /OOP
featuredImage: 
---

#Constructor function
    var obj = new Obj( );     
* functionalities of new keyword:
     1. creates a new empty object, in the end return this newly created object as the “this” reference implicitly, unless the constructor function returns a non-primitive value. In this case, that non-primitive value will be returned.
     2. sets  this.__proto__   = Constructor.prototype 
     3. sets  this.constructor = Constructor.prototype.constructor  (Constructor.prototype.constructor equals to Constructor)
*  2 & 3 happen in the very beginning of evoking constructor, before any code execution.
* new Obj is equivalent to new Obj(), only when argument is not needed
* invoking constructor without new results in:  inside the constructor, this refers to global
* If there is explicit return and the return followed by an object, the object will be returned instead of this.
   If return is followed by something that’s not an object, it will simply be ignored, and the object referenced by this will be returned as usual.
