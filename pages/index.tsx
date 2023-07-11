import React from "react";

import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { IProduct } from "../types/product";

const Home: NextPage = ({ products, bannerData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div>
            <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
            {}
            <div className="products-heading">
                <h2>Best Selling Products</h2>
                <p>Speakers of many variations</p>
                <div className="products-container">
                    {products?.map((product: IProduct) => {
                        return <Product key={product._id} product={product} />;
                    })}
                </div>
            </div>
            <FooterBanner footerBanner={bannerData && bannerData[0]} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const query = '*[_type == "product"]';
    const products = await client.fetch(query);

    const bannerQuery = '*[_type == "banner"]';
    const bannerData = await client.fetch(bannerQuery);

    return {
        props: { products, bannerData },
    };
};
export default Home;
