import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const labelNames = [
    'Title',
    'Description',
    'Image URL',
    'Imdb URL',
    'Imdb ID',
  ];

  const getNamesFromLabel = (label: string): string => {
    const wordsArr = label.split(' ');
    let secondWord;

    if (wordsArr.length > 1) {
      secondWord = wordsArr[1];

      secondWord = secondWord
        .slice(0, 1)
        .concat(secondWord.slice(1).toLowerCase());
    }

    if (wordsArr[0] === 'Image') {
      wordsArr[0] = 'Img';
    }

    const firstWord = wordsArr[0]
      .charAt(0)
      .toLowerCase()
      .concat(wordsArr[0].slice(1));

    return `${firstWord}${secondWord ? secondWord : ''}`;
  };

  const getMovieInputName = (inputName: keyof Movie): string => {
    return movie[inputName];
  };

  const setMovieFromInputName = (inputName: keyof Movie, value: string) => {
    setMovie(prev => ({
      ...prev,
      [inputName]: value,
    }));
  };

  function reset() {
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const { title, description, imgUrl, imdbUrl, imdbId } = movie;

    if (title === '' || imgUrl === '' || imdbUrl === '' || imdbId === '') {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
    setCount(prev => prev + 1);
    reset();
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      {labelNames.map(label => {
        const fieldName = getNamesFromLabel(label) as keyof Movie;

        return (
          <TextField
            key={label}
            name={getNamesFromLabel(label)}
            label={label}
            value={getMovieInputName(fieldName)}
            onChange={e => setMovieFromInputName(fieldName, e)}
            required={label !== 'Description'}
          />
        );
      })}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleAdd}
            disabled={movie.title === ''}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
