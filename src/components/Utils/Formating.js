export function formatTimeAgo(time) {
  if (time === null || time === undefined) {
    return 'N/A';
  }

  const currentTime = new Date();
  const messageTime = new Date(time);
  const timeDifference = currentTime - messageTime;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(
    (currentTime.getFullYear() - messageTime.getFullYear()) * 12 +
      currentTime.getMonth() -
      messageTime.getMonth()
  );
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return 'just now';
  } else if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else if (days < 7) {
    return `${days}d ago`;
  } else if (weeks < 4) {
    return `${weeks}w ago`;
  } else if (months < 12) {
    return `${months}mo ago`;
  } else {
    return `${years}y ago`;
  }
}

export function capitalizeFullName(fullname) {
  if (fullname === null || fullname === undefined) {
    return 'N/A';
  }

  const words = fullname.split(' ');
  const capitalizedWords = words.map((word) => {
    if (word.length > 3) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return capitalizedWords.join(' ');
}

export function capitalizeFirstLetter(string) {
  if (string === null || string === undefined) {
    return 'N/A';
  }

  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function formatDate(date) {
  if (date === null || date === undefined) {
    return 'N/A';
  }

  const formattedDate = new Date(date);
  return formattedDate.toDateString();
}
