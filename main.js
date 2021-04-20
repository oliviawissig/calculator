const symbols = ['7', '8', '9', '÷', '4', '5', '6', '×', '3', '2', '1', '-', 'C', '0', '=', '+'];

function init(){
    let counter = 0;

    const container = document.querySelector('#btn-container');
    for(let i = 0; i < 4; i++){
        for(let j=0; j < 4; j++){
            let btnText = document.createElement('p');
            btnText.classList.add('btn-text');
            btnText.style.marginTop = "16px";
            btnText.style.textAlign = "center";
            btnText.style.fontSize = "34px";
            btnText.textContent = symbols[counter];

            let newBtn = document.createElement('div');
            newBtn.classList.add('square');
            newBtn.style.backgroundColor = "#C0AB8E";
            newBtn.style.height = "80px";
            if(symbols[counter] == 'C'){
                newBtn.style.backgroundColor = "#BE9EC9";
            }else if(symbols[counter] == '÷' || symbols[counter] == '×' || symbols[counter] == '-' || symbols[counter] == '+' || symbols[counter] == '='){
                newBtn.style.backgroundColor = "#A9754F";
            }
            newBtn.style.borderRadius = "4px";
            newBtn.appendChild(btnText);
            container.appendChild(newBtn);
            counter++;
        }
    }

}

function add(a,b){
    return a+b;
}

function sub(a,b){
    return a-b;
}

function sum(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(symb, a, b){
    a = parseInt(a);
    b = parseInt(b);
    switch(symb){
        case "+":   return add(a, b);
        case "-":   return sub(a, b);
        case "×":   return sum(a, b);
        case "÷":   return divide(a, b);
    }
}

function run(){
    let prevNum = null;
    let currNum = null;
    let prevSym = "";
    let sym = "";
    let boolSym = false;

    let ans = "";
    
    let screenText = "";
    const screen = document.querySelector('#screen');

    init();

    let btns = document.querySelector('#btn-container').childNodes;
    btns = Array.from(btns);

    for(let i=0;i<btns.length;i++){
        btns[i].addEventListener('mouseover', function(){
            btns[i].style.transform = "scale(1.1)";
        });

        btns[i].addEventListener('mouseout', function(){
            btns[i].style.transform = "scale(1)";
        });

        btns[i].addEventListener('click', function(){
            btns[i].style.transform = "scale(0.9)";
            setTimeout(function(){
                btns[i].style.transform = "scale(1)";
            }, 300);

            if(this.style.backgroundColor == "rgb(192, 171, 142)"){
                //numbers, append to screen textContent
                screenText = screen.textContent;
                console.log(boolSym);
                if(screenText == '0'){
                    screen.textContent = this.textContent;
                }else{
                    if(boolSym == true){
                        screen.textContent = this.textContent;
                        boolSym = false;
                    }else{
                        screen.textContent = screenText + this.textContent;
                    }
                }
                console.log('prevSym: ' + prevSym + ', sym: ' + sym);
                console.log('prevNum: ' + prevNum + ', currNum: ' + currNum);
                console.log('ans: ' + ans + ', boolSym: ' + boolSym);
                console.log('\n');

            }else if(this.style.backgroundColor == "rgb(169, 117, 79)"){
                //operator, get textContent and save to prevNum & listen for next num
                prevSym = sym;
                sym = this.textContent;
                if(sym == '='){
                    //evaluate
                    prevNum = currNum;
                    currNum = screen.textContent;
                    if(prevNum == null || currNum == null){
                        screen.textContent = screen.textContent;
                    }else{
                        ans = operate(prevSym, prevNum, currNum);
                        console.log('ans: ' + ans);
                        if(ans == undefined){
                            screen.textContent = screen.textContent;
                        }else if(ans == Infinity){
                            screen.textContent = 'Nice try';
                            sym, prevSym = '';
                            currNum = null, prevNum = null;
                            boolSym = true;
                            setTimeout(function(){
                                alert("It's not possible to divide by 0! Restting calculator...");
                            }, 100);
                            setTimeout(function(){
                                screen.textContent = '0';
                            }, 100);
                        }else{
                            screen.textContent = ans;
                        }
                        boolSym = false;
                    }
                }else{
                    boolSym = true;
                    prevNum = currNum;
                    currNum = screen.textContent;

                    if(prevNum == null || currNum == null){
                        //don't do anything. 
                    }else{
                        ans = operate(prevSym, prevNum, currNum);
                        if(ans == undefined){
                            //leave screen as is
                        }else{
                            screen.textContent = ans;
                        }
                    }
                }
                console.log('prevSym: ' + prevSym + ', sym: ' + sym);
                console.log('prevNum: ' + prevNum + ', currNum: ' + currNum);
                console.log('ans: ' + ans + ', boolSym: ' + boolSym);
                console.log('\n');
                
            }else if(this.style.backgroundColor == "rgb(190, 158, 201)"){
                //c, set textContent back to zero and set nums, symb back to ""
                screen.textContent = '0';
                sym, prevSym = '';
                currNum = null, prevNum = null;
                boolSym = false;

                console.log('prevSym: ' + prevSym + ', sym: ' + sym);
                console.log('prevNum: ' + prevNum + ', currNum: ' + currNum);
                console.log('ans: ' + ans + ', boolSym: ' + boolSym);
            }

        });

    }

}

run();