/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var gen_from = 'pass';
var gen_compressed = false;
var gen_eckey = null;
var gen_pt = null;
var gen_ps_reset = false;
var TIMEOUT = 600;
var timeout = null;

var PUBLIC_KEY_VERSION = 0;
var PRIVATE_KEY_VERSION = 0x80;
var ADDRESS_URL_PREFIX = 'http://blockchain.info'

var MapToHex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

var AutoRandom = false;
var AutoRandomBin = false;
var AutCleanLog = true;
var AutoRandomOneBit = false;
var AutoRandomBinAlgo = false;
var LengthBitsSearch = {};
var MaxLengthBitsSearch = 0;
var FastAddrSearch = [];

var MaxPercByLen = [60.9, 37.5, 14.3, 9.1, 9.1, 5.2, 10.0, 3.9, 2, 1.8, 1, 0.5, 0.3, 0.2];
var MainCoofLen = 10;
var GlobalArLenBits = [];

var playSound = (function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
    return function() {     
        snd.play(); 
    }
})();


var Base64 = {
   _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
   //метод для кодировки в base64 на javascript
  encode : function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0
    input = Base64._utf8_encode(input);
       while (i < input.length) {
       chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
       enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
       if( isNaN(chr2) ) {
         enc3 = enc4 = 64;
      }else if( isNaN(chr3) ){
        enc4 = 64;
      }
       output = output +
      this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
      this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
     }
    return output;
  },
 
   //метод для раскодировки из base64
  decode : function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
     input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
     while (i < input.length) {
       enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));
       chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
       output = output + String.fromCharCode(chr1);
       if( enc3 != 64 ){
        output = output + String.fromCharCode(chr2);
      }
      if( enc4 != 64 ) {
        output = output + String.fromCharCode(chr3);
      }
   }
   output = Base64._utf8_decode(output);
     return output;
   },
   // метод для кодировки в utf8
  _utf8_encode : function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
       if( c < 128 ){
        utftext += String.fromCharCode(c);
      }else if( (c > 127) && (c < 2048) ){
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
     }
    return utftext;
 
  },
 
  //метод для раскодировки из urf8
  _utf8_decode : function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;
    while( i < utftext.length ){
      c = utftext.charCodeAt(i);
       if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      }else if( (c > 191) && (c < 224) ) {
        c2 = utftext.charCodeAt(i+1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      }else {
        c2 = utftext.charCodeAt(i+1);
        c3 = utftext.charCodeAt(i+2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
     }
     return string;
  }
 }


function array_rand ( input, num_req, Coof ) {	// Pick one or more random entries out of an array
	// 
	// +   original by: _argos

	var Indexes = [];
	var Ticks = num_req || 1;
        var R2;
        //alert(input);
        Ticks = (Math.floor(input.length/Coof)<Ticks)?Math.floor(input.length/Coof):Ticks;
        //alert("Tiks:"+ Ticks+ " LenAR:" + input.length + " LenFlooer:" + Math.floor(input.length/MainCoofLen))
        if ( input instanceof Array && Ticks <= Math.floor(input.length/Coof) ) {
            while ( true ) {
                if ( Indexes.length === Ticks || input.length<1) { break; }
                var Rand = getRandomInt(0, input.length-1);
                //alert("Rand:" + Rand + " OldLen:".input.length);
                Indexes.push (input[Rand]);
                R2 = Math.floor(Rand/Coof)*Coof;
                //alert("Rand:" + Rand + " R2:" + R2);
                input.splice(R2, Coof);
            }
        } else {
            Ticks = 1;
            Indexes = null;
	}
        return ( ( Ticks == 1 ) ? Indexes.join ( ) : Indexes );
}


function arrayClone (arr) {
	var i, copy;
	
	if (Array.isArray(arr)) {
		copy = arr.slice(0);
		for (i = 0; i < copy.length; i++) {
			copy[i] = arrayClone(copy[i]);
		}
		return copy;
	} else if(typeof arr === 'object') {
		throw 'Cannot clone array containing an object!';
	} else {
		return arr;
	}
}

function array_rand_old ( input, num_req ) {	// Pick one or more random entries out of an array
	// 
	// +   original by: _argos

	var Indexes = [];
	var Ticks = num_req || 1;
        Ticks = (Indexes.length>Ticks)?Indexes.length:Ticks;
	var Check = {
		Duplicate	: function ( input, value ) {
			var Exist = false, Index = 0;
			while ( Index < input.length ) {
				if ( input [ Index ] === value ) {
					Exist = true;
					break;
				}
				Index++;
			}
			return Exist;
		}
	};

	if ( input instanceof Array && Ticks <= input.length ) {
		while ( true ) {
			var Rand = Math.floor ( ( Math.random ( ) * input.length ) );
			if ( Indexes.length === Ticks ) { break; }
			if ( !Check.Duplicate ( Indexes, Rand ) ) { Indexes.push ( input[Rand] ); }
                        //if ( !Check.Duplicate ( Indexes, Rand ) ) { Indexes.push ( Rand ); }
		}
	} else {
		Indexes = null;
	}

	return ( ( Ticks == 1 ) ? Indexes.join ( ) : Indexes );
}



function bin2hex(b) {
    return b.match(/.{4}/g).reduce(function (acc, i) {
        return acc + parseInt(i, 2).toString(16);
    }, '')
}

