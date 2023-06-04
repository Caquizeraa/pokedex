const pokemonNome = document.querySelector('.pokemon_nome');
const pokemonID = document.querySelector('.pokemon_id');
const pokemonImagem = document.querySelector('.pokemon_img');
const formulario = document.querySelector('.formulario');
const input = document.querySelector('.input_pesquisa');

const botaoPrev = document.querySelector('.btn-prev');
const botaoNext = document.querySelector('.btn-next');

let pesquisa = 1;

const fetchPokemon = async (pokemon) => {
    const apiResposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (apiResposta.status == 200){
        const dados = await apiResposta.json();
        return dados;
    }
}

const renderizaPokemon = async (pokemon) => {
    
    pokemonNome.innerHTML = "Loading...";
    pokemonID.innerHTML = '';
    
    const dados = await fetchPokemon(pokemon);

    if(dados){
        pokemonImagem.style.display = 'block';
        pokemonNome.innerHTML = dados.name;
        pokemonID.innerHTML = dados.id;
        pokemonImagem.src = dados['sprites']['versions']['generation-v']['black-white']['animated'] ['front_default'];
        input.value = '';
        pesquisa = dados.id;
    }else{
        pokemonImagem.style.display = 'none';
        pokemonNome.innerHTML = "Not found!"
        pokemonID.innerHTML = '' 
    }   
}

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    renderizaPokemon(input.value.toLowerCase());
} );

botaoPrev.addEventListener('click', () => {
    if(pesquisa>1){
        pesquisa-=1;
        renderizaPokemon(pesquisa);
    }
} );

botaoNext.addEventListener('click', () => {
    pesquisa+=1;
    renderizaPokemon(pesquisa);
} );


renderizaPokemon(pesquisa);