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

// Function to check unchecked todos
const itemsleft = () => {
  let count = 0;
  todos.filter((todo) => {
    if (todo.iscompleted === false) count += 1;
  });
  leftTodos.textContent = count;
};

// Function that prepend emptyTodoDiv based on todos array lenght
const showEmptyDiv = (milliSeconds) => {
  if (todos.length === 0) {
    setTimeout(() => {
      todoBox.prepend(emptyTodoDiv);
    }, milliSeconds);
  } else {
    emptyTodoDiv.remove();
  }
};

// show empty Div for active and complete todos filters
const showEmptyDivActive = (boolean, milliSeconds) => {
  const arr = todos.filter((todo) => todo.iscompleted === boolean);

  if (arr.length === 0)
    setTimeout(() => {
      todoBox.prepend(emptyTodoDiv);
    }, milliSeconds);
};

// Function to find the index between targeted Todo and all Todos
const findIndex = (all, targeted) => {
  let index = -1;
  for (let i = 0; i < all.length; i++) {
    if (all[i] === targeted) index = i;
  }
  return index;
};

let todos = [];

// Fuction to add Todo
const addTodo = () => {
  todos.forEach((todo, i) => {
    const todosFromHtml = document.querySelectorAll(".todo-list");
    const todosInArray = Array.from(todosFromHtml);

    if (todo.id === todosInArray[i]?.getAttribute("data-id")) {
      return;
    } else {
      const listItem = document.createElement("li");
      listItem.dataset.id = `${todo.id}`;

      listItem.className =
        "todo-list relative flex items-center w-full py-[0.95rem] px-4 border-b border-bordercolor dark:border-bordercolor-dark transiton-colors duration-500 ease-[cubic-bezier(.37,0,.63,1)] rounded-sm animate-fadeleft";

      listItem.draggable = true;

      listItem.innerHTML = `
        <input type="checkbox"  name="" id="checkbox" class="checkbox absolute top-1/2 left-4 w-[18px] h-[18px] border border-bordercolor dark:border-bordercolor-dark rounded-full -translate-y-1/2 appearance-none outline-none cursor-pointer transition-all duration-500 ease-[cubic-bezier(.37,0,.63,1)] xs:w-6 xs:h-6 checked:bg-gradient-to-t from-[#57ddff] to-[#c058f3] checked:border-none checked:after:absolute checked:after:top-0 checked:after:left-0 checked:after:w-full checked:after:h-full checked:after:content-[''] checked:after:bg-no-repeat checked:after:bg-[50%]"/>
      
      <span class="todo-text flex-grow  ml-7 xs:ml-[2.2rem] text-color dark:text-color-dark transition-colors duration-500 ease-[cubic-bezier(.37,0,.63,1)] focus:outline-none">${todo.title}</span>
      
      <button class="flex [all:unset] cursor-pointer">
        <img src="images/icon-cross.svg" alt=""  class="w-[11px] xs:w-[13px] cursor-pointer delete-btn"/>
      </button>
        `;

      todoBox.insertBefore(listItem, filterList);

      // for some already completed todos that will from on DomLoaded
      if (todo.iscompleted === true) {
        const allTodos = document.querySelectorAll(".todo-list");
        const checkbox = allTodos[i]?.querySelector("#checkbox");
        const todoText = allTodos[i]?.querySelector(".todo-text");

        checkbox.checked = true;
        todoText.classList.add(
          "line-through",
          "text-checkedcolor",
          "dark:text-checkedcolor-dark"
        );
        allTodos[i].classList.add("completed");
      }
    }
  });
  itemsleft();
};

