const $ = (selector) => document.querySelector(selector),
  APIURL = "https://api.github.com/users/",
  fetchData = (route) => fetch(`${APIURL}${route}`).then((res) => res.json());

const createUserCard = ({ avatar_url, name, bio, followers, following, public_repos }) => ($("#main").innerHTML = `
  <div class="card">
    <div>
      <img class="avatar" src="${avatar_url}" alt="${name}" />
    </div>

    <div class="user-info">
      <h2>${name}</h2>
      <p>${bio}</p>

      <ul class="info">
        <li>${followers}<strong>Followers</strong></li>
        <li>${following}<strong>Following</strong></li>
        <li>${public_repos}<strong>Repos</strong></li>
      </ul>

      <div id="repos"></div>
    </div>
  </div>
`);
const getRepos = async (username) => addReposToCard(await fetchData(`${username}/repos`));

const getUser = async (username) => createUserCard(await fetchData(username)) && getRepos(username);

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .forEach((repo) => {
      const repoEl = document.createElement("a");

      repoEl.classList.add("repo");
      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repo.name;

      reposEl.appendChild(repoEl);
    });
}

getUser("indra120");

$("#form").onsubmit = (e) => {
  e.preventDefault();
  const user = $("#search").value;

  if (user) {
    getUser(user);
    $("#search").value = "";
  }
};
