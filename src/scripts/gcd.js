import { divAlgrthm } from "./div.js";

const gcdInputA=document.getElementById("gcdInputA");
const gcdInputB=document.getElementById("gcdInputB");
const gcdRslt=document.getElementById("rslt");
const gcdCopyBtn=document.getElementById("gcdCopy");
const gcdHistoryBtn=document.getElementById("gcdHistory");
const historyList=document.getElementById("hisList");
const hisClrBtn=document.getElementById("hisClrBtn");

let gcdA, gcdB, gcdD;
let gcdRecentResult=[];
let gcdHistoryData=[];

export function gcdSubmit(){
    gcdA=Math.trunc(Number(gcdInputA.value));
    gcdB=Math.trunc(Number(gcdInputB.value));
    gcdVerf();
}

function gcdVerf(){
    const a=Math.abs(gcdA);
    const b=Math.abs(gcdB);

    if(a===0&&b===0) {
        gcdClear();
        gcdInputA.placeholder="At least one";
        gcdInputB.placeholder="must be nonzero";
        return;
    }
    
    if(a===0){
        gcdD=b;
        rslt.textContent=`${gcdD}`;
        gcdHistory(gcdSave());
        gcdUpdateButtonState();
        return;
    }

    gcdD=gcdAlgrthm(a,b);
    gcdRslt.textContent=`${gcdD}`;
    gcdHistory(gcdSave());
    gcdUpdateButtonState();
}

export function gcdAlgrthm(a,b){
    let rtn=divAlgrthm(a, b , 0);
    if(rtn[1]!=0){
        return gcdAlgrthm(rtn[1], a);
    }
    else{
        return a;
    }
}

export function gcdClear(){
    gcdInputA.value="";
    gcdInputB.value="";
    gcdInputA.placeholder="a";
    gcdInputB.placeholder="b";
    gcdRslt.textContent="d";
    gcdRecentResult.length=0;
    gcdUpdateButtonState();
}

function gcdSave(){
    if(gcdRecentResult.length!==0){
        gcdRecentResult.length=0;
    }
    gcdRecentResult.push(gcdA, gcdB, gcdD);
    return [...gcdRecentResult];
}

function gcdHistory(data){
    if (gcdHistoryData.length>15){
        gcdHistoryData.shift();
    }
    gcdHistoryData.push([...data]);
}

function gcdUpdateButtonState(){
    gcdCopyBtn.disabled=gcdRecentResult.length===0;
    gcdHistoryBtn.disabled=gcdHistoryData.length===0;
}

export function gcdCopy(){
    return `gcd(${gcdA}, ${gcdB})=${gcdD}`;
}

export function gcdRenderHistory(){
    hisClrBtn.dataset.app="gcd-app"
    gcdHistoryData.forEach((entry, index)=>{
        const div=document.createElement('div');
        div.className='his-entry';
        div.innerHTML=`
            <span class="entry-text">gcd(${entry[0]},${entry[1]})=${entry[2]}</span>
            <div class="entry-buttons">
                <button class="action-button entry-button" data-action="entry-copy" data-index="${index}" type="button"><img src="src/assets/icons/copy.svg"></button>
                <button class="action-button entry-button" data-action="entry-edit" data-index="${index}" type="button"><img src="src/assets/icons/edit.svg"></button>
            </div>
        `;
        historyList.prepend(div);
    });
}

export function gcdClearHistory(){
    gcdHistoryData.length=0;
    gcdUpdateButtonState();
}

export function gcdHistoryCopy(index) {
    const entry=gcdHistoryData[index];
    return `gcd(${entry[0]}, ${entry[1]})=${entry[2]}`;
}

export function gcdHistoryEdit(index){
    const entry=gcdHistoryData[index];
    gcdClear();
    gcdInputA.value=entry[0];
    gcdInputB.value=entry[1];
}