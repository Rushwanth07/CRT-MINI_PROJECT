package auction_system.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AuctionRequest {

    private String title;
    private String description;
    private Double startingPrice;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String imageUrl;

    private Long sellerId;
}