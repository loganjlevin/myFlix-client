import { useState } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

const MainView = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([
    {
      _id: { $oid: '63f28f52985839dce48ff7f6' },
      Title: 'Silence of the Lambs',
      Description:
        'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer.',
      Genre: {
        Name: 'Thriller',
        Description:
          'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.',
      },
      Director: {
        Name: 'Jonathan Demme',
        Bio: 'Robert Jonathan Demme was an American director, producer, and screenwriter.',
        Birth: '1944',
        Death: '2017',
      },
      ImagePath:
        'https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UY720_.jpg',
      Featured: true,
    },
    {
      _id: { $oid: '63f29ff0985839dce48ff7ff' },
      Title: 'Pulp Fiction',
      Description:
        'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
      Genre: {
        Name: 'Action',
        Description:
          'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.',
      },
      Director: {
        Name: 'Quentin Tarantino',
        Bio: 'Quentin Jerome Tarantino was born in Knoxville, Tennessee. His father, Tony Tarantino, is an Italian-American actor and musician from New York, and his mother, Connie (McHugh), is a nurse from Tennessee.',
        Birth: '1963',
        Death: '',
      },
      ImagePath:
        'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1055_.jpg',
      Featured: true,
    },
    {
      _id: { $oid: '63f29d65985839dce48ff7f9' },
      Title: 'The Dark Knight',
      Description:
        'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      Genre: {
        Name: 'Action',
        Description:
          'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.',
      },
      Director: {
        Name: 'Christopher Nolan',
        Bio: 'Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England.',
        Birth: '1970',
        Death: '',
      },
      ImagePath:
        'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
      Featured: true,
    },
  ]);

  if (movies === null) {
    return <div>Movie list is empty!</div>;
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => {
          setSelectedMovie(null);
        }}
      />
    );
  }
  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={() => {
              setSelectedMovie(movie);
            }}
          />
        );
      })}
    </div>
  );
};

export default MainView;
