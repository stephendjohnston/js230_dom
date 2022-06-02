"use strict";

/*
- When a nav link is clicked, the browser scrolls to that article and
adds the highlight class to it
- when another article is clicked, the highlight class is removed from
the element that has it and added to article that was clicked
  - this inlcudes any child elements of an article.
- If the user clicks anywhere else on the page, the browser adds the
highlight class to the `main` element, and removes the highlight class
from the element that has the highlight class

Example:
We click on nav link Article 1. Browser scrolls to Article 1. Adds
highlight class to article element.

So we need to add event listeners to each link. When you Click the link,
get the value of the text content. 

*/

// document.addEventListener('DOMContentLoaded', () => {
//   let articles = document.querySelectorAll('article');
//   let links = document.querySelectorAll('a');
//   let main = document.querySelector('main');

//   document.addEventListener('click', e => {
//     e.stopPropagation();
//     main.classList.add('highlight');

//     articles.forEach(article => {
//       article.classList.remove('highlight');
//     });
//   });

//   main.addEventListener('click', event => {
//     main.classList.add('highlight');

//     articles.forEach(article => {
//       article.classList.remove('highlight');
//     });
//   });

//   articles.forEach(article => {
//     article.addEventListener('click', event => {
//       event.stopPropagation();
//       main.classList.remove('highlight');
//       articles.forEach(art => {
//         if (event.currentTarget.contains(art)) {
//           art.classList.add('highlight');
//         } else {
//           art.classList.remove('highlight');
//         }
//       });
//     });
//   });

//   links.forEach(link => {
//     link.addEventListener('click' , e => {
//       e.stopPropagation();
//       main.classList.remove('highlight');
//       let linkText = e.target.innerText;
//       links.forEach((li, idx) => {
//         if (linkText === articles[idx].firstElementChild.innerText) {
//           articles[idx].classList.add('highlight');
//         } else {
//           articles[idx].classList.remove('highlight');
//         }
//       });
//     });
//   });
// });
document.addEventListener('DOMContentLoaded', () => {
  function highlight({target}) {
    let element;
    let id;
  
    removeHighlight();
  
    if (target.tagName === 'A') {
      id = target.href.match('#article-[0-9]+')[0]
      element = document.querySelector(id);
    } else {
      element = document.querySelector('main');
    }
  
    element.classList.add('highlight');
  }
  
  function removeHighlight() {
    const highlighted = document.querySelector('.highlight');
    if (highlighted) {
      highlighted.classList.remove('highlight');
    }
  }
  
  const nav = document.querySelector('header ul');
  const main = document.querySelector('main');
  
  nav.addEventListener('click', highlight);
  document.addEventListener('click', highlight);
  main.addEventListener("click", e => {
    e.preventDefault();
    let article = e.target;
    console.log(article)
    if (article.tagName !== 'ARTICLE') { article = article.parentNode; }
    console.log(article);
    if (article.tagName === "ARTICLE") {
      e.stopPropagation();
      removeHighlight();
      article.classList.add("highlight");
    }
  });
});

// attempt # 2
// slightly better than the first!


document.addEventListener('DOMContentLoaded', () => {
  const articles = document.querySelectorAll('article');
  const links = document.querySelectorAll('a');
  const main = document.querySelector('main');

  links.forEach((link, idx) => {
    link.addEventListener('click', event => {
      event.stopPropagation();
      removeHighlight(articles);
      main.classList.remove('highlight');
      articles[idx].classList.add('highlight');
    });
  });

  articles.forEach(article => {
    article.addEventListener('click', event => {
      event.stopPropagation();
      removeHighlight(articles);
      main.classList.remove('highlight');
      event.currentTarget.classList.add('highlight');
    });
  });

  document.addEventListener('click', event => {
    removeHighlight(articles);
    main.classList.add('highlight');
  });
});

function removeHighlight(elements) {
  elements.forEach(element => element.classList.remove('highlight'));
}