const steps = Array.from(document.querySelectorAll('.form-step'));
const nextBtns = document.querySelectorAll('button[data-action="next"]');
const prevBtns = document.querySelectorAll('button[data-action="prev"]');
const currentStepEl = document.getElementById('current-step');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');
const closeErrorBtn = document.getElementById('close-error-btn');

const locaisPorTipo = {
    'hamburguer': ['Outback 🍔','Fábrica Gourmet 🍔','Hard Rock Café 🍔'],
    'pizza': ['Avenida paulista 🍕','Mercearia anos 30 🍕','Park da Pizza 🍕'],
    'churrascaria': ['Batel Grill 🍖','Arco Íris 🍖','Sal e Brasa 🍖'],
    'cafeteria': ['Flor de laranjeira ☕','Chez Margot Bistrot ☕','Pantucci ☕', 'Italy Caffé ☕'],
    'musicais': ['Full Jazz Bar 🎵','Rock Pizza Roll 🎵','O Pensador 🎵'],
    'bonus': ['The Ox Room Steakhouse ⭐', 'Ile de France Curitiba ⭐', 'Paris 6 ⭐', "Ca'dore ⭐"]
};

let currentStep = 0;

function changeStep(direction) {
    steps[currentStep].classList.remove('active');
    currentStep += direction === 'next' ? 1 : -1;
    steps[currentStep].classList.add('active');
    currentStepEl.textContent = currentStep + 1;
    if (steps[currentStep].id === 'step-local') updateLocalOptions();
}

function updateLocalOptions() {
    const tipo = document.querySelector('input[name="tipoComida"]:checked');
    const container = document.getElementById('opcoes-local');
    container.innerHTML = '';
    if (tipo && locaisPorTipo[tipo.value]) {
        locaisPorTipo[tipo.value].forEach(local => {
          const lbl = document.createElement('label');
          lbl.innerHTML = `<input type="radio" name="localEscolhido" value="${local}" required /> ${local}`;
          container.appendChild(lbl);
        });
    }
}

nextBtns.forEach(btn => btn.addEventListener('click', () => {
    hideErrorMessage();
    const active = steps[currentStep];
    const requiredFields = active.querySelectorAll('input[required]');
    let valid = true;
    requiredFields.forEach(f => {
        if (f.type === 'text' && f.value.trim() === '') valid = false;
        if (f.type === 'radio') {
          const group = active.querySelectorAll(`input[name="${f.name}"]`);
          if (![...group].some(r => r.checked)) valid = false;
        }
    });
    if (valid) changeStep('next'); else showErrorMessage('Por favor, preencha todos os campos obrigatórios.');
}));

prevBtns.forEach(btn => btn.addEventListener('click', () => { hideErrorMessage(); changeStep('prev'); }));
closeErrorBtn.addEventListener('click', hideErrorMessage);

function showErrorMessage(msg) {
    errorText.textContent = msg;
    errorMessage.style.display = 'block';
}

function hideErrorMessage() {
    errorMessage.style.display = 'none';
    errorText.textContent = '';
}

document.querySelector('button[type="submit"]').addEventListener('click', e => {
    e.preventDefault();
    const cont = document.getElementById('emoji-explosion'); cont.innerHTML = '';
    for (let i=0;i<50;i++){
      const em = document.createElement('div'); em.textContent='🎉';
      Object.assign(em.style,{position:'absolute',fontSize:`${16+Math.random()*24}px`,left:`${Math.random()*100}vw`,top:`${Math.random()*100}vh`,opacity:0,animation:'explode 1.5s ease-out'});
      cont.appendChild(em);
    }
    setTimeout(()=>document.querySelector('form').submit(),2000);
});