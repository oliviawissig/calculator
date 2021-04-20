const symbols = ['7', '8', '9', '÷', '4', '5', '6', '×', '3', '2', '1', '-', '.', '0', '=', '+'];
const topContainer = document.querySelector('#top-container');
const container = document.querySelector('#btn-container');

function init(){
    let counter = 0;

    let clearBtnText = document.createElement('p');
    clearBtnText.classList.add('btn-text');
    clearBtnText.textContent = 'C';

    let clearBtn = document.createElement('div');
    clearBtn.classList.add('top-square');
    clearBtn.setAttribute('id', 'C');
    clearBtn.style.backgroundColor = "#443850";

    clearBtn.appendChild(clearBtnText);
    topContainer.append(clearBtn);

    let delBtnText = document.createElement('p');
    delBtnText.classList.add('btn-text');
    delBtnText.textContent = 'Del';

    let delBtn = document.createElement('div');
    delBtn.classList.add('top-square');
    delBtn.setAttribute('id', 'Del');
    delBtn.style.backgroundColor = "#443850";

    delBtn.appendChild(delBtnText);
    topContainer.append(delBtn);

    for(let i = 0; i < 4; i++){
        for(let j=0; j < 4; j++){
            let btnText = document.createElement('p');
            btnText.classList.add('btn-text');
            btnText.textContent = symbols[counter];

            let newBtn = document.createElement('div');
            newBtn.classList.add('square');
            newBtn.setAttribute('id', symbols[counter]);
            newBtn.style.backgroundColor = "#C0AB8E";
            if(symbols[counter] == '.'){
                newBtn.style.backgroundColor = "#BE9EC9";
            }else if(symbols[counter] == '÷' || symbols[counter] == '×' || symbols[counter] == '-' || symbols[counter] == '+' || symbols[counter] == '='){
                newBtn.style.backgroundColor = "#A9754F";
            }
            
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
    a = parseFloat(a);
    b = parseFloat(b);
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

    init();

    const screen = document.querySelector('#screen');

    let btns = Array.from(topContainer.childNodes);
    btns.push(...Array.from(container.childNodes));

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
                if(screenText == '0'){
                    console.log(this);
                    screen.textContent = this.textContent;
                }else{
                    if(boolSym == true){
                        screen.textContent = this.textContent;
                        boolSym = false;
                    }else{
                        if(screenText.length == 11){
                            screen.textContent = screen.textContent;
                        }else{
                            screen.textContent = screenText + this.textContent;
                        }
                    }
                }

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
                        if(ans.toString().length > 10){
                            let intLength = (Math.round(ans)).toString().length;
                            ans = ans.toFixed(10-intLength);
                        }
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
                            boolSym = true;
                        }
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
                
            }else if(this.style.backgroundColor == "rgb(190, 158, 201)"){
                //switched from clear button to period. 
                if(screen.textContent == '0'){
                    screen.textContent = '0.';
                }else{
                    screen.textContent = screen.textContent + '.';
                }
                
            }else if(this.style.backgroundColor == "rgb(68, 56, 80)"){
                //diff between cl/del buttons
                if(this.textContent == 'C'){
                    screen.textContent = '0';
                    sym, prevSym = '';
                    currNum = null, prevNum = null;
                    boolSym = false;
                    ans = undefined;
                }else if(this.textContent == 'Del'){
                    if( parseFloat(screen.textContent) < 10 ){
                        screen.textContent = '0';
                    }else{

                        let tempText = screen.textContent;
                        tempText = tempText.slice(0, tempText.length-1);

                        screen.textContent = tempText;

                    }
                }

            }

        });

    }

}

run();

document.addEventListener('keydown', (event) =>{

    if(symbols.includes(event.key)){
        document.getElementById(event.key).click();
    }

    if(event.key == 'Enter'){
        document.getElementById('=').click();
    }

    if(event.key == '/'){
        document.getElementById('÷').click();
    }

    if(event.key == 'c'){
        document.getElementById('C').click();
    }

    if(event.key == '*'){
        document.getElementById('×').click();
    }

    if(event.key == 'Backspace'){
        document.getElementById('Del').click();
    }

});
