MathJax.InputJax.TeX=MathJax.InputJax({id:"TeX",version:"2.5.2",directory:MathJax.InputJax.directory+"/TeX",extensionDir:MathJax.InputJax.extensionDir+"/TeX",config:{TagSide:"right",TagIndent:"0.8em",MultLineWidth:"85%",equationNumbers:{autoNumber:"none",formatNumber:function(a){return a},formatTag:function(a){return"("+a+")"},formatID:function(a){return"mjx-eqn-"+String(a).replace(/[:"'<>&]/g,"")},formatURL:function(a){return"#"+escape(a)},useLabelIds:!0}}}),MathJax.InputJax.TeX.Register("math/tex"),MathJax.InputJax.TeX.loadComplete("config.js"),MathJax.OutputJax["HTML-CSS"]=MathJax.OutputJax({id:"HTML-CSS",version:"2.5.3",directory:MathJax.OutputJax.directory+"/HTML-CSS",extensionDir:MathJax.OutputJax.extensionDir+"/HTML-CSS",autoloadDir:MathJax.OutputJax.directory+"/HTML-CSS/autoload",fontDir:MathJax.OutputJax.directory+"/HTML-CSS/fonts",webfontDir:MathJax.OutputJax.fontDir+"/HTML-CSS",config:{noReflows:!0,matchFontHeight:!0,scale:100,minScaleAdjust:50,availableFonts:["STIX","TeX"],preferredFont:"TeX",webFont:"TeX",imageFont:"TeX",undefinedFamily:"STIXGeneral,'Arial Unicode MS',serif",mtextFontInherit:!1,EqnChunk:MathJax.Hub.Browser.isMobile?10:50,EqnChunkFactor:1.5,EqnChunkDelay:100,linebreaks:{automatic:!1,width:"container"},styles:{".MathJax_Display":{"text-align":"center",margin:"1em 0em"},".MathJax .merror":{"background-color":"#FFFF88",color:"#CC0000",border:"1px solid #CC0000",padding:"1px 3px","font-style":"normal","font-size":"90%"},".MathJax .MJX-monospace":{"font-family":"monospace"},".MathJax .MJX-sans-serif":{"font-family":"sans-serif"},"#MathJax_Tooltip":{"background-color":"InfoBackground",color:"InfoText",border:"1px solid black","box-shadow":"2px 2px 5px #AAAAAA","-webkit-box-shadow":"2px 2px 5px #AAAAAA","-moz-box-shadow":"2px 2px 5px #AAAAAA","-khtml-box-shadow":"2px 2px 5px #AAAAAA",filter:"progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')",padding:"3px 4px","z-index":401}}}}),MathJax.Hub.Browser.isMSIE&&document.documentMode>=9&&delete MathJax.OutputJax["HTML-CSS"].config.styles["#MathJax_Tooltip"].filter,MathJax.Hub.config.delayJaxRegistration||MathJax.OutputJax["HTML-CSS"].Register("jax/mml"),MathJax.Hub.Register.StartupHook("End Config",[function(b,c){var a=b.Insert({minBrowserVersion:{Firefox:3,Opera:9.52,MSIE:6,Chrome:.3,Safari:2,Konqueror:4},inlineMathDelimiters:["$","$"],displayMathDelimiters:["$$","$$"],multilineDisplay:!0,minBrowserTranslate:function(f){var j,e=b.getJaxFor(f),k=["[Math]"],h=document.createElement("span",{className:"MathJax_Preview"});"TeX"===e.inputJax&&(e.root.Get("displaystyle")?(j=a.displayMathDelimiters,k=[j[0]+e.originalText+j[1]],a.multilineDisplay&&(k=k[0].split(/\n/))):(j=a.inlineMathDelimiters,k=[j[0]+e.originalText.replace(/^\s+/,"").replace(/\s+$/,"")+j[1]]));for(var g=0,d=k.length;d>g;g++)h.appendChild(document.createTextNode(k[g])),d-1>g&&h.appendChild(document.createElement("br"));f.parentNode.insertBefore(h,f)}},b.config["HTML-CSS"]||{});"0.0"===b.Browser.version||b.Browser.versionAtLeast(a.minBrowserVersion[b.Browser]||0)||(c.Translate=a.minBrowserTranslate,b.Config({showProcessingMessages:!1}),MathJax.Message.Set(["MathJaxNotSupported","Your browser does not support MathJax"],null,4e3),b.Startup.signal.Post("MathJax not supported"))},MathJax.Hub,MathJax.OutputJax["HTML-CSS"]]),MathJax.OutputJax["HTML-CSS"].loadComplete("config.js"),MathJax.Extension.tex2jax={version:"2.5.0",config:{inlineMath:[["\\(","\\)"]],displayMath:[["$$","$$"],["\\[","\\]"]],balanceBraces:!0,skipTags:["script","noscript","style","textarea","pre","code","annotation","annotation-xml"],ignoreClass:"tex2jax_ignore",processClass:"tex2jax_process",processEscapes:!1,processEnvironments:!0,processRefs:!0,preview:"TeX"},PreProcess:function(a){this.configured||(this.config=MathJax.Hub.CombineConfig("tex2jax",this.config),this.config.Augment&&MathJax.Hub.Insert(this,this.config.Augment),"undefined"==typeof this.config.previewTeX||this.config.previewTeX||(this.config.preview="none"),this.configured=!0),"string"==typeof a&&(a=document.getElementById(a)),a||(a=document.body),this.createPatterns()&&this.scanElement(a,a.nextSibling)},createPatterns:function(){var c,a,d=[],e=[],b=this.config;for(this.match={},c=0,a=b.inlineMath.length;a>c;c++)d.push(this.patternQuote(b.inlineMath[c][0])),this.match[b.inlineMath[c][0]]={mode:"",end:b.inlineMath[c][1],pattern:this.endPattern(b.inlineMath[c][1])};for(c=0,a=b.displayMath.length;a>c;c++)d.push(this.patternQuote(b.displayMath[c][0])),this.match[b.displayMath[c][0]]={mode:"; mode=display",end:b.displayMath[c][1],pattern:this.endPattern(b.displayMath[c][1])};d.length&&e.push(d.sort(this.sortLength).join("|")),b.processEnvironments&&e.push("\\\\begin\\{([^}]*)\\}"),b.processEscapes&&e.push("\\\\*\\\\\\$"),b.processRefs&&e.push("\\\\(eq)?ref\\{[^}]*\\}"),this.start=new RegExp(e.join("|"),"g"),this.skipTags=new RegExp("^("+b.skipTags.join("|")+")$","i");var f=[];return MathJax.Hub.config.preRemoveClass&&f.push(MathJax.Hub.config.preRemoveClass),b.ignoreClass&&f.push(b.ignoreClass),this.ignoreClass=f.length?new RegExp("(^| )("+f.join("|")+")( |$)"):/^$/,this.processClass=new RegExp("(^| )("+b.processClass+")( |$)"),e.length>0},patternQuote:function(a){return a.replace(/([\^$(){}+*?\-|\[\]\:\\])/g,"\\$1")},endPattern:function(a){return new RegExp(this.patternQuote(a)+"|\\\\.|[{}]","g")},sortLength:function(d,c){return d.length!==c.length?c.length-d.length:d==c?0:c>d?-1:1},scanElement:function(c,b,g){for(var a,e,d,f;c&&c!=b;)"#text"===c.nodeName.toLowerCase()?g||(c=this.scanText(c)):(a="undefined"==typeof c.className?"":c.className,e="undefined"==typeof c.tagName?"":c.tagName,"string"!=typeof a&&(a=String(a)),f=this.processClass.exec(a),!c.firstChild||a.match(/(^| )MathJax/)||!f&&this.skipTags.exec(e)||(d=(g||this.ignoreClass.exec(a))&&!f,this.scanElement(c.firstChild,b,d))),c&&(c=c.nextSibling)},scanText:function(b){if(""==b.nodeValue.replace(/\s+/,""))return b;var a,c;for(this.search={start:!0},this.pattern=this.start;b;){for(this.pattern.lastIndex=0;b&&"#text"===b.nodeName.toLowerCase()&&(a=this.pattern.exec(b.nodeValue));)b=this.search.start?this.startMatch(a,b):this.endMatch(a,b);if(this.search.matched&&(b=this.encloseMath(b)),b){do c=b,b=b.nextSibling;while(b&&("br"===b.nodeName.toLowerCase()||"#comment"===b.nodeName.toLowerCase()));if(!b||"#text"!==b.nodeName)return this.search.close?this.prevEndMatch():c}}return b},startMatch:function(a,b){var f=this.match[a[0]];if(null!=f)this.search={end:f.end,mode:f.mode,pcount:0,open:b,olen:a[0].length,opos:this.pattern.lastIndex-a[0].length},this.switchPattern(f.pattern);else if("\\begin"===a[0].substr(0,6))this.search={end:"\\end{"+a[1]+"}",mode:"; mode=display",pcount:0,open:b,olen:0,opos:this.pattern.lastIndex-a[0].length,isBeginEnd:!0},this.switchPattern(this.endPattern(this.search.end));else{if("\\ref"===a[0].substr(0,4)||"\\eqref"===a[0].substr(0,6))return this.search={mode:"",end:"",open:b,pcount:0,olen:0,opos:this.pattern.lastIndex-a[0].length},this.endMatch([""],b);var g,c,d=a[0].substr(0,a[0].length-1);d.length%2===0?(c=[d.replace(/\\\\/g,"\\")],g=1):(c=[d.substr(1).replace(/\\\\/g,"\\"),"$"],g=0),c=MathJax.HTML.Element("span",null,c);var e=MathJax.HTML.TextNode(b.nodeValue.substr(0,a.index));b.nodeValue=b.nodeValue.substr(a.index+a[0].length-g),b.parentNode.insertBefore(c,b),b.parentNode.insertBefore(e,c),this.pattern.lastIndex=g}return b},endMatch:function(a,c){var b=this.search;return a[0]==b.end?(b.close&&0!==b.pcount||(b.close=c,b.cpos=this.pattern.lastIndex,b.clen=b.isBeginEnd?0:a[0].length),0===b.pcount&&(b.matched=!0,c=this.encloseMath(c),this.switchPattern(this.start))):"{"===a[0]?b.pcount++:"}"===a[0]&&b.pcount&&b.pcount--,c},prevEndMatch:function(){this.search.matched=!0;var a=this.encloseMath(this.search.close);return this.switchPattern(this.start),a},switchPattern:function(a){a.lastIndex=this.pattern.lastIndex,this.pattern=a,this.search.start=a===this.start},encloseMath:function(){var e,c,a=this.search,f=a.close;for(f=a.cpos===f.length?f.nextSibling:f.splitText(a.cpos),f||(e=f=MathJax.HTML.addText(a.close.parentNode,"")),a.close=f,c=a.opos?a.open.splitText(a.opos):a.open;c.nextSibling&&c.nextSibling!==f;)c.nodeValue+=null!==c.nextSibling.nodeValue?"#comment"===c.nextSibling.nodeName?c.nextSibling.nodeValue.replace(/^\[CDATA\[((.|\n|\r)*)\]\]$/,"$1"):c.nextSibling.nodeValue:this.msieNewlineBug&&"br"===c.nextSibling.nodeName.toLowerCase()?"\n":" ",c.parentNode.removeChild(c.nextSibling);var d=c.nodeValue.substr(a.olen,c.nodeValue.length-a.olen-a.clen);return c.parentNode.removeChild(c),"none"!==this.config.preview&&this.createPreview(a.mode,d),c=this.createMathTag(a.mode,d),this.search={},this.pattern.lastIndex=0,e&&e.parentNode.removeChild(e),c},insertNode:function(b){var a=this.search;a.close.parentNode.insertBefore(b,a.close)},createPreview:function(c,a){var b=this.config.preview;"none"!==b&&("TeX"===b&&(b=[this.filterPreview(a)]),b&&(b=MathJax.HTML.Element("span",{className:MathJax.Hub.config.preRemoveClass},b),this.insertNode(b)))},createMathTag:function(c,b){var a=document.createElement("script");return a.type="math/tex"+c,MathJax.HTML.setScript(a,b),this.insertNode(a),a},filterPreview:function(a){return a},msieNewlineBug:MathJax.Hub.Browser.isMSIE&&document.documentMode<9},MathJax.Hub.Register.PreProcessor(["PreProcess",MathJax.Extension.tex2jax]),MathJax.Ajax.loadComplete("[MathJax]/extensions/tex2jax.js"),MathJax.Extension["TeX/mhchem"]={version:"2.5.0"},MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var b=MathJax.InputJax.TeX,a=MathJax.Object.Subclass({string:"",i:0,tex:"",atom:!1,sup:"",sub:"",Init:function(c){this.string=c},ParseTable:{"-":"Minus","+":"Plus","(":"Open",")":"Close","[":"Open","]":"Close","<":"Less","^":"Superscript",_:"Subscript","*":"Dot",".":"Dot","=":"Equal","#":"Pound",$:"Math","\\":"Macro"," ":"Space"},Arrows:{"->":"rightarrow","<-":"leftarrow","<->":"leftrightarrow","<=>":"rightleftharpoons","<=>>":"Rightleftharpoons","<<=>":"Leftrightharpoons","^":"uparrow",v:"downarrow"},Bonds:{"-":"-","=":"=","#":"\\equiv","~":"\\tripledash","~-":"\\begin{CEstack}{}\\tripledash\\\\-\\end{CEstack}","~=":"\\raise2mu{\\begin{CEstack}{}\\tripledash\\\\-\\\\-\\end{CEstack}}","~--":"\\raise2mu{\\begin{CEstack}{}\\tripledash\\\\-\\\\-\\end{CEstack}}","-~-":"\\raise2mu{\\begin{CEstack}{}-\\\\\\tripledash\\\\-\\end{CEstack}}","...":"{\\cdot}{\\cdot}{\\cdot}","....":"{\\cdot}{\\cdot}{\\cdot}{\\cdot}","->":"\\rightarrow","<-":"\\leftarrow","??":"\\text{??}"},Parse:function(){for(this.tex="",this.atom=!1;this.i<this.string.length;){var d=this.string.charAt(this.i);d.match(/[a-z]/i)?this.ParseLetter():d.match(/[0-9]/)?this.ParseNumber():this["Parse"+(this.ParseTable[d]||"Other")](d)}return this.FinishAtom(),this.tex},ParseLetter:function(){this.FinishAtom(),this.Match(/^v( |$)/)?this.tex+="{\\"+this.Arrows.v+"}":(this.tex+="\\text{"+this.Match(/^[a-z]+/i)+"}",this.atom=!0)},ParseNumber:function(){var e=this.Match(/^\d+/);if(this.atom&&!this.sub)this.sub=e;else{this.FinishAtom();var d=this.Match(/^\/\d+/);if(d){var c="\\frac{"+e+"}{"+d.substr(1)+"}";this.tex+="\\mathchoice{\\textstyle"+c+"}{"+c+"}{"+c+"}{"+c+"}"}else this.tex+=e,this.i<this.string.length&&(this.tex+="\\,")}},ParseMinus:function(d){if(!this.atom||this.i!==this.string.length-1&&" "!==this.string.charAt(this.i+1)){if(this.FinishAtom(),"->"===this.string.substr(this.i,2))return this.i+=2,void this.AddArrow("->");this.tex+="{-}"}else this.sup+=d;this.i++},ParsePlus:function(d){this.atom?this.sup+=d:(this.FinishAtom(),this.tex+=d),this.i++},ParseDot:function(){this.FinishAtom(),this.tex+="\\cdot ",this.i++},ParseEqual:function(){this.FinishAtom(),this.tex+="{=}",this.i++},ParsePound:function(){this.FinishAtom(),this.tex+="{\\equiv}",this.i++},ParseOpen:function(e){this.FinishAtom();var d=this.Match(/^\([v^]\)/);d?this.tex+="{\\"+this.Arrows[d.charAt(1)]+"}":(this.tex+="{"+e,this.i++)},ParseClose:function(d){this.FinishAtom(),this.atom=!0,this.tex+=d+"}",this.i++},ParseLess:function(e){this.FinishAtom();var d=this.Match(/^(<->?|<=>>?|<<=>)/);d?this.AddArrow(d):(this.tex+=e,this.i++)},ParseSuperscript:function(f){if(f=this.string.charAt(++this.i),"{"===f){this.i++;var d=this.Find("}");"-."===d?this.sup+="{-}{\\cdot}":d&&(this.sup+=a(d).Parse().replace(/^\{-\}/,"-"))}else if(" "===f||""===f)this.tex+="{\\"+this.Arrows["^"]+"}",this.i++;else{var e=this.Match(/^(\d+|-\.)/);e&&(this.sup+=e)}},ParseSubscript:function(){if("{"==this.string.charAt(++this.i))this.i++,this.sub+=a(this.Find("}")).Parse().replace(/^\{-\}/,"-");else{var d=this.Match(/^\d+/);d&&(this.sub+=d)}},ParseMath:function(d){this.FinishAtom(),this.i++,this.tex+=this.Find(d)},ParseMacro:function(f){this.FinishAtom(),this.i++;var d=this.Match(/^([a-z]+|.)/i)||" ";if("sbond"===d)this.tex+="{-}";else if("dbond"===d)this.tex+="{=}";else if("tbond"===d)this.tex+="{\\equiv}";else if("bond"===d){var e=this.Match(/^\{.*?\}/)||"";e=e.substr(1,e.length-2),this.tex+="{"+(this.Bonds[e]||"\\text{??}")+"}"}else"{"===d?this.tex+="{\\{":"}"===d?(this.tex+="\\}}",this.atom=!0):this.tex+=f+d},ParseSpace:function(){this.FinishAtom(),this.i++},ParseOther:function(d){this.FinishAtom(),this.tex+=d,this.i++},AddArrow:function(e){var g=this.Match(/^[CT]\[/);g&&(this.i--,g=g.charAt(0));var d=this.GetBracket(g),f=this.GetBracket(g);e=this.Arrows[e],d||f?(f&&(e+="["+f+"]"),e+="{"+d+"}",e="\\mathrel{\\x"+e+"}"):e="\\long"+e+" ",this.tex+=e},FinishAtom:function(){if(this.sup||this.sub){if(this.sup&&this.sub&&!this.atom){var c=this.sup,d=this.sub;c.match(/\d/)||(c+="\\vphantom{0}"),d.match(/\d/)||(d+="\\vphantom{0}"),this.tex+="\\raise 1pt{\\scriptstyle\\begin{CEscriptstack}"+c+"\\\\"+d+"\\end{CEscriptstack}}\\kern-.125em "}else this.sup||(this.sup="\\Space{0pt}{0pt}{.2em}"),this.tex+="^{"+this.sup+"}_{"+this.sub+"}";this.sup=this.sub=""}this.atom=!1},GetBracket:function(e){if("["!==this.string.charAt(this.i))return"";this.i++;var d=this.Find("]");return"C"===e?d="\\ce{"+d+"}":"T"===e&&(d.match(/^\{.*\}$/)||(d="{"+d+"}"),d="\\text"+d),d},Match:function(d){var c=d.exec(this.string.substr(this.i));return c&&(c=c[0],this.i+=c.length),c},Find:function(h){for(var d=this.string.length,e=this.i,g=0;this.i<d;){var f=this.string.charAt(this.i++);if(f===h&&0===g)return this.string.substr(e,this.i-e-1);"{"===f?g++:"}"===f&&(g?g--:b.Error(["ExtraCloseMissingOpen","Extra close brace or missing open brace"]))}g&&b.Error(["MissingCloseBrace","Missing close brace"]),b.Error(["NoClosingChar","Can't find closing %1",h])}});MathJax.Extension["TeX/mhchem"].CE=a,b.Definitions.Add({macros:{ce:"CE",cf:"CE",cee:"CE",xleftrightarrow:["Extension","AMSmath"],xrightleftharpoons:["Extension","AMSmath"],xRightleftharpoons:["Extension","AMSmath"],xLeftrightharpoons:["Extension","AMSmath"],longrightleftharpoons:["Macro","\\stackrel{\\textstyle{{-}\\!\\!{\\rightharpoonup}}}{\\smash{{\\leftharpoondown}\\!\\!{-}}}"],longRightleftharpoons:["Macro","\\stackrel{\\textstyle{-}\\!\\!{\\rightharpoonup}}{\\small\\smash\\leftharpoondown}"],longLeftrightharpoons:["Macro","\\stackrel{\\rightharpoonup}{{{\\leftharpoondown}\\!\\!\\textstyle{-}}}"],hyphen:["Macro","\\text{-}"],tripledash:["Macro","\\raise3mu{\\tiny\\text{-}\\kern2mu\\text{-}\\kern2mu\\text{-}}"]},environment:{CEstack:["Array",null,null,null,"r",null,"0.001em","T",1],CEscriptstack:["Array",null,null,null,"r",null,"0.2em","S",1]}},null,!0),MathJax.Extension["TeX/AMSmath"]||b.Definitions.Add({macros:{xrightarrow:["Extension","AMSmath"],xleftarrow:["Extension","AMSmath"]}},null,!0),MathJax.Hub.Register.StartupHook("TeX AMSmath Ready",function(){b.Definitions.Add({macros:{xleftrightarrow:["xArrow",8596,6,6],xrightleftharpoons:["xArrow",8652,5,7],xRightleftharpoons:["xArrow",8652,5,7],xLeftrightharpoons:["xArrow",8652,5,7]}},null,!0)}),b.Parse.Augment({CE:function(e){var c=this.GetArgument(e),d=a(c).Parse();this.string=d+this.string.substr(this.i),this.i=0}}),MathJax.Hub.Startup.signal.Post("TeX mhchem Ready")}),MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/mhchem.js"),MathJax.Extension["TeX/AMSmath"]={version:"2.5.1",number:0,startNumber:0,IDs:{},eqIDs:{},labels:{},eqlabels:{},refs:[]},MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var b=MathJax.ElementJax.mml,g=MathJax.InputJax.TeX,f=MathJax.Extension["TeX/AMSmath"],d=g.Definitions,e=g.Stack.Item,a=g.config.equationNumbers,c=function(j){for(var l=[],k=0,h=j.length;h>k;k++)l[k]=g.Parse.prototype.Em(j[k]);return l.join(" ")};d.Add({mathchar0mo:{iiiint:["2A0C",{texClass:b.TEXCLASS.OP}]},macros:{mathring:["Accent","2DA"],nobreakspace:"Tilde",negmedspace:["Spacer",b.LENGTH.NEGATIVEMEDIUMMATHSPACE],negthickspace:["Spacer",b.LENGTH.NEGATIVETHICKMATHSPACE],idotsint:["MultiIntegral","\\int\\cdots\\int"],dddot:["Accent","20DB"],ddddot:["Accent","20DC"],sideset:["Macro","\\mathop{\\mathop{\\rlap{\\phantom{#3}}}\\nolimits#1\\!\\mathop{#3}\\nolimits#2}",3],boxed:["Macro","\\fbox{$\\displaystyle{#1}$}",1],tag:"HandleTag",notag:"HandleNoTag",label:"HandleLabel",ref:"HandleRef",eqref:["HandleRef",!0],substack:["Macro","\\begin{subarray}{c}#1\\end{subarray}",1],injlim:["NamedOp","inj&thinsp;lim"],projlim:["NamedOp","proj&thinsp;lim"],varliminf:["Macro","\\mathop{\\underline{\\mmlToken{mi}{lim}}}"],varlimsup:["Macro","\\mathop{\\overline{\\mmlToken{mi}{lim}}}"],varinjlim:["Macro","\\mathop{\\underrightarrow{\\mmlToken{mi}{lim}\\Rule{-1pt}{0pt}{1pt}}\\Rule{0pt}{0pt}{.45em}}"],varprojlim:["Macro","\\mathop{\\underleftarrow{\\mmlToken{mi}{lim}\\Rule{-1pt}{0pt}{1pt}}\\Rule{0pt}{0pt}{.45em}}"],DeclareMathOperator:"HandleDeclareOp",operatorname:"HandleOperatorName",genfrac:"Genfrac",frac:["Genfrac","","","",""],tfrac:["Genfrac","","","",1],dfrac:["Genfrac","","","",0],binom:["Genfrac","(",")","0",""],tbinom:["Genfrac","(",")","0",1],dbinom:["Genfrac","(",")","0",0],cfrac:"CFrac",shoveleft:["HandleShove",b.ALIGN.LEFT],shoveright:["HandleShove",b.ALIGN.RIGHT],xrightarrow:["xArrow",8594,5,6],xleftarrow:["xArrow",8592,7,3]},environment:{align:["AMSarray",null,!0,!0,"rlrlrlrlrlrl",c([0,2,0,2,0,2,0,2,0,2,0])],"align*":["AMSarray",null,!1,!0,"rlrlrlrlrlrl",c([0,2,0,2,0,2,0,2,0,2,0])],multline:["Multline",null,!0],"multline*":["Multline",null,!1],split:["AMSarray",null,!1,!1,"rl",c([0])],gather:["AMSarray",null,!0,!0,"c"],"gather*":["AMSarray",null,!1,!0,"c"],alignat:["AlignAt",null,!0,!0],"alignat*":["AlignAt",null,!1,!0],alignedat:["AlignAt",null,!1,!1],aligned:["AlignedAMSArray",null,null,null,"rlrlrlrlrlrl",c([0,2,0,2,0,2,0,2,0,2,0]),".5em","D"],gathered:["AlignedAMSArray",null,null,null,"c",null,".5em","D"],subarray:["Array",null,null,null,null,c([0,0,0,0]),"0.1em","S",1],smallmatrix:["Array",null,null,null,"c",c([1/3]),".2em","S",1],equation:["EquationBegin","Equation",!0],"equation*":["EquationBegin","EquationStar",!1],eqnarray:["AMSarray",null,!0,!0,"rcl",b.LENGTH.THICKMATHSPACE,".5em"],"eqnarray*":["AMSarray",null,!1,!0,"rcl",b.LENGTH.THICKMATHSPACE,".5em"]},delimiter:{"\\lvert":["2223",{texClass:b.TEXCLASS.OPEN}],"\\rvert":["2223",{texClass:b.TEXCLASS.CLOSE}],"\\lVert":["2225",{texClass:b.TEXCLASS.OPEN}],"\\rVert":["2225",{texClass:b.TEXCLASS.CLOSE}]}},null,!0),g.Parse.Augment({HandleTag:function(j){var l=this.GetStar(),i=this.trimSpaces(this.GetArgument(j)),h=i;l||(i=a.formatTag(i));var k=this.stack.global;k.tagID=h,k.notags&&g.Error(["CommandNotAllowedInEnv","%1 not allowed in %2 environment",j,k.notags]),k.tag&&g.Error(["MultipleCommand","Multiple %1",j]),k.tag=b.mtd.apply(b,this.InternalMath(i)).With({id:a.formatID(h)})},HandleNoTag:function(){this.stack.global.tag&&delete this.stack.global.tag,this.stack.global.notag=!0},HandleLabel:function(i){var j=this.stack.global,h=this.GetArgument(i);""!==h&&(f.refUpdate||(j.label&&g.Error(["MultipleCommand","Multiple %1",i]),j.label=h,(f.labels[h]||f.eqlabels[h])&&g.Error(["MultipleLabel","Label '%1' multiply defined",h]),f.eqlabels[h]={tag:"???",id:""}))},HandleRef:function(j,l){var i=this.GetArgument(j),k=f.labels[i]||f.eqlabels[i];k||(k={tag:"???",id:""},f.badref=!f.refUpdate);var h=k.tag;l&&(h=a.formatTag(h)),this.Push(b.mrow.apply(b,this.InternalMath(h)).With({href:a.formatURL(k.id),"class":"MathJax_ref"}))},HandleDeclareOp:function(i){var h=this.GetStar()?"":"\\nolimits",j=this.trimSpaces(this.GetArgument(i));"\\"==j.charAt(0)&&(j=j.substr(1));var k=this.GetArgument(i);k=k.replace(/\*/g,"\\text{*}").replace(/-/g,"\\text{-}"),g.Definitions.macros[j]=["Macro","\\mathop{\\rm "+k+"}"+h]},HandleOperatorName:function(i){var h=this.GetStar()?"":"\\nolimits",j=this.trimSpaces(this.GetArgument(i));j=j.replace(/\*/g,"\\text{*}").replace(/-/g,"\\text{-}"),this.string="\\mathop{\\rm "+j+"}"+h+" "+this.string.slice(this.i),this.i=0},HandleShove:function(i,h){var j=this.stack.Top();("multline"!==j.type||j.data.length)&&g.Error(["CommandAtTheBeginingOfLine","%1 must come at the beginning of the line",i]),j.data.shove=h},CFrac:function(k){var h=this.trimSpaces(this.GetBrackets(k,"")),j=this.GetArgument(k),l=this.GetArgument(k),i=b.mfrac(g.Parse("\\strut\\textstyle{"+j+"}",this.stack.env).mml(),g.Parse("\\strut\\textstyle{"+l+"}",this.stack.env).mml());h={l:b.ALIGN.LEFT,r:b.ALIGN.RIGHT,"":""}[h],null==h&&g.Error(["IllegalAlign","Illegal alignment specified in %1",k]),h&&(i.numalign=i.denomalign=h),this.Push(i)},Genfrac:function(i,k,p,m,h){null==k&&(k=this.GetDelimiterArg(i)),null==p&&(p=this.GetDelimiterArg(i)),null==m&&(m=this.GetArgument(i)),null==h&&(h=this.trimSpaces(this.GetArgument(i)));var l=this.ParseArg(i),o=this.ParseArg(i),j=b.mfrac(l,o);if(""!==m&&(j.linethickness=m),(k||p)&&(j=g.fixedFence(k,j.With({texWithDelims:!0}),p)),""!==h){var n=["D","T","S","SS"][h];null==n&&g.Error(["BadMathStyleFor","Bad math style for %1",i]),j=b.mstyle(j),"D"===n?(j.displaystyle=!0,j.scriptlevel=0):(j.displaystyle=!1,j.scriptlevel=h-1)}this.Push(j)},Multline:function(i,h){return this.Push(i),this.checkEqnEnv(),e.multline(h,this.stack).With({arraydef:{displaystyle:!0,rowspacing:".5em",width:g.config.MultLineWidth,columnwidth:"100%",side:g.config.TagSide,minlabelspacing:g.config.TagIndent}})},AMSarray:function(j,i,h,l,k){return this.Push(j),h&&this.checkEqnEnv(),l=l.replace(/[^clr]/g,"").split("").join(" "),l=l.replace(/l/g,"left").replace(/r/g,"right").replace(/c/g,"center"),e.AMSarray(j.name,i,h,this.stack).With({arraydef:{displaystyle:!0,rowspacing:".5em",columnalign:l,columnspacing:k||"1em",rowspacing:"3pt",side:g.config.TagSide,minlabelspacing:g.config.TagIndent}})},AlignedAMSArray:function(h){var i=this.GetBrackets("\\begin{"+h.name+"}");return this.setArrayAlign(this.AMSarray.apply(this,arguments),i)},AlignAt:function(k,i,h){var p,j,o="",m=[];for(h||(j=this.GetBrackets("\\begin{"+k.name+"}")),p=this.GetArgument("\\begin{"+k.name+"}"),p.match(/[^0-9]/)&&g.Error(["PositiveIntegerArg","Argument to %1 must me a positive integer","\\begin{"+k.name+"}"]);p>0;)o+="rl",m.push("0em 0em"),p--;if(m=m.join(" "),h)return this.AMSarray(k,i,h,o,m);var l=this.Array.call(this,k,null,null,o,m,".5em","D");return this.setArrayAlign(l,j)},EquationBegin:function(h,i){return this.checkEqnEnv(),this.stack.global.forcetag=i&&"none"!==a.autoNumber,h},EquationStar:function(h,i){return this.stack.global.tagged=!0,i},checkEqnEnv:function(){this.stack.global.eqnenv&&g.Error(["ErroneousNestingEq","Erroneous nesting of equation structures"]),this.stack.global.eqnenv=!0},MultiIntegral:function(h,l){var k=this.GetNext();if("\\"===k){var j=this.i;k=this.GetArgument(h),this.i=j,"\\limits"===k&&(l="\\idotsint"===h?"\\!\\!\\mathop{\\,\\,"+l+"}":"\\!\\!\\!\\mathop{\\,\\,\\,"+l+"}")}this.string=l+" "+this.string.slice(this.i),this.i=0},xArrow:function(j,n,m,h){var k={width:"+"+(m+h)+"mu",lspace:m+"mu"},o=this.GetBrackets(j),p=this.ParseArg(j),q=b.mo(b.chars(String.fromCharCode(n))).With({stretchy:!0,texClass:b.TEXCLASS.REL}),i=b.munderover(q);i.SetData(i.over,b.mpadded(p).With(k).With({voffset:".15em"})),o&&(o=g.Parse(o,this.stack.env).mml(),i.SetData(i.under,b.mpadded(o).With(k).With({voffset:"-.24em"}))),this.Push(i.With({subsupOK:!0}))},GetDelimiterArg:function(h){var i=this.trimSpaces(this.GetArgument(h));return""==i?null:d.delimiter[i]?i:void g.Error(["MissingOrUnrecognizedDelim","Missing or unrecognized delimiter for %1",h])},GetStar:function(){var h="*"===this.GetNext();return h&&this.i++,h}}),e.Augment({autoTag:function(){var i=this.global;if(!i.notag){f.number++,i.tagID=a.formatNumber(f.number.toString());var h=g.Parse("\\text{"+a.formatTag(i.tagID)+"}",{}).mml();i.tag=b.mtd(h).With({id:a.formatID(i.tagID)})}},getTag:function(){var l=this.global,j=l.tag;if(l.tagged=!0,l.label&&(a.useLabelIds&&(j.id=a.formatID(l.label)),f.eqlabels[l.label]={tag:l.tagID,id:j.id}),document.getElementById(j.id)||f.IDs[j.id]||f.eqIDs[j.id]){var h,k=0;do k++,h=j.id+"_"+k;while(document.getElementById(h)||f.IDs[h]||f.eqIDs[h]);j.id=h,l.label&&(f.eqlabels[l.label].id=h)}return f.eqIDs[j.id]=1,this.clearTag(),j},clearTag:function(){var h=this.global;delete h.tag,delete h.tagID,delete h.label},fixInitialMO:function(k){for(var j=0,h=k.length;h>j;j++)if(k[j]&&"mspace"!==k[j].type&&("texatom"!==k[j].type||k[j].data[0]&&k[j].data[0].data.length)){k[j].isEmbellished()&&k.unshift(b.mi());break}}}),e.multline=e.array.Subclass({type:"multline",Init:function(i,h){this.SUPER(arguments).Init.apply(this),this.numbered=i&&"none"!==a.autoNumber,this.save={notag:h.global.notag},h.global.tagged=!i&&!h.global.forcetag},EndEntry:function(){this.table.length&&this.fixInitialMO(this.data);var h=b.mtd.apply(b,this.data);this.data.shove&&(h.columnalign=this.data.shove),this.row.push(h),this.data=[]},EndRow:function(){1!=this.row.length&&g.Error(["MultlineRowsOneCol","The rows within the %1 environment must have exactly one column","multline"]),this.table.push(this.row),this.row=[]},EndTable:function(){if(this.SUPER(arguments).EndTable.call(this),this.table.length){var l,j=this.table.length-1,k=-1;for(this.table[0][0].columnalign||(this.table[0][0].columnalign=b.ALIGN.LEFT),this.table[j][0].columnalign||(this.table[j][0].columnalign=b.ALIGN.RIGHT),!this.global.tag&&this.numbered&&this.autoTag(),this.global.tag&&!this.global.notags&&(k="left"===this.arraydef.side?0:this.table.length-1,this.table[k]=[this.getTag()].concat(this.table[k])),l=0,j=this.table.length;j>l;l++){var h=l===k?b.mlabeledtr:b.mtr;this.table[l]=h.apply(b,this.table[l])}}this.global.notag=this.save.notag}}),e.AMSarray=e.array.Subclass({type:"AMSarray",Init:function(k,j,i,h){this.SUPER(arguments).Init.apply(this),this.numbered=j&&"none"!==a.autoNumber,this.save={notags:h.global.notags,notag:h.global.notag},h.global.notags=i?null:k,h.global.tagged=!j&&!h.global.forcetag},EndEntry:function(){this.row.length&&this.fixInitialMO(this.data),this.row.push(b.mtd.apply(b,this.data)),this.data=[]},EndRow:function(){var h=b.mtr;!this.global.tag&&this.numbered&&this.autoTag(),this.global.tag&&!this.global.notags?(this.row=[this.getTag()].concat(this.row),h=b.mlabeledtr):this.clearTag(),this.numbered&&delete this.global.notag,this.table.push(h.apply(b,this.row)),this.row=[]},EndTable:function(){this.SUPER(arguments).EndTable.call(this),this.global.notags=this.save.notags,this.global.notag=this.save.notag}}),e.start.Augment({oldCheckItem:e.start.prototype.checkItem,checkItem:function(j){if("stop"===j.type){var h=this.mmlData(),i=this.global;if(!f.display||i.tag||i.tagged||i.isInner||"all"!==a.autoNumber&&!i.forcetag||this.autoTag(),i.tag){var l=[this.getTag(),b.mtd(h)],k={side:g.config.TagSide,minlabelspacing:g.config.TagIndent,columnalign:h.displayAlign,displaystyle:"inherit"};h.displayAlign===b.INDENTALIGN.LEFT?(k.width="100%","0"!==h.displayIndent&&(k.columnwidth=h.displayIndent+" fit",k.columnspacing="0",l=[l[0],b.mtd(),l[1]])):h.displayAlign===b.INDENTALIGN.RIGHT&&(k.width="100%","0"!==h.displayIndent&&(k.columnwidth="fit "+h.displayIndent,k.columnspacing="0",l[2]=b.mtd())),h=b.mtable(b.mlabeledtr.apply(b,l)).With(k)}return e.mml(h)}return this.oldCheckItem.call(this,j)}}),g.prefilterHooks.Add(function(h){f.display=h.display,f.number=f.startNumber,f.eqlabels=f.eqIDs={},f.badref=!1,f.refUpdate&&(f.number=h.script.MathJax.startNumber)}),g.postfilterHooks.Add(function(h){h.script.MathJax.startNumber=f.startNumber,f.startNumber=f.number,MathJax.Hub.Insert(f.IDs,f.eqIDs),MathJax.Hub.Insert(f.labels,f.eqlabels),f.badref&&!h.math.texError&&f.refs.push(h.script)},100),MathJax.Hub.Register.MessageHook("Begin Math Input",function(){f.refs=[],f.refUpdate=!1}),MathJax.Hub.Register.MessageHook("End Math Input",function(){if(f.refs.length){f.refUpdate=!0;for(var j=0,h=f.refs.length;h>j;j++)f.refs[j].MathJax.state=MathJax.ElementJax.STATE.UPDATE;return MathJax.Hub.processInput({scripts:f.refs,start:(new Date).getTime(),i:0,j:0,jax:{},jaxIDs:[]})}return null}),g.resetEquationNumbers=function(i,h){f.startNumber=i||0,h||(f.labels=f.IDs={})},MathJax.Hub.Startup.signal.Post("TeX AMSmath Ready")}),MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/AMSmath.js"),MathJax.Extension["TeX/AMSsymbols"]={version:"2.5.0"},MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var a=MathJax.ElementJax.mml,b=MathJax.InputJax.TeX.Definitions;b.Add({mathchar0mi:{digamma:"03DD",varkappa:"03F0",varGamma:["0393",{mathvariant:a.VARIANT.ITALIC}],varDelta:["0394",{mathvariant:a.VARIANT.ITALIC}],varTheta:["0398",{mathvariant:a.VARIANT.ITALIC}],varLambda:["039B",{mathvariant:a.VARIANT.ITALIC}],varXi:["039E",{mathvariant:a.VARIANT.ITALIC}],varPi:["03A0",{mathvariant:a.VARIANT.ITALIC}],varSigma:["03A3",{mathvariant:a.VARIANT.ITALIC}],varUpsilon:["03A5",{mathvariant:a.VARIANT.ITALIC}],varPhi:["03A6",{mathvariant:a.VARIANT.ITALIC}],varPsi:["03A8",{mathvariant:a.VARIANT.ITALIC}],varOmega:["03A9",{mathvariant:a.VARIANT.ITALIC}],beth:"2136",gimel:"2137",daleth:"2138",backprime:["2035",{variantForm:!0}],hslash:"210F",varnothing:["2205",{variantForm:!0}],blacktriangle:"25B4",triangledown:["25BD",{variantForm:!0}],blacktriangledown:"25BE",square:"25FB",Box:"25FB",blacksquare:"25FC",lozenge:"25CA",Diamond:"25CA",blacklozenge:"29EB",circledS:["24C8",{mathvariant:a.VARIANT.NORMAL}],bigstar:"2605",sphericalangle:"2222",measuredangle:"2221",nexists:"2204",complement:"2201",mho:"2127",eth:["00F0",{mathvariant:a.VARIANT.NORMAL}],Finv:"2132",diagup:"2571",Game:"2141",diagdown:"2572",Bbbk:["006B",{mathvariant:a.VARIANT.DOUBLESTRUCK}],yen:"00A5",circledR:"00AE",checkmark:"2713",maltese:"2720"},mathchar0mo:{dotplus:"2214",ltimes:"22C9",smallsetminus:"2216",rtimes:"22CA",Cap:"22D2",doublecap:"22D2",leftthreetimes:"22CB",Cup:"22D3",doublecup:"22D3",rightthreetimes:"22CC",barwedge:"22BC",curlywedge:"22CF",veebar:"22BB",curlyvee:"22CE",doublebarwedge:"2A5E",boxminus:"229F",circleddash:"229D",boxtimes:"22A0",circledast:"229B",boxdot:"22A1",circledcirc:"229A",boxplus:"229E",centerdot:"22C5",divideontimes:"22C7",intercal:"22BA",leqq:"2266",geqq:"2267",leqslant:"2A7D",geqslant:"2A7E",eqslantless:"2A95",eqslantgtr:"2A96",lesssim:"2272",gtrsim:"2273",lessapprox:"2A85",gtrapprox:"2A86",approxeq:"224A",lessdot:"22D6",gtrdot:"22D7",lll:"22D8",llless:"22D8",ggg:"22D9",gggtr:"22D9",lessgtr:"2276",gtrless:"2277",lesseqgtr:"22DA",gtreqless:"22DB",lesseqqgtr:"2A8B",gtreqqless:"2A8C",doteqdot:"2251",Doteq:"2251",eqcirc:"2256",risingdotseq:"2253",circeq:"2257",fallingdotseq:"2252",triangleq:"225C",backsim:"223D",thicksim:["223C",{variantForm:!0}],backsimeq:"22CD",thickapprox:["2248",{variantForm:!0}],subseteqq:"2AC5",supseteqq:"2AC6",Subset:"22D0",Supset:"22D1",sqsubset:"228F",sqsupset:"2290",preccurlyeq:"227C",succcurlyeq:"227D",curlyeqprec:"22DE",curlyeqsucc:"22DF",precsim:"227E",succsim:"227F",precapprox:"2AB7",succapprox:"2AB8",vartriangleleft:"22B2",lhd:"22B2",vartriangleright:"22B3",rhd:"22B3",trianglelefteq:"22B4",unlhd:"22B4",trianglerighteq:"22B5",unrhd:"22B5",vDash:"22A8",Vdash:"22A9",Vvdash:"22AA",smallsmile:["2323",{variantForm:!0}],shortmid:["2223",{variantForm:!0}],smallfrown:["2322",{variantForm:!0}],shortparallel:["2225",{variantForm:!0}],bumpeq:"224F",between:"226C",Bumpeq:"224E",pitchfork:"22D4",varpropto:"221D",backepsilon:"220D",blacktriangleleft:"25C2",blacktriangleright:"25B8",therefore:"2234",because:"2235",eqsim:"2242",vartriangle:["25B3",{variantForm:!0}],Join:"22C8",nless:"226E",ngtr:"226F",nleq:"2270",ngeq:"2271",nleqslant:["2A87",{variantForm:!0}],ngeqslant:["2A88",{variantForm:!0}],nleqq:["2270",{variantForm:!0}],ngeqq:["2271",{variantForm:!0}],lneq:"2A87",gneq:"2A88",lneqq:"2268",gneqq:"2269",lvertneqq:["2268",{variantForm:!0}],gvertneqq:["2269",{variantForm:!0}],lnsim:"22E6",gnsim:"22E7",lnapprox:"2A89",gnapprox:"2A8A",nprec:"2280",nsucc:"2281",npreceq:["22E0",{variantForm:!0}],nsucceq:["22E1",{variantForm:!0}],precneqq:"2AB5",succneqq:"2AB6",precnsim:"22E8",succnsim:"22E9",precnapprox:"2AB9",succnapprox:"2ABA",nsim:"2241",ncong:"2246",nshortmid:["2224",{variantForm:!0}],nshortparallel:["2226",{variantForm:!0}],nmid:"2224",nparallel:"2226",nvdash:"22AC",nvDash:"22AD",nVdash:"22AE",nVDash:"22AF",ntriangleleft:"22EA",ntriangleright:"22EB",ntrianglelefteq:"22EC",ntrianglerighteq:"22ED",nsubseteq:"2288",nsupseteq:"2289",nsubseteqq:["2288",{variantForm:!0}],nsupseteqq:["2289",{variantForm:!0}],subsetneq:"228A",supsetneq:"228B",varsubsetneq:["228A",{variantForm:!0}],varsupsetneq:["228B",{variantForm:!0}],subsetneqq:"2ACB",supsetneqq:"2ACC",varsubsetneqq:["2ACB",{variantForm:!0}],varsupsetneqq:["2ACC",{variantForm:!0}],leftleftarrows:"21C7",rightrightarrows:"21C9",leftrightarrows:"21C6",rightleftarrows:"21C4",Lleftarrow:"21DA",Rrightarrow:"21DB",twoheadleftarrow:"219E",twoheadrightarrow:"21A0",leftarrowtail:"21A2",rightarrowtail:"21A3",looparrowleft:"21AB",looparrowright:"21AC",leftrightharpoons:"21CB",rightleftharpoons:["21CC",{variantForm:!0}],curvearrowleft:"21B6",curvearrowright:"21B7",circlearrowleft:"21BA",circlearrowright:"21BB",Lsh:"21B0",Rsh:"21B1",upuparrows:"21C8",downdownarrows:"21CA",upharpoonleft:"21BF",upharpoonright:"21BE",downharpoonleft:"21C3",restriction:"21BE",multimap:"22B8",downharpoonright:"21C2",leftrightsquigarrow:"21AD",rightsquigarrow:"21DD",leadsto:"21DD",dashrightarrow:"21E2",dashleftarrow:"21E0",nleftarrow:"219A",nrightarrow:"219B",nLeftarrow:"21CD",nRightarrow:"21CF",nleftrightarrow:"21AE",nLeftrightarrow:"21CE"},delimiter:{"\\ulcorner":"231C","\\urcorner":"231D","\\llcorner":"231E","\\lrcorner":"231F"},macros:{implies:["Macro","\\;\\Longrightarrow\\;"],impliedby:["Macro","\\;\\Longleftarrow\\;"]}},null,!0);
var c=a.mo.OPTYPES.REL;MathJax.Hub.Insert(a.mo.prototype,{OPTABLE:{infix:{"⌢":c,"⌣":c,"△":c,"":c,"":c,"":c,"":c,"":c,"":c,"":c,"":c,"":c,"":c,"":c,"":c,"":c,"":c,"":c,"":c}}}),MathJax.Hub.Startup.signal.Post("TeX AMSsymbols Ready")}),MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/AMSsymbols.js"),MathJax.Hub.Config({config:[],styleSheets:[],styles:{},jax:["input/TeX","output/HTML-CSS"],extensions:["tex2jax.js"],preJax:null,postJax:null,preRemoveClass:"MathJax_Preview",showProcessingMessages:!0,messageStyle:"none",displayAlign:"center",displayIndent:"0",delayStartupUntil:"none",skipStartupTypeset:!0,elements:[],positionToHash:!0,showMathMenu:!1,showMathMenuMSIE:!1,menuSettings:{zoom:"None",CTRL:!1,ALT:!1,CMD:!1,Shift:!1,zscale:"200%",font:"Auto",context:"MathJax",mpContext:!1,mpMouse:!1,texHints:!0,semantics:!1},errorSettings:{message:["[",["MathProcessingError","Math Processing Error"],"]"],style:{color:"#CC0000","font-style":"italic"}},tex2jax:{inlineMath:[["\\(","\\)"]],displayMath:[["$$","$$"],["\\[","\\]"]],balanceBraces:!0,skipTags:["script","noscript","style","textarea","pre","code","annotation","annotation-xml"],ignoreClass:"tex2jax_ignore",processClass:"tex2jax_process",processEscapes:!1,processEnvironments:!0,processRefs:!0,preview:"TeX"},asciimath2jax:{delimiters:[["`","`"]],skipTags:["script","noscript","style","textarea","pre","code","annotation","annotation-xml"],ignoreClass:"asciimath2jax_ignore",processClass:"asciimath2jax_process",preview:"AsciiMath"},mml2jax:{preview:"mathml"},jsMath2jax:{preview:"TeX"},TeX:{TagSide:"right",TagIndent:"0.8em",MultLineWidth:"85%",Macros:{},equationNumbers:{autoNumber:"none",useLabelIds:!0},noErrors:{disabled:!1,multiLine:!0,inlineDelimiters:["",""],style:{"font-size":"90%","text-align":"left",color:"black",padding:"1px 3px",border:"1px solid"}},noUndefined:{disabled:!1,attributes:{mathcolor:"red"}},unicode:{fonts:"STIXGeneral,'Arial Unicode MS'"}},AsciiMath:{fixphi:!0,useMathMLspacing:!0,displaystyle:!0,decimal:"."},MathML:{useMathMLspacing:!1},"HTML-CSS":{scale:100,minScaleAdjust:50,availableFonts:["STIX","TeX"],preferredFont:"TeX",webFont:"TeX",imageFont:"TeX",undefinedFamily:"STIXGeneral,'Arial Unicode MS',serif",mtextFontInherit:!1,EqnChunk:50,EqnChunkFactor:1.5,EqnChunkDelay:100,matchFontHeight:!0,noReflows:!0,linebreaks:{automatic:!1,width:"container"},styles:{},tooltip:{delayPost:600,delayClear:600,offsetX:10,offsetY:5}},NativeMML:{scale:100,minScaleAdjust:50,matchFontHeight:!0,styles:{}},SVG:{scale:100,minScaleAdjust:50,font:"TeX",blacker:10,undefinedFamily:"STIXGeneral,'Arial Unicode MS',serif",mtextFontInherit:!1,addMMLclasses:!1,EqnChunk:50,EqnChunkFactor:1.5,EqnChunkDelay:100,matchFontHeight:!0,linebreaks:{automatic:!1,width:"container"},merrorStyle:{fontSize:"90%",color:"#C00",background:"#FF8",border:"1px solid #C00",padding:"3px"},styles:{},tooltip:{delayPost:600,delayClear:600,offsetX:10,offsetY:5}},MathMenu:{delay:150,helpURL:"http://www.mathjax.org/help-v2/user/",showRenderer:!0,showMathPlayer:!0,showFontMenu:!1,showContext:!1,showDiscoverable:!1,semanticsAnnotations:{TeX:["TeX","LaTeX","application/x-tex"],StarMath:["StarMath 5.0"],Maple:["Maple"],ContentMathML:["MathML-Content","application/mathml-content+xml"],OpenMath:["OpenMath"]},windowSettings:{status:"no",toolbar:"no",locationbar:"no",menubar:"no",directories:"no",personalbar:"no",resizable:"yes",scrollbars:"yes",width:100,height:50},styles:{}},MathEvents:{hover:500},MMLorHTML:{prefer:{MSIE:"HTML",Firefox:"HTML",Opera:"HTML",Safari:"HTML",Chrome:"HTML",other:"HTML"}}}),MathJax.Ajax.loadComplete("[MathJax]/config/config.js");