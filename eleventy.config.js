module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("CNAME");

  eleventyConfig.addFilter("date", function (dateObj, format) {
    const d = dateObj instanceof Date ? dateObj : new Date(dateObj);
    if (format === "yyyy-MM-dd" || !format) {
      return d.toISOString().slice(0, 10);
    }
    return d.toISOString().slice(0, 10);
  });

  // "2026-08-31" -> "August 31, 2026" (UTC so the day never shifts)
  eleventyConfig.addFilter("readableDate", function (dateObj) {
    const d = dateObj instanceof Date ? dateObj : new Date(dateObj);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("posts/*.md").sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
