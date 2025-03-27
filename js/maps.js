const REMOVE_MAP_CONTROLS = [
  "geolocationControl",
  "rulerControl",
  "fullscreenControl",
  "typeSelector",
  "trafficControl",
  "routeButton",
  "searchControl",
  "zoomControl",
]

async function initMap() {
	const maps = document.querySelectorAll(".maps__map[data-tab-content]");

	function initMaps() {
		maps.forEach((map) => {
			const myMap = new ymaps.Map(map.id, {
				center: [61.66854376888902, 50.836547597778186],
				zoom: 14,
				zoomRange: { min: 12, max: 16 },
				behaviors: ["drag", "pinchZoom", "mouseTilt"],
				balloonDesc: `Республика Коми, ${map.getAttribute("data-tab-content")}`,
			});

<<<<<<< HEAD
      // Remove all unnecessary map controls
      REMOVE_MAP_CONTROLS.map(control => myMap.controls.remove(control))
    })
  }
  ymaps.ready(initMaps)
}

initMap()

// /product.html?product=Колбаса
=======
			myMap.controls.remove("geolocationControl");
			myMap.controls.remove("rulerControl");
			myMap.controls.remove("fullscreenControl");
			myMap.controls.remove("typeSelector");
			myMap.controls.remove("trafficControl");
			myMap.controls.remove("routeButton");
			myMap.controls.remove("searchControl");
			myMap.controls.remove("zoomControl");
		});
	}
	ymaps.ready(initMaps);
}

initMap();
>>>>>>> 0c73f534e4393f043aa9ebebc2caffde2c91a50a
