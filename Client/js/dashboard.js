const recipes = [
  {
    title: "Masala Dosa",
    category: "veg quick",
    image: "/Public/Dosaimg.jpg",
    link: "/html/dosa.html",
    time: "28 min",
    level: "Medium",
    ingredients: ["rice", "lentils", "potato"],
    mood: "Crispy South Indian brunch",
  },
  {
    title: "Classic Burger",
    category: "quick",
    image: "/Public/burger.jpg",
    link: "/html/Burger.html",
    time: "22 min",
    level: "Easy",
    ingredients: ["bread", "cheese", "vegetables"],
    mood: "Stacked, saucy comfort",
  },
  {
    title: "Butter Chicken",
    category: "nonveg",
    image: "/Public/butter-chicken-png.jpg",
    link: "/html/butterchicken.html",
    time: "45 min",
    level: "Medium",
    ingredients: ["chicken", "butter", "tomato"],
    mood: "Creamy dinner favorite",
  },
  {
    title: "Aloo Paratha",
    category: "veg",
    image: "/Public/Aloo paratha.jpg",
    link: "/html/alooparatha.html",
    time: "35 min",
    level: "Medium",
    ingredients: ["potato", "flour", "spices"],
    mood: "Stuffed and satisfying",
  },
  {
    title: "Biryani",
    category: "nonveg",
    image: "/Public/Biryani.png",
    link: "/html/biryani.html",
    time: "55 min",
    level: "Advanced",
    ingredients: ["rice", "chicken", "spices"],
    mood: "Layered festive rice",
  },
  {
    title: "Ghewar",
    category: "sweet",
    image: "/Public/ghewar.jpg",
    link: "/html/ghewar.html",
    time: "50 min",
    level: "Advanced",
    ingredients: ["flour", "ghee", "sugar"],
    mood: "Royal dessert plate",
  },
  {
    title: "Halwa",
    category: "sweet quick",
    image: "/Public/Halwa.jpg",
    link: "/html/Halwa.html",
    time: "25 min",
    level: "Easy",
    ingredients: ["ghee", "sugar", "nuts"],
    mood: "Warm spoon dessert",
  },
  {
    title: "Garlic Bread",
    category: "veg quick",
    image: "/Public/Garlic-Bread.png",
    link: "/html/garlicbread.html",
    time: "15 min",
    level: "Easy",
    ingredients: ["bread", "butter", "garlic"],
    mood: "Golden side snack",
  },
];

const pantryOptions = ["rice", "bread", "butter", "potato", "chicken", "flour", "ghee", "spices"];

const state = {
  filter: "all",
  query: "",
  selectedPantry: new Set(),
  favorites: JSON.parse(localStorage.getItem("recipebook:favorites") || "[]"),
};

const recipeBoard = document.querySelector("#recipeBoard");
const favoriteList = document.querySelector("#favoriteList");
const favoriteCount = document.querySelector("#favoriteCount");
const mealPlan = document.querySelector("#mealPlan");
const kitchenNotes = document.querySelector("#kitchenNotes");
const pantryBoard = document.querySelector("#pantryBoard");
const pantryResult = document.querySelector("#pantryResult");

function saveFavorites() {
  localStorage.setItem("recipebook:favorites", JSON.stringify(state.favorites));
}

function isFavorite(title) {
  return state.favorites.includes(title);
}

function filteredRecipes() {
  return recipes.filter((recipe) => {
    const matchesFilter = state.filter === "all" || recipe.category.includes(state.filter);
    const searchText = `${recipe.title} ${recipe.category} ${recipe.mood} ${recipe.ingredients.join(" ")}`.toLowerCase();
    return matchesFilter && searchText.includes(state.query.toLowerCase());
  });
}

function renderRecipes() {
  const visibleRecipes = filteredRecipes();

  recipeBoard.innerHTML = visibleRecipes.length
    ? visibleRecipes.map(renderRecipeCard).join("")
    : `
      <div class="empty-state">
        <i class='bx bx-search-alt'></i>
        <h3>No recipes found</h3>
        <p>Try clearing search or switching to another category.</p>
      </div>
    `;

  document.querySelector("#recipeCount").textContent = visibleRecipes.length;
  renderFavorites();
}

