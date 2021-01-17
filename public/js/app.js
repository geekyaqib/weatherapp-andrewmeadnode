console.log("CLIENT SIDE JAVASCRIPT IS RUNNING");

const para = document.querySelector(".para");
para.innerHTML = "content from client js";

const searchForm = document.querySelector("form");
const search = document.querySelector("input");
const content = document.querySelector(".content");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  fetch("http://localhost:3000/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        content.innerHTML = data.error;
      } else {
        content.innerHTML = `<p>FORECAST = ${data.forecast}$</p>
         <p>LOCATION = ${data.location}$`;
      }
    });
  });
});
