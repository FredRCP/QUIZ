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
]

//Q2 BIOLOGIA

const q2=[
    {   question: 'sim',
        answers: [
            {text: 'aaa', correct: true},
            {text: 'bbb', correct: false},
            {text: 'ccc', correct: false},
            {text: 'ddd', correct: false},
        ]
    },
]

//Q3 CIÊNCIAS

const q3=[
    {   question: 'modelo',
        answers: [
            {text: 'a', correct: true},
            {text: 'b', correct: false},
            {text: 'c', correct: false},
            {text: 'd', correct: false},
        ]
    },
]

//Q4 CINEMA

const q4=[
    {   question: 'modelo',
        answers: [
            {text: 'a', correct: true},
            {text: 'b', correct: false},
            {text: 'c', correct: false},
            {text: 'd', correct: false},
        ]
    },
]

//Q5 CONHECIMENTOS GERAIS

const q5=[
    {   question: 'modelo',
        answers: [
            {text: 'a', correct: true},
            {text: 'b', correct: false},
            {text: 'c', correct: false},
            {text: 'd', correct: false},
        ]
    },

    {   question: 'Quem disse: "SÓ SEI QUE NADA SEI"?',
        answers: [
            {text: 'Platão', correct: false},
            {text: 'Galileu Galilei', correct: false},
            {text: 'Sócrates', correct: true},
            {text: 'Aristóteles', correct: false}
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
]

//Q6  GEOGRAFIA

const q6=[
    {   question: 'modelo',
        answers: [
            {text: 'a', correct: true},
            {text: 'b', correct: false},
            {text: 'c', correct: false},
            {text: 'd', correct: false},
        ]
    },
]

//Q7  HISTÓRIA

const q7=[
    {   question: 'modelo',
        answers: [
            {text: 'a', correct: true},
            {text: 'b', correct: false},
            {text: 'c', correct: false},
            {text: 'd', correct: false},
        ]
    },
]

//Q8  MATEMÁTICA

const q8=[
    {   question: 'modelo',
        answers: [
            {text: 'a', correct: true},
            {text: 'b', correct: false},
            {text: 'c', correct: false},
            {text: 'd', correct: false},
        ]
    },
]

const todasq= [...q1, ...q2, ...q3, ...q4, ...q5, ...q6, ...q7, ...q8]

//PARTE FUNCIONAL

let pontos;
let acertos;
let erros;

//INICIAR O JOGO

function start(p){
    
    pontos=0;
    acertos=0;
    erros=0;
    perguntasUsadas=[];
    const pontuacao= document.querySelector('.pontos');
    pontuacao.innerHTML=0;
    const botao=document.querySelector('.start');
    const caixa=document.querySelector('.generico');
    botao.style.display='none';
    caixa.classList.add('caixa');
    const caixagenerica=document.querySelector('.generico');
    caixagenerica.style.display='flex';
    
    proximapergunta(p);
}

function sorteio(x){
    return Math.floor(Math.random()*x);
}

let perguntasUsadas = [];

function proximapergunta(p){
    
    const pergunta= document.querySelector('.pergunta');
    const respostas= document.querySelector('.respostas');
    const botaoproxima= document.querySelector('#botaoproxima');
    const botao=document.querySelector('.start');
     
    let n1;
    let totalPerguntas=p.length;
    
        
    if (perguntasUsadas.length === totalPerguntas) { 
                document.querySelector('.pontos').innerHTML= `Você acertou ${acertos} questões e fez ${pontos} pontos! Fim do QUIZ!`;
                botaoproxima.classList.remove('proxima');
                const botao=document.querySelector('.start');
                botao.style.display='flex';
                botao.textContent='REINICIAR';
                const caixagenerica=document.querySelector('#generico');
                caixagenerica.style.display='none';
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
        alert('acertou');
        el.classList.add('acertou');
        pontos+=10;
        acertos+=1;
        pontuacao.innerHTML=pontos;
    } else{
        alert('errou');
        el.classList.add('errou');
        erros+=1;
        pontuacao.innerHTML=pontos; 
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











