import React, { useEffect, useState } from 'react'
import { getFavouriteQuotesApi, unlikeQuoteApi } from '../services/axiosapis';
import { log } from '../services/logger';
import { Button } from '@mui/material';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const FavQuotes = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const toggleLike = async (e) => {
    console.log(e.id);
      const response = await unlikeQuoteApi(e.id);
      log(response);
    loadData();
  };
  const loadData = async () => {
    const id = sessionStorage.getItem("id");
    const response = await getFavouriteQuotesApi(id);
    console.log(response);
    setQuotes(response.data.data);
  };

  return (
    <>
      {Array.isArray(quotes) && quotes.length > 0 ? (
        <div
          className="row row-cols-1 row-cols-md-3 g-4"
          style={{ boxShadow: "10px" }}
        >
          {quotes.map((quote) => (
            <div className="col" key={quote.id}>
              <div
                className="card text-center"
                style={{
                  backgroundColor: "rgba(145, 233, 255, 0.1)",
                  color: "whitesmoke",
                  boxShadow: '2px 2px 15px rgba(0, 255, 210, 0.5)',
                  height: '100%', // Set a fixed height for the card
                  display: 'flex',
                  flexDirection: 'column', // Ensure card's content stacks vertically
                }}
              >
                <div className="card-header" style={{ fontSize: 25 }}>
                  {quote.title}
                </div>
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: 19 }}>
                    {quote.quotes}
                  </h5>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <button
                      onClick={() => toggleLike(quote)}
                      style={{ background: "transparent", border: "none" }}
                    >
                      {quote.likedByUser ? (
                        <FavoriteIcon
                          color="secondary"
                          style={{ fontSize: 30 }}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          color="secondary"
                          style={{ fontSize: 30 }}
                        />
                      )}{" "}
                      <span style={{ color: "whitesmoke" }}>
                        {quote.likeCount}
                      </span>
                    </button>
                    <p className="card-text">~{quote.author}</p>
                  </div>
                </div>
                <div className="card-footer text-body-secondary d-flex justify-content-between">
                  <span className="text-white">
                    Created Date:{" "}
                    {new Date(quote.createdDate).toLocaleDateString()}
                  </span>
                  {quote.modifiedDate && (
                    <span className="text-white">
                      Modified Date:{" "}
                      {new Date(quote.modifiedDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="row">
          <div
            className="col text-center"
            style={{ color: "whitesmoke", fontSize: 30, marginTop: 100 }}
          >
            <p>No quotes available.</p>
          </div>
        </div>
      )}
      </>
      )
}

export default FavQuotes