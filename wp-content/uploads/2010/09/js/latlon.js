function LatLon(lat,lon,rad){if(typeof rad=='undefined')rad=6371;this._lat=lat;this._lon=lon;this._radius=rad;}
LatLon.prototype.distanceTo=function(point,precision){if(typeof precision=='undefined')precision=4;var R=this._radius;var lat1=this._lat.toRad(),lon1=this._lon.toRad();var lat2=point._lat.toRad(),lon2=point._lon.toRad();var dLat=lat2- lat1;var dLon=lon2- lon1;var a=Math.sin(dLat/2)*Math.sin(dLat/2)+
Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)*Math.sin(dLon/2);var c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));var d=R*c;return d.toPrecisionFixed(precision);}
LatLon.prototype.bearingTo=function(point){var lat1=this._lat.toRad(),lat2=point._lat.toRad();var dLon=(point._lon-this._lon).toRad();var y=Math.sin(dLon)*Math.cos(lat2);var x=Math.cos(lat1)*Math.sin(lat2)-
Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);var brng=Math.atan2(y,x);return(brng.toDeg()+360)%360;}
LatLon.prototype.finalBearingTo=function(point){var lat1=point._lat.toRad(),lat2=this._lat.toRad();var dLon=(this._lon-point._lon).toRad();var y=Math.sin(dLon)*Math.cos(lat2);var x=Math.cos(lat1)*Math.sin(lat2)-
Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);var brng=Math.atan2(y,x);return(brng.toDeg()+180)%360;}
LatLon.prototype.midpointTo=function(point){lat1=this._lat.toRad(),lon1=this._lon.toRad();lat2=point._lat.toRad();var dLon=(point._lon-this._lon).toRad();var Bx=Math.cos(lat2)*Math.cos(dLon);var By=Math.cos(lat2)*Math.sin(dLon);lat3=Math.atan2(Math.sin(lat1)+Math.sin(lat2),Math.sqrt((Math.cos(lat1)+Bx)*(Math.cos(lat1)+Bx)+ By*By));lon3=lon1+ Math.atan2(By,Math.cos(lat1)+ Bx);return new LatLon(lat3.toDeg(),lon3.toDeg());}
LatLon.prototype.destinationPoint=function(brng,dist){dist=dist/this._radius;brng=brng.toRad();var lat1=this._lat.toRad(),lon1=this._lon.toRad();var lat2=Math.asin(Math.sin(lat1)*Math.cos(dist)+
Math.cos(lat1)*Math.sin(dist)*Math.cos(brng));var lon2=lon1+ Math.atan2(Math.sin(brng)*Math.sin(dist)*Math.cos(lat1),Math.cos(dist)-Math.sin(lat1)*Math.sin(lat2));lon2=(lon2+3*Math.PI)%(2*Math.PI)- Math.PI;if(isNaN(lat2)||isNaN(lon2))return null;return new LatLon(lat2.toDeg(),lon2.toDeg());}
LatLon.intersection=function(p1,brng1,p2,brng2){lat1=p1._lat.toRad(),lon1=p1._lon.toRad();lat2=p2._lat.toRad(),lon2=p2._lon.toRad();brng13=brng1.toRad(),brng23=brng2.toRad();dLat=lat2-lat1,dLon=lon2-lon1;dist12=2*Math.asin(Math.sqrt(Math.sin(dLat/2)*Math.sin(dLat/2)+
Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)*Math.sin(dLon/2)));if(dist12==0)return null;brngA=Math.acos((Math.sin(lat2)- Math.sin(lat1)*Math.cos(dist12))/ 
(Math.sin(dist12)*Math.cos(lat1)));if(isNaN(brngA))brngA=0;brngB=Math.acos((Math.sin(lat1)- Math.sin(lat2)*Math.cos(dist12))/ 
(Math.sin(dist12)*Math.cos(lat2)));if(Math.sin(lon2-lon1)>0){brng12=brngA;brng21=2*Math.PI- brngB;}else{brng12=2*Math.PI- brngA;brng21=brngB;}
alpha1=(brng13- brng12+ Math.PI)%(2*Math.PI)- Math.PI;alpha2=(brng21- brng23+ Math.PI)%(2*Math.PI)- Math.PI;if(Math.sin(alpha1)==0&&Math.sin(alpha2)==0)return null;if(Math.sin(alpha1)*Math.sin(alpha2)<0)return null;alpha3=Math.acos(-Math.cos(alpha1)*Math.cos(alpha2)+
Math.sin(alpha1)*Math.sin(alpha2)*Math.cos(dist12));dist13=Math.atan2(Math.sin(dist12)*Math.sin(alpha1)*Math.sin(alpha2),Math.cos(alpha2)+Math.cos(alpha1)*Math.cos(alpha3))
lat3=Math.asin(Math.sin(lat1)*Math.cos(dist13)+
Math.cos(lat1)*Math.sin(dist13)*Math.cos(brng13));dLon13=Math.atan2(Math.sin(brng13)*Math.sin(dist13)*Math.cos(lat1),Math.cos(dist13)-Math.sin(lat1)*Math.sin(lat3));lon3=lon1+dLon13;lon3=(lon3+Math.PI)%(2*Math.PI)- Math.PI;return new LatLon(lat3.toDeg(),lon3.toDeg());}
LatLon.prototype.rhumbDistanceTo=function(point){var R=this._radius;var lat1=this._lat.toRad(),lat2=point._lat.toRad();var dLat=(point._lat-this._lat).toRad();var dLon=Math.abs(point._lon-this._lon).toRad();var dPhi=Math.log(Math.tan(lat2/2+Math.PI/4)/Math.tan(lat1/2+Math.PI/4));
var q=(!isNaN(dLat/dPhi))?dLat/dPhi:Math.cos(lat1);if(dLon>Math.PI)dLon=2*Math.PI- dLon;var dist=Math.sqrt(dLat*dLat+ q*q*dLon*dLon)*R;return dist.toPrecisionFixed(4);}
LatLon.prototype.rhumbBearingTo=function(point){var lat1=this._lat.toRad(),lat2=point._lat.toRad();var dLon=(point._lon-this._lon).toRad();var dPhi=Math.log(Math.tan(lat2/2+Math.PI/4)/Math.tan(lat1/2+Math.PI/4));
if(Math.abs(dLon)>Math.PI)dLon=dLon>0?-(2*Math.PI-dLon):(2*Math.PI+dLon);var brng=Math.atan2(dLon,dPhi);return(brng.toDeg()+360)%360;}
LatLon.prototype.rhumbDestinationPoint=function(brng,dist){var R=this._radius;var d=parseFloat(dist)/R;  // d = angular distance covered on earth's surface
  var lat1 = this._lat.toRad(), lon1 = this._lon.toRad();
  brng = brng.toRad();

  var lat2 = lat1 + d*Math.cos(brng);
  var dLat = lat2-lat1;
  var dPhi = Math.log(Math.tan(lat2/2+Math.PI/4)/Math.tan(lat1/2+Math.PI/4));
  var q = (!isNaN(dLat/dPhi)) ? dLat/dPhi : Math.cos(lat1);  // E-W line gives dPhi=0
  var dLon = d*Math.sin(brng)/q;
  // check for some daft bugger going past the pole
  if (Math.abs(lat2) > Math.PI/2) lat2 = lat2>0 ? Math.PI-lat2 : -(Math.PI-lat2);
  lon2 = (lon1+dLon+3*Math.PI)%(2*Math.PI) - Math.PI;
 
  return new LatLon(lat2.toDeg(), lon2.toDeg());
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */


/**
 * Returns the latitude of this point; signed numeric degrees if no format, otherwise format & dp 
 * as per Geo.toLat()
 *
 * @param   {String} [format]: Return value as 'd', 'dm', 'dms'
 * @param   {Number} [dp=0|2|4]: No of decimal places to display
 * @returns {Number|String} Numeric degrees if no format specified, otherwise deg/min/sec
 *
 * @requires Geo
 */
LatLon.prototype.lat = function(format, dp) {
  if (typeof format == 'undefined') return this._lat;
  
  return Geo.toLat(this._lat, format, dp);
}

/**
 * Returns the longitude of this point; signed numeric degrees if no format, otherwise format & dp 
 * as per Geo.toLon()
 *
 * @param   {String} [format]: Return value as 'd', 'dm', 'dms'
 * @param   {Number} [dp=0|2|4]: No of decimal places to display
 * @returns {Number|String} Numeric degrees if no format specified, otherwise deg/min/sec
 *
 * @requires Geo
 */
LatLon.prototype.lon = function(format, dp) {
  if (typeof format == 'undefined') return this._lon;
  
  return Geo.toLon(this._lon, format, dp);
}

/**
 * Returns a string representation of this point; format and dp as per lat()/lon()
 *
 * @param   {String} [format]: Return value as 'd', 'dm', 'dms'
 * @param   {Number} [dp=0|2|4]: No of decimal places to display
 * @returns {String} Comma-separated latitude/longitude
 *
 * @requires Geo
 */
LatLon.prototype.toString = function(format, dp) {
  if (typeof format == 'undefined') format = 'dms';
  
  return Geo.toLat(this._lat, format, dp) + ', ' + Geo.toLon(this._lon, format, dp);
}


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

// extend Number object with methods for converting degrees/radians

/** Convert numeric degrees to radians */
if (typeof(String.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}

/** Convert radians to numeric (signed) degrees */
if (typeof(String.prototype.toDeg) === "undefined") {
  Number.prototype.toDeg = function() {
    return this * 180 / Math.PI;
  }
}

/** 
 * Format the significant digits of a number, using only fixed-point notation (no exponential)
 * 
 * @param   {Number} precision: Number of significant digits to appear in the returned string
 * @returns {String} A string representation of number which contains precision significant digits
 */
if (typeof(Number.prototype.toPrecisionFixed) === "undefined") {
  Number.prototype.toPrecisionFixed = function(precision) {
    var numb = this < 0 ? -this : this;  // can't take log of -ve number...
var sign=this<0?'-':'';if(numb==0){n='0.';while(precision--)n+='0';return n};var scale=Math.ceil(Math.log(numb)*Math.LOG10E);var n=String(Math.round(numb*Math.pow(10,precision-scale)));if(scale>0){l=scale- n.length;while(l-->0)n=n+'0';if(scale<n.length)n=n.slice(0,scale)+'.'+ n.slice(scale);}else{while(scale++<0)n='0'+ n;n='0.'+ n;}
return sign+ n;}}