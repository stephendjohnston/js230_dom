"use strict";

const linkedOptions = {
  classifications: {
    Vertebrate: ['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
    'Warm-Blooded': ['Bear', 'Whale', 'Ostrich'],
    'Cold-Blooded': ['Turtle', 'Salmon'],
    Mammal: ['Bear', 'Whale'],
    Bird: ['Ostrich'],
  },
  animals: {
    Bear: ['Vertebrate', 'Warm-Blooded', 'Mammal'],
    Turtle: ['Vertebrate', 'Cold-Blooded'],
    Whale: ['Vertebrate', 'Warm-Blooded', 'Mammal'],
    Salmon: ['Vertebrate', 'Cold-Blooded'],
    Ostrich: ['Vertebrate', 'Warm-Blooded', 'Bird']
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let animalSelect = document.querySelector('#animals');
  let classificationSelect = document.querySelector('#animal-classifications');
  let classifications = Array.from(classificationSelect);
  let animals = Array.from(animalSelect);
  let clearBtn = document.querySelector('button');

  classificationSelect.addEventListener('change' , e => {
    let index = classificationSelect.selectedIndex;
    animals[0].style.display = 'none';
    animals.slice(1).forEach(el => {
      el.style.display = 'block';
    });

    if (index === 2) {
      animals[2].style.display = 'none';
      animals[4].style.display = 'none';
    } else if (index === 3) {
      animals[1].style.display = 'none';
      animals[3].style.display = 'none';
      animals[5].style.display = 'none';
    } else if (index === 4) {
      animals[2].style.display = 'none';
      animals[4].style.display = 'none';
      animals[5].style.display = 'none';
    } else if (index === 5) {
      animals[1].style.display = 'none';
      animals[2].style.display = 'none';
      animals[3].style.display = 'none';
      animals[4].style.display = 'none';
    }
  });

  animalSelect.addEventListener('change', e => {
    let index = animalSelect.selectedIndex;
    classifications[0].style.display = 'none';
    classifications.slice(1).forEach(el => {
      el.style.display = 'block';
    });

    if (index === 1) {
      classifications[3].style.display = 'none';
      classifications[5].style.display = 'none';
    } else if (index === 2) {
      classifications[2].style.display = 'none';
      classifications[4].style.display = 'none';
      classifications[5].style.display = 'none';
    } else if (index === 3) {
      classifications[3].style.display = 'none';
      classifications[5].style.display = 'none';
    } else if (index === 4) {
      classifications[2].style.display = 'none';
      classifications[4].style.display = 'none';
      classifications[5].style.display = 'none';
    } else if (index === 5) {
      classifications[3].style.display = 'none';
      classifications[4].style.display = 'none';
    }
  });

  clearBtn.addEventListener('click', e => {
    classifications.forEach(el => {
      el.style.display = 'block';
    });

    animals.forEach(el => {
      el.style.display = 'block';
    });
  });
});

// Attempt # 2
// better than the first haha

const animalTypes = {
  'Bear': ['Vertebrate', 'Warm-blooded', 'Mammal'],
  'Turtle': ['Vertebrate', 'Cold-blooded'],
  'Whale': ['Vertebrate', 'Warm-blooded', 'Mammal'],
  'Salmon': ['Vertebrate', 'Cold-blooded'],
  'Ostrich': ['Vertebrate', 'Warm-blooded', 'Bird']
}

const classificationTypes = {
  'Vertebrate': [	'Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
  'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
  'Cold-blooded': ['Salmon', 'Turtle'],
  'Mammal': ['Bear', 'Whale'],
  'Bird': ['Ostrich']
}

document.addEventListener('DOMContentLoaded', event => {
  const form = document.querySelector('form');
  const animals = form.querySelector('#animals');
  const classifications = form.querySelector('#animal-classifications');
  const clearBtn = form.querySelector('#clear');

  animals.addEventListener('change', e => {
    let animal = animals.options[animals.selectedIndex].value;
    if (!animal) return;

    removeOptions(classifications);
    addOptions(classifications, animalTypes[animal]);
  });

  classifications.addEventListener('change', e => {
    let classification = classifications.options[classifications.selectedIndex].value;
    if (!classification) return;

    removeOptions(animals);
    addOptions(animals, classificationTypes[classification]);
  });

  clearBtn.addEventListener('click', e => {
    e.preventDefault();
    removeOptions(animals);
    removeOptions(classifications);
    reset(animals, classifications);
  });
});

function removeOptions(selectEl) {
  [...selectEl.options].forEach(node => selectEl.removeChild(node));
}

function addOptions(selectEl, values) {
  values.forEach(value => {
    let option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    selectEl.appendChild(option);
  });
}

function reset(animals, classifications) {
  let animalOption = document.createElement('option');
  animalOption.value = 'Animals';
  animalOption.textContent = 'Animals';
  animals.appendChild(animalOption);
  let classificationOption = document.createElement('option');
  classificationOption.value = 'Classifications';
  classificationOption.textContent = 'Classifications';
  classifications.appendChild(classificationOption);

  Object.keys(animalTypes).forEach(animal => {
    let newOption = document.createElement('option');
    newOption.value = animal;
    newOption.textContent = animal;
    animals.appendChild(newOption);
  });

  Object.keys(classificationTypes).forEach(classification => {
    let newOption = document.createElement('option');
    newOption.value = classification;
    newOption.textContent = classification;
    classifications.appendChild(newOption);
  });
}