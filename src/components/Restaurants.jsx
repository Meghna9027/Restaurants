import { useEffect, useState } from "react";
import axios from "axios";
export const Restaurants = () => {
  //   const [text, setText] = useState("");
  const [state, setState] = useState({
    name: "",
    cost: 0,
    votes: 0,
    reviews: 0,
    ratings: 0,
    categories: "",
    payment_methods: {
      card: true,
      cash: true,
      upi: true,
    },
  });
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getData();
  }, [page]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleRatings = (e) => {
    setRestaurants(
      restaurants.filter((res) => {
        //   console.log(res.ratings, e);
        res.ratings >= e;
      })
    );
  };

  const getData = () => {
    axios
      .get(`http://localhost:3000/restaurants?_limit=10&_page=${page}`)
      .then((res) => {
        setRestaurants(res.data);
      });
  };
  return (
    <div>
      {/* <input type="text" onChange={(e) => setText(e.target.value)} /> */}
      <form
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          // border: "1px solid black",
          // width: "80%",
          // margin: "auto",
        }}
      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            placeholder="Name"
            value={state.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="cost">Cost</label>
          <input
            name="cost"
            placeholder="Cost"
            value={state.cost}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="votes">Votes</label>
          <input
            name="votes"
            placeholder="Votes"
            value={state.votes}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="reviews">Reviews</label>
          <input
            name="reviews"
            placeholder="Reviews"
            value={state.reviews}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="ratings">Ratings</label>
          <input
            name="ratings"
            placeholder="Ratings"
            value={state.ratings}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="categories">categories</label>
          <input
            name="categories"
            placeholder="categories"
            value={state.categories}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="payment_methods">payment_methods</label>
          <input
            name="payment_methods"
            placeholder="Payment Methods"
            value={state.payment_methods}
            onChange={handleChange}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              const {
                name,
                cost,
                votes,
                reviews,
                ratings,
                categories,
                payment_methods,
              } = state;
              e.preventDefault();
              fetch("http://localhost:3000/restaurants", {
                method: "POST",
                body: JSON.stringify({
                  name: name,
                  cost: cost,
                  votes: votes,
                  reviews: reviews,
                  ratings: ratings,
                  categories: categories,
                  payment_methods: {
                    card: true,
                    cash: true,
                    upi: true,
                  },
                }),
                headers: {
                  "content-type": "application/json",
                },
              }).then(() => {
                getData();
              });
              //axios.post("url",data) it is same as above fetch
            }}
          >
            Add Restaurant
          </button>
        </div>
      </form>
      <div className="Sort">
        <button
          onClick={() => {
            handleRatings(1);
            // setRestaurants(res.data);
          }}
        >
          1*
        </button>
        <button
          onClick={() => {
            handleRatings(2);
            // axios
            //   .get(`http://localhost:3000/restaurants?ratings>=2`)
            //   .then((res) => {
            //     setRestaurants(res.data);
            //   });
          }}
        >
          2*
        </button>
        <button
          onClick={() => {
            handleRatings(3);
            // axios
            //   .get(`http://localhost:3000/restaurants?ratings=3`)
            //   .then((res) => {
            //     setRestaurants(res.data);
            //   });
          }}
        >
          3*
        </button>
        <button
          onClick={() => {
            handleRatings(4);
            // axios
            //   .get(`http://localhost:3000/restaurants?ratings=4`)
            //   .then((res) => {
            //     setRestaurants(res.data);
            //   });
          }}
        >
          4*
        </button>
        <button
          onClick={() => {
            axios
              .get(
                `http://localhost:3000/restaurants?payment_methods.cash=true`
              )
              .then((res) => {
                setRestaurants(res.data);
              });
          }}
        >
          Cash
        </button>
        <button
          onClick={() => {
            axios
              .get(
                `http://localhost:3000/restaurants?payment_methods.card=true`
              )
              .then((res) => {
                setRestaurants(res.data);
              });
          }}
        >
          Card
        </button>
        <button
          onClick={() => {
            axios
              .get(
                `http://localhost:3000/restaurants?payment_methods.cash=true&payment_methods.card=true&payment_methods.upi=true`
              )
              .then((res) => {
                setRestaurants(res.data);
              });
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            axios
              .get(`http://localhost:3000/restaurants?_sort=cost&_order=asec`)
              .then((res) => {
                setRestaurants(res.data);
              });
          }}
        >
          Low to High
        </button>
        <button
          onClick={() => {
            axios
              .get(`http://localhost:3000/restaurants?_sort=cost&_order=desc`)
              .then((res) => {
                setRestaurants(res.data);
              });
          }}
        >
          High to Low
        </button>
      </div>
      {restaurants.map((g) => (
        <div
          key={g.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            border: "1px solid black",
            width: "80%",
            margin: "auto",
          }}
        >
          <img src={g.img} style={{ width: "100px" }}></img>
          <h2>{g.name}</h2>
          <p>{g.cost}</p>
          <p>{g.votes}</p>
          <p>{g.reviews}</p>
          <p>{g.ratings}</p>
          <p>{g.categories}</p>
          <p>{`Card : ${g.payment_methods.card}, Cash : ${g.payment_methods.cash}, Upi : ${g.payment_methods.upi}`}</p>
        </div>
      ))}
      <button
        onClick={() => {
          setPage(page - 1);
        }}
      >
        Prev
      </button>
      <button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};
