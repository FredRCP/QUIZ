document.addEventListener('click', e=>{
    const el= e.target;
    const tag= el.tagName.toLowerCase();

    if(tag==='a'){
        e.preventDefault();
        carregapagina(el);
    }
});

async function carregapagina(el){

    try{
        const href= el.getAttribute('href');
        const response= await fetch(href);

        if(response.status!==200) throw new Error('ERRO 404');

        const html= await response.text();
        carregar(html);  

    } catch(e){console.log(e)};    
}

function carregar(response){
    const resultado= document.querySelector('.resultado');
    resultado.innerHTML= response;
}

function resetar(){
    document.location.reload();
}

//PARTE FUNCIONAL

let pontos;
let acertos;
let erros;
let vidas;
let coracao;
let nome;
let porcento;
let cumprimento;

const cerebrocerta=document.querySelector('#cerebrocerta');
const cerebroerrada=document.querySelector('#cerebroerrada');
const cerebrovitoria=document.querySelector('#cerebrovitoria');
const cerebroderrota=document.querySelector('#cerebroderrota');


//AUDIO
const acerto = new Audio('/assets/sounds/acerto.mp3'); 
const acertou = new Audio('/assets/sounds/acertou.mp3');
const errou = new Audio('/assets/sounds/errou.mp3'); 
const erro = new Audio('/assets/sounds/erro.mp3');
const inicio = new Audio('/assets/sounds/inicio.mp3');
const fimvitoria= new Audio('/assets/sounds/fimvitoria.mp3');
const derrota= new Audio('/assets/sounds/derrota.mp3');
const silvio= new Audio('/assets/sounds/certasilvio.m4a');
const palmas=new Audio('/assets/sounds/palmas.m4a');

//INICIAR O JOGO

function start(p){
    nome= prompt('Qual seu nome?') || "Pessoa sem nome 😧";
    vidas=3;
    inicio.play();
    cerebrocerta.style.display='none';
    cerebroerrada.style.display='none';
    cerebrovitoria.style.display='none';
    cerebroderrota.style.display='none';
    pontos=0;
    acertos=0;
    erros=0;
    perguntasUsadas=[];
    const pontuacao= document.querySelector('.pontos');
    const span= document.querySelector('.span');
    span.style.display='flex';
    pontuacao.innerHTML=0;
    const botao=document.querySelector('.start');
    const caixa=document.querySelector('.generico');
    botao.style.display='none';
    caixa.classList.add('caixa');
    const caixagenerica=document.querySelector('.generico');
    caixagenerica.style.display='flex';
    document.querySelector('.pontos').innerHTML=nome +"<br>" +"Vidas: ❤❤❤" + "<br>"+ 'Pontos: ' + pontos;
    proximapergunta(p);
}

function sorteio(x){
    return Math.floor(Math.random()*x);
}

let perguntasUsadas = [];

