async function loadContent() {
    try {
        const response = await fetch('content.json');
        const content = await response.json();
        
        // Insert content based on current page
        const isProcessPage = window.location.pathname.includes('process');
        
        if (isProcessPage) {
            insertProcessContent(content.process);
        } else {
            insertMainContent(content.main);
        }
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

function insertMainContent(content) {
    // Insert hero content
    document.querySelector('.hero-title').textContent = content.hero.title;
    document.querySelector('.hero-description').textContent = content.hero.description;
    
    // Insert about content
    document.querySelector('.about-title').textContent = content.about.title;
    document.querySelector('.about-subtitle').textContent = content.about.author;
    document.querySelector('.about-description-1').textContent = content.about.description1;
    document.querySelector('.about-description-2').textContent = content.about.description2;
    document.querySelector('.about-description-3').textContent = content.about.description3;

    // Insert contributors content
    insertContributorsContent(content.contributors);
}

function insertContributorsContent(content) {
    const container = document.querySelector('.contributors-container');
    if (container && content) {
        container.innerHTML = `
            <h2 class="contributors-title">${content.title}</h2>
            <p class="contributors-subtitle">${content.subtitle}</p>
            <div class="contributors-list">
                ${content.sections.map(section => `
                    <div class="contributor-item">
                        <h3>${section.title}</h3>
                        <p>${section.content}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

function insertProcessContent(content) {
    const sections = Object.entries(content).map(([key, section], index) => ({
        number: String(index + 1).padStart(2, '0'),
        title: section.title,
        description: section.description,
        images: section.images || []
    }));

    const container = document.querySelector('.process-container');
    container.innerHTML = sections.map(section => `
        <section class="process-section">
            <div class="section-header">
                <span class="section-number">${section.number}</span>
                <h2>${section.title}</h2>
            </div>
            <div class="section-content">
                <div class="process-text">
                    <p>${section.description.replace(/\n/g, '<br>')}</p>
                </div>
                ${section.images.length > 0 ? `
                    <div class="image-grid ${section.images.length === 3 ? 'three-image' : ''}">
                        ${section.images.map(img => `
                            <div class="image-container">
                                <img src="${img.src || img}" 
                                     alt="${section.title} - Process Image"
                                     loading="lazy" 
                                     class="process-image">
                                ${img.caption ? `<p class="image-caption">${img.caption}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        </section>
    `).join('');
}

// Add scroll event listener for navbar background
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadContent();
    
    // Add scroll event listener for navbar
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Initial check for navbar
    handleNavbarScroll();
});