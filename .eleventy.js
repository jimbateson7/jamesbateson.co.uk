const rssPlugin = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const {eleventyImageTransformPlugin} = require('@11ty/eleventy-img');
const fs = require('fs');

// Import filters
const dateFilter = require('./src/filters/date-filter.js');
const secondsFilter = require('./src/filters/seconds-filter.js');
const metersFilter = require('./src/filters/meters-filter.js');
const markdownFilter = require('./src/filters/markdown-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

// Import transforms
const parseTransform = require('./src/transforms/parse-transform.js');

// Import data files
const site = require('./src/_data/site.json');

module.exports = (config) => {
	// Plugins
	config.addPlugin(eleventyImageTransformPlugin);
	config.addPlugin(rssPlugin);
	config.addPlugin(syntaxHighlight, {
		alwaysWrapLineHighlights: true,
		errorOnInvalidLanguage: false,
		init: function ({Prism}) {
			Prism.languages['nunjucks'] = {
				comment: /^\{#[\s\S]*?#\}/,
				delimiter: {
					pattern: /^\{(?:\{\{|[%\{])-?|-?(?:\}\}|[%\}])\}$/,
					alias: 'punctuation',
				},
				string: {
					pattern: /"[^"]*"|'[^']*'/,
					greedy: true,
				},
				keyword:
					/\b(?:as|assign|break|(?:end)?(?:capture|case|comment|for|form|if|paginate|raw|style|tablerow|unless)|continue|cycle|decrement|echo|else|elsif|in|include|increment|limit|liquid|offset|range|render|reversed|section|when|with)\b/,
				object: /\b(?:address|all_country_option_tags|article|block|blog|cart|checkout|collection|color|country|country_option_tags|currency|current_page|current_tags|customer|customer_address|date|discount_allocation|discount_application|external_video|filter|filter_value|font|forloop|fulfillment|generic_file|gift_card|group|handle|image|line_item|link|linklist|localization|location|measurement|media|metafield|model|model_source|order|page|page_description|page_image|page_title|part|policy|product|product_option|recommendations|request|robots|routes|rule|script|search|selling_plan|selling_plan_allocation|selling_plan_group|shipping_method|shop|shop_locale|sitemap|store_availability|tax_line|template|theme|transaction|unit_price_measurement|user_agent|variant|video|video_source)\b/,
				function: [
					{
						pattern: /(\|\s*)\w+/,
						lookbehind: true,
						alias: 'filter',
					},
					{
						// array functions
						pattern: /(\.\s*)(?:first|last|size)/,
						lookbehind: true,
					},
				],
				boolean: /\b(?:false|nil|true)\b/,
				range: {
					pattern: /\.\./,
					alias: 'operator',
				},
				// https://github.com/Shopify/liquid/blob/698f5e0d967423e013f6169d9111bd969bd78337/lib/liquid/lexer.rb#L21
				number: /\b\d+(?:\.\d+)?\b/,
				operator: /[!=]=|<>|[<>]=?|[|?:=-]|\b(?:and|contains(?=\s)|or)\b/,
				punctuation: /[.,\[\]()]/,
				empty: {
					pattern: /\bempty\b/,
					alias: 'keyword',
				},
			};
		},
	});

	// Filters
	config.addFilter('dateFilter', dateFilter);
	config.addFilter('secondsFilter', secondsFilter);
	config.addFilter('metersFilter', metersFilter);
	config.addFilter('markdownFilter', markdownFilter);
	config.addFilter('w3DateFilter', w3DateFilter);

	// Layout aliases
	config.addLayoutAlias('home', 'layouts/home.njk');
	config.addLayoutAlias('post', 'layouts/post.njk');

	// Transforms
	config.addTransform('parse', parseTransform);

	// Passthrough copy
	config.addPassthroughCopy('src/fonts');
	config.addPassthroughCopy('src/images');
	config.addPassthroughCopy('src/js');
	config.addPassthroughCopy('src/admin/config.yml');
	config.addPassthroughCopy('src/admin/previews.js');
	config.addPassthroughCopy('node_modules/nunjucks/browser/nunjucks-slim.js');

	const now = new Date();

	// Custom collections
	const liveArticles = (post) => post.date <= now && !post.data.draft && !post.data.inProgress;
	config.addCollection('articles', (collection) => {
		return [...collection.getFilteredByGlob('./src/articles/*.md').filter(liveArticles)].reverse();
	});

	const liveJournal = (journal) => journal.date <= now && !journal.data.draft;
	config.addCollection('journal', (collection) => {
		return [...collection.getFilteredByGlob('./src/journal/*.md').filter(liveJournal)].reverse();
	});

	config.addCollection('postFeed', (collection) => {
		return [...collection.getFilteredByGlob('./src/articles/*.md').filter(liveArticles)]
			.reverse()
			.slice(0, site.maxPostsPerPage);
	});

	config.addCollection('draftArticles', (collection) => {
		return [...collection.getFilteredByGlob('./src/articles/*.md')]
			.filter((post) => post.data.inProgress)
			.reverse();
	});

	config.addCollection('journalFeed', (collection) => {
		return [...collection.getFilteredByGlob('./src/journal/*.md').filter(liveJournal)]
			.reverse()
			.slice(0, site.maxPostsPerPage);
	});

	const liveProject = (project) => project.date <= now && !project.data.draft;
	config.addCollection('projects', (collection) => {
		return [...collection.getFilteredByGlob('./src/project/*.md').filter(liveProject)].reverse();
	});

	// 404
	config.setBrowserSyncConfig({
		callbacks: {
			ready: function (err, browserSync) {
				const content_404 = fs.readFileSync('dist/404.html');

				browserSync.addMiddleware('*', (req, res) => {
					// Provides the 404 content without redirect.
					res.write(content_404);
					res.end();
				});
			},
		},
	});

	return {
		templateFormats: ['njk', 'md', 'html', '11ty.js'],
		dir: {
			input: 'src',
			output: 'dist',
		},
		passthroughFileCopy: true,
	};
};