function proximapergunta(p){
    cerebrocerta.style.display='none';
    cerebroerrada.style.display='none';
    const pergunta= document.querySelector('.pergunta');
    const respostas= document.querySelector('.respostas');
    const botaoproxima= document.querySelector('#botaoproxima');
    const botao=document.querySelector('.start');
     
    let n1;
    let totalPerguntas=p.length;
    
    if(vidas===0){
                porcento=(acertos/perguntasUsadas.length)*100;
                porcento=porcento.toFixed(1);
                if(porcento===100){cumprimento='Parabéns! Você é uma enciclopédia ambulante!'}
                if(porcento>=85&&porcento<100){cumprimento='Parabéns! Você tem muito conhecimento!'}
                if(porcento>=70&&porcento<85){cumprimento='Muito bom!'}
                if(porcento>=50&&porcento<70){cumprimento='Bom resultado!'}
                if(porcento>=30&&porcento<50){cumprimento='Você chega lá!'}
                if(porcento<30){cumprimento='Não desista, busque o conhecimento!'}
                document.querySelector('.pontos').innerHTML= `Você errou ${erros} questões!` + "<br>"+ `Questões corretas: ${acertos}/${perguntasUsadas.length}`+"<br>"+
                `Acertos: ${porcento}%`+"<br>"+cumprimento;
                alert('FIM DE JOGO!');  
                botaoproxima.classList.remove('proxima');
                const botao=document.querySelector('.start');
                botao.style.display='flex';
                botao.textContent='REINICIAR';
                const caixagenerica=document.querySelector('#generico');
                cerebroderrota.style.display='flex';
                caixagenerica.style.display='none';
                derrota.play();
                return;
    }    
    if (perguntasUsadas.length === totalPerguntas) { 
                porcento=(acertos/perguntasUsadas.length)*100;
                if(porcento===100){cumprimento='Parabéns! Você é uma enciclopédia ambulante!'}
                if(porcento>=85&&porcento<100){cumprimento='Parabéns! Você tem muito conhecimento!'}
                if(porcento>=70&&porcento<85){cumprimento='Muito bom!'}
                if(porcento>=50&&porcento<70){cumprimento='Bom resultado!'}
                if(porcento>=30&&porcento<50){cumprimento='Você chega lá!'}
                if(porcento<30){cumprimento='Não desista, busque o conhecimento!'}
                porcento=porcento.toFixed(1);
                document.querySelector('.pontos').innerHTML= `Você acertou ${acertos} de ${perguntasUsadas.length} questões`+"<br>"+`Acertos: ${porcento}%`
                +"<br>"+cumprimento + "<br>"+"FIM DO QUIZ!";
                botaoproxima.classList.remove('proxima');
                const botao=document.querySelector('.start');
                botao.style.display='flex';
                botao.textContent='REINICIAR';
                const caixagenerica=document.querySelector('#generico');
                caixagenerica.style.display='none';
                cerebrovitoria.style.display='flex';
                fimvitoria.play();
                return;
    }
   
    do {
        n1 = sorteio(p.length);
    } while (perguntasUsadas.includes(n1));
    console.log(n1);
    perguntasUsadas.push(n1);
    
   
    botaoproxima.classList.remove('proxima');
    while(respostas.firstChild){
        respostas.removeChild(respostas.firstChild)
    };
    pergunta.textContent=p[n1].question;
    p[n1].answers.forEach(resposta=>{
        const botao= document.createElement('button');
        botao.classList.add('botao');
        botao.textContent= resposta.text;
        if(resposta.correct){
            botao.dataset.correct= resposta.correct;
        }
        respostas.appendChild(botao);
        botao.addEventListener('click', selecao);
    });  
}

function selecao(e){
    const pontuacao= document.querySelector('.pontos');
    const el = e.target;
    if(el.dataset.correct){
        cerebrocerta.style.display='flex';
        acerto.play().then(silvio.play()).then(palmas.play());
        el.classList.add('acertou');
        pontos+=10;
        acertos+=1;
        if(vidas===3){vida=' ❤❤❤'}
        if(vidas===2){vida=' 💔❤❤'}
        if(vidas===1){vida=' 💔💔❤'}
        if(vidas===0){vida=' 💔💔💔'}
        pontuacao.innerHTML=nome+"<br>"+"Vidas: "+ vida+"<br>" + 'Pontos: ' + pontos;
    } else{
        cerebroerrada.style.display='flex';
        erro.play().then(errou.play());
        el.classList.add('errou');
        erros+=1;
        vidas-=1;
        if(vidas===3){vida=' ❤❤❤'}
        if(vidas===2){vida=' 💔❤❤'}
        if(vidas===1){vida=' 💔💔❤'}
        if(vidas===0){vida=' 💔💔💔'}
        pontuacao.innerHTML= nome+"<br>"+"Vidas: "+ vida+ "<br>"+ 'Pontos: ' + pontos;; 
    }

    document.querySelectorAll('.botao').forEach(button=>{
        if(button.dataset.correct){
            button.classList.add('acertou');
        }
        else{
            button.classList.add('errou')
        }
        button.disabled=true;
    })  
    const botaoproxima= document.querySelector('#botaoproxima');
    botaoproxima.classList.add('proxima');
}





// BANCO DE DADOS A SEGUIR

//Q1 ARTE E CULTURA

