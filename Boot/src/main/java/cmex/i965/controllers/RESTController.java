package cmex.i965.controllers;

import cmex.i965.models.Role;
import cmex.i965.models.User;
import cmex.i965.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RESTController {

    private final UserService userService;

    @Autowired
    public RESTController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin/users")
    public List<User> index() {
        return userService.index();
    }

    @GetMapping("/admin/user/{id}")
    public User show(@PathVariable int id) {
        return userService.show(id);
    }

    @GetMapping("/admin/role")
    public List<Role> roles() {
        return userService.getRoles();
    }

    @PostMapping("/admin/user")
    public void save(@RequestBody User user) {
        userService.save(user);
    }

    @PatchMapping("/admin/user/{id}")
    public void update(@RequestBody User user) {
        userService.update(user);
    }

    @DeleteMapping("/admin/user/{id}")
    public void delete(@PathVariable int id) {
        userService.delete(id);
    }
}
