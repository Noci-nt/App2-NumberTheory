

const tstInput=document.getElementById("tstInput");
const tstRslut=document.getElementById("tstRslt");
const tstCopyBtn=document.getElementById("tstCopy");
const tstHistoryBtn=document.getElementById("tstHistory");
const historyList=document.getElementById("hisList");
const hisClrBtn=document.getElementById("hisClrBtn");

let tstN;
let tstRecentResult=[];
let tstHistoryData=[];

export function tstSubmit(){
    const inputValue=tstInput.value;
    try{
        tstN=BigInt(inputValue);
    }
    catch(e){
        tstInput.value="";
        tstInput.placeholder=`Invalid input`;
        return;
    }
    tstVerf();
}

function tstVerf(){
    if(tstN<2n){
        tstClear();
        tstInput.placeholder="n>1";
        return;
    }

    if(tstN===2n||tstN===3n){
        tstRslut.textContent=`${tstN} is prime`;
        tstHistory(tstSave(0));
        tstUpdateButtonState();
        return;
    }

    if(tstN%2n===0n||tstN%3n===0n){
        tstRslut.textContent=`${tstN} is composite`;
        tstHistory(tstSave(0));
        tstUpdateButtonState();
        return;
    }

    const primlt=trialTest(tstN);

    if(primlt[0]){
        tstRslut.textContent=`${tstN} is prime`;
        tstHistory(tstSave(1));
        tstUpdateButtonState();
    }
    else{
        tstRslut.textContent=`${tstN} is composite`;
        tstHistory(tstSave(0));
        tstUpdateButtonState();
    }
}

export function trialTest(n){
    n = BigInt(n);
    const threshold=bigintSqr(n);

    for (let i=5n; i<=threshold; i+=6n) {
        if(n%i===0n){
            return [0, i];
        }
        else if (n%(i+2n)===0n){
            return [0, i+2n];
        }
    }

    return [1];
}

function bigintSqr(n){
    n=BigInt(n);
    let x0=n;
    let x1=(n>>1n)+1n;

    while(x1<x0){
        x0=x1;
        x1=((n/x1)+x1)>>1n;
    }

    return x0;
}

export function tstClear(){
    tstInput.value="";
    tstInput.placeholder="n";
    tstRslut.textContent="n primality";
    tstRecentResult.length=0;
    tstUpdateButtonState();
}

function tstSave(prmlt){
    if(tstRecentResult.length!==0){
        tstRecentResult.length=0;
    }
    tstRecentResult.push(tstN, prmlt);
    return [...tstRecentResult];
}

function tstHistory(data){
    if (tstHistoryData.length>15){
        tstHistoryData.shift();
    }
    tstHistoryData.push(data);
}

export function tstCopy(){
    if(tstRecentResult[1]===0){
        return `${tstN} is composite`;
    }
    else{
        return `${tstN} is prime`;
    }
}

function tstUpdateButtonState(){
    tstCopyBtn.disabled=tstRecentResult.length===0;
    tstHistoryBtn.disabled=tstHistoryData.length===0;
}

export function tstRenderHistory(){
    hisClrBtn.dataset.app="tst-app"
    tstHistoryData.forEach((entry, index)=>{
        const div=document.createElement('div');
        let prmlt;
        if(entry[1]===0){
            prmlt='compiste';
        }
        else{
            prmlt='prime';
        }
        div.className='his-entry';
        div.innerHTML=`
            <span class="entry-text">${entry[0]} is ${prmlt}</span>
            <div class="entry-buttons">
                <button class="action-button entry-button" data-action="entry-copy" data-index="${index}" type="button"><img src="src/assets/icons/copy.svg"></button>
                <button class="action-button entry-button" data-action="entry-edit" data-index="${index}" type="button"><img src="src/assets/icons/edit.svg"></button>
            </div>
        `;
        historyList.prepend(div);
    });
}

export function tstClearHistory(){
    tstHistoryData.length=0;
    tstUpdateButtonState();
}

export function tstHistoryCopy(index) {
    const entry=tstHistoryData[index];
    if(entry[1]===0){
        return `${entry[0]} is composite`;
    }
    else{
        return `${entry[0]} is prime`;
    }
}

export function tstHistoryEdit(index){
    const entry=tstHistoryData[index];
    tstClear();
    tstInput.value=entry[0];
}