const q1=[
    {   question: 'Quem é o autor de “O Príncipe”?',
        answers: [
            {text: 'Rousseau', correct: false},
            {text: 'Antoine de Saint-Exupéry', correct: false},
            {text: 'Montesquieu', correct: false},
            {text: 'Maquiavel', correct: true},
        ]
    },
    {   question: 'De quem é a famosa frase “Penso, logo existo”?',
        answers: [
            {text: 'Descartes', correct: true},
            {text: 'Sócrates', correct: false},
            {text: 'Platão', correct: false},
            {text: 'Nietzsche', correct: false}
        ]
    },
    {   question: 'Qual o livro mais vendido no mundo, depois da Bíblia?',
        answers: [
            {text: 'O Senhor dos Anéis', correct: false},
            {text: 'Dom Quixote', correct: true},
            {text: 'O Pequeno Príncipe', correct: false},
            {text: 'Harry Potter', correct: false},
        ]
    },
    {   question: 'Quem pintou "Guernica"?',
        answers: [
            {text: 'Pablo Picasso', correct: true},
            {text: 'Diego Rivera', correct: false},
            {text: 'Tarsila do Amaral', correct: false},
            {text: 'Salvador Dalí', correct: false},
        ]
    },
    {   question: 'Quais os principais autores do Barroco no Brasil?',
        answers: [
            {text: 'Álvares de Azevedo, Gregório de Matos e Bento Teixeira', correct: false},
            {text: 'Padre Antônio Vieira, Padre Manuel de Melo e Gregório de Matos', correct: false},
            {text: 'Gregório de Matos, Bento Teixeira e Manuel Botelho de Oliveira', correct: true},
            {text: 'Castro Alves, Bento Teixeira e Manuel Botelho de Oliveira', correct: false},
        ]
    },
    {   question: 'Qual personagem folclórico costuma ser agradado pelos caçadores com a oferta de fumo?',
    answers: [
        {text: 'Caipora', correct: true},
        {text: 'Saci', correct: false},
        {text: 'Boitatá', correct: false},
        {text: 'Negrinho do Pastoreio', correct: false},
    ]},
    {   question: 'Quem pintou o teto da capela sistina?',
        answers: [
            {text: 'Donatello', correct: false},
            {text: 'Leonardo da Vinci', correct: false},
            {text: 'Sandro Botticelli', correct: false},
            {text: 'Michelangelo', correct: true},
        ]
    },

]


//Q2 BIOLOGIA

const q2=[
    {   question: 'Quais destas doenças são sexualmente transmissíveis?',
        answers: [
            {text: 'Aids, tricomoníase e ebola', correct: false},
            {text: 'Gonorreia, clamídia e sífilis', correct: true},
            {text: 'Botulismo, cistite e gonorreia', correct: false},
            {text: 'Chikungunya, aids e herpes genital', correct: false},
        ]
    },
    {   question: 'Qual tipo sanguíneo é considerado doador universal?',
        answers: [
            {text: 'O', correct: true},
            {text: 'AB', correct: false},
            {text: 'A', correct: false},
            {text: 'B', correct: false},
        ]
    },
    {   question: 'Qual o maior animal terrestre?',
        answers: [
            {text: 'Baleia azul', correct: false},
            {text: 'Girafa', correct: false},
            {text: 'Elefante africano', correct: true},
            {text: 'Hipopótamo', correct: false},
        ]
    },

    {   question: 'Qual cromossomo determina o sexo masculino?',
        answers: [
            {text: 'Y', correct: true},
            {text: 'X', correct: false},
            {text: 'W', correct: false},
            {text: 'Z', correct: false},
        ]
    },
    {   question: 'Como se chamam os vasos que transportam sangue do coração para a periferia do corpo?',
        answers: [
            {text: 'Veias', correct: false},
            {text: 'Capilares', correct: false},
            {text: 'Ventrículos', correct: false},
            {text: 'Artérias', correct: true},
        ]
    },
    {   question: 'Quais as maiores pandemias da história?',
        answers: [
            {text: 'Gripe espanhola e Câncer', correct: false},
            {text: 'Varíola e Hipertensão Arterial', correct: false},
            {text: 'Gripe Espanhola e Peste Negra', correct: false},
            {text: 'Peste Negra e Covid-19', correct: true},
        ]
    },

]

//Q3 CIÊNCIAS

