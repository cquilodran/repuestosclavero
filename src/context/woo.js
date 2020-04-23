import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";



const Woo = new WooCommerceRestApi({
    url: "https://repuestosclavero.cl/backend",
    consumerKey: "ck_6f821f4bd36d7e5608c75fb11c700ddf6d516371",
    consumerSecret: "cs_3e2c5a8fee141a41a1026ecea379c623390fb538",
    version: "wc/v3"
});

export default Woo;