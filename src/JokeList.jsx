import useJokes from "./useJokes";
import Joke from "./Joke.jsx";
import "./JokeList.css";

const JokeList = ({ numJokesToGet = 5 }) => {
  /* returns on useJokes function to get sortedJokes list with length
  of number in props, isLoading state, and helper functions */
  const [isLoading, sortedJokes, generateNewJokes, vote] =
    useJokes(numJokesToGet);

  /* either loading spinner or list of sorted jokes. */
  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
    );
  } else {
    return (
      <div className="JokeList">
        <button className="JokeList-getmore" onClick={generateNewJokes}>
          Get New Jokes
        </button>

        {sortedJokes.map((j) => (
          <Joke
            text={j.joke}
            key={j.id}
            id={j.id}
            votes={j.votes}
            vote={vote}
          />
        ))}
      </div>
    );
  }
};

export default JokeList;
