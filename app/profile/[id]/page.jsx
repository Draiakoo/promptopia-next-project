"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/profile";

const UserProfile = ({ params }) => {

    const [posts, setPosts] = useState([]);

    const router = useRouter();
    const searchParams = useSearchParams();
    const userName = searchParams.get("name");
    const userId = params.id;

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${userId}/posts`);
          const data = await response.json();
    
          setPosts(data);
        }
        fetchPosts();
      }, [])

    return(
        <Profile 
            name={userName}
            desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
            data={posts}
        />
    )
}

export default UserProfile