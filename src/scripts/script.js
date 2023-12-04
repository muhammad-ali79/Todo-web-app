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
4. itemsleft func
         .only look for is completed===false and count them and show theri number
5. filter for all
6. filter for active
         . filter for only whose checkbox is checked  and delete them
7. filter for completed
8. clear completed
*/
// select the both two filter ul and preform the functionality according to which one is clicked

const inputField = document.querySelector("#input-field");
const todoBox = document.querySelector("#todo-box");
const emptyTodo = document.querySelector("#empty-todo");
const filterList = document.querySelector("#filter-list");
const themeSwitcher = document.querySelector(".theme-switcher");
const backgroundBanner = document.querySelector(".background-banner");
const leftTodos = document.querySelector(".left-todos");
const allTodosbtn = document.querySelectorAll(".all-todos");
const activeTodosbtn = document.querySelectorAll(".active-todos");
const completeTodosbtn = document.querySelectorAll(".completed-todos");
const clearCompletebtn = document.querySelector(".clear-complete");
const allFilterbtns = document.querySelectorAll(".filter-btns");

// Dark mode
let isDark = true;
themeSwitcher.addEventListener("click", () => {
  document.querySelector("html").classList.toggle("dark");

  backgroundBanner.src = isDark
    ? "images/bg-desktop-dark.jpg"
    : "images/bg-desktop-light.jpg";

  themeSwitcher.src = isDark ? "images/icon-sun.svg" : "images/icon-moon.svg";

  isDark = !isDark;
});

const itemsleft = () => {
  let count = 0;
  todos.filter((todo) => {
    if (todo.iscompleted === false) count += 1;
  });
  leftTodos.textContent = count;
};

let todos = [];
const addTodo = () => {
  const todoText = inputField.value.trim();
  const listItem = document.createElement("li");
  listItem.className =
    "todo-list relative flex items-center w-full py-[0.95rem] px-4 border-b border-bordercolor dark:border-bordercolor-dark transiton-colors duration-500 ease-[cubic-bezier(.37,0,.63,1)] rounded-sm animate-fadeleft";

  listItem.innerHTML = `
    <input type="checkbox" name="" id="checkbox" class="checkbox absolute top-1/2 left-4 w-[18px] h-[18px] border border-bordercolor dark:border-bordercolor-dark rounded-full -translate-y-1/2 appearance-none outline-none cursor-pointer transition-all duration-500 ease-[cubic-bezier(.37,0,.63,1)] xs:w-6 xs:h-6 checked:bg-gradient-to-t from-[#57ddff] to-[#c058f3] checked:border-none checked:after:absolute checked:after:top-0 checked:after:left-0 checked:after:w-full checked:after:h-full checked:after:content-[''] checked:after:bg-no-repeat checked:after:bg-[50%]"/>
  
  <span class="flex-grow  ml-7 xs:ml-[2.2rem] text-color dark:text-color-dark transition-colors duration-500 ease-[cubic-bezier(.37,0,.63,1)]">${todoText}</span>
  
  <button class="flex [all:unset] cursor-pointer">
    <img src="images/icon-cross.svg" alt=""  class="w-[11px] xs:w-[13px] cursor-pointer delete-btn"/>
  </button>
    `;

  todos.push({ id: todos.length + 1, title: todoText, iscompleted: false });
  inputField.value = "";
  todoBox.insertBefore(listItem, filterList);

  itemsleft();
};

const showEmptyDiv = () => {
  if (todos.length === 0) todoBox.prepend(emptyTodo);
};

const findIndex = (all, targeted) => {
  let index = -1;
  for (let i = 0; i < all.length; i++) {
    if (all[i] === targeted) index = i;
  }
  return index;
};

// Delete Todo
const deleteTodo = (e) => {
  const itemTodelete = e.target.closest("li");
  // select all the todo lists
  const allTodos = document.querySelectorAll(".todo-list");

  // if only clicked button conatins the class of delete-btn then procced because evenListener is attached to the parent element (todoBox) (event delegation)
  if (e.target.classList.contains("delete-btn")) {
    // itemTodelete.classList.remove("aniamte-fadeleft");
    // itemTodelete.classList.remove("animate-fadeleft");
    itemTodelete.classList.add("animate-faderight");

    // const removeTodo = ()=>{

    // }

    itemTodelete.addEventListener("animationend", () => {
      todoBox.removeChild(itemTodelete);
    });

    const index = findIndex(allTodos, itemTodelete);
    if (index != -1) todos.splice(index, 1);
  }
  itemsleft();
  showEmptyDiv();
};

