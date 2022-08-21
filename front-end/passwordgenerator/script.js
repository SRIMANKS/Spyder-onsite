const input = document.querySelector('input');
const option = document.querySelector('#option');
const button = document.querySelector('button');
const length = document.querySelector('#length');
button.addEventListener('click', function() {
    console.log(option.value);
    if(option.value==="lc"){
        input.value = Math.random().toString(36).substring(2,length.value+2).toLowerCase();
    }
    else if(option.value==="uc"){
        input.value = Math.random().toString(36).substring(2,length.value+2).toUpperCase();
    }
    else if(option.value==="n"){
        input.value = Math.random().toString(9).substring(2,length.value+2);
    }
    else if(option.value==="s"){
        input.value = Math.random().toString(36).substring(2,length.value+2);
    }
});



