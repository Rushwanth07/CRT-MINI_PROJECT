package auction_system.controller;

import auction_system.dto.LoginRequest;
import auction_system.dto.RegisterRequest;
import auction_system.entity.User;
import auction_system.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;

    public AuthController(
            UserService userService
    ) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(
            @RequestBody RegisterRequest request
    ) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public User login(
            @RequestBody LoginRequest request
    ) {
        return userService.login(request);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(
            @PathVariable Long id
    ) {

        userService.deleteUser(id);

        return "User deleted successfully";
    }
}