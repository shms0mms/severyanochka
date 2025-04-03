import { initializeRange } from "./range.js"

// Функция, которая добавляет параметр в строку поиска

const updateURL = (key, value) => {
  const params = new URLSearchParams(window.location.search)

  if (value) {
    params.set(key, value)
  } else {
    params.delete(key)
  }

  history.pushState({}, "", `${window.location.pathname}?${params.toString()}`)
}

// функция получения фильтров при обновлении страницы и последующем заполнении этих фильтров в наши поля формы
function initFilters() {
  const checkbox = document.querySelector("input[name=stock]")
  const switchIcon = document.querySelector(".switch__icon")
  const priceFrom = document.querySelector(".favorites-form__price-from")
  const priceTo = document.querySelector(".favorites-form__price-to")

  const urlSearchParams = new URLSearchParams(window.location.search)
  urlSearchParams.forEach((value, key) => {
    switch (key) {
      case "price_from": {
        priceFrom.value = value
        break
      }
      case "price_to": {
        priceTo.value = value
        break
      }
    }

    initializeRange()
  })

  const stockDefault = urlSearchParams.get("stock")

  if (stockDefault) {
    checkbox.setAttribute("checked", "true")
    switchIcon.classList.add("active")
  } else {
    checkbox.removeAttribute("checked")
    switchIcon.classList.remove("active")
  }
}
initFilters()

// функция сохранения фильтров в строку поиска (query params)
function savingFilters() {
  const filtersForm = document.querySelectorAll(".filters-form__filter")
  const switchBlock = document.querySelector("[data-switch]")
  const checkbox = switchBlock.querySelector("input[name=stock]")

  const rangeFrom = document.querySelector(".favorites-form__price-from")
  const rangeTo = document.querySelector(".favorites-form__price-to")

  filtersForm.forEach(filter => {
    filter.addEventListener("click", () => {
      const filterValue = filter.innerText
      updateURL("filter", filterValue)
    })
  })

  switchBlock.addEventListener("click", function () {
    if (checkbox.getAttribute("checked") === "true") {
      updateURL("stock", "on")
    } else {
      updateURL("stock", "")
    }
  })

  rangeFrom.addEventListener("input", () => {
    const value = priceFrom.value
    updateURL("price_from", value)
  })
  rangeTo.addEventListener("input", () => {
    const value = priceTo.value
    updateURL("price_to", value)
  })
}

savingFilters()
