 (function() {
   /**
    * Create a rounded corner rectangle by extanding RaphaelJs functionality
    * @params x, y , width, height, upper-left corner rounded, upper-right, lower-right, lower-left
    * @author Remy Mellet
    * @version 1.0 2011-09-17
    */
   Raphael.fn.roundedRect = function(x, y, w, h, r1, r2, r3, r4) {
       var array = [];
       array = array.concat(["M", x, r1 + y, "Q", x, y, x + r1, y]); //A
       array = array.concat(["L", x + w - r2, y, "Q", x + w, y, x + w, y + r2]); //B
       array = array.concat(["L", x + w, y + h - r3, "Q", x + w, y + h, x + w - r3, y + h]); //C
       array = array.concat(["L", x + r4, y + h, "Q", x, y + h, x, y + h - r4, "Z"]); //D
       return this.path(array);
   };

   /**
    * Create a basic triangle by extanding RaphaelJs functionality
    * @params x, y , width, height
    * @author Remy Mellet
    * @version 1.0 2011-09-17
    */
   Raphael.fn.triangle = function(x, y, w, h) {
       var array = [];
       array = array.concat(["M", x, y - h / 2, "l", 0, h, "l", w, -h / 2, "Z"]);
       return this.path(array);
   };

   /**
    * circle_x, circle_x //x+duree/2, y+8
    * offset_x_text
    * - undefined or 0, text centrered
    * - >0 text align end/right + length from right edge
    * - <0 text align start/left +length from left edge
    */
   Raphael.fn.pointer = function(x, y, h, title, content, offset_x_text) {
       offset_x_text = offset_x_text?offset_x_text:0;
       var align = offset_x_text>0?"end":offset_x_text<0?"start":"end";

       this.circle(x, y, 3).attr({
           fill: "black",
           stroke: "none"
       });
       this.path(["M", x, y, "l", 0, -h + 6]);

       var t = this.text(x + offset_x_text, y - h - 15, title).attr({
           "font-size": 14,
           "text-anchor": align
       });
       this.rect(t.getBBox().x, t.getBBox().y, t.getBBox().width, t.getBBox().height).attr({
           fill: "white",
           stroke: "none"
       });
       t.toFront();
       t = this.text(x + offset_x_text, y - h, content).attr({
           "font-size": 11,
           "text-anchor": align,
           fill: "gray"
       });
       this.rect(t.getBBox().x, t.getBBox().y, t.getBBox().width, t.getBBox().height).attr({
           fill: "white",
           stroke: "none"
       });
       t.toFront();
   };

   /*Raphael.fn.textWithBackground = function(x, y, content){
      return {
         var t = this.text(x,y, content);
         this.rect(t.getBBox().x,t.getBBox().y, t.getBBox().width, t.getBBox().height).attr({fill: "black", stroke: "none"});
         t.toFront();
      };
   };*/
   
   
    var paper;
    var divi = 2.7; //TODO calculate it
    var config = {
        start_date: new Date('2005-05-01'),
        end_date: new Date(),
        color_odd_year: "#e5e5e5",
        color_even_year: "#bfbfbf",
        offset_y: 130
        // new Date(2011, 7-1,1)
    };
    
    var TypeEnum = {
        EXPERIENCE: 0,
        EDUCATION: 1
    };

    Resume = function(json) {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        paper = Raphael.apply(this, args);

        drawYear(paper);
        for (var i in json.education) {
            drawItem(json.education[i], TypeEnum.EDUCATION);
        }

        for (var i in json.experience) {
            drawItem(json.experience[i], TypeEnum.EXPERIENCE);
        }

        for (var i in json.project) {
            drawProject(json.project[i]);
        }

          about();
    };
    Resume.version = "1.0";

    
    /**
     * Calculate the number of days between 2 dates. DateA < dateB.
     */
    function numberOfDays(dateB, dateA) {
        this.MILLISEC_A_DAY = 1000 * 60 * 60 * 24;
        return ((dateB - dateA) / MILLISEC_A_DAY);
    }

    /**
     * Draw a banner with years
     * TODO only full year? & end_date currently = today
     */
    function drawYear() {
        var startDate = config.start_date;
        var endDate = config.end_date;
        var startYear = startDate.getFullYear();
        var endYear = endDate.getFullYear();
        var color;
        for (var year = startYear; year <= endYear; year++) {
            var i = year - startYear;
            color = (i % 2) ? config.color_even_year: config.color_odd_year;
            var a = (year == startYear) ? startDate: new Date(year, 0, 1);
            var b = (year == endYear) ? endDate: new Date(year + 1, 0, 1);
            var width = (year == startYear || year == endYear) ? numberOfDays(b, a) / divi: 365 / divi;
            var x = numberOfDays(a, startDate) / divi;
            paper.rect(x, config.offset_y, width, 20).attr({
                fill: color,
                stroke: "none"
            });
            var text_x = (year == endYear) ? x + 365 / divi / 2: x + width - 365 / divi / 2;
            paper.text(text_x, config.offset_y + 10, year).attr({
                "font-size": 12
            });
        }

        var triangle_x = numberOfDays(endDate, startDate) / divi;
        paper.triangle(triangle_x, config.offset_y + 10, 20, 40).attr({
            fill: color,
            stroke: "none"
        });
    };

    /**
     * Fn called when the mouse is hover the box
     */
    var hover_in = function() {
        this.content.popup.stop();
        this.content.popup.toFront();
        if (this.content.rect) this.content.rect.attr({
            opacity: 1,
            scale: 1,
            stroke: "#000",
            "stroke-width": 2
        });
        this.content.popup.show();
        this.content.popup.attr({
            opacity: 1
        });
    };

    /**
     * Fn called when the mouse is hover the box
     */
    var hover_out = function() {
        if (this.content.rect) this.content.rect.animate({
            opacity: 0.8,
            scale: 1,
            stroke: "none"
        },
        100);
        this.content.popup.animate({
            opacity: 0
        },
        250,
        function() {
            this.hide();
        });
    };

    /**
     * Draw a period (between 2 date. experience or education)
     */
    function drawItem(data, type) {
        data.config = (data.config) ? data.config: {};
        var offsetDate = config.start_date;
        var startDate = new Date(data.start_date);
        var endDate = new Date(data.end_date);

        var x = numberOfDays(startDate, offsetDate) / divi;
        var duree = numberOfDays(endDate, startDate) / divi;


        y = (type === TypeEnum.EXPERIENCE) ? config.offset_y - 30: 20 + config.offset_y;
        w = (type === TypeEnum.EXPERIENCE) ? 30: 40;

        if (data.id == "UPM") y += 40;

        var box = paper.roundedRect(x, y, duree, w, 0, 0, 5, 5).attr({
            opacity: 0,
            fill: 'black',
            stroke: "none"
        });
        box.content = [];

        if (type === TypeEnum.EXPERIENCE) {
            box.content.rect = paper.roundedRect(x, y, duree, 30, 5, 5, 0, 0).attr({
                fill: data.config.color,
                stroke: "none",
                opacity: 0.8
            });
            var txt = paper.text(x + duree / 2, y + 20, data.name).attr({
                "font-size": 12
            });
            var pointerHeight = (!data.config.pointer_h) ? 40: data.config.pointer_h;
            var textPointerX = (!data.config.pointer_text_x) ? 10: data.config.pointer_text_x;
            paper.pointer(x + duree / 2, y + 8, pointerHeight, data.position, data.keyword, textPointerX);
        } else {
            box.content.rect = paper.roundedRect(x, y, duree, w, 0, 0, 5, 5).attr({
                fill: data.config.color,
                stroke: "none",
                opacity: 0.8
            });
            paper.text(x + duree / 2, y + 10, data.name.split('\n')[0]).attr({
                "font-size": 12
            });
            paper.text(x + duree / 2, y + 25, data.name.split('\n')[1]).attr({
                "font-size": 11,
                fill: "dimgray"
            });
        }

        if (data.config && data.config.flag) paper.image("http://www.remy-mellet.com/perso/css/flag_" + data.config.flag + "_24.png", x + duree - 10, y - 13, 24, 24).rotate(45);
        box.toFront();
        box.hover(hover_in, hover_out);

        //popup
        var dir = (type === TypeEnum.EXPERIENCE) ? 2: 0;
        dir = (!data.config || !data.config.popup_dir) ? dir: data.config.popup_dir;
        var x_popup = (dir == 3) ? x + duree + 1: x + duree / 2;
        var y_popup = (dir == 2) ? y - 1: ((dir === 0) ? y + 41: y + 20);
        box.content.popup = paper.g.popup(x_popup, y_popup, data.description, dir).hide();
    }

    /**
     * Draw a moment (a date)
     */
    function drawProject(data) {
        var date = new Date(data.date);
        var x = numberOfDays(date, config.start_date) / divi;

        var box = paper.g.star(x, config. offset_y+60, 10).attr({
            fill: 'yellow'
        });
        box.content = [];
        box.content.popup = paper.g.popup(x, config.offset_y+60 + 2, data.popup, 0).hide();
        box.hover(hover_in, hover_out);
    }

	//TODO animation + link hire him
    function about(){
	paper.circle(920, 220, 8).attr({ fill: 'black' });
	paper.text(920,220,"?").attr({fill: 'white', "font-size": 14, "font-weight": 300});
	var box=paper.circle(920, 220, 8).attr({  opacity: 0, fill:'yellow'});
	box.content = [];
	box.content.popup = paper.g.popup(920-8, 220, "Resume 2.0 JS developed by Remy Mellet.", 1).hide();
        box.hover(hover_in, hover_out);
    }
})();

