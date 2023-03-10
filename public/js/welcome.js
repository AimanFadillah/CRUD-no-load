
let formCreate = document.querySelector("#formCreate");
let kirim = document.querySelector("#kirim");
let wadahPeduduk = document.querySelector("#wadahPenduduk");
let showModal = document.querySelector("#isiModalShow")
let loading = document.querySelector("#loading");
let cari = document.querySelector("#cari");
let cariTombol = document.querySelector("#cariTombol");
let isScrolling;
let formEdit = document.querySelector("#formEdit");
let page = 1;
let old = 0;

dataPenduduk(page,cari.value);

formCreate.addEventListener("submit", (e) => {
    e.preventDefault();
    kirim.disabled = true;

    fetch("/penduduk",{
        method: 'post',
        body: new FormData(formCreate),
        headers : {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        }
    })
    .then( () => {
        wadahPeduduk.innerHTML = '';
        page = 1
        dataPenduduk(page,cari.value);
        window.addEventListener('scroll', scrollHandler);
        wadahPeduduk.style.height = "auto";
        kirim.disabled = false;
    })
})

cariTombol.addEventListener("click",(e) => {
    e.preventDefault();
    wadahPeduduk.style.height = `${wadahPeduduk.offsetHeight}px`;
    wadahPeduduk.innerHTML = '';
    page = 1
    dataPenduduk(page,cari.value);
    window.addEventListener('scroll', scrollHandler);
    wadahPeduduk.style.height = "auto";
    kirim.disabled = false;
})

function dataPenduduk (page,cari) {
    loading.classList.remove("d-none")
    fetch(`/penduduk/data?page=${page}&c=${cari}`)
    .finally( () => {
        loading.classList.add("d-none")
    })
    .then(hasil => hasil.json())
    .then(array => {
        let hasil = array.data;
        if(hasil.length ===  30){
            for(data of hasil){
                let time = new Date(data.created_at);
                let li = document.createElement("li");
                li.classList.add("list-group-item");
                li.classList.add("d-flex");
                li.classList.add("justify-content-between");
                li.classList.add("align-items-start");
                li.id = data.id;
                li.innerHTML = 
                `
                <div class="ms-2 me-auto">
                <div class="fw-bold">${data.nama}</div>
                ${time.getDate()}-${time.getMonth()}-${time.getFullYear()}
                </div>
                <button class="showButton mt-1 badge bg-primary border-0 rounded-pill" data-bs-toggle="modal" data-Penduduk=${data.id} data-bs-target="#showModal">Show</button>
                <button class="editButton mt-1 border-0 mx-1 bg-warning rounded-pill badge" data-bs-toggle="modal" data-bs-target="#editModal" data-Penduduk=${data.id} >Edit</button>
                <form id="hapusForm">
                <input type="hidden" name="_method" value="DELETE" >
                <button class="deleteButton border-0 bg-danger rounded-pill badge" type="submit" data-Penduduk=${data.id} >Hapus</button>
                </form>
                `
                wadahPeduduk.appendChild(li);
            }
        }else if (hasil.length !== 30){
            for(data of hasil){
                let time = new Date(data.created_at);
                let li = document.createElement("li");
                li.classList.add("list-group-item");
                li.classList.add("d-flex");
                li.classList.add("justify-content-between");
                li.classList.add("align-items-start");
                li.id = data.id;
                li.innerHTML = 
                `
                <div class="ms-2 me-auto">
                <div class="fw-bold">${data.nama}</div>
                ${time.getDate()}-${time.getMonth()}-${time.getFullYear()}
                </div>
            <button class="showButton mt-1 badge bg-primary border-0 rounded-pill" data-bs-toggle="modal" data-Penduduk=${data.id} data-bs-target="#showModal">Show</button>
            <button class="editButton mt-1 border-0 mx-1 bg-warning rounded-pill badge" data-bs-toggle="modal" data-bs-target="#editModal" data-Penduduk=${data.id} >Edit</button>
            <form id="hapusForm">
            <input type="hidden" name="_method" value="DELETE" >
            <button class="deleteButton border-0 bg-danger rounded-pill badge" type="submit" data-Penduduk=${data.id} >Hapus</button>
            </form>
            `
            wadahPeduduk.appendChild(li);
            }
            window.removeEventListener('scroll', scrollHandler);
        }
        else {
            window.removeEventListener('scroll', scrollHandler);
        }
    })
}