const q3=[
    {   question: 'Em qual país foi criado o chuveiro elétrico?',
        answers: [
            {text: 'Brasil', correct: true},
            {text: 'Inglaterra', correct: false},
            {text: 'França', correct: false},
            {text: 'Estados Unidos', correct: false},
        ]
    },
    {   question: 'Quanto tempo a luz do Sol demora para chegar à Terra?',
        answers: [
            {text: '6 segundos', correct: false},
            {text: '8 minutos', correct: true},
            {text: '4 minutos e 30 segundos', correct: false},
            {text: '1 hora', correct: false},
        ]
    },
    {   question: 'Qual a velocidade da luz?',
        answers: [
            {text: '300.000.000 m/segundo', correct: false},
            {text: '300.000.000 km/segundo', correct: false},
            {text: '299.792.458 m/segundo', correct: true},
            {text: '100.000.000 m/segundo', correct: false},
        ]
    },
    {   question: 'Cientista que descobriu a vacina contra a raiva e para a cólera de galinhas?',
        answers: [
            {text: 'Louis Pasteurs', correct: true},
            {text: 'Antonio Lavoisier', correct: false},
            {text: 'Alexander Fleming', correct: false},
            {text: 'Carlos Chagas', correct: false},
        ]
    },
    {   question: 'Quanto tempo é necessário para a Terra dar a volta ao sol?',
        answers: [
            {text: '1 semana', correct: false},
            {text: '24h', correct: false},
            {text: '364 dias', correct: false},
            {text: '365 dias', correct: true},
        ]
    },
    {   question: 'Atualmente, quantos elementos químicos a tabela periódica possui?',
        answers: [
            {text: '109', correct: false},
            {text: '118', correct: true},
            {text: '92', correct: false},
            {text: '99', correct: false},
        ]
    },
    {   question: 'Qual o metal, presente no planeta Terra, de maior densidade?',
        answers: [
            {text: 'Ósmio', correct: true},
            {text: 'Chumbo', correct: false},
            {text: 'Ferro', correct: false},
            {text: 'Cádmio', correct: false},
        ]
    },
    {   question: 'modelo',
        answers: [
            {text: 'a', correct: true},
            {text: 'b', correct: false},
            {text: 'c', correct: false},
            {text: 'd', correct: false},
        ]
    },
    {   question: 'modelo',
        answers: [
            {text: 'a', correct: true},
            {text: 'b', correct: false},
            {text: 'c', correct: false},
            {text: 'd', correct: false},
        ]
    },
    {   question: 'modelo',
        answers: [
            {text: 'a', correct: true},
            {text: 'b', correct: false},
            {text: 'c', correct: false},
            {text: 'd', correct: false},
        ]
    },
    
]





//Q4 CINEMA E MÚSICA

const q4=[
    {   question: 'Qual desses filmes foi baseado na obra de Shakespeare?',
        answers: [
            {text: 'Muito Barulho por Nada (2012)', correct: true},
            {text: 'A Revolução dos Bichos (1954)', correct: false},
            {text: 'Excalibur (1981)', correct: false},
            {text: 'A Dama das Camélias (1936)', correct: false},
        ]
    },
    {   question: 'Jim Morrison era vocalista de que grupo?',
        answers: [
            {text: 'Pink Floyd', correct: false},
            {text: 'The Doors', correct: true},
            {text: 'Nirvana', correct: false},
            {text: 'AC/DC', correct: false},
        ]
    },
    {   question: 'Qual o nome do primeiro filme da Disney, lançado em 1937?',
        answers: [
            {text: 'Branca de Neve e os Sete Anões', correct: true},
            {text: 'Pinóquio', correct: false},
            {text: 'Dumbo', correct: false},
            {text: 'A bela adormecida', correct: false},
        ]
    },
    {   question: 'Qual o nome do primeiro filme da Pixar, lançado em 1995?',
        answers: [
            {text: 'Procurando Nemo', correct: false},
            {text: 'Monstros S.A.', correct: false},
            {text: 'Toy Story', correct: true},
            {text: 'Vida de Inseto', correct: false},
        ]
    },
    {   question: 'De qual cidade vieram os Beatles?',
        answers: [
            {text: 'Manchester', correct: false},
            {text: 'Londres', correct: false},
            {text: 'Liverpool', correct: true},
            {text: 'Oxford', correct: false},
        ]
    },

]

//Q5 ESPORTE

