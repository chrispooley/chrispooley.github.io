function generate_plots()
{
	plot = tree[page].child[pagesub[page]].child2[pagesubsub[page][pagesub[page]]].plot;	
	var vis = visjson.plots[plot];
	
	//pr(vis.type+" type");
	
	switch(vis.type){
	case "OP_ANIM_MAP": get_colourbar(vis); break;
	case "OP_MIXING_MAP": case "OP_AGE_MATRIX":  break;
	case "OP_CPU": get_logaxrange(vis); break;
	default: get_axrange(vis); break;
	}

	switch(vis.type){
	case "OP_ANIM_MAP": case "OP_MIXING_MAP":
		mapframe(vis);
		break;
	
	case "OP_AGE_MATRIX":
		matrixframe(menux+10,10,vis);
		break;
	
	case "OP_SPLINE": case "OP_GRAPH": case "OP_GENERATION": case "OP_ME": case "OP_LOG_GENERATION":
		graphframe(menux+10,10,40+w,60,20,40,w,vis.xaxis,vis.yaxis);
		break;
		
	case "OP_CPU":
		loggraphframe(menux+10,10,40+w,60,20,40,w,vis.xaxis,vis.yaxis);
		break;
		
	case "OP_GRAPH_MARGINAL":	
		//graphframe(menux+10,10,40+w,60,20,40,w,vis.xaxis,vis.yaxis);
		//histogram_frame(menux+10,10,40+w,60,20,40,w,vis.xaxis,vis.yaxis);
	/*
		gnuplot << "set autoscale" << endl;
		gnuplot << "set yrange [0:]" << endl;
		gnuplot << "set boxwidth 0.5" << endl;
		gnuplot << "set style fill solid" << endl;
		{
			auto col = oppl.line[0].ycol;
			gnuplot << "plot '" << oppl.line[0].file << "' using ($1+0.5):" << col << ":xtic(2) with boxes  notitle, ";
			if(details.mode != SIM){
				gnuplot << "'" << oppl.line[0].file << "' using ($1+0.5):" << col << ":" << col+1 << ":" << col+2;
				gnuplot << " with errorbars lt 1  lc rgb '#000000' lw 3 ps 2 title '" << label(oppl.line[0].name) << "'";
			}
			if(oppl.line.size() > 1){
				gnuplot << ",'" << oppl.line[1].file << "' using ($1+0.5):" << oppl.line[1].ycol 
									<< " with point lt 1 lc rgb '#0000ff' lw 5 pt 2 ps 2 title '" <<  label(oppl.line[1].name) << "'";
			}
		}
		*/
		break;
		
	case "OP_MARGINAL":	
		histogram_frame(menux+10,10,40+w,60,20,40,w,vis.xaxis,vis.yaxis,vis.line[0].label);
		break;
		
	case "OP_PARAMDIST":
		paramdist_frame(menux+10,10,40,60,20,40,vis.xaxis,vis.yaxis);
		break;

	
	
	/*
		if(oppl.min != UNSET) gnuplot << "set yrange [" << oppl.min << ":" << oppl.max << "]" << endl;

		gnuplot << "plot ";
		for(auto j = 0u; j < oppl.line.size(); j++){
			const auto &line = oppl.line[j];
			if(j != 0) gnuplot << ", ";
			
			if(line.name == "True"){
				gnuplot << line.file;
			}
			else{
				gnuplot << "'" << line.file << "' using " << line.xcol << ":" << line.ycol;
			}
			
			gnuplot << " with lines ls " << line.style << " ";
			if(line.name == "" || line.name == "95% CI min" || line.name == "95% CI max") gnuplot << "notitle"; 
			else gnuplot << "title '" << label(line.name) << "'";
		}
		*/
		
		
		
	//case "OP_LOG_GENERATION":
	/*
		gnuplot << "set logscale y" << endl;
			
		if(oppl.min != UNSET) gnuplot << "set yrange [" << oppl.min << ":" << oppl.max << "]" << endl;

		gnuplot << "plot ";
		for(auto j = 0u; j < oppl.line.size(); j++){
			const auto &line = oppl.line[j];
			if(j != 0) gnuplot << ", ";
			gnuplot << "'" << line.file << "' using " << line.xcol << ":" << line.ycol;
			gnuplot << " with lines ls " << line.style << " ";
			if(line.name == "EF cut-off") gnuplot << "notitle"; 
			else gnuplot << "title '" << label(line.name) << "'";
		}
		gnuplot << endl;
		
		gnuplot << "unset logscale y" << endl;
		*/
		//break;
		
	//case "OP_CPU":
	/*
		gnuplot << "set logscale y" << endl;
		gnuplot << "set logscale x" << endl;
			
		gnuplot << "plot ";
		for(auto j = 0u; j < oppl.line.size(); j++){
			const auto &line = oppl.line[j];
			if(j != 0) gnuplot << ", ";
			gnuplot << "'" << line.file << "' using " << line.xcol << ":" << line.ycol;
			gnuplot << " with lines ls " << line.style << " ";
			if(line.name == "EF cut-off") gnuplot << "notitle"; 
			else gnuplot << "title '" << label(line.name) << "'";
		}
		gnuplot << endl;
		
		gnuplot << "unset logscale y" << endl;
		gnuplot << "unset logscale x" << endl;
		*/
	//	break;
		
	case "OP_TRACE":
	/*
		if(multiplot == UNSET){ multiplot = 0; gnuplot << "set multiplot layout 2,1 rowsfirst" << endl;}
		multiplot++;
		
		gnuplot << "set size ratio 0.4" << endl;
		gnuplot << "plot ";
		for(auto j = 0u; j < oppl.line.size(); j++){
			const auto &line = oppl.line[j];
			if(j != 0) gnuplot << ", ";
			if(line.name == "True"){
				gnuplot << line.file;
			}
			else{
				gnuplot << "'" << line.file << "' using " << line.xcol << ":" << line.ycol;
			}
			gnuplot << " with lines ls " << line.style << " ";
			gnuplot << "title '" << label(line.name) << "'";
		}
		gnuplot << endl;
		gnuplot << "set size noratio" << endl;
		*/
		break;
		
	//case "OP_ME":
	
	
	//	break;
	}
	
	plot_results();
		 
	x = menux+resdx+30; 
	wid = width-x-30;
	
	sourcey = height-30;

	if(sourceon == 1){
		var source = vis.source.replace(/\*/g,"'");
		var spl = source.split("|");
	
		var shift=[];
		var yy = 20;
		for(j = 0; j < spl.length-1; j++){
			alignparagraph(spl[j],wid,SOURCEFONT);
			shift.push(yy); yy += nlines*13;
		}
		yy -= 13;
		sourcey -= yy;
			
		for(j = 0; j < spl.length; j++){
			addbutton(spl[j],x,sourcey+shift[j],wid,20,-1,SOURCEFILEBUT,-1,-1);
		}
	}
	addbutton("SOURCE FILES",x,sourcey,wid,20,SOURCEBUT,SOURCEBUT,plot,-1);

	var topline;
		
	switch(vis.type){
	case "OP_ANIM_MAP":
		topline = sourcey - 40;
		
		addbutton("",x,topline,wid-10,20,-1,COLOURSCALEBUT,-1,-1);
		break;
		
	case "OP_MIXING_MAP":	case "OP_ME": case "OP_AGE_MATRIX":	case "OP_MARGINAL":	
		topline = sourcey - 40;
		break;
		
	default:
		var list=[];
		for(li = 0; li < vis.line.length; li++){
			if(vis.line[li].name && vis.line[li].name != "" &&
   			 vis.line[li].name != "95% CI min"& vis.line[li].name != "95% CI max"){
				list.push(li);
			}
		}
		topline = sourcey - list.length*20-50;
	
		var y = topline; 
		if(list.length > 0){
			for(i = 0; i < list.length; i++){
				li = list[i];
				if(vis.line[li].name){
					addbutton(vis.line[li].name,x+20,y,wid,0,-1,KEYBUT,plot,li); y += 20;
				}
			}		
		}
		break;
	}
	
	y = 30;
	
	var sp = vis.fulldesc.split(":");
	addbutton(sp[0],x,y,wid,0,-1,TITLEBUT,-1,-1); y += 24;
	
	topline -= 20;
	dy = topline-y;
	dy = Math.floor(dy/lineheight)*lineheight;

	addbutton(sp[1].substr(1),x,y,wid,dy,-1,SLIDEPARAGRAPHBUT,-1,-1);

	alignparagraph(sp[1].substr(1),wid);
		
	nlines_disp = Math.floor(dy/lineheight);
	slidefrac = nlines_disp/nlines; 
	if(slidefrac < 1){	
		addbutton("",x+wid,y,10,dy,SLIDEBUT,SLIDEBUT,-1,-1);
	}
}

