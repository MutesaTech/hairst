// Haircut data - This could be moved to a separate JSON file for easier GitHub updates
const haircuts = [
    {
        id: 1,
        name: "Pompadour",
        image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "A classic men's haircut with volume on top and short sides.",
        length: "medium",
        gender: "men",
        difficulty: "medium",
        likes: 124
    },
    {
        id: 2,
        name: "Bob Cut",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "A timeless women's haircut that's usually chin-length.",
        length: "medium",
        gender: "women",
        difficulty: "easy",
        likes: 89
    },
    {
        id: 3,
        name: "Undercut",
        image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Short or shaved sides with longer hair on top.",
        length: "short",
        gender: "unisex",
        difficulty: "medium",
        likes: 156
    },
    {
        id: 4,
        name: "Long Layers",
        image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Beautiful layered cut for long hair.",
        length: "long",
        gender: "women",
        difficulty: "hard",
        likes: 210
    },
    {
        id: 5,
        name: "Buzz Cut",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Very short haircut using clippers.",
        length: "short",
        gender: "men",
        difficulty: "easy",
        likes: 78
    },
    {
        id: 6,
        name: "Afro",
        image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Natural hairstyle that grows outward.",
        length: "long",
        gender: "unisex",
        difficulty: "easy",
        likes: 187
    },
    {
        id: 7,
        name: "Pixie Cut",
        image: "https://images.unsplash.com/photo-1519690889869-e705e59f72e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Very short women's haircut with lots of texture.",
        length: "short",
        gender: "women",
        difficulty: "medium",
        likes: 143
    },
    {
        id: 8,
        name: "Man Bun",
        image: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Long hair tied up in a bun.",
        length: "long",
        gender: "men",
        difficulty: "easy",
        likes: 92
    }
];

