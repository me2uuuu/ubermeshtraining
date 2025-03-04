document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    document.body.className = savedTheme;
    const themeToggle = document.getElementById('theme-toggle');
    updateThemeIcon();
    const entries = JSON.parse(localStorage.getItem('workoutEntries') || '[]');
    entries.forEach((entry, index) => displayEntry(entry.date, entry.workout, entry.food, entry.extra, entry.photo, index));
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.className;
        const newTheme = currentTheme === 'dark-theme' ? 'light-theme' : 'dark-theme';
        document.body.className = newTheme;
        localStorage.setItem('theme', newTheme);
        updateThemeIcon();
    });
});

function updateThemeIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    const isDark = document.body.className === 'dark-theme';
    themeToggle.innerHTML = isDark ? '<i class="bi bi-moon"></i>' : '<i class="bi bi-sun-fill"></i>';
}

function saveEntry() {
    const date = document.getElementById("entry-date").value;
    const workout = document.getElementById("workout-details").value;
    const food = document.getElementById("food-details").value;
    const extra = document.getElementById("extra-details").value;
    const photoInput = document.getElementById("photo-upload");
    const reader = new FileReader();
    reader.onload = function () {
        const entry = { date, workout, food, extra, photo: reader.result };
        displayEntry(entry.date, entry.workout, entry.food, entry.extra, entry.photo, 0);
        saveToLocalStorage(entry);
    };
    if (photoInput.files.length > 0) {
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        const entry = { date, workout, food, extra, photo: null };
        displayEntry(entry.date, entry.workout, entry.food, entry.extra, null, 0);
        saveToLocalStorage(entry);
    }
    document.getElementById("entry-date").value = '';
    document.getElementById("workout-details").value = '';
    document.getElementById("food-details").value = '';
    document.getElementById("extra-details").value = '';
    photoInput.value = '';
}

function displayEntry(date, workout, food, extra, photo, index) {
    const list = document.getElementById("entry-list");
    const entry = document.createElement("div");
    entry.classList.add('entry-item');
    entry.innerHTML = `
        <h3>${date}</h3>
        ${workout ? `<p><span class="icon">🏋️</span> ${workout}</p>` : ""}
        ${food ? `<p><span class="icon">🍽️</span> ${food}</p>` : ""}
        ${extra ? `<p><span class="icon">📝</span> ${extra}</p>` : ""}
        ${photo ? `<img src="${photo}" style="max-width: 100%; border-radius: 8px;">` : ""}
        <button onclick="deleteEntry(${index})" class="delete-btn">삭제</button>
    `;
    list.prepend(entry);
}

function saveToLocalStorage(entry) {
    const entries = JSON.parse(localStorage.getItem('workoutEntries') || '[]');
    entries.unshift(entry);
    localStorage.setItem('workoutEntries', JSON.stringify(entries));
}

function deleteEntry(index) {
    const entries = JSON.parse(localStorage.getItem('workoutEntries') || '[]');
    entries.splice(index, 1);
    localStorage.setItem('workoutEntries', JSON.stringify(entries));
    refreshEntries();
}

function refreshEntries() {
    const list = document.getElementById("entry-list");
    list.innerHTML = '';
    const entries = JSON.parse(localStorage.getItem('workoutEntries') || '[]');
    entries.forEach((entry, index) => displayEntry(entry.date, entry.workout, entry.food, entry.extra, entry.photo, index));
}

function exportEntries() {
    const entries = JSON.parse(localStorage.getItem('workoutEntries') || '[]');
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entries));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "ubermesh_training_backup.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function importEntries(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedEntries = JSON.parse(e.target.result);
            localStorage.setItem('workoutEntries', JSON.stringify(importedEntries));
            refreshEntries();
            alert("백업이 성공적으로 불러와졌습니다!");
        } catch (err) {
            alert("잘못된 파일입니다. 백업 파일을 확인해주세요.");
        }
    };
    reader.readAsText(file);
}
