# gestao_cadastro

O Desafio pedido pelo Hiring coders foi:

2° Entrega - Gestão de Cadastros
Criação de um sistema e-commerce para inventário de produtos e dados de clientes:

Entregáveis:

Os dados de clientes, endereços e produtos devem estar devidamente estruturados
Dados no localstorage
Código fonte no github com o arquivo README detalhando as funcionalidades da programação

Explicação:

Validações: Elas são feitas a partir de uma programação orientada a objeto, ela checa se os campos estão preenchidos corretamente. Se não estão vazios, se tem a quantidade certa e se é um email.
`
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
`

CSS: Como o objetivo era criar as funcionalidades, não me foquei em fazer um CSS bem aplicado. Estava focado nas funcionalidades do JavaScript. Por isso, usei a mesma paletas de cores e fontes do desafio 1

Quando o usuário preenche corretamente todos os campos, o site salva no localStorage e em uma outra página printa todos os dados no local Storage.
Para salvar. Fiz por JavaScript puro, eu crio um array ou checo sua existencia e vou adicionando novas partes.
`
function storage_client(){

    var client = document.getElementById('dataClient').value;
    var email = document.getElementById('dataEmail').value;
    var cpf = document.getElementById('dataCPF').value;
    var cep = document.getElementById('dataCEP').value;
    var endereco = document.getElementById('dataEnd').value;


    var ClienteArray = JSON.parse(localStorage.getItem('Cliente') || '[]');

    var item = {Name: client, Email: email, CPF: cpf, CEP: cep, Endereco: endereco};
    ClienteArray.push(item);
    localStorage.setItem('Cliente', JSON.stringify(ClienteArray));
    alert("Cliente salvado.");
}
` 
Para fazer o printe é simples:
`

function table_client(array, lengt){
    var linha = document.createElement("tr");
    var new_name = document.createElement("td");
    var new_email = document.createElement("td");
    var new_cpf = document.createElement("td");
    var new_cep = document.createElement("td");
    var new_ende = document.createElement("td");

    var text_name = document.createTextNode(array[lengt].Name);
    var text_email = document.createTextNode(array[lengt].Email);
    var text_cpf = document.createTextNode(array[lengt].CPF);
    var text_cep = document.createTextNode(array[lengt].CEP);
    var text_ende = document.createTextNode(array[lengt].Endereco);

    new_name.appendChild(text_name);
    new_email.appendChild(text_email);
    new_cpf.appendChild(text_cpf);
    new_cep.appendChild(text_cep);
    new_ende.appendChild(text_ende);

    linha.appendChild(new_name);
    linha.appendChild(new_email);
    linha.appendChild(new_cpf);
    linha.appendChild(new_cep);
    linha.appendChild(new_ende)

    var tableBody = document.querySelector('table');
        tableBody.appendChild(linha);
    }

    
    var Clientes = JSON.parse(localStorage.getItem('Cliente'));
    console.log(Clientes);
    for(let i = 0; i < Clientes.length; i++){
        table_client(Clientes, i);
    }

` 

