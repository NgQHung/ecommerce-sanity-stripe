/* eslint-disable @next/next/no-img-element */
import React from "react";
import { IProduct } from "../types/product";

import { urlFor } from "../lib/client";
import Link from "next/link";

interface IProps {
    product: any;
}

const Product = ({ product: { image, name, slug, price } }: IProps) => {
    return (
        <div>
            <Link href={`/product/${slug.current}`}>
                <div className="product-card">
                    <img src={urlFor(image && image[0]).url()} width={250} height={250} alt="" />
                    <p className="product-name">{name}</p>
                    <div className="product-price">{price}</div>
                </div>
            </Link>
        </div>
    );
};

export default Product;
