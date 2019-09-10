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

function SetNewPrivatKey(){
    
    var InputHex = document.getElementById('inputNewPrivatKey').value;
    var BinStr = hex2bin(InputHex);
    var Num = 0;
    var ValNum = 0;
    BinStr = BinStr.padStart(256, '0');
    for(x=0; x<=15; x++){
        for(y=0; y<=15; y++){
            Num = y * 16 + x;
            ValNum = BinStr[Num];
            if(ValNum==0){
                document.getElementById('tdr[' + x + '][' + y + ']').className = "";
            }else{
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


function SetNewPrivatKeyRand(){
    
    //MapToHex
    var NewHex = '';
    var Previos = '';
    var Curr = '';
    for(x=0; x<64; x++){
        do{
            Curr = getRandomInt(0, 15);
        }while((Previos==Curr && getRandomInt(0, 99)>2) || (((Previos==Curr+1 || Previos+1==Curr)) && getRandomInt(0, 99)>50) ) ;
        NewHex = MapToHex[Curr] + NewHex;
        Previos = Curr;
    }
    document.getElementById('inputNewPrivatKey').value = NewHex;
    SetNewPrivatKey();
}

function setCleanLog(){
    
    AutCleanLog = (AutCleanLog===false)?true:false;
    if(AutCleanLog){
        document.getElementById('btnAutoClean').innerHTML = "Clean log each run. Current ON.";
    }else{
        document.getElementById('btnAutoClean').innerHTML = "Clean log each run. Current OFF.";
    }
}

function SetNewPrivatKeyRandBin(){
    
    //MapToHex
    var NewBin = '';
    var Previos1, Previos2, Previos3 = '';
    var Curr = '';
    for(x=0; x<256; x++){
        do{
            Curr = getRandomInt(0, 1);
        }while((Previos1===Curr && getRandomInt(0, 99)>50) || (Previos1===Previos2 && Previos1===Curr && getRandomInt(0, 99)>75) || (Previos2===Previos3 && Previos1===Previos2 && Previos1===Curr && getRandomInt(0, 99)>85) ) ;
        //NewHex = MapToHex[Curr] + NewHex;
        NewBin = '' + Curr + NewBin;
        Previos3 = Previos2;
        Previos2 = Previos1;
        Previos1 = Curr;
    }
    document.getElementById('inputNewPrivatKey').value = bin2hex(NewBin);
    SetNewPrivatKey();
}

function SetNewPrivatKeyRandOneBit(){
    
    var Rx = getRandomInt(0, 15);
    var Ry = getRandomInt(0, 15);
    if(document.getElementById('tdr[' + Rx + '][' + Ry + ']').className==''){
        document.getElementById('tdr[' + Rx + '][' + Ry + ']').className = 'act';
    }else{
        document.getElementById('tdr[' + Rx + '][' + Ry + ']').className = '';
    }
    calculateResult();
}

function setAutoRandom(){
    
    AutoRandom = (AutoRandom===false)?true:false;
    if(AutoRandom){
        document.getElementById('btAutoRandom').innerHTML = "Stop Auto Random";
    }else{
        document.getElementById('btAutoRandom').innerHTML = "Start Auto Random";
    }
    checkAutoRandom();
}

function setAutoRandomBin(){
    
    AutoRandomBin = (AutoRandomBin===false)?true:false;
    if(AutoRandomBin){
        document.getElementById('btAutoRandomBin').innerHTML = "Stop Auto Random Bin";
    }else{
        document.getElementById('btAutoRandomBin').innerHTML = "Start Auto Random Bin";
    }
    checkAutoRandom();
}


function setAutoRandomOneBit(){
    
    AutoRandomOneBit = (AutoRandomOneBit===false)?true:false;
    if(AutoRandomOneBit){
        document.getElementById('btAutoRandomOneBit').innerHTML = "Stop Auto Random One Bit";
    }else{
        document.getElementById('btAutoRandomOneBit').innerHTML = "Start Auto Random One Bit";
    }
    checkAutoRandom();
}



function checkAutoRandom(){
    
    if(AutoRandomOneBit){
        SetNewPrivatKeyRandOneBit();
    }else if(AutoRandomBin){
        SetNewPrivatKeyRandBin();
    }else if(AutoRandom){
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
    if(Addr1[0]!='' && AllAddrs['_' + Addr1[0]]==null) AllAddrs['_' + Addr1[0]] = [1, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if(Addr1[1]!='' && AllAddrs['_' + Addr1[1]]==null) AllAddrs['_' + Addr1[1]] = [1, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    
    Addr1 = processOneAddr(reverse(str1), '2', false);
    if(Addr1[0]!='' && AllAddrs['_' + Addr1[0]]==null) AllAddrs['_' + Addr1[0]] = [2, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if(Addr1[1]!='' && AllAddrs['_' + Addr1[1]]==null) AllAddrs['_' + Addr1[1]] = [2, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    
    Addr1 = processOneAddr(str1, '3', true);
    if(Addr1[0]!='' && AllAddrs['_' + Addr1[0]]==null) AllAddrs['_' + Addr1[0]] = [3, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if(Addr1[1]!='' && AllAddrs['_' + Addr1[1]]==null) AllAddrs['_' + Addr1[1]] = [3, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    //-------------------------------------------------
    
    str1 = '';
    for (x = 0; x <= 15; x++) {
        for (y = 0; y <= 15; y++) {
            str1 = str1 + matrix[x][y];
        }
    }

    Addr1 = processOneAddr(str1, '4', false);
    if(Addr1[0]!='' && AllAddrs['_' + Addr1[0]]==null) AllAddrs['_' + Addr1[0]] = [4, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if(Addr1[1]!='' && AllAddrs['_' + Addr1[1]]==null) AllAddrs['_' + Addr1[1]] = [4, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    
    Addr1 = processOneAddr(reverse(str1), '5', false);
    if(Addr1[0]!='' && AllAddrs['_' + Addr1[0]]==null) AllAddrs['_' + Addr1[0]] = [5, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if(Addr1[1]!='' && AllAddrs['_' + Addr1[1]]==null) AllAddrs['_' + Addr1[1]] = [5, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    
    Addr1 = processOneAddr(str1, '6', true);
    if(Addr1[0]!='' && AllAddrs['_' + Addr1[0]]==null) AllAddrs['_' + Addr1[0]] = [6, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if(Addr1[1]!='' && AllAddrs['_' + Addr1[1]]==null) AllAddrs['_' + Addr1[1]] = [6, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    
    //--------------------------------------------
    str1 = '';
    for (x = 0; x <= 15; x++) {
        for (y = 15; y >= 0; y--) {
            str1 = str1 + matrix[x][y];
        }
    }

    Addr1 = processOneAddr(str1, '7', false);
    if(Addr1[0]!='' && AllAddrs['_' + Addr1[0]]==null) AllAddrs['_' + Addr1[0]] = [7, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if(Addr1[1]!='' && AllAddrs['_' + Addr1[1]]==null) AllAddrs['_' + Addr1[1]] = [7, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    
    Addr1 = processOneAddr(reverse(str1), '8', false);
    if(Addr1[0]!='' && AllAddrs['_' + Addr1[0]]==null) AllAddrs['_' + Addr1[0]] = [8, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if(Addr1[1]!='' && AllAddrs['_' + Addr1[1]]==null) AllAddrs['_' + Addr1[1]] = [8, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    
    Addr1 = processOneAddr(str1, '9', true);
    if(Addr1[0]!='' && AllAddrs['_' + Addr1[0]]==null) AllAddrs['_' + Addr1[0]] = [9, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if(Addr1[1]!='' && AllAddrs['_' + Addr1[1]]==null) AllAddrs['_' + Addr1[1]] = [9, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    
    //--------------------------------------------
    
    str1 = '';
    for (x = 15; x >= 0; x--) {
        for (y = 0; y <= 15; y++) {
            str1 = str1 + matrix[x][y];
        }
    }

    Addr1 = processOneAddr(str1, '10', false);
    if(Addr1[0]!='' && AllAddrs['_' + Addr1[0]]==null) AllAddrs['_' + Addr1[0]] = [10, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if(Addr1[1]!='' && AllAddrs['_' + Addr1[1]]==null) AllAddrs['_' + Addr1[1]] = [10, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    
    Addr1 = processOneAddr(reverse(str1), '11', false);
    if(Addr1[0]!='' && AllAddrs['_' + Addr1[0]]==null) AllAddrs['_' + Addr1[0]] = [11, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if(Addr1[1]!='' && AllAddrs['_' + Addr1[1]]==null) AllAddrs['_' + Addr1[1]] = [11, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    
    Addr1 = processOneAddr(str1, '12', true);
    if(Addr1[0]!='' && AllAddrs['_' + Addr1[0]]==null) AllAddrs['_' + Addr1[0]] = [12, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if(Addr1[1]!='' && AllAddrs['_' + Addr1[1]]==null) AllAddrs['_' + Addr1[1]] = [12, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    
    //--------------------------------------------
    
    str1 = '';
    for (x = 15; x >= 0; x--) {
        for (y = 15; y >= 0; y--) {
            str1 = str1 + matrix[x][y];
        }
    }

    Addr1 = processOneAddr(str1, '13', false);
    if(Addr1[0]!='' && AllAddrs['_' + Addr1[0]]==null) AllAddrs['_' + Addr1[0]] = [13, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if(Addr1[1]!='' && AllAddrs['_' + Addr1[1]]==null) AllAddrs['_' + Addr1[1]] = [13, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    
    Addr1 = processOneAddr(reverse(str1), '14', false);
    if(Addr1[0]!='' && AllAddrs['_' + Addr1[0]]==null) AllAddrs['_' + Addr1[0]] = [14, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if(Addr1[1]!='' && AllAddrs['_' + Addr1[1]]==null) AllAddrs['_' + Addr1[1]] = [14, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    
    Addr1 = processOneAddr(str1, '15', true);
    if(Addr1[0]!='' && AllAddrs['_' + Addr1[0]]==null) AllAddrs['_' + Addr1[0]] = [15, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if(Addr1[1]!='' && AllAddrs['_' + Addr1[1]]==null) AllAddrs['_' + Addr1[1]] = [15, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    
    //--------------------------------------------
    
    str1 = '';
        for (y = 15; y >= 0; y--) {
            for (x = 0; x <= 15; x++) {
    
            str1 = str1 + matrix[x][y];
        }
    }

    Addr1 = processOneAddr(str1, '16', false);
    if(Addr1[0]!='' && AllAddrs['_' + Addr1[0]]==null) AllAddrs['_' + Addr1[0]] = [16, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if(Addr1[1]!='' && AllAddrs['_' + Addr1[1]]==null) AllAddrs['_' + Addr1[1]] = [16, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    
    Addr1 = processOneAddr(reverse(str1), '17', false);
    if(Addr1[0]!='' && AllAddrs['_' + Addr1[0]]==null) AllAddrs['_' + Addr1[0]] = [17, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if(Addr1[1]!='' && AllAddrs['_' + Addr1[1]]==null) AllAddrs['_' + Addr1[1]] = [17, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    
    Addr1 = processOneAddr(str1, '18', true);
    if(Addr1[0]!='' && AllAddrs['_' + Addr1[0]]==null) AllAddrs['_' + Addr1[0]] = [18, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if(Addr1[1]!='' && AllAddrs['_' + Addr1[1]]==null) AllAddrs['_' + Addr1[1]] = [18, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    
    //--------------------------------------------
    
    str1 = '';
        for (y = 0; y <= 15; y++) {
            for (x = 15; x >= 0; x--) {
    
            str1 = str1 + matrix[x][y];
        }
    }

    Addr1 = processOneAddr(str1, '19', false);
    if(Addr1[0]!='' && AllAddrs['_' + Addr1[0]]==null) AllAddrs['_' + Addr1[0]] = [19, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if(Addr1[1]!='' && AllAddrs['_' + Addr1[1]]==null) AllAddrs['_' + Addr1[1]] = [19, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    
    Addr1 = processOneAddr(reverse(str1), '20', false);
    if(Addr1[0]!='' && AllAddrs['_' + Addr1[0]]==null) AllAddrs['_' + Addr1[0]] = [20, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if(Addr1[1]!='' && AllAddrs['_' + Addr1[1]]==null) AllAddrs['_' + Addr1[1]] = [20, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    
    Addr1 = processOneAddr(str1, '21', true);
    if(Addr1[0]!='' && AllAddrs['_' + Addr1[0]]==null) AllAddrs['_' + Addr1[0]] = [21, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if(Addr1[1]!='' && AllAddrs['_' + Addr1[1]]==null) AllAddrs['_' + Addr1[1]] = [21, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    
    //--------------------------------------------
    
    
    str1 = '';
        for (y = 15; y >= 0; y--) {
            for (x = 15; x >= 0; x--) {
    
            str1 = str1 + matrix[x][y];
        }
    }

    Addr1 = processOneAddr(str1, '22', false);
    if(Addr1[0]!='' && AllAddrs['_' + Addr1[0]]==null) AllAddrs['_' + Addr1[0]] = [22, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if(Addr1[1]!='' && AllAddrs['_' + Addr1[1]]==null) AllAddrs['_' + Addr1[1]] = [22, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    
    Addr1 = processOneAddr(reverse(str1), '23', false);
    if(Addr1[0]!='' && AllAddrs['_' + Addr1[0]]==null) AllAddrs['_' + Addr1[0]] = [23, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if(Addr1[1]!='' && AllAddrs['_' + Addr1[1]]==null) AllAddrs['_' + Addr1[1]] = [23, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    
    Addr1 = processOneAddr(str1, '24', true);
    if(Addr1[0]!='' && AllAddrs['_' + Addr1[0]]==null) AllAddrs['_' + Addr1[0]] = [24, 'comp', Addr1[0] + '', Addr1[2] + ''];
    if(Addr1[1]!='' && AllAddrs['_' + Addr1[1]]==null) AllAddrs['_' + Addr1[1]] = [24, 'uncomp', Addr1[1] + '', Addr1[2] + ''];
    
    //--------------------------------------------
    document.getElementById('currentProccess').innerHTML = "Try checked " + Object.keys(AllAddrs).length + " addresses.<br>\n";
    
    if(AutCleanLog){
        document.getElementById('gaMainLog').value = '';
    }
    sendRequestBalance(AllAddrs);
}

function isObject (value) {
 return value && typeof value === 'object' && value.constructor === Object;
}

function set_cookie ( name, value, exp_y, exp_m, exp_d, path, domain, secure )
{
  var cookie_string = name + "=" + escape ( value );
 
  if ( exp_y )
  {
    var expires = new Date ( exp_y, exp_m, exp_d );
    cookie_string += "; expires=" + expires.toGMTString();
  }
 
  if ( path )
        cookie_string += "; path=" + escape ( path );
 
  if ( domain )
        cookie_string += "; domain=" + escape ( domain );
  
  if ( secure )
        cookie_string += "; secure";
  
  document.cookie = cookie_string;
}

function delete_cookie ( cookie_name )
{
  var cookie_date = new Date ( );  // Текущая дата и время
  cookie_date.setTime ( cookie_date.getTime() - 1 );
  document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}

function get_cookie ( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
 
  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}


var CurrentRunReq = false;
var GlobalInReq = false;


function checkStopedReq(reqId){
    
    //document.getElementById("gaAlert").innerHTML = document.getElementById('gaAlert').innerHTML + " check " + reqId + " <Br>\n";
    if(CurrentRunReq===reqId){
        //document.getElementById("gaAlert").innerHTML = document.getElementById('gaAlert').innerHTML + " rerun req " + reqId + " <Br>\n";
        sendRequestBalance(GlobalInReq);
    }else if(CurrentRunReq===false){
        checkAutoRandom();
    }
}


function sendRequestBalance(AllAddrs){
    
    var request = new XMLHttpRequest();
    //console.log('AllAddrs:', AllAddrs);
    var AllAddrsAr = Array.from(Object.keys(AllAddrs), k=>AllAddrs[k][2]);
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
            if(this.responseText.indexOf('A security issue effects address')==0){
                var a1 = this.responseText.split('.');
                var a2 = a1[0].split(' ');
                var BrokenAddr = a2[5];
                //console.log('AddressBroken:', BrokenAddr);
                document.getElementById('gaMainLog').value = "!!!!!!!!!!!!!!!!!!! AddressBroken: " + BrokenAddr + "\n" + document.getElementById('gaMainLog').value;
                document.getElementById('currentProccess').innerHTML = document.getElementById('currentProccess').innerHTML + " !!!BrokenAddr:<b>" + BrokenAddr + "</b> <br>\nError:<br>\n<b>" + this.responseText + "</b><br>\n";
                OneAddrInfo = AllAddrs['_' + BrokenAddr];
                document.getElementById('balance[' + OneAddrInfo[0] + '][' + OneAddrInfo[1] + ']').value = this.responseText;
                delete AllAddrs['_'+BrokenAddr];
                sendRequestBalance(AllAddrs);
            }else if(isObject(JSON.parse(this.responseText))){
                var ResObj = JSON.parse(this.responseText);
                var InfoBalance = '';
                document.getElementById('currentProccess').innerHTML = document.getElementById('currentProccess').innerHTML + "Checked " + CountAddr + " addresses.<br>\n";
                for(var key in ResObj) {
                    //console.log('Key:', key);
                    //console.log('OneObj:', ResObj[key]);
                    OneAddrInfo = AllAddrs['_' + key];
                    document.getElementById('balance[' + OneAddrInfo[0] + '][' + OneAddrInfo[1] + ']').value = JSON.stringify(ResObj[key]);
                    document.getElementById('gaMainLog').value = key + ": " + JSON.stringify(ResObj[key]) + "\n" + document.getElementById('gaMainLog').value;
                    InfoBalance = ResObj[key];
                    if(InfoBalance['final_balance']>0 || InfoBalance['n_tx']>0){
                        document.getElementById('gaBalanceLog').value = ((InfoBalance['final_balance']>0)?'!!!!!Found Balance!!!!! ':'Found Tx and Zero Balance ') + key + "\n" + 
                                "PrivHex:" + OneAddrInfo[3] + "\n" +
                                "Balance:" + InfoBalance['final_balance'] + "\n" +
                                "Tx:" + InfoBalance['n_tx'] + "\n" +
                                "Total:" + InfoBalance['total_received'] + "\n" + 
                                "--------------------------------------------------------\n\n"+ document.getElementById('gaBalanceLog').value;
                        if(InfoBalance['final_balance']>0){
                            document.getElementById('gaAlert').innerHTML = document.getElementById('gaAlert').innerHTML + 
                                    "!!!!You found somthing!!!!! Do not forget to share with me :-) <b><i>1JvB28dD7Gyhe4R9QsJb4tTNCVxhWNq4hF</i></b><br>\n" + 
                                    "Found Address: <b>" + key + "</b><br>\n" +
                                    "PrivHex: <b>" + OneAddrInfo[3] + "</b><br>\n" + 
                                    "Balance: <b>" + InfoBalance['final_balance'] + "</b><br>\n" + 
                                    "Tx: <b>" + InfoBalance['n_tx'] + "<b><hr><br>\n";
                            document.getElementById('currentProccess').innerHTML = document.getElementById('currentProccess').innerHTML + "<b>Found Balance</b>:<b>" + key + "</b> \tBalance:<b>" + InfoBalance['final_balance'] + "</b><br>\n";
                        }else{
                            document.getElementById('currentProccess').innerHTML = document.getElementById('currentProccess').innerHTML + "Found Tx And Zero Balance:<b>" + key + "</b> \tTX:<b>" + InfoBalance['n_tx'] + "</b> \tTotal:<b>" + InfoBalance['total_received'] + "</b><br>\n";
                        }
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
    
    setTimeout('checkStopedReq('+CurrentRunReq+');', 5000);
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
    if(setreversehex){
        str1Hex = reverse(str1Hex);
    }
    str1Hex = str1Hex.padStart(64, '0');
    document.getElementById('hex[' + position + ']').value = str1Hex;
    if(position=='1'){
        document.getElementById('inputNewPrivatKey').value = str1Hex;
    }

    gen_compressed = true;
    compstr = (gen_compressed) ? 'comp' : 'uncomp';

    var h160 = getHash160AndAddr(document.getElementById('hex[' + position + ']').value, gen_compressed);
    document.getElementById('mh160[' + position + '][' + compstr + ']').value = h160[0];

    document.getElementById('mhash160[' + position + '][' + compstr + ']').value = h160[1];

    document.getElementById('maddr[' + position + '][' + compstr + ']').value = h160[2];
    
    document.getElementById('balance[' + position + '][' + compstr + ']').value = (h160[0] != '')?'Calculate ....':'Not get';

    var Addr1 = (h160[0] != '') ? h160[2] : '';

    gen_compressed = false;
    compstr = (gen_compressed) ? 'comp' : 'uncomp';

    var h160 = getHash160AndAddr(document.getElementById('hex[' + position + ']').value, gen_compressed);
    document.getElementById('mh160[' + position + '][' + compstr + ']').value = h160[0];

    document.getElementById('mhash160[' + position + '][' + compstr + ']').value = h160[1];

    document.getElementById('maddr[' + position + '][' + compstr + ']').value = h160[2];
    
    document.getElementById('balance[' + position + '][' + compstr + ']').value = (h160[0] != '')?'Calculate ....':'Not get';

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