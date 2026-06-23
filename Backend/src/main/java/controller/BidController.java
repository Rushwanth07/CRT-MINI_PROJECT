package auction_system.controller;

import auction_system.dto.BidRequest;
import auction_system.dto.WinnerResponse;
import auction_system.entity.Bid;
import auction_system.service.BidService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bids")
@CrossOrigin(origins = "http://localhost:5173")
public class BidController {

    private final BidService bidService;

    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    @PostMapping
    public Bid placeBid(@RequestBody BidRequest request) {
        return bidService.placeBid(request);
    }

    @GetMapping("/{auctionId}")
    public List<Bid> getAuctionBids(
            @PathVariable Long auctionId) {

        return bidService.getAuctionBids(auctionId);
    }

    @GetMapping("/winner/{auctionId}")
    public WinnerResponse getWinner(
            @PathVariable Long auctionId) {

        return bidService.getWinner(auctionId);
    }
}