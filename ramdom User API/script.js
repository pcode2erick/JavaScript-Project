function getFullName(name){
	const {last,first} = name;
	return `${last} ${first}`;
}

function getAddress(address){
	const {street,city,state} = address;
	return `${street.number} ${street.name}, ${city}, ${state}`;
}

async function getRandomUser(){
//Fetch JSON data from API with async function and await response data
await fetch("https://randomuser.me/api").then(async response=>{
	const data = await response.json();
	document.getElementById('img_thumbnail').src=data.results[0].picture.medium;
	document.getElementById('name').innerText = getFullName(data.results[0].name);
	document.getElementById('phone').innerText = data.results[0].phone;
	document.getElementById('address').innerText = getAddress(data.results[0].location);
	document.getElementById('country').innerText = data.results[0].location.country;
});
}