document.addEventListener("click",function (e) {

    if(e.target.classList.contains("showButton")){
        showModal.innerHTML = `
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        `;
        let id = e.target.getAttribute("data-Penduduk");
        fetch("/penduduk/data?s=" + id)
            .then(hasil => hasil.json())
            .then(hasil => {
               showModal.innerHTML = 
               `
               <ul class="list-group" >
                    <li class="list-group-item fw-bold text-primary">${hasil.nama}</li>
                    <li class="list-group-item">${hasil.umur}</li>
                    <li class="list-group-item">${hasil.jabatan}</li>
                </ul>
               `; 
            })  
    }

    if(e.target.classList.contains("deleteButton")){
        let deleteButton = e.target.classList.contains("deleteButton");
        e.preventDefault();
        e.target.disabled = true;
        let hapusForm = document.querySelector("#hapusForm");
        id = e.target.getAttribute("data-penduduk");
        loading.classList.remove("d-none")
        fetch(`/penduduk/${id}/`,{
            method:"post",
            body : new FormData(hapusForm),
            headers : {
                "X-CSRF-TOKEN" : document.querySelector(`meta[name="csrf-token"]`).getAttribute("content"),
                "X-HTTP-Method-Overidden":"DELETE",
            },
        })
        .then(() => {
            let penduduk = document.getElementById(id);
            wadahPeduduk.removeChild(penduduk);
            deleteButton.disabled = true;
            loading.classList.add("d-none")
        }) 
      
    }

    if(e.target.classList.contains("editButton")){
        let id = e.target.getAttribute("data-Penduduk");
        formEdit.innerHTML = 
        `
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        `;
       
        fetch(`/penduduk/data?s=` +  id)
            .then(hasil => hasil.json())
            .then(hasil => {
                formEdit.innerHTML = `
                <input type="hidden" name="_method" value="PUT" >
                <div class="mb-3">
                    <label for="nama" class="form-label">Nama</label>
                    <input type="nama" required value="${hasil.nama}" name="nama" id="nama" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="umur" class="form-label">umur</label>
                    <input type="nama" required value="${hasil.umur}" name="umur" id="umur" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="jabatan" class="form-label">jabatan</label>
                    <input type="nama" required value="${hasil.jabatan}" name="jabatan" id="jabatan" class="form-control">
                </div>
                <button class="update btn btn-primary" id="update" data-Penduduk="${hasil.id}" type="submit" data-bs-dismiss="modal" >Kirim</button>
                `
            })
    }

    if(e.target.classList.contains("update")){
        let updateButton = e.target.classList.contains("update");
        updateButton.disabled = true;
        loading.classList.remove("d-none")
        e.preventDefault();
        let id = e.target.getAttribute("data-Penduduk");
        fetch(`/penduduk/${id}/`,{
            method: "post",
            body: new FormData(formEdit),
            headers:{
                "X-CSRF-TOKEN" : document.querySelector(`meta[name="csrf-token"]`).getAttribute("content"),
                "X-HTTP-Method-Overidden" : "PUT"
            },
        })
        .then(hasil => hasil.json())
        .finally( () =>  loading.classList.add("d-none") )
        .then( (data) => {
            let penduduk = document.getElementById(data.id);
            let time =  new Date(data.created_at);
            penduduk.innerHTML = 
            `
            <div class="ms-2 me-auto">
            <div class="fw-bold">${data.nama}</div>
            ${time.getDate()}-${time.getMonth()}-${time.getFullYear()}
            </div>
            <button class="showButton mt-1 badge bg-primary border-0 rounded-pill" data-bs-toggle="modal" data-Penduduk=${data.id} data-bs-target="#showModal">Show</button>
            <button class="editButton mt-1 border-0 mx-1 bg-warning rounded-pill badge" data-bs-toggle="modal" data-bs-target="#editModal" data-Penduduk=${data.id} >Edit</button>
            <form id="hapusForm">
            <input type="hidden" name="_method" value="DELETE" >
            <button class="deleteButton border-0 bg-danger rounded-pill badge" type="submit" data-Penduduk=${data.id} >Hapus</button>
            </form>
            `;
            updateButton.disabled = false;
        })
    
       
    }
    
    
})





function scrollHandler () {
    if (isScrolling) {
        window.clearTimeout(isScrolling);
    }
    isScrolling = setTimeout(function() {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
        page++;
        dataPenduduk(page,cari.value);
        wadahPeduduk.style.height = "auto";
    }
    }, 200);
};

window.addEventListener('scroll', scrollHandler);
