module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("CNAME");

  // Standalone interactive pages: copied verbatim and excluded from
  // Nunjucks processing so their inline CSS/JS braces stay intact.
  eleventyConfig.addPassthroughCopy("research");
  eleventyConfig.ignores.add("research/**");

  eleventyConfig.addFilter("date", function (dateObj, format) {
    const d = dateObj instanceof Date ? dateObj : new Date(dateObj);
    if (format === "yyyy-MM-dd" || !format) {
      return d.toISOString().slice(0, 10);
    }
    return d.toISOString().slice(0, 10);
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
