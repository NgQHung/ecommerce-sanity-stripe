export interface IProduct {
    _id: string;
    name: string;
    title: string;
    type: string;
    slug: {
        current: string;
    };
    price: number;
    details: string;
    image: {
        asset: {
            _ref: string;
        };
    }[];
    quantity: number;
    of: [{ type: string }];
    options: {
        hotspot?: boolean;
        source?: string;
        maxLength?: number;
    };
}
