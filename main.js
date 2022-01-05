const body = document.querySelector("html");
const cardContainer = document.querySelector(".container");

const cards = Array.from(document.querySelectorAll(".card"));
const cardObserverOptions = {
  threshold: 0,
  rootMargin: "-100px 0px"
}

const cardObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {

      setTimeout(() => {
        entry.target.classList.toggle("show", entry.isIntersecting);
        
      }, 100 + i * 200);
  });
}, cardObserverOptions);


// Last card observer

const lastCardObserver = new IntersectionObserver((entries, lastCardObserver) => {
  const lastCard = entries[0];

  if (!lastCard.isIntersecting) return;

  createNewCards(8);
  
  const newCards = Array.from(document.querySelectorAll(".new-card"));
  newCards.forEach(newCard => {
    cardObserver.observe(newCard);
  });
  
  lastCardObserver.unobserve(lastCard.target);
  lastCardObserver.observe(document.querySelector(".card:last-child"));
}, { rootMargin: "0px 0px 300px 0px" });

lastCardObserver.observe(document.querySelector(".card:last-child"));
cards.forEach(card => cardObserver.observe(card));


const createNewCards = cardQuantity => {
  for (let i = 0; i < cardQuantity; i++) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card", "new-card");
    cardElement.textContent = "Here's a new in-js card";
    cardContainer.append(cardElement);
  }
}