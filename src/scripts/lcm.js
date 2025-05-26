import { divAlgrthm } from "./div.js";
import { gcdAlgrthm } from "./gcd.js";

const lcmInputA=document.getElementById("lcmInputA");
const lcmInputB=document.getElementById("lcmInputB");
const lcmRslt=document.getElementById("lcmRslt");
const lcmCopyBtn=document.getElementById("lcmCopy");
const lcmHistoryBtn=document.getElementById("lcmHistory");
const historyList=document.getElementById("hisList");
const hisClrBtn=document.getElementById("hisClrBtn");

let lcmA, lcmB, lcmM;
let lcmRecentResult=[];
let lcmHistoryData=[];

export function lcmSubmit(){
    lcmA=Math.trunc(Number(lcmInputA.value));
    lcmB=Math.trunc(Number(lcmInputB.value));
    lcmVerf();
}

function lcmVerf(){
    if(lcmA===0){
        lcmClear();
        lcmInputA.placeholder='a ≠ 0';
        lcmInputB.value=lcmB;
        return;
    }
    if(lcmB===0){
        lcmClear();
        lcmInputB.placeholder='b ≠ 0';
        lcmInputA.value=lcmA;
        return;
    }

    const a=Math.abs(lcmA);
    const b=Math.abs(lcmB);

    
    lcmM=lcmAlgrthm(a, b);
    lcmRslt.textContent=`${lcmM}`;
    lcmHistory(lcmSave());
    lcmUpdateButtonState()
}

function lcmAlgrthm(a, b){
    const gcd=gcdAlgrthm(a,b);
    const prod=a*b;
    return prod/gcd;
    
}

export function lcmClear(){
    lcmInputA.value="";
    lcmInputA.placeholder="a";
    lcmInputB.value="";
    lcmInputB.placeholder="b";
    lcmRslt.textContent="m";
    lcmRecentResult.length=0;
    lcmUpdateButtonState()
}

function lcmSave(){
    if(lcmRecentResult.length!==0){
        lcmRecentResult.length=0;
    }
    lcmRecentResult.push(lcmA, lcmB, lcmM);
    return [...lcmRecentResult];
}

function lcmHistory(data){
    if (lcmHistoryData.length>15){
        lcmHistoryData.shift();
    }
    lcmHistoryData.push([...data]);
}

export function lcmCopy(){
    return `lcm(${lcmA}, ${lcmB})=${lcmM}`;
}

function lcmUpdateButtonState(){
    lcmCopyBtn.disabled=lcmRecentResult.length===0;
    lcmHistoryBtn.disabled=lcmHistoryData.length===0;
}

export function lcmRenderHistory(){
    hisClrBtn.dataset.app="lcm-app"
    lcmHistoryData.forEach((entry, index)=>{
        const div=document.createElement('div');
        div.className='his-entry';
        div.innerHTML=`
            <span class="entry-text">lcm(${entry[0]},${entry[1]})=${entry[2]}</span>
            <div class="entry-buttons">
                <button class="action-button entry-button" data-action="entry-copy" data-index="${index}" type="button"><img src="src/assets/icons/copy.svg"></button>
                <button class="action-button entry-button" data-action="entry-edit" data-index="${index}" type="button"><img src="src/assets/icons/edit.svg"></button>
            </div>
        `;
        historyList.prepend(div);
    });
}

export function lcmClearHistory(){
    lcmHistoryData.length=0;
    lcmUpdateButtonState();
}

export function lcmHistoryCopy(index){
    const entry=lcmHistoryData[index];
    return `lcm(${entry[0]}, ${entry[1]})=${entry[2]}`;
}

export function lcmHistoryEdit(index){
    const entry=lcmHistoryData[index];
    lcmClear();
    lcmInputA.value=entry[0];
    lcmInputB.value=entry[1];
}