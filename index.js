const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');
let input = "";

addEventListener('keydown',(event) => {
       //compatiable with keyboards using keydown and switch cases
        switch (event.key){
            case "Delete":
                input = "";
                display_input.innerHTML = "";
                display_output.innerHTML = "";
                break;
            case "Backspace":
                input = input.slice(0,-1);
                display_input.innerHTML =  InputCleaner(input);
                break;
            case "Enter":
                let result = eval(Percent(input))
                display_output.innerHTML =  OutputCleaner(result);
                break;
                default:
                    if(ValidateInput(event.key)){
                    
                    input += event.key;
                    display_input.innerHTML = InputCleaner(input);
                    }
                    break;
        }

    })
    for (let key of keys ) { // for loop to give a definition to all the keys visble in the interface
    const value = key.dataset.key;

   
    
    key.addEventListener('click', () => {
        switch (value){
        case "clear":
            input = "";
            display_input.innerHTML = "";
            display_output.innerHTML = "";
            break;
        case "backspace":
            input = input.slice(0,-1);
            display_input.innerHTML =  InputCleaner(input);
            break;
        case "=":
            let result = eval(Percent(input))
            display_output.innerHTML =  OutputCleaner(result);
            break;
        case "brackets": // brackets should validate it self (pairs of open and closed with correct syntax )
            if (
                input.indexOf("(") == -1 || 
				input.indexOf("(") != -1 && 
                input.indexOf(")") != -1 && 
				input.lastIndexOf("(") < input.lastIndexOf(")")
    			) {
  				input += "(";
        		} else if (
 				input.indexOf("(") != -1 &&  
    			input.indexOf(")") == -1 || 
    			input.indexOf("(") != -1 &&
            	input.indexOf(")") != -1 &&
            	input.lastIndexOf("(") > input.lastIndexOf(")")
    			) {
          		input += ")";
        		}
             display_input.innerHTML = InputCleaner(input);
             break;
            default:
                if(ValidateInput(value)){
                
                input += value;
                display_input.innerHTML = InputCleaner(input);
                }
                break;
    }
        
    })
}

function InputCleaner(input){
   
    let i_array = input.split("");
    let array_length = i_array.length;
    for (let i = 0; i < array_length; i++) {
  
        switch (i_array[i]){ // making it look more presentable converting evaluation values to common interface symbols
            case '*':
                i_array[i] = ' <span class="operator">x</span> ';
                break;
            case '(':
                i_array[i] = ' <span class="brackets">(</span> ';
                break;
            case ')':
                i_array[i] = ' <span class="brackets">)</span> ';
                break;
            case '+':
                i_array[i] = ' <span class="operator">+</span> ';
                break;
            case "/":
                i_array[i] = ' <span class="operator">÷</span> '
                break;
            case "-":
                i_array[i] = ' <span class="operator">-</span> '
                break;
            case "%":
                i_array[i] = ' <span class="operator">%</span>'
                break;
                default:
                    break;
               
           }
           
    }
   
    return i_array.join("");
}

function OutputCleaner(output){ // implementing commas for visual effect 
    let ostring = output.toString();
    let dec = ostring.split(".")[1]
    ostring = ostring.split(".")[0]

    let array = ostring.split("");
    
  if (array.length > 3){ 
    
    for (let i = array.length - 3 ; i > 0 ; i = i-3) {
       
        array.splice(i, 0, ","); 
       
    }
}
if (dec) {
    array.push(".");
    array.push(dec);
}

return array.join("");
}

function ValidateInput (value) {
	let last_input = input.slice(-1);
   
	let operators = ["+", "-", "*", "/"];
 let allowed = ["0","1","2","3","4","5","6","7","8","9","+", "-", "*", "/",".","(",")"] ;

 if (allowed.includes(value)){
	if (value == "." && last_input == ".") {
		return false;
	}

	if (operators.includes(value)) {
		if (operators.includes(last_input)) {
			return false;
		} else {
			return true;
		}
	}

	return true;
}else 
return false;
}

function Percent(input) {
	let input_array = input.split(""); // defining how to do percentages in input

	for (let i = 0; i < input_array.length; i++) {
		if (input_array[i] == "%") {
			input_array[i] = "/100";
		}
	}

	return input_array.join("");
}



