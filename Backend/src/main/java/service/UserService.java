package auction_system.service;

import auction_system.dto.LoginRequest;
import auction_system.dto.RegisterRequest;
import auction_system.entity.User;
import auction_system.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(
            UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    public User register(
            RegisterRequest request
    ) {

        if (
                userRepository.existsByEmail(
                        request.getEmail()
                )
        ) {
            throw new RuntimeException(
                    "Email already exists"
            );
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword())
                .role(request.getRole())
                .createdAt(LocalDateTime.now())
                .build();

        return userRepository.save(user);
    }

    public User login(
            LoginRequest request
    ) {

        User user =
                userRepository.findByEmail(
                                request.getEmail()
                        )
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "User not found"
                                        )
                        );

        if (
                !user.getPassword().equals(
                        request.getPassword()
                )
        ) {

            throw new RuntimeException(
                    "Invalid password"
            );

        }

        return user;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}