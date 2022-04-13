//package cmex.i965.controllers;
//
//import cmex.i965.models.User;
//import cmex.i965.services.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.web.bind.annotation.PatchMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//
//@Controller
//@RequestMapping("/admin")
//public class AdminController {
//
//    private final UserService userService;
//
//    @Autowired
//    public AdminController(UserService userService) {
//        this.userService = userService;
//    }
//
//    @GetMapping()
//    public String index(@ModelAttribute User user, Model model) {
//        model.addAttribute("users", userService.index());
//        model.addAttribute("roles", userService.getRoles());
//        return "index";
//    }
//
//    @PostMapping()
//    public String save(@ModelAttribute User user) {
//        userService.save(user);
//        return "redirect:/admin";
//    }
//
//    @PatchMapping("/{id}")
//    public String update(@ModelAttribute User user) {
//        userService.update(user);
//        return "redirect:/admin";
//    }
//
//    @DeleteMapping("/{id}")
//    public String delete(@PathVariable int id) {
//        userService.delete(id);
//        return "redirect:/admin";
//    }
//}