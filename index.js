// fetch('http://localhost:3000/api/chat', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({ message: 'meu nome é cicero' }),
// })
//   .then(response => response.json())
//   .then((data)=>{
//     console.log(data.choices[0].message.content);
//   })



async function sendMenssage(){
  const caixaText = document.querySelector('#caixa-txt')
  const btnEnviar = document.querySelector('#btn-enviar')
  
  if(caixaText.value.length == 0){
    alert('myagiktu8dfwgijuy');
    return
  }

  caixaText.disabled = true;
  btnEnviar.disabled = true;

  const menssagem = caixaText.value;
  caixaText.value = '';
  writeMessage(menssagem);
  Loader(true)
  const response = await getResponse(menssagem);
  Loader(false)
  writeResponse(response);

  caixaText.disabled = false;
  btnEnviar.disabled = false;


  console.log(response)
}

async function getResponse(menssagem) 
{
  let response = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: menssagem }),
    
  })
  const data = await response.json();
  return data.choices[0].message.content;

}

function writeMessage(message){

  let main = document.querySelector('#main')
  let DivMesssagem = document.createElement('div');
  DivMesssagem.className = 'w-[80%] text-white bg-[#324eff] p-4 rounded self-end';
  DivMesssagem.innerHTML = message;

  main.appendChild(DivMesssagem);
  
}

function typeWrite(elemento){
  // Efeito de maquina de escrever
  const textoArray = elemento.innerHTML.split('');
  elemento.innerHTML = ' ';
  textoArray.forEach(function(letra, i){   
    
  setTimeout(function(){
      elemento.innerHTML += letra;
  }, 10 * i)

})
}

function writeResponse(response){

  let main = document.querySelector('#main')
  let DivResponse = document.createElement('div');
  DivResponse.className = 'max-w-[80%] text-white bg-[#364156] p-4 rounded self-start';
  DivResponse.innerHTML = response;

  main.appendChild(DivResponse);
  typeWrite(DivResponse);
}

function SendWithEnter(e){
  if(e.key === 'Enter')
  {
    sendMenssage();
  }
}

function Loader(bool)
{

  let main = document.querySelector('#main')

  if(bool){

    let background = document.createElement('div');
    background.className = 'max-w-[80%] bg-[#364156] p-4 rounded self-start';
    background.id = 'loader'

    let DivLoader = document.createElement('div');
    DivLoader.className = 'c-loader';


    background.appendChild(DivLoader);
    main.appendChild(background);
  }
  else {
    main.removeChild(loader)
  }
}