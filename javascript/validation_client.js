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
    let idSize = 0;

    let client = document.getElementById('dataClient');
    let quant = document.getElementsByID('dataQuant');
    let cpf = document.getElementsByID('dataCPF');
    let cep = document.getElementsByID('dataCEP');
    let endereco = document.getElementsByID('dataEnd');

    idSize++;

    let json = {id = idSize, Name: client, Quant: quant, CPF: cpf, CEP: cep, Endereco: endereco};
    localStorage.setItem('Cliente', JSON.stringify(json));
}
let form = document.getElementById('register');
let submit = document.getElementById('formbutton');

let Validator = new validator();

submit.addEventListener('click', function(e) {
    e.preventDefault();
    Validator.validate(form);
    
  });