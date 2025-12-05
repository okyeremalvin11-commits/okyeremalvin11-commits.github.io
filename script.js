// ====== WEBSITE DATA ======
const websiteData = {
    siteName: "DigitalLifeHub",
    visitorCount: 0,
    articlesRead: 0,
    adViews: { ad1: 0, ad2: 0, ad3: 0 },
    subscribers: [],
    
    // Sample articles data
    articles: [
        {
            id: 1,
            category: "food",
            title: "5-Minute Breakfast Recipes for Programmers",
            excerpt: "Quick, healthy breakfast ideas you can make between coding sessions. Perfect for busy developers!",
            image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            readTime: "3 min",
            date: "2024-03-15"
        },
        {
            id: 2,
            category: "tech",
            title: "Build Your First Website in 1 Hour",
            excerpt: "Step-by-step HTML/CSS tutorial for complete beginners. No coding experience required!",
            image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            readTime: "7 min",
            date: "2024-03-14"
        },
        {
            id: 3,
            category: "gaming",
            title: "Best Gaming Setup Under $500",
            excerpt: "Create the ultimate gaming station without breaking the bank. Budget-friendly gear recommendations.",
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            readTime: "5 min",
            date: "2024-03-13"
        },
        {
            id: 4,
            category: "food",
            title: "Gamer Fuel: Energy-Boosting Snacks",
            excerpt: "Healthy snacks that keep you energized during long gaming sessions. No sugar crashes!",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            readTime: "4 min",
            date: "2024-03-12"
        },
        {
            id: 5,
            category: "tech",
            title: "How to Protect Your Gaming Accounts",
            excerpt: "Essential security tips to keep your gaming profiles safe from hackers and phishing attacks.",
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            readTime: "6 min",
            date: "2024-03-11"
        },
        {
            id: 6,
            category: "gaming",
            title: "Mobile Games That Pay Real Money",
            excerpt: "Legit mobile games that actually let you earn cash and gift cards. No scams, real methods.",
            image: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            readTime: "8 min",
            date: "2024-03-10"
        }
    ],
    
    // Trending content
    trending: [
        { id: 1, title: "AI Tools for Content Creation", category: "tech", readTime: "5 min" },
        { id: 2, title: "Protein Pancakes for Gamers", category: "food", readTime: "3 min" },
        { id: 3, title: "Best Gaming Mouse 2024", category: "gaming", readTime: "7 min" },
        { id: 4, title: "Python Automation Tutorial", category: "tech", readTime: "10 min" },
        { id: 5, title: "Healthy Meal Prep Guide", category: "food", readTime: "6 min" }
    ],
    
    // Category colors and icons
    categories: {
        food: { color: "#e53e3e", name: "Food", icon: "fa-utensils" },
        tech: { color: "#3182ce", name: "Tech", icon: "fa-laptop-code" },
        gaming: { color: "#805ad5", name: "Gaming", icon: "fa-gamepad" }
    }
};

// ====== DOM ELEMENTS ======
let DOM = {};

// ====== UTILITY FUNCTIONS ======
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateLocalStorage() {
    localStorage.setItem('digitalLifeHubData', JSON.stringify(websiteData));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('digitalLifeHubData');
    if (saved) {
        const parsed = JSON.parse(saved);
        websiteData.visitorCount = parsed.visitorCount || 0;
        websiteData.articlesRead = parsed.articlesRead || 0;
        websiteData.adViews = parsed.adViews || { ad1: 0, ad2: 0, ad3: 0 };
        websiteData.subscribers = parsed.subscribers || [];
    }
}

// ====== PAGE INITIALIZATION ======
function initPage() {
    // Track page load time
    const startTime = performance.now();
    
    // Cache DOM elements
    cacheDOMElements();
    
    // Load saved data
    loadFromLocalStorage();
    
    // Update visitor count
    websiteData.visitorCount++;
    updateLocalStorage();
    
    // Initialize components
    renderArticles();
    renderTrending();
    updateStats();
    setupEventListeners();
    simulateAdViews();
    
    // Calculate and display load time
    const loadTime = performance.now() - startTime;
    document.getElementById('load-time').textContent = (loadTime / 1000).toFixed(2);
    
    console.log(`${websiteData.siteName} loaded successfully!`);
}

// ====== CACHE DOM ELEMENTS ======
function cacheDOMElements() {
    DOM = {
        articlesContainer: document.getElementById('articles-container'),
        trendingList: document.getElementById('trending-list'),
        loadMoreBtn: document.getElementById('load-more'),
        loadingIndicator: document.getElementById('loading'),
        subscribeBtn: document.getElementById('subscribe-btn'),
        newsletterEmail: document.getElementById('newsletter-email'),
        subscribeMessage: document.getElementById('subscribe-message'),
        mobileMenuBtn: document.querySelector('.mobile-menu-btn'),
        mobileMenu: document.querySelector('.mobile-menu'),
        totalVisitors: document.getElementById('total-visitors'),
        onlineNow: document.getElementById('online-now'),
        articlesRead: document.getElementById('articles-read'),
        recipeCount: document.getElementById('recipe-count'),
        tutorialCount: document.getElementById('tutorial-count'),
        guideCount: document.getElementById('guide-count'),
        totalContent: document.getElementById('total-content'),
        adViews: {
            ad1: document.getElementById('ad1-views'),
            ad2: document.getElementById('ad2-views'),
            ad3: document.getElementById('ad3-views')
        }
    };
}

