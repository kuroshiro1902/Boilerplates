export function paramsSerialize(obj: any) {
  try {
    const params = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
        params.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
        );
      }
    }

    return '?' + params.join('&');
  } catch (error) {
    return '';
  }
}
