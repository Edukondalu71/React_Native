export const timeAgo = (timestamp) => {
    const dateString = Date.parse(timestamp);
    if (isNaN(dateString)) return timestamp
    try {
        const previousDate = new Date(timestamp);
        const currentDate = new Date();
        const timeDifference = Math.floor((currentDate - previousDate) / (1000 * 60)); // Difference in minutes

        const hours = Math.floor(timeDifference / 60); // Difference in minutes
        if (hours <= 23) {
            if (timeDifference < 1) {
                return 'just now';
            } else if (timeDifference === 1) {
                return '1 min ago';
            } else if (timeDifference >= 59) {
                return hours <= 1 ? `${hours} hr ago` : `${hours} hrs ago`;
            } else {
                return `${timeDifference} min ago`;
            }
        } else {
            const days = Math.floor(hours / 24); // Difference in minutes
            return days <= 1 ? `${days} day ago` : `${days} days ago`;
        }
    } catch (error) {
        console.log(error?.message);
        return timestamp
    }
}


export const sortByTimeStamp = (arr) => {
    return arr.sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp));
}
