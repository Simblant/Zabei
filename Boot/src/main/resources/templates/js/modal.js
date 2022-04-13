//users tables
$(document).ready(table())
function table() {
    fetch("http://localhost:8080/admin/users").then(
        res => {
            res.json().then(
                data => {
                    console.log(data);
                    if (data.length > 0) {
                        let temp = "";
                        data.forEach((user) => {
                            temp += "<tr id='"+ user.id+"'>";
                            temp += "<td>" + user.id + "</td>";
                            temp += "<td>" + user.name + "</td>";
                            temp += "<td>" + user.password + "</td>";
                            temp += "<td>" + user.age + "</td>";

                            temp += "<td>";
                            user.roleSet.forEach((role) => {
                                temp += role.name + " ";
                            })
                            temp += "</td>";
                            temp += '<td id="' + user.id + '">' +
                                '<input type="button" onclick="editModal(id)" ' +
                                'class="btn btn-primary" id="' + user.id +'"' +
                                'value="Edit"/></td>';
                            temp += '<td id="' + user.id + '">' +
                                '<input type="button" onclick="deleteModal(id)" ' +
                                'class="btn btn-danger" id="' + user.id +'"'+
                                'value="Delete"/></td>';
                            temp += "</tr>";
                        });
                        document.getElementById("myTableUsers").innerHTML = temp;
                    }
                }
            )
        }
    )

    fetch("http://localhost:8080/admin/role/", {method: 'GET'})
        .then(res => res.json())
        .then(role => {
            $('#createRoles option').remove();
            role.forEach((role) => {
                $('#createRoles').append('<option>' + role.name + '</option>');
            })
        })
}

//edit user
function editModal(userId) {

    let urlUser = "http://localhost:8080/admin/user/" + userId;

    $('.editForm #exampleModal').modal();

    fetch(urlUser, {method: 'GET'})
        .then(res => res.json())
        .then(user => {
            document.getElementById('idEdit').value = `${user.id}`;
            document.getElementById('firstNameEdit').value = `${user.name}`;
            document.getElementById('lastNameEdit').value = `${user.password}`;
            document.getElementById('ageEdit').value = `${user.age}`;
        })

    fetch("http://localhost:8080/admin/role/", {method: 'GET'})
        .then(res => res.json())
        .then(role => {
            $('#rolesSetEdit option').remove();
            role.forEach((role) => {
                $('#rolesSetEdit').append('<option>' + role.name + '</option>');
            })
        })

    document.getElementById('editUserModal')
        .addEventListener("submit", function (event) {
            event.preventDefault();
            let editUser = new FormData(event.target);
            let user = {};

            editUser.forEach((value, key) =>
                user[key] = value);

//вытаскиваем роли из селекта и фильтруем
            let role = $("#rolesSetEdit option:selected").text();
            if (role === 'ROLE_ADMINROLE_USER') {
                user['roleSet'] = [{"id":1,"name":"ROLE_ADMIN","authority":"ROLE_ADMIN"},
                    {"id":2,"name":"ROLE_USER","authority":"ROLE_USER"}]
            } else if(role === 'ROLE_ADMIN'){
                user['roleSet'] = [{"id":1,"name":"ROLE_ADMIN","authority":"ROLE_ADMIN"}]
            } else {
                user['roleSet'] = [{"id":2,"name":"ROLE_USER","authority":"ROLE_USER"}]
            }

            fetch(urlUser, {
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(user)
            }).then(() => {
                $('.editForm #exampleModal').modal('hide');
                $("#allUsersTable").load(table());
            })
        });
}

//delete user
function deleteModal(userId) {
    let urlUser = "http://localhost:8080/admin/user/" + userId;

    $('.deleteForm #exampleModalDelete').modal('show');

    fetch(urlUser, {method: 'GET'})
        .then(res => res.json())
        .then(user => {
            document.getElementById('idDelete').value = `${user.id}`;
            document.getElementById('firstNameDelete').value = `${user.name}`;
            document.getElementById('lastNameDelete').value = `${user.password}`;
            document.getElementById('ageDelete').value = `${user.age}`;
            $('#roleSetDelete').prop('disabled', true);
            $('#roleSetDelete option').remove();
            user.roleSet.forEach((role) => {
                $('#roleSetDelete').append('<option >' + role.name + '</option>');
            })
        })

    document.getElementById('deleteUserModal')
        .addEventListener("submit", function (event) {
            event.preventDefault();
            fetch(urlUser, {
                method: 'DELETE'
            }).then(() => {
                $('.deleteForm #exampleModalDelete').modal('hide');
                $("#allUsersTable").load(table());
            }).catch(err => {
                console.error(err)
            });
        });
}

//new user
$(document).ready(function () {
    let urlUser = "http://localhost:8080/admin/user/";
    document.getElementById('createUser')
        .addEventListener("submit", function (event) {
            event.preventDefault();
            let editUser = new FormData(event.target);
            let user = {};

            editUser.forEach((value, key) =>
                user[key] = value);

            let role = $("#createRoles option:selected").text();

            if (role === 'ROLE_ADMINROLE_USER') {
                user['roleSet'] = [{"id":1,"name":"ROLE_ADMIN","authority":"ROLE_ADMIN"},
                    {"id":2,"name":"ROLE_USER","authority":"ROLE_USER"}]
            } else if(role === 'ROLE_ADMIN'){
                user['roleSet'] = [{"id":1,"name":"ROLE_ADMIN","authority":"ROLE_ADMIN"}]
            } else {
                user['roleSet'] = [{"id":2,"name":"ROLE_USER","authority":"ROLE_USER"}]
            }

            fetch(urlUser, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(user)
            }).then(() => {
                $('#myTab a[href="#users"]').tab('show');
                $("#allUsersTable").load(table());
            })

        });
})