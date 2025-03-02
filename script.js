document.addEventListener('DOMContentLoaded', () => {
    const entries = JSON.parse(localStorage.getItem('workoutEntries') || '[]');
    entries.forEach(entry => displayEntry(entry.date, entry.workout, entry.food, entry.extra));
});

function saveEntry() {
    const date = document.getElementById("entry-date").value;
    const workout = document.getElementById("workout-details").value;
    const food = document.getElementById("food-details").value;
    const extra = document.getElementById("extra-details").value;

    const entry = { date, workout, food, extra };
    displayEntry(date, workout, food, extra);
    saveToLocalStorage(entry);

    document.getElementById("entry-date").value = '';
    document.getElementById("workout-details").value = '';
    document.getElementById("food-details").value = '';
    document.getElementById("extra-details").value = '';
}

function displayEntry(date, workout, food, extra) {
    const list = document.getElementById("entry-list");
    const entry = document.createElement("div");
    entry.innerHTML = `<h3>${date}</h3>
                       <p>🏋️ ${workout}</p>
                       <p>🍽️ ${food}</p>
                       <p>📝 ${extra}</p>`;
    list.prepend(entry);
}

function saveToLocalStorage(entry) {
    const entries = JSON.parse(localStorage.getItem('workoutEntries') || '[]');
    entries.unshift(entry);
    localStorage.setItem('workoutEntries', JSON.stringify(entries));
}