function renderRecipeCard(recipe) {
  return `
    <article class="recipe-card">
      <a class="recipe-image-link" href="${recipe.link}" aria-label="Open ${recipe.title}">
        <img src="${recipe.image}" alt="${recipe.title}">
        <span class="recipe-badge">${recipe.time}</span>
      </a>
      <div class="recipe-card-body">
        <div class="recipe-title-row">
          <h3>${recipe.title}</h3>
          <span>${recipe.level}</span>
        </div>
        <p>${recipe.mood}</p>
        <div class="ingredient-row">
          ${recipe.ingredients.slice(0, 3).map((ingredient) => `<small>${ingredient}</small>`).join("")}
        </div>
        <div class="card-actions">
          <a class="primary-btn" href="${recipe.link}"><i class='bx bx-book-open'></i><span>Cook</span></a>
          <button class="icon-btn favorite-toggle" type="button" data-title="${recipe.title}" title="Save recipe">
            <i class='bx ${isFavorite(recipe.title) ? "bxs-heart" : "bx-heart"}'></i>
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderFavorites() {
  state.favorites = state.favorites.filter((title) => recipes.some((item) => item.title === title));
  favoriteCount.textContent = state.favorites.length;

  favoriteList.innerHTML = state.favorites.length
    ? state.favorites
        .map((title) => {
          const recipe = recipes.find((item) => item.title === title);
          return `<a href="${recipe.link}"><span>${recipe.title}</span><strong>${recipe.time}</strong></a>`;
        })
        .join("")
    : "<p class='muted'>Saved recipes will appear here.</p>";
}

function toggleFavorite(title) {
  state.favorites = isFavorite(title)
    ? state.favorites.filter((favorite) => favorite !== title)
    : [...state.favorites, title];
  saveFavorites();
  renderRecipes();
}

function updateFeatured(recipe) {
  document.querySelector("#featuredTitle").textContent = recipe.title;
  document.querySelector("#featuredMeta").textContent = `${recipe.mood}. Ready in ${recipe.time}.`;
  document.querySelector("#featuredImage").src = recipe.image;
  document.querySelector("#featuredImage").alt = recipe.title;
  document.querySelector("#featuredLink").href = recipe.link;
  document.querySelector("#addFeatured").dataset.title = recipe.title;
}

function randomRecipe() {
  return recipes[Math.floor(Math.random() * recipes.length)];
}

function renderMealPlan() {
  const shuffled = [...recipes].sort(() => Math.random() - 0.5).slice(0, 4);
  const slots = ["Breakfast", "Lunch", "Snack", "Dinner"];
  mealPlan.innerHTML = shuffled
    .map(
      (recipe, index) => `
        <li>
          <a href="${recipe.link}">
            <span>${slots[index]}</span>
            <strong>${recipe.title}</strong>
          </a>
        </li>
      `
    )
    .join("");
}

function renderPantry() {
  pantryBoard.innerHTML = pantryOptions
    .map((ingredient) => {
      const active = state.selectedPantry.has(ingredient) ? "active" : "";
      return `<button class="pantry-chip ${active}" type="button" data-ingredient="${ingredient}">${ingredient}</button>`;
    })
    .join("");
  renderPantryResult();
}

function renderPantryResult() {
  const selected = [...state.selectedPantry];
  if (!selected.length) {
    pantryResult.innerHTML = "<p class='muted'>Pick ingredients to get a smart suggestion.</p>";
    return;
  }

  const scored = recipes
    .map((recipe) => ({
      recipe,
      score: recipe.ingredients.filter((ingredient) => state.selectedPantry.has(ingredient)).length,
    }))
    .sort((a, b) => b.score - a.score);

  const best = scored[0];
  pantryResult.innerHTML = best.score
    ? `<a href="${best.recipe.link}"><i class='bx bx-bulb'></i><span>Best match: ${best.recipe.title}</span></a>`
    : "<p class='muted'>No exact match yet. Try adding rice, bread, or butter.</p>";
}

document.querySelector("#recipeSearch").addEventListener("input", (event) => {
  state.query = event.target.value;
  renderRecipes();
});

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    button.classList.add("active");
    state.filter = button.dataset.filter;
    renderRecipes();
  });
});

recipeBoard.addEventListener("click", (event) => {
  const button = event.target.closest(".favorite-toggle");
  if (button) toggleFavorite(button.dataset.title);
});

pantryBoard.addEventListener("click", (event) => {
  const button = event.target.closest(".pantry-chip");
  if (!button) return;

  const ingredient = button.dataset.ingredient;
  if (state.selectedPantry.has(ingredient)) {
    state.selectedPantry.delete(ingredient);
  } else {
    state.selectedPantry.add(ingredient);
  }
  renderPantry();
});

document.querySelector("#surpriseRecipe").addEventListener("click", () => updateFeatured(randomRecipe()));
document.querySelector("#shufflePlan").addEventListener("click", renderMealPlan);
document.querySelector("#clearSearch").addEventListener("click", () => {
  document.querySelector("#recipeSearch").value = "";
  state.query = "";
  state.filter = "all";
  document.querySelector(".filter.active").classList.remove("active");
  document.querySelector('[data-filter="all"]').classList.add("active");
  renderRecipes();
});
document.querySelector("#addFeatured").addEventListener("click", (event) => {
  toggleFavorite(event.currentTarget.dataset.title || "Masala Dosa");
});

document.querySelector("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  document.querySelector("#themeToggle i").className = `bx ${isDark ? "bx-sun" : "bx-moon"}`;
  localStorage.setItem("recipebook:theme", isDark ? "dark" : "light");
});

kitchenNotes.value = localStorage.getItem("recipebook:notes") || "";
kitchenNotes.addEventListener("input", () => localStorage.setItem("recipebook:notes", kitchenNotes.value));

if (localStorage.getItem("recipebook:theme") === "dark") {
  document.body.classList.add("dark");
  document.querySelector("#themeToggle i").className = "bx bx-sun";
}

updateFeatured(recipes[0]);
renderMealPlan();
renderPantry();
renderRecipes();