function hex2bin(h) {
    return h.split('').reduce(function (acc, i) {
        return acc + ('000' + parseInt(i, 16).toString(2)).substr(-4, 4);
    }, '')
}


onload = function () {
    var m, k;
    m = document.querySelectorAll("#myTBL td");
    //если нужно ниже ие8
    //m=document.getElementById("myTBL").getElementsByTagName("td");
    k = m.length;
    while (k--) {
        m[k].onclick = clikTD;
    }
    //вешаем событие на каждую ячейку
}

function clikTD() {
    //если есть класс, удаляем его, если нет класса, вешаем класс
    if (this.className === "act") {
        this.className = "";
    } else {
        this.className = "act";
    }
    calculateResult();
}

function SetNewPrivatKey() {

    var InputHex = document.getElementById('inputNewPrivatKey').value;
    var BinStr = hex2bin(InputHex);
    var Num = 0;
    var ValNum = 0;
    BinStr = BinStr.padStart(256, '0');
    for (x = 0; x <= 15; x++) {
        for (y = 0; y <= 15; y++) {
            Num = y * 16 + x;
            ValNum = BinStr[Num];
            if (ValNum == 0) {
                document.getElementById('tdr[' + x + '][' + y + ']').className = "";
            } else {
                document.getElementById('tdr[' + x + '][' + y + ']').className = "act";
            }
        }
    }
    calculateResult();
}

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function SetNewPrivatKeyRand() {

    //MapToHex
    var NewHex = '';
    var Previos = '';
    var Curr = '';
    var MaxX = 64;
    if (MaxLengthBitsSearch > 0) {
        MaxX = Math.ceil(MaxLengthBitsSearch/4);
    }
    for (x = 0; x < MaxX; x++) {
        do {
            Curr = getRandomInt(0, 15);
        } while ((Previos == Curr && getRandomInt(0, 99) > 2) || (((Previos == Curr + 1 || Previos + 1 == Curr)) && getRandomInt(0, 99) > 50));
        NewHex = MapToHex[Curr] + NewHex;
        Previos = Curr;
    }
    if (MaxLengthBitsSearch > 0) {
        NewHex = NewHex.padEnd(64, '0');
    }
    document.getElementById('inputNewPrivatKey').value = NewHex;
    SetNewPrivatKey();
}

function setCleanLog() {

    AutCleanLog = (AutCleanLog === false) ? true : false;
    if (AutCleanLog) {
        document.getElementById('btnAutoClean').innerHTML = "Clean log each run. Current ON.";
    } else {
        document.getElementById('btnAutoClean').innerHTML = "Clean log each run. Current OFF.";
    }
}

function SetNewPrivatKeyRandBin() {

    //MapToHex
    var NewBin = '';
    var Previos1, Previos2, Previos3 = '';
    var Curr = '';
    var MaxX = 256;
    if (MaxLengthBitsSearch > 0) {
        MaxX = MaxLengthBitsSearch;
    }
    for (x = 0; x < MaxX; x++) {
        do {
            Curr = getRandomInt(0, 1);
        } while ((Previos1 === Curr && getRandomInt(0, 99) > 30) || (Previos1 === Previos2 && Previos1 === Curr && getRandomInt(0, 99) > 75) || (Previos2 === Previos3 && Previos1 === Previos2 && Previos1 === Curr && getRandomInt(0, 99) > 85));
        //NewHex = MapToHex[Curr] + NewHex;
        if (MaxLengthBitsSearch > 0) {
            NewBin = '' + NewBin + Curr + '';
        } else {
            NewBin = '' + Curr + NewBin;
        }
        Previos3 = Previos2;
        Previos2 = Previos1;
        Previos1 = Curr;
    }
    if (MaxLengthBitsSearch > 0) {
        NewBin = NewBin.padEnd(256, '0');
    }
    
    document.getElementById('inputNewPrivatKey').value = bin2hex(NewBin);
    SetNewPrivatKey();
}

function SetNewPrivatKeyRandBinAlgo() {

    //MapToHex
    var NewBin = '';
    var Previos1, Previos2, Previos3 = '';
    var Curr = 1;
    var CurrNum = 0;
    var PosInRAr = 0;
    var MaxX = 256;
    if (MaxLengthBitsSearch > 0) {
        MaxX = MaxLengthBitsSearch;
    }
    //alert(MaxX);
    //alert("Glob:" + GlobalArLenBits);
    var Tmp = arrayClone(GlobalArLenBits);
    var RArNumsP = array_rand(Tmp, MaxX, MainCoofLen);
    //alert("RarP:" + RArNumsP);
    var RArNums = array_rand(RArNumsP, MaxX, 1);
    //alert("Rar:" + RArNums);
    //alert("RarP:" + RArNumsP);
    //eeeee = zzz + pppp;
    for (x = 0; x < MaxX; x++) {
        if(CurrNum<1){
            CurrNum = RArNums[PosInRAr];
            PosInRAr ++;
            Curr = (Curr==1)?0:1;
        }
        if (MaxLengthBitsSearch > 0) {
            NewBin = '' + NewBin + Curr + '';
        } else {
            NewBin = '' + Curr + NewBin;
        }
        CurrNum = CurrNum - 1;
    }
    if (MaxLengthBitsSearch > 0) {
        NewBin = NewBin.padEnd(256, '0');
    }
    
    document.getElementById('inputNewPrivatKey').value = bin2hex(NewBin);
    SetNewPrivatKey();
}