function plot_results()
{
	plot = tree[page].child[pagesub[page]].child2[pagesubsub[page][pagesub[page]]].plot;	
	var vis = visjson.plots[plot];
	
	switch(vis.type){
	case "OP_ANIM_MAP": drawmap(vis);	break;
	case "OP_MIXING_MAP": drawmixingmap(vis); break;
	case "OP_AGE_MATRIX": drawmatrix(vis); break;
	case "OP_SPLINE": case "OP_GRAPH": case "OP_GENERATION": case "OP_LOG_GENERATION": drawlines(vis); break;
	case "OP_CPU": drawloglines(vis); break;
	case "OP_ME":	drawME(vis); break;
	case "OP_MARGINAL": drawmarginal(vis); break;
	case "OP_PARAMDIST": drawparamdist(vis); break;
	}
}

function get_ax_bound(vis)
{
	axxmin = large; axxmax = -large;
	axymin = large; axymax = -large;
	for(li = 0; li < vis.line.length; li++){
		var visli =  vis.line[li];
		var xcol = visli.xcol;
		if(xcol){
			for(i = 0; i < xcol.length; i++){
				if(xcol[i] < axxmin) axxmin = xcol[i];
				if(xcol[i] > axxmax) axxmax = xcol[i];
			}
		}
		
		var ycol = visli.ycol;
		if(ycol){
			for(i = 0; i < ycol.length; i++){
				if(ycol[i] < axymin) axymin = ycol[i];
				if(ycol[i] > axymax) axymax = ycol[i];
			}
		}
		
		var ebmin = visli.errbarmin;
		var ebmax = visli.errbarmax;
		if(ebmax){
			for(i = 0; i < ebmin.length; i++){
				if(ebmin[i] < axymin) axymin = ebmin[i];
				if(ebmax[i] > axymax) axymax = ebmax[i];
			}
		}
	}
}

