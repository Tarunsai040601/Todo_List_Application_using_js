// inputs
let input_01 = document.createElement("input");
let input_02 = document.createElement("input");

input_01.placeholder = "Enter Name";
input_02.placeholder = "Enter Age";

// button
let btn = document.createElement("button");
btn.innerText = "Submit";

// container
let container = document.createElement("div");

// display div
let displayDiv = document.createElement("div");

// edit index
let editIndex = -1;

// 🌟 container styling
container.style.width = "300px";
container.style.margin = "50px auto";
container.style.padding = "20px";
container.style.borderRadius = "10px";
container.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.2)";
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.gap = "10px";
container.style.backgroundColor = "#f9f9f9";

// 🌟 input styling
[input_01, input_02].forEach(input => {
  input.style.padding = "8px";
  input.style.borderRadius = "5px";
  input.style.border = "1px solid gray";
  input.style.outline = "none";
});

// 🌟 button styling
btn.style.padding = "8px";
btn.style.border = "none";
btn.style.borderRadius = "5px";
btn.style.backgroundColor = "black";
btn.style.color = "white";
btn.style.cursor = "pointer";

// hover effect
btn.onmouseover = () => btn.style.backgroundColor = "gray";
btn.onmouseout = () => btn.style.backgroundColor = "black";

// display styling
displayDiv.style.marginTop = "20px";

// 🔥 show data
function showData() {
  let data = JSON.parse(localStorage.getItem("UsersData")) || [];

  displayDiv.innerHTML = "";

  data.forEach((item, i) => {
    let card = document.createElement("div");

    card.style.padding = "10px";
    card.style.borderRadius = "8px";
    card.style.boxShadow = "0px 2px 5px rgba(0,0,0,0.2)";
    card.style.marginBottom = "10px";
    card.style.backgroundColor = "white";

    let text = document.createElement("p");
    text.innerText = `👤 ${item.name} | 🎂 ${item.age}`;

    // delete button
    let delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.style.marginRight = "10px";
    delBtn.style.backgroundColor = "red";
    delBtn.style.color = "white";
    delBtn.style.border = "none";
    delBtn.style.padding = "5px";
    delBtn.style.borderRadius = "5px";

    delBtn.onclick = () => {
      data.splice(i, 1);
      localStorage.setItem("UsersData", JSON.stringify(data));
      showData();
    };

    // edit button
    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.style.backgroundColor = "blue";
    editBtn.style.color = "white";
    editBtn.style.border = "none";
    editBtn.style.padding = "5px";
    editBtn.style.borderRadius = "5px";

    editBtn.onclick = () => {
      input_01.value = item.name;
      input_02.value = item.age;
      editIndex = i;
    };

    card.append(text, delBtn, editBtn);
    displayDiv.appendChild(card);
  });
}

// submit action
btn.onclick = () => {
  let name = input_01.value.trim();
  let age = input_02.value.trim();

  if (!name || !age) {
    alert("All fields required ❗");
    return;
  }

  let data = JSON.parse(localStorage.getItem("UsersData")) || [];

  if (editIndex === -1) {
    data.push({ name, age });
  } else {
    data[editIndex] = { name, age };
    editIndex = -1;
  }

  localStorage.setItem("UsersData", JSON.stringify(data));

  input_01.value = "";
  input_02.value = "";

  showData();
};

container.append(input_01, input_02, btn, displayDiv);
document.body.append(container);

showData();