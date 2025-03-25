document
	.getElementById('contact-form')
	.addEventListener('submit', function (event) {
		const name = document.getElementById('name').value;
		const email = document.getElementById('email').value;
		const message = document.getElementById('message').value;

		if (!name || !email || !message) {
			alert('Все поля должны быть заполнены!');
			event.preventDefault(); // Предотвращает отправку формы
		} else if (!validateEmail(email)) {
			alert('Введите корректный адрес электронной почты!');
			event.preventDefault(); // Предотвращает отправку формы
		}
	});

function validateEmail(email) {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(email);
}
