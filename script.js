const form = document.getElementById("form");
const productName = document.getElementById("productName");
const description = document.getElementById("description");
const price = document.getElementById("price");
const todolist = document.getElementById("todolist");

let todoarray = JSON.parse(localStorage.getItem("todolist")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newToDo = {
    name: productName.value,
    description: description.value,
    price: price.value,
    id: Date.now(),
  };
  todoarray.push(newToDo);
  localStorage.setItem("todolist", JSON.stringify(todoarray));
  productName.value = "";
  description.value = "";
  price.value = "";
  displayToDo();
});

const displayToDo = () => {
  todolist.innerHTML = "";
  todoarray.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${item.name} - ${item.description} - $${item.price}</span>
    <button data-id=${item.id} class="delete">Delete</button><button data-id=${item.id} class="update">Update</button>`;
    todolist.appendChild(li);
  });
};

todolist.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const id = e.target.dataset.id;
    todoarray = todoarray.filter((item) => item.id !== Number(id));
    localStorage.setItem("todolist", JSON.stringify(todoarray));
    displayToDo();
  } else if (e.target.classList.contains("update")) {
    const id = e.target.dataset.id;
    const updateName = prompt("update productname");
    const updateDes = prompt("update Description");
    const updatePrice = prompt("update Price");
    todoarray = todoarray.map((item) => {
      if (item.id === Number(id)) {
        if (updateName === null || updateDes === null || updatePrice === null) {
          return item;
        } else {
          return {
            ...item,
            name: updateName,
            description: updateDes,
            price: updatePrice,
          };
        }
      } else {
        return item;
      }
    });
    localStorage.setItem("todolist", JSON.stringify(todoarray));
    displayToDo();
  }
});

displayToDo();
