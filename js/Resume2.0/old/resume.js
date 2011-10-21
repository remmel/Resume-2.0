function Resume() { 
          
  //function drawYear(
  
  
  
  
  
  
  

} ;

//prop

    TypeEnum = {
        EXPERIENCE : 0,
        EDUCATION : 1
    };

    
    
    var plan1 = [];


var config = {
      start_date: new Date('2005-05-01'),
      end_date: new Date() // new Date(2011, 7-1,1)
    }

/**
 * dateA < dateB
 */
function numberOfDays(dateB, dateA){
   this.MILLISEC_A_DAY = 1000 *60 *60 *24;
   return ((dateB - dateA) / MILLISEC_A_DAY);
}


//TODO only full year? //+config colors
function drawYear(paper){
   var startDate = config.start_date;
   var endDate = config.end_date;
    var startYear = startDate.getFullYear();
    var endYear = endDate.getFullYear();
    //offset_y = 100;
    
    for(var year = startYear ; year <= endYear ; year++){
        var i = year - startYear;
        var color  = (i%2) ? "#bfbfbf" : "#e5e5e5";
        var a = (year==startYear) ? startDate : new Date(year, 0, 1);
        var b = (year==endYear) ? endDate : new Date(year+1, 0, 1);
        var width = (year == startYear || year==endYear) ? numberOfDays(b,a) /3 : 365/3;
        
        var x = numberOfDays(a,startDate)/3;
        var c = paper.rect(x, offset_y, width, 20).attr({fill: color, stroke: "none"});
        var text_x = (year == endYear) ? x+365/6 : x+width-365/6;
        var t = paper.text(text_x, offset_y+10, year).attr({"font-size": 16});
    }
    
    var triangle_x  = numberOfDays(endDate,startDate) /3;
    paper.triangle(triangle_x, offset_y+10, 20, 40).attr({fill: color, stroke: "none"});
}


    
    
   function drawItem(paper, data, type){
      var offsetDate = config.start_date;    
      var startDate = new Date(data.start_date);
      var endDate = new Date(data.end_date);
      
      var x = numberOfDays(startDate, offsetDate) / 3;
      var duree = numberOfDays(endDate, startDate) / 3;
        
        (type === TypeEnum.EXPERIENCE) ? y = offset_y - 30 : y = 20 + offset_y;
        (type === TypeEnum.EXPERIENCE) ? w = 30 : w = 40;
        
        if(data.id == "UPM") y+=40;
        
        var box = paper.roundedRect(x, y, duree, w, 0, 0, 5, 5).attr({opacity :0, fill:'black', stroke: "none"});
        box.content = [];
        
        if(type === TypeEnum.EXPERIENCE){
            var pointerHeight = (data.config == undefined || data.config.pointer_h == undefined) ? 40 : data.config.pointer_h;
            var textPointerX = (data.config == undefined || data.config.pointer_text_x == undefined) ? 10 : data.config.pointer_text_x;

            box.content.rect = paper.roundedRect(x, y, duree, 30, 5, 5, 0, 0).attr({fill: data.color, stroke: "none", opacity :0.8});
            var txt = paper.text(x+duree/2, y+20, data.name).attr({"font-size": 12});  

            
            //box.content.popup = paper.g.popup(x+duree/2, y-1, data.description, 2).hide();
          var p = paper.pointer(x+duree/2, y+8, pointerHeight, data.position, data.keyword, textPointerX);
          
        }else{
            box.content.rect = paper.roundedRect(x, y, duree, w, 0, 0, 5, 5).attr({fill: data.color, stroke: "none", opacity :0.8});
            paper.text(x+duree/2, y+10, data.name.split('\n')[0]).attr({"font-size": 12});
            paper.text(x+duree/2, y+25, data.name.split('\n')[1]).attr({"font-size": 11, fill:"dimgray"});
            
            //TODO test si la popup deborde ou sinon faire deborder -> jQuery box
            //var dir = (data.config == undefined || data.config.popup_dir == undefined) ? 0 : data.config.popup_dir;
            
            if(data.id=="Durzy")
                box.content.popup = paper.g.popup(x+duree+1, y+20, data.description, 3).hide();
            else
                box.content.popup = paper.g.popup(x+duree/2, y+40+2, data.description, 0).hide();
        }

        if(data.flag) paper.image("http://www.remy-mellet.com/perso/css/flag_"+data.flag+"_24.png", x+duree-10, y-13, 24, 24).rotate(45);
        box.toFront();
        //box.hover(hover_in, hover_out);
        plan1.push(box.content.popup);
    }
    

    