document.addEventListener("DOMContentLoaded", function () {
    const redSlider = document.getElementById("red");
    const greenSlider = document.getElementById("green");
    const blueSlider = document.getElementById("blue");
    const colorBox = document.getElementById("color-box");
    const copyInput = document.getElementById("copy");

    function updateColor() {
        const redValue = redSlider.value;
        const greenValue = greenSlider.value;
        const blueValue = blueSlider.value;

        const backgroundColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
        colorBox.style.backgroundColor = backgroundColor;

        copyInput.value = backgroundColor;
    }

    redSlider.addEventListener("input", updateColor);
    greenSlider.addEventListener("input", updateColor);
    blueSlider.addEventListener("input", updateColor);
});

function copyToClipboard() {
    const copyInput = document.getElementById("copy");
    copyInput.select();
    
    try {
        document.execCommand("copy");
        setTimeout(() => {
            document.querySelector('.containerkopiuj input').checked = false;
        }, 1000);
    } catch (err) {
        console.error("Błąd kopiowania do schowka: ", err);
        alert("Niestety, nie udało się skopiować do schowka.");
    }
}
