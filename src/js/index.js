import axios from "axios";
import Handlebars from "handlebars";

const fetchPostBtn = document.querySelector(".btn");
const postList = document.querySelector(".posts");

// Завантаження шаблону Handlebars з окремого файлу
async function loadTemplate(templatePath) {
  const response = await fetch(templatePath);
  const templateText = await response.text();
  return Handlebars.compile(templateText);
}

// Отримання списку постів
async function fetchPosts() {
  try {
    const response = await axios.get("http://localhost:3000/posts");
    console.log("Fetched posts:", response.data); // Лог для перевірки даних
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

// Створення нового поста
async function createPost(title, content) {
  try {
    const response = await axios.post("http://localhost:3000/posts", {
      title,
      content,
    });
    console.log("Created post:", response.data); // Лог для перевірки даних
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
  }
}

// Оновлення поста
async function updatePost(id, title, content) {
  try {
    const response = await axios.put(`http://localhost:3000/posts/${id}`, {
      title,
      content,
    });
    console.log("Updated post:", response.data); // Лог для перевірки даних
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
  }
}

// Видалення поста
async function deletePost(id) {
  try {
    const response = await axios.delete(`http://localhost:3000/posts/${id}`);
    console.log("Deleted post:", response.data); // Лог для перевірки даних
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}

// Додавання коментаря до поста
async function createComment(postId, comment) {
  try {
    const response = await axios.post("http://localhost:3000/comments", {
      postId,
      comment,
    });
    console.log("Created comment:", response.data); // Лог для перевірки даних
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
  }
}

// Відображення постів
async function renderPosts(posts) {
  const template = await loadTemplate("./templates/post.hbs");
  const context = { posts };
  const html = template(context);
  document.getElementById("postsContainer").innerHTML = html;
}

// Обробник для створення поста
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

// Обробник для редагування поста
document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("editPostButton")) {
    const id = event.target.dataset.id;
    const posts = await fetchPosts();
    const post = posts.find((post) => post.id == id);
    const title = prompt("Редагувати заголовок", post.title);
    const content = prompt("Редагувати зміст", post.content);
    await updatePost(id, title, content);
    const updatedPosts = await fetchPosts();
    renderPosts(updatedPosts);
  }
});

// Обробник для видалення поста
document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("deletePostButton")) {
    const id = event.target.dataset.id;
    await deletePost(id);
    const posts = await fetchPosts();
    renderPosts(posts);
  }
});

// Обробник для додавання коментаря
document.addEventListener("submit", async (event) => {
  if (event.target.classList.contains("createCommentForm")) {
    event.preventDefault();
    const postId = event.target.closest(".post").dataset.id;
    const comment = event.target.querySelector(".commentInput").value;
    await createComment(postId, comment);
    const posts = await fetchPosts();
    renderPosts(posts);
  }
});

// Запуск додатку
async function startApp() {
  const posts = await fetchPosts();
  renderPosts(posts);
}

startApp();
