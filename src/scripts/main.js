import {
    divSubmit,
    divClear,
    divCopy
} from "./div.js";
import { 
    gcdSubmit,
    gcdClear,
    gcdCopy
} from "./gcd.js";

document.addEventListener("DOMContentLoaded", ()=>{
    //doc objects 
        //nav
    const navButtons=document.querySelectorAll(".nav-button");
    const apps=document.querySelectorAll(".app");
        //buttons
    const sbmtButtons=document.querySelectorAll(".submit");
    const actButtons=document.querySelectorAll(".action-button"); 
        //???
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
                case "div-app":
                    switch (action) {
                        case "clear":
                            divClear();
                            break;
                        case "copy":
                            Copy(button, divCopy());
                            break;
                        case "history":
                            console.log("placeholder");
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
                            Copy(button, gcdCopy());
                            break;
                        case "history":
                            console.log("placeholder");
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

    function Copy(button, callback){
        const clipboardText=callback;
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
});


