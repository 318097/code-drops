import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { Button } from "@ml318097/react-ui";
import { fetchPosts, setFilter, fetchTags } from "../../store/posts/actions";
import Card from "./Card";
import "./Posts.scss";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 215px);
  justify-content: center;
  grid-gap: 8px;
`;

const Posts = ({
  posts,
  fetchPosts,
  setFilter,
  fetchTags,
  tagList,
  meta,
  filters,
}) => {
  useEffect(() => {
    if (!posts.length) fetchPosts();
    if (!tagList.length) fetchTags();
  }, []);

  const { page = 1 } = filters;

  return (
    <section id="posts">
      <div className="post-container">
        {posts.length ? (
          <GridContainer>
            {posts.map((post) => (
              <Card key={post._id} post={post} />
            ))}
          </GridContainer>
        ) : (
          <div className="not-found">No posts found.</div>
        )}
        {meta && page * 25 <= meta.count && (
          <div className="actions-row">
            <Button
              size="lg"
              onClick={() => setFilter({ page: page + 1 }, false)}
            >
              Load
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = ({ posts }) => ({
  posts: posts.posts ? posts.posts : [],
  meta: posts.meta,
  tagList: posts.tags,
  filters: posts.filters,
});

const mapDispatchToProps = {
  fetchPosts,
  setFilter,
  fetchTags,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Posts));