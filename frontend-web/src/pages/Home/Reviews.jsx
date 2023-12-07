const reviews_dummy = [
  {
    user: "Antonio Banderas",
    review: "My marriage was about to fail before I discovered BitPal. Now we can actually decide what to eat!"
  },
  {
    user: "Ricky Martin",
    review: "The long hours of deciding what to eat every day have are gone. Now my partner and I always have a few options on store."
  },
  {
    user: "Miley Cirus",
    review: "Girl's night has become so much easier! We can quickly decide on that to ear even before we even meet."
  },
];

export default function Revies({reviews = reviews_dummy}) {
  let reviewDivs = []

  /* present maximum three reviews, each in its own div */
  for (let i = 0; i < Math.min(3, reviews.length); i++) {
    reviewDivs.push(
      <div className="Review" key={`review ${i}`}>
        <h3>{reviews[i].user}</h3>
        <p>{reviews[i].review}</p>
      </div>
    );
  }

  return (
    <div className="ReviewsContainer">
      <h3 className="ReviewsHeader">This is what other users have to say about us!</h3>
      {reviewDivs}
    </div>
    )
}