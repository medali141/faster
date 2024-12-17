document.addEventListener('DOMContentLoaded', function() {
    const partsSelection = document.getElementById('partsSelection');
    const configurator = document.getElementById('configurator');
    const optionsContent = document.querySelector('.options-content');

    // Define the parts data
    const partsData = {
        engine: {
            stock: { name: "Stock Engine", price: 0 },
            stage1: { name: "Stage 1 Tune", price: 2500 }, // ~2500 TND
            stage2: { name: "Stage 2 Tune", price: 4800 }, // ~4800 TND
            stage3: { name: "Stage 3 Tune", price: 7900 }  // ~7900 TND
        },
        suspension: {
            stock: { name: "Stock Suspension", price: 0 },
            sport: { name: "Sport Suspension", price: 3200 },    // ~3200 TND
            performance: { name: "Performance Coilovers", price: 5500 }, // ~5500 TND
            air: { name: "Air Suspension", price: 12000 }        // ~12000 TND
        },
        brakes: {
            stock: { name: "Stock Brakes", price: 0 },
            sport: { name: "Sport Brakes", price: 2800 },      // ~2800 TND
            performance: { name: "Performance Brakes", price: 4500 }, // ~4500 TND
            racing: { name: "Racing Brakes", price: 7500 }     // ~7500 TND
        },
        bodykit: {
            stock: { name: "Stock Body", price: 0 },
            sport: { name: "Sport Body Kit", price: 4200 },    // ~4200 TND
            wide: { name: "Wide Body Kit", price: 8500 },      // ~8500 TND
            custom: { name: "Custom Body Kit", price: 15000 }  // ~15000 TND
        }
    };

    // Add click handlers to customize buttons
    document.querySelectorAll('.customize-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const partCard = this.closest('.part-card');
            const partType = partCard.dataset.part;
            console.log('Clicked customize for:', partType);
            showCustomizeOptions(partType);
        });
    });

    function showCustomizeOptions(partType) {
        const partData = partsData[partType];
        if (!partData) {
            console.log('No data found for part type:', partType);
            return;
        }

        partsSelection.style.display = 'none';
        configurator.style.display = 'flex';

        // Clear previous content
        optionsContent.innerHTML = '';

        // Add back button
        const backButton = document.createElement('button');
        backButton.className = 'back-btn';
        backButton.textContent = '← Back to Categories';
        backButton.onclick = () => {
            configurator.style.display = 'none';
            partsSelection.style.display = 'block';
        };
        optionsContent.appendChild(backButton);

        // Add title
        const categoryTitle = document.createElement('h2');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = partData.title;
        optionsContent.appendChild(categoryTitle);

        // Add options
        partData.options.forEach(option => {
            const optionCard = document.createElement('div');
            optionCard.className = 'option-card';
            
            optionCard.innerHTML = `
                <div class="option-image">
                    <img src="${option.image}" alt="${option.name}">
                </div>
                <div class="option-info">
                    <h3>${option.name}</h3>
                    <p class="price">$${option.price.toLocaleString()}</p>
                    <p class="description">${option.description}</p>
                    <ul class="specs">
                        ${option.specs.map(spec => `<li>${spec}</li>`).join('')}
                    </ul>
                    <button class="select-option-btn">Select This Option</button>
                </div>
            `;

            // Add click handler for the select button
            const selectBtn = optionCard.querySelector('.select-option-btn');
            selectBtn.addEventListener('click', () => {
                // Remove active class from all cards
                document.querySelectorAll('.option-card').forEach(card => {
                    card.classList.remove('active');
                });
                // Add active class to selected card
                optionCard.classList.add('active');
                
                // Update total price
                document.getElementById('total-price').textContent = option.price.toLocaleString();
            });

            optionsContent.appendChild(optionCard);
        });
    }

    // Update the price display function to show TND
    function updateTotalPrice() {
        let total = 0;
        for (const part in selectedParts) {
            total += partsData[part][selectedParts[part]].price;
        }
        document.getElementById('total-price').textContent = `${total.toLocaleString()} TND`;
        if (document.getElementById('checkoutTotal')) {
            document.getElementById('checkoutTotal').textContent = `${total.toLocaleString()} TND`;
        }
    }

    // Update the order details display
    function updateOrderDetails() {
        const orderDetails = document.getElementById('orderDetails');
        if (!orderDetails) return;

        let html = '';
        for (const part in selectedParts) {
            const selection = partsData[part][selectedParts[part]];
            html += `
                <div class="order-item">
                    <span>${selection.name}</span>
                    <span>${selection.price.toLocaleString()} TND</span>
                </div>
            `;
        }
        orderDetails.innerHTML = html;
    }
});