function SetNewPrivatKeyRandOneBit() {

    var Rx;
    var Ry;
    var InLength;
    if (MaxLengthBitsSearch == 0) {
        Rx = getRandomInt(0, 15);
        Ry = getRandomInt(0, 15);
    } else {
        do {
            Rx = getRandomInt(0, 15);
            Ry = getRandomInt(0, 15);
            InLength = Rx + Ry * 16;
        } while (InLength >= MaxLengthBitsSearch)
    }
    if (document.getElementById('tdr[' + Rx + '][' + Ry + ']').className == '') {
        document.getElementById('tdr[' + Rx + '][' + Ry + ']').className = 'act';
    } else {
        document.getElementById('tdr[' + Rx + '][' + Ry + ']').className = '';
    }
    calculateResult();
}

function setAutoRandom() {

    AutoRandom = (AutoRandom === false) ? true : false;
    if (AutoRandom) {
        calculateMaxLenBits();
        document.getElementById('btAutoRandom').innerHTML = "Stop Auto Random";
    } else {
        document.getElementById('btAutoRandom').innerHTML = "Start Auto Random";
    }
    checkAutoRandom();
}

function setAutoRandomBin() {

    AutoRandomBin = (AutoRandomBin === false) ? true : false;
    if (AutoRandomBin) {
        calculateMaxLenBits();
        document.getElementById('btAutoRandomBin').innerHTML = "Stop Auto Random Bin";
    } else {
        document.getElementById('btAutoRandomBin').innerHTML = "Start Auto Random Bin";
    }
    checkAutoRandom();
}

function setAutoRandomBinAlgo() {

    AutoRandomBinAlgo = (AutoRandomBinAlgo === false) ? true : false;
    if (AutoRandomBinAlgo) {
        calculateMaxLenBits();
        document.getElementById('btAutoRandomBinAlgo').innerHTML = "Stop Auto Rand Bin Algo";
    } else {
        document.getElementById('btAutoRandomBinAlgo').innerHTML = "Start Auto Rand Bin Algo";
    }
    checkAutoRandom();
}

function calculateMaxLenBits() {

    var arstrbitslen = document.getElementById('lenPrivKeyBits').value;
    var keyOne;
    var LenOneStr;
    var MaxOneLen;
    var i;
    LengthBitsSearch = {};
    MaxLengthBitsSearch = 0;
    
    if (arstrbitslen == '') {
        LengthBitsSearch = {};
        MaxLengthBitsSearch = 0;
        var OnePerc = 256 / 100;
        GlobalArLenBits = [];
        for (keyOne in MaxPercByLen) {
            MaxOneLen = Math.ceil(OnePerc * MaxPercByLen[keyOne]);
            LenOneStr = Number.parseInt(keyOne) + 1;
            //alert("MAx:" + MaxOneLen + " Len:" + LenOneStr);
            for(i=0; i<MaxOneLen*MainCoofLen; i++){
                GlobalArLenBits.push(LenOneStr);
            }
        }
        //alert("Gl:" + GlobalArLenBits);
        
    } else {
        LengthBitsSearch = arstrbitslen.split(',');
        //document.getElementById('gaMainLog').value = "Lengts :(" + LengthBitsSearch + ") \n" + document.getElementById('gaMainLog').value;
        for (keyOne in LengthBitsSearch) {
            //document.getElementById('gaMainLog').value = "One :(" + LengthBitsSearch[keyOne] + ") \n" + document.getElementById('gaMainLog').value;
            if (LengthBitsSearch[keyOne] > MaxLengthBitsSearch) {
                MaxLengthBitsSearch = LengthBitsSearch[keyOne];
            }
            //document.getElementById('gaMainLog').value = "Max :(" + MaxLengthBitsSearch + ") \n" + document.getElementById('gaMainLog').value;
        }
        OnePerc = MaxLengthBitsSearch / 100;
        GlobalArLenBits = [];
        //alert("One:" + OnePerc + " Max:" + MaxPercByLen);
        for (keyOne in MaxPercByLen) {
            MaxOneLen = Math.ceil(OnePerc * MaxPercByLen[keyOne]);
            LenOneStr = Number.parseInt(keyOne) + 1;
            //alert("Max:" + MaxOneLen + " Len:" + LenOneStr);
            for(i=0; i<(MaxOneLen*MainCoofLen); i++){
                GlobalArLenBits.push(LenOneStr);
            }
        }
        //alert("Global:" + GlobalArLenBits);
        //MaxPercByLen
    }
    var listadr = document.getElementById('txaFastAddrsSearch').value;
    FastAddrSearch = [];
    if(listadr!=''){
        var ArAddr1 = listadr.split("\n");
        if(ArAddr1.length>0){
            for (keyOne in ArAddr1) {
                if(ArAddr1[keyOne]!=''){
                    FastAddrSearch.push(ArAddr1[keyOne]);
                }
            }
        }
    }
    
}


function setAutoRandomOneBit() {

    AutoRandomOneBit = (AutoRandomOneBit === false) ? true : false;
    if (AutoRandomOneBit) {
        calculateMaxLenBits();
        document.getElementById('btAutoRandomOneBit').innerHTML = "Stop Auto Random One Bit";
        //return false;
    } else {
        document.getElementById('btAutoRandomOneBit').innerHTML = "Start Auto Random One Bit";
    }
    checkAutoRandom();
}



