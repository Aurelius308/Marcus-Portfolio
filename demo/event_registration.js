/*
		Your Name: Marcus Clontz
		Last Modified Date: 04/21/2026
		File: event_registration.js
		File Description: This file provides functionality for the DMWT Alumni Event Registration form, including the countdown timer, ticket total calculation, input validation, visual error handling, and purchase completion process.
*/

//Set minimum and maximum number of tickets able to be purchased
var minTickets = 1;
var maxTickets = 3;
// Set variables for the ticket cost
var costPerTicket = 5.00;
var ticketSurcharge = 0.50;

/*** YOUR CODE STARTS BELOW HERE ***/

//This is for the ten minute countdown timer
var timeRemaining = 10 * 60;

var timerInterval = setInterval(function () {
	timeRemaining--;

	var minutes = Math.floor(timeRemaining / 60);
	var seconds = timeRemaining % 60;

	if (seconds < 10) {
		seconds = "0" + seconds;
	}

	var timerDisplay = document.getElementById("timer");
	if (timerDisplay) {
		timerDisplay.innerHTML = minutes + ":" + seconds;
	}

	if (timeRemaining <= 0) {
		clearInterval(timerInterval);
		alert("Your time has expired. Your registration will be restarted.");
		location.href = "event_registration.html";
	}
}, 1000);

//This changes the field background color if the user enters a value not specified
function setFieldHighlight(fieldId, hasError) {
	var field = document.getElementById(fieldId);

	if (hasError) {
		field.style.backgroundColor = "#ffcccc";
	} else {
		field.style.backgroundColor = "#efefef";
	}
}

//This calculates total cost of tickets being purchased and validates the count
function calculateTotal() {
	var numTickets = document.getElementById("numTickets").value;
	var msgTickets = document.getElementById("msgTickets");
	var contactSection = document.getElementById("contactInformation");
	var totalCostField = document.getElementById("totalCost");

	if (isNaN(numTickets) || numTickets === "" || numTickets < minTickets || numTickets > maxTickets) {
		msgTickets.innerHTML = " Please enter a number from 1 to 3.";
		setFieldHighlight("numTickets", true);
		totalCostField.value = "$0.00";
		contactSection.style.display = "none";
		return false;
	} else {
		msgTickets.innerHTML = "";
		setFieldHighlight("numTickets", false);

		var total = numTickets * (costPerTicket + ticketSurcharge);
		totalCostField.value = "$" + total.toFixed(2);
		contactSection.style.display = "block";
		return true;
	}
}

//Validates contact info and complete purchase
function completePurchase() {
	var hasErrors = false;

	var name = document.getElementById("name").value.trim();
	var email = document.getElementById("email").value.trim();
	var totalCost = document.getElementById("totalCost").value;

	var msgName = document.getElementById("msgname");
	var msgEmail = document.getElementById("msgemail");

//Validates name
	if (name === "") {
		msgName.innerHTML = " Please enter your name.";
		setFieldHighlight("name", true);
		hasErrors = true;
	} else {
		msgName.innerHTML = "";
		setFieldHighlight("name", false);
	}

//Validates email
	if (email === "") {
		msgEmail.innerHTML = " Please enter your email address.";
		setFieldHighlight("email", true);
		hasErrors = true;
	} else {
		msgEmail.innerHTML = "";
		setFieldHighlight("email", false);
	}

//Rechecks tickets before completing purchase
	if (!calculateTotal()) {
		hasErrors = true;
	}

	if (!hasErrors) {
		clearInterval(timerInterval);
		alert("Thank you for your purchase! Your total charge is " + totalCost + ".");
	}
}

//This allows the Reset button to function properly
window.onload = function () {
	document.getElementById("contact").addEventListener("reset", function () {
		document.getElementById("msgTickets").innerHTML = "";
		document.getElementById("msgname").innerHTML = "";
		document.getElementById("msgemail").innerHTML = "";

		document.getElementById("numTickets").style.backgroundColor = "#efefef";
		document.getElementById("name").style.backgroundColor = "#efefef";
		document.getElementById("email").style.backgroundColor = "#efefef";

		document.getElementById("totalCost").value = "$0.00";
		document.getElementById("contactInformation").style.display = "none";
	});
};