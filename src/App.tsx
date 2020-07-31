import React, { useState } from "react";
import getImages from "./api";

const App: React.FC = () => {
  const [title] = useState("Buscar Imagens com React");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const formSubmitted = async (
    event: React.SyntheticEvent<EventTarget>
  ): Promise<void> => {
    event.preventDefault();
    setImages([]);
    setLoading(true);
    const images = await getImages(searchTerm);
    setImages(images);
    setLoading(false);
  };

  const onSearchTermChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(event.target.value);
  };

  return (
    <React.Fragment>
      <h1>{title}</h1>
      <form onSubmit={formSubmitted}>
        <label htmlFor="searchTerm">Imagem</label>
        <input
          value={searchTerm}
          onChange={onSearchTermChanged}
          className="u-full-width"
          type="text"
          id="searchTerm"
          name="searchTerm"
        />
        <button type="button">Buscar</button>
      </form>
      {loading && (
        <img
          src="https://i.imgur.com/LVHmLnb.gif"
          alt="loading"
          id="loadingImage"
        />
      )}
      <section className="images">
        {images.map((url) => (
          <img key={url} src={url} alt={searchTerm} />
        ))}
      </section>
    </React.Fragment>
  );
};

export default App;
