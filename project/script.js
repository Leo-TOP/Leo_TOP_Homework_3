"use strict";

const cards = document.querySelectorAll(".collection-card");
const detailsPanel = document.getElementById("details-panel");
const detailsTitle = document.getElementById("details-title");
const detailsDescription = document.getElementById("details-description");

const initialTitle = detailsTitle.textContent;
const initialDescription = detailsDescription.textContent;

let selectedCard = null;

function selectCard(card) {
  detailsTitle.textContent = card.dataset.title;
  detailsDescription.textContent = card.dataset.description;

  if (selectedCard !== null) {
    selectedCard.classList.remove("collection-card--selected");
    selectedCard.setAttribute("aria-pressed", "false");
  }

  card.classList.add("collection-card--selected");
  card.setAttribute("aria-pressed", "true");

  selectedCard = card;

  detailsPanel.classList.remove("details-panel--pulse");
  void detailsPanel.offsetWidth;
  detailsPanel.classList.add("details-panel--pulse");
}

cards.forEach(card => (card.addEventListener("click", () => {
  selectCard(card);
})))



const filterButtons = document.querySelectorAll(".filter-button");
const visibleCount = document.getElementById("visible-count");

const allButton = Array.from(filterButtons).find(
  button => button.dataset.filter === "all"
);

let activeFilterButton = document.querySelector(".filter-button--active");


function clearSelection() {
  selectedCard.classList.remove("collection-card--selected");
  selectedCard.setAttribute("aria-pressed", "false");
  selectedCard = null;

  detailsTitle.textContent = initialTitle;
  detailsDescription.textContent = initialDescription;
}

function applyFilter(filterButton) {
  let visible = 0;

  cards.forEach(card => {
    const isVisible = filterButton === allButton
    || card.dataset.category === filterButton.dataset.filter;

    card.classList.toggle("collection-card--hidden", !isVisible);
    if (isVisible) visible++;
  });

  visibleCount.textContent = visible;


   if (activeFilterButton !== null) {
    activeFilterButton.classList.remove("filter-button--active");
    activeFilterButton.setAttribute("aria-pressed", "false");
  }

  filterButton.classList.add("filter-button--active");
  filterButton.setAttribute("aria-pressed", "true");

  activeFilterButton = filterButton;

  if (selectedCard !== null && 
    selectedCard.classList.contains("collection-card--hidden")) {
      clearSelection();
  }
}

filterButtons.forEach(filterButton => {
  filterButton.addEventListener("click", () => {
    applyFilter(filterButton);
  });
});



const randomButton = document.getElementById("random-button");

function pickRandomCard() {
  const visibleCards = Array.from(cards).filter(card =>
    !card.classList.contains("collection-card--hidden")
  );

  let candidates = visibleCards.filter(card => card !== selectedCard);

  if (candidates.length === 0) {
    candidates = visibleCards;
  }

  const index = Math.floor(Math.random() * candidates.length);

  selectCard(candidates[index]);
}

randomButton.addEventListener("click", pickRandomCard);




const resetButton = document.getElementById("reset-button");

function resetAll() {
  applyFilter(allButton);

  if(selectedCard != null) {
    clearSelection();
  }
}

resetButton.addEventListener("click", resetAll);
