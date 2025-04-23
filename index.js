document.querySelector('.theme-toggle').addEventListener('click', () => {
   document.body.classList.toggle('light');
 });
 function startAssistant() {
   document.getElementById("assistant").style.display = "flex";
 }
 
 function sendMessage() {
   const userInput = document.getElementById("userInput");
   const chatBox = document.getElementById("chatBox");
   const userText = userInput.value.trim();
   if (!userText) return;
 
   // Show user message
   const userMsg = document.createElement("p");
   userMsg.className = "user";
   userMsg.textContent = userText;
   chatBox.appendChild(userMsg);
 
   // Fake AI response
   const aiMsg = document.createElement("p");
   aiMsg.className = "ai";
   if (userText.toLowerCase().includes("valorant")) {
     aiMsg.textContent = "Great choice! 🎯 Let's track your headshots, agent unlocks, and rank progress.";
   } else if (userText.toLowerCase().includes("gta")) {
     aiMsg.textContent = "GTA fan! 🚗 Let's follow mission completions, side quests, and 100% map coverage.";
   } else {
     aiMsg.textContent = `Awesome! I'll look up achievements for "${userText}" and help you track them.`;
   }
 
   chatBox.appendChild(aiMsg);
   userInput.value = "";
   chatBox.scrollTop = chatBox.scrollHeight;
 }
 
// BGMI ID Modal functionality
document.getElementById('firstBloodCard').addEventListener('click', function() {
    const modal = document.getElementById('bgmiModal');
    modal.style.display = 'flex';
});

// Sample Q&A data
const qaData = {
    "what is my rank": "Your current rank is Gold. Keep playing to reach higher ranks!",
    "how many kills": "You have 1500 total kills. Great job!",
    "what is my kd": "Your K/D ratio is 5.0. That's impressive!",
    "how many wins": "You have 75 wins. Keep up the good work!",
    "headshot rate": "Your headshot rate is 33%. Nice accuracy!",
    "matches played": "You have played 300 matches so far.",
    "achievements": "You have unlocked 25 achievements out of 50.",
    "completion": "You have completed 65% of all achievements.",
    "help": "I can help you with:\n- Checking your rank\n- Viewing your kills\n- Checking your K/D ratio\n- Viewing your wins\n- Checking headshot rate\n- Viewing matches played\n- Checking achievements\n- Viewing completion percentage",
    "default": "I'm your BGMI achievement assistant! Ask me about your stats, achievements, or type 'help' to see what I can do."
};

// Sample achievement data
const achievementData = {
    kills: 1500,
    wins: 75,
    headshots: 500,
    rank: "Gold",
    matchesPlayed: 300,
    achievements: 25,
    completion: 65
};

// Function to get answer based on user input
function getAnswer(userInput) {
    const input = userInput.toLowerCase().trim();
    
    // Check for exact matches
    for (const [key, value] of Object.entries(qaData)) {
        if (input.includes(key)) {
            return value;
        }
    }
    
    // Check for related terms
    if (input.includes("rank") || input.includes("tier")) {
        return qaData["what is my rank"];
    } else if (input.includes("kill") || input.includes("frag")) {
        return qaData["how many kills"];
    } else if (input.includes("kd") || input.includes("ratio")) {
        return qaData["what is my kd"];
    } else if (input.includes("win") || input.includes("victory")) {
        return qaData["how many wins"];
    } else if (input.includes("head") || input.includes("accuracy")) {
        return qaData["headshot rate"];
    } else if (input.includes("match") || input.includes("game")) {
        return qaData["matches played"];
    } else if (input.includes("achieve") || input.includes("unlock")) {
        return qaData["achievements"];
    } else if (input.includes("complete") || input.includes("progress")) {
        return qaData["completion"];
    }
    
    return qaData["default"];
}

// Function to update stats display
function updateStats(data) {
    document.querySelector('#firstBloodCard .stat-item:nth-child(1) .stat-value').textContent = data.kills;
    document.querySelector('#firstBloodCard .stat-item:nth-child(2) .stat-value').textContent = data.wins;
    document.querySelector('#firstBloodCard .stat-item:nth-child(3) .stat-value').textContent = data.headshots;
    
    document.querySelector('.achievement-card:nth-child(2) .stat-item:nth-child(1) .stat-value').textContent = data.achievements;
    document.querySelector('.achievement-card:nth-child(2) .stat-item:nth-child(2) .stat-value').textContent = data.completion + '%';
    
    document.querySelector('#firstBloodCard .progress-bar').style.width = (data.completion / 100) * 100 + '%';
    document.querySelector('.achievement-card:nth-child(2) .progress-bar').style.width = (data.completion / 100) * 100 + '%';
}

// Modified submit function
async function submitBgmiId() {
    const bgmiId = document.getElementById('bgmiId').value;
    if (bgmiId.trim() !== '') {
        try {
            // Show loading state
            document.querySelector('.modal-buttons button:first-child').textContent = 'Loading...';
            document.querySelector('.modal-buttons button:first-child').disabled = true;
            
            // Use sample data
            updateStats(achievementData);
            
            // Update modal stats
            document.querySelector('#bgmiModal .stat-item:nth-child(1) .stat-value').textContent = achievementData.rank;
            document.querySelector('#bgmiModal .stat-item:nth-child(2) .stat-value').textContent = achievementData.matchesPlayed;
            
            // Save the data
            localStorage.setItem('achievementData', JSON.stringify(achievementData));
            
            // Show success message
            alert('BGMI ID linked successfully! Your stats have been updated.');
            closeModal();
            
            // Enable button again
            document.querySelector('.modal-buttons button:first-child').textContent = 'Submit';
            document.querySelector('.modal-buttons button:first-child').disabled = false;
            
            // Redirect to dashboard
            window.location.href = 'userdashboard.html';
        } catch (error) {
            alert('Error processing your request. Please try again.');
            document.querySelector('.modal-buttons button:first-child').textContent = 'Submit';
            document.querySelector('.modal-buttons button:first-child').disabled = false;
        }
    } else {
        alert('Please enter your BGMI ID');
    }
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('bgmiModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
document.getElementById('bgmiModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Load data when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize with sample data
    updateStats(achievementData);
});
 