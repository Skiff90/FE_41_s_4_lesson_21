import axios from "axios";
import Handlebars from "handlebars";

const fetchPostBtn = document.querySelector(".btn");
const postList = document.querySelector(".posts");

fetchPostBtn.addEventListener("click", async () => {
  try {
    const posts = await fetchPosts();
    renderPosts(posts);
  } catch (error) {
    console.log(error);
  }
});

async function fetchPosts() {
  try {
    const response = await axios.get("http://localhost:3000/posts");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function createPost(title, content) {
  try {
    const response = await axios.post(`http://localhost:3000/posts/`, {
      title,
      content,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function upgradePost(id, title, content) {
  try {
    const response = await axios.post(`http://localhost:3000/posts/{id}`, {
      title,
      content,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function deletePost(id) {
  try {
    const response = await axios.post(`http://localhost:3000/posts/{id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function createComment(postId, comment) {
  try {
    const response = await axios.post(`http://localhost:3000/commets/`, {
      postId,
      comment,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

function renderPosts(posts) {
  const source = document.getElementById("post-template").innerHTML;
  const template = Handlebars.compile(source);
  const context = { posts };
  const html = template(context);
  document.getElementById("postsContainer").innerHTML = html;
}
