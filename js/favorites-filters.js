console.log(rangeSlider);

const rangeSliderElement = rangeSlider(
	document.querySelector("#filters-range")
);

// Функция, которая добавляет параметр в строку поиска

const updateURL = (key, value) => {
	const params = new URLSearchParams(window.location.search);

	if (value) {
		params.set(key, value);
	} else {
		params.delete(key);
	}

	history.pushState({}, "", `${window.location.pathname}?${params.toString()}`);
};

// функция получения фильтров при обновлении страницы и последующем заполнении этих фильтров в наши поля формы
function initFilters() {
	const checkbox = document.querySelector("input[name=stock]");
	const priceFrom = document.getElementById("filters-min-price-input");
	const priceTo = document.getElementById("filters-max-price-input");
	const switchIcon = document.querySelector(".switch__icon");
	const urlSearchParams = new URLSearchParams(window.location.search);
	urlSearchParams.forEach((value, key) => {
		switch (key) {
			case "price_from": {
				priceFrom.value = value;
				break;
			}
			case "price_to": {
				priceTo.value = value;
				break;
			}
		}
	});

	const stock = urlSearchParams.get("stock");

	if (stock) {
		checkbox.setAttribute("checked", "true");
		switchIcon.classList.add("active");
	} else {
		checkbox.removeAttribute("checked");
		switchIcon.classList.remove("active");
	}
}
initFilters();

// функция сохранения фильтров в строку поиска (query params)
function savingFilters() {
	const filtersForm = document.querySelectorAll(".filters-form__filter");
	const switchBlock = document.querySelector("[data-switch]");
	const checkbox = switchBlock.querySelector("input[name=stock]");

	const priceFrom = document.getElementById("filters-min-price-input");
	const priceTo = document.getElementById("filters-max-price-input");

	filtersForm.forEach((filter) => {
		filter.addEventListener("click", () => {
			const filterValue = filter.innerText;
			updateURL("filter", filterValue);
		});
	});

	switchBlock.addEventListener("click", function () {
		if (checkbox.getAttribute("checked") === "true") {
			updateURL("stock", "on");
		} else {
			updateURL("stock", "");
		}
	});

	priceFrom.addEventListener("input", () => {
		const value = priceFrom.value;
		updateURL("price_from", value);
	});
	priceTo.addEventListener("input", () => {
		const value = priceTo.value;
		updateURL("price_to", value);
	});
}

savingFilters();
