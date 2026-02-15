package com.oneClub.Products.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Inventory
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @Column(name = "units_sold", nullable = false)
    private int unitsSold = 0;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prod_id", nullable = false, unique = true)
    private Products product;
}