// complete Todo
const completeTodo = (e) => {
  const checkbox = e.target;
  const text = checkbox.nextElementSibling;
  const targetTodo = e.target.closest("li");
  const allTodos = document.querySelectorAll(".todo-list");

  if (e.target.classList.contains("checkbox")) {
    const index = findIndex(allTodos, targetTodo);

    if (checkbox.checked) {
      text.classList.add(
        "line-through",
        "text-checkedcolor",
        "dark:text-checkedcolor-dark"
      );
      todos[index].iscompleted = true;
      targetTodo.classList.add("completed");
    } else {
      text.classList.remove(
        "line-through",
        "text-checkedcolor",
        "dark:text-checkedcolor-dark"
      );
      todos[index].iscompleted = false;
      targetTodo.classList.remove("completed");
    }
  }
  itemsleft();
};

document.querySelector("#input-field").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && inputField.value != "") {
    addTodo();
    emptyTodo.remove();
  }
});

todoBox.addEventListener("click", (e) => {
  deleteTodo(e);
  completeTodo(e);
});

const giveTargetColor = () => {
  allFilterbtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      allFilterbtns.forEach((sibling) => {
        sibling === btn
          ? sibling.classList.add("text-[#3a7bfd]")
          : sibling.classList.remove("text-[#3a7bfd]");
      });
    });
  });
};

const removeHidden = () => {
  const allTodoLists = document.querySelectorAll(".todo-list");
  allTodoLists.forEach((todo) => {
    if (todo.classList.contains("hidden")) todo.classList.remove("hidden");
  });
};

const active = () => {
  removeHidden();

  const addHidden = (todo) => {
    todo.classList.add("animate-faderight");

    setTimeout(() => {
      todo.classList.add("hidden");
      todo.classList.remove("animate-faderight");
    }, 500);
  };

  const completeTodos = document.querySelectorAll(".completed");

  completeTodos.forEach((todo) => {
    addHidden(todo);
  });

  const remove = (e) => {
    if (e.target.classList.contains("checkbox")) {
      const checkbox = e.target;
      const completeTodo = checkbox.closest("li");

      if (checkbox.checked) {
        addHidden(completeTodo);
      }
    }
  };

  const func = function (e) {
    remove(e); // Creating a wrapper function to pass 'e' to 'remove'
  };

  // Adding the event listener with the correct function reference
  todoBox.addEventListener("click", func);

  // Removing the event listener with the same function reference
  todoBox.removeEventListener("click", func);

  giveTargetColor();
};

////////////////////
const all = () => {
  removeHidden();

  todoBox.addEventListener("click", removeHidden);
  todoBox.removeEventListener("click", removeHidden);
  giveTargetColor();
};

////////////////////
const complete = () => {
  const addHidden = () => {
    const allTodoLists = document.querySelectorAll(".todo-list");

    allTodoLists.forEach((todo) => {
      if (!todo.classList.contains("completed")) {
        todo.classList.add("hidden");
      }
    });
  };

  removeHidden();
  addHidden();
  // whenever new todolist is through Enter
  inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addHidden();
    }
  });

  const checkBox = (e) => {
    if (e.target.classList.contains("checkbox")) {
      const checkboxes = document.querySelectorAll(".checkbox");
      checkboxes.forEach((check) => {
        if (!check.checked) addHidden();
      });
    }
  };

  const bound = (e) => checkBox(e);

  todoBox.addEventListener("click", bound);
  todoBox.removeEventListener("click", bound);

  giveTargetColor();
};

// Active buttons
activeTodosbtn.forEach((btn) => {
  btn.addEventListener("click", active);
});

// show all Todos buttons
allTodosbtn.forEach((btn) => {
  btn.addEventListener("click", all);
});

// show completed Todos buttons
completeTodosbtn.forEach((btn) => {
  btn.addEventListener("click", complete);
});

// clear completes
clearCompletebtn.addEventListener("click", () => {
  const allCompleteTodos = document.querySelectorAll(".completed");
  allCompleteTodos.forEach((todo) => {
    todo.remove();
  });

  todos = todos.filter((todo) => todo.iscompleted === false);
  showEmptyDiv();
});

//
