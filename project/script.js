"use strict";

// ДЗ 3. Интерактивная коллекция.
// Выполняйте практические этапы из docs/HOME_WORK.md по порядку.
// Не пытайтесь написать весь файл за один раз: после каждого этапа проверяйте
// связанный сценарий в браузере и фиксируйте рабочее состояние коммитом.

// Этап 3. Найдите карточки и элементы панели подробностей.
// Реализуйте одну общую функцию выбора карточки.

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

let activeFilterButton = document.querySelector(".filter-button--active");

function applyFilter(filterButton) {
  let visible = 0;

  cards.forEach(card => {
    const isVisible = filterButton.dataset.filter === "all" 
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

    selectedCard.classList.remove("collection-card--selected");
    selectedCard.setAttribute("aria-pressed", "false");
    selectedCard = null;
    detailsTitle.textContent = initialTitle;
    detailsDescription.textContent = initialDescription;
  }
}

filterButtons.forEach(filterButton => {
  filterButton.addEventListener("click", () => {
    applyFilter(filterButton);
  });
});

// Этап 4. Найдите кнопки фильтров.
// Показывайте подходящие карточки, обновляйте активную кнопку и счетчик.
// Учтите случай, когда новый фильтр скрывает выбранную карточку.

// Этап 5. Реализуйте случайный выбор среди видимых карточек.
// Затем реализуйте полный сброс интерфейса.

// Этап 6. Запускайте подготовленную CSS-анимацию через класс.
// Не дублируйте оформление в script.js.
