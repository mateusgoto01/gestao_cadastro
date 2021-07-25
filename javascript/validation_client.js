class validator{

    constructor(){
        this.validations = [
            'data-required',
            'data-size',
            'data-emailcheck'
        ]
    }
    validate(form){
        //validações não desaparecem preciso limpa-las
        let current_validations = document.querySelectorAll('form .error-validation');

        if(current_validations.length){
            this.clean_validations(current_validations);
        }
        let inputs = form.getElementsByTagName('input');
        let inputsArray = [...inputs];

    inputsArray.forEach(function(input) {
      // fazer validação de acordo com o atributo do input
      for(let i = 0; this.validations.length > i; i++) {
        if(input.getAttribute(this.validations[i]) != null) {
            let method = this.validations[i].replace("data-", "").replace("-", "");
            // valor do input
            let value = input.getAttribute(this.validations[i])

            // invoca o método
            this[method](input,value);
        }
        
      }

    }, this);
  }

    required(input){
        let value = input.value;

        if(value === ''){
            let message = "Este campo é obrigatório.";

            this.print_message(input, message);
        }
    }

    size(input, maxvalue){
        let inputLength = input.value.length;
        if(inputLength != maxvalue){
            let message = `O campo precisa ter ${maxvalue} digitos`;
            this.print_message(input, message);
        }
    }

    emailcheck(input){
        //checar se esta no formato de email
        let check = /\S+@\S+\.\S+/;
        
        let email = input.value;     
        if(!check.test(email)){
            let message = "Insira um e-mail válido.";
            this.print_message(input, message);

        }
        else{
            storage_client();
        }
    }

    print_message(input, msg){
        // evitar que aconteça overlap de validações

        let errors = input.parentNode.querySelector('.error-validation');

        if(errors === null){
            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let parent = input.parentNode;

            template.classList.remove('template');

            parent.appendChild(template);
        }

        
    }

    clean_validations(validations){
        validations.forEach(el => el.remove());
    }
}

function storage_client(){

    var client = document.getElementById('dataClient').value;
    console.log(client);
    var email = document.getElementById('dataEmail').value;
    console.log(email);
    var cpf = document.getElementById('dataCPF').value;
    var cep = document.getElementById('dataCEP').value;
    var endereco = document.getElementById('dataEnd').value;

    idSize++;
    var ClienteArray = JSON.parse(localStorage.getItem('Cliente') || '[]');

    var item = {Name: client, Email: email, CPF: cpf, CEP: cep, Endereco: endereco};
    ClienteArray.push(item);
    console.log(ClienteArray);
    localStorage.setItem('Cliente', JSON.stringify(ClienteArray));
    alert("Cliente salvado.");
}

let form = document.getElementById('register');
let submit = document.getElementById('formbutton');

let Validator = new validator();

submit.addEventListener('click', function(e) {
    e.preventDefault();
    Validator.validate(form);
    
  });