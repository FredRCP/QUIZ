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
let ajuda;
let pular;
let coracao;
let nome;
let porcento;
let cumprimento;

const cerebrocerta=document.querySelector('#cerebrocerta');
const cerebroerrada=document.querySelector('#cerebroerrada');
const cerebrovitoria=document.querySelector('#cerebrovitoria');
const cerebroderrota=document.querySelector('#cerebroderrota');
const cerebroderrota1=document.querySelector('#cerebroderrota1');
const cerebrovitoria1=document.querySelector('#cerebrovitoria1');


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
const ativar= new Audio('/assets/sounds/ativar1.mp3');
ativar.volume=0.5;

const todosossons = [acerto, acertou, errou, erro, inicio, fimvitoria, derrota, silvio, palmas]; 

//INICIAR O JOGO

function start(p){
    nome= prompt('Qual seu nome?') || "Pessoa sem nome 😧";
    nome= nome.toUpperCase();
    vidas=3;
    ajuda=1;
    pular=1;
    inicio.play();
    cerebrocerta.style.display='none';
    cerebroerrada.style.display='none';
    cerebrovitoria.style.display='none';
    cerebrovitoria1.style.display='none';
    cerebroderrota.style.display='none';
    cerebroderrota1.style.display='none';
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
    document.querySelector('.pontos').innerHTML=nome +"<br>" +"Vidas: ❤❤❤" + "<br>"+ 'Pontos: ' + pontos + "<br>"+ 'Perguntas corretas: ' +perguntasUsadas.length;
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
                if(porcento>50&&porcento<70){cumprimento='Bom resultado!'}
                if(porcento>30&&porcento<=50){cumprimento='Você chega lá!'}
                if(porcento<=30){cumprimento='Não desista, busque o conhecimento!'}
                document.querySelector('.pontos').innerHTML= `Você errou ${erros} questões!` + "<br>"+ `Questões corretas: ${acertos}/${perguntasUsadas.length}`+"<br>"+
                `Acertos: ${porcento}%`+"<br>"+cumprimento;
                alert('GAME OVER! Tente novamente.');  
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
                if(porcento===100){cumprimento='Parabéns! Você é uma enciclopédia ambulante!'; cerebrovitoria1.style.display='flex';}
                if(porcento>=85&&porcento<100){cumprimento='Parabéns! Você tem muito conhecimento!'; cerebrovitoria1.style.display='flex';}
                if(porcento>=70&&porcento<85){cumprimento='Muito bom!'; cerebrovitoria.style.display='flex';}
                if(porcento>50&&porcento<70){cumprimento='Bom resultado!'; cerebrovitoria.style.display='flex';}
                if(porcento>30&&porcento<=50){cumprimento='Você chega lá!'; cerebrovitoria.style.display='flex';}
                if(porcento<=30){cumprimento='Não desista, busque o conhecimento!'; cerebroderrota1.style.display='flex';}
                porcento=porcento.toFixed(1);
                document.querySelector('.pontos').innerHTML= `Você acertou ${acertos} de ${perguntasUsadas.length} questões`+"<br>"+`Acertos: ${porcento}%`
                +"<br>"+cumprimento + "<br>"+"FIM DO QUIZ!";
                botaoproxima.classList.remove('proxima');
                const botao=document.querySelector('.start');
                botao.style.display='flex';
                botao.textContent='REINICIAR';
                const caixagenerica=document.querySelector('#generico');
                caixagenerica.style.display='none';
                fimvitoria.play();
                return;
    }
   
    do {
        n1 = sorteio(p.length);
    } while (perguntasUsadas.includes(n1));
    perguntasUsadas.push(n1);
    
   
    botaoproxima.classList.remove('proxima');
    while(respostas.firstChild){
        respostas.removeChild(respostas.firstChild)
    };
    pergunta.textContent=perguntasUsadas.length+" - "+ p[n1].question;
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
        acerto.play().then(acertou.play()).then(palmas.play());
        el.classList.add('acertou');
        pontos+=10;
        acertos+=1;
        if(vidas===3){vida=' ❤❤❤'}
        if(vidas===2){vida=' 💔❤❤'}
        if(vidas===1){vida=' 💔💔❤'}
        if(vidas===0){vida=' 💔💔💔'}
        pontuacao.innerHTML=nome+"<br>"+"Vidas: "+ vida+"<br>" + 'Pontos: ' + pontos+"<br>" + "Perguntas corretas: "+ acertos +"/"+perguntasUsadas.length;
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
        pontuacao.innerHTML= nome+"<br>"+"Vidas: "+ vida+ "<br>"+ 'Pontos: ' + pontos+"<br>" + "Perguntas corretas: "+ acertos +"/"+perguntasUsadas.length; 
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

// OPÇÕES


let ativado=false;
const opcaomenu = document.querySelector('.eng');
const opcao= document.querySelector('.opcao');
opcaomenu.addEventListener('click', ativarmenu);

function ativarmenu(){ 
    if(ativado===false){
            opcao.style.display='flex';
            ativado=true;
        }
        else{
            opcao.style.display='none';
            ativado=false;
        }  
}

const sons = document.getElementById('sons');
sons.addEventListener('change', function() {
    const caixadesom= document.querySelector('.caixadesom');
    if (sons.checked) {
        ligarTodosOsSons();
        ativar.play();
        caixadesom.src='/assets/img/som.png';
    } else {
        desligarTodosOsSons();
        caixadesom.src='/assets/img/semsom.png';
        
    }
});

function desligarTodosOsSons() {
    todosossons.forEach(a => {
        a.volume=0;  
    });
}

function ligarTodosOsSons() {
    todosossons.forEach(a => {
        a.volume=0.5;
    });
}






// BANCO DE DADOS A SEGUIR

//Q1 ARTE E CULTURA

