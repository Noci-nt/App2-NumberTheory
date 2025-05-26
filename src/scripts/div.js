const divInputA=document.getElementById("divInputA");
const divInputB=document.getElementById("divInputB");
const divSbm=document.getElementById("divSbm");
const symbol=document.getElementById("symbol");
const eq=document.getElementById("eq");
const expltn=document.getElementById("expltn");
const divCopyBtn=document.getElementById("divCopy");
const divHistoryBtn=document.getElementById("divHistoryBtn");
const historyList=document.getElementById("hisList");
const hisClrBtn=document.getElementById("hisClrBtn");

let divA, divB, divQ, divR;
let divRecentResult=[];
let divHistoryData=[];

export function divSubmit(){                                                            //capture input values
    divA=Math.trunc(Number(divInputA.value));
    divB=Math.trunc(Number(divInputB.value));
    divVerf();
}

function divVerf(){                                                                     //check a
    if(divA==0){
        divClear();
        divInputA.placeholder="a ≠ 0";
        divInputB.value=divB;
    }
    else{
        divFilter();
        divOutput();
        divHistory(divSave());
        divUpdateButtonState();
    }
}

function divFilter(){                                                                   //check if a, b are positives or negatives
    if(divA>0){                                                                         //when a is positive algorthm's c deecreases towards 0
        if(divB>=0){
            const rtn=divAlgrthm(divA, divB, 0);
            extract(rtn);                                                  
        }
        else{

            const rtn=divAlgrthm(divA, divB, divB-1);
            extract(rtn); 
        }
    }
    else{
        if(divB>=0){                                                                    //when a is negative algorthm's c increases to infinity
            const rtn=divAlgrthm(-divA, divB, 0); 
            extract(rtn);                                                               //to reverse the increase we will multiply a by minus one
        }
        else{
            const rtn=divAlgrthm(-divA, divB, divB-1);
            extract(rtn); 
        }
    }
}

export function divAlgrthm(a, b, t){                                                    //approximates the q (t) whose r (c) is closest to 0
    let c=b-(a*t);
    while(c>=0){
        t++;
        c=b-(a*t);
    }
    return[t-1,b-(a*(t-1))];
}

function extract(zip){
    divQ=zip[0];
    divR=zip[1];
}

function divOutput(){                                                                   //show the adequate output
    if(divR==0){
        symbol.textContent="|";                                                         //is divisible
        divSbm.textContent="↔";
        eq.textContent=`${divB}=(${divA})(${divQ})`;
        expltn.textContent=`We obtain q = ${divQ} and r = ${divR}. Since r = 0, it follows that ${divA} | ${divB}.`;
    }
    else{
        symbol.textContent="∤";                                                         //isnt divisible
        divSbm.textContent="→";
        eq.textContent=`${divB}=(${divA})(${divQ})+${divR}`;
        expltn.textContent=`We obtain q = ${divQ} and r = ${divR}. Since r ≠ 0, it follows that ${divA} ∤ ${divB}.`;
    }
}

export function divClear(){
    divInputA.value="";
    divInputB.value="";
    divInputA.placeholder="a";
    divInputB.placeholder="b";
    symbol.textContent="|";
    divSbm.textContent="→";
    eq.textContent="b = (a)(q) + r"
    expltn.textContent="";
    divRecentResult.length=0;
    divUpdateButtonState();
}

function divSave(){
    if(divRecentResult.length!==0){
        divRecentResult.length=0;
    }                                                                                   //compact the inputs in a single array 
    divRecentResult.push(divA, divB, divQ, divR);
    return [...divRecentResult];
}

function divHistory(data){                                                              //save de input array in a history array with 15 save spaces
    if (divHistoryData.length>15){
        divHistoryData.shift();
    }
    divHistoryData.push(data);
}

function divUpdateButtonState(){
    divCopyBtn.disabled=divRecentResult.length===0;
    divHistoryBtn.disabled=divHistoryData.length===0;
}

export function divCopy() {
    if(divRecentResult[3]!==0){
        return `${divRecentResult[0]}∤${divRecentResult[1]} because ${divRecentResult[1]} has the form: b=aq+r where q=${divRecentResult[2]} and r=${divRecentResult[3]}≠0`;
    }
    else{
        return `${divRecentResult[0]}|${divRecentResult[1]} because ${divRecentResult[1]} has the form: b=aq+r where q=${divRecentResult[2]} and r=0`;
    }
}

export function divRenderHistory(){
    hisClrBtn.dataset.app="div-app"
    divHistoryData.forEach((entry, index)=>{
        const div=document.createElement('div');
        div.className='his-entry';
        div.innerHTML=`
            <span class="entry-text">a=${entry[0]}, b=${entry[1]},<br>q=${entry[2]}, r=${entry[3]}</span>
            <div class="entry-buttons">
                <button class="action-button entry-button" data-action="entry-copy" data-index="${index}" type="button"><img src="src/assets/icons/copy.svg"></button>
                <button class="action-button entry-button" data-action="entry-edit" data-index="${index}" type="button"><img src="src/assets/icons/edit.svg"></button>
            </div>
        `;
        historyList.prepend(div);
    });
}

export function divClearHistory(){
    divHistoryData.length=0;
    divUpdateButtonState();
}

export function divHistoryCopy(index) {
    const entry=divHistoryData[index];
    if(entry[3]!==0){
        return `${entry[0]}∤${entry[1]} because ${entry[1]} has the form: b=aq+r where q=${entry[2]} and r=${entry[3]}≠0`;
    }
    else{
        return `${entry[0]}|${entry[1]} because ${entry[1]} has the form: b=aq+r where q=${entry[2]} and r=0`;
    }
}

export function divHistoryEdit(index){
    const entry=divHistoryData[index];
    divClear();
    divInputA.value=entry[0];
    divInputB.value=entry[1];
}