// fuction that will push the todos in array and make Dom Todos based on them
const renderTodo = () => {
  const todoText = inputField.value.trim();
  todos.push({
    id: `${todos.length + 1}`,
    title: todoText,
    iscompleted: false,
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  inputField.value = "";

  addTodo();
  console.log(todos);
};

// Fucntion to perform deletion of a Todo
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

// Fuction to perfrom for completed Todos
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

// give colol based on click and remove from others
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

// remove all hidden todos
const removeHidden = () => {
  const allTodoLists = document.querySelectorAll(".todo-list");
  allTodoLists.forEach((todo) => {
    if (todo.classList.contains("hidden")) todo.classList.remove("hidden");
  });
};

// add hidden and animations
const addHidden = (todo) => {
  todo.classList.add("animate-faderight");

  setTimeout(() => {
    todo.classList.add("hidden");
    todo.classList.remove("animate-faderight");
  }, 500);
};

// For active todos filter
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

// for all Todos filter
const all = () => {
  emptyTodoDiv.remove();
  showEmptyDiv(0);
  giveTargetColor();
  removeHidden();
};

// for completed Todos filter
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

// clear completed Todos
clearCompletebtn.addEventListener("click", () => {
  const allCompleteTodos = document.querySelectorAll(".completed");
  allCompleteTodos.forEach((todo) => {
    todo.remove();
  });

  todos = todos.filter((todo) => todo.iscompleted === false);
  showEmptyDiv();
  localStorage.setItem("todos", JSON.stringify(todos));
});

// Drag and Drop Feature
todoBox.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("todo-list")) {
    console.log("i am clicking the todobx");
    const allTodos = document.querySelectorAll(".todo-list");

    allTodos.forEach((todo) => {
      todo.addEventListener("dragstart", () => {
        setTimeout(() => {
          todo.classList.add("opacity-40", "bg-[#c0c0c0]");
          todo.classList.remove("animate-fadeleft");
        }, 0);
      });
    });

    allTodos.forEach((todo) => {
      todo.addEventListener("dragend", () => {
        console.log("form drag end");
        todo.classList.remove("opacity-40");
        todo.classList.remove("bg-[#c0c0c0]");
      });
    });

    const initdragging = (e) => {
      const draggedTodo = document.querySelector(".opacity-40");

      const draggedTodoSiblings = [
        ...todoBox.querySelectorAll(".todo-list:not(.opacity-40)"),
      ];

      const draggedTodoNextSibling = draggedTodoSiblings.find((todo) => {
        return e.clientY <= todo.offsetTop + todo.offsetHeight / 2;
      });

      console.log(draggedTodoNextSibling);

      todoBox.insertBefore(draggedTodo, draggedTodoNextSibling);
    };

    todoBox.addEventListener("dragover", initdragging);
    todoBox.addEventListener("dragenter", (e) => e.preventDefault());
  }
});

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

// Global EventListners
themeSwitcher.addEventListener("click", () => {
  isDark = !isDark;
  localStorage.setItem("isDark", isDark.toString());

  setTheme(isDark);
});

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

document.addEventListener("DOMContentLoaded", () => {
  // for saved dark mode
  const darkState = localStorage.getItem("isDark");
  setTheme(darkState);

  // for saved todos
  const savedTodos = JSON.parse(localStorage.getItem("todos"));
  savedTodos.forEach((todo) => todos.push(todo));
  showEmptyDiv();

  console.log(todos);
  addTodo();
});

// renamer process
//  if user click more than two times on a text allow the user to rename the todo
// after pressing enter or outside anywhere saved the new text
// find index of the todo which text has been changed and also change his index in the todos array

// Rename Todo
todoBox.addEventListener("click", (e) => {
  if (e.target.classList.contains("todo-text")) {
    e.target.addEventListener("dblclick", (e) => {
      e.target.style.cursor = "text";
      e.target.contentEditable = true;
      e.target.style.outline = "none";
    });

    e.target.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.target.blur();

        // change the title in the todos array
        const editableParentLi = e.target.closest("li");
        const allTodos = document.querySelectorAll(".todo-list");

        const indexToChangeTitle = findIndex(allTodos, editableParentLi);
        todos[indexToChangeTitle].title = e.target.textContent;
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    });

    e.target.addEventListener("blur", (e) => {
      e.target.style.cursor = "default";
      e.target.contentEditable = false;
    });
  }
});

// color issue on first click (serious)
// why code is executed so many times
// some little code can be refactor
