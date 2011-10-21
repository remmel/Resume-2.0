/**
 * Create a rounded corner rectangle by extanding RaphaelJs functionality
 * @params x, y , width, height, upper-left corner rounded, upper-right, lower-right, lower-left
 * @author Remy Mellet
 * @version 1.0 2011-09-17
 */
Raphael.fn.roundedRect = function (x, y, w, h, r1, r2, r3, r4){
    var array = [];
    array = array.concat(["M",x,r1+y, "Q",x,y, x+r1,y]); //A
    array = array.concat(["L",x+w-r2,y, "Q",x+w,y, x+w,y+r2]); //B
    array = array.concat(["L",x+w,y+h-r3, "Q",x+w,y+h, x+w-r3,y+h]); //C
    array = array.concat(["L",x+r4,y+h, "Q",x,y+h, x,y+h-r4, "Z"]); //D
    return this.path(array);
};

/**
 * Create a basic triangle by extanding RaphaelJs functionality
 * @params x, y , width, height
 * @author Remy Mellet
 * @version 1.0 2011-09-17
 */
Raphael.fn.triangle = function(x, y, w, h){
    var array = [];
    array = array.concat(["M",x,y-h/2, "l", 0, h, "l", w, -h/2, "Z"]);
    return this.path(array);
};

/**
 * circle_x, circle_x //x+duree/2, y+8
 * offset_x_text
 * - undefined or 0, text centrered
 * - >0 text align end/right + length from right edge
 * - <0 text align start/left +length from left edge
 */
Raphael.fn.pointer = function(x, y, h, title, content, offset_x_text){          
   var align = "end"
   if(offset_x_text == undefined || offset_x_text == 0){
      align = "center";
      offset_x_text = 0;
   }else if(offset_x_text > 0){
      align = "end";
   }else{ //<0
      align="start";
   }
   
   this.circle(x, y, 3).attr({fill: "black", stroke: "none"});
   this.path(["M",x, y,"l",0,-h+6]);
            
   var t = this.text(x+offset_x_text, y-h-15, title).attr({"font-size": 14, "text-anchor":align});
   this.rect(t.getBBox().x,t.getBBox().y, t.getBBox().width, t.getBBox().height).attr({fill: "white", stroke: "none"});
   t.toFront();
   t = this.text(x+offset_x_text, y-h, content).attr({"font-size": 11, "text-anchor":align, fill: "gray"});
   this.rect(t.getBBox().x,t.getBBox().y, t.getBBox().width, t.getBBox().height).attr({fill: "white", stroke: "none"});
   t.toFront();
};

/*Raphael.fn.textWithBackground = function(x, y, content){
   return {
      var t = this.text(x,y, content);
      this.rect(t.getBBox().x,t.getBBox().y, t.getBBox().width, t.getBBox().height).attr({fill: "black", stroke: "none"});
      t.toFront();
   };
};*/