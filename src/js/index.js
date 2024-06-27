import axios from "axios";
import Handlebars from "handlebars";

async function fetchPosts() {
  try {
    const response = await axios.get("http://localhost:3000/posts");
    console.log("Fetching post", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
  }
}

async function createPost(title, content) {
  try {
    const response = await axios.post("http://localhost:3000/posts", {
      title,
      content,
    });
    console.log("Post created", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
  }
}

async function updatePost(id, title, content) {
  try {
    const response = await axios.put(`http://localhost:3000/posts/${id}`, {
      title,
      content,
    });
    console.log("Post updated", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
  }
}

async function deletePost(id) {
  try {
    const response = await axios.delete(`http://localhost:3000/posts/${id}`);
    console.log("Post deleted", response.data);
    return response.data;
  } catch (error) {
    console.error("Error delating post:", error);
  }
}

async function createComment(title, content) {
  try {
    const response = await axios.post("http://localhost:3000/comments", {
      title,
      content,
    });
    console.log("Comment created", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
  }
}

// Функція на завантаження шаблону
async function loadTemplate() {
  const response = await fetch("/src/templates/post.hbs");
  const templateText = await response.text();
  return Handlebars.compile(templateText);
}

async function renderPosts(posts) {
  console.log("Rendering post", posts);
  const template = await loadTemplate();
  console.log("Template is loaded");
  const context = { posts };
  const html = template(context);
  console.log("Genered HTML", html);
  const postsContainer = document.getElementById("postsContainer");
  if (postsContainer) {
    postsContainer.innerHTML = html;
  } else {
    console.error("postsContainer element not found");
  }
}

document
  .getElementById("createPostForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.getElementById("titleInput").value;
    const content = document.getElementById("contentInput").value;
    await createPost(title, content);
    const posts = await fetchPosts();
    renderPosts(posts);
  });

document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("editPostButton")) {
    const id = event.target.dataset.id;
    const posts = await fetchPosts();
    const post = posts.find((post) => post.id == id);
    const title = prompt("Edit title", post.title);
    const content = prompt("Edit content", post.content);
    await updatePost(id, title, content);
    const updatePosts = await fetchPosts();
    renderPosts(updatePosts);
  }
  if (event.target.classList.contains("deletePostButton")) {
    const id = event.target.dataset.id;
    await deletePost(id);
    const posts = await fetchPosts();
    renderPosts(posts);
  }
});

document.addEventListener("submit", async (event) => {
  if (event.target.classList.conteins("createCommentForm")) {
    event.preventDefault();
    const postId = event.target.closest(".post").dataset.id;
    const comment = event.target.querySelector(".commetInput").value;
    await createComment(postId, comment);
    const posts = await fetchPosts();
    renderPosts(posts);
  }
});

async function startApp() {
  const posts = await fetchPosts();
  renderPosts(posts);
}

document.addEventListener("DomContentLoader", startApp);
