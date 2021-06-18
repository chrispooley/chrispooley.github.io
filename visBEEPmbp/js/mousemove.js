function mousemove(x,y)                                   // Fires when the mouse moves
{
	dragged = 1;
	mx = x; my = y;

	switch(drag){  
	case 1:  // move map
		zoomx += (mxst-mx)/(zoomfac*mapdy); mxst = mx;
		zoomy -= (myst-my)/(zoomfac*mapdy); myst = my;
		plot_results(); buttonplot();
		break;
	
	case 2: // menu slider
		var ob = tree[page].child[pagesub[page]];
		ob.y = menuslideyst + (my-myst)/menuslideh;
		if(ob.y > 1-ob.frac) ob.y = 1-ob.frac; if(ob.y < 0) ob.y = 0;
		buttoninit();
		break;
		
	case 3: // menu slider
		slidey = menuslideyst + (my-myst)/menuslideh;
		if(slidey > 1-slidefrac) slidey = 1-slidefrac; if(slidey < 0) slidey = 0;
		plot_results(); buttonplot();
		break;
	}
	
	var overnew = -1;
	canbut = -1;
	for(i = nbut-1; i >= 0; i--){
		if(buttype[i] == CANVASBUT) canbut = i;
		if(butac[i] >= 0 && mx >= butx[i] && mx <= butx[i]+butdx[i] && my >= buty[i] && my <= buty[i]+butdy[i]){
			overnew = i; break;
		}
	}

	if(canbut != -1){
		canovernew = -1;
		if(overnew == over && over == canbut){
			xx =  mx-butx[over]; yy = my-buty[over];
			canmx = xx; canmy = yy;
			for(i = ncanbut-1; i >= 0; i--){
				if(canbutac[i] >= 0 && xx >= canbutx[i] && xx < canbutx[i]+canbutdx[i] &&
										           yy >= canbuty[i] && yy < canbuty[i]+canbutdy[i]){
					canovernew = i;
					break;
				}
			}
		}
	}	
	

	if(canbut != -1){
		if(canovernew != canover && over != -1 && buttype[over] == CANVASBUT){
			canover = canovernew;
			butplot(canbut,-1);
		}
	}

	var areaovernew = -1;
	if(canbut != -1 && over != -1 && buttype[over] == CANVASBUT && plottype == "map"){
		var mapx = zoomx + (mx-menux)/(mapdy*zoomfac);
		var mapy = zoomy + (mapdy - (my))/(mapdy*zoomfac);
		
		var ra = visjson.click_bound_range;
		for(c = 0; c < ra.length; c++){
			if(mapx > ra[c].xmin && mapx < ra[c].xmax && mapy > ra[c].ymin && mapy < ra[c].ymax){		
				var inter = visjson.inter[c][Math.floor(mapy*clickline)];
				if(inter){
					num = 0; for(k = 0; k < inter.length; k++){ if(inter[k] < mapx) num++;}
					if(num%2 == 1) areaovernew = c;
				}
			}			
		}
	}
	
	if(areaovernew != areaover){
		areaover = areaovernew;
		plot_results();
		buttonplot();
	}
	
	if(overnew != over){
		if(overx != -1){ cvover.clearRect(overx-1,overy-1,overdx+2,overdy+2); overx = -1;}
	
		overold = over; over = overnew;
		
		if(overold >= 0 && !(buttype[overold] == LOADBUT && exporton > 0) && buttype[overold] != HELPBACKBUT){
			butplot(overold,-1);
		}
		if(overnew >= 0 && !(buttype[overnew] == LOADBUT && exporton > 0) && buttype[overnew] != HELPBACKBUT){
			butplot(overnew,-1);
		}
	}

	arrownew = 0;
	if(over == canbut && plottype == "map" && canover == -1 && areaover == -1) arrownew = 1;
	if(drag != 0) arrownew = 1;
	
	if(arrownew != arrow){                                              // Sets the cursor (i.e. a hand is used for grabbing)
		arrow = arrownew;
		if(arrow > 0) document.getElementById("bod").style.cursor = "grab"; 
		else document.getElementById("bod").style.cursor = "";
	}
}
