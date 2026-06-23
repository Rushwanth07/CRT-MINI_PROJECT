package auction_system.service;

import auction_system.dto.AuctionRequest;
import auction_system.entity.Auction;
import auction_system.entity.User;
import auction_system.repository.AuctionRepository;
import auction_system.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuctionService {

    private final AuctionRepository auctionRepository;
    private final UserRepository userRepository;

    public AuctionService(
            AuctionRepository auctionRepository,
            UserRepository userRepository
    ) {
        this.auctionRepository = auctionRepository;
        this.userRepository = userRepository;
    }

    public Auction createAuction(AuctionRequest request) {

        User seller = userRepository.findById(
                request.getSellerId()
        ).orElseThrow(
                () -> new RuntimeException("Seller not found")
        );

        Auction auction = Auction.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .startingPrice(request.getStartingPrice())
                .currentPrice(request.getStartingPrice())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .imageUrl(request.getImageUrl())
                .seller(seller)
                .status("ACTIVE")
                .build();

        return auctionRepository.save(auction);
    }

    public List<Auction> getAllAuctions() {
        return auctionRepository.findAll();
    }

    public List<Auction> getSellerAuctions(Long sellerId) {
        return auctionRepository.findBySeller_Id(sellerId);
    }

    public Auction getAuctionById(Long id) {
        return auctionRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException("Auction not found")
                );
    }

    public Auction updateAuction(
            Long id,
            AuctionRequest request
    ) {

        Auction auction = getAuctionById(id);

        auction.setTitle(request.getTitle());
        auction.setDescription(request.getDescription());
        auction.setStartingPrice(request.getStartingPrice());
        auction.setImageUrl(request.getImageUrl());
        auction.setStartTime(request.getStartTime());
        auction.setEndTime(request.getEndTime());

        return auctionRepository.save(auction);
    }

    public void deleteAuction(Long id) {
        auctionRepository.deleteById(id);
    }
}