function get_axrange(vis)
{
	get_ax_bound(vis)
	
	d = 0.1*(axymax - axymin);
	
	if(axymax > -d && axymax <= 0) axymax = 0; else axymax += d;
	
	if(axymin < d && axymin >= 0) axymin = 0; else axymin -= d;
	
	if(axymin >= 0 && axymax >= 0){
		if(axymin < 0.5*axymax) axymin = 0;
	}
	
	d = 0.05*(axxmax - axxmin);
	
	if(axxmax > -d && axxmax <= 0) axxmax = 0; else axxmax += d;
	
	if(axxmin < d && axxmin >= 0) axxmin = 0; else axxmin -= d;
	
	
	if(axxmin >= 0 && axxmax >= 0){
		if(axxmin < 0.3*axxmax) axxmin = 0;
	}
	
	
	if(axymin == axymax){ axymin = 0; axymax *= 1.2;}
	
	setxtics();
	w = setytics();   
}

function get_logaxrange(vis)
{
	get_ax_bound(vis)
	setlogxtics();
	pr("r");
	pr(tickx);
	w = setlogytics();   
}

function get_colourbar(vis)
{
	axymin = large; axymax = -large;
	for(t = 0; t < vis.array.length; t++){
		for(c = 0; c < vis.array[t].length; c++){
			val = vis.array[t][c];
			if(val < axymin) axymin = val;
			if(val > axymax) axymax = val;
		}
	}

	var shift = 0;
	//if(axymin < 0.1*axymax) shift = 0.1*axymax - axymin
	if(axymin == 0) shift = 1;
	
	var light = 220;
	
	var collist=[];
	
	if(vis.yaxis == "Colour"){
		if(axymin < 1) collist.push({R:0, G:255, B:0, val:Math.log(axymin+shift)});
		else collist.push({R:light, G:255, B:light, val:Math.log(axymin+shift)});
	
		if(axymin < 1 && axymax > 1){
			collist.push({R:light, G:255, B:light, val:0});
			collist.push({R:255, G:light, B:light, val:0});
		}
	
		if(axymax > 1) collist.push({R:255, G:0, B:0, val:Math.log(axymax+shift)});
		else collist.push({R:light, G:255, B:light, val:Math.log(axymax+shift)});
	}
	else{
		collist.push({R:255, G:255, B:255, val:Math.log(axymin+shift)});
		collist.push({R:0, G:0, B:0, val:Math.log(axymax+shift)});
	}
	
	var ncoldiv = 100;

	col_map = {div:ncoldiv, min:Math.log(axymin+shift), max:Math.log(axymax+shift), shift:shift, map:[]};
	
	var i=0;
	for(div = 0; div <= ncoldiv; div++){
		val = Math.log(axymin+shift) + ((Math.log(axymax+shift) - Math.log(axymin+shift))*div)/ncoldiv;
		while(i < collist.length-2 && val > collist[i+1].val) i++; 

		frac = (val - collist[i].val)/(collist[i+1].val - collist[i].val);
		col_map.map.push({ R:Math.floor(collist[i].R*(1-frac)) + Math.floor(collist[i+1].R*frac), 
									 G:Math.floor(collist[i].G*(1-frac)) + Math.floor(collist[i+1].G*frac),
									 B:Math.floor(collist[i].B*(1-frac)) + Math.floor(collist[i+1].B*frac),
									 val:val});
	}
	
	nticky = 0;
	ticky = [];
	var min = Math.exp(col_map.min)-shift, max = Math.exp(col_map.max)-shift;
	for(range = 5; range >= -5; range--){
		add_tick(10 ** range,min,max,shift);
		add_tick((10 ** range)*2,min,max,shift);
		add_tick((10 ** range)*5,min,max,shift);
	}
	if(min < 0.00000001){ ticky.push(0); nticky++;}
}

function add_tick(val,min,max,shift)
{
	if(val > min && val < max && ((nticky < 10 && val > shift) || nticky < 6)){ ticky.push(val); nticky++;} 
}
	
function setytics()                                       // Sets up distribution y axis
{
	i = nticksize-1; while(i >= 0 && Math.floor((axymax-axymin)/ticksize[i]) < 3) i--;
	axticky = ticksize[i];

	mm = Math.floor(axymin/axticky + 0.9999);
	nticky = 0;
	while(mm*axticky < axymax){
		ticky[nticky] = rn(mm*axticky); nticky++;
		mm++;
	}

	w = 0;
	for(i = 0; i < nticky; i++){
		ww = textwidth(ticky[i],TICKFONT);
		if(ww > w) w = ww;
	}
	
	return w;
}

function setxtics()                                      // Sets up ticks on x axis
{
	i = nticksize-1; while(i >= 0 && Math.floor((axxmax-axxmin)/ticksize[i]) < 4) i--;
	axtickx = ticksize[i];

	tx = Math.floor(axxmin/axtickx + 0.999999)*axtickx;
	ntickx = 0;
	while(tx < axxmax){
		tickx[ntickx] = rn(tx); ntickx++;	
		tx += axtickx;
	}
}

function setlogytics()                                      // Sets up ticks on log y axis
{
	nticky = 0;
	ticky = [];
	for(range = -5; range < 5; range++){
		val = 10 ** range; if(val >= axymin && val <= axymax){ ticky.push(val); nticky++;}
		val = (10 ** range)*2; if(val >= axymin && val <= axymax){ ticky.push(val); nticky++;}
		val = (10 ** range)*5; if(val >= axymin && val <= axymax){ ticky.push(val); nticky++;}
	}
	
	w = 0;
	for(i = 0; i < nticky; i++){
		ww = textwidth(ticky[i],TICKFONT);
		if(ww > w) w = ww;
	}
	
	return w;
}

