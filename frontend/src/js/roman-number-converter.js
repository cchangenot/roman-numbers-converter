"use strict";

window.addEventListener("load", () => {
  const form = document.getElementById("convert-form");
  const convertParameter = document.getElementById("convert-parameter")
  const convertResult = document.getElementById("convert-result");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  const eventSource = new EventSource("http://localhost:8080/roman-number");
  eventSource.onmessage = (event) => {
    const romanNumber = JSON.parse(event.data).value;
    convertResult.textContent = romanNumber;
  };

  convertParameter.addEventListener("change", () => {
    convertToRomanNumber(convertParameter.value)
      .catch((error) => {
        console.error(error);
        convertResult.textContent = "";
      });
  });

  async function convertToRomanNumber(number) {
    const response = await fetch(`http://localhost:8080/roman-number/${number}`);
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.status}`);
    }
  }
});
