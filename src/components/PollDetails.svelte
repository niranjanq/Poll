<script>
  import Card from "../Shared/Card.svelte";
  import PollStore from "../Stores/PollStore";
  import Button from "../Shared/Button.svelte";
  import { tweened } from "svelte/motion";
  export let poll;

  // Reactive values
  $: totalVotes = poll.VoteA + poll.VoteB;
  $: percentA = Math.floor((100 / totalVotes) * poll.VoteA) || 0;
  $: percentB = Math.floor((100 / totalVotes) * poll.VoteB) || 0;
  // Tweened values
  const TweenedA = tweened(0);
  const TweenedB = tweened(0);
  $: TweenedA.set(percentA);
  $: TweenedB.set(percentB);
  // Handling Votes
  const handleVote = (option, id) => {
    PollStore.update((CurrentPolls) => {
      let copiedPolls = [...CurrentPolls];
      let upVotedPoll = copiedPolls.find((poll) => poll.id == id);
      if (option === "a") {
        upVotedPoll.VoteA++;
      }
      if (option === "b") {
        upVotedPoll.VoteB++;
      }
      return copiedPolls;
    });
  };
  const handleDelete = (id) => {
    PollStore.update((CurrentPoll) => {
      return CurrentPoll.filter((poll) => poll.id != id);
    });
  };
</script>

<Card>
  <div class="Poll">
    <h3>{poll.Question}</h3>
    <p>Total Votes:{totalVotes}</p>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="answer" on:click={() => handleVote("a", poll.id)}>
      <div class="percent percent-a" style="width:{$TweenedA}%"></div>
      <span>{poll.AnswerA}({poll.VoteA})</span>
    </div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="answer" on:click={() => handleVote("b", poll.id)}>
      <div class="percent percent-b" style="width:{$TweenedB}%"></div>
      <span>{poll.AnswerB}({poll.VoteB})</span>
    </div>
    <div class="delete">
      <Button flat={true} on:click={() => handleDelete(poll.id)}>Delete</Button>
    </div>
    <div class="share"></div>
  </div>
</Card>

<style>
  h3 {
    margin: 0 auto;
    color: #555;
  }
  p {
    margin-top: 6px;
    font-size: 14px;
    color: #aaa;
    margin-bottom: 30px;
  }
  .answer {
    background: #fafafa;
    cursor: pointer;
    margin: 10px auto;
    position: relative;
  }
  .answer:hover {
    opacity: 0.6;
  }
  span {
    display: inline-block;
    padding: 10px 20px;
  }
  .percent {
    height: 100%;
    position: absolute;
    box-sizing: border-box;
  }
  .percent-a {
    width: 25%;
    border-left: 4px solid #d91b42;
    background: rgba(217, 27, 66, 0.1);
  }
  .percent-b {
    width: 75%;
    border-left: 4px solid #d91b42;
    background: rgba(69, 196, 66, 0.2);
  }
  .delete {
    margin-top: 30px;
    text-align: center;
    height: 40px;
  }
</style>
