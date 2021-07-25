
function table_client(array, lengt){
    var linha = document.createElement("tr");
    var new_name = document.createElement("td");
    var new_email = document.createElement("td");
    var new_cpf = document.createElement("td");
    var new_cep = document.createElement("td");

    var text_name = document.createTextNode(array[lengt].Name);
    var text_email = document.createTextNode(array[lengt].Quant);
    var text_cpf = document.createTextNode(array[lengt].CPF);
    var text_cep = document.createTextNode(array[lengt].CEP);


    new_name.appendChild(text_name);
    new_email.appendChild(text_email);
    new_cpf.appendChild(text_cpf);
    new_cep.appendChild(text_cep);

    linha.appendChild(new_name);
    linha.appendChild(new_email);
    linha.appendChild(new_cpf);
    linha.appendChild(new_cep);

    var tableBody = document.querySelector('table');
        tableBody.appendChild(linha);
    }

    
    var Clientes = JSON.parse(localStorage.getItem('Produto'));
    console.log(Clientes);
    for(let i = 0; i < Clientes.length; i++){
        table_client(Clientes, i);
    }
