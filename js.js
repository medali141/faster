document.addEventListener('DOMContentLoaded', function() {
    const partsSelection = document.getElementById('partsSelection');
    const configurator = document.getElementById('configurator');
    const optionsContent = document.querySelector('.options-content');

    // Define the parts data
    const partsData = {
        engine: {
            title: "Engine Tuning Options",
            options: [
                {
                    name: "Stage 1 ECU Tune",
                    price: 599,
                    image: "https://images.unsplash.com/photo-1591439657848-9f4b9ce436b9",
                    description: "Basic ECU remapping for better performance",
                    specs: [
                        "Power: +30 HP",
                        "Torque: +40 Nm",
                        "Improved throttle response",
                        "Better fuel efficiency"
                    ]
                },
                {
                    name: "Stage 2 Performance Pack",
                    price: 1499,
                    image: "https://images.unsplash.com/photo-1537149622514-f0f71bdc038e",
                    description: "Advanced tuning with hardware upgrades",
                    specs: [
                        "Power: +50 HP",
                        "Torque: +70 Nm",
                        "High-flow air intake",
                        "Performance exhaust system"
                    ]
                }
            ]
        },
        brakes: {
            title: "Brake System Options",
            options: [
                {
                    name: "Sport Brake Package",
                    price: 899,
                    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180",
                    description: "Enhanced braking performance for street use",
                    specs: [
                        "High-performance brake pads",
                        "Stainless steel brake lines",
                        "Performance brake fluid",
                        "Slotted rotors"
                    ]
                },
                {
                    name: "Big Brake Kit",
                    price: 2499,
                    image: "https://images.unsplash.com/photo-1588193900307-4a426f29d8ba",
                    description: "Professional grade brake system upgrade",
                    specs: [
                        "6-piston calipers",
                        "380mm rotors",
                        "Braided brake lines",
                        "Racing brake pads"
                    ]
                }
            ]
        },
        bodykit: {
            title: "Body Kit Options",
            options: [
                {
                    name: "Sport Style Kit",
                    price: 1899,
                    image: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9",
                    description: "Enhanced sporty appearance",
                    specs: [
                        "Front lip spoiler",
                        "Side skirts",
                        "Rear diffuser",
                        "Trunk spoiler"
                    ]
                },
                {
                    name: "Wide Body Kit",
                    price: 3499,
                    image: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9",
                    description: "Complete body transformation",
                    specs: [
                        "Wide fenders",
                        "Custom bumpers",
                        "Side skirts",
                        "Rear wing"
                    ]
                }
            ]
        },
        suspension: {
            title: "Suspension Options",
            options: [
                {
                    name: "Lowering Springs",
                    price: 799,
                    image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333",
                    description: "Lower your ride height and improve handling",
                    specs: [
                        "30-40mm drop",
                        "Progressive spring rate",
                        "Improved cornering",
                        "OEM-quality materials"
                    ]
                },
                {
                    name: "Coilover Kit",
                    price: 2199,
                    image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333",
                    description: "Full adjustable suspension system",
                    specs: [
                        "Height adjustable",
                        "32-way damping",
                        "Camber adjustable",
                        "Track-ready setup"
                    ]
                }
            ]
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
});
