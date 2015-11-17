var piano=function(k){"use strict";function createKeyboard(parent,target){var _k=clone(parent);delete _k.triggers,delete _k.layouts;var datas=target.dataset,options={};_k.shift=!1,datas.pianoPosition?datas.pianoPosition.indexOf("absolute")>-1?options.position=datas.pianoPosition.replace(/absolute,\s/gi,"").split(","):options.position=datas.pianoPosition?datas.pianoPosition.split(","):[]:(console.warn("It seems you have incorrect values in your data-piano-position attribute on element: ",target),options.position=[]),options.layout=datas.pianoLayout,options.limit=datas.pianoLimit,options.animationIn=datas.pianoAnimationIn,options.animationOut=datas.pianoAnimationOut,options.scale=datas.pianoScale;var eventID=datas.pianoEventId,elementEvent=null;eventID&&(elementEvent=document.createEvent("Event"),elementEvent.initEvent(eventID,!0,!0)),_k.settings={position:{x:options.position[0]||"center",y:options.position[1]||"bottom"},layout:options.layout||"default",limit:options.limit||-1,submitEvent:elementEvent,animationIn:options.animationIn||"fadeInUp",animationOut:options.animationOut||"fadeOutDown",scale:options.scale||1},addMultipleListeners(["click","touchdown"],target,function(event){k.clearKeyboards(),k.currentTarget=event.target,displayKeyboard(_k)})}function displayKeyboard(instance){var _k=k;_k.currentKeyboard=instance;var rowsContainer=document.createElement("div");rowsContainer.className="piano-rows";var layout=k.layouts[instance.settings.layout],rows=[];rows.push(document.createElement("ul"));for(var i in layout){var li=document.createElement("li");if("break"==layout[i])rowsContainer.appendChild(rows[rows.length-1]),rows.push(document.createElement("ul"));else{var key=document.createElement("button");"object"==typeof layout[i][0]?(li.className=layout[i][0].name,key.className="key "+layout[i][0].name,key.innerHTML=layout[i][0].value,key.dataset.pianoKey=layout[i][0].name):(key.className="key "+layout[i],key.textContent=layout[i][0],key.dataset.pianoKey=layout[i][0]),addMultipleListeners(_k.triggerName,key,function(event){_k.debounce(keyPressed(event),300,!1)}),li.appendChild(key)}rowsContainer.appendChild(rows[rows.length-1]),rows[rows.length-1].appendChild(li)}isNaN(instance.settings.position.x)||isNaN(instance.settings.position.y)?(k.container.className+=" "+instance.settings.position.x,k.container.className+=" "+instance.settings.position.y):(k.container.style.left=instance.settings.position.x+"px",k.container.style.top=instance.settings.position.y+"px"),k.container.classList.remove(k.currentKeyboard.settings.animationOut),k.container.appendChild(rowsContainer),k.container.classList.add(k.currentKeyboard.settings.animationIn),k.container.querySelector(".piano-rows").style["-webkit-transform"]="scale("+_k.currentKeyboard.settings.scale+")",k.container.querySelector(".piano-rows").style["-moz-transform"]="scale("+_k.currentKeyboard.settings.scale+")",k.container.querySelector(".piano-rows").style["-ms-transform"]="scale("+_k.currentKeyboard.settings.scale+")",k.container.querySelector(".piano-rows").style["-o-transform"]="scale("+_k.currentKeyboard.settings.scale+")",k.container.querySelector(".piano-rows").style.transform="scale("+_k.currentKeyboard.settings.scale+")",document.body.classList.add("piano-open")}function keyPressed(event){var target=event.target,value=target.textContent,input=k.currentTarget,cursor=input.selectionStart,end=input.selectionEnd,diff=end-cursor||1,offset=1,limit=k.currentKeyboard.settings.limit,submitEvent=k.currentKeyboard.settings.submitEvent;if(/del/i.test(target.className)){var deleteOffset=cursor?-1:0;input.value=insertToString(input.value,cursor+deleteOffset,diff,""),offset=-1}else/space/i.test(target.className)?(input.value.length<=limit||-1==limit)&&(input.value=insertToString(input.value,cursor,diff-1," ")):/shift/i.test(target.className)?k.switchCase():/larr/i.test(target.className)?offset=-1:/rarr/i.test(target.className)?offset=1:/hide/i.test(target.className)?k.hideKeyboard():/submit/i.test(target.className)?submitEvent?input.dispatchEvent(submitEvent):console.warn("You did not provide a data-piano-event-id attribute."):(input.value.length<=limit||-1==limit)&&(input.value=insertToString(input.value,cursor,diff-1,value));if(input.selectionStart=cursor+offset,input.selectionEnd=cursor+offset,document.createEvent){var evt=document.createEvent("HTMLEvents");evt.initEvent("input",!1,!0),input.dispatchEvent(evt)}else input.fireEvent("input");input.focus()}function insertToString(str,index,count,add){return str.slice(0,index)+(add||"")+str.slice(index+count)}function addMultipleListeners(events,target,handler){events=events instanceof Array?events:[events];for(var i=0;i<events.length;i++)target.addEventListener(events[i],function(event){handler(event)})}function clone(src){var dest={};for(var key in src)dest[key]=src[key];return dest}var k={};return k.init=function(options){k.container=document.createElement("div"),k.container.id="piano",k.container.className="piano-container animated",console.log(options.triggers),k.triggerName=options.triggers||"click",k.triggers=document.querySelectorAll("[data-piano]");for(var i=0;i<k.triggers.length;i++)createKeyboard(k,k.triggers[i]);document.body.appendChild(k.container),addMultipleListeners(["click","touchdown"],document,function(event){""==event.target.dataset.piano||k.container.contains(event.target)||k.hideKeyboard()})},k.switchCase=function(){for(var shift=k.currentKeyboard.shift=!k.currentKeyboard.shift,keys=document.querySelectorAll(".piano-rows > ul > li"),layout=k.layouts[k.currentKeyboard.settings.layout],i=0;i<keys.length;i++){var target=keys[i].children[0];if(target){var value=target.textContent;layout[i].length>1&&layout[i][0].length>0?target.textContent=shift?layout[i][1]:layout[i][0]:target.textContent=shift?value.toUpperCase():value.toLowerCase()}}},k.hideKeyboard=function(){k.container.firstChild&&(k.container.classList.remove(k.currentKeyboard.settings.animationIn),k.container.classList.add(k.currentKeyboard.settings.animationOut),document.body.classList.remove("piano-open"))},k.clearKeyboards=function(){k.container.firstChild&&(k.container.firstChild.remove(),k.container.style.top=k.container.style.left="",k.container.className="piano-container animated",k.currentKeyboard=null)},k.debounce=function(func,wait,immediate){var timeout;return function(){var context=this,args=arguments,later=function(){timeout=null,immediate||func.apply(context,args)},callNow=immediate&&!timeout;clearTimeout(timeout),timeout=setTimeout(later,wait||200),callNow&&func.apply(context,args)}},k}(piano||{});!function(k){k.layouts=k.layouts||[],k.layouts["default"]=[["1","!"],["2","@"],["3","#"],["4","$"],["5","%"],["6","^"],["7","&"],["8","*"],["9","("],["0",")"],["-","_"],["=","+"],[{name:"del",value:"⌫"}],["break"],["q"],["w"],["e"],["r"],["t"],["y"],["u"],["i"],["o"],["p"],["[","{"],["]","}"],["\\","|"],["break"],["a"],["s"],["d"],["f"],["g"],["h"],["j"],["k"],["l"],[";",":"],["'",'"'],["break"],[{name:"shift",value:"↑"}],["z"],["x"],["c"],["v"],["b"],["n"],["m"],[",","<"],[".",">"],["/","?"],[{name:"shift",value:"↑"}],["break"],[{name:"larr",value:"<"}],[{name:"space",value:" "}],[{name:"rarr",value:">"}],[{name:"hide",value:"⌨"}]]}(piano||{});