const input = document.querySelector('input');

const button = document.querySelector('button');

button.addEventListener('click', function() {
    input.value = Math.random().toString(36).substring(2,10);
});



