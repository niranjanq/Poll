import { writable } from "svelte/store";

const PollStore = writable([
  {
    id: 1,
    Question: "Python or JavaScript",
    AnswerA: "Python",
    AnswerB: "JavaScript",
    VoteA: 9,
    VoteB: 10,
  },
]);


export default PollStore;