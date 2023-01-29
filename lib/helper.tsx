export const absUrl = (path: string): string => {
    path = path.trim();
    if (path.startsWith("http")) {
      return path;
    }
    if (path.indexOf("/") === 0) {
      path = path.substring(1);
    }
  
    const appUrl =
      process.env.APP_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";
  
    return `${appUrl}/${path}`;
};

export const titleCaseSlug = (slug: string) => {
  if(!slug) return '';
  
  var sentence = slug.replace('-', ' ').toLowerCase().split(" ");
  for(var i = 0; i< sentence.length; i++){
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  return sentence.join(" ");
}
