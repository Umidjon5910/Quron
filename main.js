document.addEventListener("DOMContentLoaded", async function () {
    const ulApendUchun = document.getElementById("list");
    const qidiruv = document.getElementById("inputElement");
    const toliQuronBtn = document.getElementById("readAll");
    const audioDiv = document.getElementById("audioWrapper");

    try {
        let response = await fetch("https://www.mp3quran.net/api/v3/radios?language=ar");
        let data = await response.json();
        let radios = data.radios;

        radios.forEach(radio => {
            let listItem = document.createElement("li");
            listItem.textContent = `ID: ${radio.id} - ${radio.name}`;
            listItem.dataset.id = radio.id;
            ulApendUchun.appendChild(listItem);

            listItem.addEventListener("click", function () {
                audioDiv.innerHTML = "";
                let audio = document.createElement("audio");
                audio.src = radio.url;
                audio.controls = true;
                audio.autoplay = true;
                audioDiv.appendChild(audio);
                audioDiv.style.display = "block";
            });
        });

        qidiruv.addEventListener("input", function () {
            let id = qidiruv.value.trim();
            let selectedRadio = radios.find(radio => radio.id.toString() === id);

            if (selectedRadio) {
                audioDiv.innerHTML = "";
                let audio = document.createElement("audio");
                audio.src = selectedRadio.url;
                audio.controls = true;
                audio.autoplay = true;
                audioDiv.appendChild(audio);
                audioDiv.style.display = "block";
            }
        });

        toliQuronBtn.addEventListener("click", function () {
            if (radios.length > 0) {
                audioDiv.innerHTML = "";
                let audio = document.createElement("audio");
                audio.src = radios[0].url;
                audio.controls = true;
                audio.autoplay = true;
                audioDiv.appendChild(audio);
                audioDiv.style.display = "block";
            }
        });

    } catch (error) {
        console.error("Xatolik yuz berdi: ", error);
    }
});