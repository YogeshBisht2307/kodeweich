export const titleCaseSlug = (slug: string) => {
    if (!slug) return "";

    var sentence = slug.replace("-", " ").toLowerCase().split(" ");
    for (var i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    return sentence.join(" ");
}