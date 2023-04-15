let API_URL = "http://localhost:8880";
const getAllData = async () => {
  const response = await fetch(`${API_URL}/images`, {
    method: "GET",
    headers: {
      "accept": "application/json",
    },
    });
    const data = await response.json()
    dataRender(data)
}
getAllData();




function dataRender(data = []){
    data.forEach((e) =>{
        const card = document.createElement('div')
        card.setAttribute('class', 'card')
        card.innerHTML = `
        <div class = "card-top">
        <img class="icon" src=${e.thumbnailUrl}>
        <h2 class="card-title">${e.title}</h2>
        </div>
         <div class="editDelete">
                <button class="deleteimg" data-del=${e.id}>Delete</button>
                <button class="Editimg">Edit</button>
            </div>
        <img class="card-img" src=${e.url}>
        `;

        $("#root").appendChild(card);
    })
}


$("#addData").addEventListener("click", (e) => {
  e.preventDefault();
  $("#modalWindow").style.display = "flex";
});

function hideModal() {
  $("#modalWindow").style.display = "none";
}

$("#closeModalCard").addEventListener("click", (e) => {
  hideModal();
});


function postData(){
    const title = $("#title").value.trim();
    const iconUrl = $("#iconUrl").value.trim();
    const imageUrl = $("#imageUrl").value.trim();


    fetch(`${API_URL}/images`, {
      method: "POST",
      headers: {
        "accept": "application/json",
      },
      body: JSON.stringify({
        title: title,
        url: imageUrl,
        thumbnailUrl: imageUrl,
      }),
    });
}

$(".modalButton").addEventListener('click', (e)=>{
  postData()
});


$("#root").addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteimg")) {
    const id = e.target.getAttribute("data-del");
    fetch(`${API_URL}/images/${id}`, {
      method: "DELETE",
      headers: {
        "accept": "application/json",
      },
      body: JSON.stringify({}),
    });
  }
});