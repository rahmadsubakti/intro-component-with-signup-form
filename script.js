const form = document.querySelector('form');
const inputContainers = document.getElementsByClassName('input-container');
const inputs = document.getElementsByTagName('input');
const emailInput = document.getElementById('email');
const errors = document.getElementsByClassName('error');
const messages = document.getElementsByClassName('error-message');

let pattern = /(\w+)@(\w+)\.(\w+)/g;

function clearEmptyInputError(e) {
	/**Clear inputs if is not empty anymore.*/
	let i = [...inputs].indexOf(e.target);
	inputContainers[i].style.border = '1px solid var(--grayish-blue)';
	errors[i].style.display = 'none';
	messages[i].style.display = 'none';
}

function clearEmailError(e) {
	if (pattern.test(e.target.value)) {
		let i = [...inputs].indexOf(e.target);
		inputContainers[i].style.border = '1px solid var(--grayish-blue)';
		errors[i].style.display = 'none';
		messages[i].styleo.display = 'none';
	}
}

for (let i = 0; i < inputs.length; i++) {
	inputs[i].addEventListener('input', clearEmptyInputError);
}

emailInput.addEventListener('input', () => {
	clearEmptyInputError();
	clearEmailError();
});

function submitted(e) {
	for (let i = 0; i < inputs.length; i++) {
		if (inputs[i].value == "") {
			inputContainers[i].style.border = '1px solid red';
			errors[i].style.display = 'flex';
			let message = inputs[i].id.split('_')
				.map(val =>
						val[0].toUpperCase() + val.slice(1,))
				.join(" ")
			messages[i].style.display = 'block';
			messages[i].innerHTML = message + " cannot be empty";
		}
	}

	if (!pattern.test(emailInput.value) && emailInput.value !== "") {
		let index = [...inputs].indexOf(emailInput);
		inputContainers[index].style.border = '1px solid red';
		errors[index].style.display = 'flex';
		messages[index].style.display = 'block';
		messages[index].innerHTML = "Looks like this is not an email";
	}

	e.preventDefault()
}

form.addEventListener('submit', submitted);