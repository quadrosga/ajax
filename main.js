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

// Config resposta:
        $.ajax(endpoint).done(function(resposta) {
            const logradouro = resposta.logradouro;
            const bairro = resposta.bairro;
            const cidade = resposta.localidade;
            const estado = resposta.uf;
            const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado}`;
            $('#endereco').val(endereco)
            
// Forçando um delay para que a animação do ícone seja visível:
            setTimeout(function() {
                $(botao).find('i').removeClass('d-none');
                $(botao).find('span').addClass('d-none');
            },1000);
        })
    })
})