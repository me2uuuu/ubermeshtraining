function saveEntry() {
    const date = document.getElementById("entry-date").value;
    const workout = document.getElementById("workout-details").value;
    const food = document.getElementById("food-details").value;
    const extra = document.getElementById("extra-details").value;
    const photoInput = document.getElementById("photo-upload");

    const reader = new FileReader();
    reader.onload = function () {
        displayEntry(date, workout, food, extra, reader.result);
    };

    if (photoInput.files.length > 0) {
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        displayEntry(date, workout, food, extra, null);
    }
}

function displayEntry(date, workout, food, extra, photo) {
    const list = document.getElementById("entry-list");
    const entry = document.createElement("div");
    entry.innerHTML = `<h3>📅 ${date}</h3>
                       ${workout ? `<p>🏋️ ${workout}</p>` : ""}
                       ${food ? `<p>🍽️ ${food}</p>` : ""}
                       ${extra ? `<p>📝 ${extra}</p>` : ""}
                       ${photo ? `<img src="${photo}" style="max-width: 100%; border-radius: 5px;">` : ""}`;
    list.prepend(entry);
}
