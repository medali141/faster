document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // View project button functionality
    document.querySelectorAll('.view-project-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectTitle = this.closest('.item-overlay').querySelector('h3').textContent;
            alert(`Viewing details for: ${projectTitle}`);
            // You can replace this with a modal or redirect to a project detail page
        });
    });
}); 