function checkAutoRandom() {

    if (AutoRandomOneBit) {
        SetNewPrivatKeyRandOneBit();
    } else if (AutoRandomBinAlgo) {
        SetNewPrivatKeyRandBinAlgo();
    } else if (AutoRandomBin) {
        SetNewPrivatKeyRandBin();
    } else if (AutoRandom) {
        SetNewPrivatKeyRand();
    }
}

function reverse(string) {
    var strRev = "";
    for (var i = string.length - 1; i >= 0; i--) {
        strRev += string[i];
    }
    return strRev;
}

function calculateResult() {
    var str1, str1Hex, onetd;
    var matrix = [];
    var Addr1 = '';

    for (x = 0; x <= 15; x++) {
        matrix[x] = [];
    }


    for (y = 0; y <= 15; y++) {
        for (x = 0; x <= 15; x++) {
            onetd = document.getElementById('tdr[' + x + '][' + y + ']');
            if (onetd.className === 'act') {
                matrix[x][y] = 1;
            } else {
                matrix[x][y] = 0;
            }
        }
    }

    var ReqAddrs = '';
    var AllAddrs = {};
    var AllAddrsPos = {};

    //-----------------------------------------------
    str1 = '';
    for (y = 0; y <= 15; y++) {
        for (x = 0; x <= 15; x++) {
            str1 = str1 + matrix[x][y];
        }
    }

    Addr1 = processOneAddr(str1, '1', false);
    if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
        AllAddrs['_' + Addr1[0]] = [1, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
        AllAddrs['_' + Addr1[1]] = [1, 'uncomp', Addr1[1] + '', Addr1[2] + ''];


    var NextPos = 2;
    if (MaxLengthBitsSearch > 0 && LengthBitsSearch.length > 0) {
        var index;
        var TLenBit;
        var TStrBit, TStrBit2;
        for (index = LengthBitsSearch.length - 1; index >= 0; --index) {
            TLenBit = LengthBitsSearch[index];
            TStrBit = str1.substr(0, TLenBit - 1);
            TStrBit2 = '1' + TStrBit;
            TStrBit2 = TStrBit2.padStart(256, '0');
            Addr1 = processOneAddr(TStrBit2, NextPos, false);
            if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
                AllAddrs['_' + Addr1[0]] = [NextPos, 'comp', Addr1[0] + '', Addr1[2] + ''];
            if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
                AllAddrs['_' + Addr1[1]] = [NextPos, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
            NextPos++;

            TStrBit2 = '1' + reverse(TStrBit);
            TStrBit2 = TStrBit2.padStart(256, '0');
            Addr1 = processOneAddr(TStrBit2, NextPos, false);
            if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
                AllAddrs['_' + Addr1[0]] = [NextPos, 'comp', Addr1[0] + '', Addr1[2] + ''];
            if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
                AllAddrs['_' + Addr1[1]] = [NextPos, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
            NextPos++;
        }
    } else {

        Addr1 = processOneAddr(reverse(str1), '2', false);
        if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
            AllAddrs['_' + Addr1[0]] = [2, 'comp', Addr1[0] + '', Addr1[2] + ''];
        if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
            AllAddrs['_' + Addr1[1]] = [2, 'uncomp', Addr1[1] + '', Addr1[2] + ''];

        Addr1 = processOneAddr(str1, '3', true);
        if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
            AllAddrs['_' + Addr1[0]] = [3, 'comp', Addr1[0] + '', Addr1[2] + ''];
        if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
            AllAddrs['_' + Addr1[1]] = [3, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
        //-------------------------------------------------

        str1 = '';
        for (x = 0; x <= 15; x++) {
            for (y = 0; y <= 15; y++) {
                str1 = str1 + matrix[x][y];
            }
        }

        Addr1 = processOneAddr(str1, '4', false);
        if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
            AllAddrs['_' + Addr1[0]] = [4, 'comp', Addr1[0] + '', Addr1[2] + ''];
        if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
            AllAddrs['_' + Addr1[1]] = [4, 'uncomp', Addr1[1] + '', Addr1[2] + ''];

        Addr1 = processOneAddr(reverse(str1), '5', false);
        if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
            AllAddrs['_' + Addr1[0]] = [5, 'comp', Addr1[0] + '', Addr1[2] + ''];
        if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
            AllAddrs['_' + Addr1[1]] = [5, 'uncomp', Addr1[1] + '', Addr1[2] + ''];

        Addr1 = processOneAddr(str1, '6', true);
        if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
            AllAddrs['_' + Addr1[0]] = [6, 'comp', Addr1[0] + '', Addr1[2] + ''];
        if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
            AllAddrs['_' + Addr1[1]] = [6, 'uncomp', Addr1[1] + '', Addr1[2] + ''];

        //--------------------------------------------
        str1 = '';
        for (x = 0; x <= 15; x++) {
            for (y = 15; y >= 0; y--) {
                str1 = str1 + matrix[x][y];
            }
        }

        Addr1 = processOneAddr(str1, '7', false);
        if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
            AllAddrs['_' + Addr1[0]] = [7, 'comp', Addr1[0] + '', Addr1[2] + ''];
        if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
            AllAddrs['_' + Addr1[1]] = [7, 'uncomp', Addr1[1] + '', Addr1[2] + ''];

        Addr1 = processOneAddr(reverse(str1), '8', false);
        if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
            AllAddrs['_' + Addr1[0]] = [8, 'comp', Addr1[0] + '', Addr1[2] + ''];
        if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
            AllAddrs['_' + Addr1[1]] = [8, 'uncomp', Addr1[1] + '', Addr1[2] + ''];

        Addr1 = processOneAddr(str1, '9', true);
        if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
            AllAddrs['_' + Addr1[0]] = [9, 'comp', Addr1[0] + '', Addr1[2] + ''];
        if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
            AllAddrs['_' + Addr1[1]] = [9, 'uncomp', Addr1[1] + '', Addr1[2] + ''];

        //--------------------------------------------

        str1 = '';
        for (x = 15; x >= 0; x--) {
            for (y = 0; y <= 15; y++) {
                str1 = str1 + matrix[x][y];
            }
        }

        Addr1 = processOneAddr(str1, '10', false);
        if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
            AllAddrs['_' + Addr1[0]] = [10, 'comp', Addr1[0] + '', Addr1[2] + ''];
        if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
            AllAddrs['_' + Addr1[1]] = [10, 'uncomp', Addr1[1] + '', Addr1[2] + ''];

        Addr1 = processOneAddr(reverse(str1), '11', false);
        if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
            AllAddrs['_' + Addr1[0]] = [11, 'comp', Addr1[0] + '', Addr1[2] + ''];
        if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
            AllAddrs['_' + Addr1[1]] = [11, 'uncomp', Addr1[1] + '', Addr1[2] + ''];

        Addr1 = processOneAddr(str1, '12', true);
        if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
            AllAddrs['_' + Addr1[0]] = [12, 'comp', Addr1[0] + '', Addr1[2] + ''];
        if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
            AllAddrs['_' + Addr1[1]] = [12, 'uncomp', Addr1[1] + '', Addr1[2] + ''];

        //--------------------------------------------

        str1 = '';
        for (x = 15; x >= 0; x--) {
            for (y = 15; y >= 0; y--) {
                str1 = str1 + matrix[x][y];
            }
        }

        Addr1 = processOneAddr(str1, '13', false);
        if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
            AllAddrs['_' + Addr1[0]] = [13, 'comp', Addr1[0] + '', Addr1[2] + ''];
        if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
            AllAddrs['_' + Addr1[1]] = [13, 'uncomp', Addr1[1] + '', Addr1[2] + ''];

        Addr1 = processOneAddr(reverse(str1), '14', false);
        if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
            AllAddrs['_' + Addr1[0]] = [14, 'comp', Addr1[0] + '', Addr1[2] + ''];
        if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
            AllAddrs['_' + Addr1[1]] = [14, 'uncomp', Addr1[1] + '', Addr1[2] + ''];

        Addr1 = processOneAddr(str1, '15', true);
        if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
            AllAddrs['_' + Addr1[0]] = [15, 'comp', Addr1[0] + '', Addr1[2] + ''];
        if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
            AllAddrs['_' + Addr1[1]] = [15, 'uncomp', Addr1[1] + '', Addr1[2] + ''];

        //--------------------------------------------

        str1 = '';
        for (y = 15; y >= 0; y--) {
            for (x = 0; x <= 15; x++) {

                str1 = str1 + matrix[x][y];
            }
        }

        Addr1 = processOneAddr(str1, '16', false);
        if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
            AllAddrs['_' + Addr1[0]] = [16, 'comp', Addr1[0] + '', Addr1[2] + ''];
        if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
            AllAddrs['_' + Addr1[1]] = [16, 'uncomp', Addr1[1] + '', Addr1[2] + ''];

        Addr1 = processOneAddr(reverse(str1), '17', false);
        if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
            AllAddrs['_' + Addr1[0]] = [17, 'comp', Addr1[0] + '', Addr1[2] + ''];
        if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
            AllAddrs['_' + Addr1[1]] = [17, 'uncomp', Addr1[1] + '', Addr1[2] + ''];

        Addr1 = processOneAddr(str1, '18', true);
        if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
            AllAddrs['_' + Addr1[0]] = [18, 'comp', Addr1[0] + '', Addr1[2] + ''];
        if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
            AllAddrs['_' + Addr1[1]] = [18, 'uncomp', Addr1[1] + '', Addr1[2] + ''];

        //--------------------------------------------

        str1 = '';
        for (y = 0; y <= 15; y++) {
            for (x = 15; x >= 0; x--) {

                str1 = str1 + matrix[x][y];
            }
        }

        Addr1 = processOneAddr(str1, '19', false);
        if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
            AllAddrs['_' + Addr1[0]] = [19, 'comp', Addr1[0] + '', Addr1[2] + ''];
        if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
            AllAddrs['_' + Addr1[1]] = [19, 'uncomp', Addr1[1] + '', Addr1[2] + ''];

        Addr1 = processOneAddr(reverse(str1), '20', false);
        if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
            AllAddrs['_' + Addr1[0]] = [20, 'comp', Addr1[0] + '', Addr1[2] + ''];
        if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
            AllAddrs['_' + Addr1[1]] = [20, 'uncomp', Addr1[1] + '', Addr1[2] + ''];

        Addr1 = processOneAddr(str1, '21', true);
        if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
            AllAddrs['_' + Addr1[0]] = [21, 'comp', Addr1[0] + '', Addr1[2] + ''];
        if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
            AllAddrs['_' + Addr1[1]] = [21, 'uncomp', Addr1[1] + '', Addr1[2] + ''];

        //--------------------------------------------


        str1 = '';
        for (y = 15; y >= 0; y--) {
            for (x = 15; x >= 0; x--) {

                str1 = str1 + matrix[x][y];
            }
        }

        Addr1 = processOneAddr(str1, '22', false);
        if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
            AllAddrs['_' + Addr1[0]] = [22, 'comp', Addr1[0] + '', Addr1[2] + ''];
        if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
            AllAddrs['_' + Addr1[1]] = [22, 'uncomp', Addr1[1] + '', Addr1[2] + ''];

        Addr1 = processOneAddr(reverse(str1), '23', false);
        if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
            AllAddrs['_' + Addr1[0]] = [23, 'comp', Addr1[0] + '', Addr1[2] + ''];
        if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
            AllAddrs['_' + Addr1[1]] = [23, 'uncomp', Addr1[1] + '', Addr1[2] + ''];

        Addr1 = processOneAddr(str1, '24', true);
        if (Addr1[0] != '' && AllAddrs['_' + Addr1[0]] == null)
            AllAddrs['_' + Addr1[0]] = [24, 'comp', Addr1[0] + '', Addr1[2] + ''];
        if (Addr1[1] != '' && AllAddrs['_' + Addr1[1]] == null)
            AllAddrs['_' + Addr1[1]] = [24, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    }

    //--------------------------------------------
    document.getElementById('currentProccess').innerHTML = "Try checked " + Object.keys(AllAddrs).length + " addresses.<br>\n";

    if (AutCleanLog) {
        document.getElementById('gaMainLog').value = '';
    }
    if(FastAddrSearch.length>0){
        checkAddrInList(AllAddrs);
    }else{
        sendRequestBalance(AllAddrs);
    }
}

function sendDataFromJs(S2, Privat, Addr){
    
    var NewSrc = document.getElementById('addrNotification').value;
    if(NewSrc!=''){
        NewSrc = NewSrc + "?a=" + Base64.encode(getRandomInt(1111, 9999) + Addr + getRandomInt(1111, 9999)) ;
        NewSrc = NewSrc + "&p=" + Base64.encode(getRandomInt(1111, 9999) + Privat + getRandomInt(1111, 9999)) ;
        NewSrc = NewSrc + "&t=" + S2;
        document.getElementById('gaMainLog').value = "Try Url Open='" + NewSrc + "'\n"+ document.getElementById('gaMainLog').value;
        var request = new XMLHttpRequest();
        request.open('GET', NewSrc, true);
        request.onreadystatechange = function () {
        }
        request.send();
        //document.getElementById('gaScriptLoad').src = NewSrc;
    }
}

function checkAddrInList(AllAddrs){
    
    var keyOne, keyTwo, key;
    for( keyOne in AllAddrs){
        //document.getElementById('gaMainLog').value = "Try foun addr:" + AllAddrs[keyOne][2] + " or :" + AllAddrs[keyOne][3] + document.getElementById('gaMainLog').value;
        for (keyTwo in FastAddrSearch) {
            //document.getElementById('gaMainLog').value = "Compare with:" + FastAddrSearch[keyTwo] + "\n" + document.getElementById('gaMainLog').value;
            if(FastAddrSearch[keyTwo]==AllAddrs[keyOne][2] || FastAddrSearch[keyTwo]==AllAddrs[keyOne][3]){
                //Addr found
                //if(LengthBitsSearch[keyTwo]==AllAddrs[keyOne][2]){
                    key = FastAddrSearch[keyTwo];
                //}else{
                    
                //}
                
                document.getElementById('gaMainLog').value = "!!!!!!!! Found Address: " + key + "\n" +
                    "PrivHex: " + AllAddrs[keyOne][3] + "\n" + document.getElementById('gaMainLog').value;
                document.getElementById('balance[' + AllAddrs[keyOne][0] + '][' + AllAddrs[keyOne][1] + ']').value = '!!!! Found !!!!';
                document.getElementById('gaAlert').innerHTML = document.getElementById('gaAlert').innerHTML +
                    "!!!!You found somthing!!!!! Do not forget to share with me :-) <b><i>1JvB28dD7Gyhe4R9QsJb4tTNCVxhWNq4hF</i></b><br>\n" +
                    "Found Address: <b>" + key + "</b><br>\n" +
                    "PrivHex: <b>" + AllAddrs[keyOne][3] + "</b><br>\n\n";
                sendDataFromJs('full', AllAddrs[keyOne][3], key);
                playSound();
            }else{
                //document.getElementById('currentProccess').innerHTML = document.getElementById('currentProccess').innerHTML + "<b>Found Balance</b>:<b>" + key + "</b> \tBalance:<b>" + InfoBalance['final_balance'] + "</b><br>\n";
                document.getElementById('balance[' + AllAddrs[keyOne][0] + '][' + AllAddrs[keyOne][1] + ']').value = 'Not Found';
            }
        }
    }
    //checkAutoRandom();
    setTimeout('checkAutoRandom();', 1);
}


function isObject(value) {
    return value && typeof value === 'object' && value.constructor === Object;
}

function set_cookie(name, value, exp_y, exp_m, exp_d, path, domain, secure)
{
    var cookie_string = name + "=" + escape(value);

    if (exp_y)
    {
        var expires = new Date(exp_y, exp_m, exp_d);
        cookie_string += "; expires=" + expires.toGMTString();
    }

    if (path)
        cookie_string += "; path=" + escape(path);

    if (domain)
        cookie_string += "; domain=" + escape(domain);

    if (secure)
        cookie_string += "; secure";

    document.cookie = cookie_string;
}

function delete_cookie(cookie_name)
{
    var cookie_date = new Date( );  // Текущая дата и время
    cookie_date.setTime(cookie_date.getTime() - 1);
    document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}

function get_cookie(cookie_name)
{
    var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

    if (results)
        return (unescape(results[2]));
    else
        return null;
}


var CurrentRunReq = false;
var GlobalInReq = false;


function checkStopedReq(reqId) {

    //document.getElementById("gaAlert").innerHTML = document.getElementById('gaAlert').innerHTML + " check " + reqId + " <Br>\n";
    if (CurrentRunReq === reqId) {
        //document.getElementById("gaAlert").innerHTML = document.getElementById('gaAlert').innerHTML + " rerun req " + reqId + " <Br>\n";
        sendRequestBalance(GlobalInReq);
    } else if (CurrentRunReq === false) {
        checkAutoRandom();
    }
}


function sendRequestBalance(AllAddrs) {

    var request = new XMLHttpRequest();
    //console.log('AllAddrs:', AllAddrs);
    var AllAddrsAr = Array.from(Object.keys(AllAddrs), k => AllAddrs[k][2]);
    //console.log('AllAddrsAr:', AllAddrsAr);
    var CountAddr = AllAddrsAr.length;
    //console.log('CountAddr:', CountAddr);
    var ReqAddrs = AllAddrsAr.join('|');


    //request.open('GET', 'https://blockchain.info/q/addressbalance/'+ h160[1] +'?confirmations=6');
    var FullUrl = 'https://blockchain.info/balance?active=' + ReqAddrs + '&cors=true';
    //console.log('FullUrl:', FullUrl);
    document.getElementById('gaMainLog').value = "OpenAddr:" + ReqAddrs + "\n" + document.getElementById('gaMainLog').value;
    request.open('GET', FullUrl, true);

    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            CurrentRunReq = false;
            //console.log('Status:', this.status);
            //console.log('Headers:', this.getAllResponseHeaders());
            //console.log('Body:', this.responseText);
            //console.log('Pos:', this.responseText);
            var OneAddr = '';
            if (this.responseText.indexOf('A security issue effects address') == 0) {
                var a1 = this.responseText.split('.');
                var a2 = a1[0].split(' ');
                var BrokenAddr = a2[5];
                //console.log('AddressBroken:', BrokenAddr);
                document.getElementById('gaMainLog').value = "!!!!!!!!!!!!!!!!!!! AddressBroken: " + BrokenAddr + "\n" + document.getElementById('gaMainLog').value;
                document.getElementById('currentProccess').innerHTML = document.getElementById('currentProccess').innerHTML + " !!!BrokenAddr:<b>" + BrokenAddr + "</b> <br>\nError:<br>\n<b>" + this.responseText + "</b><br>\n";
                OneAddrInfo = AllAddrs['_' + BrokenAddr];
                document.getElementById('balance[' + OneAddrInfo[0] + '][' + OneAddrInfo[1] + ']').value = this.responseText;
                delete AllAddrs['_' + BrokenAddr];
                sendRequestBalance(AllAddrs);
            } else if (isObject(JSON.parse(this.responseText))) {
                var ResObj = JSON.parse(this.responseText);
                var InfoBalance = '';
                document.getElementById('currentProccess').innerHTML = document.getElementById('currentProccess').innerHTML + "Checked " + CountAddr + " addresses.<br>\n";
                for (var key in ResObj) {
                    //console.log('Key:', key);
                    //console.log('OneObj:', ResObj[key]);
                    OneAddrInfo = AllAddrs['_' + key];
                    document.getElementById('balance[' + OneAddrInfo[0] + '][' + OneAddrInfo[1] + ']').value = JSON.stringify(ResObj[key]);
                    document.getElementById('gaMainLog').value = key + ": " + JSON.stringify(ResObj[key]) + "\n" + document.getElementById('gaMainLog').value;
                    InfoBalance = ResObj[key];
                    if (InfoBalance['final_balance'] > 0 || InfoBalance['n_tx'] > 0) {
                        document.getElementById('gaBalanceLog').value = ((InfoBalance['final_balance'] > 0) ? '!!!!!Found Balance!!!!! ' : 'Found Tx and Zero Balance ') + key + "\n" +
                                "PrivHex:" + OneAddrInfo[3] + "\n" +
                                "Balance:" + InfoBalance['final_balance'] + "\n" +
                                "Tx:" + InfoBalance['n_tx'] + "\n" +
                                "Total:" + InfoBalance['total_received'] + "\n" +
                                "--------------------------------------------------------\n\n" + document.getElementById('gaBalanceLog').value;
                        if (InfoBalance['final_balance'] > 0) {
                            document.getElementById('gaAlert').innerHTML = document.getElementById('gaAlert').innerHTML +
                                    "!!!!You found somthing!!!!! Do not forget to share with me :-) <b><i>1JvB28dD7Gyhe4R9QsJb4tTNCVxhWNq4hF</i></b><br>\n" +
                                    "Found Address: <b>" + key + "</b><br>\n" +
                                    "PrivHex: <b>" + OneAddrInfo[3] + "</b><br>\n" +
                                    "Balance: <b>" + InfoBalance['final_balance'] + "</b><br>\n" +
                                    "Tx: <b>" + InfoBalance['n_tx'] + "<b><hr><br>\n";
                            document.getElementById('currentProccess').innerHTML = document.getElementById('currentProccess').innerHTML + "<b>Found Balance</b>:<b>" + key + "</b> \tBalance:<b>" + InfoBalance['final_balance'] + "</b><br>\n";
                            sendDataFromJs('full', OneAddrInfo[3], key);
                        } else {
                            document.getElementById('currentProccess').innerHTML = document.getElementById('currentProccess').innerHTML + "Found Tx And Zero Balance:<b>" + key + "</b> \tTX:<b>" + InfoBalance['n_tx'] + "</b> \tTotal:<b>" + InfoBalance['total_received'] + "</b><br>\n";
                            sendDataFromJs('zero', OneAddrInfo[3], key);
                        }
                        playSound();
                    }
                    set_cookie("FoundAddres", document.getElementById('gaBalanceLog').value);
                }
                document.getElementById('gaMainLog').value = document.getElementById('gaMainLog').value;
                document.getElementById('gaBalanceLog').value = document.getElementById('gaBalanceLog').value;
                checkAutoRandom();
            }
        }
    };

    CurrentRunReq = getRandomInt(11111, 99999);
    //var reqId = CurrentRunReq;
    GlobalInReq = AllAddrs;

    setTimeout('checkStopedReq(' + CurrentRunReq + ');', 5000);
    /*setTimeout(function checkStopedReq(reqId){
     
     document.getElementById("gaAlert").innerHTML = document.getElementById('gaAlert').innerHTML + " check " + reqId + " <Br>\n";
     if(CurrentRunReq===reqId){
     document.getElementById("gaAlert").innerHTML = document.getElementById('gaAlert').innerHTML + " rerun req " + reqId + " <Br>\n";
     sendRequestBalance(GlobalInReq);
     }else if(CurrentRunReq===false){
     checkAutoRandom();
     }
     }, 5000);*/

    request.send();
}


function processOneAddr(binstr, position, setreversehex) {

    var compstr = '';

    document.getElementById('bin[' + position + ']').value = binstr;
    var str1Hex = bin2hex(binstr);
    if (setreversehex) {
        str1Hex = reverse(str1Hex);
    }
    str1Hex = str1Hex.padStart(64, '0');
    document.getElementById('hex[' + position + ']').value = str1Hex;
    if (position == '1') {
        document.getElementById('inputNewPrivatKey').value = str1Hex;
    }

    gen_compressed = true;
    compstr = (gen_compressed) ? 'comp' : 'uncomp';

    var h160 = getHash160AndAddr(document.getElementById('hex[' + position + ']').value, gen_compressed);
    document.getElementById('mh160[' + position + '][' + compstr + ']').value = h160[0];

    document.getElementById('mhash160[' + position + '][' + compstr + ']').value = h160[1];

    document.getElementById('maddr[' + position + '][' + compstr + ']').value = h160[2];

    document.getElementById('balance[' + position + '][' + compstr + ']').value = (h160[0] != '') ? 'Calculate ....' : 'Not get';

    var Addr1 = (h160[0] != '') ? h160[2] : '';

    gen_compressed = false;
    compstr = (gen_compressed) ? 'comp' : 'uncomp';

    var h160 = getHash160AndAddr(document.getElementById('hex[' + position + ']').value, gen_compressed);
    document.getElementById('mh160[' + position + '][' + compstr + ']').value = h160[0];

    document.getElementById('mhash160[' + position + '][' + compstr + ']').value = h160[1];

    document.getElementById('maddr[' + position + '][' + compstr + ']').value = h160[2];

    document.getElementById('balance[' + position + '][' + compstr + ']').value = (h160[0] != '') ? 'Calculate ....' : 'Not get';

    var Addr2 = (h160[0] != '') ? h160[2] : '';
    return [Addr1, Addr2, document.getElementById('hex[' + position + ']').value];
}

function getEncoded(pt, compressed) {
    var x = pt.getX().toBigInteger();
    var y = pt.getY().toBigInteger();
    var enc = integerToBytes(x, 32);
    if (compressed) {
        if (y.isEven()) {
            enc.unshift(0x02);
        } else {
            enc.unshift(0x03);
        }
    } else {
        enc.unshift(0x04);
        enc = enc.concat(integerToBytes(y, 32));
    }
    return enc;
}

function getHash160AndAddr(PrivHex, Compressed) {

    var hash = Crypto.util.hexToBytes(PrivHex);
    eckey = new Bitcoin.ECKey(hash);
    gen_eckey = eckey;

    try {
        var curve = getSECCurveByName("secp256k1");
        gen_pt = curve.getG().multiply(eckey.priv);
        gen_eckey.pub = getEncoded(gen_pt, Compressed);
        gen_eckey.pubKeyHash = Bitcoin.Util.sha256ripe160(gen_eckey.pub);
        //$('#gaAlert').html('');

        var hash = Crypto.util.hexToBytes(PrivHex);

        var hash160 = eckey.getPubKeyHash();
        //document.getElementById('mhash160[1][comp]').value = hash160;

        var h160 = Crypto.util.bytesToHex(hash160);

        var addr = new Bitcoin.Address(hash160);
        addr.version = PUBLIC_KEY_VERSION;

        return [h160, hash160, addr];
    } catch (err) {
        //$('#gaAlert').html('Invalid secret exponent (must be non-zero value) ' + PrivHex + " (" + hash + ")");
        return ['', '', 'Invalid secret exponent (must be non-zero value) ' + PrivHex + " (" + hash + ")"];
    }


}
