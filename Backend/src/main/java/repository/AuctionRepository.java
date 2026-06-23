package auction_system.repository;

import auction_system.entity.Auction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuctionRepository
        extends JpaRepository<Auction, Long> {

    List<Auction> findBySeller_Id(Long sellerId);
}