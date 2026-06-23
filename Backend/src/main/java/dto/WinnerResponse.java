package auction_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WinnerResponse {

    private Long auctionId;
    private String auctionTitle;

    private Long winnerId;
    private String winnerName;

    private Double winningBid;
}