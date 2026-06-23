package auction_system.service;

import auction_system.dto.BidRequest;
import auction_system.dto.WinnerResponse;
import auction_system.entity.Auction;
import auction_system.entity.Bid;
import auction_system.entity.User;
import auction_system.repository.AuctionRepository;
import auction_system.repository.BidRepository;
import auction_system.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BidService {

    private final BidRepository bidRepository;
    private final AuctionRepository auctionRepository;
    private final UserRepository userRepository;

    public BidService(
            BidRepository bidRepository,
            AuctionRepository auctionRepository,
            UserRepository userRepository) {

        this.bidRepository = bidRepository;
        this.auctionRepository = auctionRepository;
        this.userRepository = userRepository;
    }

    public Bid placeBid(BidRequest request) {

        Auction auction = auctionRepository.findById(request.getAuctionId())
                .orElseThrow(() -> new RuntimeException("Auction not found"));

        User bidder = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.getBidAmount() <= auction.getCurrentPrice()) {
            throw new RuntimeException(
                    "Bid must be higher than current auction price");
        }

        Bid bid = Bid.builder()
                .auction(auction)
                .bidder(bidder)
                .bidAmount(request.getBidAmount())
                .bidTime(LocalDateTime.now())
                .build();

        auction.setCurrentPrice(request.getBidAmount());

        auctionRepository.save(auction);

        return bidRepository.save(bid);
    }

    public List<Bid> getAuctionBids(Long auctionId) {
        return bidRepository.findByAuction_Id(auctionId);
    }

    public WinnerResponse getWinner(Long auctionId) {

        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new RuntimeException("Auction not found"));

        Bid winningBid = bidRepository
                .findTopByAuction_IdOrderByBidAmountDesc(auctionId)
                .orElseThrow(() -> new RuntimeException("No bids placed"));
        auction.setStatus("CLOSED");
        auctionRepository.save(auction);

        return new WinnerResponse(
                auction.getId(),
                auction.getTitle(),
                winningBid.getBidder().getId(),
                winningBid.getBidder().getName(),
                winningBid.getBidAmount()
        );
    }
}