const q1=[
    {
        question: "Quem é conhecido por suas esculturas em mármore, incluindo 'O Davi' e 'A Pietà'?",
        answers: [
            { text: "Michelangelo", correct: true },
            { text: "Auguste Rodin", correct: false },
            { text: "Donatello", correct: false },
            { text: "Gian Lorenzo Bernini", correct: false }
        ]
    },
    {
        question: "Qual é o nome do movimento artístico que se concentra em representar objetos da vida cotidiana de maneira realista, como visto nas pinturas de Jean-Baptiste-Siméon Chardin?",
        answers: [
            { text: "Romantismo", correct: false },
            { text: "Realismo", correct: true },
            { text: "Surrealismo", correct: false },
            { text: "Cubismo", correct: false }
        ]
    },
    {
    question: "Qual é o nome do famoso pintor surrealista conhecido por suas obras como 'A Persistência da Memória', apresentando relógios derretidos?",
    answers: [
        { text: "René Magritte", correct: false },
        { text: "Salvador Dalí", correct: true },
        { text: "Frida Kahlo", correct: false },
        { text: "Joan Miró", correct: false }
        ]
    },
    {
        question: "Qual é o nome do estilo musical e da dança originários da Bahia, que misturam elementos africanos, indígenas e europeus?",
        answers: [
            { text: "Samba", correct: false },
            { text: "Forró", correct: false },
            { text: "Capoeira", correct: false },
            { text: "Axé", correct: true }
        ]
    },
    {
        question: "Quem é considerado o grande ícone da Bossa Nova e compôs músicas como 'Garota de Ipanema'?",
        answers: [
            { text: "Gilberto Gil", correct: false },
            { text: "Caetano Veloso", correct: false },
            { text: "Tom Jobim", correct: true },
            { text: "Chico Buarque", correct: false }
        ]
    },
    {
        question: "Qual é o nome da festa popular brasileira que ocorre antes do período da Quaresma e é marcada por desfiles de escolas de samba?",
        answers: [
            { text: "Carnaval", correct: true },
            { text: "Festa Junina", correct: false },
            { text: "Oktoberfest", correct: false },
            { text: "Folia de Reis", correct: false }
        ]
    },
    {
        question: "Quem é o autor de 'Grande Sertão: Veredas', uma das obras mais importantes da literatura brasileira?",
        answers: [
            { text: "Machado de Assis", correct: false },
            { text: "Guimarães Rosa", correct: true },
            { text: "Jorge Amado", correct: false },
            { text: "Carlos Drummond de Andrade", correct: false }
        ]
    },
    {
        question: "Em qual estado brasileiro se realiza o festival de música e cultura popular conhecido como Festival de Parintins?",
        answers: [
            { text: "Bahia", correct: false },
            { text: "Amazonas", correct: true },
            { text: "Pernambuco", correct: false },
            { text: "Rio de Janeiro", correct: false }
        ]
    },
    {
        question: "Quem foi a primeira mulher a ocupar a presidência do Brasil?",
        answers: [
            { text: "Dilma Rousseff", correct: true },
            { text: "Fernanda Montenegro", correct: false },
            { text: "Marina Silva", correct: false },
            { text: "Carmen Miranda", correct: false }
        ]
    },
    {
        question: "Qual é a manifestação folclórica brasileira que envolve a disputa de dois grupos, Boi Bumbá Garantido e Boi Bumbá Caprichoso, no estado do Amazonas?",
        answers: [
            { text: "Círio de Nazaré", correct: false },
            { text: "Folia de Reis", correct: false },
            { text: "Bumba Meu Boi", correct: true },
            { text: "Festa Junina", correct: false }
        ]
    },
    {
        question: "Qual é o nome da dança típica do estado do Rio Grande do Sul, em que os dançarinos usam trajes tradicionais e realizam movimentos coreografados?",
        answers: [
            { text: "Samba", correct: false },
            { text: "Forró", correct: false },
            { text: "Tango", correct: false },
            { text: "Dança Gaúcha", correct: true }
        ]
    },
    {
        question: "Quem é conhecido como o 'Poeta da República' e foi um importante escritor e político brasileiro?",
        answers: [
            { text: "Machado de Assis", correct: false },
            { text: "Castro Alves", correct: true },
            { text: "Cecília Meireles", correct: false },
            { text: "Euclides da Cunha", correct: false }
        ]
    },
    {
        question: "Qual é o nome do prato típico da culinária brasileira feito com feijão-preto, carne-seca, linguiça, bacon e outros ingredientes?",
        answers: [
            { text: "Acarajé", correct: false },
            { text: "Vatapá", correct: false },
            { text: "Feijoada", correct: true },
            { text: "Moqueca", correct: false }
        ]
    },
    {
        question: "Em que cidade brasileira ocorre o famoso festival de cinema internacional conhecido como Festival de Gramado?",
        answers: [
            { text: "Recife", correct: false },
            { text: "São Paulo", correct: false },
            { text: "Rio de Janeiro", correct: false },
            { text: "Gramado", correct: true }
        ]
    },
    {
        question: "Qual é o nome do famoso escritor brasileiro que é autor de clássicos como 'Dom Casmurro' e 'Memórias Póstumas de Brás Cubas'?",
        answers: [
            { text: "Carlos Drummond de Andrade", correct: false },
            { text: "Machado de Assis", correct: true },
            { text: "Cecília Meireles", correct: false },
            { text: "Graciliano Ramos", correct: false }
        ]
    },
    {
        question: "Quem é conhecido como o 'Pai da Aviação' no Brasil, por ter realizado o primeiro voo controlado em uma aeronave mais pesada que o ar?",
        answers: [
            { text: "Santos Dumont", correct: true },
            { text: "Alberto Santos", correct: false },
            { text: "Oswaldo Cruz", correct: false },
            { text: "Cândido Rondon", correct: false }
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
    {   question: 'Considerado o maior artista e arquiteto do período colonial brasileiro, e representante da barroco mineiro?',
        answers: [
            {text: 'Ernesto Neto', correct: false},
            {text: 'Antônio Francisco Lisboa (o Aleijadinho)', correct: true},
            {text: 'Francisco Brennand', correct: false},
            {text: 'Claudio Manoel da Costa', correct: false},
        ]
    },
    {   question: 'Mona Lisa ou também conhecida como A Gioconda, é considerada uma das maiores obras de?',
        answers: [
            {text: 'Michelangelo', correct: false},
            {text: 'Leonardo da Vinci', correct: true},
            {text: 'Juliano de Médici', correct: false},
            {text: 'Donatello', correct: false},
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
    {
        question: "Quem é o autor da Mona Lisa?",
        answers: [
            { text: "Vincent van Gogh", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Pablo Picasso", correct: false },
            { text: "Michelangelo", correct: false }
        ]
    },
    {
        question: "Qual é a peça de teatro mais famosa de William Shakespeare?",
        answers: [
            { text: "Hamlet", correct: true },
            { text: "Macbeth", correct: false },
            { text: "Romeu e Julieta", correct: false },
            { text: "A Tempestade", correct: false }
        ]
    },
    {
        question: "Quem é conhecido como o 'Rei do Pop'?",
        answers: [
            { text: "Elvis Presley", correct: false },
            { text: "Michael Jackson", correct: true },
            { text: "Prince", correct: false },
            { text: "David Bowie", correct: false }
        ]
    },
    {
        question: "Quem pintou 'A Noite Estrelada'?",
        answers: [
            { text: "Claude Monet", correct: false },
            { text: "Vincent van Gogh", correct: true },
            { text: "Pablo Picasso", correct: false },
            { text: "Salvador Dalí", correct: false }
        ]
    },
    {
        question: "Quem é o escultor da estátua 'O Pensador'?",
        answers: [
            { text: "Leonardo da Vinci", correct: false },
            { text: "Auguste Rodin", correct: true },
            { text: "Michelangelo", correct: false },
            { text: "Pablo Picasso", correct: false }
        ]
    },
    {
        question: "Em que livro de George Orwell o governo é representado por um líder chamado Big Brother?",
        answers: [
            { text: "1984", correct: true },
            { text: "A Revolução dos Bichos", correct: false },
            { text: "O Triunfo dos Porcos", correct: false },
            { text: "A Filha do Reverendo", correct: false }
        ]
    },
    {
        question: "Qual é o romance escrito por J.K. Rowling que introduziu o mundo ao jovem bruxo Harry Potter?",
        answers: [
            { text: "Harry Potter e o Prisioneiro de Azkaban", correct: false },
            { text: "Harry Potter e o Cálice de Fogo", correct: false },
            { text: "Harry Potter e a Pedra Filosofal", correct: true },
            { text: "Harry Potter e as Relíquias da Morte", correct: false }
        ]
    },
    {
        question: "Quem é a autora de 'O Diário de Anne Frank'?",
        answers: [
            { text: "Virginia Woolf", correct: false },
            { text: "Harper Lee", correct: false },
            { text: "Anne Frank", correct: false },
            { text: "A escrita é creditada a Anne Frank, mas sua morte impediu que ela revisasse ou completasse o diário.", correct: true }
        ]
    },
    {
        question: "Quem é o autor de 'O Senhor dos Anéis', uma trilogia épica de fantasia?",
        answers: [
            { text: "C.S. Lewis", correct: false },
            { text: "J.K. Rowling", correct: false },
            { text: "J.R.R. Tolkien", correct: true },
            { text: "George R.R. Martin", correct: false }
        ]
    },
    {
        question: "Qual é o romance de Mary Shelley que conta a história de Victor Frankenstein e sua criatura?",
        answers: [
            { text: "Drácula", correct: false },
            { text: "Frankenstein ou o Prometeu Moderno", correct: true },
            { text: "O Médico e o Monstro", correct: false },
            { text: "O Retrato de Dorian Gray", correct: false }
        ]
    },
    {
        question: "Qual movimento artístico é caracterizado por formas geométricas abstratas e cores vibrantes?",
        answers: [
            { text: "Renascimento", correct: false },
            { text: "Barroco", correct: false },
            { text: "Cubismo", correct: true },
            { text: "Romantismo", correct: false }
        ]
    },
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
    {   question: 'Júpiter e Plutão são os correlatos romanos de quais deuses gregos?',
        answers: [
            {text: 'Ares e Hermes', correct: false},
            {text: 'Dionísio e Deméter', correct: false},
            {text: 'Zeus e Hades ', correct: true},
            {text: 'Ares e Hermes', correct: false},
        ]
    },
    {   question: 'Quem foi o criador da tragédia grega?',
        answers: [
            {text: 'Homero', correct: false},
            {text: 'Ésquilo', correct: true},
            {text: 'Sófocles', correct: false},
            {text: 'Sócrates', correct: false},
        ]
    },
    {   question: 'Em que país nasceu Clarice Lispector?',
        answers: [
            {text: 'Ucrânia', correct: true},
            {text: 'Brasil', correct: false},
            {text: 'Portugal', correct: false},
            {text: 'França', correct: false},
        ]
    },

]


//Q2 BIOLOGIA

const q2=[
    {
        question: "Qual é a unidade básica da estrutura e função dos seres vivos?",
        answers: [
            { text: "Célula", correct: true },
            { text: "Átomo", correct: false },
            { text: "Molécula", correct: false },
            { text: "DNA", correct: false }
        ]
    },
    {
        question: "O que é a fotossíntese?",
        answers: [
            { text: "Respiração celular", correct: false },
            { text: "Produção de proteínas", correct: false },
            { text: "Processo de obtenção de energia a partir da luz solar", correct: true },
            { text: "Digestão", correct: false }
        ]
    },
    {
        question: "Qual é a função principal do sistema nervoso?",
        answers: [
            { text: "Digestão", correct: false },
            { text: "Circulação", correct: false },
            { text: "Controle e coordenação das atividades do corpo", correct: true },
            { text: "Respiração", correct: false }
        ]
    },
    {
        question: "O que é a meiose?",
        answers: [
            { text: "Processo de divisão celular que resulta em células filhas geneticamente idênticas à célula mãe", correct: false },
            { text: "Formação de gametas", correct: true },
            { text: "Divisão celular que ocorre apenas em células animais", correct: false },
            { text: "Produção de energia nas células", correct: false }
        ]
    },
    {
        question: "O que são os cromossomos?",
        answers: [
            { text: "Estruturas que armazenam informações genéticas", correct: true },
            { text: "Organelas responsáveis pela produção de ATP", correct: false },
            { text: "Elementos químicos presentes nas células", correct: false },
            { text: "Unidades básicas da matéria viva", correct: false }
        ]
    },
    {
        question: "Qual é a função do DNA?",
        answers: [
            { text: "Transporte de oxigênio no sangue", correct: false },
            { text: "Síntese de proteínas", correct: false },
            { text: "Armazenamento de informações genéticas", correct: true },
            { text: "Digestão de nutrientes", correct: false }
        ]
    },
    {
        question: "Qual é a principal característica que define um animal como pertencente ao filo dos artrópodes?",
        answers: [
            { text: "Presença de espinhos", correct: false },
            { text: "Corpo segmentado e exoesqueleto de quitina", correct: true },
            { text: "Presença de penas", correct: false },
            { text: "Corpo alongado e escamas", correct: false }
        ]
    },
    {
        question: "Os animais pertencentes à classe dos mamíferos se caracterizam por:",
        answers: [
            { text: "Ter escamas e nadadeiras", correct: false },
            { text: "Ter asas e penas", correct: false },
            { text: "Amamentação dos filhotes com leite produzido por glândulas mamárias", correct: true },
            { text: "Respiração por brânquias", correct: false }
        ]
    },
    {
        question: "Qual é a principal característica dos animais anfíbios?",
        answers: [
            { text: "Penas para voar", correct: false },
            { text: "Respiração por pulmões", correct: false },
            { text: "Desenvolvimento em fase larval aquática e fase adulta terrestre", correct: true },
            { text: "Corpo coberto por escamas", correct: false }
        ]
    },
    {
        question: "Quais são os animais que possuem um bico adaptado para se alimentar exclusivamente de néctar?",
        answers: [
            { text: "Carnívoros", correct: false },
            { text: "Herbívoros", correct: false },
            { text: "Nectarívoros", correct: true },
            { text: "Onívoros", correct: false }
        ]
    },
    {
        question: "Qual é a ordem à qual pertencem animais como leões, tigres, e gatos domésticos?",
        answers: [
            { text: "Artiodáctilos", correct: false },
            { text: "Cetáceos", correct: false },
            { text: "Felinos", correct: true },
            { text: "Perissodáctilos", correct: false }
        ]
    },
    {
        question: "Os animais da classe dos répteis são caracterizados por:",
        answers: [
            { text: "Ter asas", correct: false },
            { text: "Respiração por brânquias", correct: false },
            { text: "Corpo coberto por penas", correct: false },
            { text: "Possuir escamas e respirar por pulmões", correct: true }
        ]
    },
    {
        question: "A classe dos peixes cartilaginosos inclui animais como:",
        answers: [
            { text: "Tubarões e arraias", correct: true },
            { text: "Sapos e rãs", correct: false },
            { text: "Cavalos-marinhos", correct: false },
            { text: "Tartarugas e crocodilos", correct: false }
        ]
    },
    {
        question: "Quais são os animais que possuem uma camada de penas que os ajuda a voar?",
        answers: [
            { text: "Mamíferos", correct: false },
            { text: "Répteis", correct: false },
            { text: "Aves", correct: true },
            { text: "Anfíbios", correct: false }
        ]
    },
    {
        question: "A ordem dos primatas inclui:",
        answers: [
            { text: "Gatos e cachorros", correct: false },
            { text: "Macacos, gorilas e humanos", correct: true },
            { text: "Elefantes e rinocerontes", correct: false },
            { text: "Cavalos e zebras", correct: false }
        ]
    },
    {
        question: "Quantas pernas possuem os insetos?",
        answers: [
            { text: "8", correct: false },
            { text: "6", correct: true },
            { text: "10", correct: false },
            { text: "12", correct: false }
        ]
    },
    {
        question: "Quantas pernas possuem os aracnídeos?",
        answers: [
            { text: "6", correct: false },
            { text: "10", correct: false },
            { text: "12", correct: false },
            { text: "8", correct: true }            
        ]
    },
    {
        question: "Quem inventou a penicilina, o primeiro antibiótico?",
        answers: [
            { text: "Marie Curie", correct: false },
            { text: "Alexander Fleming", correct: true },
            { text: "Louis Pasteur", correct: false },
            { text: "Joseph Lister", correct: false }
        ]
    },
    {
        question: "Quantos ossos tem um adulto humano?",
        answers: [
            { text: "206", correct: true },
            { text: "180", correct: false },
            { text: "250", correct: false },
            { text: "300", correct: false }
        ]
    },
    {   question: 'Quais destas doenças são sexualmente transmissíveis?',
        answers: [
            {text: 'Aids, tricomoníase e ebola', correct: false},
            {text: 'Gonorreia, clamídia e sífilis', correct: true},
            {text: 'Botulismo, cistite e gonorreia', correct: false},
            {text: 'Chikungunya, aids e herpes genital', correct: false},
        ]
    },
    {   question: 'Que substância é absorvida pelas plantas e expirada por todos os seres vivos?',
        answers: [
            {text: 'Oxigênio', correct: false},
            {text: 'Gás carbônico', correct: true},
            {text: 'Nitrogênio', correct: false},
            {text: 'Hélio', correct: false},
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
    {   question: 'Qual das doenças a seguir não é causada por um vírus?',
        answers: [
            {text: 'dengue', correct: false},
            {text: 'sarampo', correct: false},
            {text: 'catapora', correct: false},
            {text: 'tétano', correct: true},
        ]
    },
    {   question: 'Possui formato de disco bicôncavo e seu interior encontra-se a hemoglobina, relacionada com transporte de gases:',
        answers: [
            {text: 'plaquetas', correct: false},
            {text: 'hemácias', correct: true},
            {text: 'leucócitos', correct: false},
            {text: 'linfócitos', correct: false},
        ]
    },
    {   question: 'Qual o maior osso do corpo humano?',
        answers: [
            {text: 'fêmur', correct: true},
            {text: 'úmero', correct: false},
            {text: 'tíbia', correct: false},
            {text: 'rádio', correct: false},
        ]
    },
    {   question: 'Qual a maior célula do corpo humano?',
        answers: [
            {text: 'macrófago', correct: false},
            {text: 'óvulo', correct: true},
            {text: 'hemácia', correct: false},
            {text: 'osteócito', correct: false},
        ]
    },
    {
        question: "Qual é o ácido encontrado no estômago humano?",
        answers: [
            { text: "Ácido Clorídrico", correct: true },
            { text: "Ácido Sulfúrico", correct: false },
            { text: "Ácido Acético", correct: false },
            { text: "Ácido Nítrico", correct: false }
        ]
    }, 
    {
        question: "Qual é a função principal dos pulmões humanos?",
        answers: [
            { text: "Digestão", correct: false },
            { text: "Filtração de sangue", correct: false },
            { text: "Respiração", correct: true },
            { text: "Circulação", correct: false }
        ]
    },
    {
        question: "Qual é a função do sistema circulatório?",
        answers: [
            { text: "Respiração", correct: false },
            { text: "Digestão", correct: false },
            { text: "Transporte de nutrientes e oxigênio", correct: true },
            { text: "Excreção", correct: false }
        ]
    },
    {
        question: "O que são os ribossomos?",
        answers: [
            { text: "Organelas responsáveis pela síntese de lipídios", correct: false },
            { text: "Organelas responsáveis pela síntese de proteínas", correct: true },
            { text: "Estruturas que armazenam água e nutrientes", correct: false },
            { text: "Estruturas de suporte da célula", correct: false }
        ]
    },
    {
        question: "O que é mitose?",
        answers: [
            { text: "A divisão celular que forma gametas", correct: false },
            { text: "A duplicação do material genético", correct: false },
            { text: "A divisão celular que forma células filhas idênticas", correct: true },
            { text: "A troca de material genético entre cromossomos", correct: false }
        ]
    },
    {
        question: "O que é um ecossistema?",
        answers: [
            { text: "Um órgão do corpo humano", correct: false },
            { text: "Um sistema de transporte público", correct: false },
            { text: "Uma comunidade de organismos e seu ambiente físico", correct: true },
            { text: "Um tipo de célula animal", correct: false }
        ]
    },
    {
        question: "Onde ocorre a fotossíntese nas plantas?",
        answers: [
            { text: "Nas raízes", correct: false },
            { text: "No caule", correct: false },
            { text: "Nas folhas", correct: true },
            { text: "Nas flores", correct: false }
        ]
    },
    {
        question: "O que são os leucócitos?",
        answers: [
            { text: "Células musculares", correct: false },
            { text: "Células sanguíneas brancas", correct: true },
            { text: "Células nervosas", correct: false },
            { text: "Células da pele", correct: false }
        ]
    },
    {
        question: "Qual é a função dos cílios e flagelos nas células?",
        answers: [
            { text: "Produção de energia", correct: false },
            { text: "Movimento celular", correct: true },
            { text: "Digestão de nutrientes", correct: false },
            { text: "Fotossíntese", correct: false }
        ]
    },
    {
        question: "O que é um gene?",
        answers: [
            { text: "Uma organela celular", correct: false },
            { text: "Um tipo de célula", correct: false },
            { text: "Uma unidade de herança genética", correct: true },
            { text: "Um tipo de tecido", correct: false }
        ]
    },
    {
        question: "São algumas das funções dos rins no corpo humano?",
        answers: [
            { text: "Produção de hormônios", correct: false },
            { text: "Digestão de alimentos", correct: false },
            { text: "Filtragem do sangue para remover resíduos e excesso de água", correct: true },
            { text: "Produção de células de defesa", correct: false }
        ]
    }

]

//Q3 CIÊNCIAS

const q3=[
    {
        question: "O que é a tabela periódica?",
        answers: [
            { text: "Lista de elementos químicos ordenados por seus números atômicos", correct: true },
            { text: "Registro de descobertas astronômicas", correct: false },
            { text: "Catálogo de espécies animais", correct: false },
            { text: "Classificação de minerais", correct: false }
        ]
    },
    {
        question: "O que é a energia renovável?",
        answers: [
            { text: "Energia proveniente de fontes não renováveis, como o petróleo", correct: false },
            { text: "Energia produzida por processos nucleares", correct: false },
            { text: "Energia obtida a partir de fontes naturais que se renovam constantemente", correct: true },
            { text: "Energia gerada por combustíveis fósseis", correct: false }
        ]
    },
    {
        question: "Quais são os três estados físicos da matéria?",
        answers: [
            { text: "Sólido, líquido e gasoso", correct: true },
            { text: "Líquido, gasoso e plasma", correct: false },
            { text: "Gasoso, plasma e condensado de Bose-Einstein", correct: false },
            { text: "Sólido, líquido e plasma", correct: false }
        ]
    },
    {
        question: "O que é a teoria da relatividade proposta por Albert Einstein?",
        answers: [
            { text: "Teoria que explica a origem do universo", correct: false },
            { text: "Teoria que descreve o movimento dos corpos celestes", correct: false },
            { text: "Teoria que relaciona o espaço, o tempo e a gravidade", correct: true },
            { text: "Teoria que estuda a interação das partículas subatômicas", correct: false }
        ]
    },
    {
        question: "O que é a lei da conservação da energia?",
        answers: [
            { text: "A energia total em um sistema isolado permanece constante", correct: true },
            { text: "A energia pode ser criada a partir do nada", correct: false },
            { text: "A energia é destruída durante as reações químicas", correct: false },
            { text: "A energia se transforma apenas em calor", correct: false }
        ]
    },
    {
        question: "O que é a teoria celular?",
        answers: [
            { text: "Teoria que explica a origem do universo", correct: false },
            { text: "Teoria que descreve o movimento dos corpos celestes", correct: false },
            { text: "Teoria que postula que todos os seres vivos são compostos por células", correct: true },
            { text: "Teoria que estuda a interação das partículas subatômicas", correct: false }
        ]
    },
    {
        question: "O que é um íon?",
        answers: [
            { text: "Um átomo neutro", correct: false },
            { text: "Um átomo com carga positiva", correct: false },
            { text: "Um átomo com carga negativa ou positiva devido à perda ou ganho de elétrons", correct: true },
            { text: "Um átomo com excesso de nêutrons", correct: false }
        ]
    },
    {
        question: "O que é a teoria da Big Bang?",
        answers: [
            { text: "Teoria que explica a origem da vida na Terra", correct: false },
            { text: "Teoria que descreve a formação das galáxias e a expansão do universo a partir de um estado inicial extremamente denso e quente", correct: true },
            { text: "Teoria que explica a origem do sistema solar", correct: false },
            { text: "Teoria que descreve a evolução biológica", correct: false }
        ]
    },
    {
        question: "O que é a lei da gravidade?",
        answers: [
            { text: "Objetos leves flutuam, enquanto objetos pesados caem", correct: false },
            { text: "Os objetos são atraídos uns pelos outros, sendo a força proporcional às massas e inversamente proporcional ao quadrado da distância entre elas", correct: true },
            { text: "A gravidade é uma força repulsiva entre objetos", correct: false },
            { text: "A gravidade só afeta objetos na Terra", correct: false }
        ]
    },
    {
        question: "O que é a clonagem?",
        answers: [
            { text: "Processo de reprodução sexuada", correct: false },
            { text: "Processo de criação de organismos geneticamente idênticos a partir de uma célula ou grupo de células", correct: true },
            { text: "Processo de modificação genética de plantas", correct: false },
            { text: "Processo de reprodução assexuada em animais", correct: false }
        ]
    },
    {
        question: "O que é a camada de ozônio?",
        answers: [
            { text: "Camada de partículas sólidas na atmosfera", correct: false },
            { text: "Camada de gases responsável pelo efeito estufa", correct: false },
            { text: "Camada de gás oxigênio na estratosfera que absorve a maior parte da radiação ultravioleta do Sol", correct: true },
            { text: "Camada de névoa na atmosfera", correct: false }
        ]
    },
    {
        question: "O que é a terapia genética?",
        answers: [
            { text: "Uso de plantas medicinais para tratamento de doenças genéticas", correct: false },
            { text: "Uso de medicamentos para corrigir problemas genéticos", correct: false },
            { text: "Intervenção nos genes de uma pessoa para tratar ou prevenir doenças", correct: true },
            { text: "Tratamento de doenças utilizando radiação genética", correct: false }
        ]
    },
    {
        question: "O que é a nanotecnologia?",
        answers: [
            { text: "Estudo dos elementos químicos em nível atômico", correct: false },
            { text: "Tecnologia aplicada à agricultura", correct: false },
            { text: "Manipulação de materiais em escala molecular e atômica", correct: true },
            { text: "Estudo da nanoterraformação de planetas", correct: false }
        ]
    },   
    {   question: ' A aceleração da gravidade é a intensidade do campo gravitacional em um determinado ponto. Qual seu valor aproximado na Terra?',
        answers: [
            {text: '20 metros/s2', correct: false},
            {text: '1 metro/s2', correct: false},
            {text: '9,8 metros/s2', correct: true},
            {text: '5 metro/s2', correct: false},
        ]
    },
    {   question: 'A lei da Ação e Reação é qual Lei de Newton?',
        answers: [
            {text: 'Primeira', correct: false},
            {text: 'Segunda', correct: false},
            {text: 'Terceira', correct: true},
            {text: 'Quarta', correct: false},
        ]
    },
    {   question: '1 minuto tem quantos segundos?',
        answers: [
            {text: '10', correct: false},
            {text: '30', correct: false},
            {text: '60', correct: true},
            {text: '100', correct: false},
        ]
    },
    {   question: 'Qual das alternativas contém apenas invenções criadas no Brasil?',
        answers: [
            {text: 'Soro antiofídico e chuveiro elétrico', correct: true},
            {text: 'Chuveiro elétrico e internet', correct: false},
            {text: 'Telefone e urna eletrónica', correct: false},
            {text: 'Facebook e automóvel', correct: false},
        ]
    },
    {
        question: "Quantos planetas fazem parte do nosso sistema solar?",
        answers: [
            { text: "7", correct: false },
            { text: "9", correct: false },
            { text: "8", correct: true },
            { text: "10", correct: false }
        ]
    },    
    {
        question: "O que é a cadeia alimentar?",
        answers: [
            { text: "Um tipo de reação química", correct: false },
            { text: "Um processo de digestão", correct: false },
            { text: "A sequência de transferência de energia de um organismo para outro na forma de alimentos", correct: true },
            { text: "Um tipo de reprodução assexuada", correct: false }
        ]
    },
    {
        question: "O que é a teoria do Big Bang?",
        answers: [
            { text: "Uma teoria sobre a origem da vida na Terra", correct: false },
            { text: "Uma explicação para a formação de planetas", correct: false },
            { text: "A teoria de que o universo começou como uma singularidade e expandiu rapidamente", correct: true },
            { text: "Um modelo para a formação de estrelas", correct: false }
        ]
    },
    {
        question: "O que é um buraco negro?",
        answers: [
            { text: "Uma estrela em formação", correct: false },
            { text: "Um fenômeno atmosférico", correct: false },
            { text: "Uma região do espaço com gravidade tão intensa que nada pode escapar, nem mesmo a luz", correct: true },
            { text: "Um tipo de galáxia", correct: false }
        ]
    },
    {
        question: "Qual é o componente mais abundante na atmosfera terrestre?",
        answers: [
            { text: "Nitrogênio", correct: true },
            { text: "Oxigênio", correct: false },
            { text: "Dióxido de Carbono", correct: false },
            { text: "Hidrogênio", correct: false }
        ]
    },
    {
        question: "Qual é a unidade básica da energia no Sistema Internacional de Unidades?",
        answers: [
            { text: "Joule", correct: true },
            { text: "Watt", correct: false },
            { text: "Caloria", correct: false },
            { text: "Quilograma", correct: false }
        ]
    },
    {
        question: "Qual é o elemento químico mais abundante no universo?",
        answers: [
            { text: "Oxigênio", correct: false },
            { text: "Hidrogênio", correct: true },
            { text: "Carbono", correct: false },
            { text: "Ferro", correct: false }
        ]
    },
    {
        question: "Qual é a menor unidade de um elemento químico que ainda mantém as propriedades desse elemento?",
        answers: [
            { text: "Átomo", correct: true },
            { text: "Molécula", correct: false },
            { text: "Íon", correct: false },
            { text: "Próton", correct: false }
        ]
    },
    {
        question: "O que estuda a astronomia?",
        answers: [
            { text: "Os oceanos", correct: false },
            { text: "O corpo humano", correct: false },
            { text: "Os astros e corpos celestes", correct: true },
            { text: "O solo e as rochas", correct: false }
        ]
    },
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
    {   question: 'Qual cientista conhecido por formular a Teoria da Relatividade',
        answers: [
            {text: 'Issac Newton', correct: false},
            {text: 'Albert Einstein', correct: true},
            {text: 'Stephen Hawking', correct: false},
            {text: 'Galileu Galilei', correct: false},
        ]
    },
    {   question: '1 hectare equivale a?',
        answers: [
            {text: '100 metros quadrados', correct: false},
            {text: '1.000 metros quadrados', correct: false},
            {text: '10.000 metros quadrados', correct: true},
            {text: '100 km quadrados', correct: false},
        ]
    },
    {   question: 'Qual o metal cujo símbolo químico é o Au?',
        answers: [
            {text: 'Cobre', correct: false},
            {text: 'Prata', correct: false},
            {text: 'Mercúrio', correct: false},
            {text: 'Ouro', correct: true},
        ]
    },
    {   question: 'Qual o metal cujo símbolo químico é o Pb?',
        answers: [
            {text: 'Chumbo', correct: true},
            {text: 'Manganês', correct: false},
            {text: 'Ferro', correct: false},
            {text: 'Prata', correct: false},
        ]
    }, 
    {   question: 'Leonardo Fibonacci foi um conhecido matemático italiano. Quais números representam a sequência de Fibonacci? ',
        answers: [
            {text: '0 1 2 3 4 5 6 7 8 9...', correct: false},
            {text: '0 1 1 2 3 5 8 13 21...', correct: true},
            {text: '1 2 4 8 16 32 64 128...', correct: false},
            {text: '1 5 10 15 30 40 50 60...', correct: false},
        ]
    }, 
]


//Q4 CINEMA E MÚSICA

const q4=[
    
    {
        question: "Em qual filme Leonardo DiCaprio finalmente ganhou um Oscar de Melhor Ator após várias indicações?",
        answers: [
            { text: "Titanic", correct: false },
            { text: "Django Livre", correct: false },
            { text: "O Lobo de Wall Street", correct: false },
            { text: "O Regresso", correct: true }
        ]
    },
    {
        question: "Qual é o nome do dragão em 'Game of Thrones'?",
        answers: [
            { text: "Smaug", correct: false },
            { text: "Viserion", correct: false },
            { text: "Drogon", correct: true },
            { text: "Toothless", correct: false }
        ]
    },
    {
        question: "Qual é o nome do filme dirigido por Quentin Tarantino que se passa durante a Segunda Guerra Mundial?",
        answers: [
            { text: "Django Livre", correct: false },
            { text: "Kill Bill", correct: false },
            { text: "Pulp Fiction", correct: false },
            { text: "Bastardos Inglórios", correct: true }
        ]
    },
    {
        question: "Qual é o nome do agente do FBI que é o protagonista da série 'O Silêncio dos Inocentes'?",
        answers: [
            { text: "Jack Crawford", correct: false },
            { text: "Fox Mulder", correct: false },
            { text: "Clarice Starling", correct: true },
            { text: "Hannibal Lecter", correct: false }
        ]
    },
    {
        question: "Quem interpretou o papel de Tony Stark, também conhecido como Homem de Ferro, no Universo Cinematográfico Marvel?",
        answers: [
            { text: "Chris Evans", correct: false },
            { text: "Robert Downey Jr.", correct: true },
            { text: "Chris Hemsworth", correct: false },
            { text: "Mark Ruffalo", correct: false }
        ]
    },
    {
        question: "Em que filme o personagem Hannibal Lecter diz a famosa frase 'Uma boa garrafa de Chianti'?",
        answers: [
            { text: "O Silêncio dos Inocentes", correct: true },
            { text: "Hannibal", correct: false },
            { text: "Dragão Vermelho", correct: false },
            { text: "O Silêncio dos Inocentes", correct: false }
        ]
    },
    {
        question: "Qual é o nome da família protagonista da série de animação 'Os Simpsons'?",
        answers: [
            { text: "Griffin", correct: false },
            { text: "Hill", correct: false },
            { text: "Smith", correct: false },
            { text: "Simpson", correct: true }
        ]
    },
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
    {   question: 'Famosa banda brasileira de rock cujos integrantes faleceram em um acidente de avião em 1995?',
        answers: [
            {text: 'Titãs', correct: false},
            {text: 'Roupa Nova', correct: false},
            {text: 'Ultraje a Rigor', correct: false},
            {text: 'Mamonas Assassinas', correct: true},
        ]
    },
    {   question: 'Em qual país foi formada a banda Metallica',
        answers: [
            {text: 'Estados Unidos', correct: true},
            {text: 'Inglaterra', correct: false},
            {text: 'Austrália', correct: false},
            {text: 'Alemanha', correct: false},
        ]
    },
    {   question: 'John Snow e Tyrion Lannister são personagens de que famosa série de fantasia medieval?',
        answers: [
            {text: 'Vikings', correct: false},
            {text: 'The Last Kingdom', correct: false},
            {text: 'Game of Thrones', correct: true},
            {text: 'Templários', correct: false},
        ]
    },
    {   question: 'Em que ano foi apresentado o primeiro Oscar?',
        answers: [
            {text: '1942', correct: false},
            {text: '1929', correct: true},
            {text: '1950', correct: false},
            {text: '1910', correct: false},
        ]
    },
    {   question: 'Que filme de terror apresentou o primeiro banheiro funcionando na tela?',
        answers: [
            {text: 'A mão que balança o berço', correct: false},
            {text: 'E o vento levou', correct: false},
            {text: 'Psicose', correct: true},
            {text: 'Ben Hur', correct: false},
        ]
    },
    {   question: '"Eu vejo pessoas mortas!" é uma famosa citação de qual filme?',
        answers: [
            {text: 'O sexto sentido', correct: true},
            {text: 'Os outros', correct: false},
            {text: 'Ecos do Além', correct: false},
            {text: 'Sobrenatural', correct: false},
        ]
    },
    {   question: 'Qual foi o primeiro filme de animação a ser indicado ao Oscar de Melhor Filme?',
        answers: [
            {text: 'A bela e a fera', correct: true},
            {text: 'Bambi', correct: false},
            {text: 'Pocahontas', correct: false},
            {text: 'A pequena sereia', correct: false},
        ]
    },
    {   question: 'Julia Roberts interpreta uma prostituta no clássico de 1990 “Uma Linda Mulher”. Qual era seu nome?',
        answers: [
            {text: 'Jenny', correct: false},
            {text: 'Victoria', correct: false},
            {text: 'Violeta', correct: true},
            {text: 'Jane', correct: false},
        ]
    },
    {   question: 'Quem cantou “My Heart Will Go On” no Titanic?',
        answers: [
            {text: 'Mariah Carey', correct: false},
            {text: 'Whitney Houston', correct: false},
            {text: 'Beyoncé', correct: false},
            {text: 'Celine Dion', correct: true},
        ]
    },
    {   question: 'Qual das opções não era personagem do filme "O Mágico de Oz"',
        answers: [
            {text: 'Homem de lata', correct: false},
            {text: 'Espantalho', correct: false},
            {text: 'O leão covarde', correct: false},
            {text: 'Coragem o cão covarde', correct: true},
        ]
    },
    {   question: 'Qual das opções não é um dos 7 anões',
        answers: [
        {text: 'Raivoso', correct: true},
        {text: 'Dengoso', correct: false},
        {text: 'Dunga', correct: false},
        {text: 'Mestre', correct: false},
        ]
    },
    {   question: "Quem interpretou o Coringa no filme 'Batman: O Cavaleiro das Trevas'?",
        answers: [
            { text: "Jack Nicholson", correct: false },
            { text: "Jared Leto", correct: false },
            { text: "Heath Ledger", correct: true },
            { text: "Joquin Phoenix", correct: false }
        ]
    },
    {
        question: "Qual é o nome do robô em 'WALL-E', da Disney-Pixar?",
        answers: [
            { text: "R2-D2", correct: false },
            { text: "EVE", correct: false },
            { text: "WALL-E", correct: true },
            { text: "C-3PO", correct: false }
        ]
    },
    {
        question: "Quem dirigiu a trilogia 'O Senhor dos Anéis'?",
        answers: [
            { text: "Christopher Nolan", correct: false },
            { text: "Peter Jackson", correct: true },
            { text: "George Lucas", correct: false },
            { text: "Quentin Tarantino", correct: false }
        ]
    },
    {
        question: "Quem interpretou o papel principal no filme 'O Poderoso Chefão'?",
        answers: [
            { text: "Robert De Niro", correct: false },
            { text: "Al Pacino", correct: false },
            { text: "Marlon Brando", correct: true },
            { text: "Joe Pesci", correct: false }
        ]
    },
    {
        question: "Quem dirigiu o filme 'Cidadão Kane', considerado por muitos como o melhor filme de todos os tempos?",
        answers: [
            { text: "Steven Spielberg", correct: false },
            { text: "Alfred Hitchcock", correct: false },
            { text: "Orson Welles", correct: true },
            { text: "Martin Scorsese", correct: false }
        ]
    },
    {
        question: "Quem interpretou o papel principal no filme 'O Poderoso Chefão'?",
        answers: [
            { text: "Robert De Niro", correct: false },
            { text: "Al Pacino", correct: false },
            { text: "Marlon Brando", correct: true },
            { text: "Joe Pesci", correct: false }
        ]
    },
    {
        question: "Que cor está presente em quase todas as cenas de O Iluminado?",
        answers: [
            { text: "Preto", correct: false },
            { text: "Amarelo", correct: false },
            { text: "Vermelho", correct: true },
            { text: "Verde", correct: false }
        ]
    },
    {
        question: "Para que ano Marty e Doc viajam em 'De Volta para o Futuro Parte II'?",
        answers: [
            { text: "1999", correct: false },
            { text: "2000", correct: false },
            { text: "2015", correct: true },
            { text: "2020", correct: false }
        ]
    },
    {
        question: "Este Super herói é um repórter fotográfico que trabalha para um dos dos Jornais mais importantes de sua cidade",
        answers: [
            { text: "Batman", correct: false },
            { text: "Homem Aranha", correct: true },
            { text: "Super Homem", correct: false },
            { text: "Lanterna Verde", correct: false }
        ]
    },
    {
        question: "Personagem do seriado Chaves que mora numa casa de Número 71:",
        answers: [
            { text: "Seu Madruga", correct: false },
            { text: "Dona Clotilde", correct: true },
            { text: "Dona Florinda", correct: false },
            { text: "Seu Barriga", correct: false }
        ]
    },
    {
        question: "Nome do Gato de Filme de desenho animado onde existe um canário chamado Piu-Piu?",
        answers: [
            { text: "Tom", correct: false },
            { text: "Garfield", correct: false },
            { text: "Frajola", correct: true },
            { text: "Jerry", correct: false }
        ]
    },
    {
        question: "Antigo Desenho animado da TV onde existia um personagem chamado Dick Vigarista que sempre andava acompanhado por um cachorro chamado Mutley?",
        answers: [
            { text: "Os Jetsons", correct: false },
            { text: "Corrida Maluca", correct: true },
            { text: "Os Flintstones", correct: false },
            { text: "Tom e Jerry", correct: false }
        ]
    },
    {
        question: "Super Heroi infantil muito atrapalhado que usa roupa vermelha e possui anteninhas na cabeça e que usa como arma uma marreta de plástico?",
        answers: [
            { text: "Super Pateta", correct: false },
            { text: "Super Homem", correct: false },
            { text: "Homem Aranha", correct: false },
            { text: "Chapolim Colorado", correct: true }
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
    {
        question: "Qual é o esporte principal das Olimpíadas de Inverno?",
        answers: [
            { text: "Atletismo", correct: false },
            { text: "Esqui", correct: true },
            { text: "Patinação", correct: false },
            { text: "Ginástica Artística", correct: false }
        ]
    },
    {
        question: "Qual é a modalidade esportiva em que os atletas devem atravessar obstáculos, como barras e muros, em um percurso cronometrado?",
        answers: [
            { text: "Corrida de revezamento", correct: false },
            { text: "Salto com vara", correct: false },
            { text: "Corrida com obstáculos", correct: true },
            { text: "Maratona", correct: false }
        ]
    },
    {
        question: "Quantas vezes o Brasil sediou os Jogos Olímpicos?",
        answers: [
            { text: "1", correct: true },
            { text: "2", correct: false },
            { text: "3", correct: false },
            { text: "Nenhuma", correct: false }
        ]
    },
    {
        question: "Quantos anéis compõem o símbolo olímpico?",
        answers: [
            { text: "4", correct: false },
            { text: "5", correct: true },
            { text: "6", correct: false },
            { text: "7", correct: false }
        ]
    },
    {
        question: "Qual é o nome dado à competição de ciclismo que consiste em três disciplinas: mountain bike, ciclismo de estrada e ciclismo BMX?",
        answers: [
            { text: "Tour de France", correct: false },
            { text: "Giro d'Italia", correct: false },
            { text: "Triatlo", correct: true },
            { text: "Vuelta a España", correct: false }
        ]
    },
    {
        question: "Qual é o esporte em que os jogadores deslizam pedras de granito polido em uma pista de gelo em direção a um alvo que é segmentado em círculos concêntricos?",
        answers: [
            { text: "Hóquei no Gelo", correct: false },
            { text: "Esqui Cross-Country", correct: false },
            { text: "Bobsleigh", correct: false },
            { text: "Curling", correct: true }
        ]
    },
    {
        question: "O que os atletas usam para saltar sobre a barra horizontal na ginástica artística masculina?",
        answers: [
            { text: "Trave", correct: false },
            { text: "Paralelas", correct: false },
            { text: "Salto de Potro", correct: false },
            { text: "Barra fixa", correct: true }
        ]
    },
    {
        question: "Qual é a distância da maratona, uma das provas mais tradicionais das Olimpíadas?",
        answers: [
            { text: "15 km", correct: false },
            { text: "21 km", correct: false },
            { text: "42 km", correct: true },
            { text: "50 km", correct: false }
        ]
    },
    {
        question: "Qual é o nome da cerimônia de encerramento das Olimpíadas, em que a chama olímpica é apagada?",
        answers: [
            { text: "Abertura", correct: false },
            { text: "Desfile das Nações", correct: false },
            { text: "Hino Nacional", correct: false },
            { text: "Encerramento", correct: true }
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
    {   question: 'Qual piloto de Fórmula 1 conquistou mais vitórias até 2023?',
        answers: [
            {text: 'Alain Prost', correct: false},
            {text: 'Ayrton Senna', correct: false},
            {text: 'Michael Schumacher', correct: false},
            {text: 'Lewis Hamilton', correct: true},
        ]
    },
    {   question: 'Qual time de futebol é conhecido como “The Red Devils”?',
        answers: [
            {text: 'Manchester United', correct: true},
            {text: 'Bayern de Munique', correct: false},
            {text: 'Flamengo', correct: false},
            {text: 'Arsenal', correct: false},
        ]
    },
    {   question: 'Qual país é o maior ganhador de Copas do Mundo até hoje? (2023)',
        answers: [
            {text: 'Itália', correct: false},
            {text: 'Alemanha', correct: false},
            {text: 'França', correct: false},
            {text: 'Brasil', correct: true},
        ]
    },
    {   question: 'No futebol americano, qual é o formato da bola usada durante o jogo?',
        answers: [
            {text: 'Oval', correct: true},
            {text: 'Redonda', correct: false},
            {text: 'Triangular', correct: false},
            {text: 'Quadrada', correct: false},
        ]
    },
    {   question: 'Qual é a cor da faixa mais alta, que pode, muito dificilmente, ser adquirida no judô?',
        answers: [
            {text: 'Azul', correct: false},
            {text: 'Vermelha', correct: false},
            {text: 'Preta', correct: true},
            {text: 'Branca', correct: false},
        ]
    },
    {   question: 'No futebol, um jogador é expulso de uma partida quando recebe quais cartões?',
        answers: [
            {text: 'Somente 2 vermelhos', correct: false},
            {text: '3 amarelos ou 1 vermelho', correct: false},
            {text: 'Somente 1 vermelho', correct: false},
            {text: '1 vermelho ou 2 amarelos', correct: true},
        ]
    },
    {
        question: "Qual é a nação que conquistou o maior número de medalhas de ouro nas Olimpíadas ao longo da história?",
        answers: [
            { text: "Estados Unidos", correct: true },
            { text: "China", correct: false },
            { text: "Rússia", correct: false },
            { text: "Alemanha", correct: false }
        ]
    },
    {
        question: "Qual esporte é conhecido como 'esporte bretão'?",
        answers: [
            { text: "Críquete", correct: false },
            { text: "Rúgbi", correct: false },
            { text: "Golfe", correct: false },
            { text: "Futebol", correct: true }
        ]
    },
    {
        question: "Até o ano de 2023, quem detém o recorde mundial dos 100 metros rasos no atletismo masculino? ",
        answers: [
            { text: "Usain Bolt", correct: true },
            { text: "Carl Lewis", correct: false },
            { text: "Michael Johnson", correct: false },
            { text: "Asafa Powell", correct: false }
        ]
    },
    {
        question: "Quantos jogadores compõem uma equipe de futebol durante uma partida?",
        answers: [
            { text: "9", correct: false },
            { text: "10", correct: false },
            { text: "11", correct: true },
            { text: "12", correct: false }
        ]
    },
    {
        question: "Qual país sediou os Jogos Olímpicos de Verão de 2016?",
        answers: [
            { text: "EUA", correct: false },
            { text: "Rússia", correct: false },
            { text: "Brasil", correct: true },
            { text: "França", correct: false }
        ]
    },
    {
        question: "Em que país nasceu o esporte do judô?",
        answers: [
            { text: "Coreia do Sul", correct: false },
            { text: "China", correct: false },
            { text: "Japão", correct: true },
            { text: "Brasil", correct: false }
        ]
    },
    {
        question: "Qual esporte é associado a Serena Williams?",
        answers: [
            { text: "Tênis", correct: true },
            { text: "Golfe", correct: false },
            { text: "Natação", correct: false },
            { text: "Basquete", correct: false }
        ]
    },
    {
        question: "Qual jogador de futebol é frequentemente chamado de 'Rei'?",
        answers: [
            { text: "Lionel Messi", correct: false },
            { text: "Neymar", correct: false },
            { text: "Pelé", correct: true },
            { text: "Cristiano Ronaldo", correct: false }
        ]
    },
    {
        question: "Qual jogador de futebol é frequentemente chamado de 'Bruxo'?",
        answers: [
            { text: "Lionel Messi", correct: false },
            { text: "Neymar", correct: false },
            { text: "Ronaldinho Gaúcho", correct: true },
            { text: "Harry Potter", correct: false }
        ]
    },
    {
        question: "Quem é considerado o maior jogador de basquete de todos os tempos?",
        answers: [
            { text: "Magic Johnson", correct: false },
            { text: "LeBron James", correct: false },
            { text: "Michael Jordan", correct: true },
            { text: "Kobe Bryant", correct: false }
        ]
    },
    {
        question: "Qual é o esporte principal no evento conhecido como 'Super Bowl'?",
        answers: [
            { text: "Hóquei no Gelo", correct: false },
            { text: "Basebol", correct: false },
            { text: "Futebol Americano", correct: true },
            { text: "Basquete", correct: false }
        ]
    },
    {
        question: "Quem detém o recorde de mais medalhas de ouro olímpicas na história?",
        answers: [
            { text: "Usain Bolt", correct: false },
            { text: "Michael Phelps", correct: true },
            { text: "Simone Biles", correct: false },
            { text: "Nadia Comăneci", correct: false }
        ]
    },
    {
        question: "Qual jogador de tênis detém o recorde de mais títulos de Grand Slam na história do esporte?",
        answers: [
            { text: "Rafael Nadal", correct: false },
            { text: "Roger Federer", correct: true },
            { text: "Novak Djokovic", correct: false },
            { text: "Andre Agassi", correct: false }
        ]
    },
    {
        question: "Em que esporte os jogadores competem para fazer cestas em uma tabela suspensa a uma altura de 3,05 metros?",
        answers: [
            { text: "Hóquei no Gelo", correct: false },
            { text: "Futebol Americano", correct: false },
            { text: "Basquete", correct: true },
            { text: "Vôlei", correct: false }
        ]
    },
    {
        question: "Qual país é conhecido por sua tradição no esporte de críquete e tem uma das ligas mais populares do mundo, a Indian Premier League (IPL)?",
        answers: [
            { text: "Austrália", correct: false },
            { text: "Inglaterra", correct: false },
            { text: "Índia", correct: true },
            { text: "África do Sul", correct: false }
        ]
    },
    {
        question: "Em qual esporte os competidores realizam manobras e acrobacias em uma pista de obstáculos, incluindo rampas e corrimãos?",
        answers: [
            { text: "BMX", correct: true },
            { text: "Skate", correct: false },
            { text: "Snowboard", correct: false },
            { text: "Surfe", correct: false }
        ]
    },
    {
        question: "Qual é o nome da maratona de ciclismo de longa distância que ocorre anualmente na França?",
        answers: [
            { text: "Tour de España", correct: false },
            { text: "Giro d'Italia", correct: false },
            { text: "Tour de France", correct: true },
            { text: "Vuelta a Colombia", correct: false }
        ]
    }
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
    },{   question: 'Qual a capital do Canadá?',
    answers: [
        {text: 'Toronto', correct: false},
        {text: 'Ottawa', correct: true},
        {text: 'Vancouver', correct: false},
        {text: 'Montreal', correct: false},
    ]
    },
    {   question: 'Qual é a maior (não mais alta) cadeia de montanhas do mundo?',
        answers: [
            {text: 'Andes', correct: true},
            {text: 'Himalaias', correct: false},
            {text: 'Montanhas Rochosas', correct: false},
            {text: 'Grande Escarpa', correct: false},
        ]
    },
    {   question: 'Onde é o lugar natural mais profundo do planeta Terra?',
        answers: [
            {text: 'Fossa de Porto Rico', correct: false},
            {text: 'Fossa de Java', correct: false},
            {text: 'Depressão Molloy', correct: false},
            {text: 'Fossa das Marianas', correct: true},
        ]
    },
    {
        question: "Qual é o estreito que separa a Ásia da África?",
        answers: [
            { text: "Estreito de Gibraltar", correct: false },
            { text: "Estreito de Ormuz", correct: false },
            { text: "Estreito de Malaca", correct: false },
            { text: "Estreito de Bab-el-Mandeb", correct: true }
        ]
    },
    {
        question: "Qual é o estreito que separa a África da Europa?",
        answers: [
            { text: "Estreito de Gibraltar", correct: true },
            { text: "Estreito de Ormuz", correct: false },
            { text: "Estreito de Malaca", correct: false },
            { text: "Estreito de Bab-el-Mandeb", correct: false }
        ]
    },
    {
        question: "Quais são os três maiores países do mundo em área territorial?",
        answers: [
            { text: "Rússia, Canadá, Estados Unidos", correct: true },
            { text: "China, Brasil, Austrália", correct: false },
            { text: "Índia, Argentina, Cazaquistão", correct: false },
            { text: "México, França, Nigéria", correct: false }
        ]
    },
    {
        question: "Em que país está localizado o Mar Morto?",
        answers: [
            { text: "Israel", correct: true },
            { text: "Turquia", correct: false },
            { text: "Jordânia", correct: false },
            { text: "Irã", correct: false }
        ]
    },
    {
        question: "Qual é o ponto mais alto da Terra?",
        answers: [
            { text: "Monte Everest", correct: true },
            { text: "Monte McKinley", correct: false },
            { text: "Cordilheira dos Andes", correct: false },
            { text: "Monte Vinson", correct: false }
        ]
    },
    {
        question: "Qual é a capital mais alta do mundo?",
        answers: [
            { text: "Quito", correct: false },
            { text: "La Paz", correct: true },
            { text: "Bogotá", correct: false },
            { text: "Lhasa", correct: false }
        ]
    },
    {
        question: "Qual é a capital do Japão?",
        answers: [
            { text: "Pequim", correct: false },
            { text: "Seul", correct: false },
            { text: "Tóquio", correct: true },
            { text: "Bangcoc", correct: false }
        ]
    },
    {   question: 'Qual é o animal nacional da Austrália?',
        answers: [
            {text: 'Crocodilo', correct: false},
            {text: 'Coala', correct: false},
            {text: 'Canguru vermelho', correct: true},
            {text: 'Quokka', correct: false},
        ]
    }, 
    {
        question: "Em que continente está localizado o Deserto do Saara?",
        answers: [
            { text: "África", correct: true },
            { text: "Ásia", correct: false },
            { text: "América do Sul", correct: false },
            { text: "Oceania", correct: false }
        ]
    },
    {
        question: "Qual é o país mais populoso do mundo?",
        answers: [
            { text: "Índia", correct: false },
            { text: "Estados Unidos", correct: false },
            { text: "China", correct: true },
            { text: "Brasil", correct: false }
        ]
    },
    {
        question: "Qual é o maior oceano do mundo?",
        answers: [
            { text: "Oceano Atlântico", correct: false },
            { text: "Oceano Índico", correct: false },
            { text: "Oceano Ártico", correct: false },
            { text: "Oceano Pacífico", correct: true }
        ]
    },
    {
        question: "Quais são os dois países mais extensos do mundo em área territorial?",
        answers: [
            { text: "Estados Unidos e Rússia", correct: false },
            { text: "China e Canadá", correct: false },
            { text: "Rússia e Canadá", correct: true },
            { text: "Brasil e Austrália", correct: false }
        ]
    },
    {
        question: "Qual é o menor continente do mundo?",
        answers: [
            { text: "América do Sul", correct: false },
            { text: "Europa", correct: false },
            { text: "África", correct: false },
            { text: "Oceania", correct: true }
        ]
    },
    {
        question: "Qual é o estreito que separa a Ásia da África?",
        answers: [
            { text: "Estreito de Gibraltar", correct: false },
            { text: "Estreito de Bering", correct: false },
            { text: "Estreito de Ormuz", correct: false },
            { text: "Canal de Suez", correct: true }
        ]
    },
    {
        question: "Qual é a capital do Quênia?",
        answers: [
            { text: "Dacar", correct: false },
            { text: "Nairobi", correct: true },
            { text: "Lusaca", correct: false },
            { text: "Acra", correct: false }
        ]
    },
    {
        question: "Qual é o maior lago da África?",
        answers: [
            { text: "Lago Vitória", correct: true },
            { text: "Lago Tanganica", correct: false },
            { text: "Lago Niassa", correct: false },
            { text: "Lago Chade", correct: false }
        ]
    },
    {
        question: "Em que continente está localizado o Polo Norte?",
        answers: [
            { text: "Antártica", correct: false },
            { text: "Ásia", correct: false },
            { text: "Europa", correct: false },
            { text: "Ártico", correct: true }
        ]
    },
    {
        question: "Qual é a capital do México?",
        answers: [
            { text: "Bogotá", correct: false },
            { text: "Lima", correct: false },
            { text: "Cidade do México", correct: true },
            { text: "Buenos Aires", correct: false }
        ]
    },
    {
        question: "Qual é a capital do estado do Amazonas?",
        answers: [
            { text: "Manaus", correct: true },
            { text: "Belém", correct: false },
            { text: "Porto Alegre", correct: false },
            { text: "Recife", correct: false }
        ]
    },
    {
        question: "Qual é o maior rio totalmente brasileiro?",
        answers: [
            { text: "Rio Paraná", correct: false },
            { text: "Rio São Francisco", correct: false },
            { text: "Rio Tocantins", correct: false },
            { text: "Rio Araguaia", correct: true }
        ]
    },
    {
        question: "Em que estado está localizado o Pantanal, a maior área alagada do mundo?",
        answers: [
            { text: "Mato Grosso", correct: true },
            { text: "Goiás", correct: false },
            { text: "Pará", correct: false },
            { text: "Amazonas", correct: false }
        ]
    },
    {
        question: "Qual é a capital do estado da Bahia?",
        answers: [
            { text: "Recife", correct: false },
            { text: "Fortaleza", correct: false },
            { text: "Salvador", correct: true },
            { text: "São Luís", correct: false }
        ]
    },
    {
        question: "Qual é a região mais populosa do Brasil?",
        answers: [
            { text: "Nordeste", correct: false },
            { text: "Sudeste", correct: true },
            { text: "Norte", correct: false },
            { text: "Centro-Oeste", correct: false }
        ]
    },
    {
        question: "Em que estado brasileiro está localizado o Parque Nacional dos Lençóis Maranhenses?",
        answers: [
            { text: "Ceará", correct: false },
            { text: "Bahia", correct: false },
            { text: "Maranhão", correct: true },
            { text: "Piauí", correct: false }
        ]
    },
    {
        question: "Qual é a capital do estado do Rio de Janeiro?",
        answers: [
            { text: "Niterói", correct: false },
            { text: "Belo Horizonte", correct: false },
            { text: "Rio de Janeiro", correct: true },
            { text: "Curitiba", correct: false }
        ]
    },
    {
        question: "Qual é o nome da maior floresta tropical do mundo, que abrange parte do território brasileiro?",
        answers: [
            { text: "Mata Atlântica", correct: false },
            { text: "Cerrado", correct: false },
            { text: "Caatinga", correct: false },
            { text: "Amazônia", correct: true }
        ]
    },
    {
        question: "Qual é a capital do estado de Minas Gerais?",
        answers: [
            { text: "Belo Horizonte", correct: true },
            { text: "São Paulo", correct: false },
            { text: "Brasília", correct: false },
            { text: "Rio de Janeiro", correct: false }
        ]
    },
    {
        question: "Qual é a ilha brasileira conhecida como 'Ilha da Magia'?",
        answers: [
            { text: "Ilha do Mel", correct: false },
            { text: "Ilhabela", correct: false },
            { text: "Ilha Grande", correct: false },
            { text: "Florianópolis", correct: true }
        ]
    },
    {
        question: "Em que estado está localizado o Vale do São Francisco, importante região produtora de frutas?",
        answers: [
            { text: "Bahia", correct: false },
            { text: "Pernambuco", correct: true },
            { text: "Ceará", correct: false },
            { text: "Alagoas", correct: false }
        ]
    },
    {
        question: "Qual presidente brasileiro concluiu a transposição do rio São Francisco?",
        answers: [
            { text: "Dilma Rousseff", correct: false },
            { text: "Jair Bolsonaro", correct: true },
            { text: "Fernando Henrique Cardoso", correct: false },
            { text: "Luiz Inácio Lula da Silva", correct: false }
        ]
    },
    {
        question: "Em que estado brasileiro está localizado o Jalapão, conhecido por suas belezas naturais?",
        answers: [
            { text: "Goiás", correct: false },
            { text: "Mato Grosso", correct: false },
            { text: "Tocantins", correct: true },
            { text: "Bahia", correct: false }
        ]
    },
    {
        question: "Qual é a capital do estado do Paraná?",
        answers: [
            { text: "Curitiba", correct: true },
            { text: "Porto Alegre", correct: false },
            { text: "Florianópolis", correct: false },
            { text: "Campo Grande", correct: false }
        ]
    },
    {
        question: "Qual é a capital do estado de Pernambuco?",
        answers: [
            { text: "Recife", correct: true },
            { text: "Salvador", correct: false },
            { text: "Fortaleza", correct: false },
            { text: "João Pessoa", correct: false }
        ]
    },
    {
        question: "Em que região do Brasil está localizado o Parque Nacional de Itatiaia, o primeiro parque nacional do país?",
        answers: [
            { text: "Nordeste", correct: false },
            { text: "Sudeste", correct: true },
            { text: "Norte", correct: false },
            { text: "Centro-Oeste", correct: false }
        ]
    },
    {
        question: "Qual é a capital do estado do Rio Grande do Sul?",
        answers: [
            { text: "Porto Alegre", correct: true },
            { text: "Florianópolis", correct: false },
            { text: "Curitiba", correct: false },
            { text: "São Paulo", correct: false }
        ]
    },
    {
        question: "Qual é o estado brasileiro conhecido como 'Terra do Sol Nascente'?",
        answers: [
            { text: "Bahia", correct: false },
            { text: "Ceará", correct: false },
            { text: "Rio Grande do Norte", correct: true },
            { text: "Maranhão", correct: false }
        ]
    },
    {
        question: "Em que estado está localizado o Parque Nacional da Chapada dos Veadeiros?",
        answers: [
            { text: "Goiás", correct: true },
            { text: "Mato Grosso", correct: false },
            { text: "Bahia", correct: false },
            { text: "Tocantins", correct: false }
        ]
    },
    {
        question: "Qual é o rio mais importante que corta o estado de Minas Gerais?",
        answers: [
            { text: "Rio São Francisco", correct: true },
            { text: "Rio Paraná", correct: false },
            { text: "Rio Doce", correct: false },
            { text: "Rio Grande", correct: false }
        ]
    },
    {
        question: "Qual é o nome da região histórica de Minas Gerais conhecida por suas cidades históricas, como Ouro Preto e Tiradentes?",
        answers: [
            { text: "Vale do Aço", correct: false },
            { text: "Zona da Mata", correct: false },
            { text: "Circuito das Águas", correct: false },
            { text: "Circuito do Ouro", correct: true }
        ]
    },
    {
        question: "Minas Gerais é o principal produtor de qual recurso mineral no Brasil?",
        answers: [
            { text: "Ouro", correct: true },
            { text: "Diamantes", correct: false },
            { text: "Petróleo", correct: false },
            { text: "Ferro", correct: false }
        ]
    },
    {
        question: "Qual é o nome da maior lagoa do estado de Minas Gerais, conhecida por suas águas termais?",
        answers: [
            { text: "Lagoa da Pampulha", correct: false },
            { text: "Lagoa Feia", correct: false },
            { text: "Lagoa Dourada", correct: false },
            { text: "Lagoa Santa", correct: true }
        ]
    },
    {
        question: "Em que cidade de Minas Gerais está localizada a Usina Hidrelétrica de Furnas, uma das maiores do Brasil?",
        answers: [
            { text: "Divinópolis", correct: false },
            { text: "Itajubá", correct: false },
            { text: "Belo Horizonte", correct: false },
            { text: "São José da Barra", correct: true }
        ]
    },
    {
        question: "Em que cidade de Minas Gerais está localizada a Usina Hidrelétrica de Furnas, uma das maiores do Brasil?",
        answers: [
            { text: "Divinópolis", correct: false },
            { text: "Itajubá", correct: false },
            { text: "Belo Horizonte", correct: false },
            { text: "São José da Barra", correct: true }
        ]
    },
    {
        question: "Qual o Estado Brasileiro com maior número de municípios?",
        answers: [
            { text: "São Paulo", correct: false },
            { text: "Minas Gerais", correct: true },
            { text: "Mato Grosso", correct: false },
            { text: "Bahia", correct: false }
        ]
    },

    

]
    


//Q7  HISTÓRIA

const q7=[
    {
        question: "Quem foi o líder do movimento conhecido como 'Inconfidência Mineira', que buscava a independência da província de Minas Gerais do domínio português?",
        answers: [
            { text: "Tiradentes", correct: true },
            { text: "Dom Pedro II", correct: false },
            { text: "Getúlio Vargas", correct: false },
            { text: "José Bonifácio", correct: false }
        ]
    },
    {   question: 'No Brasil, em qual dia é comemorada a Proclamação da República?',
        answers: [
            {text: '15 de Novembro', correct: true},
            {text: '7 de Setembro', correct: false},
            {text: '22 de Setembro', correct: false},
            {text: '10 de Novembro', correct: false},
        ]
    },
    {   question: 'Qual famoso navegador português descobriu o Brasil?',
            answers: [
                {text: 'Vasco da Gama', correct: false},
                {text: 'Pedro Álvares Cabral', correct: true},
                {text: 'Cristóvão Colombo', correct: false},
                {text: 'Fernão de Magalhães', correct: false},
            ]
    },
    {   question: 'Em que ano foram descobertas as Américas',
            answers: [
                {text: '1498', correct: false},
                {text: '1500', correct: false},
                {text: '1492', correct: true},
                {text: '1505', correct: false},
            ]
    },
    {   question: 'Navegador português conhecido por descobrir o caminho marítimo para as Índias:',
            answers: [
                {text: 'Fenrão de Magalhães', correct: false},
                {text: 'Pedro Álvares Cabral', correct: false},
                {text: 'Américo Vespúcio', correct: false},
                {text: 'Vasco da Gama', correct: true},
            ]
    },
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
    {
        question: "Qual foi a capital do Império Romano no período do século I a.C.?",
        answers: [
            { text: "Atenas", correct: false },
            { text: "Constantinopla", correct: false },
            { text: "Roma", correct: true },
            { text: "Cartago", correct: false }
        ]
    },
    {
        question: "Em que ano ocorreu a Revolução Francesa?",
        answers: [
            { text: "1776", correct: false },
            { text: "1789", correct: true },
            { text: "1820", correct: false },
            { text: "1848", correct: false }
        ]
    },
    {
        question: "Quem foi o primeiro presidente dos Estados Unidos?",
        answers: [
            { text: "Benjamin Franklin", correct: false },
            { text: "Thomas Jefferson", correct: false },
            { text: "George Washington", correct: true },
            { text: "John Adams", correct: false }
        ]
    },
    {
        question: "Qual evento marcou o início da Primeira Guerra Mundial?",
        answers: [
            { text: "Queda do Muro de Berlim", correct: false },
            { text: "Ataque a Pearl Harbor", correct: false },
            { text: "Assassinato de Franz Ferdinand", correct: true },
            { text: "Revolução Russa", correct: false }
        ]
    },
    {
        question: "Quem foi a rainha da Inglaterra durante a Era Vitoriana?",
        answers: [
            { text: "Elizabeth I", correct: false },
            { text: "Mary, Queen of Scots", correct: false },
            { text: "Victoria", correct: true },
            { text: "Anne", correct: false }
        ]
    },
    {
        question: "Qual país foi o berço da civilização asteca?",
        answers: [
            { text: "Peru", correct: false },
            { text: "México", correct: true },
            { text: "Colômbia", correct: false },
            { text: "Brasil", correct: false }
        ]
    },
    {
        question: "Qual líder político foi fundamental para a independência da Índia em 1947?",
        answers: [
            { text: "Mao Zedong", correct: false },
            { text: "Jawaharlal Nehru", correct: false },
            { text: "Mahatma Gandhi", correct: true },
            { text: "Ho Chi Minh", correct: false }
        ]
    },
    {
        question: "Quem foi o líder da Revolução Cubana em 1959?",
        answers: [
            { text: "Fulgencio Batista", correct: false },
            { text: "Ernesto 'Che' Guevara", correct: false },
            { text: "Fidel Castro", correct: true },
            { text: "Raúl Castro", correct: false }
        ]
    },
    {
        question: "Qual foi o evento que desencadeou a Guerra Fria?",
        answers: [
            { text: "Tratado de Versalhes", correct: false },
            { text: "Revolução Russa", correct: false },
            { text: "Ataque a Pearl Harbor", correct: false },
            { text: "Conferência de Yalta", correct: true }
        ]
    },
    {
        question: "Qual imperador romano implementou a 'Pax Romana'?",
        answers: [
            { text: "Nero", correct: false },
            { text: "Augusto", correct: true },
            { text: "Trajano", correct: false },
            { text: "César", correct: false }
        ]
    },
    {
        question: "Qual tratado encerrou oficialmente a Primeira Guerra Mundial e foi assinado em 1919?",
        answers: [
            { text: "Tratado de Versalhes", correct: true },
            { text: "Tratado de Yalta", correct: false },
            { text: "Tratado de Tóquio", correct: false },
            { text: "Tratado de Paris", correct: false }
        ]
    },
    {   question: ' A palavra mesopotâmia é de origem grega e significa "terra entre rios". Essa região, localiza-se entre os rios:',
        answers: [
            {text: 'Tigre e Eufrates', correct: true},
            {text: 'Nilo e Niger', correct: false},
            {text: 'Eufrates e Nilo', correct: false},
            {text: 'Tigre e Nilo', correct: false},
        ]
    },
    {   question: 'Com que idade Dom Pedro II tornou-se imperador do Brasil?',
        answers: [
            {text: '10 anos', correct: false},
            {text: '5 anos', correct: true},
            {text: '22 anos', correct: false},
            {text: '27 anos', correct: false},
        ]
    },
    {   question: 'Qual é a forma de governo adotada no Brasil até os dias atuais?',
        answers: [
            {text: 'Parlamentarismo', correct: false},
            {text: 'Monarquia', correct: false},
            {text: 'República', correct: true},
            {text: 'Monarquia Parlamentarista', correct: false},
        ]
    },
    {   question: 'Nome de nossa terra atribuído por algumas tribos indígenas, no período anterior à chegada dos portugueses ao Brasil',
        answers: [
            {text: 'Terra de vera Cruz', correct: false},
            {text: 'Terra do Pau Brasil', correct: false},
            {text: 'Terra de Santa Cruz', correct: false},
            {text: 'Pindorama', correct: true},
        ]
    },
    {   question: 'Qual é a civilização mais antiga do mundo?',
        answers: [
            {text: 'Mesopotâmia', correct: true},
            {text: 'Egípcios', correct: false},
            {text: 'Chineses', correct: false},
            {text: 'Grécia Antiga', correct: false},
        ]
    },
    {   question: 'Quem é o primeiro presidente dos Estados Unidos?',
        answers: [
            {text: 'Thomas Jefferson', correct: false},
            {text: 'George Washington', correct: true},
            {text: 'Theodore Roosevelt', correct: false},
            {text: 'John Adams', correct: false},
        ]
    },
    {   question: 'A civilização asteca se originou de qual país?',
        answers: [
            {text: 'Peru', correct: false},
            {text: 'Brasil', correct: false},
            {text: 'México', correct: true},
            {text: 'Bolívia', correct: false},
        ]
    },
    {   question: 'Onde está localizada a Babilônia',
        answers: [
            {text: 'Grécia', correct: false},
            {text: 'Arábia Saudita', correct: false},
            {text: 'Egito', correct: false},
            {text: 'Iraque', correct: true},
        ]
    },
    {   question: 'Onde é o país natal de Joana d Arc?',
        answers: [
            {text: 'França', correct: true},
            {text: 'Holanda', correct: false},
            {text: 'Itália', correct: false},
            {text: 'Inglaterra', correct: false},
        ]
    },
    {   question: 'Qual é outro nome para a Grande Pirâmide do Egito? ',
        answers: [
            {text: 'Pirâmides Núbias', correct: false},
            {text: 'Gizé', correct: true},
            {text: 'Pirâmide de Kukulkán', correct: false},
            {text: 'Pirâmide do Sol', correct: false},
        ]
    },
    {   question: 'Cuzco, Machu Pichu é um lugar famoso localizado em qual país?',
        answers: [
            {text: 'Venezuela', correct: false},
            {text: 'Chile', correct: false},
            {text: 'Peru', correct: true},
            {text: 'Bolívia', correct: false},
        ]
    },
    {   question: 'Qual o continente mais afetado pela peste negra ou peste bubônica, causada pela bactéria Yersinia pestis?',
        answers: [
            {text: 'Ásia', correct: false},
            {text: 'Índia', correct: false},
            {text: 'África', correct: false},
            {text: 'Europa', correct: true},
        ]
    },
    {   question: 'Em que oceano o Titanic afundou? ',
        answers: [
            {text: 'Atlântico', correct: true},
            {text: 'Pacífico', correct: false},
            {text: 'Índico', correct: false},
            {text: 'Antártico', correct: false},
        ]
    },
    {   question: 'Quando o muro de Berlim foi derrubado?',
        answers: [
            {text: '1945', correct: false},
            {text: '1989', correct: true},
            {text: '1970', correct: false},
            {text: '1990', correct: false},
        ]
    },
    {   question: 'Fabricação de papel, bússola, pólvora e impressão forma invenções de qual país?',
        answers: [
            {text: 'Japão', correct: false},
            {text: 'Alemanhã', correct: false},
            {text: 'China', correct: true},
            {text: 'Estados Unidos', correct: false},
        ]
    },
    {   question: 'É conhecido como o “Pai da história”?',
        answers: [
            {text: 'Homero', correct: false},
            {text: 'Hipócrates', correct: false},
            {text: 'Sócrates', correct: false},
            {text: 'Heródoto', correct: true},
        ]
    },
    {   question: 'Durante a 2º Guerra Mundial, qual destas potências não pertenciam ao "Eixo"?',
        answers: [
            {text: 'Estados Unidos', correct: true},
            {text: 'Japão', correct: false},
            {text: 'Alemanha', correct: false},
            {text: 'Itália', correct: false},
        ]
    },
    {   question: 'Durante a 2º Guerra Mundial, qual destas potências não pertenciam aos "Aliados"?',
        answers: [
            {text: 'Estados Unidos', correct: false},
            {text: 'Itália', correct: true},
            {text: 'União Soviética', correct: false},
            {text: 'Grã-Bretanha', correct: false},
        ]
    },
    {   question: 'Em qual cidade o presidente dos EUA John F. Kennedy foi assassinado?',
        answers: [
            {text: 'Chicago', correct: false},
            {text: 'Nova York', correct: false},
            {text: 'Dallas', correct: true},
            {text: 'Washington', correct: false},
        ]
    },
    {   question: 'Quem teve um caso com Cleópatra e a fez rainha do Egito?',
        answers: [
            {text: 'Alexandre - O Grande', correct: false},
            {text: 'Aristóteles', correct: false},
            {text: 'Napoleão Bonaparte', correct: false},
            {text: 'Júlio César', correct: true},
        ]
    },

        
    

]

//Q8  GEEK

const q8=[
    {
        question: "Qual é o nome do famoso jogo de RPG de mesa que se passa em um mundo de fantasia medieval e é conhecido por seus dados poliédricos?",
        answers: [
            { text: "Pathfinder", correct: false },
            { text: "Dungeons & Dragons", correct: true },
            { text: "Warhammer Fantasy Roleplay", correct: false },
            { text: "Shadowrun", correct: false }
        ]
    },
    {
        question: "Em que jogo de tabuleiro os jogadores compram, vendem e negociam propriedades imobiliárias?",
        answers: [
            { text: "Jogo da Vida", correct: false },
            { text: "War", correct: false },
            { text: "Banco Imobiliário", correct: true },
            { text: "Dixit", correct: false }
        ]
    },
    {
        question: "No universo de 'Star Wars', qual é o nome da nave espacial pilotada por Han Solo?",
        answers: [
            { text: "Millennium Falcon", correct: true },
            { text: "TARDIS", correct: false },
            { text: "Serenity", correct: false },
            { text: "Starship Enterprise", correct: false }
        ]
    },
    {
        question: "No universo de 'Doctor Who', qual é o nome da nave espacial/temporal do Doutor?",
        answers: [
            { text: "Millennium Falcon", correct: false },
            { text: "TARDIS", correct: true },
            { text: "Serenity", correct: false },
            { text: "Starship Enterprise", correct: false }
        ]
    },
    {
        question: "Em que jogo os jogadores podem explorar um vasto universo gerado proceduralmente?",
        answers: [
            { text: "Elite Dangerous", correct: false },
            { text: "No Man's Sky", correct: true },
            { text: "Starbound", correct: false },
            { text: "EVE Online", correct: false }
        ]
    },
    {
        question: "Qual é o nome do sistema operacional desenvolvido pela Valve Corporation para jogos?",
        answers: [
            { text: "SteamOS", correct: true },
            { text: "GamerOS", correct: false },
            { text: "PlayOS", correct: false },
            { text: "GameOS", correct: false }
        ]
    },
    {
        question: "Qual é o nome do assistente virtual da Amazon, ativado por voz, que se tornou um sucesso de vendas?",
        answers: [
            { text: "Cortana", correct: false },
            { text: "Siri", correct: false },
            { text: "Alexa", correct: true },
            { text: "Google Assistant", correct: false }
        ]
    },
    {
        question: "Quem é conhecido como o 'Homem de Ferro' nos quadrinhos da Marvel?",
        answers: [
            { text: "Steve Rogers", correct: false },
            { text: "Bruce Wayne", correct: false },
            { text: "Tony Stark", correct: true },
            { text: "Clark Kent", correct: false }
        ]
    },
    {
        question: "Qual é o nome do programa de computador que venceu os campeões mundiais em Jeopardy! em 2011?",
        answers: [
            { text: "Deep Blue", correct: false },
            { text: "Watson", correct: true },
            { text: "AlphaGo", correct: false },
            { text: "DeepMind", correct: false }
        ]
    },
    {
        question: "Qual é a série de jogos que apresenta o personagem Nathan Drake, um caçador de tesouros?",
        answers: [
            { text: "Halo", correct: false },
            { text: "Uncharted", correct: true },
            { text: "Assassin's Creed", correct: false },
            { text: "The Last of Us", correct: false }
        ]
    },
    {
        question: "Qual é a empresa por trás da série de consoles de videogame PlayStation?",
        answers: [
            { text: "Microsoft", correct: false },
            { text: "Nintendo", correct: false },
            { text: "Sony", correct: true },
            { text: "Sega", correct: false }
        ]
    },
    {
        question: "Em qual jogo o personagem principal, conhecido como 'Link', tenta resgatar a Princesa Zelda?",
        answers: [
            { text: "Final Fantasy VII", correct: false },
            { text: "The Legend of Zelda", correct: true },
            { text: "Super Mario Bros.", correct: false },
            { text: "Pokémon Red/Blue", correct: false }
        ]
    },
    {
        question: "Em que jogo os jogadores podem construir e explorar mundos virtuais usando blocos?",
        answers: [
            { text: "Minecraft", correct: true },
            { text: "Fortnite", correct: false },
            { text: "Roblox", correct: false },
            { text: "Terraria", correct: false }
        ]
    },
    {
        question: "Qual é o nome do personagem principal da série de jogos 'The Witcher', baseada nos livros de Andrzej Sapkowski?",
        answers: [
            { text: "Geralt of Rivia", correct: true },
            { text: "Ezio Auditore", correct: false },
            { text: "Joel", correct: false },
            { text: "Master Chief", correct: false }
        ]
    },
    {
        question: "Qual é o nome da série de jogos que segue a jornada de Kratos, um guerreiro espartano, e seu filho?",
        answers: [
            { text: "Assassin's Creed", correct: false },
            { text: "God of War", correct: true },
            { text: "Dark Souls", correct: false },
            { text: "Devil May Cry", correct: false }
        ]
    },
    {
        question: "Qual é o nome da protagonista feminina em 'Tomb Raider', uma série de jogos de aventura?",
        answers: [
            { text: "Aloy", correct: false },
            { text: "Lara Croft", correct: true },
            { text: "Chell", correct: false },
            { text: "Faith Connors", correct: false }
        ]
    },
    {
        question: "Qual é o nome do encanador italiano da Nintendo, conhecido por salvar a Princesa Peach?",
        answers: [
            { text: "Sonic", correct: false },
            { text: "Link", correct: false },
            { text: "Mario", correct: true },
            { text: "Luigi", correct: false }
        ]
    },
    {
        question: "Qual é o nome do jogo de tabuleiro onde os jogadores competem para construir estradas, vilas e cidades em um mundo fictício?",
        answers: [
            { text: "Risk", correct: false },
            { text: "Catan", correct: true },
            { text: "Monopoly", correct: false },
            { text: "Clue", correct: false }
        ]
    },
    {
        question: "Em que ano foi inventada a primeira câmera fotográfica?",
        answers: [
            { text: "1839", correct: true },
            { text: "1895", correct: false },
            { text: "1768", correct: false },
            { text: "1950", correct: false }
        ]
    },
    {
        question: "Quem é creditado como o inventor da World Wide Web (WWW)?",
        answers: [
            { text: "Tim Berners-Lee", correct: true },
            { text: "Mark Zuckerberg", correct: false },
            { text: "Larry Page", correct: false },
            { text: "Elon Musk", correct: false }
        ]
    },
    {
        question: "Quem inventou o computador pessoal?",
        answers: [
            { text: "Bill Gates", correct: false },
            { text: "Steve Jobs", correct: false },
            { text: "Alan Turing", correct: false },
            { text: "Edgar F. Codd", correct: true }
        ]
    },
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
    {   question: 'Inicialmente chamada de Arpanet, em que ano a internet foi criada?',
    answers: [
        {text: '1980', correct: false},
        {text: '2001', correct: false},
        {text: '1969', correct: true},
        {text: '1995', correct: false},
        ]
    }, 
    {   question: 'Qual a empresa criadora deste QUIZ?',
    answers: [
        {text: 'Gamemania', correct: false},
        {text: 'Entertainment RCP', correct: false},
        {text: 'Games & cia', correct: false},
        {text: 'RCP games', correct: true},
        ]
    },
    {   question: 'Qual o jogo onde normalmente vence o jogador que formar 3 trincas de cartas?',
        answers: [
            {text: 'Truco', correct: false},
            {text: 'Buraco', correct: false},
            {text: 'Cacheta', correct: true},
            {text: 'Uno', correct: false},
        ]
    },
    {
        question: "Em que jogo os jogadores controlam um assassino que pertence à Ordem dos Assassinos?",
        answers: [
            { text: "The Elder Scrolls V: Skyrim", correct: false },
            { text: "Assassin's Creed", correct: true },
            { text: "The Witcher 3: Wild Hunt", correct: false },
            { text: "Metal Gear Solid V: The Phantom Pain", correct: false }
        ]
    },
    {
        question: "Em qual jogo os jogadores assumem o papel de um mercenário conhecido como 'Big Boss'?",
        answers: [
            { text: "Metal Gear Solid V: The Phantom Pain", correct: true },
            { text: "Final Fantasy XV", correct: false },
            { text: "The Witcher 3: Wild Hunt", correct: false },
            { text: "Call of Duty: Modern Warfare", correct: false }
        ]
    },
    {
        question: "Em que jogo os jogadores controlam um grupo de sobreviventes em um mundo pós-apocalíptico infestado de zumbis?",
        answers: [
            { text: "Dead Space", correct: false },
            { text: "Resident Evil 7: Biohazard", correct: false },
            { text: "The Last of Us", correct: true },
            { text: "Left 4 Dead 2", correct: false }
        ]
    },
    {
        question: "Em que jogo os jogadores controlam um herói encapuzado em uma missão para deter o Espantalho de destruir Gotham City?",
        answers: [
            { text: "Spider-Man (PS4)", correct: false },
            { text: "Batman: Arkham Asylum", correct: true },
            { text: "Injustice 2", correct: false },
            { text: "Assassin's Creed Odyssey", correct: false }
        ]
    },
    {
        question: "Qual é o nome do personagem principal do jogo 'Assassin's Creed - Brotherhood'?",
        answers: [
            { text: "Ezio Auditore", correct: true },
            { text: "Altair Ibn-La'Ahad", correct: false },
            { text: "Connor Kenway", correct: false },
            { text: "Desmond Miles", correct: false }
        ]
    },
    {   question: 'Trilogia de jogos, com temática medieval/fantasia, conhecido pela sua dificuldade ',
        answers: [
            {text: 'Call of Duty', correct: false},
            {text: 'Halo', correct: false},
            {text: 'Skyrim', correct: false},
            {text: 'Dark Souls', correct: true},
        ]
    },
    {   question: 'Considerado o primeiro jogo comercialmente bem-sucedido, desenvolvido pela Atari e lançado em 1972?',
        answers: [
            {text: 'Enduro', correct: false},
            {text: 'Pong', correct: true},
            {text: 'Super Mário', correct: false},
            {text: 'Donkey Kong', correct: false},
        ]
    },
    {   question: 'Em 1981 o carpinteiro Mario aparece pela 1º vez em um jogo eletrônico? Qual o nome deste jogo?',
        answers: [ 
            {text: 'Mario Kart', correct: false},
            {text: 'Super Mario 1', correct: false},
            {text: 'Donkey Kong', correct: true},
            {text: 'Mario', correct: false},
        ]
    },
    {   question: 'São consoles de videogame da geração 16bits?',
        answers: [
            {text: 'PS1 e Xbox', correct: false},
            {text: 'Nintendo 64 e PS2', correct: false},
            {text: 'Atari e Game Boy ', correct: false},
            {text: 'Super Nintendo e Mega Drive', correct: true},
        ]
    },

    
]

// TODOS OS TEMAS

const todasq= [...q1, ...q2, ...q3, ...q4, ...q5, ...q6, ...q7, ...q8]


//MODELO

/*

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
            {text: 'b', correct: false},
            {text: 'a', correct: true},
            {text: 'c', correct: false},
            {text: 'd', correct: false},
        ]
},
{   question: 'modelo',
        answers: [
            {text: 'b', correct: false},
            {text: 'c', correct: false},
            {text: 'a', correct: true},
            {text: 'd', correct: false},
        ]
},
{   question: 'modelo',
        answers: [
            {text: 'b', correct: false},
            {text: 'c', correct: false},
            {text: 'd', correct: false},
            {text: 'a', correct: true},
        ]
},
*/








