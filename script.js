// fonction qui gere la structure de la slide principal
async function slide() {
  try {
    const rep = await fetch('./json/fr.json');
    const data = await rep.json();
    // Récupération du conteneur où les éléments seront ajoutés
    const slidePrincipal = document.querySelector('.slide-principal');

    // Boucle sur chaque projet
    data.projects.infoProject.forEach(project => {

      const containerElement = document.createElement('div');
      containerElement.classList.add('element');

      const img = document.createElement('img');
      img.src = project.picture[0].src;
      img.alt = project.picture[0].alt;
      containerElement.appendChild(img);

      const containerInfo = document.createElement('div');
      containerInfo.classList.add('content-info');
      containerElement.appendChild(containerInfo);

      const containerTitle = document.createElement('div');
      containerTitle.classList.add('title-project');
      const h3 = document.createElement('h3');
      h3.textContent = project.title;
      containerTitle.appendChild(h3);

      const containerText = document.createElement('div');
      containerText.classList.add('text');
      const p = document.createElement('p');
      p.textContent = project.description;
      containerText.appendChild(p);

      const containeButton = document.createElement('div');
      containeButton.classList.add('button');
      const button = document.createElement('button');
      button.textContent = project.tag;
      button.addEventListener('click', () => openLink(project.link));
      containeButton.appendChild(button);

      containerInfo.appendChild(containerTitle);
      containerInfo.appendChild(containerText);
      containerInfo.appendChild(containeButton);

      slidePrincipal.appendChild(containerElement);
    });
  } catch (error) {
    console.error('ERREUR', error);
  }
} slide()

// fonction pour ouvrir le lien dans une autre page du navigateur
function openLink(link) {
  window.open(link, '_blank');
}


// fonction qui gere la structure des vignettes
async function slideVignette() {
  try {
    const rep = await fetch('./json/fr.json');
    const data = await rep.json();

    const slideVignette = document.querySelector('.slide-vignette');

    data.projects.infoProject.forEach(project => {
      const containerElement = document.createElement('div');
      containerElement.classList.add('item');

      const img = document.createElement('img');
      img.src = project.picture[0].src;
      img.alt = project.picture[0].alt;
      containerElement.appendChild(img);

      const containerInfo = document.createElement('div');
      containerInfo.classList.add('content-info');
      containerElement.appendChild(containerInfo);

      const containerTitle = document.createElement('div');
      containerTitle.classList.add('title-project');
      const h3 = document.createElement('h3');
      h3.textContent = project.title;
      containerTitle.appendChild(h3);

      containerInfo.appendChild(containerTitle);
      slideVignette.appendChild(containerElement);
    });
  } catch (error) {
    console.error('ERREUR', error);
  }
} slideVignette()


//fonction qui gere le défilement du slider

// parent de toutes mes balise html de mon slider
let parentSlider = document.querySelector('.container-slider');
// div parent du slide principal
let slidePrincipal = parentSlider.querySelector('.slide-principal');
// div parent du slide secondaire
let vignette = parentSlider.querySelector('.slide-vignette');


// emplacement est fonction du bouton prev au click
const buttonPrev = document.getElementById('prev');
buttonPrev.addEventListener('click', () => { showContent('prev'); })
// emplacement est fonction du bouton next au click
const buttonNext = document.getElementById('next');
buttonNext.addEventListener('click', () => { showContent('next'); })

let clearClass;

function showContent(type) {
  // recupere toute les div item de la div slide principal
  let itemPrincipal = slidePrincipal.querySelectorAll('.element');
  // recupere toute les div item de la div slide vignette
  let itemVignette = vignette.querySelectorAll('.item');

  // la condition if si je vient click sur le bouton next le premier element item
  // est mis a la fin de la liste pour crée un effet de défilement vers la droite
  if (type === 'next') {
    slidePrincipal.appendChild(itemPrincipal[0]);
    vignette.appendChild(itemVignette[0]);
    parentSlider.classList.add('next');
  }
  // la condition eles si je vient click sur le bouton prev le premier element item
  // est mis au debut de la liste pour crée un effet de défilement vers la gauche
  else {
    slidePrincipal.prepend(itemPrincipal[itemPrincipal.length - 1]);
    vignette.prepend(itemVignette[itemVignette.length - 1]);
    parentSlider.classList.add('prev');
  }
  // vient supprimer les class next est prev à chaque clique sur le bouton next ou prev
  clearTimeout(clearClass);
  clearClass = setTimeout(() => {
    parentSlider.classList.remove('next', 'prev');
  }, 200);
}