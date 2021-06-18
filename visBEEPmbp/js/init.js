/// Initialises everything before the app is started
function init()
{
	visjson = JSON.parse(jsonstr);
	
	menu_structure();     // Initialises the menu structure on the left
		
	init_page();          // Initialises HTML elements on the page

	init_canvas();        // Initialises canvases for plotting results
	
	init_mouse_key();     // Initialises input operations using the mouse and keys
	
	init_variables();     // Initialises various parameters
	
	init_clickable_map(); // Initialises clickable maps
	
	initdone = 1;
	
	setsize();
}


/// Intialises the HTML elements on the page
function init_page()
{
	ById("container").style.visibility = "hidden";          // Sets up elements on page
	ById("container").style.height = "0px";
	ById("main").style.visibility = "visible";		
	ById("bod").style.backgroundColor = "#ddddff";
		
	logopic = new Image();                                  // Loads the logo picture
	logopic.src = "pics/logosmall3.png";
	logopic.onload = function(){ buttonplot();};	
}


/// Initialises canvas objects for plotting the results 
function init_canvas()
{
	myc = ById("myCanvas");
	maincv = myc.getContext("2d");
	cv = maincv;

	graphcan = document.createElement('canvas');
  graphcv = graphcan.getContext('2d');

	resultcan = document.createElement('canvas');
  resultcv = resultcan.getContext('2d');	
}


/// Initialises global variables 
function init_variables()
{
	nticksize = 0;
	for(sh = -10; sh <= 10; sh++){
		for(i = 0; i < 3; i++){   
			f = tickpo[i];
			if(sh < 0){ for(j = 0; j < -sh; j++) f /= 10;}
			else{ for(j = 0; j < sh; j++) f *= 10;}
			ticksize[nticksize] = f; nticksize++;
		}
	}
	
	zoomfac = 1; zoomx = 0; zoomy = 0;
}


/// Based on the plots on visjson, this constructs the menus on the left hand edge
function menu_structure()
{
	for(i = 0; i < visjson.plots.length; i++){
		var vis = visjson.plots[i];
		tab = vis.tab; tab2 = vis.tab2; tab3 = vis.tab3;
	
		var j = 0; while(j < tree.length && tab != tree[j].name) j++;
		if(j == tree.length){
			tree.push({ name:tab, child:[]});
		}
		
		var j2 = 0; while(j2 < tree[j].child.length && tab2 != tree[j].child[j2].name) j2++;
		if(j2 == tree[j].child.length ){
			tree[j].child.push({ name:tab2, child2:[], frac:0, y:0});
		}

		var j3 = 0; while(j3 < tree[j].child[j2].child2.length && tab3 != tree[j].child[j2].child2[j3].name) j3++;
		if(j3 == tree[j].child[j2].child2.length){
			tree[j].child[j2].child2.push({ name:tab3, plot:i});
		}
		else emsg("Problem");
	}
	
	for(i = 0; i < tree.length; i++){ 
		pagesub[i] = 0; pagesubsub[i]=[]; 
		for(j = 0; j < tree[i].child.length; j++){
			pagesubsub[i][j] = 0;
			tree[i].child[j].frac = submax/tree[i].child[j].child2.length;
		}
	}
}


/// This sets up listeners for the mouse and keys
function init_mouse_key()
{
	a = ById("main");
	
	a.addEventListener('mousemove', function(evt) {
		var mousePos = getMousePos(myc, evt);
		mousemove(mousePos.x,mousePos.y);
	}, false);

	a.addEventListener('mousedown', function(evt) {
		var mousePos = getMousePos(myc, evt);
		mdown(mousePos.x,mousePos.y); 
	}, false);

	a.addEventListener ("mouseout", function(evt) {
		drag = 0; 
		if(addtransmode == 1) deletetransmode();
		addcompmode = 0; addsourcemode = 0;
		buttoninit();
	}, false);
	
	a.addEventListener('mouseup', function(evt) {
		var mousePos = getMousePos(myc, evt); 
		ctrlkey = evt.ctrlKey;
		if(evt.altKey) location.reload(true);
		mup(mousePos.x,mousePos.y);
	}, false);

	document.onkeydown = checkKey;
}


/// Determines what is done when a key is pressed
function checkKey(e) 
{
  e = e || window.event;
	if (e.keyCode == '37'){
		playtime--; if(playtime < 0) playtime = 0;
	}
	if (e.keyCode == '39'){
		playtime++; if(playtime > playtimemax-1) playtime = playtimemax-1;
	}	
	plot_results();
	buttonplot();
}


/// Dynamically sets the size of page objects (activates when the window is resized)
function setsize()                                         
{
	if(initdone == 0) return;
	
	var w = window.innerWidth;
	var h = window.innerHeight;

	height = h-50; if(height < 400) height = 400;
	width = Math.floor(menux+(height*aspect_ratio));
	
	if(width > w){
		height = Math.floor(height*(w-40)/width); if(height < 400) height = 400;
		width = Math.floor(menux+(height*aspect_ratio));
	}
	
	mar = Math.floor((w-width)/2); if(mar < 0) mar = 0;
	
	ById("main").style.marginLeft = mar+"px";
	ById("main").style.width = width+"px";
	
	graphcan.width = width;
  graphcan.height = height;
 
  resultcan.width = width;
  resultcan.height = height;
	
	myc.width = width;
  myc.height = height;

  canw = width; canh = height;

	resdx = Math.floor((width - menux)*0.6);
	resdy = height-20; 
	
	mapdx = Math.floor(height*map_ratio);
	mapdy = height;
	
	buttoninit();
	widthold = width; heightold = height;
}

