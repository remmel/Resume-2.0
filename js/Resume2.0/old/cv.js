var json_cv;
var offset_y = 200;

//start date, end date
var td;
window.onload = function () {

    
    
    var paper = Raphael("canvas", 900, 480);
    var btn = document.getElementById("run");
    var cd = document.getElementById("code");
    var base_year = 2005;
    
    
    
    //TODO json_configuration
    
    function timeToPixel(strDate){
        var arrayDate = strDate.split('-');
        var year = parseInt(arrayDate[0],10), month = parseInt(arrayDate[1],10), day = parseInt(arrayDate[2],10);
        var p=(year-base_year)*120;
        p+=(month-1)*10;
        p+=(day-1)*(12.0/30);
        return p;
    }
    
    function dureeInPixel(date1, date2){
        return timeToPixel(date2)-timeToPixel(date1);
    }
    
    /*var hover_in=function(){
        this.content.popup.stop();
        if(this.content.rect) this.content.rect.attr({opacity: 1, scale: 1, stroke:"#000", "stroke-width":2});
        this.content.popup.show();
        this.content.popup.attr({opacity: 1});
    };
    
    var hover_out=function(){
        if(this.content.rect) this.content.rect.animate({opacity: 0.5, scale: 1, stroke: "none"}, 100);
        this.content.popup.animate({opacity: 0}, 250, function(){
            this.hide();
        });
    };*/
    
    
    paper.clear();
    
    
   
    
    drawYear(paper);
    

    
    for(var i in json_cv.education){
        drawItem(paper, json_cv.education[i], TypeEnum.EDUCATION);
    }

    for(var i in json_cv.experience){
        drawItem(paper, json_cv.experience[i], TypeEnum.EXPERIENCE);
    }
    
    /*for(var i in json_cv.project){
        var data = json_cv.project[i];
        var x = timeToPixel(data.date);
        
        var box = paper.g.star(x, 260, 10).attr({fill: 'yellow'});
        box.content = [];
        box.content.popup = paper.g.popup(x, 260+2, data.popup, 0).hide();
        box.hover(hover_in, hover_out);
    }
    
    for(var i in plan1){
        plan1[i].toFront();   
    }*/
    
    
    
    
    
    
};