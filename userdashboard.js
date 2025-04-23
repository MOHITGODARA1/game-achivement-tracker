// Static sample data
const sampleData = {
    bgmiId: "123456789",
    rank: "Gold",
    kills: 1500,
    wins: 75,
    headshots: 500,
    matchesPlayed: 300,
    achievements: 25,
    completion: 65
};

// Load user data from localStorage or use sample data
function loadUserData() {
    const savedData = localStorage.getItem('achievementData');
    if (savedData) {
        const userData = JSON.parse(savedData);
        updateDashboard(userData);
    } else {
        // Use sample data for demonstration
        updateDashboard(sampleData);
    }
}

// Update dashboard with user data
function updateDashboard(data) {
    // Update profile section
    document.getElementById('username').textContent = `Player ${data.bgmiId}`;
    document.getElementById('userRank').textContent = data.rank;
    
    // Update profile stats
    document.getElementById('totalKills').textContent = data.kills;
    document.getElementById('totalWins').textContent = data.wins;
    document.getElementById('headshotRate').textContent = 
        data.headshots > 0 ? `${Math.round((data.headshots / data.kills) * 100)}%` : '0%';
    
    // Update achievement progress
    document.getElementById('firstBloodProgress').style.width = 
        `${Math.min((data.kills / 1) * 100, 100)}%`;
    document.getElementById('championProgress').style.width = 
        `${Math.min((data.wins / 1) * 100, 100)}%`;
    document.getElementById('sharpshooterProgress').style.width = 
        `${Math.min((data.headshots / 100) * 100, 100)}%`;
    
    // Update detailed stats
    document.getElementById('kdRatio').textContent = 
        data.matchesPlayed > 0 ? (data.kills / data.matchesPlayed).toFixed(2) : '0.00';
    document.getElementById('damageDealt').textContent = 
        Math.floor(data.kills * 100); // Simulated damage
    document.getElementById('survivalTime').textContent = 
        `${Math.floor(data.matchesPlayed * 20)}m`; // Simulated survival time
    
    document.getElementById('matchesPlayed').textContent = data.matchesPlayed;
    document.getElementById('winRate').textContent = 
        data.matchesPlayed > 0 ? `${Math.round((data.wins / data.matchesPlayed) * 100)}%` : '0%';
    document.getElementById('top10Rate').textContent = 
        data.matchesPlayed > 0 ? `${Math.round((data.wins * 2 / data.matchesPlayed) * 100)}%` : '0%';
    
    // Update recent matches
    updateRecentMatches(data);
}

// Update recent matches section with sample data
function updateRecentMatches(data) {
    const matchesList = document.getElementById('matchesList');
    matchesList.innerHTML = '';
    
    // Sample match data
    const sampleMatches = [
        { kills: 8, damage: 800, placement: 3 },
        { kills: 5, damage: 500, placement: 12 },
        { kills: 3, damage: 300, placement: 25 },
        { kills: 7, damage: 700, placement: 8 },
        { kills: 4, damage: 400, placement: 15 }
    ];
    
    sampleMatches.forEach(match => {
        const matchElement = document.createElement('div');
        matchElement.className = 'match-item';
        
        matchElement.innerHTML = `
            <div class="match-info">
                <span class="match-kills">${match.kills} Kills</span>
                <span class="match-damage">${match.damage} Damage</span>
            </div>
            <span class="match-result">#${match.placement}</span>
        `;
        
        matchesList.appendChild(matchElement);
    });
}

// Theme toggle functionality
document.querySelector('.theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light');
});

// Load data when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    
    // Update data every 30 seconds (optional)
    setInterval(() => {
        loadUserData();
    }, 30000);
}); 