const searchForm = document.getElementById("Search-Form");
const searchInput = document.getElementById("Search-Input");
const searchResult = document.getElementById("search-result");
const showMore = document.getElementById("show-more");
const notFound = document.getElementById("not-found");
const accesskey = "oBgLysEcqrNv17EIXOW40rpVtxH-aVw2RkUHUjF2M0g";

let keyword = "";
let page = 1;
async function searchImage() {
  keyword = searchInput.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=15`;
  const reponse = await fetch(url);
  const data = await reponse.json();
  // console.log(data);
  notFound.innerHTML = "";
  if (page == 1) {
    searchResult.innerHTML = "";
  }
  const results = data.results;
  if(results.length>0){
    results.map((result) => {
      const image = document.createElement("img");
      image.src = result.urls.small;
      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
  
      imageLink.appendChild(image);
      searchResult.appendChild(imageLink);
    });
    showMore.style.display = "block";
  }
  else{
    notFound.innerHTML = "<h2 class='text'>Result Not Found</h2>";
    showMore.style.display = "hidden";
  }
  
}
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImage();
});
showMore.addEventListener("click", () => {
  page++;
  searchImage();
});
