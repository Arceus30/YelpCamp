// script.js

function formatTimeDifference(date) {
    const currentTime = new Date();
    const timeDifference = currentTime - date;
    const secondsPassed = Math.floor(timeDifference / 1000);
    const minutesPassed = Math.floor(secondsPassed / 60);
    const hoursPassed = Math.floor(minutesPassed / 60);
    const daysPassed = Math.floor(hoursPassed / 24);

    let formattedTime;

    if (daysPassed > 0) {
        formattedTime = `${daysPassed} day${daysPassed === 1 ? "" : "s"} ago`;
    } else if (hoursPassed > 0) {
        formattedTime = `${hoursPassed} hour${
            hoursPassed === 1 ? "" : "s"
        } ago`;
    } else if (minutesPassed > 0) {
        formattedTime = `${minutesPassed} minute${
            minutesPassed === 1 ? "" : "s"
        } ago`;
    } else {
        formattedTime = `${secondsPassed} second${
            secondsPassed === 1 ? "" : "s"
        } ago`;
    }

    return formattedTime;
}

// Display the formatted time for the campground
document.addEventListener("DOMContentLoaded", function () {
    const createdAt = new Date(campground.date);
    document.getElementById("timePassed").innerText =
        formatTimeDifference(createdAt);

    // Loop through each review and display the time passed
    for (let review of campground.reviews) {
        const reviewCreatedAt = new Date(review.date);
        document.getElementById(`reviewTimePassed_${review._id}`).innerText =
            formatTimeDifference(reviewCreatedAt);
    }

    const ratingInput = document.getElementById("Rating");
    const ratingLabel = document.getElementById("ratingLabel");
    if (ratingInput) {
        ratingInput.addEventListener("input", function () {
            ratingLabel.textContent = this.value;
        });
    }

    const resetRating = document.getElementById("resetRating");
    if (resetRating) {
        resetRating.addEventListener("click", function () {
            document.getElementById("no-rate").checked = true;
        });
    }
});
