import React, { useState } from "react";
import AddPost from "../../components/Molecules/AddPost/AddPost";
import SearchPost from "../../components/Molecules/SearchPost/SearchPost";
import PostList from "../../components/Organisms/PostList/PostList";
import { useGetPostsQuery } from "../../redux/services/postApi";
import { useGetAuthorsQuery } from "../../redux/services/userApi";

const Posts: React.FC = () => {
  const [filter, setFilter] = useState("");
  const { data: posts = [], isLoading: isPostsLoading } = useGetPostsQuery();
  const { data: authors = [] } = useGetAuthorsQuery();
  const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">لیست پست‌ها</h2>
      <AddPost
        authors={authors.map((author) => ({
          label: author.name,
          value: author.id,
        }))}
      />
      <SearchPost value={filter} onChange={(e) => setFilter(e.target.value)} />
      {isPostsLoading ? <p>در حال بارگذاری...</p> : <PostList posts={filteredPosts} authors={authors} />}
    </div>
  );
};

export default Posts;
