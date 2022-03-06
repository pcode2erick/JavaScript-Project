const questionbank=[
	{
	question:"what is JVM stands for?",
	answers:{
		a:"Java Virtual Machine",
		b:"Just Virtual Machine",
		c:"Join Visual Machine",
		d:"John Victor Mary"
	},
	correct_answer:"Java Virtual Machine"
	},
	{
	question:"which one of these is a javacript package manager?",
	answers:{
		a:'node.js',
		b:'TypeScript',
		c:'npm',
		d:'php'
	},
	correct_answer:'npm'
	},
	{
	question:"which one of these is the most popular Programming language?",
	answers:{
		a:'C++',
		b:'JavaScript',
		c:'C#',
		d:'Python'
	},
	correct_answer:'Python'
	}
	
];

const questionBox = document.getElementById("q");
const answerBox = document.querySelectorAll(".answer");
const nextButton = document.getElementById('next');
const submitButton =document.getElementById('submit');

nextButton.addEventListener("click",handleNextButton);
submitButton.addEventListener("click",handleNextButton);

answerBox.forEach(ans=>{ans.addEventListener("click",handleAnswer)});

let currentIndex = 0;
let score = 0;

function loadQuestions(currentIndex){
	let shuffled_answer=[];
	let AnsIndex = 0;
	questionBox.innerText = questionbank[currentIndex].question;
	for(letter in questionbank[currentIndex].answers){
		shuffled_answer.push(questionbank[currentIndex].answers[letter]);
	}
	
	shuffled_answer.sort(()=>Math.random()-0.5);
	answerBox.forEach(answer_container=>{
		answer_container.classList.remove("red");
		answer_container.classList.remove("green");
		answer_container.innerText = shuffled_answer[AnsIndex++];
	});
	
}

function handleNextButton(){
	currentIndex++;
	
	if(questionbank.length-1 < currentIndex){
		document.getElementsByClassName("quizbox")[0].innerHTML="<h2>You have finished the quiz <p> You get "+score+" / "+questionbank.length+" scores</h2>";
	}
	else if(questionbank.length -1 == currentIndex){
		loadQuestions(currentIndex);
		submitButton.style.display="block";
		nextButton.style.display="none";
	}
	else{
		loadQuestions(currentIndex);
	}
}

function handleAnswer(event){
	answerBox.forEach(answer_container=>{
		answer_container.classList.remove("red");
		answer_container.classList.remove("green");
	});
	let choice = event.target.innerText;
	let choice_index = -1,correct_answer_index =-1;
	const correct_answer = questionbank[currentIndex].correct_answer;
	
	for(let i=0;i<4;i++){
		if(answerBox.item(i).innerText===choice){choice_index = i;}
		if(answerBox.item(i).innerText===correct_answer){correct_answer_index = i;}
	}
	if(choice === correct_answer){
		score++;
		answerBox[choice_index].classList.add("green");
	}
	else{
		answerBox[correct_answer_index].classList.add("green");
		answerBox[choice_index].classList.add("red");
	}
}

loadQuestions(currentIndex);