// DOM Elements
const haircutGrid = document.getElementById('haircutGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const hairLengthFilter = document.getElementById('hairLengthFilter');
const genderFilter = document.getElementById('genderFilter');
const themeToggle = document.getElementById('themeToggle');
const installBtn = document.getElementById('installBtn');
const currentYear = document.getElementById('currentYear');
const toast = document.getElementById('toast');

// Modal Elements
const haircutModal = document.getElementById('haircutModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalLength = document.getElementById('modalLength');
const modalGender = document.getElementById('modalGender');
const modalDifficulty = document.getElementById('modalDifficulty');
const likeBtn = document.getElementById('likeBtn');
const likeCount = document.getElementById('likeCount');
const shareBtn = document.getElementById('shareBtn');
const saveBtn = document.getElementById('saveBtn');
const closeModal = document.querySelector('.close-modal');

// Current year
currentYear.textContent = new Date().getFullYear();

// Theme toggle
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Display haircuts
function displayHaircuts(haircutsToDisplay = haircuts) {
    haircutGrid.innerHTML = '';
    
    if (haircutsToDisplay.length === 0) {
        haircutGrid.innerHTML = '<p class="no-results">No haircuts found matching your criteria.</p>';
        return;
    }
    
    haircutsToDisplay.forEach(haircut => {
        const haircutCard = document.createElement('div');
        haircutCard.className = 'haircut-card';
        haircutCard.innerHTML = `
            <img src="${haircut.image}" alt="${haircut.name}" class="haircut-image">
            <div class="haircut-info">
                <h3 class="haircut-name">${haircut.name}</h3>
                <div class="haircut-meta">
                    <span class="meta-tag">${haircut.length}</span>
                    <span class="meta-tag">${haircut.gender}</span>
                </div>
            </div>
        `;
        
        haircutCard.addEventListener('click', () => openModal(haircut));
        haircutGrid.appendChild(haircutCard);
    });
}

// Open modal with haircut details
function openModal(haircut) {
    modalImage.src = haircut.image;
    modalImage.alt = haircut.name;
    modalTitle.textContent = haircut.name;
    modalDescription.textContent = haircut.description;
    modalLength.textContent = haircut.length;
    modalGender.textContent = haircut.gender;
    modalDifficulty.textContent = haircut.difficulty;
    likeCount.textContent = haircut.likes;
    
    // Check if haircut is liked/saved (from localStorage)
    const likedHaircuts = JSON.parse(localStorage.getItem('likedHaircuts')) || [];
    const savedHaircuts = JSON.parse(localStorage.getItem('savedHaircuts')) || [];
    
    if (likedHaircuts.includes(haircut.id)) {
        likeBtn.classList.add('liked');
        likeBtn.innerHTML = '<i class="fas fa-heart"></i> <span id="likeCount">' + haircut.likes + '</span>';
    } else {
        likeBtn.classList.remove('liked');
        likeBtn.innerHTML = '<i class="far fa-heart"></i> <span id="likeCount">' + haircut.likes + '</span>';
    }
    
    if (savedHaircuts.includes(haircut.id)) {
        saveBtn.classList.add('saved');
        saveBtn.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
    } else {
        saveBtn.classList.remove('saved');
        saveBtn.innerHTML = '<i class="far fa-bookmark"></i> Save';
    }
    
    // Set data attributes for buttons
    likeBtn.dataset.id = haircut.id;
    saveBtn.dataset.id = haircut.id;
    
    haircutModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModalFunc() {
    haircutModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

closeModal.addEventListener('click', closeModalFunc);
window.addEventListener('click', (e) => {
    if (e.target === haircutModal) {
        closeModalFunc();
    }
});

// Like button functionality
likeBtn.addEventListener('click', function() {
    const haircutId = parseInt(this.dataset.id);
    const haircutIndex = haircuts.findIndex(h => h.id === haircutId);
    let likedHaircuts = JSON.parse(localStorage.getItem('likedHaircuts')) || [];
    
    if (this.classList.contains('liked')) {
        // Unlike
        haircuts[haircutIndex].likes--;
        likedHaircuts = likedHaircuts.filter(id => id !== haircutId);
        this.classList.remove('liked');
        this.innerHTML = '<i class="far fa-heart"></i> <span id="likeCount">' + haircuts[haircutIndex].likes + '</span>';
        showToast('Removed from liked haircuts');
    } else {
        // Like
        haircuts[haircutIndex].likes++;
        likedHaircuts.push(haircutId);
        this.classList.add('liked');
        this.innerHTML = '<i class="fas fa-heart"></i> <span id="likeCount">' + haircuts[haircutIndex].likes + '</span>';
        showToast('Added to liked haircuts');
    }
    
    localStorage.setItem('likedHaircuts', JSON.stringify(likedHaircuts));
    likeCount.textContent = haircuts[haircutIndex].likes;
});

// Save button functionality
saveBtn.addEventListener('click', function() {
    const haircutId = parseInt(this.dataset.id);
    let savedHaircuts = JSON.parse(localStorage.getItem('savedHaircuts')) || [];
    
    if (this.classList.contains('saved')) {
        // Unsave
        savedHaircuts = savedHaircuts.filter(id => id !== haircutId);
        this.classList.remove('saved');
        this.innerHTML = '<i class="far fa-bookmark"></i> Save';
        showToast('Removed from saved haircuts');
    } else {
        // Save
        savedHaircuts.push(haircutId);
        this.classList.add('saved');
        this.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
        showToast('Added to saved haircuts');
    }
    
    localStorage.setItem('savedHaircuts', JSON.stringify(savedHaircuts));
});

// Share button functionality
shareBtn.addEventListener('click', function() {
    if (navigator.share) {
        navigator.share({
            title: modalTitle.textContent,
            text: modalDescription.textContent,
            url: window.location.href
        }).catch(err => {
            console.log('Error sharing:', err);
            showToast('Sharing failed. Please try again.');
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareUrl = `mailto:?subject=Check out this haircut: ${modalTitle.textContent}&body=${modalDescription.textContent}%0A%0ASee more at: ${window.location.href}`;
        window.location.href = shareUrl;
    }
});

// Filter and search functionality
function filterHaircuts() {
    const searchTerm = searchInput.value.toLowerCase();
    const lengthFilter = hairLengthFilter.value;
    const genderFilterValue = genderFilter.value;
    
    const filteredHaircuts = haircuts.filter(haircut => {
        const matchesSearch = haircut.name.toLowerCase().includes(searchTerm) || 
                            haircut.description.toLowerCase().includes(searchTerm);
        const matchesLength = lengthFilter === 'all' || haircut.length === lengthFilter;
        const matchesGender = genderFilterValue === 'all' || haircut.gender === genderFilterValue;
        
        return matchesSearch && matchesLength && matchesGender;
    });
    
    displayHaircuts(filteredHaircuts);
}

searchInput.addEventListener('input', filterHaircuts);
searchBtn.addEventListener('click', filterHaircuts);
hairLengthFilter.addEventListener('change', filterHaircuts);
genderFilter.addEventListener('change', filterHaircuts);

// Show toast notification
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// PWA Installation
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    // Update UI to notify the user they can install the PWA
    installBtn.style.display = 'block';
});

installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Optionally, send analytics event with outcome of user choice
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt, and can't use it again, throw it away
    deferredPrompt = null;
    // Hide the install button
    installBtn.style.display = 'none';
});

window.addEventListener('appinstalled', () => {
    // Hide the install button
    installBtn.style.display = 'none';
    // Clear the deferredPrompt so it can be garbage collected
    deferredPrompt = null;
    // Optionally, send analytics event to indicate successful install
    console.log('PWA was installed');
    showToast('App installed successfully!');
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Initial display
displayHaircuts();