const q5=[
    {   question: 'Qual país sediou a Copa do Mundo de 1998, onde a seleção brasileira chegou à final?',
        answers: [
            {text: 'França', correct: true},
            {text: 'Itália', correct: false},
            {text: 'Alemanha', correct: false},
            {text: 'Japão', correct: false},
        ]
    }, 
    {   question: 'Qual o esporte mais antigo do mundo?',
        answers: [
            {text: 'Futebol', correct: false},
            {text: 'Luta livre', correct: true},
            {text: 'Corrida', correct: false},
            {text: 'Natação', correct: false},
        ]
    },
    {   question: 'Qual o esporte mais popular do mundo?',
        answers: [
            {text: 'Tênis', correct: false},
            {text: 'Corrida', correct: false},
            {text: 'Futebol', correct: true},
            {text: 'Basquete', correct: false},
        ]
    },
    {   question: 'Qual famoso piloto brasileiro de Fórmula 1 conquistou três campeonatos mundiais durante os anos 90?',
        answers: [
            {text: 'Emerson Fittipaldi', correct: false},
            {text: 'Nelson Piquet', correct: false},
            {text: 'Rubens Barrichello', correct: false},
            {text: 'Ayrton Senna', correct: true},
        ]
    },
]

//Q6  GEOGRAFIA

const q6=[
    {   question: 'Qual o menor país do mundo?',
        answers: [
            {text: 'San Marino', correct: false},
            {text: 'Mônaco', correct: false},
            {text: 'Vaticano', correct: true},
            {text: 'Malta', correct: false},
        ]
    },
    {   question: 'Quais os países que têm a maior e a menor expectativa de vida do mundo?',
        answers: [
            {text: 'Austrália e Afeganistão', correct: false},
            {text: 'Japão e Serra Leoa', correct: true},
            {text: 'Itália e Chade', correct: false},
            {text: 'Estados Unidos e Angola', correct: false},
        ]
    },
    {   question: 'Qual a montanha mais alta do Brasil?',
        answers: [
            {text: 'Pica da Bandeira', correct: false},
            {text: 'Pico do Paraná', correct: false},
            {text: 'Pico Maior de Friburgo', correct: false},
            {text: 'Pico da Neblina', correct: true},
        ]
    },
    {   question: 'Qual destes países é transcontinental?',
        answers: [
            {text: 'China', correct: false},
            {text: 'Rússia', correct: true},
            {text: 'Brasil', correct: false},
            {text: 'Groenlândia', correct: false},
        ]
    },
    {   question: 'No exterior de que famoso edifício francês foi construída uma enorme pirâmide de vidro em 1989?',
        answers: [
            {text: 'Petit Palais', correct: false},
            {text: 'Museu do Louvre', correct: true},
            {text: 'Arco do Triunfo', correct: false},
            {text: 'Catedral de Notre Dame', correct: false},
        ]
    },
    {   question: 'O Equador faz fronteira com quais países?',
        answers: [
            {text: 'Colômbia e Peru', correct: true},
            {text: 'Peru e Bolívia', correct: false},
            {text: 'Brasil e Venezuela', correct: false},
            {text: 'Uruguai e Panamá', correct: false},
        ]
    },
    {   question: 'Quais países não fazem fronteira com o Brasil?',
        answers: [
            {text: 'Chile e Colômbia', correct: false},
            {text: 'Equador e Chile', correct: true},
            {text: 'Peru e Argentina', correct: false},
            {text: 'Chile e Uruguai', correct: false},
        ]
    },
    {   question: 'Qual é o maior arquipélago da Terra?',
        answers: [
            {text: 'Indonésia', correct: true},
            {text: 'Maldivas', correct: false},
            {text: 'Filipinas', correct: false},
            {text: 'Finlândia', correct: false},
        ]
    },
    {   question: 'Em qual oceano fica Madagascar?',
        answers: [
            {text: 'Antártico', correct: false},
            {text: 'Pacífico', correct: false},
            {text: 'Atlântico', correct: false},
            {text: 'Índico', correct: true},
        ]
    },
    {   question: 'Qual destas obras arquitetônicas brasileiras é uma das Sete Maravilhas do Mundo Moderno?',
        answers: [
            {text: 'Pelourinho', correct: false},
            {text: 'Elevador Lacerda', correct: false},
            {text: 'Cristo Redentor', correct: true},
            {text: 'Palácio da Alvorada', correct: false},
        ]
    },
    {   question: 'Em que país se localizava Auschwitz, o maior campo de concentração nazista?',
        answers: [
            {text: 'Polônia', correct: true},
            {text: 'Alemanha', correct: false},
            {text: 'Áustria', correct: false},
            {text: 'Rússia', correct: false},
        ]
    },
    {   question: 'Qual a capital do Brasil?',
        answers: [
            {text: 'Brasília', correct: true},
            {text: 'Rio de Janeiro', correct: false},
            {text: 'Buenos Aires', correct: false},
            {text: 'São Paulo', correct: false},
        ]
    },
    {   question: 'Em qual local da Ásia o português é língua oficial?',
        answers: [
            {text: 'Moçambique', correct: false},
            {text: 'Brasil', correct: false},
            {text: 'Macau', correct: true},
            {text: 'Portugal', correct: false},
        ]
    },
    {   question: 'Qual o país com mais ilhas no mundo?',
        answers: [
            {text: 'Estados Unidos', correct: false},
            {text: 'Austrália', correct: false},
            {text: 'Japão', correct: false},
            {text: 'Suécia', correct: true},
        ]
    },
    {   question: 'Qual é o rio mais largo do mundo?',
        answers: [
            {text: 'Amazonas', correct: true},
            {text: 'Nilo', correct: false},
            {text: 'Missouri', correct: false},
            {text: 'Ganges', correct: false},
        ]
    },
    {   question: 'Qual é o rio mais longo do mundo?',
        answers: [
            {text: 'Amazonas', correct: false},
            {text: 'São Francisco', correct: false},
            {text: 'Missouri', correct: false},
            {text: 'Nilo', correct: true},
        ]
    },
    {   question: 'Quais são construções famosas nos Estados Unidos?',
        answers: [
            {text: 'Estátua da Liberdade, Big Ben e The High Line', correct: false},
            {text: 'Estátua da Liberdade, Golden Gate Bridge e Empire State Building', correct: true},
            {text: 'Lincoln Memorial, Sidney Opera House e Burj Khalifa', correct: false},
            {text: 'Angkor Wat, Taj Mahal e Skywalk no Grand Canyon', correct: false},
        ]
    },
]
    


