(Navigation={
	
	jsHistory : [],
	regExpValidUrl : new RegExp (location.origin),
	init : function(){
		var self = this;
		window.addEventListener ("load", function(){
			self.updateLinks();
		});
		// TODO V2 ajoute à l'historique javascript le contenu dynamique actuel de la page courante
	},
	updateLinks : function(){
		var as = document.getElementsByTagName("a");
		for (var i=0, nbA = as.length; i < nbA; i++) {
			as[i].addEventListener("click", function(e) {
				if (e.shiftKey || e.ctrlKey || e.metaKey || e.which == 2) {
					return true;
				}
				if (Navigation.updateHistory(e.currentTarget.href)) {
					e.preventDefault();
				}
			})
		}
	},
	updateHistory : function(url){
		// vérifie que l'on reste dans le même domaine
		if (this.validURL (url)) {
			// ajoute à l'historique du navigateur la page courante
			this.addToHistory (url);
			// évite de mettre à jour la page en fonction de l'historique JS
			var path = "/ajax" + url.substr(location.origin.length),
			   json = this.checkJSHistory(path);
			if (!json) {
				var self = this;
				json = this.askUpdate (path, function (response){
					self.jsHistory [url] = response;
					self.updatePage (response);
					self.updateLinks();
				});
			}
		}
		else {
			return false;
		}
		return true;
	},
	updatePage : function(json) {
		if (json) {
			var content = document.getElementById ("content");
			content.innerHTML = json.content;
		}
	},
	validateJSON : function(jsonText) {
		return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(jsonText.replace(/"(\\.|[^"\\])*"/g, ''))) && eval('(' + jsonText + ')');
	},
	askUpdate : function (path, resultFunction){
		var xhr = this.getXMLHttpRequest();
		if (xhr) {
			// TODO fait une demande AJAX au serveur pour la mise à jour de la page HTML
			xhr.open("GET", path, true);
			xhr.send(null);
			var self = this;
			xhr.onreadystatechange = function()
			{
				if (xhr.readyState == "4") {
					if (xhr.status == "200" || xhr.readyState == "304") {
						resultFunction (self.validateJSON(xhr.responseText));
					}
				}
			}
		}
	},
	checkJSHistory : function(url){
		// TODO V2 AJOUTER UN LAPS DE TEMPS LIMITE POUR LA DUREE DE VIE DE L'HISTORIQUE
		return this.jsHistory[url];
	},
	validURL : function (url){
		return this.regExpValidUrl.test(url);
	},
	addToHistory : function(url){
		if (history.pushState)
			history.pushState({}, "", url);
		else 
			alert('ERROR addToHistory : unknown function pushState');
	},
	getXMLHttpRequest : function() {
		var xhr = null;
		
		if (window.XMLHttpRequest || window.ActiveXObject) {
			if (window.ActiveXObject) {
				try {
					xhr = new ActiveXObject("Msxml2.XMLHTTP");
				} catch(e) {
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				}
			} else {
				xhr = new XMLHttpRequest(); 
			}
		} else {
			return null;
		}
		
		return xhr;
	}
}).init();
