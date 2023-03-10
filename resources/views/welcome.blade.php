<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CRUD NO LOAD</title>
    <meta name="csrf-token" content="{{ csrf_token() }}" >
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
  </head>
  <body>

    <div class="container mt-3">
        <h3>CRUD no load</h3>
        <div class="d-flex">
            <button type="button" class="badge border-0 shadow bg-primary mt-3" data-bs-toggle="modal" data-bs-target="#createModal">
                Create
            </button>
        </div>
        <div class="input-group mt-4">
            <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2">
            <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
          </div>
        
            <div class="d-flex justify-content-center"  id="loading" style="margin-top: 100px;position:fixed;z-index:999;left:20%;right:20%;" >
                <div class="spinner-border text-primary" style="width: 6rem; height: 6rem;" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>


        <ol class="list-group list-group-numbered mt-3 mb-5" id="wadahPenduduk" >
           
        </ol>
    </div>



    <!-- Create Modal -->
    <div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h1 class="modal-title fs-5" id="createModal">Create Penduduk</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formCreate" >
                    @csrf
                    <div class="mb-3">
                        <label for="nama" class="form-label">Nama</label>
                        <input type="nama" name="nama" id="nama" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="umur" class="form-label">umur</label>
                        <input type="nama" name="umur" id="umur" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="jabatan" class="form-label">jabatan</label>
                        <input type="nama" name="jabatan" id="jabatan" class="form-control">
                    </div>
                    <button class="btn btn-primary" id="kirim" type="submit" data-bs-dismiss="modal" >Kirim</button>
                </form>
            </div>
        </div>
        </div>
    </div>

    {{-- Show Modal --}}
    <div class="modal fade" id="showModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-body border-0 rounded" id="isiModalShow">
                <ul class="list-group" >
                    <li class="list-group-item fw-bold">Budi</li>
                    <li class="list-group-item">A second item</li>
                    <li class="list-group-item">A third item</li>
                  </ul>
            </div>
        </div>
        </div>
    </div>

    <!-- Edit Modal -->
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body">
                <form id="formEdit" >
                   
                </form>
            </div>
        </div>
        </div>
    </div>




    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
    <script src="{{ asset("js/welcome.js") }}" ></script>

</body>
</html>