//Q7  HISTÓRIA

const q7=[
    {   question: 'Em que período da pré-história o fogo foi descoberto?',
        answers: [
            {text: 'Neolítico', correct: false},
            {text: 'Paleolítico', correct: true},
            {text: 'Pedra Polida', correct: false},
            {text: 'Idade Média', correct: false},
        ]
    },
    {   question: 'Quais os nomes dos três Reis Magos?',
        answers: [
            {text: 'Belchior, Gaspar e Baltazar', correct: true},
            {text: 'Gaspar, Nicolau e Natanael', correct: false},
            {text: 'Belchior, Gaspar e Nataniel', correct: false},
            {text: 'Melchior, Noé e Galileu', correct: false},
        ]
    },
    {   question: 'Que líder mundial ficou conhecida como “Dama de Ferro”?',
        answers: [
            {text: 'Christine Lagarde', correct: false},
            {text: 'Margaret Thatcher', correct: true},
            {text: 'Angela Merkel', correct: false},
            {text: 'Hillary Clinton', correct: false},
        ]
    },
    {   question: 'Qual o tema do famoso discurso Eu Tenho um Sonho, de Martin Luther King?',
        answers: [
            {text: 'Intolerância religiosa', correct: false},
            {text: 'Justiça para os menos favorecidos', correct: false},
            {text: 'Igualdade das raças', correct: true},
            {text: 'Luta contra o Apartheid', correct: false},
        ]
    },
    {   question: 'Quem foi o primeiro homem a pisar na Lua? Em que ano aconteceu?',
        answers: [
            {text: 'Yuri Gagarin, em 1961', correct: false},
            {text: 'Buzz Aldrin, em 1969', correct: false},
            {text: 'Charles Duke, em 1971', correct: false},
            {text: 'Neil Armstrong, em 1969', correct: true},
        ]
    },
    {   question: 'Quem amamentou os gêmeos Rômulo e Remo?',
        answers: [
            {text: 'uma cabra', correct: false},
            {text: 'uma loba', correct: true},
            {text: 'uma vaca', correct: false},
            {text: 'uma ovelha', correct: false},
        ]
    },
    {   question: 'Quem viveu, segundo a Bíblia, 969 anos?',
        answers: [
            {text: 'Matusalém', correct: true},
            {text: 'Noé', correct: false},
            {text: 'Abel', correct: false},
            {text: 'Benjamin', correct: false},
        ]
    },
    {   question: 'Em que cidade ocorreu a Eco-92, a Conferência das Nações Unidas sobre ambiente e desenvolvimento?',
        answers: [
            {text: 'Rio de Janeiro', correct: true},
            {text: 'Buenos Aires', correct: false},
            {text: 'Montevidéu', correct: false},
            {text: 'Caracas', correct: false},
        ]
    },
    {   question: 'Em que ano e quem foi eleito o primeiro presidente do Brasil?',
        answers: [
            {text: '1889, Hermes da Fonseca', correct: false},
            {text: '1890, Floriano Peixoto', correct: false},
            {text: '1891, Deodoro da Fonseca', correct: true},
            {text: 'Getúlio Vargas', correct: false},
        ]
    },
    {   question: 'Chernobyl e Césio-137 fazem parte dos maiores acidentes nucleares da história. Em que países aconteceram?',
        answers: [
            {text: 'Ucrânia e Brasil', correct: true},
            {text: 'Rússia e Espanha', correct: false},
            {text: 'Estados Unidos e Ucrânia', correct: false},
            {text: 'Japão e Brasil', correct: false},
        ]
    },
    {   question: 'Que acontecimento importante para a história da humanidade teve lugar em 20 de julho de 1969?',
        answers: [
            {text: 'Lançamento das bombas atômicas em Hiroshima e Nagasaki', correct: false},
            {text: 'Fim do Apartheid', correct: false},
            {text: 'Chegada do homem à Lua', correct: true},
            {text: 'Envio do primeiro e-mail da história', correct: false},
        ]
    },
    {   question: 'Qual o nome do presidente do Brasil que ficou conhecido como Jango?',
        answers: [
            {text: 'Jânio Quadros', correct: false},
            {text: 'Getúlio Vargas', correct: false},
            {text: 'João Figueiredo', correct: false},
            {text: 'João Goulart', correct: true},
        ]
    },
    {   question: 'Onde foram realizados os primeiros Jogos Olímpicos modernos, em 1896?',
        answers: [
            {text: 'Atenas', correct: true},
            {text: 'Esparta', correct: false},
            {text: 'Barcelona', correct: false},
            {text: 'Berlim', correct: false},
        ]
    },
    {   question: 'Durante quantos anos Fidel Castro, um dos ditadores que esteve mais tempo no poder, esteve à frente de Cuba?',
        answers: [
            {text: '51 anos', correct: false},
            {text: '20 anos', correct: false},
            {text: '49 anos', correct: true},
            {text: '30 anos', correct: false},
        ]
    },
    

]

