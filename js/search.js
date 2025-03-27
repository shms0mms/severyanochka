const searchField = document.querySelector(".search__field");
const form = document.querySelector(".search");
const searchList = document.querySelector(".search__list");

// Пример продуктов для умного поиска
const products = [
	"Молоко",
	"Молочный коктейль",
	"Молочный улун",
	"Колбаса с молоком",
	"Колбаса",
	"Сыр",
	"Хлеб",
	"Творог",
	"Макароны",
	"Куриная грудка",
];

// Сохранение текущего значения поля ввода в URL
const updateURL = (searchTerm) => {
	const params = new URLSearchParams(window.location.search);

	if (searchTerm) {
		params.set("search", searchTerm);
	} else {
		params.delete("search");
	}

	history.pushState({}, "", `${window.location.pathname}?${params.toString()}`);
};

// Функция умного поиска
const handleSearch = () => {
	const searchTerm = searchField.value.trim();
	updateURL(searchTerm);

	const searchResult = products.filter(
		(product) =>
			searchTerm !== "" &&
			product.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const regex = new RegExp(`(${searchTerm})`, "gi");

	if (searchResult.length) {
		form.classList.add("active");
		searchList.innerHTML = "";

		searchResult.filter((item) => {
			const highlightedItem = item.replace(
				regex,
				`<span class="highlight">$1</span>`
			);

			searchList.insertAdjacentHTML(
				"beforeend",
				`<li  class="search__item">${highlightedItem}</li>`
			);
		});
	} else {
		form.classList.remove("active");
	}
};

// Для записи значения в поле ввода поиска при клике на элемент списка найденных элементов из умного поиска
document.addEventListener("click", (event) => {
	if (event.target.closest(".search__item")) {
		searchField.value = event.target.innerText;
		form.classList.remove("active");
	}
});

// Для записи в поле ввода сохранённое значение из URL
window.addEventListener("DOMContentLoaded", () => {
	const params = new URLSearchParams(window.location.search);
	const searchTerm = params.get("search");

	if (searchTerm) {
		searchField.value = searchTerm;
		handleSearch();
	}
});

// При вводе в поле ввода поиска будет вызываться функция handleSearch
searchField.addEventListener("input", handleSearch);
