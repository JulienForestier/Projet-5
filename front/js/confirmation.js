const orderId = document.getElementById("orderId");

const url = window.location.href;
const urlSearch = new URL(url);
const id = urlSearch.searchParams.get("id");

orderId.innerText = id;

localStorage.removeItem("basket");
