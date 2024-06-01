<script>
    import PollStore from "../Stores/PollStore.js";
  import { createEventDispatcher } from "svelte";
//   import { createEventDispatcher } from "svelte";
    import Button from "../Shared/Button.svelte";

    let dispatch= createEventDispatcher();

    let fields={Question:'', AnswerA:'', AnswerB:''};
    let errors={Question:'', AnswerA:'', AnswerB:''};
    let valid= false;
    const submitHandler=()=>{
        valid=true;
        // valideate the Question
        if(fields.Question.trim().length<5){
            valid:false;
            errors.Question='Question must be at least 5 characters';
        }
        else{
            errors.Question='';
        }
        // Validate AnswerA
        if(fields.AnswerA.trim().length<1){
            valid:false;
            errors.AnswerA='Answer A can not be empty';
        }
        else{
            errors.AnswerA='';
        }
        //validate AnswerB
        if(fields.AnswerB.trim().length<5){
            valid:false;
            errors.AnswerB='Answer B can not be empty';
        }
        else{
            errors.AnswerB='';
        }
        //Add new poll
        if(valid){
            let poll={...fields, VoteA:0, VoteB:0, id:Math.random()}
            // Save Poll to store
            PollStore.update(CurrentPoll=>{
                return [poll, ...CurrentPoll];
            });
            // console.log('valid', fields);
            dispatch('add');
            
        }
        console.log(fields);
        fields={Question:'', AnswerA:'', AnswerB:''};
    }
</script>
<form on:submit|preventDefault={submitHandler}>
    <div class="form-field">
        <label for="Question">Poll Question</label>
        <input type="text" id="Question" bind:value={fields.Question}>
        <div class="error">{errors.Question}</div>
    </div>
    <div class="form-field">
        <label for="answer-a">Answer A</label>
        <input type="text" id="answer-a" bind:value={fields.AnswerA}>
        <div class="error">{errors.AnswerA}</div>
    </div>
    <div class="form-field">
        <label for="answer-b">Answer B</label>
        <input type="text" id="answer-b" bind:value={fields.AnswerB}>
        <div class="error">{errors.AnswerB}</div>
    </div>
    <Button type="secondary" flat={true} inverse={true}>Add Poll</Button>
</form>
<style>
    form{
        width: 400px;
        margin: 0 auto;
        text-align: center;
    }
    .form-field{
        margin: 18px auto;
    }
    input{
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
    }
    label{
        display: block;
        margin-bottom: 10px;
    }
    .error{
        font-weight: bold;
        font-size: 12px;
        color: red;
        padding-top: 10px;
    }
</style>