function setlogxtics()                                      // Sets up ticks on log x axis
{
	ntickx = 0;
	tickx = [];
	for(range = -5; range < 5; range++){
		val = 10 ** range; if(val >= axxmin && val <= axxmax){ tickx.push(val); ntickx++;}
		val = (10 ** range)*2; if(val >= axxmin && val <= axxmax){ tickx.push(val); ntickx++;}
		val = (10 ** range)*5; if(val >= axxmin && val <= axxmax){ tickx.push(val); ntickx++;}
	}
}

function rn(n)                                            // Rounds a number when put in interface
{
	var x;
	n = parseFloat(n);

	x = 0;
	do{
		num = n.toFixed(x);
		if((num-n)*(num-n) < 0.000000000000001) break;
		x++;
	}while(1 == 1);
	return num;
}

function mapframe(vis)
{
	graphdx = mapdx; graphdy = mapdy;
	addbutton("",menux,0,mapdx,mapdy,CANVASBUT,CANVASBUT,-1,-1);
	addcanbutton("",0,0,graphdx,graphdy,-1,RESULTBUT2,-1,-1);	
	
	if(vis.type == "OP_ANIM_MAP"){
		addcanbutton("",15,graphdy-45,30,30,PLAYBUT,PLAYBUT,-1,-1);		
		addcanbutton("",60,graphdy-37,graphdx-60-10,15,PLAYLINEBUT,PLAYLINEBUT,-1,-1);		
	}
	
	var dx = 22, dy = 26;
	addcanbutton("",mapdx-dx-dx-15,10,dx,dy,ZOOMINBUT,ZOOMINBUT,-1,-1);
	addcanbutton("",mapdx-dx-10,10,dx,dy,ZOOMOUTBUT,ZOOMOUTBUT,-1,-1); 
}

function matrixframe(x,y,vis)
{
	w = 0;
	for(i = 0; i < vis.ages.length; i++){
		ww = textwidth(vis.ages[i],TICKFONT);
		if(ww > w) w = ww;
	}
	w = Math.floor(w+20);
	
	x2 = 20; y1 = w; y2 = 20;
	
	graphdy = resdy - (y1+y2);
	graphdx = graphdy; 
	x1 = mapdx/2-graphdx/2;

	addbutton("",x,y,resdx,resdy,CANVASBUT,CANVASBUT,-1,-1);
	addcanbutton("",x1,y2,graphdx,graphdy,-1,RESULTBUT4,-1,-1);		

	d = graphdx/vis.ages.length;

	for(i = 0; i < vis.ages.length; i++){
		addcanbutton(vis.ages[i],x1+Math.floor(i*d),y2 + graphdy,Math.floor(d),w,-1,MATRIXXBUT,-1,-1);
		addcanbutton(vis.ages[i],x1-w,y2 + Math.floor(i*d),w,Math.floor(d),-1,MATRIXYBUT,-1,-1);
	}
}


function graphframe(x,y,x1,y1,x2,y2,w,labx,laby)      // Draws the frame for graphs
{	
	graphdx = resdx - (x1+x2); graphdy = resdy - (y1+y2);

	addbutton("",x,y,resdx,resdy,CANVASBUT,CANVASBUT,-1,-1);
	addcanbutton("",x1,y2,graphdx,graphdy,-1,RESULTBUT,-1,-1);		

	addcanbutton(labx,x1,y2+graphdy+30,graphdx,30,-1,XLABELBUT,-1,-1);
	addcanbutton(laby,0,y2,30,graphdy,-1,YLABELBUT,-1,-1);
	
	if(ntickx > 0) addcanbutton("X ticks",x1,y2+graphdy,graphdx,30,-1,XTICKBUT,-1,-1);
	if(nticky > 0) addcanbutton("Y ticks",x1-w,y2,w,graphdy,-1,YTICKTRBUT,-1,-1);
}

function loggraphframe(x,y,x1,y1,x2,y2,w,labx,laby)      // Draws the frame for graphs
{	
	graphdx = resdx - (x1+x2); graphdy = resdy - (y1+y2);

	addbutton("",x,y,resdx,resdy,CANVASBUT,CANVASBUT,-1,-1);
	addcanbutton("",x1,y2,graphdx,graphdy,-1,RESULTBUT,-1,-1);		

	addcanbutton(labx,x1,y2+graphdy+30,graphdx,30,-1,XLABELBUT,-1,-1);
	addcanbutton(laby,0,y2,30,graphdy,-1,YLABELBUT,-1,-1);
	
	if(ntickx > 0) addcanbutton("X ticks",x1,y2+graphdy,graphdx,30,-1,LOGXTICKBUT,-1,-1);
	if(nticky > 0) addcanbutton("Y ticks",x1-w,y2,w,graphdy,-1,LOGYTICKTRBUT,-1,-1);
}

function paramdist_frame(x,y,x1,y1,x2,y2,labx,laby)      // Draws the frame for a distribution
{	
	graphdx = resdx - (x1+x2); graphdy = resdy - (y1+y2);

	addbutton("",x,y,resdx,resdy,CANVASBUT,CANVASBUT,-1,-1);
	addcanbutton("",x1,y2,graphdx,graphdy,-1,RESULTBUT,-1,-1);		

	addcanbutton(labx,x1,y2+graphdy+30,graphdx,30,-1,XLABELBUT,-1,-1);
	addcanbutton(laby,0,y2,30,graphdy,-1,YLABELBUT,-1,-1);
	
	if(ntickx > 0) addcanbutton("X ticks",x1,y2+graphdy,graphdx,30,-1,XTICKBUT,-1,-1);
	//if(nticky > 0) addcanbutton("Y ticks",x1-w,y2,w,graphdy,-1,YTICKTRBUT,-1,-1);
}

