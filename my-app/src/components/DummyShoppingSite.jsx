
import { useState, useEffect } from "react";
import './style.css'

function DummyShoppingSite() {
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    async function fetchProducts() {
        setLoading(true);
        try {
            const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${count * 20}`);
            const data = await response.json();

            // Check if we received products and update state accordingly
            if (data && data.products && data.products.length) {
                setProducts((prev) => [...prev, ...data.products]);

                // Check if there are more products to load
                setHasMore(products.length + data.products.length < data.total); setLoading(false);
            } else {
                setHasMore(false);
            }
            console.log(data.products);
        } catch (e) {
            console.error("Error fetching products:", e); setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [count]);

    return (
        <div className="main-container">
            {loading && count === 0 ? (
                <div>Loading Data... Please wait...</div>
            ) : (
                <>
                    <div className="product-container">
                        {products?.length ? products.map((item) => (
                            <div className="product" key={item.id}>
                                <img src={item.thumbnail} alt={item.title} />
                                <h4>{item.title}</h4>
                                <h5>Price: {item.price}$</h5>
                                <p> <span>Availability: </span>
                                    <span className={`${item.availabilityStatus.toLowerCase().replace(' ', '-')}`}>
                                        {item.availabilityStatus}
                                    </span></p>

                            </div>
                        )) : null}

                        <div className="btn-container">
                            <button disabled={!hasMore} onClick={() => setCount((prev) => prev + 1)}>Load More</button>
                        </div>
                    </div>

                    <div>
                        
                    </div>
                </>

            )}
        </div>
    );
}

export default DummyShoppingSite;