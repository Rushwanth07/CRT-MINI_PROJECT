package auction_system.config;

import auction_system.entity.User;
import auction_system.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    public AdminInitializer(
            UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {

        if (!userRepository.existsByEmail(
                "admin@rsauctions.com"
        )) {

            User admin = User.builder()
                    .name("Administrator")
                    .email("admin@rsauctions.com")
                    .password("admin123")
                    .role("ADMIN")
                    .createdAt(LocalDateTime.now())
                    .build();

            userRepository.save(admin);

            System.out.println(
                    "Default Admin Created"
            );
        }
    }
}