function histogram_frame(x,y,x1,y1,x2,y2,w,labx,laby,cats)      // Draws the frame for histograms
{
	dx = Math.floor(graphdx/cats.length);

	var wmax = 0;
	for(i = 0; i < cats.length; i++){
		var w = textwidth_simp(cats[i],CATFONT)
		if(w > wmax) wmax = w;
	}
	var dy = 0;
	if(wmax > dx) dy = wmax-20;
	
	graphdx = resdx - (x1+x2); graphdy = resdy - (y1+y2+dy);
	
	if(wmax > dx){    // Labels are placed vertically
		for(i = 0; i < cats.length; i++){
			xx = Math.floor(x1 + graphdx*i/cats.length);		
			addcanbutton(cats[i],xx,y2+graphdy+10,dx,10,-1,CATVERTBUT,-1,-1);
		}
	}
	else{
		for(i = 0; i < cats.length; i++){
			xx = Math.floor(graphdx*i/cats.length);		
			addcanbutton(cats[i],xx,y2+graphdy+10,dx,10,-1,CATBUT,-1,-1);
		}
	}

	addbutton("",x,y,resdx,resdy,CANVASBUT,CANVASBUT,-1,-1);
	addcanbutton("",x1,y2,graphdx,graphdy,-1,RESULTBUT3,-1,-1);		

	addcanbutton(labx,x1,y2+graphdy+30+dy,graphdx,30,-1,XLABELBUT,-1,-1);
	addcanbutton(laby,0,y2,30,graphdy,-1,YLABELBUT,-1,-1);
	
	if(nticky > 0) addcanbutton("Y ticks",x1-w,y2,w,graphdy,-1,YTICKTRBUT,-1,-1);
}

function mapzoom(fac,x,y)
{
	zoomx += (1-1.0/fac)*map_ratio*(x/mapdx)/zoomfac;
	zoomy += (1-1.0/fac)*(1-y/mapdy)/zoomfac;
	zoomfac *= fac;
	
	buttoninit();
}

function playanim()
{
	playtime = Math.floor(playtimeinit + (getsec()- playstartt)*playtimemax/6);
	
	if(playtime >= playtimemax){ playtime = playtimemax-1; playing = 0;}
	
	plot_results();
	buttonplot();

	if(playing == 1 && playtime < playtimemax-1) setTimeout(function(){ playanim();}, 10);
}

function drawmap(vis)
{
	plottype = "map";
			
	cv = resultcv; 
	cv.clearRect(0,0,graphdx,graphdy);
	cv.lineWidth = 0.5;
	
	playtimemax = vis.array.length;
	
	var b = visjson.boundaries;
	for(c = 0; c < b.length; c++){
		for(p = 0; p < b[c].length; p++){
			cv.beginPath();
			for(i = 0; i <= b[c][p].length; i++){
				var ii = i%b[c][p].length;
				var x = mapdy*zoomfac*(b[c][p][ii][0]-zoomx), y = mapdy - mapdy*zoomfac*(b[c][p][ii][1]-zoomy);
				if(i == 0) cv.moveTo(x,y);
				else cv.lineTo(x,y);
			}
		
			cv.strokeStyle = BLACK;
			cv.stroke();
			
			val = Math.log(vis.array[playtime][c] + col_map.shift);
			div = Math.floor(col_map.div*(val-col_map.min)/(col_map.max-col_map.min));
		
			cv.fillStyle = "rgb("+col_map.map[div].R+","+col_map.map[div].G+","+col_map.map[div].B+")";
			cv.fill();
		}
	}
	
	if(areaover != -1) highlight_area(vis,areaover,vis.array[playtime][areaover],vis.areas[areaover])
	
	centertext(vis.dates[playtime],mapdx/2,30,MAPDATEFONT,BLACK);
}

function highlight_area(vis,c,val,name)
{
	var b = visjson.boundaries;
	
	cv.lineWidth = 1;
	for(p = 0; p < b[c].length; p++){
		cv.beginPath();
		for(i = 0; i <= b[c][p].length; i++){
			var ii = i%b[c][p].length;
			var x = mapdy*zoomfac*(b[c][p][ii][0]-zoomx), y = mapdy - mapdy*zoomfac*(b[c][p][ii][1]-zoomy);
			if(i == 0) cv.moveTo(x,y);
			else cv.lineTo(x,y);
		}
	
		cv.strokeStyle = BLACK;
		cv.stroke();
	}
	var ra = visjson.click_bound_range[c];
	var x = mapdy*zoomfac*(ra.xav-zoomx);

	if(val != ""){
		ww = textwidth(val,MAPBOLDFONT)+5;
		y = mapdy - mapdy*zoomfac*(ra.yav-zoomy);
		cv.globalAlpha = 0.9;
		drawroundrect(x-ww/2,y-10,ww,13,3,WHITE,WHITE); 
		cv.globalAlpha = 1;
		centertext(val,x,y+1,MAPBOLDFONT,BLACK);
	}
	
	ww = textwidth(vis.areas[c],MAPFONT)+5;
	y = mapdy - mapdy*zoomfac*(ra.ymin-zoomy);
	cv.globalAlpha = 0.9;
	drawroundrect(x-ww/2,y+2,ww,13,3,WHITE,WHITE); 
	cv.globalAlpha = 1;
	centertext(name,x,y+14,MAPFONT,BLACK);
}
	
