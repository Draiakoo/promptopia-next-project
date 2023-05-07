"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return(
          <PromptCard 
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        )
      })}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const filterPosts = () => {
    const newPosts = allPosts.filter((post) => post?.prompt.includes(searchText) || post?.tag.includes(searchText) || post?.creator?.username.includes(searchText));
    return newPosts;
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    const newPosts = filterPosts();
    setFilteredPosts(newPosts);
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const newPosts = filterPosts();
    setFilteredPosts(newPosts);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setAllPosts(data);
    }

    fetchPosts();
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList 
        data={searchText=="" ? allPosts : filteredPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed