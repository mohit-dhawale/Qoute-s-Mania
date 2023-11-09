import React, { useEffect, useState } from "react";
import {
  addQuoteApi,
  getQuotesApi,
  likeQuoteApi,
  unlikeQuoteApi,
} from "../services/axiosapis";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { log } from "../services/logger";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Home = () => {
  const [button, setButton] = useState(true);
  const [quotes, setQuotes] = useState([]);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [quote, setQuote] = useState("");
  const [quoteToEdit, setQuoteToEdit] = useState("");
  
  
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    log(title);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleQuoteChange = (event) => {
    setQuote(event.target.value);
  };

  useEffect(() => {
    loadData();
  }, [quotes]);

  const toggleLike = async (e) => {
    console.log(e.id);
    console.log(e.likedByUser);
    console.log(e.userId);
    if (e.likedByUser == 1) {
      log("unliked");
      const response = await unlikeQuoteApi(e.id);
      log(response);
    } else {
      log("liked");
      const response = await likeQuoteApi(e.id);
      log(response);
    }
    loadData();
  };
  const loadData = async () => {
    const id = sessionStorage.getItem("id");
    const response = await getQuotesApi(id);
    console.log(response.data.data);
    setQuotes(response.data.data);
  };

  const addQuote=async()=>{
    setButton(true)
    if (title.length == "") {
      toast.error("Title cannot ne empty");
    } else if (author.length == "") {
      toast.error("Author cannot ne empty");
    } else if (quote.length == "") {
      toast.error("Quote cannot ne empty");
    } else {
      const response = await addQuoteApi(title,author,quote);
      console.log(response.data)
      if(response.data.status=='success'){
        toast.success("Quote Added SuccessFully")
        loadData()
      }else{
        toast.error("Something went wrong")
      }
    }

  }

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "flex-end", marginTop: 50 }}
      >
        <Button
          variant="contained"
          color="success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          style={{ marginBottom: 20, marginTop: -30 }}
          // onClick={()=>(setButton(false))}
        >
          Add New Quote
        </Button>
      </div>
      {Array.isArray(quotes) && quotes.length > 0 ? (
        <div
          className="row row-cols-1 row-cols-md-3 g-4"
          style={{ }}
        >
          {quotes.map((quote) => (
           <div className="col py-2 quote-custom" key={quote.id}>
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
             <div className="card-body" style={{ flex: 1, overflowY: 'auto' }}>
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
                   )}
                   <span style={{ color: "whitesmoke" }}>
                     {quote.likeCount}
                   </span>
                 </button>
                 <p className="card-text"><i>~{quote.author}</i></p>
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
       <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Edit Quote
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="container">
                <div class="row d-flex justify-content-center align-items-center">
                  <div class="col-xl-8">
                    <h1 class="text-white mb-1">Add Quote</h1>

                    <div class="card" style={{ borderRadius: "15px" }}>
                      <div class="card-body">
                        <div class="row align-items-center pt-4 pb-3">
                          <div class="col-md-3 ps-5">
                            <h6 class="mb-0">Title</h6>
                          </div>
                          <div class="col-md-9 pe-5">
                            <input
                              type="text"
                              class="form-control form-control-lg"
                              value={title}
                              onChange={handleTitleChange}
                            />
                          </div>
                        </div>

                        <hr class="mx-n3" />

                        <div class="row align-items-center py-3">
                          <div class="col-md-3 ps-5">
                            <h6 class="mb-0">Author</h6>
                          </div>
                          <div class="col-md-9 pe-5">
                            <input
                              type="email"
                              class="form-control form-control-lg"
                              value={author}
                              onChange={handleAuthorChange}
                            />
                          </div>
                        </div>

                        <hr class="mx-n3" />

                        <div class="row align-items-center py-3">
                          <div class="col-md-3 ps-5">
                            <h6 class="mb-0">Quote</h6>
                          </div>
                          <div class="col-md-9 pe-5">
                            <textarea
                              class="form-control"
                              rows="3"
                              value={quote}
                              onChange={handleQuoteChange}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={addQuote}
              >
                Add Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