function drawmixingmap(vis)
{
	plottype = "map";
			
	cv = resultcv; 
	cv.clearRect(0,0,graphdx,graphdy);
	cv.lineWidth = 0.5;
	
	var b = visjson.boundaries;
	for(c = 0; c < b.length; c++){
		for(p = 0; p < b[c].length; p++){
			cv.beginPath();
			for(i = 0; i <= b[c][p].length; i++){
				var ii = i%b[c][p].length;
				var x = mapdy*zoomfac*(b[c][p][ii][0]-zoomx), y = mapdy - mapdy*zoomfac*(b[c][p][ii][1]-zoomy);
				if(i == 0) cv.moveTo(x,y);
				else cv.lineTo(x,y);
			}
		
			cv.strokeStyle = BLACK;
			cv.stroke();
		}
	}
	
	var max = 0;
	for(i = 0; i < vis.to.length; i++){
		if(areaover == -1 || i == areaover){
			for(j = 0; j < vis.to[i].length; j++){
				if(vis.val[i][j] > max) max = vis.val[i][j];
			}
		}
	}
	
	for(i = 0; i < vis.to.length; i++){
		if(areaover == -1 || i == areaover){
			var rai = visjson.click_bound_range[i];
			var x1 = mapdy*zoomfac*(rai.xav-zoomx);
			var y1 = mapdy - mapdy*zoomfac*(rai.yav-zoomy);
			for(j = 0; j < vis.to[i].length; j++){
				var raj = visjson.click_bound_range[vis.to[i][j]];
				var x2 = mapdy*zoomfac*(raj.xav-zoomx);
				var y2 = mapdy - mapdy*zoomfac*(raj.yav-zoomy);
			
				cv.strokeStyle = BLUE;
				cv.beginPath();
				frac = vis.val[i][j]/max;
				cv.lineWidth = 5*frac;
				cv.globalAlpha = frac;
				
				var dx = x2-x1, dy = y2-y1;
				var end = 0.2;
				cv.moveTo(x1+end*dx,y1+end*dy);
				cv.lineTo(x2-end*dx,y2-end*dy);
				cv.stroke();
			}
		}
	}
	
	cv.globalAlpha = 1;
	
	if(areaover != -1) highlight_area(vis,areaover,"",vis.areas[areaover])
}
	
function drawmatrix(vis)
{
	plottype = "matrix";
	
	cv = resultcv; 
	cv.clearRect(0,0,graphdx,graphdy);
	
	var nage = vis.ages.length;

	var max = 0;		
	for(i = 0; i < nage; i++){
		for(j = 0; j < nage; j++){
			if(vis.ele[i][j] > max) max = vis.ele[i][j];
		}
	}	
	
	var d = graphdx/nage;
	for(i = 0; i < nage; i++){
		for(j = 0; j < nage; j++){
			cv.globalAlpha = vis.ele[i][j]/max;
			fillrect(i*d,j*d,d,d,RED);     
		}
	}
	cv.globalAlpha = 1;
}

function drawlines(vis)
{
	plottype = "graph";
	
	cv = resultcv; 
	cv.clearRect(0,0,graphdx,graphdy);
	cv.lineWidth = 2;
	
	for(li = 0; li < vis.line.length; li++){
		var visli = vis.line[li];
		var xcol = visli.xcol;
		if(xcol){
			var ycol = visli.ycol;
		
			cv.beginPath(); 
			for(i = 0; i < xcol.length; i++){
				x = Math.floor(graphdx*(xcol[i]-axxmin)/(axxmax-axxmin));
				y = Math.floor(graphdy-graphdy*(ycol[i]-axymin)/(axymax-axymin));
				
				if(i == 0) cv.moveTo(x,y);
				else cv.lineTo(x,y);
			}	
			
			
		}
		else{
			if(visli.true){
				y = Math.floor(graphdy-graphdy*(visli.true-axymin)/(axymax-axymin));
				cv.beginPath(); 
				cv.moveTo(0,y);
				cv.lineTo(graphdx,y);
			}
			else alert("Problem");
		}
		setstyle(visli.style);
		cv.stroke();
	} 	
	
	setdash(0);
	
	for(i = 0; i < visjson.time_labels.length; i++){
		var x = Math.floor(graphdx*(visjson.time_labels[i].time-axxmin)/(axxmax-axxmin));
		add_verticle_line(visjson.time_labels[i].name,x,BLACK);
	}

	for(i = 0; i < visjson.pred_timeplot.length; i++){
		var x = Math.floor(graphdx*(visjson.pred_timeplot[i].time-axxmin)/(axxmax-axxmin));
		add_verticle_line(visjson.pred_timeplot[i].name,x,DBLUE);
	}
}

function drawloglines(vis)
{
	plottype = "graph";
	
	cv = resultcv; 
	cv.clearRect(0,0,graphdx,graphdy);
	cv.lineWidth = 2;
	
	for(li = 0; li < vis.line.length; li++){
		var visli = vis.line[li];
		var xcol = visli.xcol;
		var ycol = visli.ycol;
	
		cv.beginPath(); 
		for(i = 0; i < xcol.length; i++){
			x = Math.floor(graphdx*(Math.log(xcol[i])-Math.log(axxmin))/(Math.log(axxmax)-Math.log(axxmin)));
			y = Math.floor(graphdy-graphdy*(Math.log(ycol[i])-Math.log(axymin))/(Math.log(axymax)-Math.log(axymin)));
			if(i == 0) cv.moveTo(x,y);
			else cv.lineTo(x,y);
		}
	
		setstyle(visli.style);
		cv.stroke();
	} 	
	
	setdash(0);
}


