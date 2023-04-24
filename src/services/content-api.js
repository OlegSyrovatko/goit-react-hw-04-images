function fetchPicture(query, page) {
  const API_KEY = '34241449-e1fad7b12dc666345bb2e99a8';
  const fetchImages = (query, page) => {
    const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    return fetch(url)
      .then(response =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then(data => data.hits);
  };
  return fetchImages(query, page);
}

const api = {
  fetchPicture,
};

export default api;

