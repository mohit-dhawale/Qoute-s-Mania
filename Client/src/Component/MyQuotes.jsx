import React, { useEffect, useState } from "react";
import {
  addQuoteApi,
  deleteQuoteApi,
  getQuotesByUserIdApi,
  updateQuoteApi,
} from "../services/axiosapis";
import { Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { toast } from "react-toastify";
import { log } from "../services/logger";
import { useNavigate } from "react-router";
import Favorite from "@mui/icons-material/Favorite";

const MyQuotes = () => {
  const navigate = useNavigate();

  const [button, setButton] = useState(true);
  const [quotes, setQuotes] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [quote, setQuote] = useState("");
  const [id, setId] = useState("");
  const loadData = async () => {
    const response = await getQuotesByUserIdApi();
    setQuotes(response.data.data);
  };

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
  }, []);

    const editQuote = (e) => {
      const quoteId = e.target.value;
      var quoteToEdit = quotes.find((item) => item.id == quoteId);
      setTitle(quoteToEdit.title);
      setAuthor(quoteToEdit.author);
      setQuote(quoteToEdit.quotes);
      setId(quoteToEdit.id);
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

  const updateQuote = async () => {
    if (title.length === "") {
      toast.error("Title cannot ne empty");
    } else if (author.length === "") {
      toast.error("Author cannot ne empty");
    } else if (quote.length === "") {
      toast.error("Quote cannot ne empty");
    } else {
      const response = await updateQuoteApi(
        title,
        author,
        quote,
        id
      );
      console.log(response);
      if (response.data.status == "success") {
        toast.success("Quote Updated SuccessFully");
      } else {
        toast.warning("Something Went Wrong");
      }
      navigate("/home");
    }
  };

  const deleteQuote = async (e) => {
    console.log(e.target.value);
    const response = await deleteQuoteApi(e.target.value);
    console.log(response.data.status);
    if (response.data.status == "success") {
      toast.success("Quote Deleted Successfully");
    } else {
      toast.warning("Something went wrong");
    }
    loadData();
  };

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
          onClick={()=>(setButton(false))}
        >
          Add New Quote
        </Button>
      </div>
      {Array.isArray(quotes) && quotes.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 g-4">
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
                  <p className="card-text">~{quote.author}</p>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                          
                          <Favorite style={{color:"red",marginRight:5,fontSize:30}}/>
                          {quote.likeCount} 
                    <div
                      style={{
                        width: '80%',
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        data-bs-toggle="modal"
                        value={quote.id}
                        data-bs-target="#exampleModal"
                        onClick={editQuote}
                        startIcon={<Edit />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<Delete />}
                        value={quote.id}
                        onClick={deleteQuote}
                      >
                        Delete
                      </Button>
                    </div>
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

      {/* <!-- Modal --> */}
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
              <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                  <div class="col-xl-9">
                    <h1 class="text-white mb-4">Add Quote</h1>

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
              {button ? (<button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={updateQuote}
              >
                Update
              </button>)
              :(<button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={addQuote}
              >
                Add Quote
              </button>)
}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyQuotes;
