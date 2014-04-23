// Author: Jorge Daniel Valverde Matarrita
// 2013

// --- Prototipos de Element --- //

;(function(){

	Element.prototype.appendAfter = function (referenceElement){
		var referenceSibiling;

		if(referenceElement.nextSibling){
			referenceSibiling = referenceElement.nextSibling;
		}

		referenceElement.parentNode.insertBefore(this, referenceSibiling);
		return this;
	}

	Element.prototype.appendBefore = function (referenceElement){
		referenceElement.parentNode.insertBefore(this, referenceElement);
		return this;
	}

	Element.prototype.get = function(selector){
	   var domResult = this.querySelectorAll(selector);

	   if(domResult.length > 1){
	      return domResult;
	   } else {
	      return domResult[0];
	   }
	}

	Document.prototype.get = Element.prototype.get;

	Element.prototype.append = function(child){
		
		this.appendChild( child );

		return this;
	}

	Element.prototype.appendTo = function(father){
		father.append(this);
		return this;
	}

	Element.prototype.prepend = function(child){

		if(this.firstChild){
			this.insertBefore(child, this.firstChild);
		} else {
			this.appendChild(child);
		}

		return this;
	}

	Element.prototype.prependTo = function(father){
		father.prepend(this);
		return this;
	}

	Element.prototype.getStyleProperty = function(props){
		var styleProperties = {},
			cantProps = props.split(' ').length;

		if(cantProps > 1){		
			var props = props.split(' '),
				i = 0,
				l = props.length,
				propertyList = new Array(l),
				computedStyle = window.getComputedStyle(this);

				for(;i<l;i++){
					propertyList[i] = computedStyle.getPropertyValue(props[i]);
				}

				return propertyList;
		} else { 
			return window.getComputedStyle(this).getPropertyValue(props);
		}
	}

	Element.prototype.data = function (data){
		return this.getAttribute('data-'+data);
	}

	Element.prototype.setAttributes = function (attributes){

		for(var attr in attributes){
			this.setAttribute(attr, attributes[attr]);
		}

		return this;
	}

	Element.prototype.removeAttributes = function (attributes){
		var i = 0,
			l = attributes.length || 1;

		for(;i<l;i++){
			this.removeAttribute(attributes[i]);
		}

		return this;
	}

	Element.prototype.hasClass = function(cls) {
		if( this.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')) ){
	 		return true;
		} else{
	 		return false;
	 	}
	}
	 
	Element.prototype.addClass = function(cls) {
		this.classList.add(cls);
		return this;
	}

	Element.prototype.removeClass = function(cls) {
		this.classList.remove(cls);
		return this;
	}

	Element.prototype.remove = function(){
		this.parentNode.removeChild(this);
		return this;
	}

	Element.prototype.void = function(){
		this.innerHTML = '';
		return this;
	}

	Element.prototype.cache = function(){
	// this function saves a copy of an element and then erase it from the live page.
		var cache = this;
		this.parentNode.removeChild(this);
		return cache;
	}

	Element.prototype.toggleClass = function(cls) {
		if (this.hasClass(cls)) {
	    	this.removeClass(cls);
		} else {
			this.addClass(cls);
		}
		return this;
	}

	Element.prototype.getAncestor = function(ancer){
		var el = this;
		for(var i=0;i<ancer;i++){
			el = el.parentNode;
		}
		return el;
	}

	Element.prototype.addEvent = function(eventName,listener,capture){
		capture = capture || false;
		this.addEventListener(eventName,listener,capture);
		return this;
	}

	// --- Prototipos NodeList --- //

	NodeList.prototype.addClass = function(cls) {
		
		var i = 0,
			l = this.length;

		for(;i<l;i++){
			this[i].classList.add(cls);
		}

		return this;
	}

	NodeList.prototype.indexOf = function( element ){
		
		var index = Array.prototype.slice.call(this).indexOf( element );

		return index;

	}	

	NodeList.prototype.removeClass = function(cls) {
		
		var i = 0,
			l = this.length;

		for(;i<l;i++){
			this[i].classList.remove(cls);
		}

		return this;
	}

	NodeList.prototype.setAttributes = function (attributes){
		var i = 0,
			l = this.length;

		for(;i<l;i++){		
			for(var attr in attributes){
				this[i].setAttribute(attr, attributes[attr]);
			}
		}

		return this;
	}

	NodeList.prototype.removeAttributes = function (attributes){
		var i = 0,
			l = this.length;

		for(;i<l;i++){		
			for(var attr in attributes){
				this[i].removeAttribute(attr, attributes[attr]);
			}
		}

		return this;
	}

	NodeList.prototype.find = function(){
		var i = 0, l = this.length;

		for(;i<l; i++){
			if(this[i] === value){
				return i;
			}
		}

		return false;;
	}

	NodeList.prototype.addEvent = function(e,listener,capture){

		capture = capture || false;

		for(var i=0, l=this.length; i<l; i++){
			this[i].addEventListener(e,listener,capture);
		}

		return this;
	}

	NodeList.prototype.cache = function(){
		var cache = this, i=0, l=this.length;

		for(;i<l;i++){
			this[i].parentNode.removeChild(this[i]);
		}

		return cache;
	}

	NodeList.prototype.void = function(){
		var i=0, l=this.length;

		for(;i<l;i++){
			this[i].void();
		}

		return this;

	}

	// --- Prototipos de Array --- //

	Array.prototype.addEvent = NodeList.prototype.addEvent;
	Array.prototype.find = NodeList.prototype.find;
	Array.prototype.cache = NodeList.prototype.cache;
	Array.prototype.void = NodeList.prototype.void;
	Array.prototype.addClass = NodeList.prototype.addClass;

	Array.prototype.sum =  function(){
		var i=0,
			l=this.length,
			sum = 0;

		for(; i<l; i++){
			sum += Number(this[i]);
		}

		return sum;
	}

	// --- Prototipos de Number --- //

	Number.prototype.percent = function(p) {
		return ( (this/p)*100 );
		// retorna cuanto porcentaje representa p en "this" cantidad.
	}

	Number.prototype.getContext = function(p) {
		return ( (this*100)/p );
		// retorna cuanto porcentaje representa "this" en p cantidad.
	}

	// --- Storage Prototypes --- //

	Storage.prototype.setJSON = function(key, value) {
	    this.setItem(key, JSON.stringify(value));
	}

	Storage.prototype.getJSON = function(key) {
	    var value = this.getItem(key);
	    return value && JSON.parse(value);
	}

	// --- Date Prototypes --- //

	Date.prototype.monthDays= function(){
	    var d= new Date(this.getFullYear(), this.getMonth()+1, 0);
	    return d.getDate();
	}

	Date.prototype.toDateInputValue = function() {
	    var local = new Date(this);
	    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
	    return local.toJSON().slice(0,10);
	}

})();

// --- Helpers --- //

function getObjectType(x){
	var type = Object.prototype.toString.call(x),
		l = type.length;
	return type.substring( 8, (l-1) );
}

function create(el,txtNode){

	switch( el.toLowerCase() ){
		case 'textnode' :
			return document.createTextNode(txtNode);
				break;
		case 'fragment' : 
			return document.createDocumentFragment();
				break;
		default :
			return document.createElement(el);
				break;
	}
}

function objectCreation(elements,cls){
	var i=  0, l = elemetns.length, objects = [];

	for(;i<l;i++){
		objects.push( new cls(elements[i]) );
	}

}

function matrix(col,row){
	row = row || col;
	var matrix = [];
	for(var i=0; i<col; i++){
		matrix[i] = new Array(row);
	}
	return matrix;
}

function random(min, max, decimals) {
	if(decimals){
		return Math.random()*(max-min)+min;
	} else {
    	return Math.floor(Math.random()*(max-min+1))+min;
	}
}

function log(x){ console.log(x); }