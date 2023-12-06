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
const emptyTodoDiv = document.querySelector("#empty-todo");
const filterList = document.querySelector("#filter-list");
const themeSwitcher = document.querySelector(".theme-switcher");
const backgroundBanner = document.querySelector(".background-banner");
const leftTodos = document.querySelector(".left-todos");
const allTodosbtn = document.querySelectorAll(".all-todos");
const activeTodosbtn = document.querySelectorAll(".active-todos");
const completeTodosbtn = document.querySelectorAll(".completed-todos");
const clearCompletebtn = document.querySelector(".clear-complete");
const allFilterbtns = document.querySelectorAll(".filter-btns");
const body = document.querySelector("body");

// Dark mode
let isDark = false;

const setTheme = (theme) => {
  if (theme === true || theme === "true") {
    body.classList.add("dark");
    backgroundBanner.src = "images/bg-desktop-dark.jpg";
    themeSwitcher.src = "images/icon-sun.svg";
  } else {
    body.classList.remove("dark");
    backgroundBanner.src = "images/bg-desktop-light.jpg";
    themeSwitcher.src = "images/icon-moon.svg";
  }
};

themeSwitcher.addEventListener("click", () => {
  isDark = !isDark;
  localStorage.setItem("isDark", isDark.toString());

  setTheme(isDark);
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
  todos.forEach((todo) => {
    const listItem = document.createElement("li");
    listItem.className =
      "todo-list relative flex items-center w-full py-[0.95rem] px-4 border-b border-bordercolor dark:border-bordercolor-dark transiton-colors duration-500 ease-[cubic-bezier(.37,0,.63,1)] rounded-sm animate-fadeleft";

    listItem.innerHTML = `
      <input type="checkbox" name="" id="checkbox" class="checkbox absolute top-1/2 left-4 w-[18px] h-[18px] border border-bordercolor dark:border-bordercolor-dark rounded-full -translate-y-1/2 appearance-none outline-none cursor-pointer transition-all duration-500 ease-[cubic-bezier(.37,0,.63,1)] xs:w-6 xs:h-6 checked:bg-gradient-to-t from-[#57ddff] to-[#c058f3] checked:border-none checked:after:absolute checked:after:top-0 checked:after:left-0 checked:after:w-full checked:after:h-full checked:after:content-[''] checked:after:bg-no-repeat checked:after:bg-[50%]"/>
    
    <span class="flex-grow  ml-7 xs:ml-[2.2rem] text-color dark:text-color-dark transition-colors duration-500 ease-[cubic-bezier(.37,0,.63,1)]">${todo.title}</span>
    
    <button class="flex [all:unset] cursor-pointer">
      <img src="images/icon-cross.svg" alt=""  class="w-[11px] xs:w-[13px] cursor-pointer delete-btn"/>
    </button>
      `;

    todoBox.append(listItem);
    itemsleft();
  });
};

const renderTodo = () => {
  const todoText = inputField.value.trim();
  todos.push({ id: todos.length + 1, title: todoText, iscompleted: false });
  localStorage.setItem("todos", JSON.stringify(todos));
  inputField.value = "";

  console.log(todos);
};

const showEmptyDiv = (milliSeconds) => {
  if (todos.length === 0)
    setTimeout(() => {
      todoBox.prepend(emptyTodoDiv);
    }, milliSeconds);
};

document.addEventListener("DOMContentLoaded", () => {
  const darkState = localStorage.getItem("isDark");
  setTheme(darkState);

  // showEmptyDiv();
  const savedTodos = JSON.parse(localStorage.getItem("todos"));
  console.log("before", todos);
  savedTodos.forEach((todo) => {
    // addTodo();
  });
  console.log("after", todos);
});

const showEmptyDivActive = (boolean, milliSeconds) => {
  const arr = todos.filter((todo) => todo.iscompleted === boolean);

  if (arr.length === 0)
    setTimeout(() => {
      todoBox.prepend(emptyTodoDiv);
    }, milliSeconds);
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

  if (e.target.classList.contains("delete-btn")) {
    itemTodelete.classList.add("animate-faderight");

    itemTodelete.addEventListener("animationend", () => {
      itemTodelete.remove();
    });

    const index = findIndex(allTodos, itemTodelete);
    if (index != -1) todos.splice(index, 1);
  }
  itemsleft();
  showEmptyDiv(500);
  localStorage.setItem("todos", JSON.stringify(todos));
};

// complete Todo
const completeTodo = (e) => {
  const text = e.target.nextElementSibling;
  const targetTodo = e.target.closest("li");
  const allTodos = document.querySelectorAll(".todo-list");

  if (e.target.classList.contains("checkbox")) {
    const index = findIndex(allTodos, targetTodo);

    if (e.target.checked) {
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
  localStorage.setItem("todos", JSON.stringify(todos));
};

document.querySelector("#input-field").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && inputField.value != "") {
    renderTodo();

    emptyTodoDiv.remove();
    console.log("from eventLsitener");
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
  console.log("from target colors function");
};

const removeHidden = () => {
  const allTodoLists = document.querySelectorAll(".todo-list");
  allTodoLists.forEach((todo) => {
    if (todo.classList.contains("hidden")) todo.classList.remove("hidden");
  });
};

const addHidden = (todo) => {
  todo.classList.add("animate-faderight");

  setTimeout(() => {
    todo.classList.add("hidden");
    todo.classList.remove("animate-faderight");
  }, 500);
};

const active = () => {
  emptyTodoDiv.remove();
  showEmptyDivActive(false, 0);
  giveTargetColor();
  removeHidden();

  const completeTodos = document.querySelectorAll(".completed");

  completeTodos.forEach((todo) => {
    addHidden(todo);
  });

  const removeCompletedTodos = (e) => {
    activeTodosbtn.forEach((btn) => {
      const hasColor = btn.classList.contains("text-[#3a7bfd]");

      if (
        e.target.classList.contains("checkbox") &&
        e.target.checked &&
        hasColor
      ) {
        console.log("from active single");
        const completeTodo = e.target.closest("li");
        addHidden(completeTodo);
        showEmptyDivActive(false, 500);
      }
    });
  };

  todoBox.addEventListener("click", (e) => {
    removeCompletedTodos(e);
  });
};

////////////////////
const all = () => {
  emptyTodoDiv.remove();
  showEmptyDiv(0);
  giveTargetColor();
  removeHidden();
};

////////////////////
const complete = () => {
  emptyTodoDiv.remove();
  showEmptyDivActive(true, 0);
  giveTargetColor();

  const addHiddenComplete = () => {
    const allTodoLists = document.querySelectorAll(".todo-list");

    allTodoLists.forEach((todo) => {
      if (!todo.classList.contains("completed")) {
        addHidden(todo);
      }
    });
  };

  removeHidden();
  addHiddenComplete();

  const hasColor = () => {
    let giveBoolean;
    completeTodosbtn.forEach((btn) => {
      if (btn.classList.contains("text-[#3a7bfd]")) {
        giveBoolean = true;
      }
    });
    console.log(giveBoolean);
    return giveBoolean;
  };

  const checkKey = (e) => {
    if (e.key === "Enter" && hasColor()) {
      console.log("from complete");
      addHiddenComplete();
      showEmptyDivActive(true, 500);
    }
  };

  // whenever new todolist is through Enter
  inputField.addEventListener("keydown", (e) => {
    checkKey(e);
  });

  // Whenever todolist is toggle from checked to unchecked
  const checkChecbox = (e) => {
    if (
      e.target.classList.contains("checkbox") &&
      !e.target.checked &&
      hasColor()
    ) {
      console.log("from toggle complete");
      e.target.closest("li").classList.add("hidden");
      showEmptyDivActive(true, 0);
    }
  };

  todoBox.addEventListener("click", (e) => {
    checkChecbox(e);
  });
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
  localStorage.setItem("todos", JSON.stringify(todos));
});

// color issue on first click (serious)
// why code is executed so many times
// some little code can be refactor

/////
// i just want to run
