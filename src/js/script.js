document.addEventListener("DOMContentLoaded", function() {
    // FORM VALIDATION
    const form = document.getElementById('form');  
    const submitButton = document.getElementById('submit-button');  
    const fields = form.querySelectorAll('.field');  

    const removeValidation = function () {
        const errors = form.querySelectorAll('.error-message');
        form.querySelectorAll('.error').forEach(item => {
            item.classList.remove('error');
        })
        errors.forEach(error => error.remove());
    }

    const addLoader = (parentNode) => {
        parentNode.textContent = '';
        const img = document.createElement('img');
        submitButton.disabled = true;
        img.src = 'dist/assets/loader.svg';
        parentNode.appendChild(img);

        form.querySelector('.fields-wrapper').classList.add('disabled');
    }

    const removeLoader = (parentNode) => {
        parentNode.textContent = 'Send';
        submitButton.disabled = false;
        form.querySelector('.fields-wrapper').classList.remove('disabled');
    }

    const resetForm = () => fields.forEach(item  => item.dataset.default ?  item.value = item.dataset.default : item.value = '');
    
    const addSuccessNode = () => {
        const successNode = document.getElementById('success-container');
        const successButton =  document.getElementById('success-button');
        const removeSuccessNode = () => { 
            successNode.classList.add('hidden');
            successButton.removeEventListener('click', removeSuccessNode);
        }
        successNode.classList.remove('hidden');
        successButton.addEventListener('click', removeSuccessNode);
    }

    const validateForm = function(e) {
        e.preventDefault();
        addLoader(submitButton);

        setTimeout(function() {
            removeValidation();
            let valid = true;
            removeLoader(submitButton);
            fields.forEach((item ) => {
                if(item.value.trim() === '') {
                    valid = false;
                    const errorMessage = document.createElement('div');
                            errorMessage.textContent = 'Fill in the field';
                            errorMessage.classList.add('error-message');
                            item.parentElement.appendChild(errorMessage);
                            item.classList.add('error');
                } 
            });       

            if(valid) {
                addSuccessNode();
                resetForm();
                // form.submit();
            } else {
                return false;
            } 
        }, 2000);
    }

    form.addEventListener('submit', (e) => validateForm(e));

    // CUSTOM SELECT
    const selectField = document.getElementById('custom-select');
    const selectOptions = form.querySelectorAll('.custom-option');
    let selectedValue = document.getElementById('selected-value');

    document.addEventListener('click', function(e) {  
        if(e.target.closest('.custom-select') !== null) {
            selectField.classList.toggle('open'); 
            selectOptions.forEach(option => {
                option.addEventListener('click', () => {
                    selectedValue.textContent = option.dataset.value;
                    document.getElementById('subject').value = option.dataset.value;
                });
            }); 
        } else {
            selectField.classList.remove('open'); 
        }
    });

    // MAP
    const map = L.map('map-id', {
        center: [37.772137, -122.403360],
        zoom: 35,
        zoomControl:false 
    });

    let filter = [
        'grayscale: 100%'
    ];
    
   L.tileLayer.colorFilter('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
        attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
        filter: filter,
    }).addTo(map);

    const markerIcon = L.icon({
        iconUrl: './dist/assets/marker.svg',
        iconSize:     [32, 46],
        iconAnchor:   [22, 94],
    });

    const marker = L.marker([37.772274, -122.405037], { icon: markerIcon }).addTo(map);
});
