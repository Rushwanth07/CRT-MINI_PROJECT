package auction_system.dto;

import lombok.Data;

@Data
public class BidRequest {

    private Long auctionId;
    private Long userId;
    private Double bidAmount;
}