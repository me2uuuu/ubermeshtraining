document.addEventListener('DOMContentLoaded', () => {
    const entries = JSON.parse(localStorage.getItem('workoutEntries') || '[]');
    entries.forEach(entry => displayEntry(entry.date, entry.workout, entry.food, entry.extra, entry.photo));
});

function saveEntry() {
    const date = document.getElementById("entry-date").value;
    const workout = document.getElementById("workout-details").value;
    const food = document.getElementById("food-details").value;
    const extra = document.getElementById("extra-details").value;
    const photoInput = document.getElementById("photo-upload");

    const reader = new FileReader();
    reader.onload = function () {
        const entry = { date, workout, food, extra, photo: reader.result };
        displayEntry(date, workout, food, extra, reader.result);
        saveToLocalStorage(entry);
    };

    if (photoInput.files.length > 0) {
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        const entry = { date, workout, food, extra, photo: null };
        displayEntry(date, workout, food, extra, null);
        saveToLocalStorage(entry);
    }

    document.getElementById("entry-date").value = '';
    document.getElementById("workout-details").value = '';
    document.getElementById("food-details").value = '';
    document.getElementById("extra-details").value = '';
    photoInput.value = '';
}

function displayEntry(date, workout, food, extra, photo) {
    const list = document.getElementById("entry-list");
    const entry = document.createElement("div");
    entry.classList.add('entry-item');
    entry.innerHTML = `
        <h3>${date}</h3>
        ${workout ? `<p><span class="icon">🏋️</span> ${workout}</p>` : ""}
        ${food ? `<p><span class="icon">🍽️</span> ${food}</p>` : ""}
        ${extra ? `<p><span class="icon">📝</span> ${extra}</p>` : ""}
        ${photo ? `<img src="${photo}" style="max-width: 100%; border-radius: 8px;">` : ""}`;
    list.prepend(entry);
}

function saveToLocalStorage(entry) {
    const entries = JSON.parse(localStorage.getItem('workoutEntries') || '[]');
    entries.unshift(entry);
    localStorage.setItem('workoutEntries', JSON.stringify(entries));
}

function previewPhoto() {
    const fileInput = document.getElementById("photo-upload");
    const preview = document.getElementById("photo-preview");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = "block";
        };
        reader.readAsDataURL(file);
    } else {
        preview.style.display = "none";
    }
}