function drawME(vis)
{
	plottype = "graph";
	
	cv = resultcv; 
	cv.clearRect(0,0,graphdx,graphdy);
	cv.lineWidth = 2;
	
	for(li = 0; li < vis.line.length; li++){
		var visli = vis.line[li];
		var xcol = visli.xcol;
		var ycol = visli.ycol;
		var sd = visli.name;
	
		cv.beginPath(); 
		for(i = 0; i < xcol.length; i++){
			x = Math.floor(graphdx*(xcol[i]-axxmin)/(axxmax-axxmin));
			y = Math.floor(graphdy-graphdy*(ycol[i]-axymin)/(axymax-axymin));
			
			if(i == 0) cv.moveTo(x,y);
			else cv.lineTo(x,y);
		}	
			
		if(sd == ""){  // Adds an error bar
		}
		
		setstyle(visli.style);
		cv.stroke();
	} 	
	
	setdash(0);
		
/*		
		gnuplot << "plot ";
		for(auto j = 0u; j < oppl.line.size(); j++){
			const auto &line = oppl.line[j];
			if(j != 0) gnuplot << ", ";
			if(line.name == ""){  // Ordinary line
				gnuplot << "'" << line.file << "' using " << line.xcol << ":" << line.ycol;
				gnuplot << " with lines ls " << line.style << " ";
			
			}
			else{                 // Error bar
				gnuplot << "'" << line.file << "' using " << line.xcol << ":" << line.ycol << ":" << line.name;
				gnuplot << " with yerrorbars ls " << line.style << " ";
			}
			gnuplot << "notitle";
		}
		gnuplot << endl;
		
		gnuplot << "unset logscale x" << endl;
		*/
}

function drawparamdist(vis)
{
	plottype = "graph";
	
	cv = resultcv; 
	cv.clearRect(0,0,graphdx,graphdy);
	cv.lineWidth = 2;
	
	var visli = vis.line[0];
	var xcol = visli.xcol;
	var ycol = visli.ycol;
	
	cv.beginPath(); 
	for(i = 0; i < xcol.length; i++){
		x = Math.floor(graphdx*(xcol[i]-axxmin)/(axxmax-axxmin));
		y = Math.floor(graphdy-graphdy*(ycol[i]-axymin)/(axymax-axymin));
		
		if(i == 0) cv.moveTo(x,y);
		else cv.lineTo(x,y);
	}	
	
	setstyle(visli.style);
	cv.stroke();
	
	cv.lineTo(x,graphdy);
	x = Math.floor(graphdx*(xcol[0]-axxmin)/(axxmax-axxmin));
	cv.lineTo(x,graphdy);
	cv.globalAlpha = 0.3;
	cv.fillStyle = "#22ff22";
	cv.fill();
	cv.globalAlpha = 1;
		
	if(vis.line.length > 1){
		var visli = vis.line[1];
		if(visli.true){
			cv.beginPath(); 
			x = Math.floor(graphdx*(visli.true-axxmin)/(axxmax-axxmin));

			cv.moveTo(x,0);
			cv.lineTo(x,graphdy);
			setstyle(vis.line[1].style);
			cv.stroke();
		}
	}	

	setdash(0);
}


	/*
		gnuplot << "set yrange [0:1]" << endl;

		gnuplot << "plot ";
		for(auto j = 0u; j < oppl.line.size(); j++){
			const auto &line = oppl.line[j];
			if(j != 0) gnuplot << ", ";
			
			if(line.name == "True"){
				gnuplot << "'" << linefile  << "' using " << "($1*" << line.file << "):2";
			}
			else{
				gnuplot << "'" << line.file << "' using " << line.xcol << ":" << line.ycol;
			}
			gnuplot << " with lines ls " << line.style;
			
			if(line.name == "") gnuplot << " notitle"; else gnuplot << " title '" << label(line.name) << "'";
		}
		*/

function add_verticle_line(text,x,col)
{
	cv.strokeStyle = "#000000"; setdash(0);
	cv.lineWidth = 1;
	cv.beginPath(); 
	cv.moveTo(x,0);
	cv.lineTo(x,graphdy);
	cv.stroke();
	verticaltext(text,x+4,5,VERTFONT,col); 
}

function drawmarginal(vis)
{
	plottype = "marginal";
	
	cv = resultcv; 
	cv.clearRect(0,0,graphdx,graphdy);

	var li = vis.line[0];
	var xcol = li.xcol;
	var ycol = li.ycol;
	var imax = xcol.length;
	for(i = 0; i < imax; i++){
		var x1 = Math.floor((i+0.25)*graphdx/imax);
		var x2 = Math.floor((i+0.75)*graphdx/imax);
		var y = Math.floor(graphdy-graphdy*(ycol[i]-axymin)/(axymax-axymin));
		fillrect(x1,y,x2-x1,graphdy-y,RED);  
	}
	
	if(li.errbarmin){
		for(i = 0; i < imax; i++){
			draw_errorbar(i,imax,ycol[i],li.errbarmin[i],li.errbarmax[i]);
		}
	}
	
	if(vis.line.length > 1){
		var li = vis.line[1];
		var ycol = li.ycol;
		for(i = 0; i < imax; i++){
			var x1 = Math.floor((i)*graphdx/imax);
			var x2 = Math.floor((i+1)*graphdx/imax);
			var y = Math.floor(graphdy-graphdy*(ycol[i]-axymin)/(axymax-axymin));
			drawline(x1,y,x2,y,BLACK,2,0);
		}
	}
}

