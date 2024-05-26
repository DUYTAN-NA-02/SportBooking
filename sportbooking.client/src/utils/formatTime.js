export const formatDateTime = (time) => {
    let date = new Date(time);
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear();
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');

    let formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate;
}

export const formatDate = (time) => {
    let date = new Date(time);
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear();

    let formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

export const formatTime = (time) => {
    let date = new Date(time);
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');

    let formattedTime = `${hours}:${minutes}`;
    return formattedTime;
}

export const formatDateStartEnd = (start, end) => {
    let dateStart = new Date(start);
    let dateEnd = new Date(end);
    let dayStart = dateStart.getDate().toString().padStart(2, '0');
    let monthStart = (dateStart.getMonth() + 1).toString().padStart(2, '0');
    let yearStart = dateStart.getFullYear();
    let hoursStart = dateStart.getHours().toString().padStart(2, '0');
    let minutesStart = dateStart.getMinutes().toString().padStart(2, '0');

    let dayEnd = dateEnd.getDate().toString().padStart(2, '0');
    let monthEnd = (dateEnd.getMonth() + 1).toString().padStart(2, '0');
    let yearEnd = dateEnd.getFullYear();
    let hoursEnd = dateEnd.getHours().toString().padStart(2, '0');
    let minutesEnd = dateEnd.getMinutes().toString().padStart(2, '0');

    let formattedDate = `${dayStart}/${monthStart}/${yearStart} ${hoursStart}:${minutesStart} - ${hoursEnd}:${minutesEnd}`;
    return formattedDate;
}