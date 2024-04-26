import { useState, useEffect } from "react";
import axios from "axios";

const useJokes = (numJokesToGet) => {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /* at initial render, get jokes */
  useEffect(() => {
    getJokes();
  }, []);

  /* retrieve jokes from API */
  const getJokes = async () => {
    // load jokes one at a time, adding not-yet-seen jokes
    let jokes = [];
    let seenJokes = new Set();

    while (jokes.length < numJokesToGet) {
      let res = await axios.get("https://icanhazdadjoke.com", {
        headers: { Accept: "application/json" },
      });
      let { ...joke } = res.data;

      if (!seenJokes.has(joke.id)) {
        seenJokes.add(joke.id);
        jokes.push({ ...joke, votes: 0 });
      } else {
        console.log("duplicate found!");
      }
    }

    setJokes(jokes);
    setIsLoading(false);
  };

  /* empty joke list, set to loading state, and then call getJokes */
  const generateNewJokes = () => {
    setIsLoading(true);
    getJokes();
  };

  /* change vote for this id by delta (+1 or -1) */
  const vote = (id, delta) => {
    setJokes(
      jokes.map((j) => (j.id == id ? { ...j, votes: j.votes + delta } : j))
    );
  };

  /* gets a copy of the list of jokes sorted by number of votes. */
  let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

  return [isLoading, sortedJokes, generateNewJokes, vote];
};

export default useJokes;
