package com.oneClub.product_inventory_service.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "inventory")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Inventory {

    @Id
    @Column(name = "prod_id")
    private Integer productId;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "prod_id")

    private Product product;

    @Column(nullable = false)
    private Integer quantity;
}

