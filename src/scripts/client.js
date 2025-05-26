import {
    divSubmit, divClear, divCopy, divRenderHistory, 
    divClearHistory, divHistoryCopy, divHistoryEdit
} from "./div.js";

import { 
    gcdSubmit, gcdClear, gcdCopy,  gcdRenderHistory,
    gcdClearHistory, gcdHistoryCopy, gcdHistoryEdit
} from "./gcd.js";

import { 
    lcmSubmit, lcmClear, lcmCopy, lcmRenderHistory,
    lcmClearHistory, lcmHistoryCopy, lcmHistoryEdit
} from "./lcm.js";

import { 
    tstSubmit, tstClear, tstCopy, tstRenderHistory,
    tstClearHistory, tstHistoryCopy, tstHistoryEdit
} from "./tst.js";

import { 
    ftaClear, ftaSubmit, ftaCopy, ftaRenderHistory,
    ftaClearHistory, ftaHistoryCopy, ftaHistoryEdit
} from "./fta.js";

document.addEventListener("DOMContentLoaded", ()=>{

    //doc objects 
        //history
    const historyWindow=document.getElementById("history");
    const historyList=document.getElementById("hisList");
    const hisClrBtn=document.getElementById("hisClrBtn")
        //nav
    const navButtons=document.querySelectorAll(".nav-button");
    const apps=document.querySelectorAll(".app");
        //buttons
    const sbmtButtons=document.querySelectorAll(".submit");
    const actButtons=document.querySelectorAll(".action-button"); 
        //icons
    const copyIcon= "src/assets/icons/copy.svg";
    const checkIcon= "src/assets/icons/check.svg";
    const closeIcon= "src/assets/icons/close.svg";

                                    /*----[NAVIGATION]----*/
    navButtons.forEach(button => {
        button.addEventListener("click",()=>{
            const target=button.getAttribute("data-target");

            navButtons.forEach(btn=>btn.classList.remove("nav-active"));
            button.classList.add("nav-active");

            apps.forEach(app =>{
                if(app.id===target){
                    app.classList.add("app-active");
                }
                else{
                    app.classList.remove("app-active");
                }
            })
        })
    });

                                        /*----[SUBMIT]----*/
    sbmtButtons.forEach(button => {
        button.addEventListener("click",()=>{
            const appId=button.getAttribute("data-app");

            switch(appId){
                case "div-app":
                    divSubmit();
                    break;
                case "gcd-app":
                    gcdSubmit();
                    break;
                case "tst-app":
                    tstSubmit();
                    break;
                case "fta-app":
                    ftaSubmit();
                    break;
                case "lcm-app":
                    lcmSubmit();
                    break;
                default:
                    console.log(`Error: To developer: No submit handler for ${appId}`); 
                    break; 
            }
        })
    });
                                        /*----[ACTIONS]----*/
    actButtons.forEach(button => {
        button.addEventListener("click",()=>{
            const action=button.getAttribute("data-action");
            const appId=button.getAttribute("data-app");
            
            switch (appId) {
                case "history":
                    switch(action){
                        case "close":
                            hisClose();
                            break
                        default:
                            console.log(`Error: To developer: No action handler for ${action}`);
                            break;
                    }
                    break;
                case "div-app":
                    switch (action) {
                        case "clear":
                            divClear();
                            break;
                        case "copy":
                            copy(button, divCopy());
                            break;
                        case "history":
                            history(divRenderHistory);
                            hisButtons(divHistoryCopy, divHistoryEdit);
                            break;
                        case "his-clear":
                            hisClear(divClearHistory, divRenderHistory);
                            break;
                        default:
                            console.log(`Error: To developer: No action handler for ${action}`);
                            break;
                    }
                    break;
                case "gcd-app":
                    switch (action) {
                        case "clear":
                            gcdClear();
                            break;
                        case "copy":
                            copy(button, gcdCopy());
                            break;
                        case "history":
                            history(gcdRenderHistory);
                            hisButtons(gcdHistoryCopy, gcdHistoryEdit);
                            break;
                         case "his-clear":
                            hisClear(gcdClearHistory, gcdRenderHistory);
                            break;
                        default:
                            console.log(`Error: To developer: No action handler for ${action}`);
                            break;
                    }
                    break;
                case "lcm-app":
                    switch(action){
                        case "clear":
                            lcmClear();
                            break;
                        case "copy":
                            copy(button, lcmCopy());
                            break;
                        case "history":
                            history(lcmRenderHistory);
                            hisButtons(lcmHistoryCopy, lcmHistoryEdit);
                            break;
                        case "his-clear":
                            hisClear(lcmClearHistory, lcmRenderHistory);
                            break;
                        default:
                        console.log(`Error: To developer: No action handler for ${action}`);
                        break;
                    }
                    break;
                case "tst-app":
                    switch (action) {
                        case "clear":
                            tstClear();
                            break;
                        case "copy":
                            copy(button, tstCopy());
                            break;
                        case "history":
                            history(tstRenderHistory);
                            hisButtons(tstHistoryCopy, tstHistoryEdit);
                            break;
                        case "his-clear":
                            hisClear(tstClearHistory, tstRenderHistory);
                            break;
                        default:
                            console.log(`Error: To developer: No action handler for ${action}`);
                            break;
                    }
                    break;
                case "fta-app":
                    switch(action){
                        case "clear":
                            ftaClear();
                            break;
                        case "copy":
                            copy(button, ftaCopy());
                            break;
                        case "history":
                            history(ftaRenderHistory);
                            hisButtons(ftaHistoryCopy, ftaHistoryEdit);
                            break;
                        case "his-clear":
                            hisClear(ftaClearHistory, ftaRenderHistory);
                            break;
                        default:
                            console.log(`Error: To developer: No action handler for ${action}`);
                            break;
                    }
                    break;
                default:
                    console.log(`Error: To developer: No action handler for ${appId}`);
                    break;
            }
        })
    })

    function copy(button, funct){
        const clipboardText=funct;
        const img=button.querySelector("img");
        navigator.clipboard.writeText(clipboardText)
            .then(()=>{
                img.src=checkIcon;
            })
            .catch(()=>{
                img.src=closeIcon;
            })
            .finally(()=>{
                setTimeout(()=>{
                    img.src=copyIcon;
                }, 600);
            })
    }

    function history(funct){
        historyList.innerHTML='';
        funct();
        if(historyList.children.length===0) {
            hisClrBtn.disabled=true;
        }
        else{
            hisClrBtn.disabled=false;
        }
        historyWindow.classList.add('history-active');
    }

    function hisClose(){
        historyWindow.classList.remove('history-active');
    }

    function hisClear(funct, renderFunct){
        if(confirm('Would you like to clear the history?')){
            funct();
            history(renderFunct);   
        }    
    }

    function hisButtons(functCopy,functEdit){
        const entryButtons=document.querySelectorAll('.entry-button');
        entryButtons.forEach(hisButton => {
            hisButton.addEventListener("click", ()=>{
            const hisAction=hisButton.getAttribute("data-action");
            const index=hisButton.getAttribute("data-index");
            switch(hisAction){
                case "entry-copy":
                    copy(hisButton, functCopy(index));
                    break;
                case "entry-edit":
                    edit(functEdit, index);
                    break;
                default:
                    console.log(`Error: To developer: No action handler for ${hisButton}`);
                    break;    
                }
            });
        });
    }

    function edit(funct, index){
        funct(index);
        hisClose();
    }
});


