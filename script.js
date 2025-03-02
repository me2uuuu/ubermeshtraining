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

function saveEntry() {
    const date = document.getElementById("entry-date").value;
    const workout = document.getElementById("workout-details").value;
    const food = document.getElementById("food-details").value;
    const extra = document.getElementById("extra-details").value;
    const photo = document.getElementById("photo-preview").src || "";

    if (!date && !workout && !food && !extra && !photo) {
        alert("Please enter at least one detail to save.");
        return;
    }

    const list = document.getElementById("entry-list");
    const entry = document.createElement("div");
    entry.innerHTML = `<h3>📅 ${date || "No date"}</h3>
                       <p>🏋️ ${workout || "No workout details"}</p>
                       <p>🍽️ ${food || "No food details"}</p>
                       <p>📝 ${extra || "No extra notes"}</p>
                       ${photo ? `<img src="${photo}" style="max-width: 100%; border-radius: 5px;">` : ""}`;
    list.prepend(entry);

    // 입력 필드 초기화
    document.getElementById("entry-date").value = "";
    document.getElementById("workout-details").value = "";
    document.getElementById("food-details").value = "";
    document.getElementById("extra-details").value = "";
    document.getElementById("photo-upload").value = "";
    document.getElementById("photo-preview").style.display = "none";
}
