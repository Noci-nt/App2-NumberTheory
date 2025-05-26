import { trialTest } from "./tst.js";
const ftaInput=document.getElementById("ftaInput");
const ftaRslt=document.getElementById("ftaRslt");
const ftaCopyBtn=document.getElementById("ftaCopy");
const ftaHistoryBtn=document.getElementById("ftaHistory");
const historyList=document.getElementById("hisList");
const hisClrBtn=document.getElementById("hisClrBtn");

let ftaN;
let ftaRecentResult=[];
let ftaHistoryData=[];

export function ftaSubmit(){
    const inputValue=ftaInput.value;
    try{
        ftaN=BigInt(inputValue);
    }
    catch(e){
        ftaInput.value="";
        ftaInput.placeholder=`Invalid input`;
        return;
    }
    ftaVerf();
}

function ftaVerf(){
    if(ftaN<2n){
        ftaClear();
        ftaInput.placeholder="n>1";
        return;
    }

    ftaPrint(ftaMapFactors(ftaFactorization(ftaN)));
    ftaUpdateButtonState();
}

function ftaFactorization(n){
    const factors=[];
    n = BigInt(n);

    while(n%2n===0n){
        factors.push(2n);
        n /= 2n;
    }

    while(n%3n===0n){
        factors.push(3n);
        n /= 3n;
    }

    while (true){
        const test=trialTest(n);
        const factor=primeFactor(test);
        if(factor===null) break;

        factors.push(factor);
        n /= factor;
    }

    if(n>1n) factors.push(n);
    
    return factors;
}

function primeFactor(test){
    if(test[0]) return null;
    return test[1];
}

function ftaMapFactors(factors){
    const counting= new Map();

    factors.forEach(f => {
        counting.set(f, (counting.get(f)||0n) + 1n);
    });

    ftaHistory(ftaSave(Array.from(counting.entries())));
    return Array.from(counting.entries());
}

function ftaPrint(factors){
    ftaRslt.innerHTML='';

    factors.forEach((pair, index)=>{
        const [base, exp] = pair;
        const span=document.createElement('span');
        span.className='text';
        if(exp===1n){
            span.innerHTML=`${base.toString()}`;
            ftaRslt.appendChild(span);
        }
        else{
            span.innerHTML=`${base.toString()}<sup>${exp.toString()}</sup>`;
            ftaRslt.appendChild(span);
        }
        if(index<factors.length-1){
            const point=document.createTextNode(' · ');
            ftaRslt.appendChild(point);
        }
    });
}

function ftaSave(data){
    if(ftaRecentResult.length!==0){
        ftaRecentResult.length=0;
    }
    ftaRecentResult=data;
    ftaRecentResult.unshift(ftaN);
    return [...ftaRecentResult];
}

function ftaHistory(data){
    if (ftaHistoryData.length>15){
        ftaHistoryData.shift();
    }
    ftaHistoryData.push(data);
}

export function ftaCopy(){
    const txt=ftaText(ftaRecentResult);

    return txt;
}

function ftaText(array){
    const slicedArray=array.slice(1);
    const txt=slicedArray
        .map(([base, exp])=>{
            return exp===1n
            ? base.toString()
            : `${base.toString()}${ftaSup(exp)}`;
        })
        .join(' · ');

    return txt;
}

function ftaSup(n){
    const map={
        '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
        '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
    };

    return n.toString()
        .split('')
        .map(d => map[d])
        .join('');
}

export function ftaClear(){
    ftaInput.value="";
    ftaInput.placeholder="n";
    ftaRslt.textContent="";
    ftaRecentResult.length=0;
    ftaUpdateButtonState();
}

function ftaUpdateButtonState(){
    ftaCopyBtn.disabled=ftaRecentResult.length===0;
    ftaHistoryBtn.disabled=ftaHistoryData.length===0;
}

export function ftaRenderHistory(){
    hisClrBtn.dataset.app="fta-app"
    ftaHistoryData.forEach((entry, index)=>{
        const div=document.createElement('div');
        const txt=ftaText(entry);
        
        div.className='his-entry';
        div.innerHTML=`
            <span class="entry-text">${entry[0]}=${txt}</span>
            <div class="entry-buttons">
                <button class="action-button entry-button" data-action="entry-copy" data-index="${index}" type="button"><img src="src/assets/icons/copy.svg"></button>
                <button class="action-button entry-button" data-action="entry-edit" data-index="${index}" type="button"><img src="src/assets/icons/edit.svg"></button>
            </div>
        `;
        historyList.prepend(div);
    });
}

export function ftaClearHistory(){
    ftaHistoryData.length=0;
    ftaUpdateButtonState();
}

export function ftaHistoryCopy(index) {
    const entry=ftaHistoryData[index];
    const txt=ftaText(entry);
    return `${txt}`;
}

export function ftaHistoryEdit(index){
    const entry=ftaHistoryData[index];
    ftaClear();
    ftaInput.value=entry[0];
}