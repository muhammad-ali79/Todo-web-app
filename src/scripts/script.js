/*
1. Add Todo
     => .whenever textfield is not empty and user press enter
             .remove the empty todo div
             .create a list with a checkbox , user written text , and delete button
             .append this list in the todolist box
             .make a function that tells the number of active todos
2. delete Todo
3. complete Todo
     .make text of that todo line through
     .change result in todos array (iscompleted:true)
4. active Todo func
5. filter for all
6. filter for active
7. filter for completed
8. clear completed
*/

const inputField = document.querySelector("#input-field");
const todoBox = document.querySelector("#todo-box");
const emptyTodo = document.querySelector("#empty-todo");
const filterList = document.querySelector("#filter-list");
const themeSwitcher = document.querySelector(".theme-switcher");
const backgroundBanner = document.querySelector(".background-banner");

// Dark mode
let isDark = true;
themeSwitcher.addEventListener("click", () => {
  document.querySelector("html").classList.toggle("dark");

  backgroundBanner.src = isDark
    ? "images/bg-desktop-dark.jpg"
    : "images/bg-desktop-light.jpg";

  themeSwitcher.src = isDark ? "images/icon-sun.svg" : "images/icon-moon.svg";

  isDark = !isDark;
  console.log(isDark);
});

const todos = [];
const addTodo = () => {
  const todoText = inputField.value.trim();
  const listItem = document.createElement("li");
  listItem.className =
    "todo-list relative flex items-center w-full py-[0.95rem] px-4 border-b border-bordercolor dark:border-bordercolor-dark transiton-colors duration-500 ease-[cubic-bezier(.37,0,.63,1)] rounded-sm animate-fadeleft";

  listItem.innerHTML = `
    <input type="checkbox" name="" id="checkbox" class="absolute top-1/2 left-4 w-[18px] h-[18px] border border-bordercolor dark:border-bordercolor-dark rounded-full -translate-y-1/2 appearance-none outline-none cursor-pointer transition-all duration-500 ease-[cubic-bezier(.37,0,.63,1)] xs:w-6 xs:h-6 checked:bg-gradient-to-t from-[#57ddff] to-[#c058f3] checked:border-none checked:after:absolute checked:after:top-0 checked:after:left-0 checked:after:w-full checked:after:h-full checked:after:content-[''] checked:after:bg-no-repeat checked:after:bg-[50%]"/>
  
  <span class="flex-grow ml-7 xs:ml-[2.2rem] text-color dark:text-color-dark transition-colors duration-500 ease-[cubic-bezier(.37,0,.63,1)]">${todoText}</span>
  
  <button class="flex [all:unset] cursor-pointer">
    <img src="images/icon-cross.svg" alt=""  class="w-[11px] xs:w-[13px] cursor-pointer delete-btn"/>
  </button>
    `;

  todos.push({ id: todos.length + 1, title: todoText, iscompleted: false });
  inputField.value = "";
  todoBox.insertBefore(listItem, filterList);
};

// Delete Todo
const deleteTodo = (e) => {
  const itemTodelete = e.target.closest("li");
  // select all the todo lists
  const items = document.querySelectorAll(".todo-list");

  // if only clicked button conatins the class of delete-btn then procced because evenListener is attached to the parent element (todoBox) (event delegation)
  if (e.target.classList.contains("delete-btn")) {
    // itemTodelete.classList.remove("aniamte-fadeleft");
    itemTodelete.classList.remove("animate-fadeleft");
    itemTodelete.classList.add("animate-faderight");

    itemTodelete.addEventListener("animationend", () => {
      todoBox.removeChild(itemTodelete);
    });

    let index = -1;
    for (let i = 0; i < items.length; i++) {
      if (items[i] === itemTodelete) {
        index = i;
      }
    }
    console.log(index);
    if (index != -1) todos.splice(index, 1);
  }
};

document.querySelector("#input-field").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && inputField.value != "") {
    addTodo();
    emptyTodo.remove();
  }
});

todoBox.addEventListener("click", (e) => {
  deleteTodo(e);
  console.log(todos);
});
