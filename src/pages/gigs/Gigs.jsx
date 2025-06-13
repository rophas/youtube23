import React, { useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [open, setOpen] = useState(false);
  const {search} = useLocation();
  const minRef = useRef();
  const maxRef = useRef();
  const [sort, setSort] = useState("sales");

  

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["repoData", sort],
    queryFn: () => {
      const params = new URLSearchParams(search);
      if (minRef.current?.value) params.set("min", minRef.current.value);
      if (maxRef.current?.value) params.set("max", maxRef.current.value);
      if (sort) params.set("sort", sort);
      return newRequest.get(`/gigs?${params.toString()}`).then((res) => res.data);
    },
  });
    

  console.log(data);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const apply = ()=>{
    refetch();
  }

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Inked * Graphics & Design *</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Inked's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                  )}
                  <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
          ? "loading!"
          : error
          ? "Something is wrong!"
          : data.map((gig) => (<GigCard key={gig._id} item={gig} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
