// Utilizando XML
// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('btn-buscar-cep').addEventListener('click', function() {
//         const xhttp = new XMLHttpRequest();
//         const cep = document.getElementById('cep').value;
//         const endpoint = `https://viacep.com.br/ws/${cep}/json`;

//         xhttp.open('GET', endpoint);
//         xhttp.send();
//     })
// })

// Utilizando jquery
// .quando o documento estiver carregado, aplicar mask ao campo de id #cep
$(document).ready(function() {
    $('#cep').mask('00000-000');
// .qndo o item de id #btn-buscar-cep receber um clique, rodar a função seguinte:
        // - armazanar os valores recebidos no input #cep na const cep.
        // - criar um array de "endpoints/urls" para cada item armazenado em cep
        // - criar uma const botão que representa "this", ou seja, #btn-buscar-cep
        //  - encontrar botao no html e, se achar a tag i, add classe d-none. se achar a tag span, remover class d-none
    $('#btn-buscar-cep').click(function() {
        const cep = $('#cep').val();
        const endpoint = `https://viacep.com.br/ws/${cep}/json`;
        const botao = $(this);
        $(botao).find('i').addClass('d-none');
        $(botao).find('span').removeClass('d-none');

// Config resposta, utilizando AJAX:
//         $.ajax(endpoint).done(function(resposta) {
//             const logradouro = resposta.logradouro;
//             const bairro = resposta.bairro;
//             const cidade = resposta.localidade;
//             const estado = resposta.uf;
//             const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado}`;
//             $('#endereco').val(endereco);
            
// // Forçando um delay para que a animação do ícone seja visível:
//             setTimeout(function() {
//                 $(botao).find('i').removeClass('d-none');
//                 $(botao).find('span').addClass('d-none');
//             },1000);
//         })

// Config resposta, utilizando o fetch API:
        fetch(endpoint)
        .then(function(resposta) {
            return resposta.json();
        })
        .then(function(json) {
            const logradouro = json.logradouro;
            const bairro = json.bairro;
            const cidade = json.localidade;
            const estado = json.uf;
            const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado}`;
            $('#endereco').val(endereco);
        })
        // o then acima já funciona como try.
        // é necessário agora config. o catch para o caso de erro
        // a sintaxe do catch é diferente, pois o fetch trabalha com
        // promises (an object that'll produce a single value some time in the future)
        .catch(function(erro) {
            alert("Ocorreou um erro ao buscar o endereço. Tente novamente mais tarde.");
        })
        // agora, config o finally para que a remoção/adição da classe da animação
        // do botão ocorra ao fim, independente de erro ou sucesso.
        .finally(function() {
            setTimeout(function() {
                $(botao).find('i').removeClass('d-none');
                $(botao).find('span').addClass('d-none');
            }, 1000);
        })
    })
})