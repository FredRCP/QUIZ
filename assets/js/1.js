//ACESSAR PÁGINAS

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

document.addEventListener('DOMContentLoaded', function () {
    //ACESSAR JSON
    function carregarQuestoes() {
      return fetch('./assets/questoes.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('ERRO 404');
          }
          return response.json();
        })
        .catch(error => {
          console.error('Erro ao carregar questões:', error);
        });
    }
  
    // Use .then() para lidar com a resolução da Promise
    carregarQuestoes().then(todasq => {
  
      let pontos;
      let acertos;
      let erros;
      let perguntasUsadas = [];
      console.log('ok')
      // INICIAR O JOGO
  
      function start(categoria) {
        console.log('start');
        pontos = 0;
        acertos = 0;
        erros = 0;
        perguntasUsadas = [];
        const pontuacao = document.querySelector('.pontos');
        pontuacao.innerHTML = 0;
        const caixa = document.querySelector('.generico');
        caixa.classList.add('caixa');
        const caixagenerica = document.querySelector('.generico');
        caixagenerica.style.display = 'flex';
  
        proximapergunta(categoria);
      }
  
      // ... Restante do seu código ...
  
      function proximapergunta(categoria) {
        const categoriaAtual = todasq.find((cat) => cat.category === categoria);
  
        if (!categoriaAtual) {
          console.error(`Categoria "${categoria}" não encontrada.`);
          return;
        }
  
        const pergunta = document.querySelector('.pergunta');
        const respostas = document.querySelector('.respostas');
        const botaoProxima = document.querySelector('#botaoproxima');
        const botao = document.querySelector('.start');
  
        let n1;
  
        if (perguntasUsadas.length === categoriaAtual.questions.length) {
          document.querySelector('.pontos').innerHTML = `Você acertou ${acertos} questões e fez ${pontos} pontos! Fim do QUIZ!`;
          botaoProxima.classList.remove('proxima');
          botao.style.display = 'flex';
          botao.textContent = 'REINICIAR';
          const caixagenerica = document.querySelector('#generico');
          caixagenerica.style.display = 'none';
          return;
        }
  
        do {
          n1 = sorteio(categoriaAtual.questions.length);
        } while (perguntasUsadas.includes(n1));
        perguntasUsadas.push(n1);
  
        botaoProxima.classList.remove('proxima');
        while (respostas.firstChild) {
          respostas.removeChild(respostas.firstChild);
        }
        pergunta.textContent = categoriaAtual.questions[n1].question;
        categoriaAtual.questions[n1].answers.forEach((resposta) => {
          const botao = document.createElement('button');
          botao.classList.add('botao');
          botao.textContent = resposta.text;
          if (resposta.correct) {
            botao.dataset.correct = resposta.correct;
          }
          respostas.appendChild(botao);
          botao.addEventListener('click', selecao);
        });
      }
  
      function selecao(e) {
        const pontuacao = document.querySelector('.pontos');
        const el = e.target;
        if (el.dataset.correct) {
          alert('acertou');
          el.classList.add('acertou');
          pontos += 10;
          acertos += 1;
          pontuacao.innerHTML = acertos;
        } else {
          alert('errou');
          el.classList.add('errou');
          erros += 1;
          pontuacao.innerHTML = acertos;
        }
  
        document.querySelectorAll('.botao').forEach(button => {
          if (button.dataset.correct) {
            button.classList.add('acertou');
          } else {
            button.classList.add('errou');
          }
          button.disabled = true;
        });
        const botaoproxima = document.querySelector('#botaoproxima');
        botaoproxima.classList.add('proxima');
      }
  
      // Agora, inicie o jogo após o carregamento do DOM
      start('arte');
  
    });
  });






