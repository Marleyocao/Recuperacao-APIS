document.addEventListener('DOMContentLoaded', function () {
    const NomeUsuario = 'Marleyocao';
    const URL_BASE = `https://api.github.com/users/${NomeUsuario}`;
    const MeuPerfilInfor = document.getElementById('meuPerfilInfor');
    const ListaAmigos = document.getElementById('listaAmigos');

    // Função para buscar dados do usuário
    async function fetchUserData(url) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Erro ao buscar dados');
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Carregar dados do perfil
    fetchUserData(URL_BASE).then(data => {
        if (data) {
            MeuPerfilInfor.innerHTML = `
                <img src="${data.avatar_url}" alt="${data.name}" />
                <h3>${data.name}</h3>
                <p>${data.bio}</p>
                <p>${data.location}</p>
                <p><a href="${data.html_url}" target="_blank">Ver Perfil no GitHub</a></p>
            `;
        }
    });

    const listaSeguidores = document.getElementById('listaAmigos')

    listaSeguidores.innerHTML = ''

    fetch(`https://api.github.com/users/Marleyocao/following`).then(response=>response.json()).then(data => {
       console.log(data)
       const amigos = document.createElement('ul')
       data.forEach(user =>{
        const amigo = document.createElement('li')
        amigo.innerHTML = `
        <img src='${user.avatar_url}' >
        <h1>${user.login}</h1>
        `
        amigos.appendChild(amigo)
       })
       listaSeguidores.appendChild(amigos)
    }).catch(error =>{
        console.log(error)
    }) 

    // Adicionar evento de clique nas imagens dos amigos
    ListaAmigos.addEventListener('click', function (e) {
        if (e.target.tagName === 'IMG') {
            const NomeAmigo = e.target.getAttribute('data-username');
            window.location.href = `user.html?username=${NomeAmigo}`;
        }
    });

    // Carregar perfil de amigo na página user.html
    const urlParams = new URLSearchParams(window.location.search);
    const NomeAmigo = urlParams.get('NomeUsuario');
    const PerfilAmigo = document.getElementById('PerfilAmigoInfor');

    if (NomeAmigo && PerfilAmigo) {
        fetchUserData(`https://api.github.com/users/${NomeAmigo}`).then(data => {
            if (data) {
                PerfilAmigo.innerHTML = `
                    <img src="${data.avatar_url}" alt="${data.name}" />
                    <h3>${data.name}</h3>
                    <p>${data.bio}</p>
                    <p>${data.location}</p>
                    <p><a href="${data.html_url}" target="_blank">Ver Perfil no GitHub</a></p>
                `;
            }
        });
    }
});

