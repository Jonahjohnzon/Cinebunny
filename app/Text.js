export function truncateText(text, number) {
    if (text.length > number) {
      return text.substring(0, number) + '...';
    }
    return text;
  }