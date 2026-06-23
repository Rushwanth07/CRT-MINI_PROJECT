package auction_system.controller;

import auction_system.dto.AuctionRequest;
import auction_system.entity.Auction;
import auction_system.service.AuctionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auctions")
@CrossOrigin(origins = "http://localhost:5173")
public class AuctionController {

    private final AuctionService auctionService;

    public AuctionController(
            AuctionService auctionService
    ) {
        this.auctionService = auctionService;
    }

    @PostMapping
    public Auction createAuction(
            @RequestBody AuctionRequest request
    ) {
        return auctionService.createAuction(request);
    }

    @GetMapping
    public List<Auction> getAllAuctions() {
        return auctionService.getAllAuctions();
    }

    @GetMapping("/seller/{sellerId}")
    public List<Auction> getSellerAuctions(
            @PathVariable Long sellerId
    ) {
        return auctionService.getSellerAuctions(sellerId);
    }

    @GetMapping("/{id}")
    public Auction getAuctionById(
            @PathVariable Long id
    ) {
        return auctionService.getAuctionById(id);
    }

    @PutMapping("/{id}")
    public Auction updateAuction(
            @PathVariable Long id,
            @RequestBody AuctionRequest request
    ) {
        return auctionService.updateAuction(
                id,
                request
        );
    }

    @DeleteMapping("/{id}")
    public String deleteAuction(
            @PathVariable Long id
    ) {

        auctionService.deleteAuction(id);

        return "Auction deleted successfully";
    }
}