// ====== RENDER ARTICLES ======
function renderArticles() {
    if (!DOM.articlesContainer) return;
    
    DOM.articlesContainer.innerHTML = '';
    
    websiteData.articles.forEach(article => {
        const category = websiteData.categories[article.category];
        const articleHTML = `
            <article class="article-card article-${article.category}" data-id="${article.id}">
                <div class="article-image" style="background-image: url('${article.image}')"></div>
                <div class="article-content">
                    <span class="article-category category-${article.category}">
                        <i class="fas ${category.icon}"></i> ${category.name}
                    </span>
                    <h3 class="article-title">${article.title}</h3>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-meta" style="display: flex; justify-content: space-between; margin-top: 15px; font-size: 12px; color: var(--gray);">
                        <span><i class="far fa-clock"></i> ${article.readTime} read</span>
                        <span><i class="far fa-calendar"></i> ${article.date}</span>
                    </div>
                    <a href="#" class="read-more" data-id="${article.id}">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `;
        
        DOM.articlesContainer.innerHTML += articleHTML;
    });
    
    // Add click events to articles
    document.querySelectorAll('.article-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('read-more')) {
                const id = this.getAttribute('data-id');
                readArticle(id);
            }
        });
    });
    
    // Add click events to read more buttons
    document.querySelectorAll('.read-more').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const id = this.getAttribute('data-id');
            readArticle(id);
        });
    });
}

// ====== RENDER TRENDING ======
function renderTrending() {
    if (!DOM.trendingList) return;
    
    DOM.trendingList.innerHTML = '';
    
    websiteData.trending.forEach((item, index) => {
        const category = websiteData.categories[item.category];
        const trendingHTML = `
            <div class="trending-item" data-id="${item.id}">
                <div class="trending-number">${index + 1}</div>
                <div class="trending-content">
                    <div class="trending-title">${item.title}</div>
                    <div class="trending-meta">
                        <span><i class="fas ${category.icon}"></i> ${category.name}</span>
                        <span><i class="far fa-clock"></i> ${item.readTime}</span>
                    </div>
                </div>
            </div>
        `;
        
        DOM.trendingList.innerHTML += trendingHTML;
    });
    
    // Add click events to trending items
    document.querySelectorAll('.trending-item').forEach(item => {
        item.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            alert(`Opening trending article ${id}...`);
            // In real site: Navigate to article page
        });
    });
}

// ====== UPDATE STATS ======
function updateStats() {
    // Update visitor stats
    if (DOM.totalVisitors) {
        DOM.totalVisitors.textContent = formatNumber(websiteData.visitorCount);
    }
    
    if (DOM.onlineNow) {
        DOM.onlineNow.textContent = getRandomNumber(1, 50);
    }
    
    if (DOM.articlesRead) {
        DOM.articlesRead.textContent = formatNumber(websiteData.articlesRead);
    }
    
    // Update content counts
    if (DOM.recipeCount) {
        DOM.recipeCount.textContent = formatNumber(150 + getRandomNumber(1, 20));
    }
    
    if (DOM.tutorialCount) {
        DOM.tutorialCount.textContent = formatNumber(80 + getRandomNumber(1, 10));
    }
    
    if (DOM.guideCount) {
        DOM.guideCount.textContent = formatNumber(200 + getRandomNumber(1, 30));
    }
    
    if (DOM.totalContent) {
        const total = parseInt(DOM.recipeCount.textContent.replace(/,/g, '')) +
                     parseInt(DOM.tutorialCount.textContent.replace(/,/g, '')) +
                     parseInt(DOM.guideCount.textContent.replace(/,/g, ''));
        DOM.totalContent.textContent = formatNumber(total);
    }
    
    // Update ad view counts
    if (DOM.adViews.ad1) {
        DOM.adViews.ad1.textContent = formatNumber(websiteData.adViews.ad1);
    }
    
    if (DOM.adViews.ad2) {
        DOM.adViews.ad2.textContent = formatNumber(websiteData.adViews.ad2);
    }
    
    if (DOM.adViews.ad3) {
        DOM.adViews.ad3.textContent = formatNumber(websiteData.adViews.ad3);
    }
}

// ====== SIMULATE AD VIEWS ======
function simulateAdViews() {
    // Increment ad views every 5 seconds
    setInterval(() => {
        websiteData.adViews.ad1 += getRandomNumber(1, 5);
        websiteData.adViews.ad2 += getRandomNumber(1, 3);
        websiteData.adViews.ad3 += getRandomNumber(1, 2);
        
        updateLocalStorage();
        updateStats();
    }, 5000);
}

