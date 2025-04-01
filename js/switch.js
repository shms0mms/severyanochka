export const initializeSwitch = () => {
	const switches = document.querySelectorAll("[data-switch]");
	if (switches.length !== 0) {
		switches.forEach((switchEl) => {
			const switchInput = switchEl.querySelector("[data-switch-input] input");
			const switchIcon = switchEl.querySelector("[data-switch-icon]");
			if (switchInput.checked) {
				switchIcon.classList.add("active");
			}
			switchEl.addEventListener("click", (e) => {
				let target = e.target;
				if (switchIcon !== undefined && target.closest("[data-switch-icon]")) {
					if (!switchInput.hasAttribute("checked")) {
						switchInput.setAttribute("checked", "true");
					} else {
						switchInput.removeAttribute("checked");
					}

					switchIcon.classList.toggle("active");
				}
			});
		});
	}
};