function draw_errorbar(i,imax,y,min,max)
{
	var x = Math.floor((i+0.5)*graphdx/imax);
	var yy = Math.floor(graphdy-graphdy*(y-axymin)/(axymax-axymin));
	var yymin = Math.floor(graphdy-graphdy*(min-axymin)/(axymax-axymin));
	var yymax = Math.floor(graphdy-graphdy*(max-axymin)/(axymax-axymin));
	
	var dx = graphdx/imax;
	var tic = 4;
	if(tic > dx/4) tic= dx/4;
	
	drawline(x,yymin,x,yymax,BLACK,1,0);
	drawline(x-tic,yymin,x+tic,yymin,BLACK,1,0);
	drawline(x-tic,yymax,x+tic,yymax,BLACK,1,0);
	drawline(x-tic/2,yy,x+tic/2,yy,BLACK,1,0);
}

function setstyle(style)
{
	switch(style){
		case "RED_SOLID": cv.strokeStyle = "#ff2222"; setdash(0); break;
		case "RED_DASHED": cv.strokeStyle = "#ffaaaa"; setdash(1); break;
		case "GREEN_SOLID": cv.strokeStyle = "#22ff22"; setdash(0); break;
		case "GREEN_DASHED": cv.strokeStyle = "#aaffaa"; setdash(1); break;
		case "BLUE_SOLID": cv.strokeStyle = "#2222ff"; setdash(0); break;
		case "BLUE_DASHED": cv.strokeStyle = "#aaaaff"; setdash(1); break;
		case "BLACK_SOLID": cv.strokeStyle = "#000000"; setdash(0); break;
		case "BLACK_DASHED": cv.strokeStyle = "#000000"; setdash(1); break;
		case "RED_DOTTED": cv.strokeStyle = "#ff2222"; setdash(2); break;
		case "RED_DOTDASH": cv.strokeStyle = "#ffaaaa"; setdash(3); break;
		case "GREEN_DOTTED": cv.strokeStyle = "#22ff22"; setdash(2); break;
		case "GREEN_DOTDASH": cv.strokeStyle = "#aaffaa"; setdash(3); break;
		case "BLUE_DOTTED": cv.strokeStyle = "#2222ff"; setdash(2); break;
		case "BLUE_DOTDASH": cv.strokeStyle = "#aaaaff"; setdash(3); break;
		case "BLACK_DOTTED": cv.strokeStyle = "#000000"; setdash(2); break;
		case "BLACK_DOTDASH": cv.strokeStyle = "#000000"; setdash(3); break;
		case "YELLOW_SOLID": cv.strokeStyle = "#ffff22"; setdash(0); break;
		case "YELLOW_DASHED": cv.strokeStyle = "#ffff22"; setdash(1); break;
		case "CYAN_SOLID": cv.strokeStyle = "#22ffff"; setdash(0); break;
		case "CYAN_DASHED": cv.strokeStyle = "#22ffff"; setdash(1); break;
		case "MAGENTA_SOLID": cv.strokeStyle = "#ff22ff"; setdash(0); break;
		case "MAGENTA_DASHED": cv.strokeStyle = "#ff22ff"; setdash(1); break;
	}
}


/// Looks at the intersection of 
function init_clickable_map()
{
	var b = visjson.boundaries;
	visjson.inter = [];
	visjson.click_bound_range=[];
		
	for(c = 0; c < b.length; c++){
		var xmin = large, xmax = -large, ymin = large, ymax = -large; 
		var xav = 0, yav = 0, nav = 0; 
		for(p = 0; p < b[c].length; p++){          
			for(k = 0; k < b[c][p].length; k++){
				var x = b[c][p][k][0], y = b[c][p][k][1];
				if(x > xmax) xmax = x; if(x < xmin) xmin = x;
				if(y > ymax) ymax = y; if(y < ymin) ymin = y;
				xav += x; yav += y; nav++;
			}
		}
		visjson.click_bound_range[c] = {xmin:xmin, xmax:xmax, ymin:ymin, ymax:ymax, xav:xav/nav, yav:yav/nav};
		
		visjson.inter[c] = [];
		for(yi = Math.floor(clickline*ymin); yi <= Math.floor(clickline*ymax); yi++){
			visjson.inter[c][yi]=[];
		}
	
		for(p = 0; p < b[c].length; p++){          
			for(k = 0; k < b[c][p].length; k++){
				var po = b[c][p][k];
				xi = b[c][p][k][0];
				xf = b[c][p][(k+1)%b[c][p].length][0];
				bx = xf-xi; 
				
				yi = clickline*b[c][p][k][1];
				yf = clickline*b[c][p][(k+1)%b[c][p].length][1];
				by = yf-yi;
				if(by > 0){
					for(j = Math.floor(yi+1); j < yf; j++) visjson.inter[c][j].push(xi + bx*(j-yi)/by);
				}
				
				if(by < 0){
					for(j = Math.floor(yi); j > yf; j--) visjson.inter[c][j].push(xi + bx*(j-yi)/by);
				}
				//if(by == 0) visjson.inter[c][Math.floor(yi)].push(xi);
			}
		}
	}	
}

