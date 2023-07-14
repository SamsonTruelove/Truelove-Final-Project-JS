$(document).ready(function () {
    // Define the days of the week and meals for each day
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const meals = ["Breakfast", "Snack", "Lunch", "Snack", "Dinner"];

    // The mealPlan object will hold all the user's inputs
    let mealPlan = {};

    // Dynamically generate the meal input fields for each day of the week
    for (let day of daysOfWeek) {
        let dayDiv = $(`<div id="${day}"></div>`);
        dayDiv.append(`<h3>${day}</h3>`);
        for (let meal of meals) {
            dayDiv.append(`
                <label for="${day}${meal}">${meal}:</label>
                <input type="text" id="${day}${meal}" name="${day}${meal}" required>
            `);
        }
        $('#mealForm .mealPlan').append(dayDiv);
    }

    // Clear all input fields and reset the mealPlan object when the Clear button is clicked
    $('#clearButton').click(function () {
        $('#mealForm input').val('');
        mealPlan = {};
    });

    // When the form is submitted, validate the email address, then populate the mealPlan object
    $('#mealForm').submit(function (event) {
        event.preventDefault();
        mealPlan = {
            username: $('#username').val(),
            email: $('#email').val(),
            goal: $('#goal').val()
        };
        // Use a regular expression to check that the email address is valid
        let validEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!validEmail.test(mealPlan.email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        // Populate the mealPlan object with the user's meal inputs
        for (let day of daysOfWeek) {
            for (let meal of meals) {
                mealPlan[`${day}${meal}`] = $(`#${day}${meal}`).val();
            }
        }

        // Generate the meal plan in a new window
        generateMealPlan(mealPlan);
    });
});

// This function generates the meal plan in a new window
function generateMealPlan(mealPlan) {
    let mealPlanWindow = window.open('', '_blank');

    // The content of the meal plan window
    let mealPlanContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Your Meal Plan</title>
            <style>
                body {
                    font-family: 'Courier New', monospace;
                }
                h2 {
                    text-align: center;
                }
                #mealPlan {
                    margin: 20px;
                }
                #mealPlan
                p {
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

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const meals = ["Breakfast", "Snack", "Lunch", "Snack", "Dinner"];
    for (let day of daysOfWeek) {
        mealPlanContent += `<h3>${day}</h3>`;
        for (let meal of meals) {
            mealPlanContent += `<p>${meal}: ${mealPlan[`${day}${meal}`]}</p>`;
        }
    }

    mealPlanContent += `
            </div>
            <button onclick="window.print()">Print Meal Plan</button>
        </body>
        </html>
    `;

    // Write the content to the new window
    mealPlanWindow.document.write(mealPlanContent);
    mealPlanWindow.document.close();
}
