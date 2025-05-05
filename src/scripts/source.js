/* TO DO
 --history n copy btns
    --copy interface
        --text or var values formats
    --history interface
        --copy n edit history entry
        --add time marks to history entry
        --add cookies for save history time marks
*/

document.addEventListener("DOMContentLoaded", ()=>{
    //doc objects 
    const inputA=document.getElementById("inputA");
    const inputB=document.getElementById("inputB");
    const divBtnSbm=document.getElementById("divBtnSbm");
    const symbol=document.getElementById("symbol");
    const eq=document.getElementById("eq");
    const expltn=document.getElementById("expltn");
    const divBtnErs=document.getElementById("divBtnErs");
    //vars 
    let a, b, q, r;
    let historySet=[];

    //main
    divBtnSbm.onclick=submit;

    //tools
    divBtnErs.onclick=erase;

    function submit(){                                                                  //capture input values
        a=Math.trunc(inputA.value);
        b=Math.trunc(inputB.value);
        verf();
    }

    function verf(){                                                                    //check a
        if(a==0){
            clear();
            inputA.placeholder="a ≠ 0";
        }
        else{
            filter();
            output();
            let data=save();
            history(entry=data);
            console.log(historySet);
        }

    }

    function filter(){                                                                  //check if a, b are positives or negatives
        if(a>0){                                                                        //when a is positive algorthm's c deecreases towards 0
            if(b>=0){
                algrthm(t=0, f=1);                                                      
            }
            else{

                algrthm(t=b-1, f=1);
            }
        }
        else{
            if(b>0){                                                                    //when a is negative algorthm's c increases to infinity
                algrthm(t=0, f=-1);                                                     //to reverse the increase we will multiply a by minus one
            }
            else{
                algrthm(t=b-1, f=-1);
            }
        }
    }

    function algrthm(t, f){                                                             //approximates the q (t) whose r (c) is closest to 0
        let c=b-(a*t*f);
        while(c>=0){
            t++;
            c=b-(a*t*f);
        }
        q=t-1;
        r=b-(a*q*f);
    }

    function output(){                                                                  //show the adequate output
        if(r==0){
            symbol.textContent="|";                                                     //is divisible
            divBtnSbm.textContent="↔";
            eq.textContent=`${b}=(${a})(${q})`;
            expltn.textContent=`We obtain q = ${q} and r = ${r}. Since r = 0, it follows that a | b.`;
        }
        else{
            symbol.textContent="∤";                                                     //isnt divisible
            divBtnSbm.textContent="→";
            eq.textContent=`${b}=(${a})(${q})+${r}`;
            expltn.textContent=`We obtain q = ${q} and r = ${r}. Since r ≠ 0, it follows that a ∤ b.`;
        }
    }

    function clear(){
        inputA.value="";
        symbol.textContent="|";
        divBtnSbm.textContent="→";
        eq.textContent="b = (a)(q) + r"
        expltn.textContent="";
    }

    function erase(){
        clear();
        inputB.value="";
        inputA.placeholder="a";
        inputB.placeholder="b"
    }

    function save(){                                                                    //compact the inputs in a single array 
        let inputs=[];
        inputs.push(a);
        inputs.push(b);
        inputs.push(q);
        inputs.push(r);
        return(inputs);
    }

    function history(entry){                                                            //save de input array in a history array with 15 save spaces
        if (historySet.length<15){
            historySet.push(entry);
        }
        else{
            historySet.shift();
            historySet.push(entry);
        }
    }

});