// ====== EVENT HANDLERS ======
function readArticle(id) {
    websiteData.articlesRead++;
    updateLocalStorage();
    updateStats();
    
    const article = websiteData.articles.find(a => a.id == id);
    if (article) {
        alert(`Reading: ${article.title}\n\nThis simulates reading an article. In a real site, you would navigate to the full article page.`);
        
        // Highlight the read article
        const articleCard = document.querySelector(`.article-card[data-id="${id}"]`);
        if (articleCard) {
            articleCard.style.opacity = '0.8';
            setTimeout(() => {
                articleCard.style.opacity = '1';
            }, 1000);
        }
    }
}

function handleSubscribe() {
    const email = DOM.newsletterEmail.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showMessage('Please enter your email address.', 'error');
        return;
    }
    
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    if (websiteData.subscribers.includes(email)) {
        showMessage('You are already subscribed!', 'warning');
        return;
    }
    
    // Simulate API call
    DOM.subscribeBtn.disabled = true;
    DOM.subscribeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    
    setTimeout(() => {
        websiteData.subscribers.push(email);
        updateLocalStorage();
        
        DOM.subscribeBtn.disabled = false;
        DOM.subscribeBtn.textContent = 'Subscribe';
        DOM.newsletterEmail.value = '';
        
        showMessage(`Thank you for subscribing! Welcome to ${websiteData.siteName}.`, 'success');
        
        // Log subscription (in real site, send to your database)
        console.log(`New subscriber: ${email}`);
        console.log(`Total subscribers: ${websiteData.subscribers.length}`);
    }, 1500);
}

function showMessage(text, type) {
    if (!DOM.subscribeMessage) return;
    
    DOM.subscribeMessage.textContent = text;
    DOM.subscribeMessage.className = '';
    DOM.subscribeMessage.classList.add(type);
    
    setTimeout(() => {
        DOM.subscribeMessage.textContent = '';
        DOM.subscribeMessage.className = '';
    }, 5000);
}

function handleLoadMore() {
    DOM.loadMoreBtn.disabled = true;
    DOM.loadMoreBtn.textContent = 'Loading...';
    DOM.loadingIndicator.style.display = 'block';
    
    // Simulate loading more articles
    setTimeout(() => {
        // In a real site, you would fetch more articles from a server
        const newArticles = [
            {
                id: websiteData.articles.length + 1,
                category: "tech",
                title: "Advanced CSS Grid Techniques",
                excerpt: "Master complex layouts with these advanced CSS Grid tips and tricks.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                readTime: "9 min",
                date: "2024-03-09"
            },
            {
                id: websiteData.articles.length + 2,
                category: "food",
                title: "Meal Prep for Busy Developers",
                excerpt: "Save time and eat healthy with these efficient meal prep strategies.",
                image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                readTime: "6 min",
                date: "2024-03-08"
            }
        ];
        
        websiteData.articles.push(...newArticles);
        renderArticles();
        
        DOM.loadMoreBtn.disabled = false;
        DOM.loadMoreBtn.textContent = 'Load More Articles';
        DOM.loadingIndicator.style.display = 'none';
        
        updateStats();
        
        alert('2 new articles loaded!');
    }, 2000);
}

function toggleMobileMenu() {
    DOM.mobileMenu.classList.toggle('active');
    const icon = DOM.mobileMenuBtn.querySelector('i');
    if (DOM.mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// ====== SETUP EVENT LISTENERS ======
function setupEventListeners() {
    // Load more articles
    if (DOM.loadMoreBtn) {
        DOM.loadMoreBtn.addEventListener('click', handleLoadMore);
    }
    
    // Newsletter subscription
    if (DOM.subscribeBtn && DOM.newsletterEmail) {
        DOM.subscribeBtn.addEventListener('click', handleSubscribe);
        DOM.newsletterEmail.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSubscribe();
            }
        });
    }
    
    // Mobile menu
    if (DOM.mobileMenuBtn) {
        DOM.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (DOM.mobileMenu && DOM.mobileMenu.classList.contains('active') &&
            !DOM.mobileMenu.contains(e.target) && 
            !DOM.mobileMenuBtn.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    // Track ad clicks (simulated)
    document.querySelectorAll('.ad-space').forEach(ad => {
        ad.addEventListener('click', function() {
            alert('This would navigate to an advertiser\'s website.\nIn a real site, this click would earn revenue.');
        });
    });
    
    // Logo click
    document.querySelector('.logo').addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ====== INITIALIZE WHEN PAGE LOADS ======
document.addEventListener('DOMContentLoaded', initPage);

// ====== EXPOSE FUNCTIONS FOR GLOBAL USE ======
window.DigitalLifeHub = {
    data: websiteData,
    readArticle,
    handleSubscribe,
    updateStats,
    showMessage
};