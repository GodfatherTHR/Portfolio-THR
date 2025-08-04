// script.js

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Load JSON data and display it dynamically
    loadPortfolioData();
    
    // Initialize smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Initialize header scroll effect
    initHeaderScrollEffect();
    
    // Initialize animations on scroll
    initScrollAnimations();
});

// Function to load data from JSON file
async function loadPortfolioData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        // Display skills
        displaySkills(data.skills);
        
        // Display projects
        displayProjects(data.projects);
        
    } catch (error) {
        console.error('Error loading JSON data:', error);
        
        // Fallback data if JSON fails to load
        displayFallbackData();
    }
}

// Function to display skills
function displaySkills(skills) {
    const skillsContainer = document.getElementById('skills-container');
    skillsContainer.innerHTML = '';
    
    skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill-item';
        skillElement.innerHTML = `
            <h3>${skill.name}</h3>
            <p>${skill.description}</p>
        `;
        
        skillsContainer.appendChild(skillElement);
    });
}

// Function to display projects
function displayProjects(projects) {
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = '';
    
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project-item';
        
        // Create technologies tags
        const techTags = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        projectElement.innerHTML = `
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="technologies">
                    ${techTags}
                </div>
                <a href="${project.link}" target="_blank" class="project-link">View Project</a>
            </div>
        `;
        
        projectsContainer.appendChild(projectElement);
    });
}

// Fallback data function
function displayFallbackData() {
    const fallbackData = {
        skills: [
            {
                name: "Next.js",
                description: "React framework for production-ready applications"
            },
            {
                name: "React",
                description: "JavaScript library for building user interfaces"
            },
            {
                name: "Node.js",
                description: "JavaScript runtime for server-side development"
            },
            {
                name: "Supabase",
                description: "Open source Firebase alternative"
            }
        ],
        projects: [
            {
                title: "Shariful Haque Portfolio",
                description: "A full-stack portfolio website built with Next.js and Supabase",
                technologies: ["Next.js", "React", "Supabase", "Tailwind CSS"],
                link: "https://www.sharifulhaque.org/"
            },
            {
                title: "E-commerce Platform",
                description: "A full-stack e-commerce solution built with Next.js and Supabase",
                technologies: ["Next.js", "React", "Supabase", "Tailwind CSS"],
                link: "https://www.nazninmart.shop/"
            }
        ]
    };
    
    displaySkills(fallbackData.skills);
    displayProjects(fallbackData.projects);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effect
function initHeaderScrollEffect() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add transition to header
    header.style.transition = 'transform 0.3s ease-in-out';
}

// Animations on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Add scroll event listener for active nav link
window.addEventListener('scroll', updateActiveNavLink);

// Function to update profile image (can be called from console or other scripts)
function updateProfileImage(imageUrl) {
    const profileImage = document.getElementById('profile-image');
    if (profileImage && imageUrl) {
        profileImage.src = imageUrl;
        profileImage.alt = "Toriqul Haque Rahat";
    }
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }
    
    // Add hover effect to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
