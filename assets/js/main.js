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

let iniciou=false;
let pontos;
let acertos;
let erros;
let vidas;
let ajuda;
let pula;
let coracao;
let nome;
let porcento;
let cumprimento;
let vida="❤️❤️❤️❤️❤️";

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
const fimvitoria = new Audio('/assets/sounds/fimvitoria.mp3');
const derrota = new Audio('/assets/sounds/derrota.mp3');
const palmas = new Audio('/assets/sounds/palmas.m4a');
const ativar = new Audio('/assets/sounds/ativar1.mp3');
const pularavez = new Audio('/assets/sounds/pularavez.m4a');
const vouteajudar = new Audio('/assets/sounds/vouteajudar.mp3');
const show = new Audio('/assets/sounds/show.mp3');
const trilha = new Audio('/assets/sounds/trilhaquiz.mp3');
const recuperavida = new Audio('/assets/sounds/recuperavida.mp3');
const vamosaplaudir = new Audio('/assets/sounds/vamosaplaudir.mp3');
const umavergonha = new Audio('/assets/sounds/umavergonha.mp3');
const xaropinho = new Audio('/assets/sounds/xaropinho.mp3');
const hey = new Audio('/assets/sounds/hey.mp3');
hey.loop = true;



ativar.volume = 0.4;
trilha.volume = 0.4;
vouteajudar.volume=1;
show.volume=1;

const todosossons = [acerto, acertou, errou, erro, inicio, fimvitoria, derrota, palmas, ativar, pularavez, vouteajudar, show, recuperavida, vamosaplaudir, umavergonha, xaropinho]; 

//trilha.play();
trilha.loop = true;

//JOGADOR
class Jogador {
    constructor(nome, pontos, acertos, erros, porcento, tema){
        this.nome= nome;
        this.pontos=pontos;
        this.acertos=acertos;
        this.erros=erros;
        this.porcento=porcento;
        this.tema=tema;
    }
}

//INICIAR O JOGO

function start(p){
    document.querySelector('.span').classList.remove('spanfinal');
    nome= prompt('Qual seu nome?') || "Pessoa sem nome 😧";
    nome= nome.toUpperCase();
    vidas=5;
    ajuda=2;
    pula=3;
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
    botaopular.disabled=false;
    botaoajuda.disabled=false;
    botao.style.display='none';
    caixa.classList.add('caixa');
    const caixagenerica=document.querySelector('.generico');
    caixagenerica.style.display='flex';
    document.querySelector('.pontos').innerHTML=nome +"<br>" +"Vidas: "+ "❤️❤️❤️❤️❤️"+ "<br>"+ 'Pontos: ' + pontos + "<br>"+ 'Perguntas corretas: ' +perguntasUsadas.length;
    iniciou=true;
    proximapergunta(p); 
}

function sorteio(x){
    return Math.floor(Math.random()*x);
}

let perguntasUsadas = [];
let inatividade;
function proximapergunta(p){
    if(tempo) {clearTimeout(inatividade)}
    stopAnimation();
    tempo();
    
    if(!iniciou) {show.play(); setTimeout(criartudo, 1000);} else{ criartudo()}
    iniciou=false;
    
    function criartudo(){
        cerebrocerta.style.display='none';
        cerebroerrada.style.display='none';
        const pergunta= document.querySelector('.pergunta');
        const respostas= document.querySelector('.respostas');
        const botaoproxima= document.querySelector('#botaoproxima');
        const botaoajuda= document.querySelector('#botaoajuda');
        const botaopular= document.querySelector('#botaopular');
        const recursos= document.querySelector('#recursos');
        botaopular.classList.add('pular');
        botaoajuda.classList.add('ajuda');
        recursos.classList.add('recursos');
        
    //const botao=document.querySelector('.start');
    let n1;
    let totalPerguntas=p.length;
    
    if(vidas===0){
                porcento=(acertos/perguntasUsadas.length)*100;
                porcento=porcento.toFixed(1);
                // COLOCAR IMAGENS
                if(porcento===100){cumprimento='Parabéns! Você é uma enciclopédia ambulante!'; cerebrovitoria1.style.display='flex'; setTimeout(()=>{cerebrovitoria1.style.display='none'; vamosaplaudir.play();}, 5000)}
                if(porcento>=85&&porcento<100){cumprimento='Parabéns! Você tem muito conhecimento!'; cerebrovitoria1.style.display='flex'; setTimeout(()=>{cerebrovitoria1.style.display='none'; vamosaplaudir.play();}, 5000)}
                if(porcento>=70&&porcento<85){cumprimento='Você foi muito bem! Continue assim!'; cerebrovitoria.style.display='flex'; setTimeout(()=>{cerebrovitoria.style.display='none'; vamosaplaudir.play();}, 5000)}
                if(porcento>=50&&porcento<70){cumprimento='Você obteve um bom resultado!'; cerebrovitoria.style.display='flex';setTimeout(()=>{cerebrovitoria.style.display='none'}, 6000)}
                if(porcento>30&&porcento<50){cumprimento='Resultado razoável! Não desanime, você ainda chega lá!'; cerebroderrota1.style.display='flex';setTimeout(()=>{cerebroderrota1.style.display='none'}, 6000)}
                if(porcento<=30&&porcento>15){cumprimento='Não desista, busque o conhecimento! Você é capaz!'; cerebroderrota.style.display='flex'; setTimeout(()=>{cerebroderrota.style.display='none'; xaropinho.play();}, 5000)}
                if(porcento<=15){cumprimento='Você não foi nada bem, mas não desista, busque o conhecimento! Você é capaz!'; cerebroderrota.style.display='flex'; setTimeout(()=>{cerebroderrota.style.display='none'; umavergonha.play();}, 5000)}

                document.querySelector('.pontos').innerHTML= `FIM DE JOGO!` + "<br>"+ "Pontos: " + pontos + "<br>"+ `Questões corretas: ${acertos}/${perguntasUsadas.length}`+"<br>"+
                `Acertos: ${porcento}% 🎯`+"<br>"+cumprimento;
                alert('FIM DE JOGO! Tente outra vez!');  
                botaoproxima.classList.remove('proxima');
                botaopular.classList.remove('pular');
                botaoajuda.classList.remove('ajuda');
                recursos.classList.remove('recursos');
                const botao=document.querySelector('.start');
                botao.style.display='flex';
                botao.textContent='REINICIAR';
                const caixagenerica=document.querySelector('#generico');
                caixagenerica.style.display='none';
                document.querySelector('.span').classList.add('spanfinal');
                derrota.play();
                return;
    }    
    if (perguntasUsadas.length === totalPerguntas) { 
                porcento=(acertos/perguntasUsadas.length)*100;
                porcento=porcento.toFixed(1);
                if(porcento===100){cumprimento='Parabéns! Você é uma enciclopédia ambulante!'; cerebrovitoria1.style.display='flex'; setTimeout(()=>{cerebrovitoria1.style.display='none'; vamosaplaudir.play();}, 5000)}
                if(porcento>=85&&porcento<100){cumprimento='Parabéns! Você tem muito conhecimento!'; cerebrovitoria1.style.display='flex'; setTimeout(()=>{cerebrovitoria1.style.display='none'; vamosaplaudir.play();}, 5000)}
                if(porcento>=70&&porcento<85){cumprimento='Você foi muito bem! Continue assim!'; cerebrovitoria.style.display='flex'; setTimeout(()=>{cerebrovitoria.style.display='none'; vamosaplaudir.play();}, 5000)}
                if(porcento>=50&&porcento<70){cumprimento='Você obteve um bom resultado!'; cerebrovitoria.style.display='flex';setTimeout(()=>{cerebrovitoria.style.display='none'}, 6000)}
                if(porcento>30&&porcento<50){cumprimento='Resultado razoável! Não desanime, você ainda chega lá!'; cerebroderrota1.style.display='flex';setTimeout(()=>{cerebroderrota1.style.display='none'}, 6000)}
                if(porcento<=30&&porcento>15){cumprimento='Não desista, busque o conhecimento! Você é capaz!'; cerebroderrota.style.display='flex'; setTimeout(()=>{cerebroderrota.style.display='none'; xaropinho.play();}, 5000)}
                if(porcento<=15){cumprimento='Você não foi nada bem, mas não desista, busque o conhecimento! Você é capaz!'; cerebroderrota.style.display='flex'; setTimeout(()=>{cerebroderrota.style.display='none'; umavergonha.play();}, 5000)}
                document.querySelector('.pontos').innerHTML= `Você acertou ${acertos} de ${perguntasUsadas.length} questões`+ "<br>"+ "Pontos: " + pontos +"<br>"+`Acertos: ${porcento}% 🎯`
                +"<br>"+cumprimento + "<br>"+"FIM DO QUIZ!";
                botaoproxima.classList.remove('proxima');
                botaopular.classList.remove('pular');
                botaoajuda.classList.remove('ajuda');
                recursos.classList.remove('recursos');
                const botao=document.querySelector('.start');
                botao.style.display='flex';
                botao.textContent='REINICIAR';
                const caixagenerica=document.querySelector('#generico');
                caixagenerica.style.display='none';
                document.querySelector('.span').classList.add('spanfinal');
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
}

let ajudacerta;
function selecao(e){

    const pontuacao= document.querySelector('.pontos');
    botaoajuda.classList.remove('ajuda');
    botaopular.classList.remove('pular');
    recursos.classList.remove('recursos');

    if(e===ajudacerta){
        //el.classList.add('acertou');
        pontos+=100;
        acertos+=1;
        if(acertos%5===0){if(vidas<5){vidas+=1; alert('você recuperou 1 vida'); reviver()} else{pontos+=250;}};
        if(acertos%10===0){if(pula<3){pula+=1; alert('você recuperou 1 "pular a vez"')} else{pontos+=500}};
        if(vidas===5){vida=' ❤️❤️❤️❤️❤️'}
        if(vidas===4){vida=' 💔❤️❤️❤️❤️'}
        if(vidas===3){vida=' 💔💔❤️❤️❤️'}
        if(vidas===2){vida=' 💔💔💔❤️❤️'}
        if(vidas===1){vida=' 💔💔💔💔❤️'}
        if(vidas===0){vida=' 💔💔💔💔💔'}
        pontuacao.innerHTML=nome+"<br>"+"Vidas: "+ vida+"<br>" + 'Pontos: ' + pontos+"<br>" + "Perguntas corretas: "+ acertos +"/"+perguntasUsadas.length;
    } else{

    const el = e.target;
    if(el.dataset.correct){
        cerebrocerta.style.display='flex';
        setTimeout(() => {
            cerebrocerta.style.display='none';
        }, 2000);
        acerto.play().then(acertou.play()).then(palmas.play());
        el.classList.add('acertou');
        pontos+=100;
        acertos+=1;
        if(acertos%5===0){if(vidas<5){vidas+=1; alert('você recuperou 1 vida'); reviver()} else{pontos+=250;}};
        if(acertos%10===0){if(pula<3){pula+=1; alert('você recuperou 1 "pular a vez"')} else{pontos+=500}};
        if(vidas===5){vida=' ❤️❤️❤️❤️❤️'}
        if(vidas===4){vida=' 💔❤️❤️❤️❤️'}
        if(vidas===3){vida=' 💔💔❤️❤️❤️'}
        if(vidas===2){vida=' 💔💔💔❤️❤️'}
        if(vidas===1){vida=' 💔💔💔💔❤️'}
        if(vidas===0){vida=' 💔💔💔💔💔'}
        pontuacao.innerHTML=nome+"<br>"+"Vidas: "+ vida+"<br>" + 'Pontos: ' + pontos+"<br>" + "Perguntas corretas: "+ acertos +"/"+perguntasUsadas.length;
    } else{
        cerebroerrada.style.display='flex';
        setTimeout(() => {
            cerebroerrada.style.display='none';
        }, 2000);
        erro.play().then(errou.play());
        el.classList.add('errou');
        erros+=1;
        vidas-=1;
        if(vidas===5){vida=' ❤️❤️❤️❤️❤️'}
        if(vidas===4){vida=' 💔❤️❤️❤️❤️'}
        if(vidas===3){vida=' 💔💔❤️❤️❤️'}
        if(vidas===2){vida=' 💔💔💔❤️❤️'}
        if(vidas===1){vida=' 💔💔💔💔❤️'}
        if(vidas===0){vida=' 💔💔💔💔💔'}
        pontuacao.innerHTML= nome+"<br>"+"Vidas: "+ vida+ "<br>"+ 'Pontos: ' + pontos+"<br>" + "Perguntas corretas: "+ acertos +"/"+perguntasUsadas.length; 
    }}

    
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

function pular(z){
    let querpular=confirm('Quer usar a opção pular?');
    if(!querpular){
        return
    }
    
    proximapergunta(z);
        const pontuacao= document.querySelector('.pontos');
        pontuacao.innerHTML=nome+"<br>"+"Vidas: "+ vida+"<br>" + 'Pontos: ' + pontos+"<br>" + "Perguntas corretas: "+ acertos +"/"+perguntasUsadas.length;
        pula-=1;
        if(pula===2){alert("Você só pode pular mais 2x!")}
        if(pula===1){alert("Você só pode pular mais 1x!")}
        if(pula<1){botaopular.disabled=true; alert('Você não pode pular mais nenhuma vez!')}
        show.play().then(pularavez.play())
        
}

function ajudar(){
    let querajuda=confirm('Você quer pedir ajuda?');
    if(!querajuda){
        return
    }
    selecao(ajudacerta);
    ajuda-=1;
    if(ajuda===1){alert("Você só pode pedir ajuda mais 1x!")};
    if(ajuda<1){botaoajuda.disabled=true; alert("Você não pode mais pedir ajuda!")}
    vouteajudar.play();   
}

// TIME

const toque = document.querySelector('.toque');
function tempo() {
        inatividade = setTimeout(() => {
        const toque = document.querySelector('.toque');
        toque.style.display = 'block';
        //musica
        hey.play(); 
    },90000);
}

document.addEventListener('mousemove', stopAnimation);
document.addEventListener('keypress', stopAnimation);
document.addEventListener('touchmove', stopAnimation);
document.addEventListener('touchend', stopAnimation);

function stopAnimation(){
    clearTimeout(inatividade)
    toque.style.display='none';
    hey.pause();
}

// REVIVER

function reviver(){
    recuperavida.play();
    const tela= document.querySelector('body');
    const reviver= document.createElement('img');
    reviver.src = '/assets/img/tesouro.gif';
    reviver.style.display='block';
    reviver.classList.add('coracaorevivendo');
    tela.appendChild(reviver);
    setTimeout(() => {
        reviver.style.display='none';
    }, 4000);
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
const trilhasonora = document.getElementById('nota');

trilhasonora.addEventListener('change', function(){
    const notamusical= document.querySelector('.notamusical');
    if(trilhasonora.checked){
        trilha.play();
        notamusical.src='/assets/img/notamusical.gif';
        notamusical.title='desligar música';
        ativado=false;
        opcao.style.display='none';
    }
    else{
        trilha.pause();
        notamusical.src='/assets/img/notamusicaldesligada.png';
        notamusical.title='ligar música';
        ativado=false;
        opcao.style.display='none';
    }
})

sons.addEventListener('change', function() {
    const caixadesom= document.querySelector('.caixadesom');
    if (sons.checked) {
        ligarTodosOsSons();
        ativar.play();
        caixadesom.src='/assets/img/som.png';
        caixadesom.title='Desativar sons';
        ativado=false;
        opcao.style.display='none';
    } else {
        desligarTodosOsSons();
        caixadesom.src='/assets/img/semsom.png';
        caixadesom.title='Ativar sons';
        ativado=false;
        opcao.style.display='none';
    }
});

function desligarTodosOsSons() {
    todosossons.forEach(a => {
        a.volume=0;  
    });
}

function ligarTodosOsSons() {
    todosossons.forEach(a => {
        a.volume=0.6;
    });
}

async function abrirModal(tipo) {
    const modal = document.getElementById('modalLegal');
    const container = document.getElementById('conteudoLegal');
    
    // Caminho exato dos arquivos que você criou no Passo 1
    const arquivo = tipo === 'termos' ? 'termos.html' : 'privacidade.html';

    try {
        const response = await fetch(arquivo);
        const html = await response.text();
        
        // Usamos um DOMParser para pegar só o que está dentro do <body> do arquivo
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const corpoTexto = doc.body.innerHTML;

        container.innerHTML = corpoTexto;
        modal.style.display = "block";
    } catch (e) {
        console.error("Erro ao carregar documento:", e);
    }
}

function fecharModal() {
    document.getElementById('modalLegal').style.display = "none";
}

// Fechar se clicar fora da caixa branca
window.onclick = function(event) {
    const modal = document.getElementById('modalLegal');
    if (event.target == modal) {
        fecharModal();
    }
}


// BANCO DE DADOS A SEGUIR

//Q1 ARTE E CULTURA


const qarte=[
    {
        question: 'Quantas línguas oficiais existem na Espanha?',
        answers: [
            { text: '1', correct: false },
            { text: '2', correct: false },
            { text: '3', correct: true },
            { text: '4', correct: false }
        ]
    },
    {
        "question": "Qual escritora britânica é famosa por criar a série Harry Potter?",
        "answers": [
            {"text": "Agatha Christie", "correct": false},
            {"text": "J.K. Rowling", "correct": true},
            {"text": "Virginia Woolf", "correct": false},
            {"text": "Jane Austen", "correct": false}
        ]
    },
    {
        "question": "Qual tenor italiano é conhecido como 'Il Maestro' e ficou famoso por suas performances em óperas como 'La Traviata' e 'Rigoletto'?",
        "answers": [
            {"text": "Luciano Pavarotti", "correct": true},
            {"text": "Andrea Bocelli", "correct": false},
            {"text": "Plácido Domingo", "correct": false},
            {"text": "Enrico Caruso", "correct": false}
        ]
    },
    {
        "question": "Qual tenor espanhol foi um dos membros originais dos 'Três Tenores', juntamente com Luciano Pavarotti e José Carreras?",
        "answers": [
            {"text": "José Carreras", "correct": false},
            {"text": "Plácido Domingo", "correct": true},
            {"text": "Andrea Bocelli", "correct": false},
            {"text": "Luciano Pavarotti", "correct": false}
        ]
    },
    {
        "question": "Qual tenor conhecido por sua poderosa voz e técnica vocal excepcional é frequentemente chamado de 'Rei dos Tenores'?",
        "answers": [
            {"text": "Plácido Domingo", "correct": false},
            {"text": "Enrico Caruso", "correct": true},
            {"text": "José Carreras", "correct": false},
            {"text": "Luciano Pavarotti", "correct": false}
        ]
    },
    {
        "question": "Qual tenor italiano ficou famoso por suas interpretações de óperas como 'Tosca', 'La Bohème' e 'Madama Butterfly'?",
        "answers": [
            {"text": "Luciano Pavarotti", "correct": false},
            {"text": "Andrea Bocelli", "correct": false},
            {"text": "Enrico Caruso", "correct": false},
            {"text": "Giacomo Puccini", "correct": true}
        ]
    },
    {
        "question": "Qual tenor espanhol é conhecido por sua voz potente e apaixonada e é amplamente considerado um dos maiores tenores de todos os tempos?",
        "answers": [
            {"text": "José Carreras", "correct": false},
            {"text": "Plácido Domingo", "correct": true},
            {"text": "Luciano Pavarotti", "correct": false},
            {"text": "Andrea Bocelli", "correct": false}
        ]
    },
    {
        "question": "Qual é a obra mais famosa de São Tomás de Aquino?",
        "answers": [
            {"text": "Confissões", "correct": false},
            {"text": "Suma Teológica", "correct": true},
            {"text": "Cidade de Deus", "correct": false},
            {"text": "Ética a Nicômaco", "correct": false}
        ]
    },
    {
        "question": "São Tomás de Aquino é conhecido por combinar a filosofia de qual antigo filósofo grego com a teologia cristã?",
        "answers": [
            {"text": "Platão", "correct": false},
            {"text": "Sócrates", "correct": false},
            {"text": "Aristóteles", "correct": true},
            {"text": "Heráclito", "correct": false}
        ]
    },
    {
        "question": "Qual é uma das obras mais famosas de Friedrich Nietzsche?",
        "answers": [
            {"text": "Além do Bem e do Mal", "correct": true},
            {"text": "Crítica da Razão Pura", "correct": false},
            {"text": "O Ser e o Nada", "correct": false},
            {"text": "A República", "correct": false}
        ]
    },
    {
        "question": "Qual é o conceito de Nietzsche que se refere à ideia de um ciclo infinito de repetição de todos os eventos da vida?",
        "answers": [
            {"text": "Vontade de Potência", "correct": false},
            {"text": "Eterno Retorno", "correct": true},
            {"text": "Apolo e Dionísio", "correct": false},
            {"text": "Perspectivismo", "correct": false}
        ]
    },
    {
        "question": "Qual era a profissão de Nietzsche antes de se dedicar completamente à filosofia?",
        "answers": [
            {"text": "Médico", "correct": false},
            {"text": "Professor de Filologia", "correct": true},
            {"text": "Advogado", "correct": false},
            {"text": "Matemático", "correct": false}
        ]
    },
    {
        "question": "São Tomás de Aquino é frequentemente associado a qual ordem religiosa?",
        "answers": [
            {"text": "Franciscanos", "correct": false},
            {"text": "Dominicanos", "correct": true},
            {"text": "Beneditinos", "correct": false},
            {"text": "Carmelitas", "correct": false}
        ]
    },
    {
        "question": "Qual é o conceito filosófico central desenvolvido por São Tomás de Aquino que busca explicar a coexistência de fé e razão?",
        "answers": [
            {"text": "Teoria da Iluminação", "correct": false},
            {"text": "Ontologia", "correct": false},
            {"text": "Hilemorfismo", "correct": false},
            {"text": "Teologia Natural", "correct": true}
        ]
    },
    {
        "question": "Quem é conhecido como 'O Pai da Ópera'?",
        "answers": [
            {"text": "Giuseppe Verdi", "correct": false},
            {"text": "Wolfgang Amadeus Mozart", "correct": false},
            {"text": "Claudio Monteverdi", "correct": true},
            {"text": "Richard Wagner", "correct": false}
        ]
    },
    {
        "question": "Qual é a marca de relógio suíça conhecida por seu emblema de uma coroa?",
        "answers": [
            {"text": "Omega", "correct": false},
            {"text": "Tag Heuer", "correct": false},
            {"text": "Rolex", "correct": true},
            {"text": "Patek Philippe", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome da flor que é um símbolo comum de luto e tristeza?",
        "answers": [
            {"text": "Orquídea", "correct": false},
            {"text": "Lírio", "correct": true},
            {"text": "Margarida", "correct": false},
            {"text": "Violeta", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome da flor que é um símbolo da primavera e é conhecida por suas cores vibrantes?",
        "answers": [
            {"text": "Tulipa", "correct": true},
            {"text": "Girassol", "correct": false},
            {"text": "Cravo", "correct": false},
            {"text": "Rosa", "correct": false}
        ]
    },
    {
        "question": "Qual foi o papel de Moisés na narrativa bíblica do Êxodo?",
        "answers": [
            {"text": "Ele foi o rei de Israel", "correct": false},
            {"text": "Ele liderou os israelitas na fuga do Egito", "correct": true},
            {"text": "Ele construiu o Templo de Jerusalém", "correct": false},
            {"text": "Ele foi o profeta principal do Antigo Testamento", "correct": false}
        ]
    },
    {
        "question": "Onde, de acordo com a Bíblia, Moisés recebeu os Dez Mandamentos?",
        "answers": [
            {"text": "Monte Sinai", "correct": true},
            {"text": "Monte Carmelo", "correct": false},
            {"text": "Monte Horebe", "correct": false},
            {"text": "Monte das Oliveiras", "correct": false}
        ]
    },
    {
        "question": "Quem era o irmão de Moisés que o acompanhou durante o Êxodo?",
        "answers": [
            {"text": "Aarão", "correct": true},
            {"text": "Josué", "correct": false},
            {"text": "Elias", "correct": false},
            {"text": "Calebe", "correct": false}
        ]
    },
    {
        "question": "Como Moisés separou as águas para permitir a passagem dos israelitas durante o Êxodo?",
        "answers": [
            {"text": "Com seu cajado", "correct": true},
            {"text": "Com suas mãos", "correct": false},
            {"text": "Com uma palavra de poder", "correct": false},
            {"text": "Com uma oração especial", "correct": false}
        ]
    },
    {
        "question": "Por quanto tempo os israelitas vagaram pelo deserto sob a liderança de Moisés?",
        "answers": [
            {"text": "40 anos", "correct": true},
            {"text": "20 anos", "correct": false},
            {"text": "10 anos", "correct": false},
            {"text": "50 anos", "correct": false}
        ]
    },
    {
        "question": "Em qual obra de Platão é narrado o julgamento e a morte de Sócrates?",
        "answers": [
            {"text": "República", "correct": false},
            {"text": "Fédon", "correct": true},
            {"text": "Banquete", "correct": false},
            {"text": "Timeu", "correct": false}
        ]
    },
    {
        "question": "Qual apóstolo é conhecido por ser irmão de Pedro?",
        "answers": [
            {"text": "Tiago", "correct": false},
            {"text": "André", "correct": true},
            {"text": "João", "correct": false},
            {"text": "Filipe", "correct": false}
        ]
    },
    {
        "question": "Qual apóstolo é conhecido por ter escrito cinco livros do Novo Testamento, incluindo um Evangelho e o Apocalipse?",
        "answers": [
            {"text": "João", "correct": true},
            {"text": "Paulo", "correct": false},
            {"text": "Pedro", "correct": false},
            {"text": "Lucas", "correct": false}
        ]
    },
    {
        "question": "Qual apóstolo foi chamado por Jesus enquanto estava sentado debaixo de uma figueira?",
        "answers": [
            {"text": "Natanael (Bartolomeu)", "correct": true},
            {"text": "Mateus", "correct": false},
            {"text": "Tiago", "correct": false},
            {"text": "Simão, o Zelote", "correct": false}
        ]
    },
    {
        "question": "Qual apóstolo era conhecido como 'o Zelote'?",
        "answers": [
            {"text": "Simão", "correct": true},
            {"text": "Tomé", "correct": false},
            {"text": "Tiago, filho de Alfeu", "correct": false},
            {"text": "Filipe", "correct": false}
        ]
    },
    {
        "question": "Qual apóstolo foi escolhido para substituir Judas Iscariotes após sua traição e morte?",
        "answers": [
            {"text": "Matias", "correct": true},
            {"text": "Barnabé", "correct": false},
            {"text": "Paulo", "correct": false},
            {"text": "Silas", "correct": false}
        ]
    },
    {
        "question": "Quem foi o apóstolo que traiu Jesus por 30 moedas de prata?",
        "answers": [
            {"text": "Pedro", "correct": false},
            {"text": "Judas Iscariotes", "correct": true},
            {"text": "Judas Tadeu", "correct": false},
            {"text": "Tiago", "correct": false}
        ]
    },
    {
        "question": "Qual apóstolo negou Jesus três vezes antes do canto do galo?",
        "answers": [
            {"text": "Tiago", "correct": false},
            {"text": "João", "correct": false},
            {"text": "Pedro", "correct": true},
            {"text": "André", "correct": false}
        ]
    },
    {
        "question": "Qual apóstolo era conhecido por ser um cobrador de impostos antes de seguir Jesus?",
        "answers": [
            {"text": "Mateus", "correct": true},
            {"text": "Simão", "correct": false},
            {"text": "Judas Tadeu", "correct": false},
            {"text": "Felipe", "correct": false}
        ]
    },
    {
        "question": "Qual apóstolo é tradicionalmente conhecido por duvidar da ressurreição de Jesus até ver as marcas dos pregos?",
        "answers": [
            {"text": "Tomé", "correct": true},
            {"text": "Bartolomeu", "correct": false},
            {"text": "Tiago", "correct": false},
            {"text": "Judas Iscariotes", "correct": false}
        ]
    },
    {
        "question": "Qual apóstolo é muitas vezes identificado como o 'discípulo amado'?",
        "answers": [
            {"text": "João", "correct": true},
            {"text": "Pedro", "correct": false},
            {"text": "Tiago", "correct": false},
            {"text": "André", "correct": false}
        ]
    },
    {
        "question": "Qual prato francês tradicionalmente feito com ovos é conhecido por ser um tipo de omelete enrolada?",
        "answers": [
            {"text": "Quiche", "correct": false},
            {"text": "Soufflé", "correct": false},
            {"text": "Frittata", "correct": false},
            {"text": "Omelette", "correct": true}
        ]
    },
    {
        "question": "Qual sobremesa italiana feita com gemas de ovos, açúcar e vinho Marsala é frequentemente servida quente?",
        "answers": [
            {"text": "Tiramisu", "correct": false},
            {"text": "Zabaglione", "correct": true},
            {"text": "Panna Cotta", "correct": false},
            {"text": "Cannoli", "correct": false}
        ]
    },
    {
        "question": "Qual prato tradicional mexicano, que inclui ovos cozidos em molho de tomate e pimenta, é normalmente servido no café da manhã?",
        "answers": [
            {"text": "Chilaquiles", "correct": false},
            {"text": "Huevos Rancheros", "correct": true},
            {"text": "Enchiladas", "correct": false},
            {"text": "Tacos", "correct": false}
        ]
    },
    {
        "question": "Qual prato de café da manhã americano é feito com ovos mexidos, presunto, queijo e às vezes vegetais, tudo enrolado em uma tortilla?",
        "answers": [
            {"text": "Egg Benedict", "correct": false},
            {"text": "Breakfast Burrito", "correct": true},
            {"text": "Frittata", "correct": false},
            {"text": "Hash Browns", "correct": false}
        ]
    },
    {
        "question": "Qual receita de sobremesa, popular na França e na Espanha, é feita com ovos, leite, açúcar e frequentemente aromatizada com baunilha, sendo cozida em banho-maria?",
        "answers": [
            {"text": "Crème Brûlée", "correct": false},
            {"text": "Flan", "correct": true},
            {"text": "Mousse", "correct": false},
            {"text": "Clafoutis", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do submarino fictício que aparece no romance '20.000 Léguas Submarinas' de Jules Verne?",
        "answers": [
            {"text": "USS Enterprise", "correct": false},
            {"text": "Red October", "correct": false},
            {"text": "Nautilus", "correct": true},
            {"text": "Seaview", "correct": false}
        ]
    },
    {
        question: 'Qual é o nome da famosa casa de ópera em Sydney, conhecida por sua arquitetura única?',
        answers: [
            { text: 'Opera House', correct: true },
            { text: 'Royal Albert Hall', correct: false },
            { text: 'Palais Garnier', correct: false },
            { text: 'Teatro Colón', correct: false }
        ]
    },
    {
        question: 'Quem é o arquiteto responsável pelo projeto do Museu Guggenheim em Nova York?',
        answers: [
            { text: 'Frank Gehry', correct: true },
            { text: 'Zaha Hadid', correct: false },
            { text: 'Ieoh Ming Pei', correct: false },
            { text: 'Renzo Piano', correct: false }
        ]
    },
    {
        question: 'Qual é o nome da famosa catedral gótica localizada em Paris?',
        answers: [
            { text: 'Catedral de São Basílio', correct: false },
            { text: 'Catedral de Notre-Dame', correct: true },
            { text: 'Catedral de Santa Maria del Fiore', correct: false },
            { text: 'Catedral de Chartres', correct: false }
        ]
    },
    {
        question: 'Qual é o estilo arquitetônico caracterizado pelo uso de arcos, abóbadas e grandes janelas de vitral?',
        answers: [
            { text: 'Barroco', correct: false },
            { text: 'Renascimento', correct: false },
            { text: 'Gótico', correct: true },
            { text: 'Neoclássico', correct: false }
        ]
    },
    {
        question: 'Qual artista pintou o famoso quadro O Grito?',
        answers: [
            { text: 'Vincent van Gogh', correct: false },
            { text: 'Pablo Picasso', correct: false },
            { text: 'Edvard Munch', correct: true },
            { text: 'Leonardo da Vinci', correct: false }
        ]
    },
    {
        question: 'Onde se passa a história do livro Romeu e Julieta, escrito por William Shakespeare?',
        answers: [
            { text: 'Verona, Itália', correct: true },
            { text: 'Paris, França', correct: false },
            { text: 'Atenas, Grécia', correct: false },
            { text: 'Londres, Inglaterra', correct: false }
        ]
    },
    {
        question: 'Qual é a cor das famosas cabines telefônicas de Londres?',
        answers: [
            { text: 'Azul', correct: false },
            { text: 'Verde', correct: false },
            { text: 'Vermelha', correct: true },
            { text: 'Amarela', correct: false }
        ]
    },
    {
        question: 'Nos contos de fadas, qual animal que, quando é beijado, vira um príncipe?',
        answers: [
            { text: 'Sapo', correct: true },
            { text: 'Coelho', correct: false },
            { text: 'Cavalo', correct: false },
            { text: 'Gato', correct: false }
        ]
    },
    {
        question: 'Em que país se originou o sushi?',
        answers: [
            { text: 'China', correct: false },
            { text: 'Japão', correct: true },
            { text: 'Coreia', correct: false },
            { text: 'Tailândia', correct: false }
        ]
    },
    {
        question: 'Qual é a 4ª letra do alfabeto grego?',
        answers: [
            { text: 'Gamma', correct: false },
            { text: 'Beta', correct: false },
            { text: 'Delta', correct: true },
            { text: 'Epsilon', correct: false }
        ]
    },
    {
        question: 'Qual é a moeda oficial da Espanha?',
        answers: [
            { text: 'Euro', correct: true },
            { text: 'Peso', correct: false },
            { text: 'Libra Esterlina', correct: false },
            { text: 'Dólar Americano', correct: false }
        ]
    },
    {
        question: 'Qual é o prato italiano tradicional feito de camadas de massa, molho de carne e queijo?',
        answers: [
            { text: 'Pizza', correct: false },
            { text: 'Lasanha', correct: true },
            { text: 'Risoto', correct: false },
            { text: 'Gelato', correct: false }
        ]
    },
    {
        question: 'Qual é a moeda oficial da Itália?',
        answers: [
            { text: 'Euro', correct: true },
            { text: 'Libra Esterlina', correct: false },
            { text: 'Franco Suíço', correct: false },
            { text: 'Dólar Americano', correct: false }
        ]
    },
    {
        question: 'Quem é o famoso arquiteto espanhol conhecido por suas obras modernistas em Barcelona?',
        answers: [
            { text: 'Frank Gehry', correct: false },
            { text: 'Antoni Gaudí', correct: true },
            { text: 'Le Corbusier', correct: false },
            { text: 'I. M. Pei', correct: false }
        ]
    },
    {
        question: 'Qual é a famosa corrida de touros realizada na Espanha?',
        answers: [
            { text: 'Fiesta de San Fermín', correct: true },
            { text: 'La Tomatina', correct: false },
            { text: 'Semana Santa', correct: false },
            { text: 'Feria de Abril', correct: false }
        ]
    },
    {
        question: 'O guitarrista do Queen, Brian May, também é especialista em que área científica?',
        answers: [
            { text: 'Física Nuclear', correct: false },
            { text: 'Biologia Marinha', correct: false },
            { text: 'Astrofísica', correct: true },
            { text: 'Psicologia', correct: false }
        ]
    },
    {
        question: 'Que personagem Robert Downey Jr. e Benedict Cumberbatch interpretaram?',
        answers: [
            { text: 'Sherlock Holmes', correct: true },
            { text: 'James Bond', correct: false },
            { text: 'John Watson', correct: false },
            { text: 'Dr. Jekyll / Mr. Hyde', correct: false }
        ]
    },
    {
        question: 'Qual é a dança tradicional espanhola frequentemente acompanhada por castanholas?',
        answers: [
            { text: 'Tango', correct: false },
            { text: 'Flamenco', correct: true },
            { text: 'Salsa', correct: false },
            { text: 'Cha-Cha-Cha', correct: false }
        ]
    },
    {
        question: 'Quem é um famoso pintor surrealista espanhol?',
        answers: [
            { text: 'Pablo Picasso', correct: false },
            { text: 'Diego Velázquez', correct: false },
            { text: 'Francisco Goya', correct: false },
            { text: 'Salvador Dalí', correct: true }
        ]
    },
    {
        question: 'Qual é o prato espanhol à base de arroz e açafrão, muitas vezes incluindo frutos do mar?',
        answers: [
            { text: 'Paella', correct: true },
            { text: 'Tapas', correct: false },
            { text: 'Empanada', correct: false },
            { text: 'Churros', correct: false }
        ]
    },
    {
        question: 'Qual é a moeda oficial da Itália?',
        answers: [
            { text: 'Euro', correct: true },
            { text: 'Libra Esterlina', correct: false },
            { text: 'Franco Suíço', correct: false },
            { text: 'Dólar Americano', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do famoso anfiteatro romano localizado no centro de Roma?',
        answers: [
            { text: 'Coliseu', correct: true },
            { text: 'Pantheon', correct: false },
            { text: 'Arena de Verona', correct: false },
            { text: 'Anfiteatro Flaviano', correct: false }
        ]
    },
    {
        question: 'Qual é o prato italiano tradicional feito de camadas de massa, molho de carne e queijo?',
        answers: [
            { text: 'Pizza', correct: false },
            { text: 'Lasanha', correct: true },
            { text: 'Risoto', correct: false },
            { text: 'Gelato', correct: false }
        ]
    },
    {
        question: 'O que é o "fado", na cultura portuguesa?',
        answers: [
            { text: 'Dança tradicional', correct: false },
            { text: 'Comida típica', correct: false },
            { text: 'Estilo musical', correct: true },
            { text: 'Festival de Verão', correct: false }
        ]
    },
    {
        question: 'Quem é o poeta nacional de Portugal?',
        answers: [
            { text: 'Fernando Pessoa', correct: true },
            { text: 'Luis de Camões', correct: false },
            { text: 'Sophia de Mello Breyner', correct: false },
            { text: 'Eça de Queirós', correct: false }
        ]
    },
    {
        question: 'Qual é a festa popular mais conhecida em Portugal?',
        answers: [
            { text: 'Festa do Avante', correct: false },
            { text: 'Festa do São João', correct: false },
            { text: 'Fado Festival', correct: false },
            { text: 'Festa de São Mateus', correct: true }
        ]
    },
    {
        question: 'Qual é o prato de bacalhau mais tradicional em Portugal?',
        answers: [
            { text: 'Bacalhau à Brás', correct: false },
            { text: 'Bacalhau à Gomes de Sá', correct: false },
            { text: 'Bacalhau à Zé do Pipo', correct: false },
            { text: 'Bacalhau à Portuguesa', correct: true }
        ]
    },
    {
        question: 'Qual é o maior festival tradicional chinês, celebrado no ano novo lunar?',
        answers: [
            { text: 'Festival da Primavera', correct: true },
            { text: 'Festival do Dragão', correct: false },
            { text: 'Festival do Meio Outono', correct: false },
            { text: 'Festival Qingming', correct: false }
        ]
    },
    {
        question: 'Qual é o animal símbolo da China?',
        answers: [
            { text: 'Dragão', correct: true },
            { text: 'Panda', correct: false },
            { text: 'Fênix', correct: false },
            { text: 'Leão', correct: false }
        ]
    },
    {
        question: 'Qual é o nome da moeda oficial da China?',
        answers: [
            { text: 'Dólar Chinês', correct: false },
            { text: 'Yen', correct: false },
            { text: 'Renminbi (Yuan)', correct: true },
            { text: 'Euro Chinês', correct: false }
        ]
    },
    {
        question: 'Qual é a principal religião da China?',
        answers: [
            { text: 'Cristianismo', correct: false },
            { text: 'Islamismo', correct: false },
            { text: 'Budismo', correct: true },
            { text: 'Confucionismo', correct: false }
        ]
    },
    {
        question: 'Qual é o sistema de escrita tradicional japonês?',
        answers: [
            { text: 'Hiragana', correct: false },
            { text: 'Katakana', correct: false },
            { text: 'Kanji', correct: true },
            { text: 'Romaji', correct: false }
        ]
    },
    {
        question: 'O que é o Sakura Matsuri no Japão?',
        answers: [
            { text: 'Festival de Música', correct: false },
            { text: 'Festival de Dança', correct: false },
            { text: 'Festival das Cerejeiras', correct: true },
            { text: 'Festival de Fogos de Artifício', correct: false }
        ]
    },
    {
        question: 'O que significa "Origami" em japonês?',
        answers: [
            { text: 'Pintura a Óleo', correct: false },
            { text: 'Dobradura de Papel', correct: true },
            { text: 'Escultura em Pedra', correct: false },
            { text: 'Tecelagem de Seda', correct: false }
        ]
    },
    {
        question: 'Qual é a principal religião do Japão?',
        answers: [
            { text: 'Budismo', correct: true },
            { text: 'Xintoísmo', correct: false },
            { text: 'Cristianismo', correct: false },
            { text: 'Hinduísmo', correct: false }
        ]
    },
    {
        question: 'Quem é considerado o deus dos deuses na mitologia grega?',
        answers: [
            { text: "Zeus", correct: true },
            { text: "Hades", correct: false },
            { text: "Apolo", correct: false },
            { text: "Poseidon", correct: false }
        ]
    },
    {
        question: 'Qual deusa é associada à sabedoria, estratégia de guerra e a civilização na mitologia grega?',
        answers: [
            { text: "Afrodite", correct: false },
            { text: "Atena", correct: true },
            { text: "Deméter", correct: false },
            { text: "Hera", correct: false }
        ]
    },
    {
        question: 'Quem é o deus do submundo na mitologia grega?',
        answers: [
            { text: "Hades", correct: true },
            { text: "Ares", correct: false },
            { text: "Dionísio", correct: false },
            { text: "Hermes", correct: false }
        ]
    },
    {
        question: 'Qual herói grego é famoso por derrotar o Minotauro no labirinto?',
        answers: [
            { text: "Perseu", correct: false },
            { text: "Teseu", correct: true },
            { text: "Aquiles", correct: false },
            { text: "Hércules", correct: false }
        ]
    },
    {
        question: 'Quem é o deus do sol e das artes, conhecido por tocar lira?',
        answers: [
            { text: "Apolo", correct: true },
            { text: "Hermes", correct: false },
            { text: "Dionísio", correct: false },
            { text: "Hades", correct: false }
        ]
    },
    {
        question: 'Qual deus é o irmão de Zeus e governa os mares na mitologia grega?',
        answers: [
            { text: "Apolo", correct: false },
            { text: "Hermes", correct: false },
            { text: "Poseidon", correct: true },
            { text: "Dionísio", correct: false }
        ]
    },
    {
        question: 'Quem é a deusa do amor e da beleza na mitologia grega?',
        answers: [
            { text: "Deméter", correct: false },
            { text: "Afrodite", correct: true },
            { text: "Atena", correct: false },
            { text: "Hera", correct: false }
        ]
    },
    {
        question: 'Qual herói grego é conhecido por sua força excepcional e pelos 12 trabalhos?',
        answers: [
            { text: "Perseu", correct: false },
            { text: "Teseu", correct: false },
            { text: "Aquiles", correct: false },
            { text: "Hércules", correct: true }
        ]
    },
    {
        question: 'Quem é considerado o deus do vinho, das festas e do teatro na mitologia grega?',
        answers: [
            { text: "Apolo", correct: false },
            { text: "Hermes", correct: false },
            { text: "Dionísio", correct: true },
            { text: "Hades", correct: false }
        ]
    },
    {
        question: 'Qual criatura mitológica é metade homem e metade touro?',
        answers: [
            { text: "Quimera", correct: false },
            { text: "Centauro", correct: false },
            { text: "Minotauro", correct: true },
            { text: "Sátiro", correct: false }
        ]
    },
    {
        question: 'Quem é a deusa da colheita e da agricultura na mitologia grega?',
        answers: [
            { text: "Deméter", correct: true },
            { text: "Afrodite", correct: false },
            { text: "Atena", correct: false },
            { text: "Hera", correct: false }
        ]
    },
    {
        question: 'Qual herói grego é conhecido por sua invulnerabilidade, exceto pelo calcanhar?',
        answers: [
            { text: "Perseu", correct: false },
            { text: "Teseu", correct: false },
            { text: "Aquiles", correct: true },
            { text: "Hércules", correct: false }
        ]
    },
    {
        question: 'Quem é a deusa do casamento e da família na mitologia grega?',
        answers: [
            { text: "Deméter", correct: false },
            { text: "Afrodite", correct: false },
            { text: "Atena", correct: false },
            { text: "Hera", correct: true }
        ]
    },
    {
        question: 'Qual criatura mitológica é conhecida por cantar músicas encantadoras?',
        answers: [
            { text: "Quimera", correct: false },
            { text: "Centauro", correct: false },
            { text: "Sereia", correct: true },
            { text: "Sátiro", correct: false }
        ]
    },
    {
        question: 'Quem é o titã responsável por roubar o fogo e dá-lo aos humanos na mitologia grega?',
        answers: [
            { text: "Prometeu", correct: true },
            { text: "Atlas", correct: false },
            { text: "Cronos", correct: false },
            { text: "Epimeteu", correct: false }
        ]
    },
    {
        question: 'Qual é o nome do cavalo alado mitológico nascido da cabeça da Medusa?',
        answers: [
            { text: "Pégaso", correct: true },
            { text: "Quimera", correct: false },
            { text: "Cérbero", correct: false },
            { text: "Hipogrifo", correct: false }
        ]
    },
    {
        question: 'Quem é o deus mensageiro, conhecido por suas asas nos pés e seu capacete alado?',
        answers: [
            { text: "Apolo", correct: false },
            { text: "Hermes", correct: true },
            { text: "Dionísio", correct: false },
            { text: "Hades", correct: false }
        ]
    },
    {
        question: 'Qual é o nome da caixa que Pandora abriu, liberando males no mundo?',
        answers: [
            { text: "Cálice de Prata", correct: false },
            { text: "Caixa de Pandora", correct: true },
            { text: "Baú de Ouro", correct: false },
            { text: "Arca de Ébano", correct: false }
        ]
    },
    {
        question: 'Quem é o deus do amor e do desejo na mitologia grega?',
        answers: [
            { text: "Afrodite", correct: false },
            { text: "Eros", correct: true },
            { text: "Apolo", correct: false },
            { text: "Dionísio", correct: false }
        ]
    },
    {
        question: 'Qual é o nome da ninfa da água doce que se apaixonou por Narciso na mitologia grega?',
        answers: [
            { text: "Calipso", correct: false },
            { text: "Eco", correct: true },
            { text: "Nereida", correct: false },
            { text: "Dafne", correct: false }
        ]
    },
    {
        question: 'Lendário gigante imortal com um só olho no meio da testa?',
        answers: [
            { text: "Minotauro", correct: false },
            { text: "Ciclope", correct: true },
            { text: "Tritão", correct: false },
            { text: "Amazona", correct: false }
        ]
    },
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
        "question": "Em que país nasceu Confúcio?",
        "answers": [
            {"text": "Japão", "correct": false},
            {"text": "China", "correct": true},
            {"text": "Coreia", "correct": false},
            {"text": "Índia", "correct": false}
        ]
    },
    {
        "question": "Qual é a obra mais famosa atribuída a Confúcio?",
        "answers": [
            {"text": "O Livro das Mutações", "correct": false},
            {"text": "Os Analectos", "correct": true},
            {"text": "O Livro dos Ritos", "correct": false},
            {"text": "O Livro da Piedade Filial", "correct": false}
        ]
    },
    {
        "question": "Qual conceito central do pensamento de Confúcio enfatiza a importância das relações familiares e sociais?",
        "answers": [
            {"text": "Mandato do Céu", "correct": false},
            {"text": "Ren", "correct": true},
            {"text": "Tao", "correct": false},
            {"text": "Chi", "correct": false}
        ]
    },
    {
        "question": "Qual é o título do livro atribuído a Laozi (Lao Tsé) que é considerado uma das obras fundamentais do taoísmo?",
        "answers": [
            {"text": "O Livro dos Mortos", "correct": false},
            {"text": "O Livro das Mutações", "correct": false},
            {"text": "Tao Te Ching", "correct": true},
            {"text": "O Tao da Física", "correct": false}
        ]
    },
    {
        "question": "Qual é o conceito central ensinado por Laozi (ou Lao Tsé) no Tao Te Ching?",
        "answers": [
            {"text": "Ren", "correct": false},
            {"text": "Wu Wei", "correct": true},
            {"text": "Chi", "correct": false},
            {"text": "Yin e Yang", "correct": false}
        ]
    },
    {
        "question": "Qual é o significado do termo 'Tao' na filosofia de Lao Tsé?",
        "answers": [
            {"text": "Caminho", "correct": true},
            {"text": "Sabedoria", "correct": false},
            {"text": "Paz", "correct": false},
            {"text": "Força", "correct": false}
        ]
    },
    {
        "question": "Segundo a lenda, como Lao Tsé (ou Laozi) deixou o mundo mortal?",
        "answers": [
            {"text": "Morreu de doença", "correct": false},
            {"text": "Desapareceu montado em um cavalo", "correct": false},
            {"text": "Caminhou para o oeste em direção ao horizonte", "correct": true},
            {"text": "Foi assassinado", "correct": false}
        ]
    },
    {
        "question": "Qual era a principal ocupação de Confúcio antes de se tornar um filósofo?",
        "answers": [
            {"text": "Guerreiro", "correct": false},
            {"text": "Agricultor", "correct": false},
            {"text": "Professor", "correct": true},
            {"text": "Médico", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome de nascimento de Buda?",
        "answers": [
            {"text": "Siddhartha Gautama", "correct": true},
            {"text": "Mahatma Gandhi", "correct": false},
            {"text": "Muhammad Ali", "correct": false},
            {"text": "Dalai Lama", "correct": false}
        ]
    },
    {
        "question": "Onde Buda alcançou a iluminação?",
        "answers": [
            {"text": "Sob uma figueira Bodhi", "correct": true},
            {"text": "No topo de uma montanha", "correct": false},
            {"text": "No fundo de um vale", "correct": false},
            {"text": "Em um templo sagrado", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do primeiro ser que Buda iluminado ensinou após sua iluminação?",
        "answers": [
            {"text": "Brahma", "correct": false},
            {"text": "Yama", "correct": false},
            {"text": "Alara Kalama", "correct": false},
            {"text": "Assaji", "correct": true}
        ]
    },
    {
        "question": "O que é o Nirvana no budismo?",
        "answers": [
            {"text": "O ciclo interminável de renascimento", "correct": false},
            {"text": "O estado de completa libertação e felicidade", "correct": true},
            {"text": "Um tipo de meditação profunda", "correct": false},
            {"text": "Um lugar sagrado de peregrinação", "correct": false}
        ]
    },
    {
        "question": "Quais são as Quatro Nobres Verdades ensinadas por Buda?",
        "answers": [
            {"text": "Dharma, Karma, Samsara, Nirvana", "correct": false},
            {"text": "Sofrimento, Origem do Sofrimento, Cessação do Sofrimento, Caminho para a Cessação do Sofrimento", "correct": true},
            {"text": "Amor, Compaixão, Alegria, Equanimidade", "correct": false},
            {"text": "Iluminação, Compaixão, Sabedoria, Generosidade", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome de uma das obras mais famosas de Santo Agostinho, que é uma autobiografia espiritual?",
        "answers": [
            {"text": "Summa Theologica", "correct": false},
            {"text": "Confissões", "correct": true},
            {"text": "Cidade de Deus", "correct": false},
            {"text": "Sermões", "correct": false}
        ]
    },
    {
        "question": "Qual conceito teológico desenvolvido por Santo Agostinho afirma que Deus é a origem de todo o bem e que o mal é simplesmente a ausência de Deus?",
        "answers": [
            {"text": "Pecado original", "correct": false},
            {"text": "Predestinação", "correct": false},
            {"text": "Providência Divina", "correct": false},
            {"text": "Teoria da Iluminação", "correct": true}
        ]
    },
    {
        "question": "Qual cidade é conhecida como o local de nascimento de Santo Agostinho?",
        "answers": [
            {"text": "Jerusalém", "correct": false},
            {"text": "Cartago", "correct": true},
            {"text": "Roma", "correct": false},
            {"text": "Atenas", "correct": false}
        ]
    },
    {
        "question": "Santo Agostinho é considerado um dos pais da igreja e uma das figuras mais influentes na teologia cristã. Qual é o seu título mais comum na Igreja Católica?",
        "answers": [
            {"text": "Doutor da Igreja", "correct": true},
            {"text": "Santo Patrono", "correct": false},
            {"text": "Apóstolo", "correct": false},
            {"text": "Papa", "correct": false}
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
        question: "'Iracema, a virgem dos lábios de mel, que tinha os cabelos mais negros que a asa da graúna.....', foi escrito por quem?",
        answers: [
            { text: "Jorge Amado", correct: false },
            { text: "José de Alencar", correct: true },
            { text: "Luiz de Camões", correct: false },
            { text: "Machado de Assis", correct: false }
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
        "question": "Quem escreveu 'Cem Anos de Solidão'?",
        "answers": [
            {"text": "Gabriel García Márquez", "correct": true},
            {"text": "Mario Vargas Llosa", "correct": false},
            {"text": "Isabel Allende", "correct": false},
            {"text": "Jorge Luis Borges", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do autor da série 'As Crônicas de Gelo e Fogo'?",
        "answers": [
            {"text": "J.R.R. Tolkien", "correct": false},
            {"text": "George R.R. Martin", "correct": true},
            {"text": "Robert Jordan", "correct": false},
            {"text": "Terry Pratchett", "correct": false}
        ]
    },
    {
        "question": "Em que livro se encontra o personagem Jay Gatsby?",
        "answers": [
            {"text": "O Morro dos Ventos Uivantes", "correct": false},
            {"text": "O Grande Gatsby", "correct": true},
            {"text": "Orgulho e Preconceito", "correct": false},
            {"text": "Mataram a Cotovia", "correct": false}
        ]
    },
    {
        "question": "Qual é o título do primeiro livro da série Harry Potter?",
        "answers": [
            {"text": "Harry Potter e a Câmara Secreta", "correct": false},
            {"text": "Harry Potter e o Prisioneiro de Azkaban", "correct": false},
            {"text": "Harry Potter e a Pedra Filosofal", "correct": true},
            {"text": "Harry Potter e o Cálice de Fogo", "correct": false}
        ]
    },
    {
        "question": "Quem é o autor de '1984' e 'A Revolução dos Bichos'?",
        "answers": [
            {"text": "Aldous Huxley", "correct": false},
            {"text": "George Orwell", "correct": true},
            {"text": "Ray Bradbury", "correct": false},
            {"text": "H.G. Wells", "correct": false}
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
        question: "Quem é a autora de 'O Diário de Anne Frank'?",
        answers: [
            { text: "Virginia Woolf", correct: false },
            { text: "Harper Lee", correct: false },
            { text: "Anne Frank", correct: false },
            { text: "A escrita é creditada a Anne Frank, mas sua morte impediu que completasse o diário.", correct: true }
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
        ]
    },
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
    {
        question: "Qual é considerada a 7º arte clássica?",
        answers: [
            { text: "Cinema", correct: true },
            { text: "Música", correct: false },
            { text: "Dança", correct: false },
            { text: "Pintura", correct: false }
        ]
    },
    {
        question: "Quem é o autor de 'Macunaíma', uma obra fundamental da literatura brasileira que aborda a cultura indígena e a mitologia?",
        answers: [
            { text: "Machado de Assis", correct: false },
            { text: "Clarice Lispector", correct: false },
            { text: "Guimarães Rosa", correct: false },
            { text: "Mário de Andrade", correct: true }
        ]
    },
    {
        question: "Qual é a dança tradicional do Havaí, muitas vezes associada à cultura polinésia, realizada com movimentos graciosos e trajes coloridos?",
        answers: [
            { text: "Hula", correct: true },
            { text: "Samba", correct: false },
            { text: "Flamenco", correct: false },
            { text: "Tango", correct: false }
        ]
    },
    {
        question: "O que é o 'Dia de los Muertos', uma festa tradicional mexicana que celebra os mortos?",
        answers: [
            { text: "Ano Novo", correct: false },
            { text: "Halloween", correct: false },
            { text: "Dia dos Namorados", correct: false },
            { text: "Dia de los Muertos", correct: true }
        ]
    },
    {
        question: "Qual é a dança tradicional japonesa, muitas vezes realizada em festivais e eventos culturais, caracterizada por movimentos precisos e trajes coloridos?",
        answers: [
            { text: "Samba", correct: false },
            { text: "Tango", correct: false },
            { text: "Bon Odori", correct: true },
            { text: "Flamenco", correct: false }
        ]
    },
    {
        question: "O que é o tango, uma forma de música e dança que se originou em que país?",
        answers: [
            { text: "Brasil", correct: false },
            { text: "Argentina", correct: true },
            { text: "Espanha", correct: false },
            { text: "Itália", correct: false }
        ]
    },
    {
        question: "Quem é o escritor colombiano ganhador do Prêmio Nobel de Literatura, conhecido por obras como 'Cem Anos de Solidão'?",
        answers: [
            { text: "Jorge Luis Borges", correct: false },
            { text: "Isabel Allende", correct: false },
            { text: "Gabriel García Márquez", correct: true },
            { text: "Pablo Neruda", correct: false }
        ]
    },
    {
        question: "Qual é a dança tradicional da Irlanda, frequentemente realizada em eventos culturais e festivais, caracterizada por movimentos rápidos dos pés?",
        answers: [
            { text: "Flamenco", correct: false },
            { text: "Salsa", correct: false },
            { text: "Step Dance Irlandesa", correct: true },
            { text: "Tango", correct: false }
        ]
    },
    {
        question: "Qual é a festa tradicional chinesa que celebra o Ano Novo lunar, com desfiles, fogos de artifício e tradições culturais?",
        answers: [
            { text: "Festival de Qingming", correct: false },
            { text: "Chuseok", correct: false },
            { text: "Songkran", correct: false },
            { text: "Festival da Primavera (ou Chun Jie)", correct: true }
        ]
    },
    {
        question: "Qual é o personagem tradicional do carnaval brasileiro conhecido por suas roupas coloridas, maquiagem extravagante e sorriso contagiante?",
        answers: [
            { text: "Palhaço", correct: false },
            { text: "Pierrot", correct: false },
            { text: "Mestre-sala", correct: false },
            { text: "Cabeleira", correct: true }
        ]
    },
    {
        question: "Qual é o personagem mítico e folclórico do carnaval de Pernambuco, que representa a figura do rei do Congo?",
        answers: [
            { text: "Cabeleira", correct: false },
            { text: "Maracatu Rural", correct: true },
            { text: "Boi-Bumbá", correct: false },
            { text: "Pierrot", correct: false }
        ]
    },
    {
        question: "Quem são os personagens principais nas apresentações de frevo no carnaval de Recife, conhecidos por seus passos ágeis e guarda-chuvas coloridos?",
        answers: [
            { text: "Cabeleira e Pierrot", correct: false },
            { text: "Mestre-sala e Porta-bandeira", correct: false },
            { text: "Passistas de Frevo", correct: true },
            { text: "Rei e Rainha do Congo", correct: false }
        ]
    },
    {
        question: "Qual é o personagem do carnaval que geralmente lidera o desfile de uma escola de samba, representando a elegância e a tradição?",
        answers: [
            { text: "Mestre-sala", correct: true },
            { text: "Cabeleira", correct: false },
            { text: "Pierrot", correct: false },
            { text: "Cigana", correct: false }
        ]
    },
    {
        question: "Quem é a figura conhecida por sua fantasia de saias rodadas e blusa com babados, representando uma personagem feminina tradicional do carnaval?",
        answers: [
            { text: "Mulher Mulata", correct: false },
            { text: "Cigana", correct: false },
            { text: "Baiana", correct: true },
            { text: "Rei do Congo", correct: false }
        ]
    },
    {
        question: "Qual é o personagem associado à tradição do Boi-Bumbá, um folguedo típico do carnaval da região Norte do Brasil?",
        answers: [
            { text: "Rei do Congo", correct: false },
            { text: "Cigana", correct: false },
            { text: "Boi-Bumbá", correct: true },
            { text: "Baiana", correct: false }
        ]
    },
    {
        question: "Quem é a personagem famosa por sua dança sensual e trajes extravagantes, frequentemente representada nas escolas de samba?",
        answers: [
            { text: "Mulher Mulata", correct: false },
            { text: "Cigana", correct: false },
            { text: "Baiana", correct: false },
            { text: "Passista", correct: true }
        ]
    },
    {
        question: "Qual é o personagem que representa o romantismo e a melancolia no carnaval, geralmente vestido com roupas brancas e maquiagem delicada?",
        answers: [
            { text: "Mestre-sala", correct: false },
            { text: "Cabeleira", correct: false },
            { text: "Pierrot", correct: true },
            { text: "Baiana", correct: false }
        ]
    },
    {
        question: "Qual é a forma de arte que utiliza a luz como meio principal de expressão, explorando as propriedades visuais da luz?",
        answers: [
            { text: "Escultura", correct: false },
            { text: "Graffiti", correct: false },
            { text: "Fotografia", correct: false },
            { text: "Arte Cinética de Luz", correct: true }
        ]
    },
    {
        question: "Quem é o arquiteto brasileiro conhecido por projetar o Museu de Arte Contemporânea de Niterói, com sua característica forma futurística?",
        answers: [
            { text: "Oscar Niemeyer", correct: true },
            { text: "Lúcio Costa", correct: false },
            { text: "Roberto Burle Marx", correct: false },
            { text: "Paulo Mendes da Rocha", correct: false }
        ]
    },
    {
        question: "Quem é a artista mexicana conhecida por suas pinturas autorretrato, incluindo obras como 'As Duas Fridas' e 'Autorretrato com Colar de Espinhos'?",
        answers: [
            { text: "Georgia O'Keeffe", correct: false },
            { text: "Frida Kahlo", correct: true },
            { text: "Tamara de Lempicka", correct: false },
            { text: "Yayoi Kusama", correct: false }
        ]
    },
    {
        question: "Qual é o nome da técnica de arte japonesa que envolve a criação de impressões em blocos de madeira, popularizada no século XIX?",
        answers: [
            { text: "Sumi-e", correct: false },
            { text: "Origami", correct: false },
            { text: "Ukiyo-e", correct: true },
            { text: "Haiku", correct: false }
        ]
    },
    {
        question: 'Quem é considerado o precursor do modernismo na pintura brasileira?',
        answers: [
            { text: 'Cândido Portinari', correct: false },
            { text: 'Tarsila do Amaral', correct: false },
            { text: 'Di Cavalcanti', correct: true },
            { text: 'Anita Malfatti', correct: false }
        ]
    },
    {
        question: 'Qual é a principal característica do movimento antropofágico na arte brasileira?',
        answers: [
            { text: 'Influência oriental', correct: false },
            { text: 'Incorporação de elementos europeus', correct: false },
            { text: 'Valorização da natureza', correct: false },
            { text: 'Consumo e apropriação da cultura estrangeira', correct: true }
        ]
    },
    {
        question: 'Quem foi o artista brasileiro conhecido por suas esculturas modernistas em bronze e suas obras monumentais?',
        answers: [
            { text: 'Tarsila do Amaral', correct: false },
            { text: 'Oswaldo Goeldi', correct: false },
            { text: 'Vik Muniz', correct: false },
            { text: 'Victor Brecheret', correct: true }
        ]
    },
    {
        question: 'Em que período a Semana de Arte Moderna de 1922 ocorreu?',
        answers: [
            { text: 'Romantismo', correct: false },
            { text: 'Barroco', correct: false },
            { text: 'Modernismo', correct: true },
            { text: 'Renascimento', correct: false }
        ]
    },
    {
        question: 'Quem é considerado um dos principais representantes da arte contemporânea no Brasil e é conhecido por suas instalações e intervenções urbanas?',
        answers: [
            { text: 'Heitor dos Prazeres', correct: false },
            { text: 'Caetano Dias', correct: false },
            { text: 'Vik Muniz', correct: false },
            { text: 'Cildo Meireles', correct: true }
        ]
    },
    {
        question: 'Qual movimento artístico brasileiro foi caracterizado pela ênfase na representação de temas nacionais e regionais, especialmente a natureza e o folclore?',
        answers: [
            { text: 'Modernismo', correct: false },
            { text: 'Realismo', correct: false },
            { text: 'Romantismo', correct: false },
            { text: 'Regionalismo', correct: true }
        ]
    },
    {
        question: 'Quem foi a primeira artista brasileira a expor na Bienal de São Paulo?',
        answers: [
            { text: 'Tomie Ohtake', correct: true },
            { text: 'Lygia Pape', correct: false },
            { text: 'Beatriz Milhazes', correct: false },
            { text: 'Adriana Varejão', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do artista brasileiro conhecido por suas obras abstratas, especialmente na técnica de pintura com espátula?',
        answers: [
            { text: 'Tarsila do Amaral', correct: false },
            { text: 'Alfredo Volpi', correct: false },
            { text: 'Abelardo da Hora', correct: false },
            { text: 'Manabu Mabe', correct: true }
        ]
    },
    {
        question: 'Quem é considerado um dos principais representantes do concretismo no Brasil?',
        answers: [
            { text: 'Lygia Clark', correct: false },
            { text: 'Hélio Oiticica', correct: false },
            { text: 'Amilcar de Castro', correct: true },
            { text: 'Candido Portinari', correct: false }
        ]
    },
    {
        question: 'Qual é o movimento artístico brasileiro que surgiu no final dos anos 1950, destacando-se por suas obras provocativas e irreverentes, muitas vezes abordando questões políticas e sociais?',
        answers: [
            { text: 'Concretismo', correct: false },
            { text: 'Antropofagia', correct: false },
            { text: 'Pop Art Brasileira', correct: true },
            { text: 'Arte Cinética', correct: false }
        ]
    }


]


//Q2 BIOLOGIA


const qbio=[
    {
        question: 'Quem é conhecido como o fundador da anatomia?',
        answers: [
            { text: 'Andreas Vesalius', correct: true },
            { text: 'Hippocrates', correct: false },
            { text: 'Galen', correct: false },
            { text: 'Paracelsus', correct: false }
        ]
    },
    {
        "question": "Qual é o nome da serpente mais venenosa do mundo, encontrada na Austrália e no Sudeste Asiático?",
        "answers": [
            {"text": "Cobra Coral", "correct": false},
            {"text": "Mamba Negra", "correct": false},
            {"text": "Tetraodontidae", "correct": false},
            {"text": "Taipan", "correct": true}
        ]
    },
    {
        "question": "Quais destes animais não são considerados peçonhentos?",
        "answers": [
            {"text": "Cobra Coral", "correct": false},
            {"text": "Escorpião", "correct": false},
            {"text": "Polvo", "correct": true},
            {"text": "Aranha-marrom", "correct": false}
        ]
    },
    {
        "question": "Qual é o principal componente do veneno das abelhas?",
        "answers": [
            {"text": "Neurotoxinas", "correct": false},
            {"text": "Hemotoxinas", "correct": false},
            {"text": "Melitotoxinas", "correct": true},
            {"text": "Cytotoxinas", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome dado ao grupo de águas-vivas cujo veneno pode ser fatal para humanos?",
        "answers": [
            {"text": "Cubozoa", "correct": true},
            {"text": "Scyphozoa", "correct": false},
            {"text": "Hydrozoa", "correct": false},
            {"text": "Anthozoa", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome da aranha conhecida por sua mordida altamente venenosa e encontrada em regiões do Brasil?",
        "answers": [
            {"text": "Viúva Negra", "correct": false},
            {"text": "Aranha-marrom", "correct": true},
            {"text": "Tarântula", "correct": false},
            {"text": "Ariranha", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome dado ao fenômeno da migração vertical diária de muitos organismos marinhos em direção à superfície durante a noite e ao fundo durante o dia?",
        "answers": [
            {"text": "Hibernação", "correct": false},
            {"text": "Migração Horizontal", "correct": false},
            {"text": "Migração Diurna", "correct": false},
            {"text": "Migração Vertical", "correct": true}
        ]
    },
    {
        "question": "Qual é o nome do ecossistema marinho encontrado em águas costeiras rasas, caracterizado por uma grande diversidade biológica?",
        "answers": [
            {"text": "Recife de Coral", "correct": true},
            {"text": "Estuário", "correct": false},
            {"text": "Plâncton", "correct": false},
            {"text": "Abismo Marinho", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome da substância oleosa produzida por baleias e usada em perfumaria e cosméticos?",
        "answers": [
            {"text": "Cera de Abelha", "correct": false},
            {"text": "Âmbar", "correct": false},
            {"text": "Mel", "correct": false},
            {"text": "Âmbar Cinzento", "correct": true}
        ]
    },
    {
        "question": "Qual é a cor típica das gramas saudáveis?",
        "answers": [
            {"text": "Vermelho", "correct": false},
            {"text": "Amarelo", "correct": false},
            {"text": "Verde", "correct": true},
            {"text": "Azul", "correct": false}
        ]
    },
    {
        "question": "Qual é a parte da grama responsável pela absorção de água e nutrientes do solo?",
        "answers": [
            {"text": "Raiz", "correct": true},
            {"text": "Haste", "correct": false},
            {"text": "Folha", "correct": false},
            {"text": "Flor", "correct": false}
        ]
    },
    {
        "question": "Que tipo de clima é ideal para o cultivo de gramas?",
        "answers": [
            {"text": "Árido", "correct": false},
            {"text": "Tropical", "correct": false},
            {"text": "Temperado", "correct": true},
            {"text": "Polar", "correct": false}
        ]
    },
    {
        "question": "Qual é o método mais comum de propagação das gramas em gramados?",
        "answers": [
            {"text": "Sementes", "correct": true},
            {"text": "Estacas", "correct": false},
            {"text": "Bulbos", "correct": false},
            {"text": "Divisão de touceiras", "correct": false}
        ]
    },
    {
        question: 'Qual é a teoria mais aceita sobre a origem da vida na Terra?',
        answers: [
            { text: 'Criacionismo', correct: false },
            { text: 'Teoria da Evolução Espontânea', correct: false },
            { text: 'Teoria da Abiogênese', correct: true },
            { text: 'Teoria do Catastrofismo', correct: false }
        ]
    },
    {
        question: 'Qual cientista realizou o experimento de sopa primordial para testar a origem da vida?',
        answers: [
            { text: 'Charles Darwin', correct: false },
            { text: 'Louis Pasteur', correct: false },
            { text: 'Stanley Miller', correct: true },
            { text: 'Gregor Mendel', correct: false }
        ]
    },
    {
        question: 'O que é panspermia?',
        answers: [
            { text: 'Uma teoria que sugere que a vida se originou de moléculas inorgânicas', correct: false },
            { text: 'Uma teoria que sugere que a vida na Terra veio do espaço', correct: true },
            { text: 'Uma teoria que sugere que a vida se originou de vulcões submarinos', correct: false },
            { text: 'Uma teoria que sugere que a vida foi criada por uma entidade superior', correct: false }
        ]
    },
    {
        question: 'Quais são os blocos de construção fundamentais da vida?',
        answers: [
            { text: 'Vitaminas', correct: false },
            { text: 'Ácidos nucleicos', correct: false },
            { text: 'Aminoácidos', correct: true },
            { text: 'Lipídios', correct: false }
        ]
    },
    {
        question: 'Qual era a principal composição da atmosfera primitiva da Terra?',
        answers: [
            { text: 'Oxigênio e nitrogênio', correct: false },
            { text: 'Metano, amônia, hidrogênio e vapor de água', correct: true },
            { text: 'Dióxido de carbono e ozônio', correct: false },
            { text: 'Hélio e argônio', correct: false }
        ]
    },
    {
        question: 'Qual é a principal função das fibras na dieta?',
        answers: [
            { text: 'Fornecer energia', correct: false },
            { text: 'Auxiliar na digestão e promover a saúde intestinal', correct: true },
            { text: 'Construir e reparar tecidos', correct: false },
            { text: 'Regular os níveis de açúcar no sangue', correct: false }
        ]
    },
    {
        question: 'Qual tipo de gordura é considerado mais saudável para o coração?',
        answers: [
            { text: 'Gordura trans', correct: false },
            { text: 'Gordura saturada', correct: false },
            { text: 'Gordura insaturada', correct: true },
            { text: 'Gordura hidrogenada', correct: false }
        ]
    },
    {
        question: 'Quais são os nutrientes essenciais encontrados nas frutas e vegetais?',
        answers: [
            { text: 'Proteínas e gorduras', correct: false },
            { text: 'Vitaminas e minerais', correct: true },
            { text: 'Carboidratos e lipídios', correct: false },
            { text: 'Ácidos graxos e aminoácidos', correct: false }
        ]
    },
    {
        question: 'Qual destas é uma ótima fonte de proteína completa de origem vegetal?',
        answers: [
            { text: 'Feijão', correct: false },
            { text: 'Quinoa', correct: true },
            { text: 'Arroz', correct: false },
            { text: 'Batata', correct: false }
        ]
    },
    {
        question: 'Qual é a principal função biológica do sexo?',
        answers: [
            { text: 'Proporcionar prazer', correct: false },
            { text: 'Fortalecer laços emocionais', correct: false },
            { text: 'Reprodução e perpetuação da espécie', correct: true },
            { text: 'Melhorar a saúde física', correct: false }
        ]
    },
    {
        question: 'Qual é o método contraceptivo que também protege contra doenças sexualmente transmissíveis (DSTs)?',
        answers: [
            { text: 'Pílula anticoncepcional', correct: false },
            { text: 'Dispositivo intrauterino (DIU)', correct: false },
            { text: 'Preservativo (camisinha)', correct: true },
            { text: 'Diafragma', correct: false }
        ]
    },
    {
        question: 'O que é a libido?',
        answers: [
            { text: 'Um hormônio sexual masculino', correct: false },
            { text: 'O desejo ou impulso sexual', correct: true },
            { text: 'Um tipo de contraceptivo', correct: false },
            { text: 'Uma infecção sexualmente transmissível', correct: false }
        ]
    },
    {
        question: 'Qual é o principal hormônio sexual feminino?',
        answers: [
            { text: 'Testosterona', correct: false },
            { text: 'Progesterona', correct: false },
            { text: 'Estrogênio', correct: true },
            { text: 'Cortisol', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do processo pelo qual o esperma é liberado do corpo masculino?',
        answers: [
            { text: 'Ovulação', correct: false },
            { text: 'Ejaculação', correct: true },
            { text: 'Menstruação', correct: false },
            { text: 'Fertilização', correct: false }
        ]
    },
    {
        question: 'Quantas valvas ("válvulas") tem o coração?',
        answers: [
            { text: '2', correct: false },
            { text: '3', correct: false },
            { text: '4', correct: true },
            { text: '5', correct: false }
        ]
    },
    {
        question: 'Em qual temperatura a água ferve?',
        answers: [
            { text: '100°C', correct: true },
            { text: '0°C', correct: false },
            { text: '50°C', correct: false },
            { text: '200°C', correct: false }
        ]
    },
    {
        question: 'Em geral, quantos dentes tem uma pessoa adulta?',
        answers: [
            { text: '28', correct: false },
            { text: '30', correct: false },
            { text: '32', correct: true },
            { text: '36', correct: false }
        ]
    },
    {
        question: 'Como é o nome da luz emitida por aparelhos eletrônicos que, de acordo com estudiosos, causa o mesmo efeito que a cafeína ao cérebro?',
        answers: [
            { text: 'Luz azul', correct: true },
            { text: 'Luz vermelha', correct: false },
            { text: 'Luz verde', correct: false },
            { text: 'Luz amarela', correct: false }
        ]
    },
    {
        question: 'Quantos corações tem um polvo?',
        answers: [
            { text: '1', correct: false },
            { text: '2', correct: false },
            { text: '3', correct: true },
            { text: '4', correct: false }
        ]
    },
    {
        question: 'Quantos litros de sangue uma pessoa adulta tem, em média?',
        answers: [
            { text: '4-6 litros', correct: true },
            { text: '2-3 litros', correct: false },
            { text: '6-7 litros', correct: false },
            { text: '8-9 litros', correct: false }
        ]
    },
    {
        question: 'Onde está localizado o menor osso do corpo humano?',
        answers: [
            { text: 'Mão', correct: false },
            { text: 'Pé', correct: false },
            { text: 'Ouvido', correct: true },
            { text: 'Nariz', correct: false }
        ]
    },
    {
        question: 'Quantas patas tem uma aranha?',
        answers: [
            { text: '6', correct: false },
            { text: '8', correct: true },
            { text: '10', correct: false },
            { text: '12', correct: false }
        ]
    },
    {
        question: 'Qual é o único mamífero que voa?',
        answers: [
            { text: 'Morcego', correct: true },
            { text: 'Pássaro', correct: false },
            { text: 'Borboleta', correct: false },
            { text: 'Esquilo', correct: false }
        ]
    },
    {
        question: 'Qual é o pássaro mais rápido do mundo?',
        answers: [
            { text: 'Águia', correct: false },
            { text: 'Gavião', correct: false },
            { text: 'Condor', correct: false },
            { text: 'Falcão-peregrino', correct: true }
        ]
    },
    {
        question: 'Qual doença era comum em marinheiros no século 18, devido deficiência de vitamina C?',
        answers: [
            { text: 'Marasmo', correct: false },
            { text: 'Peste Negra', correct: false },
            { text: 'Escorbuto', correct: true },
            { text: 'Anemia', correct: false }
        ]
    },
    {
        question: 'O que é a osteoporose?',
        answers: [
            { text: 'Inflamação das articulações', correct: false },
            { text: 'Doença cardíaca', correct: false },
            { text: 'Perda de densidade óssea', correct: true },
            { text: 'Infecção renal', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do instrumento usado para medir a pressão arterial?',
        answers: [
            { text: 'Termômetro', correct: false },
            { text: 'Esfigmomanômetro', correct: true },
            { text: 'Estetoscópio', correct: false },
            { text: 'Oftalmoscópio', correct: false }
        ]
    },
    {
        question: 'Quem desenvolveu a primeira vacina bem-sucedida contra a varíola?',
        answers: [
            { text: 'Edward Jenner', correct: true },
            { text: 'Louis Pasteur', correct: false },
            { text: 'Robert Koch', correct: false },
            { text: 'Jonas Salk', correct: false }
        ]
    },
    {
        question: 'Qual é o maior inseto do mundo em termos de envergadura?',
        answers: [
            { text: 'Joaninha', correct: false },
            { text: 'Libélula', correct: false },
            { text: 'Borboleta Monarca', correct: false },
            { text: 'Mariposa Atlas', correct: true }
        ]
    },
    {
        question: 'Qual inseto é famoso por produzir teias?',
        answers: [
            { text: 'Abelha', correct: false },
            { text: 'Joaninha', correct: false },
            { text: 'Aranha', correct: true },
            { text: 'Borboleta', correct: false }
        ]
    },
    {
        question: 'O que é a cirurgia refrativa LASIK?',
        answers: [
            { text: 'Cirurgia cardíaca', correct: false },
            { text: 'Cirurgia ocular', correct: true },
            { text: 'Cirurgia ortopédica', correct: false },
            { text: 'Cirurgia plástica', correct: false }
        ]
    },
    {
        question: 'Quem é considerado o "pai da genética"?',
        answers: [
            { text: 'Charles Darwin', correct: false },
            { text: 'Gregor Mendel', correct: true },
            { text: 'Francis Crick', correct: false },
            { text: 'Rosalind Franklin', correct: false }
        ]
    },
    {
        question: 'O que é a cirurgia laparoscópica?',
        answers: [
            { text: 'Uma cirurgia realizada no cérebro', correct: false },
            { text: 'Uma técnica cirúrgica minimamente invasiva usando pequenas incisões e uma câmera', correct: true },
            { text: 'Uma cirurgia plástica estética', correct: false },
            { text: 'Uma cirurgia realizada apenas em animais', correct: false }
        ]
    },
    {
        question: 'O que é uma cirurgia de emergência?',
        answers: [
            { text: 'Uma cirurgia realizada durante a noite', correct: false },
            { text: 'Uma cirurgia não planejada realizada imediatamente devido a uma condição que ameaça a vida', correct: true },
            { text: 'Uma cirurgia realizada apenas em crianças', correct: false },
            { text: 'Uma cirurgia realizada em animais selvagens', correct: false }
        ]
    },
    {
        question: 'O que é uma laparotomia?',
        answers: [
            { text: 'Uma cirurgia realizada nos rins', correct: false },
            { text: 'Uma incisão cirúrgica no abdômen', correct: true },
            { text: 'Uma cirurgia realizada apenas em crianças', correct: false },
            { text: 'Uma técnica cirúrgica minimamente invasiva', correct: false }
        ]
    },
    {
        question: 'Quantas cores de cones sensíveis à luz existem na retina humana?',
        answers: [
            { text: 'Um', correct: false },
            { text: 'Dois', correct: false },
            { text: 'Três', correct: true },
            { text: 'Quatro', correct: false }
        ]
    },
    {
        question: 'Qual parte do olho é responsável por regular a quantidade de luz que entra?',
        answers: [
            { text: 'Córnea', correct: false },
            { text: 'Retina', correct: false },
            { text: 'Pupila', correct: true },
            { text: 'Esclera', correct: false }
        ]
    },
    {
        question: 'Qual é a parte colorida do olho chamada?',
        answers: [
            { text: 'Íris', correct: true },
            { text: 'Pupila', correct: false },
            { text: 'Retina', correct: false },
            { text: 'Cristalino', correct: false }
        ]
    },
    {
        question: 'O que são lágrimas?',
        answers: [
            { text: 'Água pura', correct: false },
            { text: 'Umidade do ar condensada nos olhos', correct: false },
            { text: 'Um fluido que protege e lubrifica os olhos', correct: true },
            { text: 'Sangue filtrado pelos olhos', correct: false }
        ]
    },
    {
        question: 'Qual é a função do nervo óptico?',
        answers: [
            { text: 'Regular a quantidade de luz que entra no olho', correct: false },
            { text: 'Transmitir impulsos visuais do olho para o cérebro', correct: true },
            { text: 'Focar a imagem na retina', correct: false },
            { text: 'Controlar o movimento dos olhos', correct: false }
        ]
    },
    {
        question: 'Quantos músculos controlam o movimento de um olho humano?',
        answers: [
            { text: 'Quatro', correct: false },
            { text: 'Seis', correct: true },
            { text: 'Dois', correct: false },
            { text: 'Oito', correct: false }
        ]
    },
    {
        question: 'O que é estrabismo?',
        answers: [
            { text: 'Visão normal', correct: false },
            { text: 'Dificuldade em ver objetos à distância', correct: false },
            { text: 'Desalinhamento dos olhos', correct: true },
            { text: 'Perda total da visão', correct: false }
        ]
    },
    {
        question: 'Qual é a principal função das sobrancelhas em relação aos olhos?',
        answers: [
            { text: 'Aumentar a visão periférica', correct: false },
            { text: 'Proteger os olhos da luz solar direta', correct: true },
            { text: 'Ajudar na focalização de objetos', correct: false },
            { text: 'Melhorar a acuidade visual', correct: false }
        ]
    },
    {
        question: 'O que é a cegueira noturna?',
        answers: [
            { text: 'Incapacidade de enxergar durante o dia', correct: false },
            { text: 'Perda total da visão', correct: false },
            { text: 'Dificuldade em enxergar em ambientes com pouca luz', correct: true },
            { text: 'Perda de visão periférica', correct: false }
        ]
    },
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
        question: "Quanto tempo em média dura a gestação de uma cadela?",
        answers: [
            { text: "9 meses", correct: false },
            { text: "10 semanas", correct: false },
            { text: "63 dias", correct: true },
            { text: "10 meses", correct: false }
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
        question: 'Quem é conhecido por suas contribuições à teoria da evolução?',
        answers: [
            { text: 'Charles Darwin', correct: true },
            { text: 'Gregor Mendel', correct: false },
            { text: 'Alfred Russel Wallace', correct: false },
            { text: 'Jean-Baptiste Lamarck', correct: false }
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
            { text: "Trocas gasosas", correct: false },
            { text: "Digestão de alimentos", correct: false },
            { text: "Filtragem do sangue para remover resíduos e excesso de água", correct: true },
            { text: "Produção de células de defesa", correct: false }
        ]
    },
    {
        question: "Qual é o nome do processo pelo qual os organismos vivos produzem energia a partir de moléculas orgânicas?",
        answers: [
            { text: "Fotossíntese", correct: false },
            { text: "Respiração Celular", correct: true },
            { text: "Digestão", correct: false },
            { text: "Fermentação", correct: false }
        ]
    },
    {
        question: "Qual é a fase do desenvolvimento de um inseto entre a eclosão do ovo e a forma adulta?",
        answers: [
            { text: "Larva", correct: true },
            { text: "Pupa", correct: false },
            { text: "Ovo", correct: false },
            { text: "Adulto", correct: false }
        ]
    },
    {
        question: "Qual é o papel das abelhas na polinização?",
        answers: [
            { text: "Produção de mel", correct: false },
            { text: "Produção de cera", correct: false },
            { text: "Transporte de pólen entre flores, favorecendo a reprodução das plantas", correct: true },
            { text: "Produção de seda", correct: false }
        ]
    },
    {
        question: "Qual é o inseto responsável pela transmissão da malária?",
        answers: [
            { text: "Mosquito Aedes aegypti", correct: false },
            { text: "Mosquito Anopheles", correct: true },
            { text: "Mosca Tsé-tsé", correct: false },
            { text: "Pulga", correct: false }
        ]
    },
    {
        question: "Qual é o principal alimento das formigas?",
        answers: [
            { text: "Néctar de flores", correct: false },
            { text: "Pólen", correct: false },
            { text: "Folhas e outros insetos", correct: true },
            { text: "Sangue humano", correct: false }
        ]
    },
    {
        question: "Qual é a diferença entre abelhas e vespas?",
        answers: [
            { text: "Abelhas são herbívoras, enquanto vespas são carnívoras", correct: false },
            { text: "Abelhas têm corpo mais fino que vespas", correct: false },
            { text: "Abelhas coletam pólen para alimentação, enquanto vespas caçam outros insetos", correct: true },
            { text: "Abelhas não picam, enquanto vespas são agressivas", correct: false }
        ]
    },
    {
        question: "Qual é a principal função das antenas nos insetos?",
        answers: [
            { text: "Produção de feromônios", correct: false },
            { text: "Auxílio na locomoção", correct: false },
            { text: "Percepção de odores e estímulos táteis", correct: true },
            { text: "Captura de presas", correct: false }
        ]
    },
    {
        question: "O que é a metamorfose completa em insetos?",
        answers: [
            { text: "Desenvolvimento direto do ovo para a forma adulta", correct: false },
            { text: "Desenvolvimento do ovo para larva, pupa e forma adulta", correct: true },
            { text: "Desenvolvimento do ovo para ninfa e forma adulta", correct: false },
            { text: "Desenvolvimento direto do ovo para ninfa", correct: false }
        ]
    },
    {
        question: "Qual é o maior grupo de insetos polinizadores?",
        answers: [
            { text: "Borboletas", correct: false },
            { text: "Abelhas", correct: true },
            { text: "Moscas", correct: false },
            { text: "Vespas", correct: false }
        ]
    },
    {
        question: "Qual é o inseto conhecido por emitir luz?",
        answers: [
            { text: "Borboleta", correct: false },
            { text: "Joaninha", correct: false },
            { text: "Vagalume", correct: true },
            { text: "Formiga", correct: false }
        ]
    },
    {
        question: "Qual é o papel das formigas na natureza?",
        answers: [
            { text: "Polinização de flores", correct: false },
            { text: "Produção de mel", correct: false },
            { text: "Reciclagem de resíduos orgânicos e controle de pragas", correct: true },
            { text: "Transporte de pólen entre flores", correct: false }
        ]
    },
    {
        question: "Qual é a estrutura responsável pela produção de alimentos nas plantas?",
        answers: [
            { text: "Caule", correct: false },
            { text: "Folha", correct: true },
            { text: "Raiz", correct: false },
            { text: "Flor", correct: false }
        ]
    },
    {
        question: "O que é a fotossíntese?",
        answers: [
            { text: "Processo de absorção de água pelas plantas", correct: false },
            { text: "Produção de oxigênio pelas plantas", correct: false },
            { text: "Processo de conversão de luz solar em energia química pelos cloroplastos", correct: true },
            { text: "Reprodução assexuada das plantas", correct: false }
        ]
    },
    {
        question: "Qual é a função principal das raízes das plantas?",
        answers: [
            { text: "Produção de flores", correct: false },
            { text: "Fixação no solo e absorção de água e nutrientes", correct: true },
            { text: "Realização da fotossíntese", correct: false },
            { text: "Armazenamento de nutrientes", correct: false }
        ]
    },
    {
        question: "O que são as sementes?",
        answers: [
            { text: "Órgãos responsáveis pela produção de esporos", correct: false },
            { text: "Órgãos reprodutores das plantas", correct: false },
            { text: "Estruturas formadas após a fecundação, contendo o embrião e reservas nutritivas", correct: true },
            { text: "Parte aérea das plantas", correct: false }
        ]
    },
    {
        question: "Qual é a função das flores nas plantas com flores?",
        answers: [
            { text: "Produção de oxigênio", correct: false },
            { text: "Realização da fotossíntese", correct: false },
            { text: "Produção de sementes através da reprodução sexuada", correct: true },
            { text: "Fixação no solo", correct: false }
        ]
    },
    {
        question: "O que é a polinização?",
        answers: [
            { text: "Produção de pólen pelas plantas", correct: false },
            { text: "Transferência de pólen de uma flor para o órgão reprodutor feminino de outra", correct: true },
            { text: "Produção de sementes sem a necessidade de polinizadores", correct: false },
            { text: "Emissão de fragrâncias pelas flores", correct: false }
        ]
    },
    {
        question: "Qual é a função do caule das plantas?",
        answers: [
            { text: "Absorção de água e nutrientes", correct: false },
            { text: "Produção de flores", correct: false },
            { text: "Fixação no solo", correct: false },
            { text: "Sustentação e condução de água, nutrientes e açúcares", correct: true }
        ]
    },
    {
        question: "O que é a germinação?",
        answers: [
            { text: "Processo de absorção de água pelas sementes", correct: false },
            { text: "Emissão de pólen pelas flores", correct: false },
            { text: "Processo pelo qual uma semente se desenvolve e emerge como uma plântula", correct: true },
            { text: "Produção de flores", correct: false }
        ]
    },
    {
        question: "O que são as gimnospermas?",
        answers: [
            { text: "Plantas que produzem sementes nuas, sem fruto", correct: true },
            { text: "Plantas que não possuem flores", correct: false },
            { text: "Plantas que se reproduzem exclusivamente por esporos", correct: false },
            { text: "Plantas que não possuem raízes", correct: false }
        ]
    },
    {
        question: "O que é a clorofila?",
        answers: [
            { text: "Pigmento responsável pela coloração das flores", correct: false },
            { text: "Substância que confere cor às folhas", correct: false },
            { text: "Pigmento verde responsável pela fotossíntese", correct: true },
            { text: "Pigmento que protege as plantas contra herbívoros", correct: false }
        ]
    },
    {
        question: "O que é uma cadeia alimentar?",
        answers: [
            { text: "Uma lista de animais ameaçados de extinção", correct: false },
            { text: "Um conjunto de plantas em uma área específica", correct: false },
            { text: "Uma sequência de seres vivos em que cada um serve de alimento para o próximo", correct: true },
            { text: "Uma relação de predador e presa", correct: false }
        ]
    },
    {
        question: "Qual é o papel dos decompositores em um ecossistema?",
        answers: [
            { text: "Produzir alimento por meio da fotossíntese", correct: false },
            { text: "Prevenir a extinção de espécies", correct: false },
            { text: "Reciclar nutrientes decompondo matéria orgânica morta", correct: true },
            { text: "Atuar como predadores de outros organismos", correct: false }
        ]
    },
    {
        question: "O que é uma teia alimentar?",
        answers: [
            { text: "Uma estrutura que protege os animais em um ecossistema", correct: false },
            { text: "Uma relação de competição entre diferentes espécies", correct: false },
            { text: "Uma representação mais complexa das relações alimentares em um ecossistema", correct: true },
            { text: "Uma lista de animais ameaçados de extinção", correct: false }
        ]
    },
    {
        question: "O que é o efeito estufa?",
        answers: [
            { text: "Aumento da biodiversidade em uma área específica", correct: false },
            { text: "Aquecimento global causado pelo aumento de gases na atmosfera", correct: true },
            { text: "Mecanismo de proteção das plantas contra herbívoros", correct: false },
            { text: "Diminuição da temperatura média do planeta", correct: false }
        ]
    },
    {
        question: "Qual é a importância das áreas de proteção ambiental para a conservação da biodiversidade?",
        answers: [
            { text: "Promoção do desmatamento e expansão agrícola", correct: false },
            { text: "Preservação de espécies exóticas invasoras", correct: false },
            { text: "Manutenção de habitats naturais e proteção de espécies ameaçadas", correct: true },
            { text: "Aumento da urbanização em áreas naturais", correct: false }
        ]
    },
    {
        question: 'Qual é o órgão responsável pela produção da insulina no corpo humano?',
        answers: [
            { text: "Fígado", correct: false },
            { text: "Pâncreas", correct: true },
            { text: "Rim", correct: false },
            { text: "Estômago", correct: false }
        ]
    },
    {
        question: 'O que é a pressão arterial sistólica?',
        answers: [
            { text: "Pressão máxima durante a contração do coração", correct: true },
            { text: "Pressão mínima durante a contração do coração", correct: false },
            { text: "Pressão máxima durante o relaxamento do coração", correct: false },
            { text: "Pressão mínima durante o relaxamento do coração", correct: false }
        ]
    },
    {
        question: 'O que é a hemoglobina?',
        answers: [
            { text: "Hormônio", correct: false },
            { text: "Enzima", correct: false },
            { text: "Proteína do sangue que transporta oxigênio", correct: true },
            { text: "Neurotransmissor", correct: false }
        ]
    },
    {
        question: 'O que é a endorfina?',
        answers: [
            { text: "Hormônio do crescimento", correct: false },
            { text: "Neurotransmissor associado ao prazer e à redução da dor", correct: true },
            { text: "Insulina", correct: false },
            { text: "Adrenalina", correct: false }
        ]
    },
    {
        question: 'O que é a cirrose hepática?',
        answers: [
            { text: "Inflamação do estômago", correct: false },
            { text: "Inflamação do pâncreas", correct: false },
            { text: "Crescimento anormal de células na pele", correct: false },
            { text: "Cicatrização e fibrose do fígado", correct: true }
        ]
    },
    {
        question: 'Como também é conhecido o colesterol LDL?',
        answers: [
            { text: "Colesterol bom", correct: false },
            { text: "Colesterol ruim", correct: true },
            { text: "Colesterol total", correct: false },
            { text: "Triglicerídeos", correct: false }
        ]
    },
    {
        question: 'O que é a anemia?',
        answers: [
            { text: "Elevação da pressão arterial", correct: false },
            { text: "Diminuição dos glóbulos vermelhos ou da hemoglobina no sangue", correct: true },
            { text: "Inflamação nas articulações", correct: false },
            { text: "Diminuição do açúcar no sangue", correct: false }
        ]
    },
    {
        question: 'O que é a miopia?',
        answers: [
            { text: "Inflamação nos olhos", correct: false },
            { text: "Dificuldade para enxergar objetos próximos", correct: false },
            { text: "Dificuldade para enxergar objetos distantes", correct: true },
            { text: "Alteração no paladar", correct: false }
        ]
    },
    {
        question: 'Qual é a função do sistema linfático?',
        answers: [
            { text: "Transporte de oxigênio", correct: false },
            { text: "Digestão de alimentos", correct: false },
            { text: "Defesa do corpo contra doenças e infecções", correct: true },
            { text: "Controle da temperatura corporal", correct: false }
        ]
    },
    {
        question: 'O que é o Alzheimer?',
        answers: [
            { text: "Inflamação nas articulações", correct: false },
            { text: "Doença degenerativa que afeta o cérebro, causando perda de memória e cognição", correct: true },
            { text: "Problema no sistema cardiovascular", correct: false },
            { text: "Infecção respiratória", correct: false }
        ]
    },
    {
        question: 'O que é a insônia?',
        answers: [
            { text: "Inflamação no sistema nervoso", correct: false },
            { text: "Dificuldade em respirar", correct: false },
            { text: "Dificuldade em dormir ou permanecer dormindo", correct: true },
            { text: "Aumento da pressão arterial durante o sono", correct: false }
        ]
    },
    {
        question: 'O que é a glicose?',
        answers: [
            { text: "Vitamina essencial para a visão", correct: false },
            { text: "Tipo de gordura encontrada em alimentos de origem animal", correct: false },
            { text: "Açúcar no sangue e principal fonte de energia para o corpo", correct: true },
            { text: "Proteína encontrada em carnes vermelhas", correct: false }
        ]
    },
    {
        question: 'O que é a quimioterapia?',
        answers: [
            { text: "Procedimento cirúrgico para remoção de tumores", correct: false },
            { text: "Tratamento que utiliza substâncias químicas para combater o câncer", correct: true },
            { text: "Terapia de reposição hormonal", correct: false },
            { text: "Procedimento para corrigir problemas de visão", correct: false }
        ]
    },
    {
        question: 'O que é a hepatite?',
        answers: [
            { text: "Inflamação nos pulmões", correct: false },
            { text: "Inflamação no fígado", correct: true },
            { text: "Inflamação nos rins", correct: false },
            { text: "Inflamação no estômago", correct: false }
        ]
    },
    {
        question: 'O que é a epilepsia?',
        answers: [
            { text: "Inflamação nos olhos", correct: false },
            { text: "Doença neurológica que causa convulsões", correct: true },
            { text: "Problema cardíaco", correct: false },
            { text: "Inflamação nas articulações", correct: false }
        ]
    },
    {
        question: 'Qual é a principal função dos glóbulos brancos no sistema imunológico?',
        answers: [
            { text: "Produção de insulina", correct: false },
            { text: "Transporte de oxigênio", correct: false },
            { text: "Defesa do corpo contra bactérias, vírus e outras ameaças", correct: true },
            { text: "Filtragem do sangue", correct: false }
        ]
    },
    {
        question: 'O que é a tuberculose?',
        answers: [
            { text: "Doença respiratória caracterizada pela obstrução das vias aéreas", correct: false },
            { text: "Doença infecciosa que afeta principalmente os pulmões", correct: true },
            { text: "Problema cardíaco", correct: false },
            { text: "Doença autoimune que afeta as articulações", correct: false }
        ]
    },
    {
        question: 'O que é o sistema nervoso central?',
        answers: [
            { text: "Conjunto de órgãos responsáveis pela digestão", correct: false },
            { text: "Órgão responsável pela produção de insulina", correct: false },
            { text: "Sistema formado pelo cérebro e pela medula espinhal", correct: true },
            { text: "Conjunto de órgãos responsáveis pela visão", correct: false }
        ]
    },
    {
        question: 'O que é o vírus HIV?',
        answers: [
            { text: "Vírus que causa resfriado comum", correct: false },
            { text: "Vírus que causa a gripe", correct: false },
            { text: "Vírus da imunodeficiência humana, causador da AIDS", correct: true },
            { text: "Vírus que causa a hepatite", correct: false }
        ]
    },
    {
        question: 'O que é a apendicite?',
        answers: [
            { text: "Inflamação nas articulações", correct: false },
            { text: "Inflamação no apêndice", correct: true },
            { text: "Inflamação no estômago", correct: false },
            { text: "Problema cardíaco", correct: false }
        ]
    },
    {
        question: 'Qual é a função dos cílios nas células do corpo humano?',
        answers: [
            { text: "Movimentar o corpo", correct: false },
            { text: "Realizar a fotossíntese", correct: false },
            { text: "Proporcionar locomoção de células", correct: false },
            { text: "Promover movimento de varredura para remover partículas estranhas", correct: true }
        ]
    },
    {
        question: 'O que é a anestesia?',
        answers: [
            { text: "Medicamento que aumenta a dor", correct: false },
            { text: "Procedimento cirúrgico", correct: false },
            { text: "Técnica que induz a ausência de sensibilidade, especialmente à dor", correct: true },
            { text: "Medicamento para aumentar a pressão arterial", correct: false }
        ]
    },
    {
        question: 'O que é a trombose?',
        answers: [
            { text: "Inflamação nas veias", correct: false },
            { text: "Formação de coágulos em vasos sanguíneos", correct: true },
            { text: "Doença autoimune que afeta as articulações", correct: false },
            { text: "Problema cardíaco", correct: false }
        ]
    },
    {
        question: 'O que é a insulina?',
        answers: [
            { text: "Hormônio do crescimento", correct: false },
            { text: "Enzima digestiva", correct: false },
            { text: "Hormônio que regula o açúcar no sangue", correct: true },
            { text: "Hormônio sexual", correct: false }
        ]
    },
    {
        question: 'O que é a asma?',
        answers: [
            { text: "Doença cardíaca", correct: false },
            { text: "Inflamação dos ossos", correct: false },
            { text: "Inflamação das articulações", correct: false },
            { text: "Doença respiratória que causa dificuldade em respirar", correct: true }
        ]
    },
    {
        question: 'O que é a gastrite?',
        answers: [
            { text: "Inflamação no fígado", correct: false },
            { text: "Inflamação no estômago", correct: true },
            { text: "Doença respiratória", correct: false },
            { text: "Doença cardíaca", correct: false }
        ]
    },
    {
        question: 'O que é a artrite?',
        answers: [
            { text: "Inflamação nas articulações", correct: true },
            { text: "Inflamação no fígado", correct: false },
            { text: "Doença respiratória", correct: false },
            { text: "Doença cardíaca", correct: false }
        ]
    },
    {
        question: 'O que é a meningite?',
        answers: [
            { text: "Inflamação no fígado", correct: false },
            { text: "Inflamação nos pulmões", correct: false },
            { text: "Inflamação nas meninges", correct: true },
            { text: "Doença cardiovascular", correct: false }
        ]
    },
    {
        question: 'O que é a apneia do sono?',
        answers: [
            { text: "Parada cardíaca", correct: false },
            { text: "Interrupção temporária da respiração durante o sono", correct: true },
            { text: "Inflamação nos pulmões", correct: false },
            { text: "Doença neurológica", correct: false }
        ]
    },
    {
        question: 'O que é a anorexia?',
        answers: [
            { text: "Distúrbio alimentar caracterizado por comer excessivamente", correct: false },
            { text: "Distúrbio alimentar que leva a pessoa a ter uma visão distorcida de seu corpo, com perda de peso", correct: true },
            { text: "Inflamação no estômago com grande perda de peso", correct: false },
            { text: "Distúrbio alimentar onde a pessoa provoca vômitos", correct: false }
        ]
    },
    {
        question: 'O que é a bulimia?',
        answers: [
            { text: "Distúrbio alimentar caracterizado por comer excessivamente", correct: false },
            { text: "Perda de apetite e peso em níveis perigosos", correct: false },
            { text: "Transtorno alimentar grave marcado por compulsão, com métodos para evitar o ganho de peso.", correct: true },
            { text: "Doença cardiovascular", correct: false }
        ]
    },
    {
        question: 'O que é a catarata?',
        answers: [
            { text: "Doença neurológica", correct: false },
            { text: "Doença respiratória", correct: false },
            { text: "Opacificação do cristalino, levando à perda de visão", correct: true },
            { text: "Inflamação nas articulações", correct: false }
        ]
    },
    {
        question: 'O que é a enxaqueca?',
        answers: [
            { text: "Inflamação nas articulações", correct: false },
            { text: "Um tipo de dor de cabeça intensa e pulsante", correct: true },
            { text: "Doença respiratória", correct: false },
            { text: "Doença neurológica", correct: false }
        ]
    },
    {
        question: 'O que é a pneumonia?',
        answers: [
            { text: "Inflamação nas articulações", correct: false },
            { text: "Infecção bacteriana, fúngica ou viral dos pulmões", correct: true },
            { text: "Doença cardiovascular", correct: false },
            { text: "Doença neurológica", correct: false }
        ]
    },
    {
        question: 'O que é a esquizofrenia?',
        answers: [
            { text: "Doença neurológica que afeta os músculos", correct: false },
            { text: "Transtorno mental que afeta o pensamento, a emoção e o comportamento", correct: true },
            { text: "Doença respiratória", correct: false },
            { text: "Doença cardiovascular", correct: false }
        ]
    },
    {
        question: 'O que é a febre amarela?',
        answers: [
            { text: "Infecção bacteriana", correct: false },
            { text: "Infecção viral transmitida por mosquitos", correct: true },
            { text: "Doença cardiovascular", correct: false },
            { text: "Doença neurológica", correct: false }
        ]
    },
    {
        question: 'O que é a nefrologia?',
        answers: [
            { text: "Especilaide médica que estudo dos ossos", correct: false },
            { text: "Especialidade médica que se ocupa do diagnóstico e tratamento das doenças do sistema urinário", correct: true },
            { text: "especialidade que trata doenças cardíacas", correct: false },
            { text: "Especialidade médica que estuda o sistema nervoso", correct: false }
        ]
    },
    {
        question: 'O que é a insuficiência renal?',
        answers: [
            { text: "Aumento da função renal", correct: false },
            { text: "Inflamação nos rins", correct: false },
            { text: "Perda da capacidade dos rins efetuarem suas funções básicas", correct: true },
            { text: "Produção excessiva de urina", correct: false }
        ]
    },
    {
        question: 'O que é a diálise?',
        answers: [
            { text: "Procedimento cirúrgico para a remoção dos rins", correct: false },
            { text: "Terapia que substitui parcialmente as funções dos rins", correct: true },
            { text: "Exame de imagem dos rins", correct: false },
            { text: "Terapia hormonal para estimular a função renal", correct: false }
        ]
    },
    {
        question: 'Quais são alguns dos principais fatores de risco para doenças renais?',
        answers: [
            { text: "Consumo excessivo de chocolate", correct: false },
            { text: "Atividade física regular", correct: false },
            { text: "Hipertensão arterial e diabetes", correct: true },
            { text: "Dieta rica em frutas e vegetais", correct: false }
        ]
    },
    {
        question: 'Qual a principal causa de morte no mundo?',
        answers: [
            { text: "Câncer", correct: false },
            { text: "Acidente de trânsito", correct: false },
            { text: "Doenças cardiovasculares", correct: true },
            { text: "Infecções respiratórias", correct: false }
        ]
    },
    {
        question: 'O que é a pedra nos rins?',
        answers: [
            { text: "Inflamação dos rins", correct: false },
            { text: "Depósito de cristais que se formam nos rins", correct: true },
            { text: "Doença autoimune que afeta os rins", correct: false },
            { text: "Infecção bacteriana nos rins", correct: false }
        ]
    },
    {
        question: 'O que é a nefrite?',
        answers: [
            { text: "Inflamação nas articulações", correct: false },
            { text: "Inflamação nos pulmões", correct: false },
            { text: "Inflamação nos rins", correct: true },
            { text: "Inflamação no estômago", correct: false }
        ]
    },
    {
        question: 'As células do ser humano possuem quantos pares de cromossomos?',
        answers: [
            { text: "22", correct: false },
            { text: "23", correct: true },
            { text: "46", correct: false },
            { text: "48", correct: false }
        ]
    },
    {
        question: 'Qual o tipo mais comum de cálculo ("pedra") renal no ser humano?',
        answers: [
            { text: "Trifosfato Magnesiano", correct: false },
            { text: "Fosfato de cálcio", correct: false },
            { text: "Ácido úrico", correct: false },
            { text: "Oxalato de cálcio", correct: true }
        ]
    },
    {
        "question": "Qual é a principal função das abelhas operárias na colmeia?",
        "answers": [
            {"text": "Reproduzir", "correct": false},
            {"text": "Coletar néctar e pólen", "correct": true},
            {"text": "Defender a colmeia", "correct": false},
            {"text": "Cuidar da rainha", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome da substância doce que as abelhas produzem a partir do néctar das flores?",
        "answers": [
            {"text": "Cera de abelha", "correct": false},
            {"text": "Própolis", "correct": false},
            {"text": "Geleia real", "correct": false},
            {"text": "Mel", "correct": true}
        ]
    },
    {
        "question": "Quantas asas têm as abelhas?",
        "answers": [
            {"text": "2", "correct": false},
            {"text": "4", "correct": true},
            {"text": "6", "correct": false},
            {"text": "8", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome dado ao fenômeno do desaparecimento das abelhas operárias de uma colmeia, um problema que tem preocupado os apicultores?",
        "answers": [
            {"text": "Síndrome do Colapso das Colmeias", "correct": true},
            {"text": "Desordem da Colmeia Vazia", "correct": false},
            {"text": "Enjambreamento", "correct": false},
            {"text": "Despopulação Apícola", "correct": false}
        ]
    },
    {
        "question": "Qual é o papel da abelha rainha na colmeia?",
        "answers": [
            {"text": "Produzir mel", "correct": false},
            {"text": "Defender a colmeia", "correct": false},
            {"text": "Botar ovos", "correct": true},
            {"text": "Coletar néctar", "correct": false}
        ]
    },
    {
        "question": "Qual é a característica física mais distintiva das girafas?",
        "answers": [
            {"text": "Patas curtas", "correct": false},
            {"text": "Pescoço longo", "correct": true},
            {"text": "Cauda curta", "correct": false},
            {"text": "Orelhas grandes", "correct": false}
        ]
    },
    {
        "question": "Qual é a principal fonte de alimento das girafas?",
        "answers": [
            {"text": "Grama", "correct": false},
            {"text": "Frutas", "correct": false},
            {"text": "Folhas de árvores", "correct": true},
            {"text": "Insetos", "correct": false}
        ]
    },
    {
        "question": "Quantas vértebras cervicais (no pescoço) tem uma girafa?",
        "answers": [
            {"text": "7", "correct": true},
            {"text": "12", "correct": false},
            {"text": "15", "correct": false},
            {"text": "20", "correct": false}
        ]
    },
    {
        "question": "Em que continente as girafas são encontradas na natureza?",
        "answers": [
            {"text": "América do Sul", "correct": false},
            {"text": "Ásia", "correct": false},
            {"text": "África", "correct": true},
            {"text": "Austrália", "correct": false}
        ]
    },
    {
        "question": "Qual é a média de altura de uma girafa adulta?",
        "answers": [
            {"text": "2 metros", "correct": false},
            {"text": "4 metros", "correct": false},
            {"text": "5,5 metros", "correct": true},
            {"text": "7 metros", "correct": false}
        ]
    },
    {
        "question": "Qual condição médica é caracterizada pela formação de pedras nos rins, que podem causar dor ao passar pela urina?",
        "answers": [
            {"text": "Cistite", "correct": false},
            {"text": "Pielonefrite", "correct": false},
            {"text": "Nefrolitíase", "correct": true},
            {"text": "Glomerulonefrite", "correct": false}
        ]
    },
    {
        "question": "Qual substância é liberada pelo corpo em resposta a um alérgeno, causando sintomas de alergia?",
        "answers": [
            {"text": "Insulina", "correct": false},
            {"text": "Adrenalina", "correct": false},
            {"text": "Histamina", "correct": true},
            {"text": "Serotonina", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome da condição alérgica caracterizada por inflamação e estreitamento das vias aéreas, causando dificuldade para respirar?",
        "answers": [
            {"text": "Diabetes", "correct": false},
            {"text": "Asma", "correct": true},
            {"text": "Hipertensão", "correct": false},
            {"text": "Artrite", "correct": false}
        ]
    },
    {
        "question": "Qual é o termo usado para descrever uma reação alérgica grave e potencialmente fatal que pode causar choque anafilático?",
        "answers": [
            {"text": "Anafilaxia", "correct": true},
            {"text": "Bronquite", "correct": false},
            {"text": "Dermatite", "correct": false},
            {"text": "Rinite", "correct": false}
        ]
    }
    

]


//Q3 CIÊNCIAS


const qciencia=[
    {
        question: 'O que é um pulsar, em astrofísica?',
        answers: [
            { text: 'Um tipo de estrela', correct: false },
            { text: 'Uma partícula subatômica', correct: false },
            { text: 'Um tipo de galáxia', correct: false },
            { text: 'Um objeto celeste de rotação rápida emitindo pulsos de radiação', correct: true }
        ]
    },
    {
        "question": "Qual é a principal função de uma lupa?",
        "answers": [
            {"text": "Medir a temperatura", "correct": false},
            {"text": "Ampliar objetos pequenos", "correct": true},
            {"text": "Emitir luz", "correct": false},
            {"text": "Medir a pressão atmosférica", "correct": false}
        ]
    },
    {
        "question": "Qual é o tipo de lente utilizado em uma lupa?",
        "answers": [
            {"text": "Lente côncava", "correct": false},
            {"text": "Lente convexa", "correct": true},
            {"text": "Lente cilíndrica", "correct": false},
            {"text": "Lente bifocal", "correct": false}
        ]
    },
    {
        "question": "O que determina a potência de ampliação de uma lupa?",
        "answers": [
            {"text": "O material da lente", "correct": false},
            {"text": "O diâmetro da lente", "correct": false},
            {"text": "O foco da lente", "correct": true},
            {"text": "O formato do cabo", "correct": false}
        ]
    },
    {
        "question": "Em qual área científica as lupas são frequentemente utilizadas?",
        "answers": [
            {"text": "Astronomia", "correct": false},
            {"text": "Microscopia", "correct": false},
            {"text": "Biologia", "correct": true},
            {"text": "Geologia", "correct": false}
        ]
    },
    {
        "question": "Qual é a parte de uma lupa que permite segurá-la confortavelmente?",
        "answers": [
            {"text": "Lente", "correct": false},
            {"text": "Cabo", "correct": true},
            {"text": "Foco", "correct": false},
            {"text": "Bisel", "correct": false}
        ]
    },
    {
        question: 'Qual cientista ficou conhecido por formular as 3 leis sobre o movimento dos planetas?',
        answers: [
            { text: 'Nicolau Copérnico', correct: false },
            { text: 'Johannes Kepler', correct: true },
            { text: 'Galileu Galilei', correct: false },
            { text: 'Stephen Hawking', correct: false }
        ]
    },
    {
        "question": "Qual é o nome da área da matemática que estuda as propriedades das figuras geométricas em um plano, como pontos, linhas, ângulos, polígonos e círculos?",
        "answers": [
            {"text": "Trigonometria", "correct": false},
            {"text": "Álgebra Linear", "correct": false},
            {"text": "Geometria Plana", "correct": true},
            {"text": "Cálculo Diferencial", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome da constante matemática que representa a razão entre a circunferência de um círculo e seu diâmetro, aproximadamente igual a 3.14159?",
        "answers": [
            {"text": "Euler", "correct": false},
            {"text": "Fibonacci", "correct": false},
            {"text": "Phi", "correct": false},
            {"text": "Pi", "correct": true}
        ]
    },
    {
        "question": "Qual é o nome da ciência que estuda a composição, estrutura, propriedades e transformações da matéria?",
        "answers": [
            {"text": "Biologia", "correct": false},
            {"text": "Química", "correct": true},
            {"text": "Física", "correct": false},
            {"text": "Astronomia", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome da lei da física que afirma que 'a pressão de um gás é inversamente proporcional ao seu volume, mantendo a temperatura constante'?",
        "answers": [
            {"text": "Lei de Boyle", "correct": true},
            {"text": "Lei de Avogadro", "correct": false},
            {"text": "Lei de Dalton", "correct": false},
            {"text": "Lei de Charles", "correct": false}
        ]
    },
    {
        "question": "Qual é o método de mineração mais comum para a extração de carvão e minerais sedimentares?",
        "answers": [
            {"text": "Mineração a céu aberto", "correct": true},
            {"text": "Mineração subterrânea", "correct": false},
            {"text": "Mineração hidráulica", "correct": false},
            {"text": "Mineração de poços", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do processo utilizado para separar um metal de seu minério por meio da utilização de calor?",
        "answers": [
            {"text": "Refino", "correct": false},
            {"text": "Fundição", "correct": true},
            {"text": "Solidificação", "correct": false},
            {"text": "Dissolução", "correct": false}
        ]
    },
    {
        "question": "O que é uma jazida mineral?",
        "answers": [
            {"text": "Um local onde os minerais são extraídos", "correct": false},
            {"text": "Uma formação rochosa que contém minerais valiosos", "correct": true},
            {"text": "Um depósito de água subterrânea", "correct": false},
            {"text": "Uma estrutura para acomodar trabalhadores de mineração", "correct": false}
        ]
    },
    {
        "question": "Qual é o principal componente do aço, uma liga metálica amplamente utilizada na indústria?",
        "answers": [
            {"text": "Ferro", "correct": true},
            {"text": "Cobre", "correct": false},
            {"text": "Zinco", "correct": false},
            {"text": "Níquel", "correct": false}
        ]
    },
    {
        "question": "O que é a lixiviação em mineração?",
        "answers": [
            {"text": "Um método de transporte de minérios", "correct": false},
            {"text": "Um processo de separação de minerais", "correct": false},
            {"text": "Um método de refino de metais", "correct": false},
            {"text": "Um processo de extração de substâncias solúveis de minérios", "correct": true}
        ]
    },
    {
        "question": "Qual é o material mais comum usado para fazer o corpo de uma pipa?",
        "answers": [
            {"text": "Alumínio", "correct": false},
            {"text": "Bambu", "correct": true},
            {"text": "Plástico", "correct": false},
            {"text": "Aço", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome dado à linha usada para voar pipas?",
        "answers": [
            {"text": "Fio dental", "correct": false},
            {"text": "Fio de nylon", "correct": false},
            {"text": "Fio de papagaio", "correct": true},
            {"text": "Fio de pesca", "correct": false}
        ]
    },
    {
        "question": "Qual é a proteína principal que compõe as unhas?",
        "answers": [
            {"text": "Queratina", "correct": true},
            {"text": "Colágeno", "correct": false},
            {"text": "Melanina", "correct": false},
            {"text": "Elastina", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome da condição em que as unhas se tornam amareladas devido ao uso excessivo de esmaltes escuros?",
        "answers": [
            {"text": "Onicomicose", "correct": false},
            {"text": "Leuconíquia", "correct": false},
            {"text": "Melanoníquia", "correct": false},
            {"text": "Lentiginose", "correct": true}
        ]
    },
    {
        "question": "O que é a cutícula da unha?",
        "answers": [
            {"text": "A parte externa da unha", "correct": false},
            {"text": "A camada de queratina da unha", "correct": false},
            {"text": "A pele morta ao redor da unha", "correct": false},
            {"text": "A pele que se sobrepõe à base da unha", "correct": true}
        ]
    },
    {
        "question": "Qual é o nome do instrumento usado para empurrar as cutículas durante uma manicure?",
        "answers": [
            {"text": "Pinça", "correct": false},
            {"text": "Alicate", "correct": false},
            {"text": "Espátula", "correct": true},
            {"text": "Tesoura", "correct": false}
        ]
    },
    {
        "question": "Qual é a função da matriz da unha?",
        "answers": [
            {"text": "Produzir queratina", "correct": true},
            {"text": "Fornecer nutrientes para as unhas", "correct": false},
            {"text": "Regular a temperatura das unhas", "correct": false},
            {"text": "Controlar o crescimento das unhas", "correct": false}
        ]
    },
    {
        "question": "Quem é creditado como o inventor do primeiro sistema de televisão totalmente eletrônico?",
        "answers": [
            {"text": "Thomas Edison", "correct": false},
            {"text": "John Logie Baird", "correct": false},
            {"text": "Philo Farnsworth", "correct": true},
            {"text": "Guglielmo Marconi", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome da tecnologia de tela que é frequentemente usada em televisores modernos e consiste em pequenos pontos de luz que compõem a imagem?",
        "answers": [
            {"text": "CRT", "correct": false},
            {"text": "LCD", "correct": false},
            {"text": "LED", "correct": true},
            {"text": "Plasma", "correct": false}
        ]
    },
    {
        "question": "Qual é a resolução de tela mais alta entre as opções abaixo?",
        "answers": [
            {"text": "720p", "correct": false},
            {"text": "1080p", "correct": false},
            {"text": "4K", "correct": true},
            {"text": "480p", "correct": false}
        ]
    },
    {
        "question": "Qual empresa é conhecida por sua linha de televisores Bravia?",
        "answers": [
            {"text": "Samsung", "correct": false},
            {"text": "LG", "correct": false},
            {"text": "Sony", "correct": true},
            {"text": "Panasonic", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do mecanismo que alimenta um relógio mecânico, permitindo que ele funcione sem baterias?",
        "answers": [
            {"text": "Movimento de quartzo", "correct": false},
            {"text": "Ressort", "correct": false},
            {"text": "Corda manual", "correct": true},
            {"text": "Cronógrafo", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome da parte do relógio que cobre o mostrador e o protege de danos?",
        "answers": [
            {"text": "Bisel", "correct": false},
            {"text": "Cristal", "correct": true},
            {"text": "Luneta", "correct": false},
            {"text": "Ponteiro", "correct": false}
        ]
    },
    {
        "question": "Qual é a função de um cronógrafo em um relógio?",
        "answers": [
            {"text": "Mostrar a hora mundial", "correct": false},
            {"text": "Medir intervalos de tempo", "correct": true},
            {"text": "Mostrar a data", "correct": false},
            {"text": "Resistir à água", "correct": false}
        ]
    },
    {
        "question": "Qual é o principal ingrediente usado na fabricação de sabonete?",
        "answers": [
            {"text": "Ácido sulfúrico", "correct": false},
            {"text": "Glicerina", "correct": true},
            {"text": "Acetona", "correct": false},
            {"text": "Água oxigenada", "correct": false}
        ]
    },
    {
        "question": "Qual processo é utilizado para fazer sabonetes artesanais e envolve a reação de gorduras ou óleos com uma base?",
        "answers": [
            {"text": "Saponificação", "correct": true},
            {"text": "Fermentação", "correct": false},
            {"text": "Polimerização", "correct": false},
            {"text": "Sublimação", "correct": false}
        ]
    },
    {
        "question": "Qual é o pH típico de um sabonete neutro?",
        "answers": [
            {"text": "Menos de 5", "correct": false},
            {"text": "Entre 5 e 6", "correct": false},
            {"text": "7", "correct": true},
            {"text": "Mais de 8", "correct": false}
        ]
    },
    {
        "question": "Qual é a unidade de medida da corrente elétrica?",
        "answers": [
            {"text": "Volt", "correct": false},
            {"text": "Ampère", "correct": true},
            {"text": "Watt", "correct": false},
            {"text": "Ohm", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do dispositivo usado para interromper o fluxo de corrente elétrica em um circuito?",
        "answers": [
            {"text": "Transistor", "correct": false},
            {"text": "Resistor", "correct": false},
            {"text": "Interruptor", "correct": true},
            {"text": "Condensador", "correct": false}
        ]
    },
    {
        "question": "Qual é a lei que afirma que a corrente que passa por um condutor é diretamente proporcional à tensão aplicada a ele?",
        "answers": [
            {"text": "Lei de Faraday", "correct": false},
            {"text": "Lei de Coulomb", "correct": false},
            {"text": "Lei de Ohm", "correct": true},
            {"text": "Lei de Kirchhoff", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do componente eletrônico que armazena carga elétrica?",
        "answers": [
            {"text": "Transistor", "correct": false},
            {"text": "Resistor", "correct": false},
            {"text": "Capacitor", "correct": true},
            {"text": "Indutor", "correct": false}
        ]
    },
    {
        "question": "Qual é a unidade de medida da resistência elétrica?",
        "answers": [
            {"text": "Ampère", "correct": false},
            {"text": "Ohm", "correct": true},
            {"text": "Watt", "correct": false},
            {"text": "Volt", "correct": false}
        ]
    },
    {
        "question": "Qual é o principal componente venenoso encontrado em aranhas da família Latrodectus, como a viúva-negra?",
        "answers": [
            {"text": "Ácido clorídrico", "correct": false},
            {"text": "Veneno de cobra", "correct": false},
            {"text": "Toxina botulínica", "correct": false},
            {"text": "Latrotoxina", "correct": true}
        ]
    },
    {
        "question": "Qual é o nome do veneno encontrado na pele de sapos de algumas espécies, como o sapo-boi?",
        "answers": [
            {"text": "Arsênico", "correct": false},
            {"text": "Bufotoxina", "correct": true},
            {"text": "Cianeto", "correct": false},
            {"text": "Estricnina", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do veneno produzido por certas plantas, como a mamona?",
        "answers": [
            {"text": "Veneno de cobra", "correct": false},
            {"text": "Ricina", "correct": true},
            {"text": "Curare", "correct": false},
            {"text": "Cianeto", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do veneno usado comumente em assassinatos históricos, derivado de folhas de plantas de Digitalis?",
        "answers": [
            {"text": "Arsênico", "correct": false},
            {"text": "Cianeto", "correct": false},
            {"text": "Digitalina", "correct": true},
            {"text": "Estricnina", "correct": false}
        ]
    },
    {
        "question": "Que tipo de tinta é conhecida por seu acabamento brilhante e resistência à umidade?",
        "answers": [
            {"text": "Tinta a óleo", "correct": false},
            {"text": "Tinta acrílica", "correct": false},
            {"text": "Tinta esmalte", "correct": true},
            {"text": "Tinta látex", "correct": false}
        ]
    },
    {
        "question": "Qual é a principal diferença entre tintas à base de água e tintas à base de solvente?",
        "answers": [
            {"text": "A cor", "correct": false},
            {"text": "O preço", "correct": false},
            {"text": "O odor", "correct": true},
            {"text": "A durabilidade", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome da tinta que muda de cor em resposta a estímulos externos, como luz UV?",
        "answers": [
            {"text": "Tinta fluorescente", "correct": false},
            {"text": "Tinta térmica", "correct": false},
            {"text": "Tinta termocrômica", "correct": true},
            {"text": "Tinta magnética", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome da tinta que brilha no escuro após ser exposta à luz?",
        "answers": [
            {"text": "Tinta metálica", "correct": false},
            {"text": "Tinta de acabamento fosco", "correct": false},
            {"text": "Tinta fosforescente", "correct": true},
            {"text": "Tinta de textura", "correct": false}
        ]
    },
    {
        "question": "Qual é a profundidade padrão de uma piscina olímpica?",
        "answers": [
          {"text": "2 metros", "correct": false},
          {"text": "3 metros", "correct": false},
          {"text": "5 metros", "correct": false},
          {"text": "2 metros nas extremidades e 3 metros no meio", "correct": true}
        ]
    },
    {
        "question": "Qual é o nome do dispositivo giratório no topo de um helicóptero que permite o voo?",
        "answers": [
            {"text": "Asa fixa", "correct": false},
            {"text": "Rotor principal", "correct": true},
            {"text": "Estabilizador horizontal", "correct": false},
            {"text": "Propulsor", "correct": false}
        ]
    },
    {
        "question": "Qual foi o primeiro helicóptero de produção em massa, criado pelo ucraniano Igor Sikorsky em 1942?",
        "answers": [
            {"text": "Bell UH-1 Iroquois", "correct": false},
            {"text": "Sikorsky R-4", "correct": true},
            {"text": "Boeing CH-47 Chinook", "correct": false},
            {"text": "Robinson R22", "correct": false}
        ]
    },
    {
        "question": "Qual é a principal vantagem de um helicóptero sobre um avião?",
        "answers": [
            {"text": "Maior velocidade", "correct": false},
            {"text": "Capacidade de pairar no ar", "correct": true},
            {"text": "Maior capacidade de carga", "correct": false},
            {"text": "Maior altitude de voo", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do rotor pequeno na cauda de um helicóptero que impede a rotação descontrolada da fuselagem?",
        "answers": [
            {"text": "Rotor principal", "correct": false},
            {"text": "Rotor de cauda", "correct": true},
            {"text": "Estabilizador vertical", "correct": false},
            {"text": "Propulsor", "correct": false}
        ]
    },
    {
        "question": "Qual helicóptero é conhecido por seu uso extensivo durante a Guerra do Vietnã?",
        "answers": [
            {"text": "Sikorsky S-76", "correct": false},
            {"text": "Bell UH-1 Iroquois", "correct": true},
            {"text": "Eurocopter AS365 Dauphin", "correct": false},
            {"text": "Boeing AH-64 Apache", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome completo do helicóptero Havoc?",
        "answers": [
            {"text": "Mil Mi-24 Havoc", "correct": true},
            {"text": "Sikorsky UH-60 Havoc", "correct": false},
            {"text": "Boeing AH-64 Havoc", "correct": false},
            {"text": "Bell AH-1 Havoc", "correct": false}
        ]
    },
    {
        "question": "De qual país é originário o helicóptero Havoc?",
        "answers": [
            {"text": "Rússia", "correct": true},
            {"text": "Estados Unidos", "correct": false},
            {"text": "Alemanha", "correct": false},
            {"text": "França", "correct": false}
        ]
    },  
    {
        "question": "Qual é a principal função dos submarinos de ataque rápido (SSN) na marinha?",
        "answers": [
            {"text": "Lançar mísseis balísticos", "correct": false},
            {"text": "Realizar patrulhas de longo alcance e caçar submarinos inimigos", "correct": true},
            {"text": "Transportar tropas de elite", "correct": false},
            {"text": "Destruir minas navais", "correct": false}
        ]
    },
    {
        "question": "Qual é a profundidade operacional máxima estimada dos submarinos de classe Seawolf, utilizados pela Marinha dos Estados Unidos?",
        "answers": [
            {"text": "200 metros", "correct": false},
            {"text": "500 metros", "correct": false},
            {"text": "700 metros", "correct": true},
            {"text": "1.000 metros", "correct": false}
        ]
    },
    {
        "question": "O que são ligas metálicas?",
        "answers": [
            {"text": "Materiais compostos por diferentes tipos de metal", "correct": true},
            {"text": "Metais puros encontrados na natureza", "correct": false},
            {"text": "Minerais utilizados na fabricação de joias", "correct": false},
            {"text": "Elementos não metálicos combinados com metais", "correct": false}
        ]
    },
    {
        "question": "Qual é a principal razão para criar ligas metálicas?",
        "answers": [
            {"text": "Aumentar a densidade", "correct": false},
            {"text": "Reduzir a resistência à corrosão", "correct": false},
            {"text": "Melhorar as propriedades físicas e mecânicas", "correct": true},
            {"text": "Diminuir a condutividade térmica", "correct": false}
        ]
    },
    {
        "question": "Qual das seguintes ligas é frequentemente utilizada na indústria aeronáutica devido à sua resistência e leveza?",
        "answers": [
            {"text": "Aço inoxidável", "correct": false},
            {"text": "Latão", "correct": false},
            {"text": "Alumínio-lítio", "correct": true},
            {"text": "Bronze", "correct": false}
        ]
    },
    {
        "question": "Qual das seguintes ligas é uma combinação de ferro e carbono, sendo comumente usada na fabricação de ferramentas e estruturas metálicas?",
        "answers": [
            {"text": "Alumínio-lítio", "correct": false},
            {"text": "Aço", "correct": true},
            {"text": "Cobre berílio", "correct": false},
            {"text": "Magnésio", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome da liga metálica composta principalmente de cobre e zinco, comumente usada em tubos e instrumentos musicais?",
        "answers": [
            {"text": "Aço inoxidável", "correct": false},
            {"text": "Latão", "correct": true},
            {"text": "Bronze", "correct": false},
            {"text": "Alumínio", "correct": false}
        ]
    },
    {
        "question": "O que é uma liga de titânio?",
        "answers": [
            {"text": "Uma liga composta de titânio e alumínio", "correct": false},
            {"text": "Uma liga de titânio e níquel", "correct": false},
            {"text": "Uma liga de titânio e cobre", "correct": false},
            {"text": "Uma liga composta principalmente de titânio com adições de outros elementos", "correct": true}
        ]
    },
    {
        "question": "Qual das seguintes ligas é conhecida por sua resistência à corrosão e é frequentemente usada em aplicações marítimas?",
        "answers": [
            {"text": "Latão", "correct": false},
            {"text": "Alumínio", "correct": false},
            {"text": "Aço inoxidável", "correct": true},
            {"text": "Titânio", "correct": false}
        ]
    },
    {
        "question": "Qual é o principal benefício da adição de elementos de liga ao ferro para criar aço?",
        "answers": [
            {"text": "Aumento da densidade", "correct": false},
            {"text": "Redução da condutividade elétrica", "correct": false},
            {"text": "Melhoria da resistência e da dureza", "correct": true},
            {"text": "Diminuição da maleabilidade", "correct": false}
        ]
    },
    {
        "question": "O que são ligas de níquel?",
        "answers": [
            {"text": "Ligas compostas de níquel e cobre", "correct": false},
            {"text": "Ligas de níquel e ferro", "correct": true},
            {"text": "Ligas de níquel e zinco", "correct": false},
            {"text": "Ligas de níquel e alumínio", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome da liga metálica composta principalmente de cobre e estanho, frequentemente usada na fabricação de utensílios de cozinha e moedas?",
        "answers": [
            {"text": "Latão", "correct": false},
            {"text": "Bronze", "correct": true},
            {"text": "Alumínio", "correct": false},
            {"text": "Ferro fundido", "correct": false}
        ]
    },
    {
        "question": "Qual é o principal componente estrutural encontrado na madeira?",
        "answers": [
            {"text": "Queratina", "correct": false},
            {"text": "Lignina", "correct": true},
            {"text": "Hemoglobina", "correct": false},
            {"text": "Quitina", "correct": false}
        ]
    },
    {
        "question": "Qual é o processo de remover a umidade da madeira para aumentar sua durabilidade e resistência?",
        "answers": [
            {"text": "Polimento", "correct": false},
            {"text": "Secagem", "correct": true},
            {"text": "Envernizamento", "correct": false},
            {"text": "Enceramento", "correct": false}
        ]
    },
    {
        "question": "Qual é o tipo de madeira conhecido por sua resistência e durabilidade, muitas vezes utilizada em móveis e pisos?",
        "answers": [
            {"text": "Pinho", "correct": false},
            {"text": "Bambu", "correct": false},
            {"text": "Carvalho", "correct": true},
            {"text": "Cedro", "correct": false}
        ]
    },
    {
        "question": "Qual é a principal ameaça à integridade da madeira, causando deterioração e decomposição ao longo do tempo?",
        "answers": [
            {"text": "Fungos", "correct": true},
            {"text": "Bactérias", "correct": false},
            {"text": "Insetos", "correct": false},
            {"text": "Radiação ultravioleta", "correct": false}
        ]
    },
    {
        "question": "Qual é o processo de cortar e moldar a madeira para criar objetos ou estruturas?",
        "answers": [
            {"text": "Tecelagem", "correct": false},
            {"text": "Carpintaria", "correct": true},
            {"text": "Escultura", "correct": false},
            {"text": "Fundição", "correct": false}
        ]
    },
    {
        question: 'Qual é a medida de uma jarda?',
        answers: [
            { text: '0,5 metro', correct: false },
            { text: '91,4cm', correct: true },
            { text: '1 metro', correct: false },
            { text: '1,2 metros', correct: false }
        ]
    },
        {
        question: 'Qual é o símbolo usado para representar uma jarda?',
        answers: [
            { text: 'yd', correct: true },
            { text: 'y', correct: false },
            { text: 'jr', correct: false },
            { text: 'yds', correct: false }
        ]
    },
    {
        question: 'Qual é o planeta mais quente do Sistema Solar?',
        answers: [
            { text: 'Júpiter', correct: false },
            { text: 'Vênus', correct: true },
            { text: 'Marte', correct: false },
            { text: 'Mercúrio', correct: false }
        ]
    },    
    {
        question: 'A geração de energia nas usinas nucleares acontece por meio da fissão nuclear controlada. Qual o combústível geralmente utilizado?',
        answers: [
            { text: 'Polônio', correct: false },
            { text: 'Césio', correct: false },
            { text: 'Radônio', correct: false },
            { text: 'Urânio', correct: true }
        ]
    },
    {
        question: 'Qual é a teoria amplamente aceita sobre a formação do universo?',
        answers: [
            { text: 'Teoria Geocêntrica', correct: false },
            { text: 'Teoria Heliocêntrica', correct: false },
            { text: 'Big Bang', correct: true },
            { text: 'Teoria do Estado Estacionário', correct: false }
        ]
    },
    {
        question: 'O que é um buraco negro?',
        answers: [
            { text: 'Um vórtice de vento em uma estrela', correct: false },
            { text: 'Uma região do espaço com gravidade extremamente baixa', correct: false },
            { text: 'Uma estrela em colapso', correct: false },
            { text: 'Uma região do espaço com gravidade tão intensa que nada pode escapar, nem mesmo a luz', correct: true }
        ]
    },
    {
        question: 'Qual é a principal fonte de energia do Sol?',
        answers: [
            { text: 'Fusão Nuclear', correct: true },
            { text: 'Fissão Nuclear', correct: false },
            { text: 'Queima de carvão', correct: false },
            { text: 'Reações químicas', correct: false }
        ]
    },
    {
        question: 'O que é um quasar?',
        answers: [
            { text: 'Um tipo de cometa', correct: false },
            { text: 'Um tipo de galáxia', correct: false },
            { text: 'Um objeto celeste de brilho intenso e energia poderosa, alimentado por um buraco negro supermassivo', correct: true },
            { text: 'Uma estrela em explosão', correct: false }
        ]
    },
    {
        question: 'Qual é o nome da galáxia espiral mais próxima da Via Láctea?',
        answers: [
            { text: 'Andrômeda', correct: true },
            { text: 'Triângulo', correct: false },
            { text: 'Sombrero', correct: false },
            { text: 'Bode', correct: false }
        ]
    },
    {
        question: 'O que é matéria escura?',
        answers: [
            { text: 'Matéria que compõe planetas e estrelas', correct: false },
            { text: 'Matéria composta por partículas subatômicas', correct: false },
            { text: 'Matéria que não emite luz nem energia eletromagnética, mas contribui para a gravidade', correct: true },
            { text: 'Forma densa de gás interestelar', correct: false }
        ]
    },
    {
        question: 'O que é um exoplaneta?',
        answers: [
            { text: 'Um asteroide próximo à Terra', correct: false },
            { text: 'Um planeta anão', correct: false },
            { text: 'Um planeta fora do sistema solar', correct: true },
            { text: 'Um planeta com anéis', correct: false }
        ]
    },
    {
        question: 'O que é cinemática?',
        answers: [
            { text: 'Estudo das forças', correct: false },
            { text: 'Estudo do movimento dos corpos sem levar em conta as causas desse movimento', correct: true },
            { text: 'Estudo da luz', correct: false },
            { text: 'Estudo da eletricidade', correct: false }
        ]
    },
    {
        question: 'Qual é a primeira lei de Newton?',
        answers: [
            { text: 'Lei da gravitação universal', correct: false },
            { text: 'Lei da ação e reação', correct: false },
            { text: 'Lei da inércia', correct: true },
            { text: 'Lei dos cossenos', correct: false }
        ]
    },
    {
        question: 'O que é impulso em física?',
        answers: [
            { text: 'Força aplicada durante um intervalo de tempo', correct: true },
            { text: 'Força total aplicada a um objeto', correct: false },
            { text: 'Resistência de um material ao fluxo de corrente elétrica', correct: false },
            { text: 'Variação da velocidade de um objeto', correct: false }
        ]
    },
    {
        question: 'O que é a segunda lei de Newton?',
        answers: [
            { text: 'Aceleração de um objeto é diretamente proporcional à força líquida agindo sobre ele e inversamente proporcional à sua massa', correct: true },
            { text: 'Todo corpo permanece em repouso ou em movimento retilíneo uniforme, a menos que uma força externa aja sobre ele', correct: false },
            { text: 'A cada ação há uma reação de igual magnitude, mas em direção oposta', correct: false },
            { text: 'A força da gravidade entre dois corpos é diretamente proporcional ao produto de suas massas e inversamente proporcional ao quadrado da distância entre eles', correct: false }
        ]
    },
    {
        question: 'O que é trabalho em física?',
        answers: [
            { text: 'Energia potencial de um objeto em movimento', correct: false },
            { text: 'Força aplicada durante um intervalo de tempo', correct: false },
            { text: 'Produto da força aplicada sobre um objeto e do deslocamento desse objeto na direção da força', correct: true },
            { text: 'Energia cinética de um objeto em repouso', correct: false }
        ]
    },
    {
        question: 'O que é potência em física?',
        answers: [
            { text: 'Energia potencial de um objeto em movimento', correct: false },
            { text: 'Produto da força aplicada sobre um objeto e do deslocamento desse objeto na direção da força', correct: false },
            { text: 'Quantidade de trabalho realizado por unidade de tempo', correct: true },
            { text: 'Energia cinética de um objeto em repouso', correct: false }
        ]
    },
    {
        question: 'O que é equilíbrio estático?',
        answers: [
            { text: 'Estado em que a velocidade de um objeto permanece constante', correct: false },
            { text: 'Estado em que a aceleração de um objeto é zero', correct: false },
            { text: 'Estado em que um objeto está em repouso', correct: false },
            { text: 'Estado em que a soma das forças que atuam em um objeto é zero e a soma dos torques é zero', correct: true }
            
        ]
    },
    {
        question: 'O que é torque em física?',
        answers: [
            { text: 'Produto da força aplicada sobre um objeto e do deslocamento desse objeto na direção da força', correct: false },
            { text: 'Quantidade de matéria em um objeto', correct: false },
            { text: 'Quantidade de movimento de um objeto', correct: false },
            { text: 'Força que tende a girar um objeto em torno de um eixo', correct: true }
        ]
    },
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
        question: 'Qual invento foi patenteado por Alexander Graham Bell?',
        answers: [
            { text: 'Telefone', correct: true },
            { text: 'Lâmpada elétrica', correct: false },
            { text: 'Computador', correct: false },
            { text: 'Máquina a vapor', correct: false }
        ]
    },
    {
        question: 'Qual foi a invenção de Guglielmo Marconi relacionada à comunicação?',
        answers: [
            { text: 'Telefone', correct: false },
            { text: 'Rádio', correct: true },
            { text: 'Televisão', correct: false },
            { text: 'Máquina fotográfica', correct: false }
        ]
    },
    {
        question: 'Quem é creditado pela invenção da máquina a vapor?',
        answers: [
            { text: 'Thomas Edison', correct: false },
            { text: 'James Watt', correct: true },
            { text: 'Nikola Tesla', correct: false },
            { text: 'Alexander Graham Bell', correct: false }
        ]
    },
    {
        question: 'Quem é considerado o pai da eletricidade?',
        answers: [
            { text: 'Thomas Edison', correct: false },
            { text: 'Nikola Tesla', correct: false },
            { text: 'Benjamin Franklin', correct: true },
            { text: 'Michael Faraday', correct: false }
        ]
    },
    {
        question: 'Qual linguagem de programação é conhecida por sua facilidade de aprendizado e sintaxe simples?',
        answers: [
            { text: 'C++', correct: false },
            { text: 'Python', correct: true },
            { text: 'Java', correct: false },
            { text: 'JavaScript', correct: false }
        ]
    },
    {
        question: 'O que significa a sigla HTML em programação web?',
        answers: [
            { text: 'Hypertext Markup Language', correct: true },
            { text: 'High-Level Text Language', correct: false },
            { text: 'Hyperlink and Text Management Language', correct: false },
            { text: 'Home Tool Markup Language', correct: false }
        ]
    },
    {
        question: 'Qual é o principal objetivo da linguagem de programação JavaScript?',
        answers: [
            { text: 'Desenvolvimento de aplicativos móveis', correct: false },
            { text: 'Programação de servidores', correct: false },
            { text: 'Desenvolvimento web interativo', correct: true },
            { text: 'Análise de dados', correct: false }
        ]
    },
    {
        question: 'Em programação, o que é um "loop"?',
        answers: [
            { text: 'Um erro de código', correct: false },
            { text: 'Uma estrutura condicional', correct: false },
            { text: 'Um bloco de código que se repete', correct: true },
            { text: 'Um comentário no código', correct: false }
        ]
    },
    {
        question: 'Qual linguagem de programação é comumente usada para o desenvolvimento de aplicativos móveis para dispositivos iOS?',
        answers: [
            { text: 'Java', correct: false },
            { text: 'Swift', correct: true },
            { text: 'Python', correct: false },
            { text: 'C#', correct: false }
        ]
    },
    {
        question: 'O que é um banco de dados relacional?',
        answers: [
            { text: 'Um banco de dados que armazena apenas imagens', correct: false },
            { text: 'Um banco de dados que armazena informações em tabelas relacionadas', correct: true },
            { text: 'Um banco de dados que armazena apenas números', correct: false },
            { text: 'Um banco de dados usado apenas para backup', correct: false }
        ]
    },
    {
        question: 'O que significa API em programação?',
        answers: [
            { text: 'Application Programming Interface', correct: true },
            { text: 'Advanced Programming Instruction', correct: false },
            { text: 'Automated Program Integration', correct: false },
            { text: 'Application Process Improvement', correct: false }
        ]
    },
    {
        question: 'Quando foi lançado o primeiro carro elétrico?',
        answers: [
            { text: '1800', correct: false },
            { text: '1870', correct: true },
            { text: '1905', correct: false },
            { text: '1925', correct: false }
        ]
    },
    {
        question: "É considerado o pai da metodologia científica?",
        answers: [
            { text: "John Locke", correct: false },
            { text: "Francis Bacon", correct: true },
            { text: "Arquimedes", correct: false },
            { text: "Pitágoras", correct: false }
        ]
    },
    {
        question: "Em relação a um triângulo de ângulo reto, o que diz o teorema de Pitágoras? (a=hipotenusa; b/c= catetos)",
        answers: [
            { text: "a2 = b2 + c2", correct: true },
            { text: "a = b + c", correct: false },
            { text: "a x 2 = b + c", correct: false },
            { text: "a = b - c", correct: false }
        ]
    },
    {
        question: "O que afirma o teorema de Tales?",
        answers: [
            { text: "Área de um círculo é Pi multiplicado pelo raio ao quadrado", correct: false },
            { text: "O quadrado da hipotenusa é igual a soma do quadrado dos catetos", correct: false },
            { text: "Num plano, a interseção de retas paralelas, por retas transversais, formam segmentos proporcionais", correct: true },
            { text: "àrea de um retângulo é a altura vezes a base", correct: false }
        ]
    },
    {
        question: "Um pedreiro diz: 'Se eu tivesse dois tijolos a mais, o dobro deste número seria 100'. Quantos tijolos ele tem?",
        answers: [
            { text: "44", correct: false },
            { text: "42", correct: false },
            { text: "48", correct: true },
            { text: "50", correct: false }
        ]
    },
    {
        question: "João tem 6 bolas de gude a mais do que Luiz. Os dois juntos têm 54. Quanto tem cada um?",
        answers: [
            { text: "28 e 26", correct: false },
            { text: "24 e 30", correct: true },
            { text: "34 e 20", correct: false },
            { text: "32 e 22", correct: false }
        ]
    },
    {
        question: "São cores de um semáforo, exceto?",
        answers: [
            { text: "Amarelo", correct: false },
            { text: "Laranja", correct: true },
            { text: "Verde", correct: false },
            { text: "Vermelho", correct: false }
        ]
    },
    {
        question: "Se seis latas de leite condensado custam 72 reais, qual o preço de 9 latas?",
        answers: [
            { text: "87 reais", correct: false },
            { text: "100 reais", correct: false },
            { text: "115 reais", correct: false },
            { text: "108 reais", correct: true }
        ]
    },
    {
        question: "Num elevador que suporta 600 quilos, quantas caixas de 48 quilos, pode-se levar por vez?",
        answers: [
            { text: "13", correct: false },
            { text: "10", correct: false },
            { text: "12", correct: true },
            { text: "15", correct: false }
        ]
    },
    {
        question: "Oito amigos se encontram e cada um cumprimenta o outro com um aperto de mão. Quantos apertos de mão se trocaram?",
        answers: [
            { text: "26", correct: false },
            { text: "64", correct: false },
            { text: "22", correct: false },
            { text: "28", correct: true }
        ]
    },
    {
        question: "O termômetro subiu 6 graus, e isso representa a metade da temperatura de antes. A quantos graus está agora?",
        answers: [
            { text: "18 graus", correct: true },
            { text: "22 graus", correct: false },
            { text: "16 graus", correct: false },
            { text: "24 graus", correct: false }
        ]
    },
    {
        question: "Se seis pessoas comem 6 chocolates em 6 minutos, quantas pessoas comerão 80 chocolates em 48 minutos?",
        answers: [
            { text: "12", correct: false },
            { text: "14", correct: false },
            { text: "10", correct: true },
            { text: "8", correct: false }
        ]
    },
    {
        question: "Que número abaixo completa a sequência a seguir? 12 - 6 - 18 - 24 - ??",
        answers: [
            { text: "42", correct: true },
            { text: "36", correct: false },
            { text: "26", correct: false },
            { text: "30", correct: false }
        ]
    },
    {
        question: 'O "QUADRO" está para a "PAREDE" assim como...',
        answers: [
            { text: "O teclado está para o computador", correct: false },
            { text: "O envelope está para a carta", correct: false },
            { text: "A régua está para o lápis", correct: false },
            { text: "O selo está para o envelope", correct: true }
        ]
    },
    {
        question: 'Todos os grupos de vocábulos abaixo possuem alguma coisa em comum, exceto um deles.',
        answers: [
            { text: "Camiseta, meia, vestido", correct: false },
            { text: "Tinta, pincel, tela", correct: false },
            { text: "Automóvel, trem, dinheiro", correct: true },
            { text: "Suco, cerveja, vinho", correct: false }
        ]
    },
    {
        question: 'Identifique o intruso do grupo.',
        answers: [
            { text: "São Paulo", correct: false },
            { text: "Rio de Janeiro", correct: false },
            { text: "Belo Horizonte", correct: false },
            { text: "Uberaba", correct: true }
        ]
    },
    {
        question: 'Uma das opções não é compatível com as demais.',
        answers: [
            { text: "Submarino", correct: false },
            { text: "Navio", correct: false },
            { text: "Iate", correct: false },
            { text: "Carro", correct: true }
        ]
    },
    {
        question: 'Uma das séries não está de acordo com o padrão das demais.',
        answers: [
            { text: "2, 7, 12", correct: false },
            { text: "4, 9, 14", correct: false },
            { text: "18, 23, 28", correct: false },
            { text: "6, 14, 22", correct: true }
        ]
    },
    {
        question: 'Uma das opções não está de acordo com o padrão das demais.',
        answers: [
            { text: "Distante, Perto", correct: true },
            { text: "Estreito, Apertado", correct: false },
            { text: "Sujeito, Indivíduo", correct: false },
            { text: "Fraternal, Amigo", correct: false }
        ]
    },
    {
        question: '"AMIGO" está para "INIMIGO" assim como "FRENESI" está para:',
        answers: [
            { text: "Êxtase", correct: false },
            { text: "Encanto", correct: false },
            { text: "Tranquilidade", correct: true },
            { text: "Alvoroço", correct: false }
        ]
    },
    {
        question: 'O "LIVRO" está para o "ESCRITOR" assim como o "QUADRO" está para:',
        answers: [
            { text: "Tela", correct: false },
            { text: "Pintor", correct: true },
            { text: "Parede", correct: false },
            { text: "Tinta", correct: false }
        ]
    },
    {
        question: 'Se diminuirmos em 1 centímetro as tiras que vamos cortar, ao invés de 8 vamos ter 9 tiras. Qual era o tamanho da peça inteira?',
        answers: [
            { text: "77 cm", correct: false },
            { text: "72 cm", correct: true },
            { text: "80 cm", correct: false },
            { text: "45 cm", correct: false }
        ]
    },
    {
        question: 'Alguém distribui bombons para 6 crianças, dando a mesma quantidade para cada uma. Ocorre que cada criança recebe um bombom a mais do que se toda caixa fosse distribuída entre 7 crianças. Quantos bombons havia na caixa?',
        answers: [
            { text: "42", correct: true },
            { text: "48", correct: false },
            { text: "36", correct: false },
            { text: "54", correct: false }
        ]
    },
    {
        question: '12 trabalhadores têm que transportar 12 sacos de milho da roça para o mercado. Cada um só pode carregar um saco. Os 12 precisam de 1 hora para fazer isso. Em quanto tempo 6 trabalhadores farão todo o transporte?',
        answers: [
            { text: "3 horas", correct: true },
            { text: "4 horas", correct: false },
            { text: "6 horas", correct: false },
            { text: "9 horas", correct: false }
        ]
    },
    {
        question: 'Há 24 passageiros no ônibus, entre homens e mulheres. Se 3 homens saltassem do ônibus, o número de mulheres seria o dobro do de homens. Quantos homens e quantas mulheres estavam lá dentro?',
        answers: [
            { text: "12 mulheres e 14 homens", correct: false },
            { text: "14 mulheres e 10 homens", correct: true },
            { text: "12 mulheres e 8 homens", correct: false },
            { text: "8 mulheres e 8 homens", correct: false }
        ]
    },
    {
        question: 'Numa caixa de fósforos há 85 palitos. Depois de transferidos para duas caixas, uma delas ficou com 1/3 de palitos a menos que a outra. Quantos fósforos há em cada caixa?',
        answers: [
            { text: "34 e 51", correct: true },
            { text: "33 e 47", correct: false },
            { text: "33 e 52", correct: false },
            { text: "27 e 49", correct: false }
        ]
    },
    {
        question: 'Qual das 5 opções se parece menos com as outras três?',
        answers: [
            { text: "Alegria", correct: false },
            { text: "Paladar", correct: true },
            { text: "Tristeza", correct: false },
            { text: "Ansiedade", correct: false }
        ]
    },
    {
        question: "Qual é o processo pelo qual a água é transformada em vapor de água na atmosfera?",
        answers: [
            { text: "Evaporação", correct: true },
            { text: "Condensação", correct: false },
            { text: "Solidificação", correct: false },
            { text: "Sublimação", correct: false }
        ]
    },
    {
        question: "O que é um ácido, de acordo com a definição científica?",
        answers: [
            { text: "Substância com sabor amargo", correct: false },
            { text: "Substância que doa íons hidrogênio em solução aquosa", correct: true },
            { text: "Substância que neutraliza uma base", correct: false },
            { text: "Substância que tem pH acima de 7", correct: false }
        ]
    },
    {
        question: "Qual é o nome do processo pelo qual os organismos vivos mantêm sua temperatura interna constante?",
        answers: [
            { text: "Termorregulação", correct: true },
            { text: "Homeostase", correct: false },
            { text: "Termossíntese", correct: false },
            { text: "Fotossíntese", correct: false }
        ]
    },
    {
        question: "Qual é o nome do processo pelo qual as placas tectônicas da Terra se movem, causando terremotos e formação de montanhas?",
        answers: [
            { text: "Fotossíntese", correct: false },
            { text: "Evaporação", correct: false },
            { text: "Tectônica de Placas", correct: true },
            { text: "Sublimação", correct: false }
        ]
    },
    {
        question: "Qual é a unidade de medida de distância no espaço interestelar?",
        answers: [
            { text: "Quilômetro", correct: false },
            { text: "Ano-luz", correct: true },
            { text: "Milha", correct: false },
            { text: "Parsec", correct: false }
        ]
    },
    {
        question: "Qual é a unidade de medida de temperatura no sistema internacional?",
        answers: [
            { text: "Kelvin", correct: true },
            { text: "Celsius", correct: false },
            { text: "Fahrenheit", correct: false },
            { text: "Rankine", correct: false }
        ]
    },
    {
        question: "O que é a refração da luz?",
        answers: [
            { text: "Reflexão da luz em uma superfície lisa", correct: false },
            { text: "Dobra da luz ao passar de um meio para outro", correct: true },
            { text: "Absorção da luz por um objeto opaco", correct: false },
            { text: "Emissão de luz por um objeto aquecido", correct: false }
        ]
    },
    {
        question: "Qual é o nome do processo pelo qual uma substância muda do estado gasoso para o estado líquido?",
        answers: [
            { text: "Condensação", correct: true },
            { text: "Vaporização", correct: false },
            { text: "Sublimação", correct: false },
            { text: "Solidificação", correct: false }
        ]
    },
    {
        question: "Qual é o símbolo químico para o elemento oxigênio?",
        answers: [
            { text: "O", correct: true },
            { text: "Oi", correct: false },
            { text: "Ox", correct: false },
            { text: "Oxy", correct: false }
        ]
    },
    {
        question: "O que representa o número atômico de um elemento?",
        answers: [
            { text: "Número total de prótons e nêutrons", correct: false },
            { text: "Número total de elétrons", correct: false },
            { text: "Número total de nêutrons", correct: false },
            { text: "Número total de prótons", correct: true }
        ]
    },
    {
        question: "Qual é a fórmula química da água?",
        answers: [
            { text: "CO2", correct: false },
            { text: "H2O", correct: true },
            { text: "O2", correct: false },
            { text: "H2", correct: false }
        ]
    },
    {
        question: "Percebemos o raio muito antes do trovão. Qual o cálculo para sabermos a distância, em metros, entre nós e o raio?",
        answers: [
            { text: "Tempo entre o raio e o trovão em segundos x 1000", correct: false },
            { text: "Tempo entre o raio e o trovão em segundos x 1", correct: false },
            { text: "Tempo entre o raio e o trovão em segundos x 340", correct: true },
            { text: "Tempo entre o raio e o trovão em segundos x 500", correct: false }
        ]
    },
    {
        question: "O que é um catalisador em uma reação química?",
        answers: [
            { text: "Substância que aumenta a velocidade da reação sem ser consumida", correct: true },
            { text: "Substância que reduz a velocidade da reação", correct: false },
            { text: "Substância que não afeta a velocidade da reação", correct: false },
            { text: "Substância que é totalmente consumida durante a reação", correct: false }
        ]
    },
    {
        question: "O que é a lei da inércia?",
        answers: [
            { text: "Um objeto em repouso permanece em repouso, e um objeto em movimento permanece em movimento, a menos que uma força externa atue sobre ele", correct: true },
            { text: "A força aplicada em um objeto é igual à massa do objeto multiplicada pela aceleração", correct: false },
            { text: "A cada ação há uma reação de igual magnitude, mas em direção oposta", correct: false },
            { text: "A energia total de um sistema isolado permanece constante ao longo do tempo", correct: false }
        ]
    },
    {
        question: "O que é a lei da ação e reação?",
        answers: [
            { text: "Um objeto em repouso permanece em repouso, e um objeto em movimento permanece em movimento com velocidade constante", correct: false },
            { text: "A força aplicada em um objeto é igual à massa do objeto multiplicada pela aceleração", correct: false },
            { text: "A cada ação há uma reação de igual magnitude, mas em direção oposta", correct: true },
            { text: "A energia total de um sistema isolado permanece constante ao longo do tempo", correct: false }
        ]
    },
    {
        question: "O que é energia cinética?",
        answers: [
            { text: "Energia armazenada em um objeto devido à sua posição", correct: false },
            { text: "Energia devido à altura de um objeto acima da superfície da Terra", correct: false },
            { text: "Energia associada ao movimento de um objeto", correct: true },
            { text: "Energia armazenada em ligações químicas", correct: false }
        ]
    },
    {
        question: "O que é a força centrípeta?",
        answers: [
            { text: "Força que age na direção oposta ao movimento", correct: false },
            { text: "Força que mantém um objeto em movimento retilíneo uniforme", correct: false },
            { text: "Força que age em direção ao centro de uma trajetória circular", correct: true },
            { text: "Força que age perpendicularmente ao movimento", correct: false }
        ]
    },
    {
        question: "O que é temperatura?",
        answers: [
            { text: "Quantidade de calor armazenada em um objeto", correct: false },
            { text: "Medida da quantidade total de energia em um sistema", correct: false },
            { text: "Medida da energia cinética média das partículas em um sistema", correct: true },
            { text: "Quantidade de calor transferida entre dois corpos", correct: false }
        ]
    },
    {
        question: "Qual é a temperatura de zero absoluto na escala Kelvin?",
        answers: [
            { text: "0 K", correct: true },
            { text: "0 °C", correct: false },
            { text: "-273,15 °C", correct: false },
            { text: "-459,67 °F", correct: false }
        ]
    },
    {
        question: "O que é dilatação térmica?",
        answers: [
            { text: "Variação da temperatura em um objeto", correct: false },
            { text: "Variação na quantidade de calor em um objeto", correct: false },
            { text: "Variação no volume ou comprimento de um objeto devido ao aumento da temperatura", correct: true },
            { text: "Variação na condutividade térmica de um material", correct: false }
        ]
    },
    {
        question: "O que é condução térmica?",
        answers: [
            { text: "Transferência de calor por meio do movimento de partículas fluidas", correct: false },
            { text: "Transferência de calor por radiação eletromagnética", correct: false },
            { text: "Transferência de calor por contato direto entre partículas", correct: true },
            { text: "Transferência de calor por ondas sonoras", correct: false }
        ]
    },
    {
        question: "O que é um termômetro?",
        answers: [
            { text: "Dispositivo que mede a pressão atmosférica", correct: false },
            { text: "Dispositivo que mede a quantidade de calor em um objeto", correct: false },
            { text: "Dispositivo que mede a temperatura de um objeto ou ambiente", correct: true },
            { text: "Dispositivo que mede a velocidade do vento", correct: false }
        ]
    },
    {
        question: "Qual é a camada externa da Terra, composta por placas tectônicas?",
        answers: [
            { text: "Núcleo", correct: false },
            { text: "Manto", correct: true },
            { text: "Crosta", correct: false },
            { text: "Núcleo Externo", correct: false }
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
            { text: "Explica a origem da vida na Terra", correct: false },
            { text: "Descreve a formação das galáxias e a expansão do universo a partir de um estado inicial extremamente denso e quente", correct: true },
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
    {   question: 'Cientista que descobriu a vacina contra a raiva, e também contra a cólera de galinhas?',
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



//Q4 ENTRETENIMENTO



const qentre=[
    {
        question: 'Qual é o nome do desenho animado em que um grupo de jovens enfrenta criaturas sobrenaturais em sua cidade?',
        answers: [
            { text: 'He-Man', correct: false },
            { text: 'Transformers', correct: false },
            { text: 'Os Caça-Fantasmas', correct: true },
            { text: 'ThunderCats', correct: false }
        ]
    },
    {
        "question": "Qual é o título do filme de comédia de 2009 estrelado por Sandra Bullock e Ryan Reynolds, que segue uma chefe que força seu assistente a se casar com ela para evitar a deportação?",
        "answers": [
            {"text": "Se Beber, Não Case!", "correct": false},
            {"text": "O Lado Bom da Vida", "correct": false},
            {"text": "A Proposta", "correct": true},
            {"text": "Superbad: É Hoje", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do filme de comédia de 2004 que segue um grupo de amigos que se reúnem para uma viagem rodoviária para assistir a um casamento?",
        "answers": [
            {"text": "Entrando Numa Fria", "correct": false},
            {"text": "American Pie: A Primeira Vez é Inesquecível", "correct": false},
            {"text": "Se Beber, Não Case!", "correct": false},
            {"text": "Quatro Amigas e um Jeans Viajante", "correct": true}
        ]
    },
    {
        "question": "Qual é o título do filme de comédia de 2011 dirigido por Paul Feig, que segue as desventuras de duas mulheres desempregadas que decidem abrir um serviço de limpeza de crimes?",
        "answers": [
            {"text": "Missão Madrinha de Casamento", "correct": false},
            {"text": "As Bem-Armadas", "correct": false},
            {"text": "Mulheres ao Ataque", "correct": false},
            {"text": "A Escolha Perfeita", "correct": true}
        ]
    },
    {
        "question": "Qual é o nome do filme de comédia de 2005 estrelado por Steve Carell, que segue um homem de meia-idade que nunca teve relações sexuais tentando perder a virgindade?",
        "answers": [
            {"text": "Quem Vai Ficar com Mary?", "correct": false},
            {"text": "O Virgem de 40 Anos", "correct": true},
            {"text": "Quatro Amigas e um Jeans Viajante", "correct": false},
            {"text": "Superbad: É Hoje", "correct": false}
        ]
    },
    {
        "question": "Qual é o título do filme de comédia de 2009 que segue um grupo de amigos em uma viagem de despedida de solteiro em Las Vegas?",
        "answers": [
            {"text": "Se Beber, Não Case!", "correct": true},
            {"text": "Entrando Numa Fria", "correct": false},
            {"text": "Quem Vai Ficar com Mary?", "correct": false},
            {"text": "Apenas Uma Noite", "correct": false}
        ]
    },
    {
        "question": "Qual é o título do filme de 2013 dirigido por Steve McQueen, que narra a história de um homem livre que é sequestrado e vendido como escravo nos Estados Unidos?",
        "answers": [
            {"text": "12 Anos de Escravidão", "correct": true},
            {"text": "A Lista de Schindler", "correct": false},
            {"text": "O Jogo da Imitação", "correct": false},
            {"text": "O Discurso do Rei", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do filme de 2014 que segue a história real de um sniper do exército americano destacado no Iraque?",
        "answers": [
            {"text": "Clube de Compras Dallas", "correct": false},
            {"text": "Sniper Americano", "correct": true},
            {"text": "A Grande Aposta", "correct": false},
            {"text": "Histórias Cruzadas", "correct": false}
        ]
    },
    {
        "question": "Qual é o título do filme de 2010 que conta a história real de um homem que fica preso em uma caverna por mais de 60 dias e sobrevive bebendo sua própria urina?",
        "answers": [
            {"text": "127 Horas", "correct": true},
            {"text": "Em Busca da Terra do Nunca", "correct": false},
            {"text": "O Discurso do Rei", "correct": false},
            {"text": "O Jogo da Imitação", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do filme de 2009 que narra a história de um grupo de judeus que escapam de um campo de concentração nazista durante a Segunda Guerra Mundial?",
        "answers": [
            {"text": "O Leitor", "correct": false},
            {"text": "A Troca", "correct": false},
            {"text": "O Menino do Pijama Listrado", "correct": false},
            {"text": "Fuga de Sobibor", "correct": true}
        ]
    },
    {
        "question": "Qual é o título do filme de 2016 que segue a história real de uma equipe de jornalistas investigativos que expõe escândalos de abuso sexual na Igreja Católica?",
        "answers": [
            {"text": "O Grande Truque", "correct": false},
            {"text": "O Jornal", "correct": false},
            {"text": "Spotlight - Segredos Revelados", "correct": true},
            {"text": "A Queda de Wall Street", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do palhaço assassino no filme 'It: A Coisa'?",
        "answers": [
            {"text": "Pennywise", "correct": true},
            {"text": "Bozo", "correct": false},
            {"text": "Krampus", "correct": false},
            {"text": "Chucky", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome da família perturbadora que protagoniza o filme 'O Iluminado'?",
        "answers": [
            {"text": "Os Bates", "correct": false},
            {"text": "Os Torrance", "correct": true},
            {"text": "Os Sawyer", "correct": false},
            {"text": "Os Myers", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do demônio que assombra a protagonista no filme 'O Exorcista'?",
        "answers": [
            {"text": "Samara", "correct": false},
            {"text": "Valak", "correct": false},
            {"text": "Pazuzu", "correct": true},
            {"text": "Bughuul", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do diretor de cinema conhecido como 'Mestre do Terror', responsável por clássicos como 'Halloween' e 'Sexta-Feira 13'?",
        "answers": [
            {"text": "Wes Craven", "correct": false},
            {"text": "Dario Argento", "correct": false},
            {"text": "George A. Romero", "correct": false},
            {"text": "John Carpenter", "correct": true}
        ]
    },
    {
        "question": "Qual é o título do filme dirigido por Darren Aronofsky, que retrata a obsessão de uma bailarina por alcançar a perfeição?",
        "answers": [
            {"text": "Cisne Negro", "correct": true},
            {"text": "O Lutador", "correct": false},
            {"text": "Réquiem para um Sonho", "correct": false},
            {"text": "Noé", "correct": false}
        ]
    },
    {
        "question": "Qual é o filme de ação dirigido por James Cameron, que apresenta a batalha entre humanos e uma raça alienígena chamada Na'vi?",
        "answers": [
            {"text": "Avatar", "correct": true},
            {"text": "Transformers", "correct": false},
            {"text": "Guardiões da Galáxia", "correct": false},
            {"text": "Jurassic Park", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome da série de filmes de ação estrelada por Keanu Reeves, que segue um ex-assassino em busca de vingança?",
        "answers": [
            {"text": "Velozes & Furiosos", "correct": false},
            {"text": "Missão Impossível", "correct": false},
            {"text": "John Wick", "correct": true},
            {"text": "Duro de Matar", "correct": false}
        ]
    },
    {
        "question": "Qual é o título do filme de ação de 1988 estrelado por Bruce Willis, que se passa em um prédio invadido por terroristas?",
        "answers": [
            {"text": "O Resgate do Soldado Ryan", "correct": false},
            {"text": "O Vingador do Futuro", "correct": false},
            {"text": "Duro de Matar", "correct": false},
            {"text": "Duro de Matar", "correct": true}
        ]
    },
    {
        "question": "Qual é o nome do filme de ação que apresenta um grupo de mercenários de elite liderados por Sylvester Stallone?",
        "answers": [
            {"text": "Os Mercenários", "correct": true},
            {"text": "Rambo: A Última Batalha", "correct": false},
            {"text": "Creed: Nascido para Lutar", "correct": false},
            {"text": "Cobra", "correct": false}
        ]
    },
    {
        "question": "Qual é o título do filme de ação estrelado por Tom Cruise, que segue um piloto de caça da Marinha dos EUA?",
        "answers": [
            {"text": "Top Gun: Ases Indomáveis", "correct": true},
            {"text": "O Último Samurai", "correct": false},
            {"text": "Missão: Impossível", "correct": false},
            {"text": "Código de Conduta", "correct": false}
        ]
    },
    {
        "question": "Qual é o título do filme de fantasia de 2001 dirigido por Peter Jackson, que adapta o livro de J.R.R. Tolkien?",
        "answers": [
            {"text": "A Bússola de Ouro", "correct": false},
            {"text": "Harry Potter e a Pedra Filosofal", "correct": false},
            {"text": "O Senhor dos Anéis: A Sociedade do Anel", "correct": true},
            {"text": "Stardust - O Mistério da Estrela", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do filme de fantasia que segue um jovem órfão que descobre ser um feiticeiro e é levado para uma escola de magia?",
        "answers": [
            {"text": "Percy Jackson e o Ladrão de Raios", "correct": false},
            {"text": "O Mundo Mágico de Harry Potter", "correct": false},
            {"text": "Harry Potter e a Pedra Filosofal", "correct": true},
            {"text": "O Último Mago", "correct": false}
        ]
    },
    {
        "question": "Qual é o título do filme de fantasia de 1986 dirigido por Jim Henson, que segue uma jovem em uma jornada para salvar seu irmão de um rei tirano?",
        "answers": [
            {"text": "O Labirinto", "correct": true},
            {"text": "A História Sem Fim", "correct": false},
            {"text": "O Cristal Encantado", "correct": false},
            {"text": "A Princesa Prometida", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do filme de fantasia de 2005 que segue quatro irmãos que descobrem um mundo mágico além de um guarda-roupa?",
        "answers": [
            {"text": "O Senhor dos Anéis: As Duas Torres", "correct": false},
            {"text": "Percy Jackson e o Ladrão de Raios", "correct": false},
            {"text": "As Crônicas de Nárnia: O Leão, a Feiticeira e o Guarda-Roupa", "correct": true},
            {"text": "Harry Potter e o Cálice de Fogo", "correct": false}
        ]
    },
    {
        "question": "Qual é o título do filme de romance de 1990 estrelado por Patrick Swayze e Demi Moore, que apresenta a famosa cena de cerâmica ao som da música 'Unchained Melody'?",
        "answers": [
            {"text": "Titanic", "correct": false},
            {"text": "Dirty Dancing - Ritmo Quente", "correct": true},
            {"text": "Um Amor para Recordar", "correct": false},
            {"text": "Sintonia de Amor", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do filme de romance dirigido por Baz Luhrmann, que adapta a tragédia de William Shakespeare com um toque moderno?",
        "answers": [
            {"text": "Romeu + Julieta", "correct": true},
            {"text": "Crepúsculo", "correct": false},
            {"text": "De Repente é Amor", "correct": false},
            {"text": "P.S. Eu Te Amo", "correct": false}
        ]
    },
    {
        "question": "Qual é o título do filme de romance de 2004 que segue um casal que se apaixona em um cruzeiro, mas enfrenta dificuldades quando a mulher perde a memória em um acidente?",
        "answers": [
            {"text": "Diário de uma Paixão", "correct": false},
            {"text": "Antes do Amanhecer", "correct": false},
            {"text": "Para Sempre", "correct": false},
            {"text": "Como Se Fosse a Primeira Vez", "correct": true}
        ]
    },
    {
        "question": "Qual é o nome do filme de romance de 2001 dirigido por Richard Curtis, que segue as vidas interligadas de diferentes personagens durante o mês de dezembro em Londres?",
        "answers": [
            {"text": "Simplesmente Acontece", "correct": false},
            {"text": "Um Lugar Chamado Notting Hill", "correct": false},
            {"text": "O Diário de Bridget Jones", "correct": false},
            {"text": "Simplesmente Amor", "correct": true}
        ]
    },
    {
        "question": "Qual é o título do filme de romance de 2008 que segue o relacionamento turbulento de um casal que se conhece em um hospital psiquiátrico?",
        "answers": [
            {"text": "Querido John", "correct": false},
            {"text": "500 Dias com Ela", "correct": false},
            {"text": "Louca Obsessão", "correct": false},
            {"text": "E Se Fosse Verdade", "correct": true}
        ]
    },
    {
        "question": "Qual é o nome do filme baseado no romance de F. Scott Fitzgerald, que retrata a decadência da alta sociedade americana na década de 1920?",
        "answers": [
            {"text": "O Grande Gatsby", "correct": true},
            {"text": "Cidade dos Sonhos", "correct": false},
            {"text": "Gangues de Nova York", "correct": false},
            {"text": "O Artista", "correct": false}
        ]
    },
    {
        "question": "Qual é o título do filme de 2017 que apresenta uma família sendo aterrorizada por entidades paranormais após se mudarem para uma nova casa?",
        "answers": [
            {"text": "A Bruxa", "correct": false},
            {"text": "Hereditário", "correct": false},
            {"text": "Invocação do Mal 2", "correct": false},
            {"text": "Sobrenatural: A Última Chave", "correct": true}
        ]
    },
    {
        "question": "Em qual filme clássico Humphrey Bogart diz a famosa frase 'Acho que este é o começo de uma bela amizade'?",
        "answers": [
            {"text": "Casablanca", "correct": true},
            {"text": "O Falcão Maltês", "correct": false},
            {"text": "Uma Aventura na África", "correct": false},
            {"text": "À Beira do Abismo", "correct": false}
        ]
    },
    {
        "question": "Qual é o filme clássico de Charles Chaplin que retrata a vida durante a Grande Depressão e apresenta a icônica cena em que Chaplin dança com dois pãezinhos?",
        "answers": [
            {"text": "Tempos Modernos", "correct": true},
            {"text": "O Grande Ditador", "correct": false},
            {"text": "Luzes da Cidade", "correct": false},
            {"text": "O Garoto", "correct": false}
        ]
    },
    {
        "question": "Em qual filme clássico Marlon Brando interpreta o personagem Vito Corleone?",
        "answers": [
            {"text": "Cidadão Kane", "correct": false},
            {"text": "O Poderoso Chefão", "correct": true},
            {"text": "Apocalypse Now", "correct": false},
            {"text": "Um Bonde Chamado Desejo", "correct": false}
        ]
    },
    {
        "question": "Qual é o filme clássico de Stanley Kubrick que apresenta a famosa sequência de abertura ao som de 'Also Sprach Zarathustra' de Richard Strauss?",
        "answers": [
            {"text": "Laranja Mecânica", "correct": false},
            {"text": "2001: Uma Odisseia no Espaço", "correct": true},
            {"text": "O Iluminado", "correct": false},
            {"text": "De Olhos Bem Fechados", "correct": false}
        ]
    },
    {
        "question": "Qual é a parte do corpo que os zumbis geralmente tentam morder em muitas histórias de zumbis?",
        "answers": [
            {"text": "Perna", "correct": false},
            {"text": "Braço", "correct": false},
            {"text": "Pescoço", "correct": false},
            {"text": "Cérebro", "correct": true}
        ]
    },
    {
        "question": "Qual famoso diretor de filmes de terror é conhecido por popularizar o conceito moderno de zumbis em seu filme 'A Noite dos Mortos-Vivos'?",
        "answers": [
            {"text": "Alfred Hitchcock", "correct": false},
            {"text": "Wes Craven", "correct": false},
            {"text": "Tobe Hooper", "correct": false},
            {"text": "George A. Romero", "correct": true}
        ]
    },
    {
        "question": "Qual é o nome do filme estrelado por Clint Eastwood, que é frequentemente considerado um dos melhores filmes de faroeste de todos os tempos?",
        "answers": [
            {"text": "A Morte Anda a Cavalo", "correct": false},
            {"text": "Onde Começa o Inferno", "correct": false},
            {"text": "Por um Punhado de Dólares", "correct": true},
            {"text": "Os Imperdoáveis", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do personagem principal de 'Django Livre', dirigido por Quentin Tarantino e estrelado por Jamie Foxx?",
        "answers": [
            {"text": "Django", "correct": true},
            {"text": "Billy the Kid", "correct": false},
            {"text": "Wyatt Earp", "correct": false},
            {"text": "Doc Holliday", "correct": false}
        ]
    },
    {
        "question": "Em qual filme de faroeste John Wayne ganhou seu único Oscar de Melhor Ator?",
        "answers": [
            {"text": "Bravura Indômita", "correct": false},
            {"text": "O Homem que Matou o Facínora", "correct": true},
            {"text": "Rio Vermelho", "correct": false},
            {"text": "Rastros de Ódio", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do filme de faroeste que apresenta uma batalha épica no clímax, conhecida como 'o tiroteio no OK Corral'?",
        "answers": [
            {"text": "O Último Pistoleiro", "correct": false},
            {"text": "Tombstone", "correct": true},
            {"text": "Os Imperdoáveis", "correct": false},
            {"text": "Gunfight at the O.K. Corral", "correct": false}
        ]
    },
    {
        "question": "Qual é o título do filme de faroeste dirigido por Sergio Leone e estrelado por Henry Fonda, que é conhecido por seu desfecho chocante?",
        "answers": [
            {"text": "Por um Punhado de Dólares", "correct": false},
            {"text": "Três Homens em Conflito", "correct": false},
            {"text": "Era Uma Vez no Oeste", "correct": true},
            {"text": "Era Uma Vez na América", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do filme de faroeste de 1992, dirigido por Clint Eastwood, que conta a história de um pistoleiro aposentado que aceita um último trabalho?",
        "answers": [
            {"text": "Impiedoso", "correct": false},
            {"text": "O Fora da Lei", "correct": false},
            {"text": "Os Imperdoáveis", "correct": true},
            {"text": "Um Mundo Perfeito", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do filme de faroeste que conta a história de um grupo de pistoleiros contratados para proteger uma vila mexicana de bandidos?",
        "answers": [
            {"text": "Sete Homens e um Destino", "correct": true},
            {"text": "Os Oito Odiados", "correct": false},
            {"text": "Rastros de Ódio", "correct": false},
            {"text": "Tombstone", "correct": false}
        ]
    },
    {
        "question": "Quem dirigiu o filme 'Rastros de Ódio', estrelado por John Wayne, que é frequentemente citado como um dos maiores filmes de faroeste já feitos?",
        "answers": [
            {"text": "Sergio Leone", "correct": false},
            {"text": "John Ford", "correct": true},
            {"text": "Sam Peckinpah", "correct": false},
            {"text": "Howard Hawks", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do filme de faroeste que se passa durante a Guerra Civil Americana e é centrado em torno de uma missão para resgatar uma garota sequestrada?",
        "answers": [
            {"text": "Django Livre", "correct": false},
            {"text": "Bravura Indômita", "correct": true},
            {"text": "Onde Começa o Inferno", "correct": false},
            {"text": "Os Imperdoáveis", "correct": false}
        ]
    },
    {
        question: 'Qual é o número da plataforma em que os alunos pegam o trem para a escola de Hogwarts na saga Harry Potter?',
        answers: [
            { text: '8 3/4', correct: false },
            { text: '9 3/4', correct: true },
            { text: '10 1/2', correct: false },
            { text: '7 1/2', correct: false }
        ]
    },
    {
        question: 'Em qual filme, a protagonista é humilhada com um balde de sangue derrubado sobre sua cabeça durante o baile da escola?',
        answers: [
            { text: 'Meninas Malvadas', correct: false },
            { text: 'Carrie, A Estranha', correct: true },
            { text: 'De Repente 30', correct: false },
            { text: 'A Mentira', correct: false }
        ]
    },
    {
        question: 'Qual é o nome agente secreto da ficção conhecido pelo número 007?',
        answers: [
            { text: 'Jason Bourne', correct: false },
            { text: 'Ethan Hunt', correct: false },
            { text: 'James Bond', correct: true },
            { text: 'Jack Ryan', correct: false }
        ]
    },
    {
        question: 'Em que ano estreou o filme Titanic, estrelado por Leonardo DiCaprio e Kate Winslet?',
        answers: [
            { text: '1997', correct: true },
            { text: '1995', correct: false },
            { text: '1999', correct: false },
            { text: '1996', correct: false }
        ]
    },
    {
        question: 'Qual fruta envenenada comeu a Branca de Neve?',
        answers: [
            { text: 'Maçã', correct: true },
            { text: 'Cereja', correct: false },
            { text: 'Pêssego', correct: false },
            { text: 'Uva', correct: false }
        ]
    },
    {
        question: 'Como se chamam os dois melhores amigos do personagem Harry Potter?',
        answers: [
            { text: 'Ron Weasley e Hermione Granger', correct: true },
            { text: 'Draco Malfoy e Luna Lovegood', correct: false },
            { text: 'Neville Longbottom e Ginny Weasley', correct: false },
            { text: 'Fred Weasley e George Weasley', correct: false }
        ]
    },
    {
        question: 'Qual é a cor dos sapatos do Mickey Mouse?',
        answers: [
            { text: 'Vermelho', correct: true },
            { text: 'Azul', correct: false },
            { text: 'Amarelo', correct: false },
            { text: 'Preto', correct: false }
        ]
    },
    {
        question: 'O personagem Sabidão estrela em qual filme?',
        answers: [
            { text: 'A Pequena Sereia', correct: false },
            { text: 'O Rei Leão', correct: false },
            { text: 'Aladdin', correct: true },
            { text: 'Mulan', correct: false }
        ]
    },
    {
        question: 'Qual é o desenho animado sobre uma equipe de mutantes com habilidades especiais liderada pelo Professor Xavier?',
        answers: [
            { text: 'She-Ra', correct: false },
            { text: 'Os Smurfs', correct: false },
            { text: 'Turma da Mônica', correct: false },
            { text: 'X-Men', correct: true }
        ]
    },
    {
        question: 'Em que desenho animado um grupo de adolescentes e um cachorro viajam em uma van chamada Máquina Mistério para resolver mistérios?',
        answers: [
            { text: 'Cavalo de Fogo', correct: false },
            { text: 'Scooby-Doo', correct: true },
            { text: 'Caverna do Dragão', correct: false },
            { text: 'Pole Position', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do desenho animado em que um guerreiro bárbaro com uma espada mágica luta contra vilões?',
        answers: [
            { text: 'SilverHawks', correct: false },
            { text: 'Bravestarr', correct: false },
            { text: 'He-Man', correct: true },
            { text: 'She-Ra', correct: false }
        ]
    },
    {
        question: 'Qual é o desenho animado sobre um grupo de seres pequenos e azuis que vivem em uma vila?',
        answers: [
            { text: 'Os Caça-Fantasmas', correct: false },
            { text: 'Smurfs', correct: true },
            { text: 'Cavalo de Fogo', correct: false },
            { text: 'Punky Brewster', correct: false }
        ]
    },
    {
        question: 'Em que desenho animado um grupo de robôs alienígenas se transforma em veículos e dispositivos eletrônicos?',
        answers: [
            { text: 'Transformers', correct: true },
            { text: 'ThunderCats', correct: false },
            { text: 'SilverHawks', correct: false },
            { text: 'Bravestarr', correct: false }
        ]
    },
    {
        question: 'Qual é o desenho animado em que um grupo de heróis meio humanos e meio felinos protege seu reino?',
        answers: [
            { text: 'He-Man', correct: false },
            { text: 'Cavalo de Fogo', correct: false },
            { text: 'ThunderCats', correct: true },
            { text: 'She-Ra', correct: false }
        ]
    },
    {
        question: 'Qual é o desenho animado que segue as aventuras de uma equipe de super-heróis adolescentes com habilidades únicas?',
        answers: [
            { text: 'Turma da Mônica', correct: false },
            { text: 'X-Men', correct: false },
            { text: 'Caverna do Dragão', correct: false },
            { text: 'Teen Titans', correct: true }
        ]
    },
    {
        question: 'Em que desenho animado um grupo de humanoides metálicos espaciais protege o universo de forças do mal?',
        answers: [
            { text: 'SilverHawks', correct: true },
            { text: 'Bravestarr', correct: false },
            { text: 'Transformers', correct: false },
            { text: 'ThunderCats', correct: false }
        ]
    },
    {
        question: 'Qual é o desenho animado sobre um grupo de criaturas fofas e coloridas que vivem em uma terra mágica?',
        answers: [
            { text: 'Ursinhos carinhosos', correct: true },
            { text: 'Rainbow Brite', correct: false },
            { text: 'Punky - A levada da breca', correct: false },
            { text: 'Os Snorks', correct: false }
        ]
    },
    {
        question: 'Em que desenho animado um grupo de garotas com poderes mágicos luta contra vilões?',
        answers: [
            { text: 'Cavalo de Fogo', correct: false },
            { text: 'As super poderosas', correct: true },
            { text: 'ThunderCats', correct: false },
            { text: 'He-Man', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do desenho animado em que os personagens tomavam um suco roxo e saiam pulando?',
        answers: [
            { text: 'Caverna do Dragão', correct: false },
            { text: 'Os Ursinhos Gummi', correct: true },
            { text: 'She-Ra', correct: false },
            { text: 'Transformers', correct: false }
        ]
    },
    {
        question: 'Qual o filme em que um robô alienígena vem para a Terra e se transforma em um carro esportivo amarelo?',
        answers: [
            { text: 'SilverHawks', correct: false },
            { text: 'Transformers', correct: true },
            { text: 'Bravestarr', correct: false },
            { text: 'He-Man', correct: false }
        ]
    },
    {
        question: 'Em que desenho animado adolescentes ganham poderes de um anel mágico e lutam contra forças do mal?',
        answers: [
            { text: 'He-Man', correct: false },
            { text: 'ThunderCats', correct: false },
            { text: 'Caverna do Dragão', correct: false },
            { text: 'Capitão Planeta', correct: true }
        ]
    },
    {
        question: 'Em que desenho animado um grupo de heróis humanoides com poderes especiais protege a Terra?',
        answers: [
            { text: 'ThunderCats', correct: false },
            { text: 'He-Man', correct: false },
            { text: 'SilverHawks', correct: false },
            { text: 'Os Defensores da Terra', correct: true }
        ]
    },
    {
        question: 'Em que desenho animado um grupo de crianças luta contra monstros digitais em um mundo virtual?',
        answers: [
            { text: 'Digimon', correct: true },
            { text: 'Cavaleiros do Zodíaco', correct: false },
            { text: 'Pokémon', correct: false },
            { text: 'Yu Yu Hakusho', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do desenho animado sobre quatro tartarugas mutantes que são treinadas em artes marciais?',
        answers: [
            { text: 'ThunderCats', correct: false },
            { text: 'As Tartarugas Ninja', correct: true },
            { text: 'Os Cavaleiros do Zodíaco', correct: false },
            { text: 'Os Jovens Titãs', correct: false }
        ]
    },
    {
        question: 'Em que desenho animado um grupo de crianças enfrenta monstros reais e paranormais?',
        answers: [
            { text: 'Os Castores Pirados', correct: false },
            { text: 'Caverna do Dragão', correct: false },
            { text: 'Goosebumps', correct: true },
            { text: 'Animaniacs', correct: false }
        ]
    },
    {
        question: 'Qual banda/cantor lançou o álbum "Thriller" em 1982, que se tornou o álbum mais vendido de todos os tempos?',
        answers: [
            { text: 'Queen', correct: false },
            { text: 'The Police', correct: false },
            { text: 'Michael Jackson', correct: true },
            { text: 'U2', correct: false }
        ]
    },
    {
        question: 'Qual artista ficou famoso por sua música "Like a Virgin" em 1984?',
        answers: [
            { text: 'Madonna', correct: true },
            { text: 'Cyndi Lauper', correct: false },
            { text: 'Prince', correct: false },
            { text: 'Whitney Houston', correct: false }
        ]
    },
    {
        question: 'Qual banda britânica lançou o álbum "The Joshua Tree" em 1987?',
        answers: [
            { text: 'The Rolling Stones', correct: false },
            { text: 'The Cure', correct: false },
            { text: 'U2', correct: true },
            { text: 'Depeche Mode', correct: false }
        ]
    },
    {
        question: 'Qual música do Queen, lançada em 1980, se tornou um hino da banda?',
        answers: [
            { text: 'Bohemian Rhapsody', correct: false },
            { text: 'Under Pressure', correct: false },
            { text: 'Radio Gaga', correct: false },
            { text: 'Another One Bites the Dust', correct: true }
        ]
    },
    {
        question: 'Qual artista lançou a música "Billie Jean" em 1983, que se tornou um sucesso internacional?',
        answers: [
            { text: 'George Michael', correct: false },
            { text: 'David Bowie', correct: false },
            { text: 'Prince', correct: false },
            { text: 'Michael Jackson', correct: true }
        ]
    },
    {
        question: 'Em 1985, qual supergrupo lançou a música "We Are the World" para arrecadar fundos para a África?',
        answers: [
            { text: 'Band Aid', correct: false },
            { text: 'USA for Africa', correct: true },
            { text: 'The Traveling Wilburys', correct: false },
            { text: 'Hear n Aid', correct: false }
        ]
    },
    {
        question: 'Qual artista lançou o álbum "Purple Rain" em 1984?',
        answers: [
            { text: 'Prince', correct: true },
            { text: 'Madonna', correct: false },
            { text: 'David Bowie', correct: false },
            { text: 'Whitney Houston', correct: false }
        ]
    },
    {
        question: 'Qual banda lançou a música "Sweet Child o\' Mine" em 1987?',
        answers: [
            { text: 'Guns N\' Roses', correct: true },
            { text: 'Bon Jovi', correct: false },
            { text: 'Def Leppard', correct: false },
            { text: 'Aerosmith', correct: false }
        ]
    },
    {
        question: 'Qual música do Rick Astley se tornou um meme da internet conhecido como "Rickrolling"?',
        answers: [
            { text: 'Together Forever', correct: false },
            { text: 'She Wants to Dance with Me', correct: false },
            { text: 'Never Gonna Give You Up', correct: true },
            { text: 'Take Me to Your Heart', correct: false }
        ]
    },
    {
        question: 'Qual banda lançou o álbum "Back in Black" em 1980?',
        answers: [
            { text: 'AC/DC', correct: true },
            { text: 'Metallica', correct: false },
            { text: 'Iron Maiden', correct: false },
            { text: 'Led Zeppelin', correct: false }
        ]
    },
    {
        question: 'Qual banda britânica lançou o álbum "Brothers in Arms" em 1985?',
        answers: [
            { text: 'The Police', correct: false },
            { text: 'U2', correct: false },
            { text: 'Dire Straits', correct: true },
            { text: 'Queen', correct: false }
        ]
    },
    {
        question: 'Qual música da banda A-ha, lançada em 1984, se tornou um grande sucesso com seu videoclipe inovador?',
        answers: [
            { text: 'Take On Me', correct: true },
            { text: 'The Sun Always Shines on TV', correct: false },
            { text: 'Hunting High and Low', correct: false },
            { text: 'Stay on These Roads', correct: false }
        ]
    },
    {
        question: 'Em 1983, qual álbum de Michael Jackson inclui os sucessos "Beat It" e "Billie Jean"?',
        answers: [
            { text: 'Bad', correct: false },
            { text: 'Dangerous', correct: false },
            { text: 'Thriller', correct: true },
            { text: 'Off the Wall', correct: false }
        ]
    },
    {
        question: 'Qual dupla lançou a música "I ve Had The Time of My Life" em 1987, presente na trilha sonora do filme Dirty Dancing?',
        answers: [
            { text: 'Daryl Hall & John Oates', correct: false },
            { text: 'Air Supply', correct: false },
            { text: 'Patrick Swayze & Jennifer Warnes', correct: true },
            { text: 'Wham!', correct: false }
        ]
    },
    {
        question: 'Qual cantor britânico lançou a música "Careless Whisper" em 1984?',
        answers: [
            { text: 'Elton John', correct: false },
            { text: 'David Bowie', correct: false },
            { text: 'George Michael', correct: true },
            { text: 'Phil Collins', correct: false }
        ]
    },
    {
        question: 'Qual banda lançou o álbum "The Final Countdown" em 1986?',
        answers: [
            { text: 'Europe', correct: true },
            { text: 'Scorpions', correct: false },
            { text: 'Bon Jovi', correct: false },
            { text: 'Def Leppard', correct: false }
        ]
    },
    {
        question: 'Qual artista lançou a música "Every Breath You Take" em 1983?',
        answers: [
            { text: 'Phil Collins', correct: false },
            { text: 'Sting', correct: true },
            { text: 'Billy Joel', correct: false },
            { text: 'Elton John', correct: false }
        ]
    },
    {
        question: 'Qual álbum da banda Guns N\' Roses inclui a música "Sweet Child o\' Mine"?',
        answers: [
            { text: 'Use Your Illusion I', correct: false },
            { text: 'Appetite for Destruction', correct: true },
            { text: 'Use Your Illusion II', correct: false },
            { text: 'Chinese Democracy', correct: false }
        ]
    },
    {
        question: 'A banda de rock conhecida como "Os Fab Four" é uma homenagem a qual banda?',
        answers: [
            { text: 'The Rolling Stones', correct: false },
            { text: 'Led Zeppelin', correct: false },
            { text: 'The Who', correct: false },
            { text: 'The Beatles', correct: true }
        ]
    },
    {
        question: 'Qual álbum é frequentemente considerado um dos melhores da história do rock e inclui faixas como "Stairway to Heaven" e "Black Dog"?',
        answers: [
            { text: 'The Dark Side of the Moon (Pink Floyd)', correct: false },
            { text: 'Led Zeppelin IV', correct: true },
            { text: 'Abbey Road (The Beatles)', correct: false },
            { text: 'The Wall (Pink Floyd)', correct: false }
        ]
    },
    {
        question: 'Quem é conhecido como "Rei do Rock"?',
        answers: [
            { text: 'Mick Jagger', correct: false },
            { text: 'Elvis Presley', correct: true },
            { text: 'Freddie Mercury', correct: false },
            { text: 'Bruce Springsteen', correct: false }
        ]
    },
    {
        question: 'Qual banda é famosa por seu álbum "The Wall" e seu estilo progressivo e conceitual?',
        answers: [
            { text: 'The Rolling Stones', correct: false },
            { text: 'The Who', correct: false },
            { text: 'Led Zeppelin', correct: false },
            { text: 'Pink Floyd', correct: true }
        ]
    },
    {
        question: 'No final de qual década o movimento punk rock emergiu, trazendo bandas como Ramones e Sex Pistols?',
        answers: [
            { text: 'Década de 1950', correct: false },
            { text: 'Década de 1960', correct: false },
            { text: 'Década de 1970', correct: true },
            { text: 'Década de 1980', correct: false }
        ]
    },
    {
        question: 'Qual é a guitarra lendária tocada por Jimi Hendrix?',
        answers: [
            { text: 'Fender Telecaster', correct: false },
            { text: 'Gibson Les Paul', correct: false },
            { text: 'Fender Stratocaster', correct: true },
            { text: 'Gibson SG', correct: false }
        ]
    },
    {
        question: 'Qual vocalista icônico liderou a banda Queen?',
        answers: [
            { text: 'Robert Plant', correct: false },
            { text: 'Mick Jagger', correct: false },
            { text: 'Freddie Mercury', correct: true },
            { text: 'Axl Rose', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do festival de rock histórico que ocorreu em 1969 e contou com apresentações de Jimi Hendrix, Janis Joplin e The Who?',
        answers: [
            { text: 'Woodstock', correct: true },
            { text: 'Coachella', correct: false },
            { text: 'Lollapalooza', correct: false },
            { text: 'Monterey Pop Festival', correct: false }
        ]
    },
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
        question: 'Qual o único filme de língua portuguesa ganhou o Oscar de Melhor Filme Internacional?',
        answers: [
            { text: 'Central do Brasil', correct: false },
            { text: 'Cidade de Deus', correct: false },
            { text: 'O Pagador de Promessas', correct: false },
            { text: 'Orfeu Negro', correct: true }
        ]
    },
    {
        question: 'Quem é o diretor de "Cidade de Deus"?',
        answers: [
            { text: 'Fernando Meirelles', correct: false },
            { text: 'Walter Salles', correct: false },
            { text: 'Glauber Rocha', correct: false },
            { text: 'Fernando Meirelles e Kátia Lund', correct: true }
        ]
    },
    {
        question: 'Qual atriz brasileira foi indicada ao Oscar de Melhor Atriz?',
        answers: [
            { text: 'Fernanda Montenegro', correct: true },
            { text: 'Sônia Braga', correct: false },
            { text: 'Gloria Pires', correct: false },
            { text: 'Regina Casé', correct: false }
        ]
    },
    {
        question: 'Em que cidade se passa a trama de "Cidade de Deus"?',
        answers: [
            { text: 'Recife', correct: false },
            { text: 'Salvador', correct: false },
            { text: 'Rio de Janeiro', correct: true },
            { text: 'São Paulo', correct: false }
        ]
    },
    {
        question: 'Quem é o diretor do filme "Tropa de Elite"?',
        answers: [
            { text: 'José Padilha', correct: true },
            { text: 'Walter Salles', correct: false },
            { text: 'Fernando Meirelles', correct: false },
            { text: 'Kátia Lund', correct: false }
        ]
    },
    {
        question: 'Qual filme brasileiro recebeu a Palma de Ouro em Cannes?',
        answers: [
            { text: 'Aquarius', correct: false },
            { text: 'O Som ao Redor', correct: false },
            { text: 'Bacurau', correct: false },
            { text: 'O Pagador de Promessas', correct: true }
        ]
    },
    {
        question: 'Qual é o título do filme brasileiro que ficou conhecido como "O Cangaceiro"?',
        answers: [
            { text: 'Lampião, Rei do Cangaço', correct: false },
            { text: 'Deus e o Diabo na Terra do Sol', correct: false },
            { text: 'Cangaceiro', correct: true },
            { text: 'O Baile Perfumado', correct: false }
        ]
    },
    {
        question: 'Quem dirigiu o filme "Aquarius"?',
        answers: [
            { text: 'Kleber Mendonça Filho', correct: true },
            { text: 'Fernando Meirelles', correct: false },
            { text: 'Walter Salles', correct: false },
            { text: 'Anna Muylaert', correct: false }
        ]
    },
    {
        question: 'Qual filme brasileiro recebeu uma indicação ao Oscar de Melhor Animação?',
        answers: [
            { text: 'O Menino e o Mundo', correct: true },
            { text: 'Rio', correct: false },
            { text: 'Uma História de Amor e Fúria', correct: false },
            { text: 'Meu Malvado Favorito', correct: false }
        ]
    },
    {
        question: 'Em que ano foi lançado o filme "Tropa de Elite"?',
        answers: [
            { text: '2004', correct: false },
            { text: '2006', correct: true },
            { text: '2008', correct: false },
            { text: '2010', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do protagonista de "O Auto da Compadecida"?',
        answers: [
            { text: 'Chicó', correct: false },
            { text: 'João Grilo', correct: true },
            { text: 'Padeiro', correct: false },
            { text: 'Padre Cícero', correct: false }
        ]
    },
    {
        question: 'Quem é a diretora do filme "Que Horas Ela Volta?"?',
        answers: [
            { text: 'Anna Muylaert', correct: true },
            { text: 'Fernanda Montenegro', correct: false },
            { text: 'Fernando Meirelles', correct: false },
            { text: 'Glauber Rocha', correct: false }
        ]
    },
    {
        question: 'Qual ator interpretou o personagem Zé Pequeno no filme "Cidade de Deus"?',
        answers: [
            { text: 'Seu Jorge', correct: false },
            { text: 'Wagner Moura', correct: false },
            { text: 'Matheus Nachtergaele', correct: false },
            { text: 'Leandro Firmino', correct: true }
        ]
    },
    {
        question: 'Quem é o diretor do filme "O Pagador de Promessas"?',
        answers: [
            { text: 'Cacá Diegues', correct: false },
            { text: 'Walter Salles', correct: false },
            { text: 'Glauber Rocha', correct: false },
            { text: 'Anselmo Duarte', correct: true }
        ]
    },
    {
        question: 'Qual é o nome da personagem principal de "A Hora da Estrela"?',
        answers: [
            { text: 'Clara', correct: false },
            { text: 'Macabéa', correct: true },
            { text: 'Francisca', correct: false },
            { text: 'Ana', correct: false }
        ]
    },
    {
        question: 'Qual é o título do primeiro filme de longa-metragem de Glauber Rocha?',
        answers: [
            { text: 'Deus e o Diabo na Terra do Sol', correct: true },
            { text: 'O Pagador de Promessas', correct: false },
            { text: 'Vidas Secas', correct: false },
            { text: 'Terra em Transe', correct: false }
        ]
    },
    {
        question: 'Qual ator brasileiro é conhecido por seus papéis em "O Quatrilho" e "Eu, Tu, Eles"?',
        answers: [
            { text: 'Matheus Nachtergaele', correct: false },
            { text: 'Lázaro Ramos', correct: false },
            { text: 'Wagner Moura', correct: false },
            { text: 'Marco Nanini', correct: true }
        ]
    },
    {
        question: 'Qual cineasta brasileiro é considerado o precursor do Cinema Novo?',
        answers: [
            { text: 'Glauber Rocha', correct: true },
            { text: 'Nelson Pereira dos Santos', correct: false },
            { text: 'Hector Babenco', correct: false },
            { text: 'Carlos Diegues', correct: false }
        ]
    },
    {
        question: "Qual é o filme mais longo da trilogia 'O Senhor dos Anéis'?",
        answers: [
            { text: "A Sociedade do Anel", correct: false },
            { text: "As Duas Torres", correct: false },
            { text: "O Retorno do Rei", correct: true },
            { text: "Nenhum, todos têm a mesma duração", correct: false }
        ]
    },
    {
        question: "Qual filme é conhecido pela frase 'A vida é como uma caixa de chocolates'?",
        answers: [
            { text: "Forrest Gump", correct: true },
            { text: "Titanic", correct: false },
            { text: "Pulp Fiction", correct: false },
            { text: "O Poderoso Chefão", correct: false }
        ]
    },
    {
        question: "Quem interpretou o papel de Jack Dawson em 'Titanic'?",
        answers: [
            { text: "Leonardo DiCaprio", correct: true },
            { text: "Brad Pitt", correct: false },
            { text: "Johnny Depp", correct: false },
            { text: "Tom Hanks", correct: false }
        ]
    },
    {
        question: "Qual é o filme de animação da Disney que apresenta uma princesa chamada Elsa?",
        answers: [
            { text: "A Bela e a Fera", correct: false },
            { text: "Cinderela", correct: false },
            { text: "Frozen: Uma Aventura Congelante", correct: true },
            { text: "Moana", correct: false }
        ]
    },
    {
        question: "Quem dirigiu o filme 'A Origem'?",
        answers: [
            { text: "Christopher Nolan", correct: true },
            { text: "David Fincher", correct: false },
            { text: "Quentin Tarantino", correct: false },
            { text: "James Cameron", correct: false }
        ]
    },
    {
        question: "Qual é o filme de Quentin Tarantino lançado em 1994 que se tornou um clássico cult?",
        answers: [
            { text: "Pulp Fiction", correct: true },
            { text: "Cães de Aluguel", correct: false },
            { text: "Kill Bill", correct: false },
            { text: "Bastardos Inglórios", correct: false }
        ]
    },
    {
        question: "Qual é o filme que narra a história de um adolescente com habilidades de aranha que luta contra o crime?",
        answers: [
            { text: "Superman", correct: false },
            { text: "Batman: O Cavaleiro das Trevas", correct: false },
            { text: "Homem-Aranha: De Volta ao Lar", correct: true },
            { text: "X-Men: Dias de um Futuro Esquecido", correct: false }
        ]
    },
    {
        question: "Qual é o filme que apresenta a história de um grupo de amigos que fazem uma viagem para Las Vegas antes do casamento de um deles?",
        answers: [
            { text: "Se Beber, Não Case!", correct: true },
            { text: "Ted", correct: false },
            { text: "A Ressaca", correct: false },
            { text: "Jogando com Prazer", correct: false }
        ]
    },
    {
        question: "Quem foi a primeira pessoa a dar voz a Mickey Mouse?",
        answers: [
            { text: "Lillian Disney", correct: false },
            { text: "Walt Disney", correct: true },
            { text: "Roy Disney", correct: false },
            { text: "Ub Iwerks", correct: false }
        ]
    },
    {
        question: "Qual é o filme que narra a história da rainha Elsa e sua irmã Anna, ambientado no reino de Arendelle?",
        answers: [
            { text: "A Bela e a Fera", correct: false },
            { text: "Cinderela", correct: false },
            { text: "Frozen: Uma Aventura Congelante", correct: true },
            { text: "Moana", correct: false }
        ]
    },
    {
        question: "Qual é o filme de ficção científica lançado em 1982, dirigido por Ridley Scott, que se passa em um futuro distópico e apresenta replicantes?",
        answers: [
            { text: "Matrix", correct: false },
            { text: "Blade Runner", correct: true },
            { text: "Star Wars: Uma Nova Esperança", correct: false },
            { text: "O Quinto Elemento", correct: false }
        ]
    },
    {
        question: "Quem interpretou o personagem principal em 'O Lobo de Wall Street'?",
        answers: [
            { text: "Leonardo DiCaprio", correct: true },
            { text: "Brad Pitt", correct: false },
            { text: "Johnny Depp", correct: false },
            { text: "Tom Hanks", correct: false }
        ]
    },
    {
        question: "Qual é o filme sobre um grupo de pessoas tentando sobreviver a um apocalipse zumbi, dirigido por Zack Snyder e lançado em 2004?",
        answers: [
            { text: "Guerra Mundial Z", correct: false },
            { text: "Extermínio", correct: false },
            { text: "Madrugada dos Mortos", correct: true },
            { text: "Resident Evil: O Hospedeiro", correct: false }
        ]
    },
    {
        question: "Qual foi o primeiro personagem criado por Walt Disney?",
        answers: [
            { text: "Mickey Mouse", correct: false },
            { text: "Minnie", correct: false },
            { text: "Pateta", correct: false },
            { text: "Oswald, o Lucky Rabbit", correct: true }
        ]
    },
    {
        question: "Qual é o nome da leoa que acompanha a infância e depois a vida adulta de Simba em Rei Leão?",
        answers: [
            { text: "Rafiki", correct: false },
            { text: "Nala", correct: true },
            { text: "Hannah", correct: false },
            { text: "Kiara", correct: false }
        ]
    },
    {
        question: "Qual é o animal que desempenha o papel de consciência de Pinóquio?",
        answers: [
            { text: "Gafanhoto", correct: false },
            { text: "Grilo", correct: true },
            { text: "Formiga", correct: false },
            { text: "Louva-a-Deus", correct: false }
        ]
    },
    {
        question: "Como se chamam os três sobrinhos de Donald?",
        answers: [
            { text: "Pedrinho, Tiaguinho e Manelinho", correct: false },
            { text: "Zezinho, Paulinho e Luisinho", correct: false },
            { text: "Huguinho, Zezinho e Luisinho", correct: true },
            { text: "Manelinho, Zezinho e Huguinho", correct: false }
        ]
    },
    {
        question: "São dragões de 'Game of Thrones', exceto?",
        answers: [
            { text: "Smaug", correct: true },
            { text: "Viserion", correct: false },
            { text: "Drogon", correct: false },
            { text: "Rhaegal", correct: false }
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
        question: "Qual a maior indústria de cinema do mundo, que produz atualmente mais de 1500 filmes ao ano?",
        answers: [
            { text: "Bollywood", correct: true },
            { text: "Hollywood", correct: false },
            { text: "ChinaWood", correct: false },
            { text: "Nollywood", correct: false }
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
    {
        question: "Qual é o filme em que Leonardo DiCaprio interpreta um ladrão de ideias que invade os sonhos das pessoas?",
        answers: [
            { text: "A Origem", correct: true },
            { text: "Interstellar", correct: false },
            { text: "Efeito Borboleta", correct: false },
            { text: "Matrix", correct: false }
        ]
    },
    {
        question: "Quem dirigiu o filme 'Pulp Fiction', lançado em 1994?",
        answers: [
            { text: "Christopher Nolan", correct: false },
            { text: "Martin Scorsese", correct: false },
            { text: "Quentin Tarantino", correct: true },
            { text: "David Fincher", correct: false }
        ]
    },
    {
        question: "Em que filme os personagens Andy Dufresne e Ellis 'Red' Redding são amigos na prisão de Shawshank?",
        answers: [
            { text: "O Poderoso Chefão", correct: false },
            { text: "A Lista de Schindler", correct: false },
            { text: "Um Sonho de Liberdade", correct: true },
            { text: "O Resgate do Soldado Ryan", correct: false }
        ]
    },
    {
        question: "Qual é o nome do robô amigável que ajuda a protagonista em 'Wall-E'?",
        answers: [
            { text: "C-3PO", correct: false },
            { text: "Eva", correct: true },
            { text: "R2-D2", correct: false },
            { text: "Hal 9000", correct: false }
        ]
    },
    {
        question: "Quem dirigiu o filme 'O Iluminado' baseado na obra de Stephen King?",
        answers: [
            { text: "Alfred Hitchcock", correct: false },
            { text: "Stanley Kubrick", correct: true },
            { text: "John Carpenter", correct: false },
            { text: "Steven Spielberg", correct: false }
        ]
    },
    {
        question: "Qual é o filme que narra a história de um médico que se transforma em um monstro verde quando fica com raiva?",
        answers: [
            { text: "Hulk", correct: false },
            { text: "Homem-Aranha", correct: false },
            { text: "Doutor Estranho", correct: false },
            { text: "O Incrível Hulk", correct: true }
        ]
    },
    {
        question: "Em que filme Tom Hanks interpreta um personagem que é obrigado a viver em um aeroporto?",
        answers: [
            { text: "Forrest Gump", correct: false },
            { text: "Náufrago", correct: false },
            { text: "Terminal", correct: true },
            { text: "O Resgate do Soldado Ryan", correct: false }
        ]
    },
    {
        question: "Qual é o nome da protagonista feminina em 'La La Land: Cantando Estações'?",
        answers: [
            { text: "Mia Dolan", correct: false },
            { text: "Emma Stone", correct: false },
            { text: "Sebastian Wilder", correct: false },
            { text: "Mia Dolan", correct: true }
        ]
    },
    {
        question: "Quem interpretou o Coringa no filme 'Batman: O Cavaleiro das Trevas'?",
        answers: [
            { text: "Joaquin Phoenix", correct: false },
            { text: "Heath Ledger", correct: true },
            { text: "Jack Nicholson", correct: false },
            { text: "Jared Leto", correct: false }
        ]
    },
    {
        question: "Em que filme uma inteligência artificial chamada Skynet ameaça a humanidade?",
        answers: [
            { text: "Matrix", correct: false },
            { text: "Blade Runner", correct: false },
            { text: "O Exterminador do Futuro", correct: true },
            { text: "Ela", correct: false }
        ]
    },
    {
        question: "Qual é o filme que apresenta uma aventura em uma fábrica de chocolates liderada por Willy Wonka?",
        answers: [
            { text: "O Fabuloso Destino de Amélie Poulain", correct: false },
            { text: "A Fantástica Fábrica de Chocolate", correct: true },
            { text: "Alice no País das Maravilhas", correct: false },
            { text: "Matilda", correct: false }
        ]
    },
    {
        question: "Quem dirigiu o filme 'E.T. - O Extraterrestre'?",
        answers: [
            { text: "Steven Spielberg", correct: true },
            { text: "George Lucas", correct: false },
            { text: "Christopher Nolan", correct: false },
            { text: "James Cameron", correct: false }
        ]
    },
    {
        question: "Qual é o filme que narra a história de um homem que passa toda a sua vida em uma sala, sem saber que está sendo observado por um reality show?",
        answers: [
            { text: "O Show de Truman", correct: true },
            { text: "A Vida Secreta de Walter Mitty", correct: false },
            { text: "A Ilha", correct: false },
            { text: "Matrix", correct: false }
        ]
    },
    {
        question: "Quem interpretou o personagem Jack Dawson em 'Titanic'?",
        answers: [
            { text: "Brad Pitt", correct: false },
            { text: "Johnny Depp", correct: false },
            { text: "Tom Hanks", correct: false },
            { text: "Leonardo DiCaprio", correct: true }
        ]
    },
    {
        question: "Qual é o filme que apresenta uma história de amor proibido entre um vampiro e uma humana?",
        answers: [
            { text: "Crepúsculo", correct: true },
            { text: "Anjos da Noite", correct: false },
            { text: "Entrevista com o Vampiro", correct: false },
            { text: "Drácula de Bram Stoker", correct: false }
        ]
    },
    {
        question: "Em que filme uma família de super-heróis enfrenta um vilão chamado Síndrome?",
        answers: [
            { text: "Os Incríveis", correct: true },
            { text: "Vingadores: Ultimato", correct: false },
            { text: "Homem de Ferro", correct: false },
            { text: "Liga da Justiça", correct: false }
        ]
    },
    {
        question: "Qual é o filme de ficção científica que apresenta um computador chamado HAL 9000?",
        answers: [
            { text: "Blade Runner", correct: false },
            { text: "Matrix", correct: false },
            { text: "2001: Uma Odisséia no Espaço", correct: true },
            { text: "Ela", correct: false }
        ]
    },
    {
        question: "Quem interpretou o personagem Tony Stark, também conhecido como Homem de Ferro?",
        answers: [
            { text: "Chris Evans", correct: false },
            { text: "Robert Downey Jr.", correct: true },
            { text: "Chris Hemsworth", correct: false },
            { text: "Mark Ruffalo", correct: false }
        ]
    },
    {
        question: "Em que filme o personagem principal tem a habilidade de reviver o mesmo dia várias vezes?",
        answers: [
            { text: "De Volta para o Futuro", correct: false },
            { text: "Efeito Borboleta", correct: false },
            { text: "Feitiço do Tempo", correct: true },
            { text: "Donnie Darko", correct: false }
        ]
    },
    {
        question: "Quem interpretou o personagem Edward, um vampiro, na saga 'Crepúsculo'?",
        answers: [
            { text: "Taylor Lautner", correct: false },
            { text: "Robert Pattinson", correct: true },
            { text: "Kellan Lutz", correct: false },
            { text: "Jackson Rathbone", correct: false }
        ]
    },
    {
        question: "Qual é o filme em que um navio de passageiros colide com um iceberg e afunda?",
        answers: [
            { text: "Velocidade Máxima 2", correct: false },
            { text: "Navio Fantasma", correct: false },
            { text: "Titanic", correct: true },
            { text: "Pearl Harbor", correct: false }
        ]
    },

]


//Q  GEEK

const qgeek=[
    {
        question: 'Qual é o nome do famoso cubo de cores que desafia a lógica e a paciência?',
        answers: [
            { text: 'Furby', correct: false },
            { text: 'Cubo Mágico', correct: true },
            { text: 'Tamagotchi', correct: false },
            { text: 'Bop It', correct: false }
        ]
    },
    {
        "question": "Qual é o nome da popular fantasia de super-herói da DC Comics, conhecida por seu escudo com um 'S'?",
        "answers": [
            {"text": "Batman", "correct": false},
            {"text": "Superman", "correct": true},
            {"text": "Homem de Ferro", "correct": false},
            {"text": "Capitão América", "correct": false}
        ]
    },
    {
        "question": "Qual é a fantasia tradicionalmente usada durante o Halloween, representando um monstro clássico que precisa de sangue para sobreviver?",
        "answers": [
            {"text": "Lobisomem", "correct": false},
            {"text": "Zumbi", "correct": false},
            {"text": "Vampiro", "correct": true},
            {"text": "Frankenstein", "correct": false}
        ]
    },
    {
        "question": "Qual personagem é conhecido por sua fantasia de chapéu pontudo e vassoura, e é popular em festas de Halloween?",
        "answers": [
            {"text": "Múmia", "correct": false},
            {"text": "Bruxa", "correct": true},
            {"text": "Fantasma", "correct": false},
            {"text": "Esqueleto", "correct": false}
        ]
    },
    {
        "question": "Qual é a popular fantasia de Star Wars que envolve um traje branco e um capacete icônico?",
        "answers": [
            {"text": "Darth Vader", "correct": false},
            {"text": "Yoda", "correct": false},
            {"text": "Stormtrooper", "correct": true},
            {"text": "Chewbacca", "correct": false}
        ]
    },
    {
        "question": "Qual é a fantasia clássica associada a um personagem literário que vive em um castelo e é conhecido por transformar-se em um morcego?",
        "answers": [
            {"text": "O Fantasma da Ópera", "correct": false},
            {"text": "O Médico e o Monstro", "correct": false},
            {"text": "Drácula", "correct": true},
            {"text": "Frankenstein", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do dispositivo que permite aos jogadores inserir moedas nos fliperamas para começar a jogar?",
        "answers": [
            {"text": "Joystick", "correct": false},
            {"text": "Slot", "correct": false},
            {"text": "Moedeiro", "correct": true},
            {"text": "Botão de Iniciar", "correct": false}
        ]
    },
    {
        "question": "Qual foi o primeiro jogo de fliperama a apresentar gráficos em cores, lançado pela Namco em 1980?",
        "answers": [
            {"text": "Donkey Kong", "correct": false},
            {"text": "Space Invaders", "correct": false},
            {"text": "Pac-Man", "correct": true},
            {"text": "Galaga", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do personagem principal do jogo de fliperama clássico 'Pac-Man'?",
        "answers": [
            {"text": "Mario", "correct": false},
            {"text": "Sonic", "correct": false},
            {"text": "Pac-Man", "correct": true},
            {"text": "Donkey Kong", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome da empresa japonesa que é uma das mais conhecidas por criar jogos de fliperama, incluindo 'Street Fighter' e 'Resident Evil'?",
        "answers": [
            {"text": "Atari", "correct": false},
            {"text": "Sega", "correct": false},
            {"text": "Namco", "correct": false},
            {"text": "Capcom", "correct": true}
        ]
    },
    {
        "question": "Qual é o nome de um dos vírus que infecta as pessoas e as transforma em zumbis em 'Resident Evil'?",
        "answers": [
            {"text": "Cordyceps", "correct": false},
            {"text": "Zombrex", "correct": false},
            {"text": "T-Virus", "correct": true},
            {"text": "Vírus Wildfire", "correct": false}
        ]
    },
    {
        question: 'Qual é o título do jogo point-and-click lançado pela LucasArts em 1990, que se passa em uma ilha com piratas e apresenta o personagem Guybrush Threepwood?',
        answers: [
            { text: 'Monkey Island', correct: true },
            { text: 'Grim Fandango', correct: false },
            { text: 'Day of the Tentacle', correct: false },
            { text: 'Full Throttle', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do protagonista do jogo "Sam & Max Hit the Road", um famoso jogo point-and-click de aventura lançado em 1993 pela LucasArts?',
        answers: [
            { text: 'Max Payne', correct: false },
            { text: 'Sam & Max', correct: true },
            { text: 'Guybrush Threepwood', correct: false },
            { text: 'Manny Calavera', correct: false }
        ]
    },
    {
        question: 'O que o jogador controla em um jogo point-and-click?',
        answers: [
            { text: 'Um personagem principal', correct: false },
            { text: 'Um cursor', correct: true },
            { text: 'Uma nave espacial', correct: false },
            { text: 'Um veículo terrestre', correct: false }
        ]
    },
    {
        question: 'Qual jogo point-and-click apresenta uma história de mistério e investigação, com o jogador assumindo o papel de detetive particular na cidade de Paris?',
        answers: [
            { text: 'Broken Sword', correct: true },
            { text: 'The Secret of Monkey Island', correct: false },
            { text: 'Grim Fandango', correct: false },
            { text: 'Day of the Tentacle', correct: false }
        ]
    },
    {
        question: 'Qual é o objetivo principal em muitos jogos point-and-click?',
        answers: [
            { text: 'Resolver quebra-cabeças e enigmas', correct: true },
            { text: 'Derrotar chefes e inimigos', correct: false },
            { text: 'Explorar mundos abertos', correct: false },
            { text: 'Construir e administrar cidades', correct: false }
        ]
    },
    {
        question: 'Qual jogo point-and-click apresenta um ambiente surreal e sombrio, onde o jogador controla um esqueleto chamado Manny Calavera?',
        answers: [
            { text: 'Monkey Island', correct: false },
            { text: 'Grim Fandango', correct: true },
            { text: 'Day of the Tentacle', correct: false },
            { text: 'Full Throttle', correct: false }
        ]
    },
    {
        question: 'Em qual jogo point-and-click o jogador controla um personagem chamado Bernard, que vive uma aventura no tempo para salvar o mundo?',
        answers: [
            { text: 'Monkey Island', correct: false },
            { text: 'Grim Fandango', correct: false },
            { text: 'Day of the Tentacle', correct: true },
            { text: 'Full Throttle', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do estúdio de desenvolvimento conhecido por criar clássicos jogos point-and-click, como "Monkey Island" e "Day of the Tentacle"?',
        answers: [
            { text: 'Bethesda Game Studios', correct: false },
            { text: 'Blizzard Entertainment', correct: false },
            { text: 'LucasArts', correct: true },
            { text: 'CD Projekt Red', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do recurso mineral mais raro em Minecraft, usado para criar equipamentos e blocos especiais?',
        answers: [
            { text: 'Diamante', correct: true },
            { text: 'Ouro', correct: false },
            { text: 'Ferro', correct: false },
            { text: 'Esmeralda', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do mundo principal onde os jogadores começam em Minecraft?',
        answers: [
            { text: 'Mundo Superior', correct: true },
            { text: 'Nether', correct: false },
            { text: 'The End', correct: false },
            { text: 'Overworld', correct: false }
        ]
    },
    {
        question: 'Qual é o objetivo principal do modo de jogo "Sobrevivência" em Minecraft?',
        answers: [
            { text: 'Construir estruturas', correct: false },
            { text: 'Explorar mundos', correct: false },
            { text: 'Sobreviver e prosperar', correct: true },
            { text: 'Criar artefatos mágicos', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do monstro hostil que aparece apenas à noite em Minecraft?',
        answers: [
            { text: 'Zumbi', correct: true },
            { text: 'Creeper', correct: false },
            { text: 'Esqueleto', correct: false },
            { text: 'Aranha', correct: false }
        ]
    },
    {
        question: 'Qual é o bloco mais comum encontrado no mundo superior em Minecraft?',
        answers: [
            { text: 'Pedra', correct: true },
            { text: 'Terra', correct: false },
            { text: 'Areia', correct: false },
            { text: 'Grama', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do monstro hostil que adora pregar peças "explosivas" nos jogadores mais distraídos de Minecraft?',
        answers: [
            { text: 'Zumbi', correct: false },
            { text: 'Creeper', correct: true },
            { text: 'Esqueleto', correct: false },
            { text: 'Aranha', correct: false }
        ]
    },
    {
        question: 'O que os jogadores podem encontrar no mundo do Nether em Minecraft?',
        answers: [
            { text: 'Vilas de aldeões', correct: false },
            { text: 'Porcos hostis', correct: true },
            { text: 'Cavalos selvagens', correct: false },
            { text: 'Animais pacíficos', correct: false }
        ]
    },
    {
        question: 'Qual é o objetivo do jogo no modo "Criativo" de Minecraft?',
        answers: [
            { text: 'Construir estruturas e sobreviver', correct: false },
            { text: 'Explorar mundos e derrotar monstros', correct: false },
            { text: 'Criar livremente sem limitações de recursos', correct: true },
            { text: 'Completar missões e desafios', correct: false }
        ]
    },
    {
        question: 'Como os jogadores podem obter comida em Minecraft?',
        answers: [
            { text: 'Derrotando monstros', correct: false },
            { text: 'Explorando masmorras', correct: false },
            { text: 'Cultivando plantas e criando fazendas', correct: true },
            { text: 'Negociando com aldeões', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do mundo alternativo e perigoso em Minecraft, acessível por um portal especial?',
        answers: [
            { text: 'The End', correct: false },
            { text: 'Overworld', correct: false },
            { text: 'Nether', correct: true },
            { text: 'Dimension Zero', correct: false }
        ]
    },
    {
        question: 'Qual empresa de software tem a sede em Redmond, Washington?',
        answers: [
            { text: 'Apple', correct: false },
            { text: 'Google', correct: false },
            { text: 'Microsoft', correct: true },
            { text: 'IBM', correct: false }
        ]
    },
    {
        question: 'Qual empresa foi originalmente chamada de "Cadabra"?',
        answers: [
            { text: 'Amazon', correct: true },
            { text: 'Alibaba', correct: false },
            { text: 'eBay', correct: false },
            { text: 'Google', correct: false }
        ]
    },
    {
        question: 'Quantas faces tem um Dodecaedro?',
        answers: [
            { text: '12', correct: true },
            { text: '10', correct: false },
            { text: '8', correct: false },
            { text: '6', correct: false }
        ]
    },
    {
        question: 'Quantos fantasmas perseguem o Pac-Man no início de cada jogo?',
        answers: [
            { text: '3', correct: false },
            { text: '4', correct: true },
            { text: '5', correct: false },
            { text: '6', correct: false }
        ]
    },
    {
        question: 'Qual estúdio de jogos faz a série Red Dead Redemption?',
        answers: [
            { text: 'Ubisoft', correct: false },
            { text: 'Bethesda Game Studios', correct: false },
            { text: 'Rockstar Games', correct: true },
            { text: 'Naughty Dog', correct: false }
        ]
    },
    {
        question: 'Que brinquedo consiste em peças de plástico interconectadas que podem ser montadas e desmontadas?',
        answers: [
            { text: 'Lego', correct: true },
            { text: 'Play-Doh', correct: false },
            { text: 'Hot Wheels', correct: false },
            { text: 'Yo-yo', correct: false }
        ]
    },
    {
        question: 'Quantos minutos tem uma semana inteira?',
        answers: [
            { text: '10.080', correct: true },
            { text: '14.400', correct: false },
            { text: '8.640', correct: false },
            { text: '7.200', correct: false }
        ]
    },
    {
        question: 'Qual brinquedo consiste em um disco de plástico que gira rapidamente na ponta de uma corda?',
        answers: [
            { text: 'Bola de Gude', correct: false },
            { text: 'Pipa', correct: false },
            { text: 'Yo-yo', correct: true },
            { text: 'Frisbee', correct: false }
        ]
    },
    {
        question: 'Que brinquedo permite que as crianças criem imagens coloridas raspando a superfície preta para revelar as cores escondidas?',
        answers: [
            { text: 'Etch A Sketch', correct: false },
            { text: 'Lite-Brite', correct: false },
            { text: 'Spirograph', correct: false },
            { text: 'Scratch Art', correct: true }
        ]
    },
    {
        question: 'Qual é o jogo clássico de arcade onde você controla um pássaro voando por túneis gerados aleatoriamente?',
        answers: [
            { text: 'Pac-Man', correct: false },
            { text: 'Asteroids', correct: false },
            { text: 'Pong', correct: false },
            { text: 'Flappy Bird', correct: true }
        ]
    },
    {
        question: 'Que jogo de corrida de carros é frequentemente considerado um dos primeiros jogos de vídeo game?',
        answers: [
            { text: 'Space Invaders', correct: false },
            { text: 'Missile Command', correct: false },
            { text: 'Pong', correct: false },
            { text: 'Out Run', correct: true }
        ]
    },
    {
        question: 'Em que jogo de Atari você controla um carro que deve evitar "obstáculos" na estrada?',
        answers: [
            { text: 'Asteroids', correct: false },
            { text: 'Pong', correct: false },
            { text: 'Space Invaders', correct: false },
            { text: 'Enduro', correct: true }
        ]
    },
    {
        question: 'Qual jogo é conhecido por ser um dos primeiros jogos de plataforma, apresentando um personagem saltando sobre obstáculos, como buracos e jacarés?',
        answers: [
            { text: 'Frogger', correct: false },
            { text: 'Space Invaders', correct: false },
            { text: 'Pong', correct: false },
            { text: 'Pitfall!', correct: true }
        ]
    },
    {
        question: 'Qual jogo de tiro espacial é conhecido por seu estilo de rolagem vertical e naves alienígenas que atacam?',
        answers: [
            { text: 'Pac-Man', correct: false },
            { text: 'Asteroids', correct: false },
            { text: 'Galaga', correct: true },
            { text: 'Pong', correct: false }
        ]
    },
    {
        question: 'Que jogo simula uma partida de tênis de mesa, onde os jogadores controlam paletas que rebatem uma bola?',
        answers: [
            { text: 'Breakout', correct: false },
            { text: 'Pac-Man', correct: false },
            { text: 'Pong', correct: true },
            { text: 'Space Invaders', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do jogo de tiro onde você deve defender a Terra de ondas de naves de uma invasão alienígena?',
        answers: [
            { text: 'Defender', correct: false },
            { text: 'Missile Command', correct: false },
            { text: 'Space Invaders', correct: true },
            { text: 'Asteroids', correct: false }
        ]
    },
    {
        question: 'Em qual jogo você controla uma cobra que deve comer pontos para crescer, evitando colidir com as paredes ou com seu próprio corpo?',
        answers: [
            { text: 'Pong', correct: false },
            { text: 'Asteroids', correct: false },
            { text: 'Breakout', correct: false },
            { text: 'Snake', correct: true }
        ]
    },
    {
        question: 'Quem é conhecido como o criador da série de jogos "Metal Gear Solid"?',
        answers: [
            { text: 'Hideo Kojima', correct: true },
            { text: 'Shigeru Miyamoto', correct: false },
            { text: 'Gabe Newell', correct: false },
            { text: 'Todd Howard', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do criador da série de jogos "The Elder Scrolls"?',
        answers: [
            { text: 'Hideo Kojima', correct: false },
            { text: 'Todd Howard', correct: true },
            { text: 'Shigeru Miyamoto', correct: false },
            { text: 'Gabe Newell', correct: false }
        ]
    },
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
    {   question: 'Em 1981 o encanador Mario aparece pela 1º vez em um jogo eletrônico? Qual o nome deste jogo?',
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
    {
        question: "Qual é o nome do personagem principal de 'O Senhor dos Anéis'?",
        answers: [
            { text: "Gandalf", correct: false },
            { text: "Aragorn", correct: false },
            { text: "Frodo Bolseiro", correct: true },
            { text: "Legolas", correct: false }
        ]
    },
    {
        question: "Em que ano foi lançado o primeiro console PlayStation da Sony?",
        answers: [
            { text: "1994", correct: true },
            { text: "1996", correct: false },
            { text: "1998", correct: false },
            { text: "2000", correct: false }
        ]
    },
    {
        question: "Qual é o nome da nave espacial em 'Star Wars' pilotada por Han Solo?",
        answers: [
            { text: "Starship Enterprise", correct: false },
            { text: "Millennium Falcon", correct: true },
            { text: "X-Wing", correct: false },
            { text: "TIE Fighter", correct: false }
        ]
    },
    {
        question: "Qual é a principal característica do jogo de tabuleiro 'Settlers of Catan'?",
        answers: [
            { text: "Construção de cidades", correct: false },
            { text: "Negociação de recursos", correct: true },
            { text: "Batalhas épicas", correct: false },
            { text: "Exploração espacial", correct: false }
        ]
    },
    {
        question: "Em que ano foi lançado o primeiro episódio de 'Star Trek'?",
        answers: [
            { text: "1966", correct: true },
            { text: "1972", correct: false },
            { text: "1980", correct: false },
            { text: "1990", correct: false }
        ]
    },
    {
        question: "Qual é o planeta natal de Superman?",
        answers: [
            { text: "Terra", correct: false },
            { text: "Krypton", correct: true },
            { text: "Marte", correct: false },
            { text: "Asgard", correct: false }
        ]
    },
    {
        question: "Qual é o nome do protagonista de 'Doctor Who'?",
        answers: [
            { text: "Captain Jack Harkness", correct: false },
            { text: "The Master", correct: false },
            { text: "The Doctor", correct: true },
            { text: "River Song", correct: false }
        ]
    },
    {
        question: "Quem é conhecido como o 'Mago Supremo' no universo da Marvel?",
        answers: [
            { text: "Homem-Aranha", correct: false },
            { text: "Doutor Estranho", correct: true },
            { text: "Homem de Ferro", correct: false },
            { text: "Pantera Negra", correct: false }
        ]
    },
    {
        question: "Qual é o nome da espada usada por Jon Snow em 'Game of Thrones'?",
        answers: [
            { text: "Oathkeeper", correct: false },
            { text: "Ice", correct: false },
            { text: "Needle", correct: false },
            { text: "Longclaw", correct: true }
        ]
    },
    {
        question: "Qual é o jogo de cartas colecionáveis que se tornou um fenômeno mundial?",
        answers: [
            { text: "Uno", correct: false },
            { text: "Magic: The Gathering", correct: true },
            { text: "Pokémon TCG", correct: false },
            { text: "Yu-Gi-Oh!", correct: false }
        ]
    },
    {
        question: "Quem é o criador da franquia 'The Legend of Zelda'?",
        answers: [
            { text: "Hideo Kojima", correct: false },
            { text: "Shigeru Miyamoto", correct: true },
            { text: "Satoru Iwata", correct: false },
            { text: "Hidetaka Miyazaki", correct: false }
        ]
    },
    {
        question: "Qual é o nome da série de livros que inspirou a série de TV 'Game of Thrones'?",
        answers: [
            { text: "The Wheel of Time", correct: false },
            { text: "The Malazan Book of the Fallen", correct: false },
            { text: "A Song of Ice and Fire", correct: true },
            { text: "The Kingkiller Chronicle", correct: false }
        ]
    },
    {
        question: "Qual é o nome do vilão principal em 'Harry Potter'?",
        answers: [
            { text: "Voldemort", correct: true },
            { text: "Dumbledore", correct: false },
            { text: "Draco Malfoy", correct: false },
            { text: "Severus Snape", correct: false }
        ]
    },
    {
        question: "Qual é o nome do robô do personagem Tony Stark em 'Homem de Ferro'?",
        answers: [
            { text: "Hulkbuster", correct: false },
            { text: "J.A.R.V.I.S.", correct: true },
            { text: "Ultron", correct: false },
            { text: "Dummy", correct: false }
        ]
    },
    {
        question: "Qual é o nome da protagonista feminina da série 'The Witcher'?",
        answers: [
            { text: "Ciri", correct: true },
            { text: "Yennefer", correct: false },
            { text: "Triss", correct: false },
            { text: "Fringilla Vigo", correct: false }
        ]
    },
    {
        question: "Qual é o nome do protagonista do jogo 'Metal Gear Solid'?",
        answers: [
            { text: "Solid Snake", correct: true },
            { text: "Liquid Snake", correct: false },
            { text: "Big Boss", correct: false },
            { text: "Raiden", correct: false }
        ]
    },
    {
        question: "Quem é o vilão principal em 'Star Wars: O Império Contra-Ataca'?",
        answers: [
            { text: "Darth Maul", correct: false },
            { text: "Darth Sidious", correct: false },
            { text: "Darth Skywalter", correct: false },
            { text: "Darth Vader", correct: true }
        ]
    },
    {
        question: "Qual é o nome do jogo de cartas colecionáveis que envolve duelos de monstros?",
        answers: [
            { text: "Hearthstone", correct: false },
            { text: "Magic: The Gathering", correct: false },
            { text: "Yu-Gi-Oh!", correct: true },
            { text: "Pokémon TCG", correct: false }
        ]
    },
    {
        question: "Quem é o criador da série 'The Mandalorian'?",
        answers: [
            { text: "Joss Whedon", correct: false },
            { text: "George Lucas", correct: false },
            { text: "Jon Favreau", correct: true },
            { text: "J.J. Abrams", correct: false }
        ]
    },
    {
        question: "Qual é o nome do mago que orienta o protagonista em 'The Witcher'?",
        answers: [
            { text: "Merlin", correct: false },
            { text: "Gandalf", correct: false },
            { text: "Triss", correct: false },
            { text: "Dandelion", correct: true }
        ]
    },
    {
        question: "Qual é o nome do protagonista da série de anime 'Death Note'?",
        answers: [
            { text: "L", correct: false },
            { text: "Kira", correct: false },
            { text: "Ryuk", correct: false },
            { text: "Light Yagami", correct: true }
        ]
    },
    {
        question: "Quem é o criador do universo de 'Senhor dos Anéis'?",
        answers: [
            { text: "George R.R. Martin", correct: false },
            { text: "J.R.R. Tolkien", correct: true },
            { text: "C.S. Lewis", correct: false },
            { text: "Philip K. Dick", correct: false }
        ]
    },
    {
        question: "Qual é a principal moeda usada em 'The Witcher'?",
        answers: [
            { text: "Ouro", correct: false },
            { text: "Dólar", correct: false },
            { text: "Florim", correct: true },
            { text: "Rublo", correct: false }
        ]
    },
    {
        question: "Qual é o nome do planeta natal de Spock em 'Star Trek'?",
        answers: [
            { text: "Tatooine", correct: false },
            { text: "Endor", correct: false },
            { text: "Vulcan", correct: true },
            { text: "Coruscant", correct: false }
        ]
    },
    {
        question: "Quem é o criador do personagem Sherlock Holmes?",
        answers: [
            { text: "Edgar Allan Poe", correct: false },
            { text: "Agatha Christie", correct: false },
            { text: "Arthur Conan Doyle", correct: true },
            { text: "Charles Dickens", correct: false }
        ]
    },
    {
        question: 'Em que ano o Facebook foi fundado?',
        answers: [
            { text: '2002', correct: false },
            { text: '2004', correct: true },
            { text: '2006', correct: false },
            { text: '2008', correct: false }
        ]
    },
    {
        question: 'Quem é o arque-inimigo do Batman?',
        answers: [
            { text: 'Coringa', correct: true },
            { text: 'Duas-Caras', correct: false },
            { text: 'Pinguim', correct: false },
            { text: 'Charada', correct: false }
        ]
    },
    {
        question: 'Em Star Wars, quem é o mestre Jedi de Anakin Skywalker?',
        answers: [
            { text: 'Yoda', correct: false },
            { text: 'Obi-Wan Kenobi', correct: true },
            { text: 'Mace Windu', correct: false },
            { text: 'Qui-Gon Jinn', correct: false }
        ]
    },
    {
        question: 'Qual é o nome verdadeiro do Flash?',
        answers: [
            { text: 'Barry Allen', correct: true },
            { text: 'Wally West', correct: false },
            { text: 'Jay Garrick', correct: false },
            { text: 'Bart Allen', correct: false }
        ]
    },
    {
        question: 'Qual super herói tem o lema: "Grandes poderes trazem grandes responsabilidades"?',
        answers: [
            { text: 'Homem-aranha', correct: true },
            { text: 'Superman', correct: false },
            { text: 'Capitão América', correct: false },
            { text: 'Batman', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do planeta natal de Chewbacca?',
        answers: [
            { text: 'Tatooine', correct: false },
            { text: 'Endor', correct: false },
            { text: 'Kashyyyk', correct: true },
            { text: 'Naboo', correct: false }
        ]
    },
    {
        question: 'Quem é o pai de Luke Skywalker?',
        answers: [
            { text: 'Darth Vader', correct: true },
            { text: 'Obi-Wan Kenobi', correct: false },
            { text: 'Han Solo', correct: false },
            { text: 'Yoda', correct: false }
        ]
    },
    {
        question: 'Qual é a arma principal dos Sith?',
        answers: [
            { text: 'Blaster', correct: false },
            { text: 'Luz de Sabre', correct: true },
            { text: 'Lança-chamas', correct: false },
            { text: 'Blasters duplos', correct: false }
        ]
    },
    {
        question: 'O que é a Força?',
        answers: [
            { text: 'Uma arma poderosa', correct: false },
            { text: 'Um artefato antigo', correct: false },
            { text: 'Uma filosofia Jedi', correct: false },
            { text: 'Uma energia mística que dá poder aos Jedi e Sith', correct: true }
        ]
    },
    {
        question: 'Qual é o nome do planeta desértico apresentado em "O Despertar da Força"?',
        answers: [
            { text: 'Tatooine', correct: false },
            { text: 'Naboo', correct: false },
            { text: 'Jakku', correct: true },
            { text: 'Geonosis', correct: false }
        ]
    },
    {
        question: 'Quem é o líder da Primeira Ordem em "O Despertar da Força"?',
        answers: [
            { text: 'Imperador Palpatine', correct: false },
            { text: 'Kylo Ren', correct: true },
            { text: 'Darth Vader', correct: false },
            { text: 'Snoke', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do caçador de recompensas que congela Han Solo em carbonita em "O Império Contra-Ataca"?',
        answers: [
            { text: 'Boba Fett', correct: true },
            { text: 'IG-88', correct: false },
            { text: 'Bossk', correct: false },
            { text: 'Dengar', correct: false }
        ]
    },
    {
        question: 'Em "Ataque dos Clones" é conhecido como um ex-Mestre Jedi que abandonou a Ordem Jedi após perder a fé na República que os Jedi serviam',
        answers: [
            { text: 'Yoda', correct: true },
            { text: 'Obi-Wan Kenobi', correct: false },
            { text: 'Mace Windu', correct: false },
            { text: 'Qui-Gon Jinn', correct: false }
        ]
    },
    {
        question: 'Qual é o sobrenome verdadeiro de Darth Sidious, o líder dos Sith?',
        answers: [
            { text: 'Tarkin', correct: false },
            { text: 'Plagueis', correct: false },
            { text: 'Palpatine', correct: true },
            { text: 'Tyranus', correct: false }
        ]
    },
    {
        question: "Qual é o nome do herói cego da Marvel que é advogado durante o dia?",
        answers: [
            { text: "Wolverine", correct: false },
            { text: "Homem de Ferro", correct: false },
            { text: "Demolidor", correct: true },
            { text: "Luke Cage", correct: false }
        ]
    },
    {
        question: 'Qual é o jogo de computador mais vendido de todos os tempos?',
        answers: [
            { text: 'Minecraft', correct: true },
            { text: 'The Sims', correct: false },
            { text: 'World of Warcraft', correct: false },
            { text: 'Counter-Strike: Global Offensive', correct: false }
        ]
    },
    {
        question: 'Em que ano foi lançado o jogo "The Elder Scrolls V: Skyrim"?',
        answers: [
            { text: '2008', correct: false },
            { text: '2011', correct: true },
            { text: '2014', correct: false },
            { text: '2017', correct: false }
        ]
    },
    {
        question: 'Qual é o gênero do jogo "Overwatch"?',
        answers: [
            { text: 'Battle Royale', correct: false },
            { text: 'MOBA', correct: false },
            { text: 'FPS (First-Person Shooter)', correct: true },
            { text: 'RPG', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do protagonista em "Half-Life"?',
        answers: [
            { text: 'Gordon Freeman', correct: true },
            { text: 'Alex Vance', correct: false },
            { text: 'Barney Calhoun', correct: false },
            { text: 'Eli Vance', correct: false }
        ]
    },
    {
        question: 'Em que ano foi lançado o jogo "Doom"?',
        answers: [
            { text: '1993', correct: true },
            { text: '1996', correct: false },
            { text: '2001', correct: false },
            { text: '2005', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do mundo virtual em "Second Life"?',
        answers: [
            { text: 'SimCity', correct: false },
            { text: 'The Matrix', correct: false },
            { text: 'Azeroth', correct: false },
            { text: 'Linden Lab', correct: true }
        ]
    },
    {
        question: 'Qual é o título completo do jogo "CS:GO"?',
        answers: [
            { text: 'Counter-Strike: Source', correct: false },
            { text: 'Counter-Strike: Condition Zero', correct: false },
            { text: 'Counter-Strike: Global Offensive', correct: true },
            { text: 'Counter-Strike: 1.6', correct: false }
        ]
    },
    {
        question: 'Quem é o desenvolvedor do jogo "Fortnite"?',
        answers: [
            { text: 'Blizzard Entertainment', correct: false },
            { text: 'Epic Games', correct: true },
            { text: 'Valve Corporation', correct: false },
            { text: 'Ubisoft', correct: false }
        ]
    },
    {
        question: 'Qual a cor da Meta-anfetamina de Heisenberg em Breaking Bad?',
        answers: [
            { text: 'Transparente', correct: false },
            { text: 'Azul', correct: true },
            { text: 'Branca', correct: false },
            { text: 'Amarela', correct: false }
        ]
    },
    {
        question: 'Qual é o real nome de revistas desenhadas em quadros de heróis ou personagens em geral?',
        answers: [
            { text: 'Manga', correct: false },
            { text: 'HQ\'s', correct: true },
            { text: 'Gibi', correct: false },
            { text: 'Livrinho', correct: false }
        ]
    },
    {
        question: 'Qual o planeta natal de Spock, o ser lógico da série e saga de filmes "Star Trek"?',
        answers: [
            { text: 'Vulcano', correct: true },
            { text: 'Terra', correct: false },
            { text: 'Asgard', correct: false },
            { text: 'Spocklândia', correct: false }
        ]
    },
    {
        question: 'Em qual jogo do Super Nintendo você pode encontrar o vilão Bowser?',
        answers: [
            { text: 'Street Fighter II', correct: false },
            { text: 'Final Fantasy VI', correct: false },
            { text: 'Super Mario World', correct: true },
            { text: 'Super Metroid', correct: false }
        ]
    },
    {
        question: 'Qual é o nome da espada que Link usa no jogo "The Legend of Zelda: A Link to the Past"?',
        answers: [
            { text: 'Excalibur', correct: false },
            { text: 'Master Sword', correct: true },
            { text: 'Buster Sword', correct: false },
            { text: 'Falchion', correct: false }
        ]
    },
    {
        question: 'Em que jogo do Super Nintendo você assume o papel de um caçador de recompensas intergaláctico chamado Samus Aran?',
        answers: [
            { text: 'Metroid', correct: true },
            { text: 'Star Fox', correct: false },
            { text: 'Earthbound', correct: false },
            { text: 'Super Castlevania IV', correct: false }
        ]
    },
    {
        question: 'Em que jogo do Super Nintendo você pode encontrar o personagem Ryu, conhecido por seus golpes de hadouken?',
        answers: [
            { text: 'Mortal Kombat', correct: false },
            { text: 'Street Fighter II', correct: true },
            { text: 'Super Mario Kart', correct: false },
            { text: 'F-Zero', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do planeta natal de Samus Aran em Metroid?',
        answers: [
            { text: 'Tatooine', correct: false },
            { text: 'Zebes', correct: true },
            { text: 'Aether', correct: false },
            { text: 'SR388', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do personagem principal no jogo "Earthbound"?',
        answers: [
            { text: 'Ness', correct: true },
            { text: 'Lucas', correct: false },
            { text: 'Poo', correct: false },
            { text: 'Paula', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do vilão principal no jogo "Final Fantasy VI"?',
        answers: [
            { text: 'Kefka', correct: true },
            { text: 'Sephiroth', correct: false },
            { text: 'Golbez', correct: false },
            { text: 'Exdeath', correct: false }
        ]
    },
    {
        question: 'Em que jogo do Super Nintendo você controla um robô chamado Mega Man em sua luta contra o vilão Dr. Wily?',
        answers: [
            { text: 'Super Metroid', correct: false },
            { text: 'Mega Man X', correct: true },
            { text: 'Super Mario Kart', correct: false },
            { text: 'Donkey Kong Country', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do personagem principal no jogo "Chrono Trigger"?',
        answers: [
            { text: 'Lucca', correct: false },
            { text: 'Crono', correct: true },
            { text: 'Frog', correct: false },
            { text: 'Magus', correct: false }
        ]
    },
    {
        question: 'Em que jogo do Super Nintendo você pode encontrar o personagem Yoshi, o dinossauro amigo de Mario?',
        answers: [
            { text: 'Super Mario World', correct: true },
            { text: 'The Legend of Zelda: A Link to the Past', correct: false },
            { text: 'Super Metroid', correct: false },
            { text: 'Earthbound', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do mascote da Nintendo que é conhecido por sua habilidade de inalar inimigos?',
        answers: [
            { text: 'Link', correct: false },
            { text: 'Donkey Kong', correct: false },
            { text: 'Kirby', correct: true },
            { text: 'Samus Aran', correct: false }
        ]
    },
    {
        question: 'Em que jogo do Super Nintendo você pode encontrar os irmãos Mario em uma competição de kart?',
        answers: [
            { text: 'Super Mario World', correct: false },
            { text: 'Super Mario Kart', correct: true },
            { text: 'Donkey Kong Country', correct: false },
            { text: 'Final Fantasy VI', correct: false }
        ]
    },
    {
        question: 'Em que jogo do Super Nintendo você pode encontrar o personagem Simon Belmont, caçador de vampiros?',
        answers: [
            { text: 'Super Metroid', correct: false },
            { text: 'Final Fantasy VI', correct: false },
            { text: 'Castlevania: Dracula X', correct: true },
            { text: 'Mega Man X', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do reino em que a maior parte da ação do jogo "Super Mario RPG" se passa?',
        answers: [
            { text: 'Mushroom Kingdom', correct: false },
            { text: 'Hyrule', correct: false },
            { text: 'Beanbean Kingdom', correct: false },
            { text: 'Bowser\'s Keep', correct: true }
        ]
    },
    {
        question: 'Qual é o nome do ouriço azul que é o mascote da Sega e protagonista de vários jogos?',
        answers: [
            { text: 'Knuckles', correct: false },
            { text: 'Tails', correct: false },
            { text: 'Sonic', correct: true },
            { text: 'Shadow', correct: false }
        ]
    },
    {
        question: 'Em qual jogo do Mega Drive você controla personagens como Axel Stone, Adam Hunter e Blaze Fielding?',
        answers: [
            { text: 'Streets of Rage', correct: true },
            { text: 'Golden Axe', correct: false },
            { text: 'Altered Beast', correct: false },
            { text: 'Shinobi', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do cientista maluco que odeia Sonic?',
        answers: [
            { text: 'Shadow', correct: false },
            { text: 'Silver', correct: false },
            { text: 'Knuckles', correct: false },
            { text: 'Dr. Robotnik', correct: true }
        ]
    },
    {
        question: 'Qual é o nome do protagonista no jogo "Golden Axe", que busca vingança pela morte de seu irmão?',
        answers: [
            { text: 'Axel Stone', correct: false },
            { text: 'Tyris Flare', correct: false },
            { text: 'Gilius Thunderhead', correct: false },
            { text: 'Tarik', correct: true }
        ]
    },
    {
        question: 'Como Smeagol chama o anel na trilogia "O Senhor dos Anéis"?',
        answers: [
            { text: 'Anel de Poder', correct: false },
            { text: 'Precioso', correct: true },
            { text: 'Anel Mágico', correct: false },
            { text: 'Anel do Destino', correct: false }
        ]
    },
    {
        question: 'Quem é o protagonista principal da história?',
        answers: [
            { text: 'Gandalf', correct: false },
            { text: 'Aragorn', correct: false },
            { text: 'Frodo Bolseiro', correct: true },
            { text: 'Legolas', correct: false }
        ]
    },
    {
        question: 'Qual criatura corrompida pelo Um Anel desempenha um papel crucial na história?',
        answers: [
            { text: 'Balrog', correct: false },
            { text: 'Gollum', correct: true },
            { text: 'Nazgûl', correct: false },
            { text: 'Ents', correct: false }
        ]
    },
    {
        question: 'Qual é a capital de Gondor?',
        answers: [
            { text: 'Rohan', correct: false },
            { text: 'Valfenda', correct: false },
            { text: 'Minas Tirith', correct: true },
            { text: 'Mordor', correct: false }
        ]
    },
    {
        question: 'Quem é conhecido como "O Olho de Sauron"?',
        answers: [
            { text: 'Saruman', correct: false },
            { text: 'Gollum', correct: false },
            { text: 'Sauron', correct: true },
            { text: 'Gandalf', correct: false }
        ]
    },
    {
        question: 'Qual é a espada lendária que é quebrada e depois restaurada para o rei Aragorn?',
        answers: [
            { text: 'Glamdring', correct: false },
            { text: 'Narsil/Andúril', correct: true },
            { text: 'Sting', correct: false },
            { text: 'Orcrist', correct: false }
        ]
    },
    {
        question: 'Quantos anéis de poder foram forjados em total?',
        answers: [
            { text: '9', correct: false },
            { text: '18', correct: false },
            { text: '20', correct: true },
            { text: '1', correct: false }
        ]
    },
    {
        question: 'Quem é o mestre artífice que forjou o Um Anel?',
        answers: [
            { text: 'Celeborn', correct: false },
            { text: 'Fëanor', correct: false },
            { text: 'Sauron', correct: true },
            { text: 'Aulë', correct: false }
        ]
    },
    {
        question: 'O que Frodo e Sam precisam destruir para derrotar Sauron?',
        answers: [
            { text: 'Cajado de Sauron', correct: false },
            { text: 'A Pedra de Orthanc', correct: false },
            { text: 'O Um Anel', correct: true },
            { text: 'A Coroa de Morgoth', correct: false }
        ]
    },
    {
        question: 'Quantas cartas compõem um baralho tradicional de pôquer?',
        answers: [
            { text: '40 cartas', correct: false },
            { text: '52 cartas', correct: true },
            { text: '48 cartas', correct: false },
            { text: '56 cartas', correct: false }
        ]
    },
    {
        question: 'Qual naipe é representado por um trevo em um baralho padrão?',
        answers: [
            { text: 'Paus', correct: true },
            { text: 'Copas', correct: false },
            { text: 'Espadas', correct: false },
            { text: 'Ouros', correct: false }
        ]
    },
    {
        question: 'Quantas cartas são distribuídas a cada jogador no início de uma partida de pôquer Texas Hold\'em?',
        answers: [
            { text: '2 cartas', correct: true },
            { text: '3 cartas', correct: false },
            { text: '4 cartas', correct: false },
            { text: '5 cartas', correct: false }
        ]
    },
    {
        question: 'Em qual jogo de cartas o objetivo é alcançar 21 pontos sem ultrapassar este valor?',
        answers: [
            { text: 'Pife', correct: false },
            { text: 'Buraco', correct: false },
            { text: 'Truco', correct: false },
            { text: 'Blackjack', correct: true }
        ]
    },
    {
        question: 'Qual desses jogos de cartas é conhecido por ter um curinga?',
        answers: [
            { text: 'Truco', correct: false },
            { text: 'Buraco', correct: true },
            { text: 'Poker', correct: false },
            { text: 'Cacheta', correct: false }
        ]
    },
    {
        question: 'No jogo de cartas conhecido como "Mau-Mau", qual carta inverte a ordem de jogo?',
        answers: [
            { text: 'Ás', correct: false },
            { text: 'Rei', correct: false },
            { text: 'Dama', correct: true },
            { text: 'Valete', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do jogo de cartas em que o objetivo é formar sequências de cartas do mesmo naipe?',
        answers: [
            { text: 'Buraco', correct: false },
            { text: 'Poker', correct: false },
            { text: 'Cacheta', correct: false },
            { text: 'Canastra', correct: true }
        ]
    },
    {
        question: 'Em que jogo de cartas você pode fazer um "truco"?',
        answers: [
            { text: 'Buraco', correct: false },
            { text: 'Truco', correct: true },
            { text: 'Cacheta', correct: false },
            { text: 'Poker', correct: false }
        ]
    }
    
  
]


//Q5 ESPORTE


const qesporte=[
    {
        question: 'Qual é o clube de futebol mais titulado em Portugal?',
        answers: [
            { text: 'SL Benfica', correct: true },
            { text: 'FC Porto', correct: false },
            { text: 'Sporting CP', correct: false },
            { text: 'SC Braga', correct: false }
        ]
    },
    {
        "question": "Qual é o estilo de natação mais rápido?",
        "answers": [
            {"text": "Peito", "correct": false},
            {"text": "Costas", "correct": false},
            {"text": "Borboleta", "correct": false},
            {"text": "Crawl", "correct": true}
        ]
    },
    {
        "question": "Quantos estilos de natação existem nas competições olímpicas?",
        "answers": [
            {"text": "Dois", "correct": false},
            {"text": "Três", "correct": false},
            {"text": "Quatro", "correct": true},
            {"text": "Cinco", "correct": false}
        ]
    },
    {
        "question": "Quem é o nadador mais condecorado da história das Olimpíadas?",
        "answers": [
            {"text": "Mark Spitz", "correct": false},
            {"text": "Ian Thorpe", "correct": false},
            {"text": "Michael Phelps", "correct": true},
            {"text": "Ryan Lochte", "correct": false}
        ]
    },
    {
        "question": "Qual é a distância de uma piscina olímpica?",
        "answers": [
            {"text": "25 metros", "correct": false},
            {"text": "50 metros", "correct": true},
            {"text": "100 metros", "correct": false},
            {"text": "200 metros", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome da prova que inclui todos os quatro estilos de natação?",
        "answers": [
            {"text": "Medley", "correct": true},
            {"text": "Freestyle", "correct": false},
            {"text": "Relay", "correct": false},
            {"text": "Sprint", "correct": false}
        ]
    },
    {
        "question": "Quantos pontos são necessários para vencer um jogo de squash?",
        "answers": [
            {"text": "11 pontos", "correct": true},
            {"text": "15 pontos", "correct": false},
            {"text": "21 pontos", "correct": false},
            {"text": "25 pontos", "correct": false}
        ]
    },
    {
        "question": "Qual é o material tradicionalmente usado para fabricar bolas de squash?",
        "answers": [
            {"text": "Plástico", "correct": false},
            {"text": "Borracha", "correct": true},
            {"text": "Couro", "correct": false},
            {"text": "Madeira", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do golpe no squash onde a bola é jogada diretamente para a parede frontal sem tocar nas laterais?",
        "answers": [
            {"text": "Drive", "correct": true},
            {"text": "Drop", "correct": false},
            {"text": "Boast", "correct": false},
            {"text": "Lob", "correct": false}
        ]
    },
    {
        "question": "Quantas paredes podem ser usadas para jogar a bola em uma quadra de squash?",
        "answers": [
            {"text": "Uma", "correct": false},
            {"text": "Duas", "correct": false},
            {"text": "Três", "correct": false},
            {"text": "Quatro", "correct": true}
        ]
    },
    {
        "question": "Quantos pinos são utilizados em uma pista de boliche padrão?",
        "answers": [
            {"text": "8 pinos", "correct": false},
            {"text": "9 pinos", "correct": false},
            {"text": "10 pinos", "correct": true},
            {"text": "12 pinos", "correct": false}
        ]
    },
    {
        "question": "Quantos pontos são possíveis em um jogo perfeito de boliche?",
        "answers": [
            {"text": "200 pontos", "correct": false},
            {"text": "250 pontos", "correct": false},
            {"text": "300 pontos", "correct": true},
            {"text": "350 pontos", "correct": false}
        ]
    },
    {
        "question": "Como é chamado o termo usado quando um jogador derruba todos os pinos em duas jogadas consecutivas?",
        "answers": [
            {"text": "Strike", "correct": false},
            {"text": "Spare", "correct": true},
            {"text": "Split", "correct": false},
            {"text": "Gutter", "correct": false}
        ]
    },
    {
        "question": "Qual é a distância do início da pista até os pinos no boliche?",
        "answers": [
            {"text": "12 metros", "correct": false},
            {"text": "15 metros", "correct": false},
            {"text": "18 metros", "correct": false},
            {"text": "19,2 metros", "correct": true}
        ]
    },
    {
        "question": "Quantos pontos vale o centro do alvo em uma competição de tiro ao alvo com rifle?",
        "answers": [
            {"text": "5 pontos", "correct": false},
            {"text": "7 pontos", "correct": false},
            {"text": "9 pontos", "correct": false},
            {"text": "10 pontos", "correct": true}
        ]
    },
    {
        "question": "Qual é a distância padrão para o tiro ao alvo com pistola em competições olímpicas?",
        "answers": [
            {"text": "10 metros", "correct": true},
            {"text": "20 metros", "correct": false},
            {"text": "30 metros", "correct": false},
            {"text": "50 metros", "correct": false}
        ]
    },
    {
        "question": "Qual é o diâmetro do alvo usado em competições de tiro ao alvo de 10 metros com rifle?",
        "answers": [
            {"text": "5 cm", "correct": false},
            {"text": "10 cm", "correct": false},
            {"text": "15 cm", "correct": true},
            {"text": "20 cm", "correct": false}
        ]
    },
    {
        "question": "Em qual ano o tiro ao alvo foi introduzido como esporte olímpico?",
        "answers": [
            {"text": "1896", "correct": true},
            {"text": "1900", "correct": false},
            {"text": "1920", "correct": false},
            {"text": "1948", "correct": false}
        ]
    },
    {
        "question": "Quantos dardos cada jogador arremessa por rodada em um jogo padrão de dardos?",
        "answers": [
            {"text": "1", "correct": false},
            {"text": "2", "correct": false},
            {"text": "3", "correct": true},
            {"text": "4", "correct": false}
        ]
    },
    {
        "question": "Em qual país o jogo de dardos se originou?",
        "answers": [
            {"text": "Estados Unidos", "correct": false},
            {"text": "Alemanha", "correct": false},
            {"text": "França", "correct": false},
            {"text": "Inglaterra", "correct": true}
        ]
    },
    {
        "question": "Quantos pontos vale o centro do alvo em um jogo de dardos tradicional?",
        "answers": [
            {"text": "25 pontos", "correct": false},
            {"text": "50 pontos", "correct": true},
            {"text": "75 pontos", "correct": false},
            {"text": "100 pontos", "correct": false}
        ]
    },
    {
        "question": "Qual é o peso da bola usada no arremesso de peso masculino em competições oficiais?",
        "answers": [
            {"text": "5 kg", "correct": false},
            {"text": "6 kg", "correct": false},
            {"text": "7,26 kg", "correct": true},
            {"text": "8 kg", "correct": false}
        ]
    },
    {
        "question": "Qual é o peso da bola usada no arremesso de peso feminino em competições oficiais?",
        "answers": [
            {"text": "3 kg", "correct": false},
            {"text": "4 kg", "correct": true},
            {"text": "5 kg", "correct": false},
            {"text": "6 kg", "correct": false}
        ]
    },
    {
        "question": "Quantos pontos são necessários para vencer um set no tênis de mesa?",
        "answers": [
            {"text": "11 pontos", "correct": true},
            {"text": "15 pontos", "correct": false},
            {"text": "21 pontos", "correct": false},
            {"text": "25 pontos", "correct": false}
        ]
    },
    {
        "question": "Qual é a altura oficial da rede no tênis de mesa?",
        "answers": [
            {"text": "12 cm", "correct": false},
            {"text": "15 cm", "correct": false},
            {"text": "18 cm", "correct": false},
            {"text": "15,25 cm", "correct": true}
        ]
    },
    {
        "question": "Quantos sets são necessários para vencer uma partida oficial de tênis de mesa?",
        "answers": [
            {"text": "2 sets", "correct": false},
            {"text": "3 sets", "correct": false},
            {"text": "4 sets", "correct": false},
            {"text": "5 sets", "correct": true}
        ]
    },
    {
        "question": "Qual material é tradicionalmente usado para fabricar bolas de tênis de mesa?",
        "answers": [
            {"text": "Borracha", "correct": false},
            {"text": "Plástico", "correct": true},
            {"text": "Madeira", "correct": false},
            {"text": "Metal", "correct": false}
        ]
    },
    {
        "question": "Em que país o tênis de mesa foi originado?",
        "answers": [
            {"text": "China", "correct": false},
            {"text": "Japão", "correct": false},
            {"text": "Alemanha", "correct": false},
            {"text": "Inglaterra", "correct": true}
        ]
    },
    {
        "question": "Em qual país o pebolim foi inventado?",
        "answers": [
            {"text": "Brasil", "correct": false},
            {"text": "Espanha", "correct": true},
            {"text": "Itália", "correct": false},
            {"text": "Estados Unidos", "correct": false}
        ]
    },
    {
        "question": "Qual é o objetivo principal do jogo de pebolim?",
        "answers": [
            {"text": "Fazer o maior número de passes", "correct": false},
            {"text": "Fazer o maior número de gols", "correct": true},
            {"text": "Defender o gol", "correct": false},
            {"text": "Evitar faltas", "correct": false}
        ]
    },
    {
        "question": "Quantas barras de controle cada jogador manipula em uma partida de pebolim?",
        "answers": [
            {"text": "1 barra", "correct": false},
            {"text": "2 barras", "correct": false},
            {"text": "3 barras", "correct": false},
            {"text": "4 barras", "correct": true}
        ]
    },
    {
        "question": "Qual é a arte marcial japonesa que se concentra no uso de quedas e técnicas de projeção?",
        "answers": [
            {"text": "Karate", "correct": false},
            {"text": "Judo", "correct": true},
            {"text": "Aikido", "correct": false},
            {"text": "Taekwondo", "correct": false}
        ]
    },
    {
        "question": "Quem é considerado o fundador do Aikido?",
        "answers": [
            {"text": "Morihei Ueshiba", "correct": true},
            {"text": "Gichin Funakoshi", "correct": false},
            {"text": "Masutatsu Oyama", "correct": false},
            {"text": "Jigoro Kano", "correct": false}
        ]
    },
    {
        "question": "Qual arte marcial brasileira combina técnicas de luta e movimentos acrobáticos com música?",
        "answers": [
            {"text": "Jiu-Jitsu Brasileiro", "correct": false},
            {"text": "Capoeira", "correct": true},
            {"text": "Luta Livre", "correct": false},
            {"text": "Muay Thai", "correct": false}
        ]
    },
    {
        "question": "Qual é a faixa de graduação mais alta no Karate tradicional?",
        "answers": [
            {"text": "Faixa Preta", "correct": false},
            {"text": "Faixa Branca", "correct": false},
            {"text": "Faixa Vermelha", "correct": false},
            {"text": "Faixa Preta 10º Dan", "correct": true}
        ]
    },
    {
        "question": "Qual arte marcial é conhecida como 'a arte dos oito membros' devido ao uso de punhos, cotovelos, joelhos e canelas?",
        "answers": [
            {"text": "Krav Maga", "correct": false},
            {"text": "Kickboxing", "correct": false},
            {"text": "Muay Thai", "correct": true},
            {"text": "Jiu-Jitsu", "correct": false}
        ]
    },
    {
        "question": "Qual dos seguintes esportes radicais envolve saltar de uma ponte, edifício ou outro ponto alto com uma corda elástica presa ao corpo?",
        "answers": [
            {"text": "Paraquedismo", "correct": false},
            {"text": "Bungee Jumping", "correct": true},
            {"text": "Wingsuit Flying", "correct": false},
            {"text": "Escalada em Rocha", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do esporte radical que consiste em descer rapidamente uma montanha usando uma bicicleta especializada?",
        "answers": [
            {"text": "Mountain Biking", "correct": false},
            {"text": "Downhill Mountain Biking", "correct": true},
            {"text": "Freestyle BMX", "correct": false},
            {"text": "Cross-country Biking", "correct": false}
        ]
    },
    {
        "question": "Qual dos seguintes esportes radicais é praticado em um ambiente aquático e envolve ser puxado por uma lancha enquanto está em uma prancha?",
        "answers": [
            {"text": "Surf", "correct": false},
            {"text": "Wakeboarding", "correct": true},
            {"text": "Kitesurfing", "correct": false},
            {"text": "Windsurfing", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do esporte radical que envolve descer um rio com corredeiras em um bote inflável?",
        "answers": [
            {"text": "Canoagem", "correct": false},
            {"text": "Rafting", "correct": true},
            {"text": "Kayaking", "correct": false},
            {"text": "Hydrospeed", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do esporte radical que combina pára-quedismo com voo em um traje especial que permite ao praticante planar através do ar antes de abrir o paraquedas?",
        "answers": [
            {"text": "BASE Jumping", "correct": false},
            {"text": "Wingsuit Flying", "correct": true},
            {"text": "Hang Gliding", "correct": false},
            {"text": "Paragliding", "correct": false}
        ]
    },
    {
        question: 'Em que ano o tenista brasileiro Gustavo Kuerten foi campeão pela primeira vez do Grand Slam de Roland Garros?',
        answers: [
            { text: '1997', correct: true },
            { text: '1999', correct: false },
            { text: '2001', correct: false },
            { text: '2003', correct: false }
        ]
    },
    {
        question: 'Em qual cidade de Portugal é realizado o campeonato de surf de ondas gigantes?',
        answers: [
            { text: 'Porto', correct: false },
            { text: 'Figueira da Foz', correct: false },
            { text: 'Nazaré', correct: true },
            { text: 'Lisboa', correct: false }
        ]
    },
    {
        question: 'Quem foi o primeiro brasileiro a conquistar um cinturão no UFC?',
        answers: [
            { text: 'Anderson Silva', correct: false },
            { text: 'José Aldo', correct: false },
            { text: 'Murilo Bustamante', correct: true },
            { text: 'Vitor Belfort', correct: false }
        ]
    },
    {
        question: 'No basquete, quantos pontos vale a cesta quando a bola é arremessada de fora do garrafão?',
        answers: [
            { text: '2 pontos', correct: true },
            { text: '3 pontos', correct: false },
            { text: '1 ponto', correct: false },
            { text: '4 pontos', correct: false }
        ]
    },
    {
        question: 'A ex-atleta Daiane do Santos ficou mundialmente conhecida praticando qual esporte?',
        answers: [
            { text: 'Futebol', correct: false },
            { text: 'Atletismo', correct: false },
            { text: 'Ginástica Artística', correct: true },
            { text: 'Natação', correct: false }
        ]
    },
    {
        question: 'Em qual esporte são usadas as mãos para fazer gol?',
        answers: [
            { text: 'Handebol', correct: true },
            { text: 'Basquete', correct: false },
            { text: 'Hóquei', correct: false },
            { text: 'Rugby', correct: false }
        ]
    },
    {
        question: 'Para quem o Brasil perdeu a final da Copa do Mundo de 1950, em pleno Maracanã?',
        answers: [
            { text: 'Uruguai', correct: true },
            { text: 'Argentina', correct: false },
            { text: 'Itália', correct: false },
            { text: 'Alemanha', correct: false }
        ]
    },
    {
        question: 'Quais são as modalidades esportivas praticadas por um triatleta?',
        answers: [
            { text: 'Natação, Ciclismo e Corrida', correct: true },
            { text: 'Tênis, Vôlei e Corrida', correct: false },
            { text: 'Ciclismo, Corrida e Saltos Ornamentais', correct: false },
            { text: 'Ginástica, Corrida e Natação', correct: false }
        ]
    },
    {
        question: 'Em que cidade está localizado o Hall da Fama da NFL?',
        answers: [
            { text: 'Canton, Ohio', correct: true },
            { text: 'New York City, New York', correct: false },
            { text: 'Los Angeles, Califórnia', correct: false },
            { text: 'Dallas, Texas', correct: false }
        ]
    },
    {
        question: 'Simone Biles é famosa por sua habilidade em que esporte?',
        answers: [
            { text: 'Natação', correct: false },
            { text: 'Atletismo', correct: false },
            { text: 'Ginástica', correct: true },
            { text: 'Tênis', correct: false }
        ]
    },
    {
        question: 'Onde termina o Tour de France a cada ano?',
        answers: [
            { text: 'Monte Carlo, Mônaco', correct: false },
            { text: 'Londres, Reino Unido', correct: false },
            { text: 'Barcelona, Espanha', correct: false },
            { text: 'Avenida Champs-Élysées em Paris', correct: true }
        ]
    },
    {
        question: 'Qual é o primeiro nome da estrela do futebol argentino Maradona?',
        answers: [
            { text: 'Juan', correct: false },
            { text: 'Lionel', correct: false },
            { text: 'Diego', correct: true },
            { text: 'Ricardo', correct: false }
        ]
    },
    {
        question: 'Qual é o esporte nacional do Japão?',
        answers: [
            { text: 'Basebol', correct: false },
            { text: 'Sumô', correct: true },
            { text: 'Kendo', correct: false },
            { text: 'Judô', correct: false }
        ]
    },
    {
        question: 'Vestir-se totalmente de branco é obrigatório em qual Grand Slam?',
        answers: [
            { text: 'Wimbledon', correct: true },
            { text: 'US Open', correct: false },
            { text: 'Australian Open', correct: false },
            { text: 'French Open', correct: false }
        ]
    },
    {
        question: 'No volei, este jogador não pode atacar, bloquear ou sacar, possui apenas função defensiva:',
        answers: [
            { text: 'Pivô', correct: false },
            { text: 'Ponteiro', correct: false },
            { text: 'Líbero', correct: true },
            { text: 'Levantador', correct: false }
        ]
    },
    {
        question: 'Qual era o nome do antigo esporte praticado pelos gregos, que envolvia corrida, salto, arremesso e luta?',
        answers: [
            { text: 'Futebol', correct: false },
            { text: 'Atletismo', correct: false },
            { text: 'Pentatlo', correct: true },
            { text: 'Luta Livre', correct: false }
        ]
    },
    {
        question: 'Qual esporte, originado na Índia antiga, envolve posturas corporais e meditação?',
        answers: [
            { text: 'Ginástica Rítmica', correct: false },
            { text: 'Ioga', correct: true },
            { text: 'Sumô', correct: false },
            { text: 'Halterofilismo', correct: false }
        ]
    },
    {
        question: 'Em que país antigo os gladiadores participavam de combates em arenas?',
        answers: [
            { text: 'Egito', correct: false },
            { text: 'Grécia', correct: false },
            { text: 'Roma', correct: true },
            { text: 'Babilônia', correct: false }
        ]
    },
    {
        question: 'Qual era o esporte favorito dos astecas, que usava uma bola de borracha e exigia habilidade nos quadris?',
        answers: [
            { text: 'Futebol', correct: false },
            { text: 'Polo Aquático', correct: false },
            { text: 'Tênis', correct: false },
            { text: 'Jogo de Pelota', correct: true }
        ]
    },
    {
        question: 'Em que civilização antiga se originou o boxe?',
        answers: [
            { text: 'Roma', correct: false },
            { text: 'Grécia', correct: true },
            { text: 'Egito', correct: false },
            { text: 'Persa', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do antigo esporte de luta praticado na Roma Antiga?',
        answers: [
            { text: 'Sumô', correct: false },
            { text: 'Gladiadorismo', correct: true },
            { text: 'Judô', correct: false },
            { text: 'Luta Livre', correct: false }
        ]
    },
    {
        question: 'Que esporte antigo, semelhante ao hóquei, era praticado pelos egípcios?',
        answers: [
            { text: 'Hóquei', correct: false },
            { text: 'Pólo Aquático', correct: false },
            { text: 'Jogo de Bola', correct: false },
            { text: 'Senet', correct: true }
        ]
    },
    {
        question: 'O que os romanos antigos chamavam de "ludus duodecim scriptorum"?',
        answers: [
            { text: 'Xadrez', correct: false },
            { text: 'Damas', correct: false },
            { text: 'Luta de Gladiadores', correct: true },
            { text: 'Corrida de Carroças', correct: false }
        ]
    },
    {
        question: 'Qual esporte antigo, praticado por diversas culturas, envolve lançamento de um disco metálico?',
        answers: [
            { text: 'Disco', correct: false },
            { text: 'Lançamento de Dardo', correct: false },
            { text: 'Arremesso de Peso', correct: false },
            { text: 'Disco de Pedra', correct: true }
        ]
    },
    {
        question: 'Qual equipe ganhou mais títulos na Liga dos Campeões da UEFA? (até 2023)',
        answers: [
            { text: 'Real Madrid', correct: true },
            { text: 'Barcelona', correct: false },
            { text: 'Bayern de Munique', correct: false },
            { text: 'Manchester United', correct: false }
        ]
    },
    {
        question: 'Quem é o artilheiro histórico da Liga dos Campeões da UEFA? (até 2023)',
        answers: [
            { text: 'Lionel Messi', correct: false },
            { text: 'Cristiano Ronaldo', correct: true },
            { text: 'Robert Lewandowski', correct: false },
            { text: 'Raúl González', correct: false }
        ]
    },
    {
        question: 'Quantas equipes avançam da fase de grupos para as oitavas de final na Liga dos Campeões?',
        answers: [
            { text: '12', correct: false },
            { text: '16', correct: true },
            { text: '8', correct: false },
            { text: '24', correct: false }
        ]
    },
    {
        question: 'Em que temporada a Liga dos Campeões foi inaugurada?',
        answers: [
            { text: '1950-1951', correct: false },
            { text: '1960-1961', correct: true },
            { text: '1970-1971', correct: false },
            { text: '1980-1981', correct: false }
        ]
    },
    {
        question: 'Qual país sediou a primeira final da Liga dos Campeões?',
        answers: [
            { text: 'Inglaterra', correct: false },
            { text: 'Espanha', correct: false },
            { text: 'Suíça', correct: true },
            { text: 'Itália', correct: false }
        ]
    },
    {
        question: 'Qual jogador marcou o gol mais rápido (10,12 segundos) na história da Liga dos Campeões, em 2007?',
        answers: [
            { text: 'Lionel Messi', correct: false },
            { text: 'Roy Makaay', correct: true },
            { text: 'Cristiano Ronaldo', correct: false },
            { text: 'Neymar', correct: false }
        ]
    },
    {
        question: 'Quem é conhecido como o "Rei da Liga dos Campeões"?',
        answers: [
            { text: 'Lionel Messi', correct: false },
            { text: 'Cristiano Ronaldo', correct: true },
            { text: 'Neymar', correct: false },
            { text: 'Robert Lewandowski', correct: false }
        ]
    },
    {
        question: 'Quem é conhecido como o "Fenômeno"?',
        answers: [
            { text: 'Lionel Messi', correct: false },
            { text: 'Cristiano Ronaldo', correct: false },
            { text: 'Neymar', correct: false },
            { text: 'Ronaldo Nazário', correct: true }
        ]
    },
    {
        question: 'Quem foi apelidado de "O Imperador"?',
        answers: [
            { text: 'Adriano', correct: true },
            { text: 'Romário', correct: false },
            { text: 'Kaká', correct: false },
            { text: 'Zico', correct: false }
        ]
    },
    {
        question: 'Qual desses jogadores argentinos é conhecido como "La Pulga"?',
        answers: [
            { text: 'Diego Maradona', correct: false },
            { text: 'Sergio Agüero', correct: false },
            { text: 'Lionel Messi', correct: true },
            { text: 'Gabriel Batistuta', correct: false }
        ]
    },
    {
        question: 'Quem é o goleiro brasileiro conhecido como "São Marcos"?',
        answers: [
            { text: 'Julio Cesar', correct: false },
            { text: 'Dida', correct: false },
            { text: 'Marcos Reis', correct: true },
            { text: 'Alisson Becker', correct: false }
        ]
    },
    {
        question: 'Qual jogador é chamado de "Zizou"?',
        answers: [
            { text: 'Zinedine Zidane', correct: true },
            { text: 'Zico', correct: false },
            { text: 'Zlatan Ibrahimović', correct: false },
            { text: 'Zico', correct: false }
        ]
    },
    {
        question: 'Qual jogador italiano é chamado de "Il Capitano"?',
        answers: [
            { text: 'Andrea Pirlo', correct: false },
            { text: 'Paolo Maldini', correct: false },
            { text: 'Francesco Totti', correct: true },
            { text: 'Alessandro Del Piero', correct: false }
        ]
    },
    {
        question: 'Quem é considerado o "Maestro"?',
        answers: [
            { text: 'Xavi Hernández', correct: false },
            { text: 'Andrés Iniesta', correct: false },
            { text: 'Andrea Pirlo', correct: false },
            { text: 'Zinedine Zidane', correct: true }
        ]
    },
    {
        question: 'Qual jogador é conhecido como "Kun"?',
        answers: [
            { text: 'Sergio Ramos', correct: false },
            { text: 'Lionel Messi', correct: false },
            { text: 'Neymar', correct: false },
            { text: 'Sergio Agüero', correct: true }
        ]
    },
    {
        question: 'Quem é apelidado de "Baleia"?',
        answers: [
            { text: 'Lionel Messi', correct: false },
            { text: 'Cristiano Ronaldo', correct: false },
            { text: 'Wayne Rooney', correct: true },
            { text: 'Luis Suárez', correct: false }
        ]
    },
    {
        question: 'Qual jogador é chamado de "CR7"?',
        answers: [
            { text: 'Cristiano Ronaldo', correct: true },
            { text: 'Lionel Messi', correct: false },
            { text: 'Neymar', correct: false },
            { text: 'Kylian Mbappé', correct: false }
        ]
    },
    {
        question: 'Quem é conhecido como "Ibracadabra"?',
        answers: [
            { text: 'Robert Lewandowski', correct: false },
            { text: 'Zlatan Ibrahimović', correct: true },
            { text: 'Sergio Agüero', correct: false },
            { text: 'Harry Kane', correct: false }
        ]
    },
    {
        question: 'Qual jogador é chamado de "El Pibe"?',
        answers: [
            { text: 'Pelé', correct: false },
            { text: 'Lionel Messi', correct: false },
            { text: 'Diego Maradona', correct: true },
            { text: 'Ronaldinho Gaúcho', correct: false }
        ]
    },
    {
        question: 'Quem é conhecido como "Ney"?',
        answers: [
            { text: 'Neymar', correct: true },
            { text: 'Lionel Messi', correct: false },
            { text: 'Cristiano Ronaldo', correct: false },
            { text: 'Kylian Mbappé', correct: false }
        ]
    },
    {
        question: 'Qual jogador é chamado de "Gigante"?',
        answers: [
            { text: 'Peter Crouch', correct: false },
            { text: 'Didier Drogba', correct: false },
            { text: 'Zlatan Ibrahimović', correct: false },
            { text: 'Romelu Lukaku', correct: true }
        ]
    },
    {
        question: 'Qual goleiro é conhecido como "O Muralha"?',
        answers: [
            { text: 'Keylor Navas', correct: false },
            { text: 'Thibaut Courtois', correct: false },
            { text: 'Diego Alves', correct: true },
            { text: 'Alisson Becker', correct: false }
        ]
    },
    {
        question: 'Quem é frequentemente chamado de "São Victor"?',
        answers: [
            { text: 'David De Gea', correct: false },
            { text: 'Hugo Lloris', correct: false },
            { text: 'Victor Valdés', correct: false },
            { text: 'Victor Fernández', correct: true }
        ]
    },
    {
        question: 'Qual goleiro é conhecido por suas habilidades com os pés e é chamado de "O Dibrujo"?',
        answers: [
            { text: 'Ederson', correct: true },
            { text: 'Manuel Neuer', correct: false },
            { text: 'Marc-André ter Stegen', correct: false },
            { text: 'Keylor Navas', correct: false }
        ]
    },
    {
        question: 'Qual goleiro é conhecido por sua longa carreira no Juventus e é chamado de "Super Gigi"?',
        answers: [
            { text: 'Hugo Lloris', correct: false },
            { text: 'Iker Casillas', correct: false },
            { text: 'Gianluigi Buffon', correct: true },
            { text: 'Petr Čech', correct: false }
        ]
    },
    {
        question: 'Qual goleiro brasileiro é conhecido como "Zetti"?',
        answers: [
            { text: 'Taffarel', correct: false },
            { text: 'Dida', correct: false },
            { text: 'Gilmar dos Santos Neves', correct: false },
            { text: 'Zetti', correct: true }
        ]
    },
    {   question: 'Qual país sediou a Copa do Mundo de 1998, onde a seleção brasileira chegou à final?',
        answers: [
            {text: 'França', correct: true},
            {text: 'Itália', correct: false},
            {text: 'Alemanha', correct: false},
            {text: 'Japão', correct: false},
        ]
    },
    {
        question: 'Quanto tempo dura uma partida de futebol?',
        answers: [
            { text: '60 minutos', correct: false },
            { text: '90 minutos', correct: true },
            { text: '120 minutos', correct: false },
            { text: '45 minutos', correct: false }
        ]
    },
    {
        question: 'Quando foi realizada a primeira Copa do Mundo de futebol?',
        answers: [
            { text: '1928', correct: false },
            { text: '1930', correct: true },
            { text: '1940', correct: false },
            { text: '1950', correct: false }
        ]
    },
    {
        question: 'Em que cidade está localizado o estádio popularmente conhecido como La Bombonera?',
        answers: [
            { text: 'Rio de Janeiro', correct: false },
            { text: 'São Paulo', correct: false },
            { text: 'Buenos Aires', correct: true },
            { text: 'Montevidéu', correct: false }
        ]
    },
    {
        question: 'Quanto tempo dura a prorrogação em um jogo de futebol?',
        answers: [
            { text: '15 minutos', correct: false },
            { text: '20 minutos', correct: false },
            { text: '30 minutos', correct: true },
            { text: '45 minutos', correct: false }
        ]
    },
    {
        question: 'Quem ganhou a Copa do Mundo de 2010?',
        answers: [
            { text: 'Alemanha', correct: false },
            { text: 'Espanha', correct: true },
            { text: 'Brasil', correct: false },
            { text: 'Argentina', correct: false }
        ]
    }, {
        question: 'Em que time italiano jogou Diego Maradona?',
        answers: [
            { text: 'Juventus', correct: false },
            { text: 'AC Milan', correct: false },
            { text: 'Inter de Milão', correct: false },
            { text: 'Napoli', correct: true }
        ]
    },
    {
        question: 'De que cidade é o Chelsea Football Club?',
        answers: [
            { text: 'Manchester', correct: false },
            { text: 'Liverpool', correct: false },
            { text: 'Fulham', correct: true },
            { text: 'Londres', correct: false }
        ]
    },
    {
        question: 'Quais são as cores da camisa do Atlético de Madrid?',
        answers: [
            { text: 'Azul e branco', correct: false },
            { text: 'Preto e vermelho', correct: false },
            { text: 'Vermelho e branco', correct: true },
            { text: 'Verde e amarelo', correct: false }
        ]
    },
    {
        question: 'Qual time da Premier League tem mais campeonatos ganhos?',
        answers: [
            { text: 'Liverpool', correct: false },
            { text: 'Arsenal', correct: false },
            { text: 'Chelsea', correct: false },
            { text: 'Manchester United', correct: true }
        ]
    },
    {
        question: 'Qual revista premia a chamada Bola de Ouro?',
        answers: [
            { text: 'ESPN', correct: false },
            { text: 'FIFA', correct: false },
            { text: 'BBC Sport', correct: false },
            { text: 'France Football', correct: true }
        ]
    },
    {
        question: 'Qual o nome do estádio do Bayern de Munich?',
        answers: [
            { text: 'Signal Iduna Park', correct: false },
            { text: 'Mercedes-Benz Arena', correct: false },
            { text: 'Veltins-Arena', correct: false },
            { text: 'Allianz Arena', correct: true }
        ]
    },
    {
        question: 'Que seleção venceu a Copa do Mundo da França, em 1998?',
        answers: [
            { text: 'Itália', correct: false },
            { text: 'Brasil', correct: false },
            { text: 'Argentina', correct: false },
            { text: 'França', correct: true }
        ]
    },
    {
        question: 'Em que ano Pep Guardiola estreou como treinador do FC Barcelona?',
        answers: [
            { text: '2006', correct: false },
            { text: '2008', correct: true },
            { text: '2010', correct: false },
            { text: '2012', correct: false }
        ]
    },
    {
        question: 'Qual o time mais famoso da cidade italiana de Turín?',
        answers: [
            { text: 'AC Milan', correct: false },
            { text: 'Inter de Milão', correct: false },
            { text: 'Torino', correct: false },
            { text: 'Juventus', correct: true }
        ]
    },
    {
        question: 'Em que país foi inventado o voleibol?',
        answers: [
            { text: 'Estados Unidos', correct: true },
            { text: 'Brasil', correct: false },
            { text: 'Rússia', correct: false },
            { text: 'China', correct: false }
        ]
    },
    {
        question: 'Que tipo de competição é o Giro d\'Italia?',
        answers: [
            { text: 'Ciclismo', correct: true },
            { text: 'Esqui alpino', correct: false },
            { text: 'Tênis', correct: false },
            { text: 'Atletismo', correct: false }
        ]
    },
    {
        question: 'Em que país está localizado o circuito de Le Mans?',
        answers: [
            { text: 'Itália', correct: false },
            { text: 'Alemanha', correct: false },
            { text: 'França', correct: true },
            { text: 'Espanha', correct: false }
        ]
    },
    {
        question: 'Qual é o nome da área do gramado onde está localizado o buraco de golfe?',
        answers: [
            { text: 'Fairway', correct: false },
            { text: 'Rough', correct: false },
            { text: 'Green', correct: true },
            { text: 'Bunker', correct: false }
        ]
    },
    {
        question: 'Quem foi o número 1 do tênis em 2008?',
        answers: [
            { text: 'Roger Federer', correct: false },
            { text: 'Rafael Nadal', correct: true },
            { text: 'Novak Djokovic', correct: false },
            { text: 'Andy Murray', correct: false }
        ]
    },
    {
        question: 'Quanto tempo dura uma partida de handebol?',
        answers: [
            { text: '45 minutos', correct: false },
            { text: '60 minutos', correct: true },
            { text: '75 minutos', correct: false },
            { text: '90 minutos', correct: false }
        ]
    },
    {
        question: 'Quem ganhou 4 mundiais consecutivos de Fórmula 1?',
        answers: [
            { text: 'Michael Schumacher', correct: false },
            { text: 'Ayrton Senna', correct: false },
            { text: 'Sebastián Vettel', correct: true },
            { text: 'Lewis Hamilton', correct: false }
        ]
    },
    {
        question: 'Quanto tempo dura uma partida de basquete na NBA?',
        answers: [
            { text: '40 minutos', correct: false },
            { text: '48 minutos', correct: true },
            { text: '60 minutos', correct: false },
            { text: '30 minutos', correct: false }
        ]
    },
    {
        question: 'Qual é o recorde mundial no salto em equitação?',
        answers: [
            { text: '2,20 metros', correct: false },
            { text: '2,35 metros', correct: false },
            { text: '2,47 metros', correct: true },
            { text: '2,10 metros', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do estilo de atletismo em que os corredores carregam um bastão?',
        answers: [
            { text: 'Corrida com obstáculos', correct: false },
            { text: 'Corrida de revezamento', correct: true },
            { text: 'Maratona', correct: false },
            { text: 'Sprint', correct: false }
        ]
    },
    {
        question: 'O que acontece se a bolinha tocar a rede em um saque de pingue-pongue?',
        answers: [
            { text: 'Ponto para quem sacou', correct: false },
            { text: 'A jogada é anulada e deve ser sacado novamente', correct: true },
            { text: 'Ponto para o adversário', correct: false },
            { text: 'A partida é encerrada', correct: false }
        ]
    },
    {
        question: 'Qual é o nome de um gol marcado no futebol americano?',
        answers: [
            { text: 'Touchdown', correct: true },
            { text: 'Field goal', correct: false },
            { text: 'Safety', correct: false },
            { text: 'Extra point', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do local onde são realizadas as corridas de cavalos?',
        answers: [
            { text: 'Estádio', correct: false },
            { text: 'Campo', correct: false },
            { text: 'Hipódromo', correct: true },
            { text: 'Pista', correct: false }
        ]
    },
    {
        question: 'A que esporte pertence o corner curto?',
        answers: [
            { text: 'Futebol', correct: false },
            { text: 'Tênis', correct: false },
            { text: 'Hóquei sobre grama', correct: true },
            { text: 'Golfe', correct: false }
        ]
    },
    {
        question: 'A cada quantos anos são realizados os Jogos Olímpicos?',
        answers: [
            { text: '2 anos', correct: false },
            { text: '4 anos', correct: true },
            { text: '6 anos', correct: false },
            { text: '8 anos', correct: false }
        ]
    },
    {
        question: 'Quem foi a primeira mulher a ganhar uma medalha olímpica?',
        answers: [
            { text: 'Serena Williams', correct: false },
            { text: 'Simone Biles', correct: false },
            { text: 'Charlotte Reinagle Cooper', correct: true },
            { text: 'Gabby Douglas', correct: false }
        ]
    },
    {
        question: 'Que arte marcial de origem sul-americana foi criada para se parecer com uma dança?',
        answers: [
            { text: 'Jiu-Jitsu', correct: false },
            { text: 'Muay Thai', correct: false },
            { text: 'Capoeira', correct: true },
            { text: 'Krav Maga', correct: false }
        ]
    },
    {
        question: 'Quantos punhos existem de cada lado de um futebol de mesa (Pebolim)?',
        answers: [
            { text: '2', correct: false },
            { text: '3', correct: false },
            { text: '4', correct: true },
            { text: '5', correct: false }
        ]
    },
    {
        question: 'Quais as cores da camisa de jogo da seleção nigeriana?',
        answers: [
            { text: 'Azul e amarelo', correct: false },
            { text: 'Branco e verde', correct: true },
            { text: 'Preto e vermelho', correct: false },
            { text: 'Amarelo e verde', correct: false }
        ]
    },
    {
        question: 'Quanto pesa uma bola de boliche?',
        answers: [
            { text: '1 a 3 kg', correct: false },
            { text: '3 a 5 kg', correct: false },
            { text: '5 a 7 kg', correct: true },
            { text: '7 a 9 kg', correct: false }
        ]
    },
    {
        question: 'Em que país nasceram os dardos?',
        answers: [
            { text: 'Escócia', correct: false },
            { text: 'Irlanda', correct: false },
            { text: 'Inglaterra', correct: true },
            { text: 'País de Gales', correct: false }
        ]
    },
    {
        question: 'Qual peça de xadrez pode fazer um movimento em forma de L?',
        answers: [
            { text: 'Rei', correct: false },
            { text: 'Rainha', correct: false },
            { text: 'Cavalo', correct: true },
            { text: 'Torre', correct: false }
        ]
    },
    {
        question: "Qual é o esporte que tem o termo 'strike' e 'ball'?",
        answers: [
            { text: "Futebol", correct: false },
            { text: "Basebol", correct: true },
            { text: "Tênis", correct: false },
            { text: "Golfe", correct: false }
        ]
    },
    {
        question: "Em que país o críquete é mais popular?",
        answers: [
            { text: "Índia", correct: true },
            { text: "Austrália", correct: false },
            { text: "Inglaterra", correct: false },
            { text: "África do Sul", correct: false }
        ]
    },
    {
        question: "Quantos jogadores compõem uma equipe de polo aquático?",
        answers: [
            { text: "7", correct: false },
            { text: "6", correct: false },
            { text: "5", correct: false },
            { text: "8", correct: true }
        ]
    },
    {
        question: "Qual é o esporte que é jogado em um campo chamado 'pitch'?",
        answers: [
            { text: "Críquete", correct: false },
            { text: "Rúgbi", correct: false },
            { text: "Futebol Americano", correct: false },
            { text: "Hóquei", correct: true }
        ]
    },
    {
        question: "Qual é o esporte em que os jogadores competem para ver quem lança um disco no menor número de arremessos?",
        answers: [
            { text: "Golfe", correct: false },
            { text: "Disco", correct: true },
            { text: "Lançamento de Dardo", correct: false },
            { text: "Ultimate Frisbee", correct: false }
        ]
    },
    {
        question: "Em que esporte você pode ganhar pontos com um 'grand slam'?",
        answers: [
            { text: "Tênis", correct: true },
            { text: "Golfe", correct: false },
            { text: "Basebol", correct: false },
            { text: "Pólo Aquático", correct: false }
        ]
    },
    {
        question: "Qual é o esporte que envolve uma corrida de barcos impulsionados por remos?",
        answers: [
            { text: "Vela", correct: false },
            { text: "Canoagem", correct: false },
            { text: "Remo", correct: true },
            { text: "Surfe", correct: false }
        ]
    },
    {
        question: "Em que esporte você pode realizar um 'hat-trick'?",
        answers: [
            { text: "Futebol", correct: true },
            { text: "Vôlei", correct: false },
            { text: "Basquete", correct: false },
            { text: "Tênis de Mesa", correct: false }
        ]
    },
    {
        question: "Qual é o esporte que tem posições como 'quarterback', 'wide receiver' e 'cornerback'?",
        answers: [
            { text: "Rúgbi", correct: false },
            { text: "Futebol Americano", correct: true },
            { text: "Hóquei no Gelo", correct: false },
            { text: "Basebol", correct: false }
        ]
    },
    {
        question: "Em que esporte os jogadores competem para derrubar o maior número de pinos com uma bola?",
        answers: [
            { text: "Críquete", correct: false },
            { text: "Boliche", correct: true },
            { text: "Beisebol", correct: false },
            { text: "Tênis", correct: false }
        ]
    },
    {
        question: "Quantos jogadores compõem uma equipe de vôlei de quadra durante um jogo?",
        answers: [
            { text: "6", correct: true },
            { text: "5", correct: false },
            { text: "7", correct: false },
            { text: "4", correct: false }
        ]
    },
    {
        question: "Qual é o esporte que é jogado em uma quadra dividida por uma rede, e os jogadores usam uma 'birdie'?",
        answers: [
            { text: "Tênis", correct: false },
            { text: "Badminton", correct: true },
            { text: "Vôlei de Praia", correct: false },
            { text: "Pickleball", correct: false }
        ]
    },
    {
        question: "Qual é o esporte que é disputado em cima de um cavalo, em uma pista com obstáculos, incluindo saltos de água?",
        answers: [
            { text: "Ciclismo BMX", correct: false },
            { text: "Atletismo", correct: false },
            { text: "Hipismo", correct: true },
            { text: "Natação Sincronizada", correct: false }
        ]
    },
    {
        question: "Qual é o esporte em que os atletas descem uma montanha coberta de neve usando esquis?",
        answers: [
            { text: "Snowboard", correct: false },
            { text: "Esqui Cross-Country", correct: false },
            { text: "Esqui Alpino", correct: true },
            { text: "Biatlo", correct: false }
        ]
    },
    {
        question: "Qual é o esporte que envolve a realização de manobras acrobáticas em uma trave elevada?",
        answers: [
            { text: "Ginástica Artística", correct: true },
            { text: "Salto com Vara", correct: false },
            { text: "Trampolim", correct: false },
            { text: "Ginástica Rítmica", correct: false }
        ]
    },
    {
        question: "Qual é o esporte que é jogado em um campo dividido por linhas de giz, e os jogadores usam gizes coloridos?",
        answers: [
            { text: "Pólo Aquático", correct: false },
            { text: "Rúgbi", correct: false },
            { text: "Croquet", correct: true },
            { text: "Pólo", correct: false }
        ]
    },
    {
        question: "Qual é o esporte que é jogado em um ringue com patins e os jogadores usam tacos para acertar um disco?",
        answers: [
            { text: "Hóquei no Gelo", correct: true },
            { text: "Patinagem Artística", correct: false },
            { text: "Curling", correct: false },
            { text: "Patinagem de Velocidade", correct: false }
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
        question: "Qual é o esporte em que os jogadores deslizam pedras de granito polido em uma pista de gelo em direção a um alvo segmentado em círculos concêntricos?",
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


const qgeo=[
    {
        question: 'Quais são os Alpes franceses?',
        answers: [
            { text: 'Uma cordilheira na França', correct: true },
            { text: 'Um rio na França', correct: false },
            { text: 'Um deserto na França', correct: false },
            { text: 'Uma cidade na França', correct: false }
        ]
    },
    {
        "question": "Qual é o nome do tratado que dividiu a Alemanha em duas partes após a Segunda Guerra Mundial?",
        "answers": [
            {"text": "Tratado de Versalhes", "correct": false},
            {"text": "Tratado de Yalta", "correct": false},
            {"text": "Tratado de Potsdam", "correct": true},
            {"text": "Tratado de Paris", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome da organização fundada em 1949 para promover a cooperação econômica entre os países europeus ocidentais e fornecer uma defesa coletiva contra a União Soviética?",
        "answers": [
            {"text": "ONU", "correct": false},
            {"text": "NATO", "correct": true},
            {"text": "G7", "correct": false},
            {"text": "UE", "correct": false}
        ]
    },
    {
        "question": "Qual país é considerado o maior exportador de petróleo do mundo?",
        "answers": [
            {"text": "Rússia", "correct": false},
            {"text": "Estados Unidos", "correct": false},
            {"text": "Arábia Saudita", "correct": true},
            {"text": "China", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do conceito político e militar desenvolvido durante a Guerra Fria que descreve a política de prevenção da expansão comunista?",
        "answers": [
            {"text": "Doutrina Monroe", "correct": false},
            {"text": "Doutrina Truman", "correct": true},
            {"text": "Doutrina Brezhnev", "correct": false},
            {"text": "Doutrina Eisenhower", "correct": false}
        ]
    },
    {
        "question": "Qual país europeu é conhecido por sua política de neutralidade armada?",
        "answers": [
            {"text": "Suíça", "correct": true},
            {"text": "Suécia", "correct": false},
            {"text": "Áustria", "correct": false},
            {"text": "Noruega", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do maior atlas do mundo, que pesa aproximadamente 150 kg e possui páginas que medem 1,8 metros de altura por 2,7 metros de largura?",
        "answers": [
            {"text": "Atlas Maior", "correct": false},
            {"text": "Atlas Mundial", "correct": false},
            {"text": "Klencke Atlas", "correct": true},
            {"text": "Theatrum Orbis Terrarum", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do famoso atlas que foi publicado pela primeira vez em 1579 por Gerardus Mercator e é conhecido por sua projeção cartográfica?",
        "answers": [
            {"text": "Atlas Universal", "correct": false},
            {"text": "Atlas Geográfico", "correct": false},
            {"text": "Theatrum Orbis Terrarum", "correct": false},
            {"text": "Atlas Mercator", "correct": true}
        ]
    },
    {
        "question": "Qual é o nome do atlas que apresenta mapas detalhados de regiões específicas e é frequentemente usado por geólogos, geógrafos e planejadores urbanos?",
        "answers": [
            {"text": "Atlas Mundial", "correct": false},
            {"text": "Atlas de Estradas", "correct": false},
            {"text": "Atlas Topográfico", "correct": true},
            {"text": "Atlas Histórico", "correct": false}
        ]
    },
    {
        "question": "Quantos fusos horários existem no total?",
        "answers": [
            {"text": "12", "correct": false},
            {"text": "24", "correct": true},
            {"text": "36", "correct": false},
            {"text": "48", "correct": false}
        ]
    },
    {
        "question": "Qual é a diferença de tempo entre dois fusos horários adjacentes?",
        "answers": [
            {"text": "30 minutos", "correct": false},
            {"text": "45 minutos", "correct": false},
            {"text": "1 hora", "correct": true},
            {"text": "2 horas", "correct": false}
        ]
    },
    {
        "question": "Qual é o fuso horário de referência utilizado como base para todos os outros?",
        "answers": [
            {"text": "UTC", "correct": true},
            {"text": "EST", "correct": false},
            {"text": "GMT", "correct": false},
            {"text": "CET", "correct": false}
        ]
    },
    {
        "question": "Em que direção você deve viajar para ganhar uma hora de tempo?",
        "answers": [
            {"text": "Leste", "correct": true},
            {"text": "Oeste", "correct": false},
            {"text": "Norte", "correct": false},
            {"text": "Sul", "correct": false}
        ]
    },
    {
        question: "O que é a desertificação?",
        answers: [
            { text: "Expansão de áreas florestais", correct: false },
            { text: "Processo de aumento da umidade no solo", correct: false },
            { text: "Degradamento de áreas inicialmente produtivas, tornando-as semelhantes a desertos", correct: true },
            { text: "Processo de formação de desertos", correct: false }
        ]
    },
    {
        "question": "Qual é o maior deserto quente do mundo?",
        "answers": [
            {"text": "Deserto do Saara", "correct": true},
            {"text": "Deserto da Arábia", "correct": false},
            {"text": "Deserto do Kalahari", "correct": false},
            {"text": "Deserto de Sonora", "correct": false}
        ]
    },
    {
        "question": "Qual deserto está localizado na China e na Mongólia?",
        "answers": [
            {"text": "Deserto de Gobi", "correct": true},
            {"text": "Deserto do Thar", "correct": false},
            {"text": "Deserto de Atacama", "correct": false},
            {"text": "Deserto do Kalahari", "correct": false}
        ]
    },
    {
        "question": "Qual deserto é conhecido por ser o lugar mais seco da Terra?",
        "answers": [
            {"text": "Deserto do Saara", "correct": false},
            {"text": "Deserto de Atacama", "correct": true},
            {"text": "Deserto de Gobi", "correct": false},
            {"text": "Deserto do Kalahari", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do deserto que cobre grande parte do sudoeste dos Estados Unidos?",
        "answers": [
            {"text": "Deserto de Sonora", "correct": true},
            {"text": "Deserto de Mojave", "correct": false},
            {"text": "Deserto de Chihuahua", "correct": false},
            {"text": "Deserto de Great Basin", "correct": false}
        ]
    },
    {
        "question": "Qual é o principal fator que contribui para a formação de falésias?",
        "answers": [
            {"text": "Atividade vulcânica", "correct": false},
            {"text": "Erosão costeira", "correct": true},
            {"text": "Movimentos tectônicos", "correct": false},
            {"text": "Acumulação de sedimentos", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome da famosa falésia na Irlanda, conhecida por suas vistas impressionantes e por ser um local turístico popular?",
        "answers": [
            {"text": "Falésias de Moher", "correct": true},
            {"text": "Falésias Brancas de Dover", "correct": false},
            {"text": "Falésia de Preikestolen", "correct": false},
            {"text": "Falésia de Étretat", "correct": false}
        ]
    },
    {
        "question": "Em qual país estão localizadas as Falésias Brancas de Dover?",
        "answers": [
            {"text": "França", "correct": false},
            {"text": "Irlanda", "correct": false},
            {"text": "Inglaterra", "correct": true},
            {"text": "Escócia", "correct": false}
        ]
    },
    {
        "question": "Qual é a definição mais precisa de um riacho?",
        "answers": [
            {"text": "Um grande corpo de água salgada", "correct": false},
            {"text": "Um corpo de água doce que flui continuamente", "correct": true},
            {"text": "Um lago pequeno", "correct": false},
            {"text": "Um corpo de água parada", "correct": false}
        ]
    },
    {
        "question": "Qual é a diferença principal entre um riacho e um rio?",
        "answers": [
            {"text": "Os rios são sempre mais curtos", "correct": false},
            {"text": "Os riachos são menores e mais estreitos", "correct": true},
            {"text": "Os riachos têm água salgada", "correct": false},
            {"text": "Os rios não têm correnteza", "correct": false}
        ]
    },
    {
        "question": "Qual termo descreve o habitat aquático formado pela interação de um riacho com a vegetação circundante?",
        "answers": [
            {"text": "Zona ripária", "correct": true},
            {"text": "Zona abissal", "correct": false},
            {"text": "Zona pelágica", "correct": false},
            {"text": "Zona bentônica", "correct": false}
        ]
    },
    {
        "question": "Qual é um dos principais fatores que influenciam a temperatura da água em um riacho?",
        "answers": [
            {"text": "A profundidade do riacho", "correct": false},
            {"text": "A quantidade de luz solar recebida", "correct": true},
            {"text": "A quantidade de sal na água", "correct": false},
            {"text": "A largura do riacho", "correct": false}
        ]
    },
    {
        "question": "Qual é a principal função dos riachos em um ecossistema?",
        "answers": [
            {"text": "Fornecer água salgada", "correct": false},
            {"text": "Servir como corredores para a migração de peixes e outras espécies", "correct": true},
            {"text": "Actuar como uma barreira para animais terrestres", "correct": false},
            {"text": "Aumentar a salinidade do solo", "correct": false}
        ]
    },
    {
        "question": "Qual é o cânion mais famoso dos Estados Unidos, conhecido por suas impressionantes formações geológicas e pelo rio Colorado que o atravessa?",
        "answers": [
            {"text": "Cânion de Bryce", "correct": false},
            {"text": "Cânion de Zion", "correct": false},
            {"text": "Cânion de Antelope", "correct": false},
            {"text": "Grand Canyon", "correct": true}
        ]
    },
    {
        "question": "Qual é o maior cânion do mundo em termos de volume?",
        "answers": [
            {"text": "Cânion de Colca", "correct": false},
            {"text": "Cânion de Copper", "correct": false},
            {"text": "Cânion de Yarlung Tsangpo", "correct": true},
            {"text": "Cânion de Fish River", "correct": false}
        ]
    },
    {
        "question": "Qual fenômeno natural é principalmente responsável pela formação de cânions?",
        "answers": [
            {"text": "Atividade vulcânica", "correct": false},
            {"text": "Erosão pela água", "correct": true},
            {"text": "Movimentos tectônicos", "correct": false},
            {"text": "Erosão pelo vento", "correct": false}
        ]
    },
    {
        "question": "Qual cânion está localizado no estado de Utah e é conhecido por suas impressionantes cores vermelhas e laranjas?",
        "answers": [
            {"text": "Cânion de Bryce", "correct": true},
            {"text": "Cânion de Zion", "correct": false},
            {"text": "Cânion de Antelope", "correct": false},
            {"text": "Cânion do Rio Blyde", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do cânion submerso mais profundo do mundo, localizado no oceano Pacífico?",
        "answers": [
            {"text": "Cânion de Monterey", "correct": true},
            {"text": "Cânion de Kaikoura", "correct": false},
            {"text": "Cânion de Zhemchug", "correct": false},
            {"text": "Cânion de Perth", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome tradicional japonês para pipas?",
        "answers": [
            {"text": "Hinomaru", "correct": false},
            {"text": "Kamikaze", "correct": false},
            {"text": "Tako", "correct": true},
            {"text": "Samurai", "correct": false}
        ]
    },
    {
        "question": "Qual é o maior vulcão ativo do mundo, localizado no Havaí?",
        "answers": [
            {"text": "Monte Santa Helena", "correct": false},
            {"text": "Monte Vesúvio", "correct": false},
            {"text": "Mauna Loa", "correct": true},
            {"text": "Krakatoa", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome da caldeira vulcânica localizada em Wyoming, EUA, que é um dos maiores sistemas vulcânicos do mundo?",
        "answers": [
            {"text": "Caldeira de Long Valley", "correct": false},
            {"text": "Caldeira de Yellowstone", "correct": true},
            {"text": "Caldeira de Crater Lake", "correct": false},
            {"text": "Caldeira de Valles", "correct": false}
        ]
    },
    {
        "question": "Qual é a ponte mais longa do mundo em termos de extensão total? Tem 164,8km.",
        "answers": [
            {"text": "Ponte da Baía de Hangzhou", "correct": false},
            {"text": "Ponte do Lago Pontchartrain", "correct": false},
            {"text": "Ponte Danyang–Kunshan Grand", "correct": true},
            {"text": "Ponte da Baía de Chesapeake", "correct": false}
        ]
    },
    {
        "question": "Qual ponte conecta São Francisco a Marin County na Califórnia, EUA?",
        "answers": [
            {"text": "Ponte Golden Gate", "correct": true},
            {"text": "Ponte Brooklyn", "correct": false},
            {"text": "Ponte de Sydney", "correct": false},
            {"text": "Ponte de Londres", "correct": false}
        ]
    },
    {
        "question": "Qual é a ponte levadiça mais famosa de Londres?",
        "answers": [
            {"text": "Ponte de Londres", "correct": false},
            {"text": "Ponte de Westminster", "correct": false},
            {"text": "Ponte da Torre", "correct": true},
            {"text": "Ponte de Blackfriars", "correct": false}
        ]
    },
    {
        "question": "Qual é a característica distintiva da Ponte Rialto em Veneza, Itália?",
        "answers": [
            {"text": "É uma ponte levadiça", "correct": false},
            {"text": "Tem lojas em ambos os lados", "correct": true},
            {"text": "É feita de metal", "correct": false},
            {"text": "É a ponte mais longa do mundo", "correct": false}
        ]
    },
    {
        "question": "Qual é a ponte de pedestres e ciclistas que atravessa o Rio Sena em Paris?",
        "answers": [
            {"text": "Ponte Neuf", "correct": false},
            {"text": "Ponte Alexandre III", "correct": false},
            {"text": "Ponte das Artes", "correct": true},
            {"text": "Ponte Mirabeau", "correct": false}
        ]
    },
    {
        "question": "Qual foi o primeiro trem a vapor de passageiros do mundo?",
        "answers": [
            {"text": "Puffing Billy", "correct": false},
            {"text": "Tom Thumb", "correct": false},
            {"text": "Rocket", "correct": true},
            {"text": "The Best Friend of Charleston", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome da locomotiva a vapor mais famosa do mundo, atualmente em exibição no Museu Nacional Ferroviário em York, Inglaterra?",
        "answers": [
            {"text": "Mallard", "correct": true},
            {"text": "Flying Scotsman", "correct": false},
            {"text": "The Royal Scot", "correct": false},
            {"text": "Evening Star", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do sistema ferroviário de alta velocidade que conecta várias cidades na Europa?",
        "answers": [
            {"text": "TGV", "correct": true},
            {"text": "Shinkansen", "correct": false},
            {"text": "Eurostar", "correct": false},
            {"text": "ICE", "correct": false}
        ]
    },
    {
        "question": "Em que país está localizado o Glacier Express, um famoso trem panorâmico que viaja pelos Alpes suíços?",
        "answers": [
            {"text": "Suíça", "correct": true},
            {"text": "Áustria", "correct": false},
            {"text": "França", "correct": false},
            {"text": "Itália", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do famoso trem de luxo que viaja pela Ásia, conectando várias cidades importantes como Cingapura, Bangcoc e Kuala Lumpur?",
        "answers": [
            {"text": "Trans-Siberian Express", "correct": false},
            {"text": "Orient Express", "correct": false},
            {"text": "Eastern & Oriental Express", "correct": true},
            {"text": "Shanghai Maglev", "correct": false}
        ]
    },
    {
        "question": "Qual é a flor nacional do Japão?",
        "answers": [
            {"text": "Cerejeira", "correct": true},
            {"text": "Rosa", "correct": false},
            {"text": "Orquídea", "correct": false},
            {"text": "Girassol", "correct": false}
        ]
    },
    {
        "question": "Qual é a flor que simboliza a pureza e a beleza na cultura ocidental?",
        "answers": [
            {"text": "Orquídea", "correct": false},
            {"text": "Rosa", "correct": true},
            {"text": "Tulipa", "correct": false},
            {"text": "Íris", "correct": false}
        ]
    },
    {
        "question": "Qual país construiu o submarino de propulsão não nuclear mais avançado, conhecido como Tipo 212?",
        "answers": [
            {"text": "Estados Unidos", "correct": false},
            {"text": "Alemanha", "correct": true},
            {"text": "Rússia", "correct": false},
            {"text": "China", "correct": false}
        ]
    },
    {
        question: 'O prédio mais alto do mundo (até 2024), tem 828m e 163 andares. Qual é o seu nome?',
        answers: [
            { text: 'Empire State Building', correct: false },
            { text: 'Shanghai Tower', correct: false },
            { text: 'Burj Khalifa', correct: true },
            { text: 'Willis Tower', correct: false }
        ]
    },
    {
        question: 'Em que cidade está localizado o famoso prédio Burj Khalifa?',
        answers: [
            { text: 'Nova York', correct: false },
            { text: 'Dubai', correct: true },
            { text: 'Xangai', correct: false },
            { text: 'Londres', correct: false }
        ]
    },   
    {
        question: 'Qual país tem a maior linha costeira do mundo?',
        answers: [
            { text: 'Canadá', correct: true },
            { text: 'Rússia', correct: false },
            { text: 'Brasil', correct: false },
            { text: 'Austrália', correct: false }
        ]
    },
    {
        question: 'Qual é a capital da Austrália?',
        answers: [
            { text: 'Sydney', correct: false },
            { text: 'Melbourne', correct: false },
            { text: 'Canberra', correct: true },
            { text: 'Perth', correct: false }
        ]
    },
    {
        question: 'Qual é o único continente com terra nos quatro hemisférios?',
        answers: [
            { text: 'África', correct: true },
            { text: 'Ásia', correct: false },
            { text: 'Europa', correct: false },
            { text: 'América', correct: false }
        ]
    },
    {
        question: 'Em que país se encontra o Salto Ángel, a maior cachoeira do mundo?',
        answers: [
            { text: 'Brasil', correct: false },
            { text: 'Argentina', correct: false },
            { text: 'Venezuela', correct: true },
            { text: 'Colômbia', correct: false }
        ]
    },
    {
        question: 'Em que continente se encontra o maior deserto do mundo?',
        answers: [
            { text: 'África', correct: false },
            { text: 'Antártica', correct: true },
            { text: 'Ásia', correct: false },
            { text: 'América do Norte', correct: false }
        ]
    },
    {
        question: 'Qual é a capital da Irlanda?',
        answers: [
            { text: 'Belfast', correct: false },
            { text: 'Dublin', correct: true },
            { text: 'Cork', correct: false },
            { text: 'Galway', correct: false }
        ]
    },
    {
        question: 'Qual é o tipo de árvore mais alta?',
        answers: [
            { text: 'Eucalipto', correct: false },
            { text: 'Sequoioideae', correct: true },
            { text: 'Bordo', correct: false },
            { text: 'Cedro', correct: false }
        ]
    },
    {
        question: 'Na capital de qual país se encontra a estátua da Pequena Sereia?',
        answers: [
            { text: 'Suécia', correct: false },
            { text: 'Noruega', correct: false },
            { text: 'Dinamarca', correct: true },
            { text: 'Finlândia', correct: false }
        ]
    },
    {
        question: 'Em que continente se encontra a cidade de Baku?',
        answers: [
            { text: 'Europa', correct: false },
            { text: 'Ásia', correct: true },
            { text: 'África', correct: false },
            { text: 'Oceania', correct: false }
        ]
    },
    {
        question: 'Qual é o único país cuja bandeira não tem quatro lados?',
        answers: [
            { text: 'Nepal', correct: true },
            { text: 'Bhutan', correct: false },
            { text: 'Suíça', correct: false },
            { text: 'Japão', correct: false }
        ]
    },
    {
        question: 'Quantas estrelas há na bandeira da China?',
        answers: [
            { text: '4', correct: false },
            { text: '5', correct: true },
            { text: '6', correct: false },
            { text: '7', correct: false }
        ]
    },
    {
        question: 'Qual país tem a imagem de um naufrágio na sua bandeira nacional?',
        answers: [
            { text: 'Bermudas', correct: true },
            { text: 'Jamaica', correct: false },
            { text: 'Bahamas', correct: false },
            { text: 'Trinidad e Tobago', correct: false }
        ]
    },
    {
        question: 'Qual é a maior cidade de língua espanhola do mundo?',
        answers: [
            { text: 'Buenos Aires', correct: false },
            { text: 'Madrid', correct: false },
            { text: 'Cidade do México', correct: true },
            { text: 'Barcelona', correct: false }
        ]
    },
    {
        question: 'Qual país tem o maior consumo de café per capita?',
        answers: [
            { text: 'Finlândia', correct: true },
            { text: 'Brasil', correct: false },
            { text: 'Itália', correct: false },
            { text: 'Estados Unidos', correct: false }
        ]
    },
    {
        question: 'Em que cidade você estaria se estivesse nas Escadarias da Praça da Espanha?',
        answers: [
            { text: 'Roma', correct: true },
            { text: 'Madri', correct: false },
            { text: 'Barcelona', correct: false },
            { text: 'Sevilha', correct: false }
        ]
    },
    {
        question: 'Qual é o sobrenome mais comum nos Estados Unidos?',
        answers: [
            { text: 'Smith', correct: true },
            { text: 'Johnson', correct: false },
            { text: 'Williams', correct: false },
            { text: 'Brown', correct: false }
        ]
    },
    {
        question: 'O que é a Côte d\'Azur?',
        answers: [
            { text: 'Um tipo de queijo francês', correct: false },
            { text: 'Uma região vinícola na França', correct: false },
            { text: 'Uma costa no sul da França', correct: true },
            { text: 'Uma montanha na França', correct: false }
        ]
    },
    {
        question: 'Qual é o rio principal que passa por Paris?',
        answers: [
            { text: 'Rio Tâmisa', correct: false },
            { text: 'Rio Sena', correct: true },
            { text: 'Rio Danúbio', correct: false },
            { text: 'Rio Ródano', correct: false }
        ]
    },
    {
        question: 'O que é o Mont Saint-Michel?',
        answers: [
            { text: 'Uma montanha nos Alpes', correct: false },
            { text: 'Um vulcão na França', correct: false },
            { text: 'Uma ilha fortificada na costa da Normandia', correct: true },
            { text: 'Um desfiladeiro na França', correct: false }
        ]
    },
    {
        question: 'O que é o Monte Fuji?',
        answers: [
            { text: 'Um rio no Japão', correct: false },
            { text: 'Uma cidade japonesa', correct: false },
            { text: 'Uma montanha vulcânica', correct: true },
            { text: 'Um deserto japonês', correct: false }
        ]
    },
    {
        question: 'Qual é o nome tradicional da vestimenta japonesa?',
        answers: [
            { text: 'Qipao', correct: false },
            { text: 'Hanbok', correct: false },
            { text: 'Kimono', correct: true },
            { text: 'Ao dai', correct: false }
        ]
    },
    {
        question: 'Qual é a principal religião do Japão?',
        answers: [
            { text: 'Hinduísmo', correct: false },
            { text: 'Budismo', correct: true },
            { text: 'Cristianismo', correct: false },
            { text: 'Islamismo', correct: false }
        ]
    },
    {
        question: 'Qual é o rio mais longo da Espanha?',
        answers: [
            { text: 'Rio Tâmega', correct: false },
            { text: 'Rio Douro', correct: false },
            { text: 'Rio Tejo', correct: false },
            { text: 'Rio Ebro', correct: true }
        ]
    },
    {
        question: 'Qual é a cidade autônoma espanhola localizada na costa norte da África?',
        answers: [
            { text: 'Ceuta', correct: true },
            { text: 'Melilla', correct: false },
            { text: 'Barcelona', correct: false },
            { text: 'Valência', correct: false }
        ]
    },
    {
        question: 'Qual é o ponto mais alto da Espanha?',
        answers: [
            { text: 'Pico Aneto', correct: true },
            { text: 'Pico Mulhacén', correct: false },
            { text: 'Pico Teide', correct: false },
            { text: 'Pico Veleta', correct: false }
        ]
    },
    {
        question: 'Qual é o rio mais longo que passa pela Alemanha?',
        answers: [
            { text: 'Rio Danúbio', correct: false },
            { text: 'Rio Reno', correct: true },
            { text: 'Rio Elba', correct: false },
            { text: 'Rio Spree', correct: false }
        ]
    },
    {
        question: 'Qual é a camada mais externa da Terra?',
        answers: [
            { text: 'Núcleo', correct: false },
            { text: 'Manto', correct: false },
            { text: 'Crosta', correct: true },
            { text: 'Astenosfera', correct: false }
        ]
    },
    {
        question: 'O que são placas tectônicas?',
        answers: [
            { text: 'Formações rochosas', correct: false },
            { text: 'Pequenos continentes', correct: false },
            { text: 'Blocos que compõem a crosta terrestre', correct: true },
            { text: 'Rios subterrâneos', correct: false }
        ]
    },
    {
        question: 'Qual é o tipo mais comum de rocha na crosta terrestre?',
        answers: [
            { text: 'Metamórfica', correct: false },
            { text: 'Sedimentar', correct: true },
            { text: 'Ígnea', correct: false },
            { text: 'Magmática', correct: false }
        ]
    },
    {
        question: 'O que é um vulcão?',
        answers: [
            { text: 'Rio subterrâneo', correct: false },
            { text: 'Montanha formada por placas tectônicas', correct: false },
            { text: 'Abertura na crosta terrestre por onde o magma é expelido', correct: true },
            { text: 'Planalto elevado', correct: false }
        ]
    },
    {
        question: 'Qual é a escala usada para medir a intensidade dos terremotos?',
        answers: [
            { text: 'Escala Richter', correct: true },
            { text: 'Escala Celsius', correct: false },
            { text: 'Escala de Beaufort', correct: false },
            { text: 'Escala Kelvin', correct: false }
        ]
    },
    {
        question: 'Qual é o processo de transformação de rochas pré-existentes por meio de calor e pressão?',
        answers: [
            { text: 'Sedimentação', correct: false },
            { text: 'Fusão', correct: false },
            { text: 'Metamorfismo', correct: true },
            { text: 'Solidificação', correct: false }
        ]
    },
    {
        question: 'O que é um lençol freático?',
        answers: [
            { text: 'Camada de gelo na superfície terrestre', correct: false },
            { text: 'Reservatório subterrâneo de água', correct: true },
            { text: 'Formação rochosa ígnea', correct: false },
            { text: 'Área elevada com vegetação densa', correct: false }
        ]
    },
    {
        question: 'Qual é a maior cidade da Espanha em termos de população?',
        answers: [
            { text: 'Valência', correct: false },
            { text: 'Barcelona', correct: false },
            { text: 'Sevilha', correct: false },
            { text: 'Madrid', correct: true }
        ]
    },
    {
        question: 'Onde está localizada a famosa Sagrada Família?',
        answers: [
            { text: 'Madrid', correct: false },
            { text: 'Barcelona', correct: true },
            { text: 'Valência', correct: false },
            { text: 'Sevilha', correct: false }
        ]
    },
    {   question: 'São cidades indianas, exceto?',
        answers: [
            {text: 'Noiva Dheli', correct: false},
            {text: 'BangKok', correct: true},
            {text: 'Bombaim', correct: false},
            {text: 'Mumbai', correct: false}
        ]
    },
    {
        question: "Conhecida como a Cidade que nunca dorme?",
        answers: [
            { text: "Berlim", correct: false },
            { text: "Paris", correct: false },
            { text: "Tóquio", correct: false },
            { text: "Nova York", correct: true },
        ]
    },
    {
        question: "Conhecida como a Cidade Maravilhosa?",
        answers: [
            { text: "Rio de Janeiro", correct: true },
            { text: "Roma", correct: false },
            { text: "Paris", correct: false },
            { text: "Londres", correct: false }
        ]
    },
    {
        question: "Cidade referida como a 'Cidade Velha e a Cidade Nova'?",
        answers: [
            { text: "Berlim", correct: false },
            { text: "São Paulo", correct: false },
            { text: "Tóquio", correct: false },
            { text: "Londres", correct: true },
        ]
    },
    {
        question: "Conhecida como 'Cidade Eterna', devido sua longa e significativa história como a capital de um importante Império",
        answers: [
            { text: "Atenas", correct: false },
            { text: "Madrid", correct: false },
            { text: "Londres", correct: false },
            { text: "Roma", correct: true },
        ]
    },
    {
        question: "Cidade brasileira conhecida pelos fósseis de Dinossauro e pela Expozebu?",
        answers: [
            { text: "Belo Horizonte", correct: false },
            { text: "Araxá", correct: false },
            { text: "Uberlândia", correct: false },
            { text: "Uberaba", correct: true }
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
            {text: 'Pico da Bandeira', correct: false},
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
            {text: 'Suécia', correct: false},
            {text: 'Austrália', correct: false},
            {text: 'Japão', correct: false},
            {text: 'Noruega', correct: true},
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
    {   question: 'Qual é a mais extensa cadeia de montanhas do mundo?',
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
            { text: "Jair Messias Bolsonaro", correct: true },
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
            { text: "Paraíba", correct: true },
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
            { text: "Pão de queijo", correct: false },
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
        question: "Qual o Estado Brasileiro com maior número de municípios?",
        answers: [
            { text: "São Paulo", correct: false },
            { text: "Minas Gerais", correct: true },
            { text: "Mato Grosso", correct: false },
            { text: "Bahia", correct: false }
        ]
    },
    {
        question: "Qual a capital de Pernambuco?",
        answers: [
            { text: "Fortaleza", correct: false },
            { text: "Recife", correct: true },
            { text: "Olinda", correct: false },
            { text: "Fernando de Noronha", correct: false }
        ]
    },
    {
        question: "Qual a capital de Alagoas?",
        answers: [
            { text: "Fortaleza", correct: false },
            { text: "Aracaju", correct: false },
            { text: "Maceió", correct: true },
            { text: "Natal", correct: false }
        ]
    },
    {
        question: "Qual a capital do Rio Grande do Norte?",
        answers: [
            { text: "Fortaleza", correct: false },
            { text: "Belém", correct: false },
            { text: "Natal", correct: true },
            { text: "Manaus", correct: false }
        ]
    },
    {
        question: "Qual a capital do Maranhão?",
        answers: [
            { text: "Fortaleza", correct: false },
            { text: "Teresina", correct: false },
            { text: "João Pessoa", correct: false },
            { text: "São Luiz", correct: true }
        ]
    },
    {
        question: "Qual a capital do Piauí?",
        answers: [
            { text: "Fortaleza", correct: false },
            { text: "Teresina", correct: true },
            { text: "João Pessoa", correct: false },
            { text: "São Luiz", correct: false }
        ]
    },
    {
        question: "Qual a capital do Paraná?",
        answers: [
            { text: "Curitiba", correct: true },
            { text: "Florianópolis", correct: false },
            { text: "Porto Algre", correct: false },
            { text: "Londrina", correct: false }
        ]
    },
    {
        question: "Além do distrito federal, quantos Estados possui o Brasil?",
        answers: [
            { text: "15", correct: false },
            { text: "20", correct: false },
            { text: "26", correct: true },
            { text: "27", correct: false }
        ]
    },
    {
        question: "Qual o maior estado do Brasil?",
        answers: [
            { text: "São Paulo", correct: false },
            { text: "Pará", correct: false },
            { text: "Minas Gerais", correct: false },
            { text: "Amazonas", correct: true },
        ]
    },
    {
        question: "Qual o menor estado do Brasil?",
        answers: [
            { text: "Roraima", correct: false },
            { text: "Alagos", correct: false },
            { text: "Espirito Santo", correct: false },
            { text: "Sergipe", correct: true },
        ]
    },
    {
        question: "Além do distrito federal (distrito de Colúmbia), quantos Estados possui os Estados Unidos da América?",
        answers: [
            { text: "50", correct: true },
            { text: "30", correct: false },
            { text: "40", correct: false },
            { text: "55", correct: false }
        ]
    },
    {
        question: 'Qual é o rio mais extenso do Brasil?',
        answers: [
            { text: 'Amazonas', correct: true },
            { text: 'São Francisco', correct: false },
            { text: 'Tocantins', correct: false },
            { text: 'Paraná', correct: false }
        ]
    },
    {
        question: 'Quantos estados compõem a região Nordeste do Brasil?',
        answers: [
            { text: '9', correct: true },
            { text: '8', correct: false },
            { text: '7', correct: false },
            { text: '10', correct: false }
        ]
    },
    {
        question: 'Em qual bioma brasileiro está localizado o Pantanal?',
        answers: [
            { text: 'Cerrado', correct: false },
            { text: 'Caatinga', correct: false },
            { text: 'Pantanal', correct: true },
            { text: 'Amazônia', correct: false }
        ]
    },
    {
        question: 'Qual é a maior cidade do Brasil em população?',
        answers: [
            { text: 'São Paulo', correct: true },
            { text: 'Rio de Janeiro', correct: false },
            { text: 'Brasília', correct: false },
            { text: 'Salvador', correct: false }
        ]
    },
    {
        question: 'Em que estado brasileiro está localizado o arquipélago de Fernando de Noronha?',
        answers: [
            { text: 'Pernambuco', correct: true },
            { text: 'Bahia', correct: false },
            { text: 'Rio de Janeiro', correct: false },
            { text: 'Ceará', correct: false }
        ]
    },
    {
        question: 'Qual é o ponto mais oriental do Brasil?',
        answers: [
            { text: 'Cabo Frio', correct: false },
            { text: 'Ponta do Seixas', correct: true },
            { text: 'Cabo de Santo Agostinho', correct: false },
            { text: 'Cabo de São Roque', correct: false }
        ]
    },
    {
        question: 'Qual é o nome da montanha mais alta do Japão?',
        answers: [
            { text: 'Monte Fuji', correct: true },
            { text: 'Monte Aso', correct: false },
            { text: 'Monte Ontake', correct: false },
            { text: 'Monte Yari', correct: false }
        ]
    },
    {
        question: 'Qual é a capital da China?',
        answers: [
            { text: 'Seul', correct: false },
            { text: 'Pequim', correct: true },
            { text: 'Xangai', correct: false },
            { text: 'Hong Kong', correct: false }
        ]
    },
    {
        question: 'Qual é o rio mais longo da China?',
        answers: [
            { text: 'Rio Yangtzé', correct: true },
            { text: 'Rio Amarelo', correct: false },
            { text: 'Rio Mekong', correct: false },
            { text: 'Rio Azul', correct: false }
        ]
    },
    {
        question: 'Qual é a maior muralha do mundo e onde está localizada?',
        answers: [
            { text: 'Muralha de Adriano, na Inglaterra', correct: false },
            { text: 'Muralha de Berlim, na Alemanha', correct: false },
            { text: 'Muralha da China, na China', correct: true },
            { text: 'Muralha de Jericó, em Israel', correct: false }
        ]
    },
    {
        question: 'Qual é a capital de Portugal?',
        answers: [
            { text: 'Madrid', correct: false },
            { text: 'Barcelona', correct: false },
            { text: 'Lisboa', correct: true },
            { text: 'Porto', correct: false }
        ]
    },
    {
        question: 'Qual é o rio que passa por Lisboa?',
        answers: [
            { text: 'Rio Danúbio', correct: false },
            { text: 'Rio Tejo', correct: true },
            { text: 'Rio Douro', correct: false },
            { text: 'Rio Guadalquivir', correct: false }
        ]
    },
    {
        question: 'Qual é a moeda oficial de Portugal?',
        answers: [
            { text: 'Euro', correct: true },
            { text: 'Libra Esterlina', correct: false },
            { text: 'Dólar Americano', correct: false },
            { text: 'Coroa Dinamarquesa', correct: false }
        ]
    },
    {
        question: 'Quantas regiões autónomas existem em Portugal?',
        answers: [
            { text: '1', correct: false },
            { text: '2', correct: true },
            { text: '3', correct: false },
            { text: '4', correct: false }
        ]
    },
    {
        question: 'Qual é o rio que passa por Roma?',
        answers: [
            { text: 'Rio Tâmisa', correct: false },
            { text: 'Rio Sena', correct: false },
            { text: 'Rio Danúbio', correct: false },
            { text: 'Rio Tibre', correct: true }
        ]
    },
    {
        question: 'Quantas regiões a Itália possui?',
        answers: [
            { text: '5', correct: false },
            { text: '15', correct: false },
            { text: '25', correct: false },
            { text: '20', correct: true }
        ]
    },
    {
        question: 'Qual é a famosa ilha vulcânica localizada na Baía de Nápoles?',
        answers: [
            { text: 'Capri', correct: true },
            { text: 'Sardenha', correct: false },
            { text: 'Sicília', correct: false },
            { text: 'Elba', correct: false }
        ]
    },
    {
        question: 'Qual é a famosa torre inclinada localizada na Itália?',
        answers: [
            { text: 'Torre Eiffel', correct: false },
            { text: 'Torre de Londres', correct: false },
            { text: 'Torre de Pisa', correct: true },
            { text: 'Torre de Berlim', correct: false }
        ]
    },
    {   question: 'Este pais tem uma das culinárias mais características do mundo. Seu povo, latino, tem preferência por alimentos apimentados e muito bem temperados?',
        answers: [
            {text: 'Peru', correct: false},
            {text: 'Brasil', correct: false},
            {text: 'México', correct: true},
            {text: 'Bolívia', correct: false},
        ]
    },



]

//Q7  HISTÓRIA


const qhisto=[
    {
        question: 'Quem foi o líder militar cartaginês que desafiou Roma durante as Guerras Púnicas?',
        answers: [
            { text: 'Alexandre, o Grande', correct: false },
            { text: 'Aníbal Barca', correct: true },
            { text: 'Júlio César', correct: false },
            { text: 'Xerxes I', correct: false }
        ]
    },
    {
        "question": "Quem foi a primeira mulher a ganhar um Prêmio Nobel?",
        "answers": [
            {"text": "Rosalind Franklin", "correct": false},
            {"text": "Marie Curie", "correct": true},
            {"text": "Ada Lovelace", "correct": false},
            {"text": "Jane Goodall", "correct": false}
        ]
    },
    {
        "question": "Em que ano as mulheres ganharam o direito ao voto no Brasil?",
        "answers": [
            {"text": "1928", "correct": false},
            {"text": "1932", "correct": true},
            {"text": "1945", "correct": false},
            {"text": "1960", "correct": false}
        ]
    },
    {
        "question": "Quem foi a primeira mulher a viajar para o espaço?",
        "answers": [
            {"text": "Sally Ride", "correct": false},
            {"text": "Valentina Tereshkova", "correct": true},
            {"text": "Mae Jemison", "correct": false},
            {"text": "Eileen Collins", "correct": false}
        ]
    },
    {
        "question": "Qual ativista paquistanesa ganhou o Prêmio Nobel da Paz em 2014 por sua luta pelo direito à educação das meninas?",
        "answers": [
            {"text": "Malala Yousafzai", "correct": true},
            {"text": "Greta Thunberg", "correct": false},
            {"text": "Emma Watson", "correct": false},
            {"text": "Shirin Ebadi", "correct": false}
        ]
    },
    {
        "question": "Qual foi o nome de nascimento do Papa João Paulo II?",
        "answers": [
            {"text": "Karol Wojtyła", "correct": true},
            {"text": "Giovanni Battista Enrico Antonio Maria Montini", "correct": false},
            {"text": "Joseph Aloisius Ratzinger", "correct": false},
            {"text": "Jorge Mario Bergoglio", "correct": false}
        ]
    },
    {
        "question": "Em que ano João Paulo II foi eleito Papa?",
        "answers": [
            {"text": "1978", "correct": true},
            {"text": "1981", "correct": false},
            {"text": "1985", "correct": false},
            {"text": "1973", "correct": false}
        ]
    },
    {
        "question": "De qual país João Paulo II era natural?",
        "answers": [
            {"text": "Polônia", "correct": true},
            {"text": "Itália", "correct": false},
            {"text": "Alemanha", "correct": false},
            {"text": "Argentina", "correct": false}
        ]
    },
    {
        "question": "Qual foi a encíclica escrita por João Paulo II que abordou questões sociais e econômicas?",
        "answers": [
            {"text": "Fides et Ratio", "correct": false},
            {"text": "Redemptor Hominis", "correct": false},
            {"text": "Evangelium Vitae", "correct": false},
            {"text": "Laborem Exercens", "correct": true}
        ]
    },
    {
        "question": "João Paulo II foi o Papa por quanto tempo?",
        "answers": [
            {"text": "26 anos", "correct": true},
            {"text": "15 anos", "correct": false},
            {"text": "20 anos", "correct": false},
            {"text": "30 anos", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome de nascimento do Papa Francisco?",
        "answers": [
            {"text": "Jorge Mario Bergoglio", "correct": true},
            {"text": "Karol Wojtyła", "correct": false},
            {"text": "Joseph Ratzinger", "correct": false},
            {"text": "Giovanni Battista Enrico Antonio Maria Montini", "correct": false}
        ]
    },
    {
        "question": "De qual país o Papa Francisco é natural?",
        "answers": [
            {"text": "Argentina", "correct": true},
            {"text": "Itália", "correct": false},
            {"text": "Polônia", "correct": false},
            {"text": "Alemanha", "correct": false}
        ]
    },
    {
        "question": "Em que ano o Papa Francisco foi eleito Papa?",
        "answers": [
            {"text": "2013", "correct": true},
            {"text": "2005", "correct": false},
            {"text": "2017", "correct": false},
            {"text": "2008", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do primeiro documento publicado pelo Papa Francisco após sua eleição?",
        "answers": [
            {"text": "Evangelii Gaudium", "correct": true},
            {"text": "Laudato Si'", "correct": false},
            {"text": "Amoris Laetitia", "correct": false},
            {"text": "Veritatis Splendor", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do santo padroeiro da Itália ao qual o Papa Francisco tem uma forte devoção?",
        "answers": [
            {"text": "São Francisco de Assis", "correct": true},
            {"text": "Santo Agostinho", "correct": false},
            {"text": "São Tomás de Aquino", "correct": false},
            {"text": "São Pedro", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome de nascimento do Papa Bento XVI?",
        "answers": [
            {"text": "Joseph Aloisius Ratzinger", "correct": true},
            {"text": "Karol Wojtyła", "correct": false},
            {"text": "Jorge Mario Bergoglio", "correct": false},
            {"text": "Giovanni Battista Enrico Antonio Maria Montini", "correct": false}
        ]
    },
    {
        "question": "De qual país o Papa Bento XVI é natural?",
        "answers": [
            {"text": "Alemanha", "correct": true},
            {"text": "Itália", "correct": false},
            {"text": "Polônia", "correct": false},
            {"text": "Argentina", "correct": false}
        ]
    },
    {
        "question": "Em que ano o Papa Bento XVI foi eleito Papa?",
        "answers": [
            {"text": "2005", "correct": true},
            {"text": "2013", "correct": false},
            {"text": "2000", "correct": false},
            {"text": "2010", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome da primeira encíclica escrita pelo Papa Bento XVI, publicada em 2005?",
        "answers": [
            {"text": "Deus Caritas Est", "correct": true},
            {"text": "Laudato Si'", "correct": false},
            {"text": "Evangelii Gaudium", "correct": false},
            {"text": "Fides et Ratio", "correct": false}
        ]
    },
    {
        "question": "Qual foi o motivo declarado para a renúncia do Papa Bento XVI em 2013?",
        "answers": [
            {"text": "Problemas de saúde", "correct": true},
            {"text": "Pressão política", "correct": false},
            {"text": "Escândalos financeiros", "correct": false},
            {"text": "Desejo de aposentadoria", "correct": false}
        ]
    },
    {
        "question": "Quem foi o primeiro rei da Prússia, frequentemente referido como 'Frederico, o Grande'?",
        "answers": [
            {"text": "Frederico Guilherme I", "correct": false},
            {"text": "Frederico II", "correct": true},
            {"text": "Frederico III", "correct": false},
            {"text": "Frederico IV", "correct": false}
        ]
    },
    {
        "question": "Qual vulcão italiano entrou em erupção em 79 d.C., destruindo as cidades de Pompeia e Herculano?",
        "answers": [
            {"text": "Monte Etna", "correct": false},
            {"text": "Monte Vesúvio", "correct": true},
            {"text": "Stromboli", "correct": false},
            {"text": "Monte Subasio", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do vulcão que entrou em erupção em 1883, causando uma das maiores explosões vulcânicas registradas na história?",
        "answers": [
            {"text": "Kilauea", "correct": false},
            {"text": "Krakatoa", "correct": true},
            {"text": "Eyjafjallajökull", "correct": false},
            {"text": "Monte Pelée", "correct": false}
        ]
    },
    {
        "question": "Qual vulcão na Islândia causou uma grande interrupção no tráfego aéreo europeu em 2010?",
        "answers": [
            {"text": "Hekla", "correct": false},
            {"text": "Katla", "correct": false},
            {"text": "Eyjafjallajökull", "correct": true},
            {"text": "Askja", "correct": false}
        ]
    },
    {
        "question": "Qual foi o primeiro relógio de pulso do mundo a ser produzido em massa?",
        "answers": [
            {"text": "Omega Speedmaster", "correct": false},
            {"text": "Rolex Submariner", "correct": false},
            {"text": "Cartier Santos", "correct": true},
            {"text": "Tag Heuer Monaco", "correct": false}
        ]
    },
    {
        "question": "Qual foi o primeiro país a desenvolver o sabonete, de acordo com registros históricos?",
        "answers": [
            {"text": "Grécia", "correct": false},
            {"text": "Egito", "correct": false},
            {"text": "Babilônia", "correct": true},
            {"text": "Índia", "correct": false}
        ]
    },
    {
        "question": "Quem é frequentemente creditado como o inventor do carimbo de borracha moderno?",
        "answers": [
            {"text": "Isaac Newton", "correct": false},
            {"text": "Alexander Graham Bell", "correct": false},
            {"text": "Charles Goodyear", "correct": true},
            {"text": "Thomas Edison", "correct": false}
        ]
    },
    {
        "question": "Qual partido político Hitler liderou na Alemanha?",
        "answers": [
            {"text": "Partido Comunista Alemão", "correct": false},
            {"text": "Partido Nazista", "correct": true},
            {"text": "Partido Social-Democrata", "correct": false},
            {"text": "Partido Conservador Alemão", "correct": false}
        ]
    },
    {
        "question": "Qual livro escrito por Hitler delineou suas crenças políticas e ideológicas?",
        "answers": [
            {"text": "O Manifesto Comunista", "correct": false},
            {"text": "Minha Luta", "correct": true},
            {"text": "O Príncipe", "correct": false},
            {"text": "A Origem das Espécies", "correct": false}
        ]
    },
    {
        "question": "Qual foi o evento que marcou o início da Segunda Guerra Mundial, desencadeado pela invasão da Polônia pelas forças alemãs?",
        "answers": [
            {"text": "Invasão da França", "correct": false},
            {"text": "Ataque a Pearl Harbor", "correct": false},
            {"text": "Operação Barbarossa", "correct": false},
            {"text": "Invasão da Polônia", "correct": true}
        ]
    },
    {
        "question": "Qual era o título oficial de Hitler na Alemanha nazista?",
        "answers": [
            {"text": "Kaiser", "correct": false},
            {"text": "Chanceler", "correct": true},
            {"text": "Presidente", "correct": false},
            {"text": "Führer", "correct": false}
        ]
    },
    {
        "question": "Qual foi o destino final de Hitler durante a Segunda Guerra Mundial?",
        "answers": [
            {"text": "Prisão", "correct": false},
            {"text": "Exílio na Argentina", "correct": false},
            {"text": "Suicídio em um bunker em Berlim", "correct": true},
            {"text": "Julgamento em Nuremberg", "correct": false}
        ]
    },
    {
        "question": "Qual era o nome completo de Alexandre, o Grande?",
        "answers": [
            {"text": "Alexandre III da Macedônia", "correct": true},
            {"text": "Alexandre II da Grécia", "correct": false},
            {"text": "Alexandre I do Egito", "correct": false},
            {"text": "Alexandre IV da Pérsia", "correct": false}
        ]
    },
    {
        "question": "Qual era o pai de Alexandre, o Grande?",
        "answers": [
            {"text": "Filipe II da Macedônia", "correct": true},
            {"text": "Aristóteles", "correct": false},
            {"text": "Dario III", "correct": false},
            {"text": "Leônidas I de Esparta", "correct": false}
        ]
    },
    {
        "question": "Qual era o nome do cavalo de Alexandre, que se tornou famoso por sua bravura?",
        "answers": [
            {"text": "Falcão", "correct": false},
            {"text": "Bucéfalo", "correct": true},
            {"text": "Tróia", "correct": false},
            {"text": "Pégaso", "correct": false}
        ]
    },
    {
        "question": "Quem foi o mentor e tutor de Alexandre durante sua juventude?",
        "answers": [
            {"text": "Aristóteles", "correct": true},
            {"text": "Platão", "correct": false},
            {"text": "Sócrates", "correct": false},
            {"text": "Heródoto", "correct": false}
        ]
    },
    {
        "question": "Quanto tempo durou o reinado de Alexandre, o Grande, como rei da Macedônia?",
        "answers": [
            {"text": "10 anos", "correct": false},
            {"text": "12 anos", "correct": false},
            {"text": "13 anos", "correct": false},
            {"text": "15 anos", "correct": true}
        ]
    },
    {
        "question": "Qual era a cidade-estado de Aníbal?",
        "answers": [
            {"text": "Cartago", "correct": true},
            {"text": "Roma", "correct": false},
            {"text": "Atenas", "correct": false},
            {"text": "Esparta", "correct": false}
        ]
    },
    {
        "question": "Qual batalha ficou famosa pela estratégia de Aníbal, usando elefantes?",
        "answers": [
            {"text": "Batalha de Salamina", "correct": false},
            {"text": "Batalha de Canas", "correct": true},
            {"text": "Batalha de Gaugamela", "correct": false},
            {"text": "Batalha de Zama", "correct": false}
        ]
    },
    {
        "question": "Qual general romano foi derrotado por Aníbal na Batalha de Canas?",
        "answers": [
            {"text": "Júlio César", "correct": false},
            {"text": "Scipio Africanus", "correct": false},
            {"text": "Lucius Aemilius Paullus", "correct": false},
            {"text": "Lucius Cornelius Scipio", "correct": true}
        ]
    },
    {
        "question": "Quem é frequentemente creditado como o inventor da cadeira moderna?",
        "answers": [
          {"text": "Leonardo da Vinci", "correct": false},
          {"text": "Michael Thonet", "correct": false},
          {"text": "Thomas Jefferson", "correct": false},
          {"text": "Thomas Warren", "correct": true}
        ]
    },
    {
        "question": "Quais são algumas características comuns de uma ditadura?",
        "answers": [
          {"text": "Respeito aos direitos humanos e liberdades individuais", "correct": false},
          {"text": "Múltiplos partidos políticos e eleições livres", "correct": false},
          {"text": "Censura da mídia e repressão da oposição", "correct": true},
          {"text": "Separação efetiva de poderes e sistema judicial independente", "correct": false}
        ]
    },
    {
        "question": "Qual é uma das principais críticas às ditaduras?",
        "answers": [
          {"text": "Estabilidade política", "correct": false},
          {"text": "Desenvolvimento econômico acelerado", "correct": false},
          {"text": "Violações dos direitos humanos", "correct": true},
          {"text": "Alta participação cívica", "correct": false}
        ]
    },
    {
        "question": "O que costuma acontecer com a liberdade de expressão em uma ditadura?",
        "answers": [
          {"text": "É amplamente protegida e incentivada", "correct": false},
          {"text": "É restrita e controlada pelo governo", "correct": true},
          {"text": "É garantida apenas para membros do partido governante", "correct": false},
          {"text": "Não é afetada de forma significativa", "correct": false}
        ]
    },
    {
        "question": "Quem geralmente detém o poder em um governo ditatorial?",
        "answers": [
          {"text": "O povo, por meio de eleições democráticas", "correct": false},
          {"text": "Um líder único ou um pequeno grupo", "correct": true},
          {"text": "O parlamento e seus representantes eleitos", "correct": false},
          {"text": "Organizações não governamentais e sociedade civil", "correct": false}
        ]
    },
    {
        "question": "Qual foi o nome do primeiro submarino nuclear do mundo, lançado pela Marinha dos Estados Unidos em 1954?",
        "answers": [
            {"text": "USS Triton", "correct": false},
            {"text": "USS Nautilus", "correct": true},
            {"text": "USS Seawolf", "correct": false},
            {"text": "USS Ohio", "correct": false}
        ]
    },
    {
        "question": "Qual foi o primeiro tanque de guerra usado em combate pela Grã-Bretanha durante a Primeira Guerra Mundial?",
        "answers": [
            {"text": "Mark I", "correct": true},
            {"text": "Sherman", "correct": false},
            {"text": "Tiger I", "correct": false},
            {"text": "Panzer IV", "correct": false}
        ]
    },
    {
        "question": "Qual é o principal tanque de batalha da Rússia, famoso por sua utilização durante a Segunda Guerra Mundial?",
        "answers": [
            {"text": "T-34", "correct": true},
            {"text": "T-90", "correct": false},
            {"text": "Panzer III", "correct": false},
            {"text": "Abrams", "correct": false}
        ]
    },
    {
        "question": "Qual tanque americano é conhecido como o principal tanque de batalha utilizado desde a Guerra do Golfo?",
        "answers": [
            {"text": "M1 Abrams", "correct": true},
            {"text": "M60 Patton", "correct": false},
            {"text": "Leopard 2", "correct": false},
            {"text": "Challenger 2", "correct": false}
        ]
    },
    {
        "question": "Qual tanque alemão, famoso durante a Segunda Guerra Mundial, era conhecido por seu poder de fogo e blindagem pesada?",
        "answers": [
            {"text": "Tiger I", "correct": true},
            {"text": "Leopard 1", "correct": false},
            {"text": "Sherman", "correct": false},
            {"text": "T-55", "correct": false}
        ]
    },
    {
        "question": "Qual é o nome do tanque de batalha principal do Reino Unido, introduzido em 1998, que é conhecido por sua excelente proteção e poder de fogo?",
        "answers": [
            {"text": "Challenger 2", "correct": true},
            {"text": "Leclerc", "correct": false},
            {"text": "Merkava IV", "correct": false},
            {"text": "Type 99", "correct": false}
        ]
    },
    {
        question: 'Qual é o sobrenome da Rainha Elizabeth II?',
        answers: [
            { text: 'Mountbatten-Windsor', correct: true },
            { text: 'Stuart', correct: false },
            { text: 'Tudor', correct: false },
            { text: 'Hanover', correct: false }
        ]
    },
    {
        question: 'Em que ano foi implementado o Plano Real no Brasil?',
        answers: [
            { text: '1994', correct: true },
            { text: '1985', correct: false },
            { text: '2000', correct: false },
            { text: '1990', correct: false }
        ]
    },
    {
        question: 'Qual foi o primeiro país a permitir o voto feminino?',
        answers: [
            { text: 'Estados Unidos', correct: false },
            { text: 'Nova Zelândia', correct: true },
            { text: 'Reino Unido', correct: false },
            { text: 'França', correct: false }
        ]
    },
    {
        question: 'Qual presidente do Brasil foi derrubado no incío do Regime Militar em 1964?',
        answers: [
            { text: 'Juscelino Kubitschek', correct: false },
            { text: 'Getúlio Vargas', correct: false },
            { text: 'João Goulart', correct: true },
            { text: 'Fernando Henrique Cardoso', correct: false }
        ]
    },
    {
        question: 'Em que ano as mulheres ganharam o direito ao voto no Brasil?',
        answers: [
            { text: '1932', correct: true },
            { text: '1945', correct: false },
            { text: '1955', correct: false },
            { text: '1964', correct: false }
        ]
    },
    {
        question: 'Como era chamado o regime de segregação racial adotado na África do Sul entre os anos de 1948 e 1994?',
        answers: [
            { text: 'Apartheid', correct: true },
            { text: 'Segregação Racial', correct: false },
            { text: 'Separatismo', correct: false },
            { text: 'Racismo Institucional', correct: false }
        ]
    },
    {
        question: 'Como se chama a lei, implementada em 1871, que concedeu a liberdade a filhos de escravos nascidos no Brasil?',
        answers: [
            { text: 'Lei Áurea', correct: false },
            { text: 'Lei do Ventre Livre', correct: true },
            { text: 'Lei dos Sexagenários', correct: false },
            { text: 'Lei do Sexagenário', correct: false }
        ]
    },
    {
        question: 'Como foi chamado o assassinato em massa cometido pelos nazistas durante a Segunda Guerra Mundial?',
        answers: [
            { text: 'Genocídio', correct: true },
            { text: 'Massacre', correct: false },
            { text: 'Guerra Química', correct: false },
            { text: 'Holocausto', correct: true }
        ]
    },
    {
        question: 'Quais países disputavam a Guerra Fria, que durou entre 1947 e 1991?',
        answers: [
            { text: 'Estados Unidos e Japão', correct: false },
            { text: 'Estados Unidos e União Soviética', correct: true },
            { text: 'Reino Unido e Alemanha', correct: false },
            { text: 'Alemanha e Japão', correct: false }
        ]
    },
    {
        question: 'Quais cidades japonesas foram atingidas pelas bombas atômicas lançadas pelos Estados Unidos em 1945?',
        answers: [
            { text: 'Hiroshima e Nagasaki', correct: true },
            { text: 'Tóquio e Nagasaki', correct: false },
            { text: 'Osaka e Tóquio', correct: false },
            { text: 'Hiroshima e Fukuoka', correct: false }
        ]
    },
    {
        question: 'Quem ficou conhecido por cruzar os Alpes com elefantes a caminho da guerra com os romanos?',
        answers: [
            { text: 'Júlio César', correct: false },
            { text: 'Alexandre, o Grande', correct: false },
            { text: 'Napoleão Bonaparte', correct: false },
            { text: 'Hannibal', correct: true }
        ]
    },
    {
        question: 'Roald Amundsen foi o primeiro homem a chegar ao Polo Sul. De que país ele era?',
        answers: [
            { text: 'Noruega', correct: true },
            { text: 'Suécia', correct: false },
            { text: 'Dinamarca', correct: false },
            { text: 'Finlândia', correct: false }
        ]
    },
    {
        question: 'Qual era o nome do chefe do crime que liderava a Chicago Outfit (Máfia de Chicago)?',
        answers: [
            { text: 'John Gotti', correct: false },
            { text: 'Lucky Luciano', correct: false },
            { text: 'Al Capone', correct: true },
            { text: 'Bugsy Siegel', correct: false }
        ]
    },
    {
        question: 'Qual o nome da agência espacial russa?',
        answers: [
            { text: 'Roscosmos', correct: true },
            { text: 'Sputnik', correct: false },
            { text: 'KGB', correct: false },
            { text: 'NASA', correct: false }
        ]
    },
    {
        question: 'Qual filósofo grego é conhecido por suas contribuições à ética e foi mestre de Alexandre, o Grande?',
        answers: [
            { text: 'Sócrates', correct: false },
            { text: 'Aristóteles', correct: true },
            { text: 'Platão', correct: false },
            { text: 'Heródoto', correct: false }
        ]
    },
    {
        question: 'Qual cidade foi destruída e posteriormente "reconstruída" por Alexandre, o Grande, que nomeou a nova cidade com seu próprio nome?',
        answers: [
            { text: 'Babilônia', correct: false },
            { text: 'Atenas', correct: false },
            { text: 'Roma', correct: false },
            { text: 'Alexandria', correct: true }
        ]
    },
    {
        question: 'Quem foi o líder militar espartano que comandou as forças gregas na Batalha das Termópilas durante as Guerras Greco-Persas?',
        answers: [
            { text: 'Pericles', correct: false },
            { text: 'Leônidas I', correct: true },
            { text: 'Achilles', correct: false },
            { text: 'Agamenon', correct: false }
        ]
    },
    {
        question: 'Qual foi o evento que marcou o início da Idade Média e a queda do Império Romano do Ocidente?',
        answers: [
            { text: 'Guerras Púnicas', correct: false },
            { text: 'Revolução Francesa', correct: false },
            { text: 'Queda de Constantinopla', correct: false },
            { text: 'Saque de Roma pelos bárbaros', correct: true }
        ]
    },
    {
        question: 'Quem era o deus principal na mitologia romana?',
        answers: [
            { text: 'Zeus', correct: false },
            { text: 'Hades', correct: false },
            { text: 'Júpiter', correct: true },
            { text: 'Apolo', correct: false }
        ]
    },
    {
        question: 'Quem foi o líder militar e político romano conhecido por suas reformas, incluindo a Lei Agrária?',
        answers: [
            { text: 'Cícero', correct: false },
            { text: 'Graco', correct: true },
            { text: 'César Augusto', correct: false },
            { text: 'Bruto', correct: false }
        ]
    },
    {
        question: 'Qual filósofo grego é conhecido por seus diálogos, nos quais frequentemente utilizava a ironia socrática?',
        answers: [
            { text: 'Platão', correct: true },
            { text: 'Aristóteles', correct: false },
            { text: 'Sócrates', correct: false },
            { text: 'Heródoto', correct: false }
        ]
    },
    {
        question: 'Qual era o nome do navio longo usado pelos vikings em suas viagens e incursões?',
        answers: [
            { text: 'Nau', correct: false },
            { text: 'Galé', correct: false },
            { text: 'Dracar', correct: true },
            { text: 'Cog', correct: false }
        ]
    },
    {
        question: 'O que era um "thing" na sociedade viking?',
        answers: [
            { text: 'Festa comunitária', correct: false },
            { text: 'Navio de guerra', correct: false },
            { text: 'Assembleia pública', correct: true },
            { text: 'Festival religioso', correct: false }
        ]
    },
    {
        question: 'O que os vikings usavam como moeda?',
        answers: [
            { text: 'Ouro e prata', correct: true },
            { text: 'Conchas', correct: false },
            { text: 'Pedras preciosas', correct: false },
            { text: 'Barras de ferro', correct: false }
        ]
    },
    {
        question: 'Qual era o nome da famosa espada lendária dos vikings?',
        answers: [
            { text: 'Excalibur', correct: false },
            { text: 'Gram', correct: false },
            { text: 'Skofnung', correct: true },
            { text: 'Durandal', correct: false }
        ]
    },
    {
        question: 'Qual é o nome da antiga língua escrita dos vikings?',
        answers: [
            { text: 'Futhark', correct: true },
            { text: 'Glagolítico', correct: false },
            { text: 'Cuneiforme', correct: false },
            { text: 'Ogham', correct: false }
        ]
    },
    {
        question: 'O que os vikings chamavam de "Valhalla"?',
        answers: [
            { text: 'Cidade principal', correct: false },
            { text: 'Salão dos mortos', correct: false },
            { text: 'Paraíso dos guerreiros', correct: true },
            { text: 'Montanha sagrada', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do imperador do Japão em 2023?',
        answers: [
            { text: 'Imperador Akihito', correct: false },
            { text: 'Imperador Naruhito', correct: true },
            { text: 'Imperador Hirohito', correct: false },
            { text: 'Imperador Taisho', correct: false }
        ]
    },
    {
        question: "Quem foi o líder do movimento conhecido como 'Inconfidência Mineira', que buscava a independência da província de Minas Gerais do domínio português?",
        answers: [
            { text: "Tiradentes", correct: true },
            { text: "Dom Pedro II", correct: false },
            { text: "Getúlio Vargas", correct: false },
            { text: "José Bonifácio", correct: false }
        ]
    },
    {
        question: 'Em que ano John F. Kennedy foi assassinado?',
        answers: [
            { text: '1958', correct: false },
            { text: '1961', correct: false },
            { text: '1963', correct: true },
            { text: '1966', correct: false }
        ]
    },
    {
        question: 'Qual período foi conhecido como a Idade de Ouro de Roma?',
        answers: [
            { text: 'República Romana', correct: false },
            { text: 'Reinado de Nero', correct: false },
            { text: 'Período de Constantino', correct: false },
            { text: 'Augusto César', correct: true }
        ]
    },
    {
        question: 'Qual é a dinastia mais antiga ainda governando?',
        answers: [
            { text: 'Han, China', correct: false },
            { text: 'Tudor, Inglaterra', correct: false },
            { text: 'Habsburgo, Áustria', correct: false },
            { text: 'Yamato, Japão', correct: true }
        ]
    },
    {
        question: 'Qual foi o presidente do Brasil que menos tempo ficou no cargo(O mandato dele durou apenas três dias)?',
        answers: [
            { text: 'Jânio Quadros', correct: false },
            { text: 'João Goulart', correct: false },
            { text: 'Carlos Luz', correct: true },
            { text: 'Rodrigues Alves', correct: false }
        ]
    },
    {
        question: 'Quem estava entre os famosos poetas romanos?',
        answers: [
            { text: 'Ovídio', correct: false },
            { text: 'Sêneca', correct: false },
            { text: 'Cícero', correct: false },
            { text: 'Virgílio', correct: true }
        ]
    },
    {
        question: 'Quem foi o primeiro americano a ganhar um Nobel da Paz?',
        answers: [
            { text: 'Woodrow Wilson', correct: false },
            { text: 'Theodore Roosevelt', correct: true },
            { text: 'John F. Kennedy', correct: false },
            { text: 'Franklin D. Roosevelt', correct: false }
        ]
    },
    {
        question: 'Durante qual evento, a Coréia foi separada em 2 nações?',
        answers: [
            { text: 'Guerra Fria', correct: false },
            { text: 'Revolução Industrial', correct: false },
            { text: 'Primeira Guerra Mundial', correct: false },
            { text: 'Segunda Guerra Mundial', correct: true }
        ]
    },
    {
        question: 'Qual é considerada a primeira tecnologia humana?',
        answers: [
            { text: 'Roda', correct: false },
            { text: 'Agricultura', correct: false },
            { text: 'Fogo', correct: true },
            { text: 'Ferramentas de Pedra', correct: false }
        ]
    },
    {
        question: 'Quem é o inventor da luz elétrica?',
        answers: [
            { text: 'Nikola Tesla', correct: false },
            { text: 'Thomas Edison', correct: true },
            { text: 'Alexander Graham Bell', correct: false },
            { text: 'George Westinghouse', correct: false }
        ]
    },
    {
        question: 'Júlio César nasceu em qual cidade?',
        answers: [
            { text: 'Atenas', correct: false },
            { text: 'Roma', correct: true },
            { text: 'Alexandria', correct: false },
            { text: 'Cartago', correct: false }
        ]
    },
    {
        question: 'Sócrates foi condenado à morte pela acusação de corromper a juventudade. Como foi executado?',
        answers: [
            { text: 'Apedrejamento', correct: false },
            { text: 'Decapitação', correct: false },
            { text: 'Enforcamento', correct: false },
            { text: 'Taça de cicuta', correct: true }
        ]
    },
    {
        question: 'Quem é o fundador do Partido Comunista?',
        answers: [
            { text: 'Karl Marx', correct: false },
            { text: 'Fidel Castro', correct: false },
            { text: 'Vladimir Lênin', correct: true },
            { text: 'Mao Tsé-Tung', correct: false }
        ]
    },
    {
        question: 'Qual das seguintes cidades tem os monumentos históricos mais altos?',
        answers: [
            { text: 'Roma', correct: false },
            { text: 'Atenas', correct: false },
            { text: 'Cairo', correct: false },
            { text: 'Deli', correct: true }
        ]
    },
    {
        question: 'Quem também é conhecido como o fundador do socialismo científico?',
        answers: [
            { text: 'Friedrich Engels', correct: false },
            { text: 'Leon Trotsky', correct: false },
            { text: 'Karl Marx', correct: true },
            { text: 'Mikhail Bakunin', correct: false }
        ]
    },
    {
        question: 'Quem é conhecido como o "Homem de Sangue e Ferro"?',
        answers: [
            { text: 'Júlio César', correct: false },
            { text: 'Napoleão Bonaparte', correct: false },
            { text: 'Otto von Bismarck', correct: true },
            { text: 'Kaiser Wilhelm II', correct: false }
        ]
    },
    {
        question: 'Quem é conhecido como o "Pai da Computação"?',
        answers: [
            { text: 'Alan Turing', correct: true },
            { text: 'Bill Gates', correct: false },
            { text: 'Steve Jobs', correct: false },
            { text: 'Tim Berners-Lee', correct: false }
            ]
    },
    {
        question: 'Qual batalha foi um ponto de virada durante a Guerra do Pacífico na Segunda Guerra Mundial?',
        answers: [
            { text: 'Batalha de Stalingrado', correct: false },
            { text: 'Batalha de Midway', correct: true },
            { text: 'Batalha de Kursk', correct: false },
            { text: 'Batalha de El Alamein', correct: false }
            ]
    },
    {
        question: 'Quais estados brasileiros tiveram representantes na chamada Política do Café com Leite??',
        answers: [
            { text: 'BA e PE', correct: false },
            { text: 'MG e BA', correct: false },
            { text: 'SP e MG', correct: true },
            { text: 'SP e RJ', correct: false }
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
                {text: 'Fernão de Magalhães', correct: false},
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
        question: 'Que tipo de aeronave foi usada para bombardear Hiroshima no Japão durante a Segunda Guerra Mundial?',
        answers: [
            { text: 'Caça Spitfire', correct: false },
            { text: 'Bombardeiro B-52', correct: false },
            { text: 'Superfortaleza B-29', correct: true },
            { text: 'Cruzador B-17', correct: false }
        ]
    },
    {
        question: 'Onde Júlio César foi morto?',
        answers: [
            { text: 'No Coliseu', correct: false },
            { text: 'No Teatro de Pompeu', correct: true },
            { text: 'No Fórum Romano', correct: false },
            { text: 'No Palatino', correct: false }
        ]
    },
    {
        question: 'Como os romanos chamavam a Escócia?',
        answers: [
            { text: 'Caledônia', correct: true },
            { text: 'Britânia', correct: false },
            { text: 'Gália', correct: false },
            { text: 'Hispania', correct: false }
        ]
    },
    {
        question: 'Qual foi a fabricante de energia nuclear ucraniana que foi o local de um desastre nuclear em abril de 1986?',
        answers: [
            { text: 'Three Mile Island', correct: false },
            { text: 'Fukushima Daiichi', correct: false },
            { text: 'Chernobyl', correct: true },
            { text: 'Sellafield', correct: false }
        ]
    },
    {
        question: 'Qual imperador construiu o Coliseu?',
        answers: [
            { text: 'Nero', correct: false },
            { text: 'Trajano', correct: false },
            { text: 'Augusto', correct: false },
            { text: 'Vespasiano', correct: true }
        ]
    },
    {
        question: 'A guerra do ópio foi uma batalha entre quais dois países?',
        answers: [
            { text: 'Inglaterra e Índia', correct: false },
            { text: 'Estados Unidos e México', correct: false },
            { text: 'Inglaterra e China', correct: true },
            { text: 'França e Vietnã', correct: false }
        ]
    },
    {
        question: 'Que famosa formação militar foi feita por Alexandre, o Grande?',
        answers: [
            { text: 'Falange', correct: true },
            { text: 'Testudo', correct: false },
            { text: 'Legião', correct: false },
            { text: 'Cohorte', correct: false }
        ]
    },
    {
        question: 'Quais países lutaram na Guerra dos Cem Anos?',
        answers: [
            { text: 'Inglaterra e França', correct: true },
            { text: 'Espanha e Portugal', correct: false },
            { text: 'Rússia e Suécia', correct: false },
            { text: 'Itália e Áustria', correct: false }
        ]
    },
    {
        question: 'Em que ano a União Soviética entrou em colapso?',
        answers: [
            { text: '1985', correct: false },
            { text: '1989', correct: false },
            { text: '1991', correct: true },
            { text: '1995', correct: false }
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
    {   question: 'O meteoro que matou os dinossauros atingiu qual país',
        answers: [
            {text: 'Rússia', correct: false},
            {text: 'China', correct: false},
            {text: 'México', correct: true},
            {text: 'Canadá', correct: false},
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
    {
        question: 'Qual civilização construiu as pirâmides de Gizé?',
        answers: [
            { text: 'Sumérios', correct: false },
            { text: 'Egípcios', correct: true },
            { text: 'Babilônios', correct: false },
            { text: 'Assírios', correct: false }
        ]
    },
    {
        question: 'Quem foi o líder espartano na Batalha das Termópilas?',
        answers: [
            { text: 'Leônidas', correct: true },
            { text: 'Pericles', correct: false },
            { text: 'Sócrates', correct: false },
            { text: 'Alexandre, o Grande', correct: false }
        ]
    },
    {
        question: 'Quem foi a primeira rainha do Antigo Egito?',
        answers: [
            { text: 'Cleópatra', correct: false },
            { text: 'Nefertiti', correct: true },
            { text: 'Hatshepsut', correct: false },
            { text: 'Isis', correct: false }
        ]
    },
    {
        question: 'Qual é o código legal mais antigo conhecido?',
        answers: [
            { text: 'Código de Hamurabi', correct: true },
            { text: 'Código de Ur-Nammu', correct: false },
            { text: 'Leis de Eshnunna', correct: false },
            { text: 'Leis de Manu', correct: false }
        ]
    },
    {
        question: 'Quem foi o grande líder militar cartaginense durante as Guerras Púnicas?',
        answers: [
            { text: 'Aníbal', correct: true },
            { text: 'Escipião', correct: false },
            { text: 'Hamilcar Barca', correct: false },
            { text: 'Cipião Africano', correct: false }
        ]
    },
    {
        question: 'Qual é a antiga cidade mesopotâmica conhecida por seus Jardins Suspensos?',
        answers: [
            { text: 'Nínive', correct: false },
            { text: 'Ur', correct: false },
            { text: 'Babilônia', correct: true },
            { text: 'Ebla', correct: false }
        ]
    },
    {
        question: 'Quem foi o fundador do Império Aquemênida na Pérsia?',
        answers: [
            { text: 'Dario I', correct: false },
            { text: 'Xerxes I', correct: false },
            { text: 'Ciro II', correct: true },
            { text: 'Artaxerxes I', correct: false }
        ]
    },
    {
        question: 'Em que cidade antiga era localizado o famoso Oráculo de Delfos?',
        answers: [
            { text: 'Roma', correct: false },
            { text: 'Atenas', correct: false },
            { text: 'Esparta', correct: false },
            { text: 'Delfos', correct: true }
        ]
    },
    {
        question: 'Qual imperador romano ficou conhecido por incendiar Roma e culpar os cristãos?',
        answers: [
            { text: 'Nero', correct: true },
            { text: 'Calígula', correct: false },
            { text: 'Trajano', correct: false },
            { text: 'Marco Aurélio', correct: false }
        ]
    },
    {
        question: 'Qual foi a primeira dinastia do Antigo Egito?',
        answers: [
            { text: 'Dinastia Ptolemaica', correct: false },
            { text: 'Dinastia XXVI', correct: false },
            { text: 'Dinastia IV', correct: false },
            { text: 'Dinastia I', correct: true }
        ]
    },
    {
        question: 'Quem foi o lendário rei da Mesopotâmia conhecido por seu código de leis?',
        answers: [
            { text: 'Gilgamesh', correct: false },
            { text: 'Nabucodonosor II', correct: false },
            { text: 'Ur-Nammu', correct: false },
            { text: 'Hammurabi', correct: true }
        ]
    },
    {
        question: 'O que os antigos egípcios usavam para escrever?',
        answers: [
            { text: 'Papiro', correct: true },
            { text: 'Couro', correct: false },
            { text: 'PerGamon', correct: false },
            { text: 'Argila', correct: false }
        ]
    },
    {
        question: 'Qual cidade antiga era considerada uma das Sete Maravilhas do Mundo Antigo?',
        answers: [
            { text: 'Alexandria', correct: false },
            { text: 'Atenas', correct: false },
            { text: 'Babilônia', correct: true },
            { text: 'Roma', correct: false }
        ]
    },
    {
        question: 'O que os sumérios chamavam de escrita em forma de cunha em tabuletas de argila?',
        answers: [
            { text: 'Heiroglifos', correct: false },
            { text: 'Cuneiforme', correct: true },
            { text: 'Alfabeto', correct: false },
            { text: 'Pictograma', correct: false }
        ]
    },
    {
        question: 'Quem foi o líder dos hunos que invadiu a Europa durante o século V?',
        answers: [
            { text: 'Átila', correct: true },
            { text: 'Genghis Khan', correct: false },
            { text: 'Ogedei Khan', correct: false },
            { text: 'Kublai Khan', correct: false }
        ]
    },
    {
        question: 'Qual é o nome da famosa cidade comercial na região da Mesopotâmia?',
        answers: [
            { text: 'Ur', correct: false },
            { text: 'Babilônia', correct: false },
            { text: 'Ebla', correct: false },
            { text: 'Carém', correct: true }
        ]
    },
    {
        question: 'Quem é o deus nórdico do trovão?',
        answers: [
            { text: 'Odin', correct: false },
            { text: 'Balder', correct: false },
            { text: 'Thor', correct: true },
            { text: 'Loki', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do lobo gigante na mitologia nórdica?',
        answers: [
            { text: 'Sleipnir', correct: false },
            { text: 'Fenrir', correct: true },
            { text: 'Hati', correct: false },
            { text: 'Skoll', correct: false }
        ]
    },
    {
        question: 'Quem é a deusa da morte na mitologia nórdica?',
        answers: [
            { text: 'Frigg', correct: false },
            { text: 'Hel', correct: true },
            { text: 'Sif', correct: false },
            { text: 'Freya', correct: false }
        ]
    },
    {
        question: 'Qual é o reino dos mortos na mitologia nórdica?',
        answers: [
            { text: 'Niflheim', correct: false },
            { text: 'Asgard', correct: false },
            { text: 'Midgard', correct: false },
            { text: 'Helheim', correct: true }
        ]
    },
    {
        question: 'Quem é o pai de todas as criaturas na mitologia nórdica?',
        answers: [
            { text: 'Loki', correct: false },
            { text: 'Odin', correct: true },
            { text: 'Ymir', correct: false },
            { text: 'Fenrir', correct: false }
        ]
    },
    {
        question: 'Qual é a árvore da vida na mitologia nórdica?',
        answers: [
            { text: 'Yggdrasil', correct: true },
            { text: 'Asgard', correct: false },
            { text: 'Fafnir', correct: false },
            { text: 'Mjolnir', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do martelo mágico de Thor?',
        answers: [
            { text: 'Gungnir', correct: false },
            { text: 'Mjolnir', correct: true },
            { text: 'Tyrfing', correct: false },
            { text: 'Excalibur', correct: false }
        ]
    },
    {
        question: 'Quem é o deus nórdico do fogo e da forja?',
        answers: [
            { text: 'Loki', correct: false },
            { text: 'Balder', correct: false },
            { text: 'Heimdall', correct: false },
            { text: 'Hephaestus', correct: true }
        ]
    },
    {
        question: 'Quem é a deusa nórdica do amor, da beleza e da fertilidade?',
        answers: [
            { text: 'Frigg', correct: false },
            { text: 'Freya', correct: true },
            { text: 'Sif', correct: false },
            { text: 'Hel', correct: false }
        ]
    },
    {
        question: 'Quem foi o líder fascista italiano durante a Segunda Guerra Mundial?',
        answers: [
            { text: 'Benito Mussolini', correct: true },
            { text: 'Giuseppe Garibaldi', correct: false },
            { text: 'Silvio Berlusconi', correct: false },
            { text: 'Giuseppe Verdi', correct: false }
        ]
    },
       
]


//CARROS


const qcarros= [
    {
        question: 'Qual é a montadora de automóveis mais antiga do mundo?',
        answers: [
            { text: 'Ford', correct: false },
            { text: 'Toyota', correct: false },
            { text: 'Mercedes-Benz', correct: true },
            { text: 'Chevrolet', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do modelo de muscle car lançado pela Chevrolet em 1967, famoso pelo seu motor V8 de grande potência?',
        answers: [
            { text: 'Thunderbird', correct: false },
            { text: 'Camaro', correct: true },
            { text: 'Pontiac GTO', correct: false },
            { text: 'Dodge Challenger', correct: false }
        ]
    },
    {
        question: 'Qual é o modelo de muscle car lançado pela Dodge em 1970, conhecido por suas diversas opções de cores vibrantes?',
        answers: [
            { text: 'Ford Mustang', correct: false },
            { text: 'Chevrolet Chevelle', correct: false },
            { text: 'Dodge Challenger', correct: true },
            { text: 'Plymouth Road Runner', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do lendário muscle car da Pontiac lançado em 1964?',
        answers: [
            { text: 'Pontiac Firebird', correct: true },
            { text: 'Corvette', correct: false },
            { text: 'Dodge Charger', correct: false },
            { text: 'Ford Torino', correct: false }
        ]
    },
    {
        question: 'O que é o sistema de freios ABS em um carro?',
        answers: [
            { text: 'Sistema de direção assistida', correct: false },
            { text: 'Sistema de controle de tração', correct: false },
            { text: 'Sistema de freios anti-bloqueio', correct: true },
            { text: 'Sistema de suspensão adaptativa', correct: false }
        ]
    },
    {
        question: 'Qual é a função do alternador em um carro?',
        answers: [
            { text: 'Recarregar a bateria', correct: true },
            { text: 'Controlar a temperatura do motor', correct: false },
            { text: 'Converter o ar em combustível', correct: false },
            { text: 'Gerar combustível para o motor', correct: false }
        ]
    },
    {
        question: 'O que significa a sigla "CVT" em transmissões de carros?',
        answers: [
            { text: 'Corrente de Ventilação Técnica', correct: false },
            { text: 'Câmbio Variável de Torque', correct: true },
            { text: 'Comando de Válvulas Temporizado', correct: false },
            { text: 'Controle de Velocidade de Transmissão', correct: false }
        ]
    },
    {
        question: 'O que é o sistema de injeção eletrônica em um carro?',
        answers: [
            { text: 'Sistema de refrigeração do motor', correct: false },
            { text: 'Sistema de ignição do motor', correct: false },
            { text: 'Sistema de alimentação de combustível', correct: true },
            { text: 'Sistema de segurança passiva', correct: false }
        ]
    },
    {
        question: 'Qual é a função do filtro de óleo em um carro?',
        answers: [
            { text: 'Filtrar o ar que entra no motor', correct: false },
            { text: 'Filtrar o óleo que lubrifica o motor', correct: true },
            { text: 'Filtrar o combustível antes de entrar no motor', correct: false },
            { text: 'Filtrar os gases de escape do motor', correct: false }
        ]
    },
    {
        question: 'O que é o sistema de suspensão independente em um carro?',
        answers: [
            { text: 'Um sistema que permite ajustar a altura do veículo', correct: false },
            { text: 'Um sistema que conecta as rodas do mesmo eixo', correct: false },
            { text: 'Um sistema que permite que cada roda se mova independentemente das outras', correct: true },
            { text: 'Um sistema que controla a tração nas quatro rodas', correct: false }
        ]
    },
    {
        question: 'Qual é a função do radiador em um carro?',
        answers: [
            { text: 'Ajudar a controlar a pressão dos pneus', correct: false },
            { text: 'Manter a temperatura do motor dentro de limites seguros', correct: true },
            { text: 'Melhorar a aerodinâmica do veículo', correct: false },
            { text: 'Filtrar as impurezas do combustível', correct: false }
        ]
    },
    {
        question: 'O que significa a sigla "RPM" em um carro?',
        answers: [
            { text: 'Regulador de Pressão Máxima', correct: false },
            { text: 'Rotações Por Minuto', correct: true },
            { text: 'Ruído do Motor Potencializado', correct: false },
            { text: 'Refrigeração Para o Motor', correct: false }
        ]
    },
    {
        question: 'O que é o diferencial em um carro?',
        answers: [
            { text: 'Um dispositivo que controla a pressão dos pneus', correct: false },
            { text: 'Um sistema que regula o fluxo de ar para o motor', correct: false },
            { text: 'Um conjunto de engrenagens que distribui a potência do motor para as rodas', correct: true },
            { text: 'Um componente que filtra o óleo do motor', correct: false }
        ]
    },
    {
        question: 'O que é o sistema de direção hidráulica em um carro?',
        answers: [
            { text: 'Um sistema que utiliza água para refrigerar o motor', correct: false },
            { text: 'Um sistema que utiliza óleo para lubrificar o motor', correct: false },
            { text: 'Um sistema que utiliza pressão hidráulica para auxiliar o motorista a girar o volante', correct: true },
            { text: 'Um sistema que utiliza ar para inflar os pneus', correct: false }
        ]
    },
    {
        question: 'Qual é o modelo de muscle car lançado pela Plymouth em 1968, conhecido por sua pintura em duas cores?',
        answers: [
            { text: 'Dodge Charger', correct: false },
            { text: 'Plymouth Barracuda', correct: true },
            { text: 'Chevrolet Camaro', correct: false },
            { text: 'Ford Mustang', correct: false }
        ]
    },
    {
        question: 'Qual é o modelo de carro mais vendido nos Estados Unidos?',
        answers: [
            { text: 'Ford F-Series', correct: true },
            { text: 'Chevrolet Silverado', correct: false },
            { text: 'Toyota Camry', correct: false },
            { text: 'Honda Civic', correct: false }
        ]
    },
    {
        question: 'Qual é a marca de carro conhecida por produzir o modelo Golf?',
        answers: [
            { text: 'Toyota', correct: false },
            { text: 'Ford', correct: false },
            { text: 'Volkswagen', correct: true },
            { text: 'Chevrolet', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do modelo de carro que ficou famoso por aparecer na série de filmes "De Volta para o Futuro"?',
        answers: [
            { text: 'DeLorean DMC-12', correct: true },
            { text: 'Chevrolet Camaro', correct: false },
            { text: 'Ford Mustang', correct: false },
            { text: 'Ferrari Testarossa', correct: false }
        ]
    },
    {
        question: 'Qual é a montadora de carros que produz o modelo Civic?',
        answers: [
            { text: 'Toyota', correct: false },
            { text: 'Honda', correct: true },
            { text: 'Chevrolet', correct: false },
            { text: 'Ford', correct: false }
        ]
    },
    {
        question: 'Qual montadora de automóveis produziu o lendário modelo Mustang?',
        answers: [
            { text: 'Ford', correct: true },
            { text: 'Chevrolet', correct: false },
            { text: 'Toyota', correct: false },
            { text: 'Honda', correct: false }
        ]
    },
    {
        question: 'Qual é o carro mais vendido de todos os tempos?',
        answers: [
            { text: 'Volkswagen Golf', correct: false },
            { text: 'Toyota Corolla', correct: true },
            { text: 'Ford Fiesta', correct: false },
            { text: 'Honda Civic', correct: false }
        ]
    },
    {
        question: 'Qual é o país de origem da marca de carros BMW?',
        answers: [
            { text: 'Itália', correct: false },
            { text: 'Alemanha', correct: true },
            { text: 'França', correct: false },
            { text: 'Japão', correct: false }
        ]
    },
    {
        question: 'Qual é a marca do primeiro carro produzido em escala no mundo?',
        answers: [
            { text: 'Ford', correct: true },
            { text: 'Toyota', correct: false },
            { text: 'Mercedes-Benz', correct: false },
            { text: 'Chevrolet', correct: false }
        ]
    },
    {
        question: 'Qual empresa de carros esportivos fabrica o 911?',
        answers: [
            { text: 'Ferrari', correct: false },
            { text: 'Lamborghini', correct: false },
            { text: 'Porsche', correct: true },
            { text: 'Audi', correct: false }
        ]
    },
    {
        question: 'Qual o verdadeiro nome do "olho de gato/tartaruga", tipo de sinalização presente em ruas e rodovias?',
        answers: [
            { text: 'Catadióptrico', correct: true },
            { text: 'Prisma', correct: false },
            { text: 'Refletor rodoviário', correct: false },
            { text: 'Sinalizador viário', correct: false }
        ]
    },
    {
        question: 'Em 1896 Walter Amold foi a primeira pessoa a ser multada por excesso de velocidade. Qual era sua velocidade?',
        answers: [
            { text: '110km/h', correct: false },
            { text: '60km/h', correct: false },
            { text: '13km/h', correct: true },
            { text: '5km/h', correct: false }
        ]
    },
    {
        question: 'Em que país a Lamborghini foi fundada?',
        answers: [
            { text: 'Itália', correct: true },
            { text: 'Alemanha', correct: false },
            { text: 'França', correct: false },
            { text: 'Estados Unidos', correct: false }
        ]
    },
    {
        question: 'Qual é o carro mais vendido de todos os tempos?',
        answers: [
            { text: 'Volkswagen Golf', correct: false },
            { text: 'Toyota Corolla', correct: true },
            { text: 'Ford F-Series', correct: false },
            { text: 'Honda Civic', correct: false }
        ]
    },
    {
        question: 'Em que ano foi lançado o primeiro carro produzido em série?',
        answers: [
            { text: '1900', correct: false },
            { text: '1910', correct: false },
            { text: '1920', correct: false },
            { text: '1908', correct: true }
        ]
    },
    {
        question: 'Qual é o nome do carro esportivo da Ferrari mais icônico?',
        answers: [
            { text: 'Enzo', correct: false },
            { text: 'California', correct: false },
            { text: 'Testarossa', correct: false },
            { text: 'Ferrari 458 Italia', correct: true }
        ]
    },
    {
        question: 'Quem é conhecido como o fundador da indústria automobilística?',
        answers: [
            { text: 'Henry Ford', correct: true },
            { text: 'Elon Musk', correct: false },
            { text: 'Karl Benz', correct: false },
            { text: 'Enzo Ferrari', correct: false }
        ]
    },
    {
        question: 'Qual é o modelo de carro mais produzido pela Ford?',
        answers: [
            { text: 'Mustang', correct: false },
            { text: 'Focus', correct: false },
            { text: 'Fiesta', correct: true },
            { text: 'Explorer', correct: false }
        ]
    },
    {
        question: 'Qual é o primeiro carro híbrido produzido em massa?',
        answers: [
            { text: 'Tesla Model S', correct: false },
            { text: 'Toyota Prius', correct: true },
            { text: 'Chevrolet Volt', correct: false },
            { text: 'Nissan Leaf', correct: false }
        ]
    },
    {
        question: 'Qual é a marca de carro conhecida por seus veículos off-road?',
        answers: [
            { text: 'BMW', correct: false },
            { text: 'Jeep', correct: true },
            { text: 'Land Rover', correct: false },
            { text: 'Audi', correct: false }
        ]
    },
    {
        question: 'Em que país a Hyundai foi fundada?',
        answers: [
            { text: 'Coreia do Sul', correct: true },
            { text: 'Japão', correct: false },
            { text: 'China', correct: false },
            { text: 'Alemanha', correct: false }
        ]
    },
    {
        question: 'Qual é a montadora de carros mais antiga dos Estados Unidos?',
        answers: [
            { text: 'General Motors', correct: false },
            { text: 'Ford', correct: false },
            { text: 'Chrysler', correct: true },
            { text: 'Chevrolet', correct: false }
        ]
    },
    {
        question: 'Qual é o SUV mais vendido do mundo?',
        answers: [
            { text: 'Toyota RAV4', correct: true },
            { text: 'Honda CR-V', correct: false },
            { text: 'Ford Escape', correct: false },
            { text: 'Chevrolet Equinox', correct: false }
        ]
    },
    {
        question: 'Qual é a marca de carros conhecida por seus veículos de luxo?',
        answers: [
            { text: 'Toyota', correct: false },
            { text: 'Audi', correct: true },
            { text: 'Honda', correct: false },
            { text: 'Ford', correct: false }
        ]
    },
    {
        question: 'Qual é o modelo de carro mais antigo ainda em produção?',
        answers: [
            { text: 'Ford Mustang', correct: false },
            { text: 'Chevrolet Corvette', correct: false },
            { text: 'Volkswagen Beetle', correct: true },
            { text: 'Porsche 911', correct: false }
        ]
    },
    {
        question: 'Qual é o primeiro carro elétrico produzido em massa?',
        answers: [
            { text: 'Nissan Leaf', correct: false },
            { text: 'Chevrolet Bolt', correct: false },
            { text: 'Tesla Model S', correct: true },
            { text: 'BMW i3', correct: false }
        ]
    },
    {
        question: 'Qual é a marca de carros conhecida por seus veículos esportivos?',
        answers: [
            { text: 'Toyota', correct: false },
            { text: 'Ferrari', correct: true },
            { text: 'Honda', correct: false },
            { text: 'Chevrolet', correct: false }
        ]
    },
    {
        question: 'Qual é o modelo de carro mais vendido no Brasil? (até 2023)',
        answers: [
            { text: 'Chevrolet Onix', correct: true },
            { text: 'Volkswagen Gol', correct: false },
            { text: 'Fiat Strada', correct: false },
            { text: 'Toyota Corolla', correct: false }
        ]
    },
    {
        question: 'Qual é o modelo de carro mais rápido do mundo em termos de velocidade máxima? (até 2023)',
        answers: [
            { text: 'Bugatti Veyron', correct: false },
            { text: 'Koenigsegg Jesko Absolut', correct: true },
            { text: 'Hennessey Venom F5', correct: false },
            { text: 'McLaren Speedtail', correct: false }
        ]
    },
    {
        question: 'Qual é o SUV mais luxuoso do mercado? (até 2023)',
        answers: [
            { text: 'Audi Q7', correct: false },
            { text: 'Range Rover Velar', correct: false },
            { text: 'Mercedes-Benz GLS', correct: true },
            { text: 'BMW X5', correct: false }
        ]
    },
    {
        question: 'Qual é a velocidade máxima permitida em áreas urbanas?',
        answers: [
            { text: '40 km/h', correct: false },
            { text: '50 km/h', correct: true },
            { text: '60 km/h', correct: false },
            { text: '70 km/h', correct: false }
        ]
    },
    {
        question: 'O que a sinalização de pare indica?',
        answers: [
            { text: 'Diminuir a velocidade', correct: false },
            { text: 'Parar o veículo', correct: true },
            { text: 'Acelerar o veículo', correct: false },
            { text: 'Curva acentuada à direita', correct: false }
        ]
    },
    {
        question: 'O que significa uma faixa contínua no meio da pista?',
        answers: [
            { text: 'Pode ultrapassar', correct: false },
            { text: 'Proibido ultrapassar', correct: true },
            { text: 'Apenas ultrapassagem permitida', correct: false },
            { text: 'Caminhão na pista', correct: false }
        ]
    },
    {
        question: 'O que é uma rotatória?',
        answers: [
            { text: 'Cruzamento sem sinalização', correct: false },
            { text: 'Trevo de acesso a uma cidade', correct: false },
            { text: 'Interseção em forma circular', correct: true },
            { text: 'Ponto de parada obrigatória', correct: false }
        ]
    },
    {
        question: 'O que significa uma placa de "Pare e Siga" em semáforos?',
        answers: [
            { text: 'Apenas pare', correct: false },
            { text: 'Pare e aguarde autorização para seguir', correct: true },
            { text: 'Siga sem parar', correct: false },
            { text: 'Apenas siga', correct: false }
        ]
    },
    {
        question: 'O que é uma faixa de pedestres?',
        answers: [
            { text: 'Local de estacionamento de pedestres', correct: false },
            { text: 'Área exclusiva para bicicletas', correct: false },
            { text: 'Área demarcada para a travessia de pedestres', correct: true },
            { text: 'Faixa para corrida de pedestres', correct: false }
        ]
    },
    
]


// TODOS OS TEMAS

const todasq= [...qarte, ...qbio, ...qciencia, ...qentre, ...qesporte, ...qgeek, ...qgeo, ...qhisto, ...qcarros]


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
