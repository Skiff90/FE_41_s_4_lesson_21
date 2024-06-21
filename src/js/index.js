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
    const response = await axios.post(`http://localhost:3000/posts/{id}`, {
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
    const response = await axios.post(`http://localhost:3000/posts/{id}`);
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
