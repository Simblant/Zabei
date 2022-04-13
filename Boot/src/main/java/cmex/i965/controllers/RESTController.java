package cmex.i965.controllers;

import cmex.i965.models.User;
import cmex.i965.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class RESTController {

    private final UserService userService;

    @Autowired
    public RESTController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> index() {
        return userService.index();
    }

    @GetMapping("/getUser/{id}")
    public User getUser(@PathVariable int id) {
        return userService.show(id);
    }

    @PostMapping("/user")
    public User save(@RequestBody User user) {
        userService.save(user);
        return user;
    }

    @PutMapping("/user/{id}")
    public User update(@PathVariable int id, @RequestBody User user) {
        userService.update(user);
        return userService.show(id);
    }

    @DeleteMapping("/user/{id}")
    public void delete(@PathVariable int id) {
        userService.delete(id);
    }
}
