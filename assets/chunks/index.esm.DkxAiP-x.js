var a=new(function(){function i(){this.servicesIdentifierMap=new Map,this.registeredService=new Map}return i.prototype.registryService=function(e){var s=e.name;this.registeredService.has(s)||this.registeredService.set(s,e)},i.prototype.unregistryService=function(e){},i.prototype.getService=function(e,s,c){c===void 0&&(c="[DEFAULT_CATEGORY]");var n=this.servicesIdentifierMap.get(c);if(n==null)n=new Map,this.servicesIdentifierMap.set(c,n);else if((t=n.get(e))!=null)return t;var r=this.registeredService.get(e);if(r!=null){var t=r.serviceFactory(s);return n.set(e,t),t}return null},i}()),o=new(function(){function i(){}return i.prototype.registerApiProvider=function(e,s,c){this[e]=function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];return s(n)},c!=null&&function n(r,t){if(!(t instanceof Object))return t;switch(t.constructor){case Array:r=[];break;case Object:r===void 0&&(r={});break;case Date:return new Date(t.getTime());default:return t}for(var u in t)t.hasOwnProperty(u)&&(r[u]=n(r[u],t[u]));return r}(this[e],c)},i.prototype.registerInternalService=function(e){a.registryService(e)},i.prototype.getService=function(e,s,c){return a.getService(e,s,c)},i}());export{o as default};