function getMousePos(canvas, evt)                         // Gets the mouse position
{
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

function ById(a){ return document.getElementById(a);}     // Gets an element in DOM

function mdown(xx,yy)                                     // Fires if mouse button is clicked down
{
   var d = new Date(); timedown = d.getTime();
	
	if(timedown-timeup < 300 && timeclick < 300){ mousedblclick(); timedown = 0; return;}
	
	drag = 0; 
	
	if(plottype == "map" && canbut != -1 && over != -1 && buttype[over] == CANVASBUT){
		drag = 1; mxst = mx; myst = my;
	}
	
	switch(buttype[over]){
	case MENUSLIDEBUT:
		var ob = tree[page].child[pagesub[page]];

		if(my >= sliy1 && my <= sliy2){ mxst = mx; myst = my; menuslideyst = ob.y; menuslideh = butdy[over]; drag = 2;}
		else{
			if(my > sliy2){ ob.y += 0.9*ob.frac; if(ob.y > 1-ob.frac) ob.y = 1-ob.frac; buttoninit();}
			else{
				if(my < sliy1){ ob.y -= 0.9*ob.frac; if(ob.y < 0) ob.y = 0; buttoninit();}
			}
		}
		break;	
		
	case SLIDEBUT:
		if(my >= slidey1 && my <= slidey2){ mxst = mx; myst = my; menuslideyst = slidey; menuslideh = butdy[over]; drag = 3;}
		else{
			if(my > slidey2){ slidey += 0.9*slidefrac; if(slidey > 1-slidefrac) slidey = 1-slidefrac; buttoninit();}
			else{
				if(my < slidey1){ slidey -= 0.9*slidefrac; if(slidey < 0) ob.y = 0; buttoninit();}
			}
		}
		break;	
	}
			
	/*


	if(over >= 0){
		switch(buttype[over]){
		case GDROPSELBUT:
			if(gdropslider == 1){
				gdropmyst = my; drag = 101; gdropfracst = gdropfrac;
			}
			break;
			
	    case XSLIDEBUT:
			i = over;
			x = butx[i]; dx = butdx[i];
			x1 = x+tablexfr*dx; x2 = x+dx*(tablexfr+tablexfrac);
			if(mx >= x1 && mx <= x2){ mxst = mx; myst = my; tablexfrst = tablexfr; drag = 1;}
			else{
				if(mx > x2){ tablexfr += 0.9*tablexfrac; if(tablexfr > 1-tablexfrac) tablexfr = 1-tablexfrac; buttoninit();}
				else{
					if(mx < x1){ tablexfr -= 0.9*tablexfrac; if(tablexfr < 0) tablexfr = 0; buttoninit();}
				}
			}
			break;
		
        case YSLIDEBUT:
			i = over;
			if(my >= sliy1 && my <= sliy2){ mxst = mx; myst = my; tableyfrst = tableyfr; coheight = butdy[over]; drag = 2;}
			else{
				if(my > sliy2){ tableyfr += 0.9*tableyfrac; if(tableyfr > 1-tableyfrac) tableyfr = 1-tableyfrac; buttoninit();}
				else{
					if(my < sliy1){ tableyfr -= 0.9*tableyfrac; if(tableyfr < 0) tableyfr = 0; buttoninit();}
				}
			}
			break;	
			
		case CANVASBUT:
			if(canover >= 0){
				switch(canbuttype[canover]){
				case COMPBUT:
					dragval = canbutval[canover];
					dragval2 = canbutval2[canover];
					mxst = mx; myst = my; mxlast = mx; mylast = my;
					drag = 3;
					break;
				
				case TRANSPBUT:
					dragval = canbutval[canover];
					dragval2 = canbutval2[canover];
					mxst = mx; myst = my; mxlast = mx; mylast = my;
					drag = 5;
					break;
					
				case TRANSPLBUT:
					dragval = canbutval[canover];
					dragval2 = canbutval2[canover];
					mxst = mx; myst = my;
					drag = 6;
					break;
					
				case CLASSVALBUT:
					mxst = mx; myst = my; drag = 8;
					dragcol = cla[canbutval[canover]].comp[canbutval2[canover]].col;
					dragval = canbutval[canover];
					dragtext = canbuttext[canover]; dragx = canbutx[canover]; dragy = canbuty[canover]; dragdx = canbutdx[canover]; dragdy = canbutdy[canover];
					break;
					
				case TABLECOLBUT: case TABLEHEADBUT:
					mxst = butx[over]; myst = buty[over]; 
					dragval = canbutval[canover]; drag = 9;
					break;
					
					
				case SLIDERBUT:
					mxst = mx; myst = my; kdest = kde; drag = 10;
					break;
				}
			}
			else{
				if(arrow == 2){ 
					if(xaxisauto == 1){ xaxisfixmin = axxmin; xaxisfixmax = axxmax; xaxisauto = 0;}
					mxst = mx; mxlast = mx; myst = my; mylast = my;
					drag = 11;
				}
				if(arrow == 1){ mxst = mx; myst = my; mxlast = mx; mylast = my; drag = 4;}
			}
			break;
		}
	}
	
	if(drag > 0 && selectbub >= 0) buboff(1);
	*/
}

function mup(xx,yy)                                        // Fires when mouse button is released
{
    var i, j, time;
	
	timeup = (new Date()).getTime();
	timeclick  = timeup-timedown; 
	if(drag != 0){ drag = 0; if(timeclick > 200) buttoninit();}
	if(timeclick < 500){ mouseclick(xx,yy);}
}

function pr(te){ console.log(te);}                         // Prints to the console