//Q8  TEMAS DIVERSOS

const q8=[
    {   question: 'O telégrafo foi criado em 1831. Quem foi seu criador?',
        answers: [
            {text: 'Thomas Edison', correct: false},
            {text: 'Nikola Tesla', correct: false},
            {text: 'Alexander Graham Bell', correct: false},
            {text: 'Joseph Henry', correct: true},
        ]
    },
    {   question: 'Quantas teclas há em um piano clássico?',
        answers: [
            {text: '88', correct: true},
            {text: '99', correct: false},
            {text: '10', correct: false},
            {text: '25', correct: false},
        ]
    },
    {   question: 'Qual a religião monoteísta que conta com o maior número de adeptos no mundo?',
        answers: [
            {text: 'Cristianismo', correct: true},
            {text: 'Judaísmo', correct: false},
            {text: 'Islamismo', correct: false},
            {text: 'Hinduísmo', correct: false},
        ]
    },
    {   question: 'Qual idioma tem o maior número de palavras (de acordo com dicionários)?',
        answers: [
            {text: 'Inglês', correct: true},
            {text: 'Português', correct: false},
            {text: 'Chinês', correct: false},
            {text: 'Latim', correct: false},
        ]
    },
]

// TODOS OS TEMAS

const todasq= [...q1, ...q2, ...q3, ...q4, ...q5, ...q6, ...q7, ...q8]













