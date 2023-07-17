// -------------------------------------------------------------------------------------
// Author: Samson Truelove
// Class: WEB-115-0003
// Date: 7/15/2023
// 
// This is the JavaScript file for the Meal Plan Final Project.
// Dynamically Generates the Input Fields for the Meal Plan Form / Gathers User Input and Generates the Meal Plan.
// Downloads / Prints the Meal Plan. Clears the Input Fields. Validates the Email Address Before Submittal. 
// -------------------------------------------------------------------------------------

// Defining Days of the Week and Meals as Global Variables for Use in Multiple Functions
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const meals = ["Breakfast", "Snack", "Lunch", "Snack", "Dinner"];

// -------------------------------------------------------------------------------------
// jQuery: Dynamically Generate the Input Fields for the Meal Plan Form
// -------------------------------------------------------------------------------------
$(document).ready(function () {

    // Object to store the User's Information and the Meal plan
    let mealPlan = {};

    // Dynamically Generates the Input Fields and Labels for the Meal Plan Itself.)
    for (let day of daysOfWeek) {
        let dayDiv = $(`<div class="dayContainer" id="day"></div>`);
        dayDiv.append(`<h3>${day}</h3>`);
        for (let meal of meals) {
            dayDiv.append(`
                <div class="inputGroup">
                    <label for="${day}${meal}">${meal}:</label>
                    <input type="text" id="${day}${meal}" name="${day}${meal}">
                </div>
            `);
        }
        $('#mealForm .mealPlan').append(dayDiv);
    }

    // Clear Button Event: Clears the Input Fields / Resets the Meal Plan Object
    $('#clearButton').click(function () {
        $('#mealForm input').val('');   // Clearing All Input Fields
        $('#goal').val('');   // Clearing Text Areas
        mealPlan = {};        // Resetting mealPlan object
    });


    // Form Submission Event: Gathers User's Information / Generates Meal Plan
    $('#mealForm').submit(function (event) {

        // Preventing Default Form Submission
        event.preventDefault();

        // Gathering User Information
        mealPlan = {
            username: $('#username').val(),
            email: $('#email').val(),
            goal: $('#goal').val()
        };

        // Using Regular Expression to Validate the Email Address / Returns Error Message if Invalid
        let validEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!validEmail.test(mealPlan.email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        // Gathering User Input for the Meal Plan
        for (let day of daysOfWeek) {
            for (let meal of meals) {
                mealPlan[`${day}${meal}`] = $(`#${day}${meal}`).val();
            }
        }

        // Calling Function to Generate the Meal Plan
        generateMealPlan(mealPlan);
    });
});

// -------------------------------------------------------------------------------------
// Function to Generate the Meal Plan
// Uses "On the Fly" Window to Display the Meal Plan
// Uses for Loop to Loop Through Each Day and Each Meal
// -------------------------------------------------------------------------------------
function generateMealPlan(mealPlan) {

    // Start of HTML Content for the Meal Plan Including Minor Style/Formatting.
    let mealPlanContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Your Meal Plan</title>
            <style>
                body {
                    font-family: 'Courier New', monospace;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }
                h2 {
                    text-align: center;
                }
                #mealPlan {
                    width: 80%;
                    margin: 20px;
                }
                #mealPlan p {
                    text-indent: 50px;
                    text-align: justify;
                    letter-spacing: 3px;
                }
                #mealPlan h3 {
                    margin-top: 20px;
                }
                button {
                    display: block;
                    margin: 20px auto;
                    padding: 10px 20px;
                }
            </style>
        </head>
        <body>
            <h2>Your Meal Plan</h2>
            <div id="mealPlan">
                <p>Name: ${mealPlan.username}</p>
                <p>Email: ${mealPlan.email}</p>
                <p>Goal: ${mealPlan.goal}</p>
    `;

    // Looping through Each Day and Each Meal, Adding to the HTML Content.
    for (let day of daysOfWeek) {
        mealPlanContent += `<h3>${day}</h3>`;
        for (let meal of meals) {
            mealPlanContent += `<p>${meal}: ${mealPlan[`${day}${meal}`]}</p>`;
        }
    }

    // Finishing the HTML Content for the Meal Plan / Including Buttons to Print / Download the Meal Plan.
    mealPlanContent += `
            </div>
            <button onclick="window.print()">Print Meal Plan</button>
            <button onclick="downloadMealPlan()">Download Meal Plan</button>
            <script>
            const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

                function downloadMealPlan() {
                    // Prepare the text for download
                    let mealPlanText = document.getElementById('mealPlan').innerText;
                    // Format the text: add a new line before and after each day
                    for(let day of daysOfWeek){
                        let regex = new RegExp(day, "g");
                        mealPlanText = mealPlanText.replace(regex, "\\n" + day + "\\n");
                    }
                    // Create a downloadable text file
                    const element = document.createElement('a');
                    const file = new Blob([mealPlanText], {type: 'text/plain'});
                    element.href = URL.createObjectURL(file);
                    element.download = "MealPlan.txt";
                    document.body.appendChild(element);
                    element.click();
                }
            </script>
        </body>
        </html>
    `;

    // Using "On the Fly" Window to Display the Meal Plan
    let flyWindow = window.open('about:blank', 'mealPlan', 'width=800,height=600,left=200,top=200');
    flyWindow.document.write(mealPlanContent);
    flyWindow.document.close();
}
