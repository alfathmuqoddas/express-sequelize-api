function createSlug(sentence) {
  return sentence
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove non-alphanumeric characters (except for hyphens and underscores)
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .trim(); // Trim any leading or trailing whitespace
}

module.exports = { createSlug };
