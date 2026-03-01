import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export default function Profile() {
    const { user } = useUser();
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        if (!user) return;

        const stored = localStorage.getItem(`wishlist_${user.id}`);

        if (stored) {
            setWishlist(JSON.parse(stored));
        } else {
            setWishlist([]);
        }

    }, [user]);

    if (!user) return <p>Please sign in</p>;

  return (
    <div>
      <h1>{user.firstName}'s Wishlist</h1>
      <p>Total movies: {wishlist.length === 0 ? (
                        <p>No saved movies yet.</p>
                        ) : (
                        wishlist.map((movie) => (
                            <div key={movie.id}>
                            <h3>{movie.title}</h3>
                            <p>Rating: {movie.vote_average}</p>
                            </div>
                        ))
                        )}</p>
    </div>
  );
}