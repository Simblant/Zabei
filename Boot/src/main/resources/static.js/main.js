// users tables
$(document).ready(table())

function table() {
    fetch("http://localhost:8080/admin/users").then(
        res => {
            res.json().then(
                data => {
                    console.log(data);
                    if (data.length > 0) {
                        let temp = "";
                        temp += "<tr>";
                        data.forEach((user) => {
                            temp += "<td>" + user.id + "</td>";
                            temp += "<td>" + user.name + "</td>";
                            temp += "<td>" + user.password + "</td>";
                            temp += "<td>" + user.age + "</td>";

                            temp += '<td id="' + user.id + '">' +
                                '<input type="button" onclick="editModal(id)" ' +
                                'class="btn btn-primary" id="' + user.id + '"' +
                                'value="Edit"/></td>';
                            temp += '<td id="' + user.id + '">' +
                                '<input type="button" onclick="deleteModal(id)" ' +
                                'class="btn btn-danger" id="' + user.id + '"' +
                                'value="Delete"/></td>';
                            temp += "</tr>";
                        });
                        document.getElementById("tableJS").innerHTML = temp;
                    }
                }
            )
        }
    )

    fetch("http://localhost:8080/admin/role/", {method: 'GET'})
        .then(res => res.json())
        .then(roles => {
            $('#createRoles option').remove();
            roles.forEach((roles) => {
                $('#createRoles').append('<option>' + roles.role + '</option>');
            })
        })
}

//edit user
function editModal(userId) {

    let urlUser = "http://localhost:8080/admin/user/" + userId;

    $('.editForm #edit').modal('show');

    fetch(urlUser, {method: 'GET'})
        .then(res => res.json())
        .then(user => {
            document.getElementById('editID').value = `${user.id}`;
            document.getElementById('editName').value = `${user.name}`;
            document.getElementById('editPassword').value = `${user.password}`;
            document.getElementById('editAge').value = `${user.age}`;
        })

    fetch("http://localhost:8080/admin/role", {method: 'GET'})
        .then(res => res.json())
        .then(roles => {
            $('#editRoles option').remove();
            roles.forEach((roles) => {
                $('#editRoles').append('<option>' + roles.role + '</option>');
            })
        })

    document.getElementById('editModal')
        .addEventListener("submit", function (event) {
            event.preventDefault();
            let editUser = new FormData(event.target);
            let user = {};

            editUser.forEach((value, key) =>
                user[key] = value);

//вытаскиваем роли из селекта и фильтруем
            let role = $("#editRoles option:selected").text();
            if (role === 'ROLE_USERROLE_ADMIN') {
                user['roles'] = [{"id": 1, "name": "ROLE_USER", "authority": "ROLE_USER"},
                    {"id": 2, "name": "ROLE_ADMIN", "authority": "ROLE_ADMIN"}]
            } else if (role === 'ROLE_ADMIN') {
                user['roles'] = [{"id": 2, "name": "ROLE_ADMIN", "authority": "ROLE_ADMIN"}]
            } else {
                user['roles'] = [{"id": 1, "name": "ROLE_USER", "authority": "ROLE_USER"}]
            }

            fetch(urlUser, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then(() => {
                $('.editForm #edit').modal('hide');
                $("#allTable").load(table());
            })
        });
}

//delete user
function deleteModal(userId) {
    let urlUser = "http://localhost:8080/admin/user/" + userId;

    $('.deleteForm #delete').modal('show');

    fetch(urlUser, {method: 'GET'})
        .then(res => res.json())
        .then(user => {
            user.id = userId;
            document.getElementById('deleteID').value = `${user.id}`;
            document.getElementById('deleteName').value = `${user.name}`;
            document.getElementById('deletePassword').value = `${user.password}`;
            document.getElementById('deleteAge').value = `${user.age}`;
            $('#deleteRoles').prop('disabled', true);
            $('#deleteRoles option').remove();
            user.roles.forEach((roles) => {
                $('#deleteRoles').append('<option >' + roles.role + '</option>');
            })
        })

    document.getElementById('deleteModal')
        .addEventListener("submit", function (event) {
            event.preventDefault();
            fetch(urlUser, {
                method: 'DELETE'
            }).then(() => {
                $('.deleteForm #delete').modal('hide');
                $("#allTable").load(table());
            }).catch(err => {
                console.error(err)
            });
        });
}

//new user
$(document).ready(newUser())

function newUser() {
    let urlUser = "http://localhost:8080/admin/user";
    document.getElementById('create')
        .addEventListener("submit", function (event) {
            event.preventDefault();
            let editUser = new FormData(event.target);
            let user = {};

            editUser.forEach((value, key) =>
                user[key] = value);

            let role = $("#roles option:selected").text();

            if (role === 'ROLE_USERROLE_ADMIN') {
                user['roles'] = [{"id": 1, "name": "ROLE_USER", "authority": "ROLE_USER"},
                    {"id": 2, "name": "ROLE_ADMIN", "authority": "ROLE_ADMIN"}]
            } else if (role === 'ROLE_ADMIN') {
                user['roles'] = [{"id": 2, "name": "ROLE_ADMIN", "authority": "ROLE_ADMIN"}]
            } else {
                user['roles'] = [{"id": 1, "name": "ROLE_USER", "authority": "ROLE_USER"}]
            }

            fetch(urlUser, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then(() => {
                $('#userTab a[href="#table"]').tab('show');
                $("#allTable").load(table());
            })
        });
}