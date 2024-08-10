// Function to look up a word
function lookupWord(word) {
	if (word) {
		var wordCount = word.trim().split(/\s+/).length <= 1;
		if (!wordCount) {
			var processedWord = word.trim().toLowerCase();
			var encodedWord = encodeURIComponent(processedWord);
			var url =
				"https://translate.google.com/details?sl=en&tl=vi&op=translate&text=" +
				encodedWord;
			chrome.tabs.create({ url: url });
		} else {
			var processedWord = word.trim().toLowerCase() + "_1";
			var encodedWord = encodeURIComponent(processedWord);
			var url =
				"https://www.oxfordlearnersdictionaries.com/definition/english/" +
				encodedWord;
			// chrome.tabs.create({ url: url });
			chrome.windows.create({
				url: url,
				type: "popup",
				width: 600,
				height: 800,
			});
		}
	}
}

// Create context menu when the extension is installed
chrome.runtime.onInstalled.addListener(function () {
	chrome.contextMenus.create({
		id: "lookupOxford",
		title: 'Look up in Oxford Dictionary: "%s"',
		contexts: ["selection"],
	});
});

// Handle context menu click event
chrome.contextMenus.onClicked.addListener(function (info, tab) {
	if (info.menuItemId === "lookupOxford") {
		lookupWord(info.selectionText);
	}
});

// Handle keyboard shortcut
chrome.commands.onCommand.addListener(function (command) {
	if (command === "lookup-word") {
		chrome.tabs.executeScript(
			{
				code: "window.getSelection().toString();",
			},
			function (selection) {
				lookupWord(selection[0]);
			}
		);
	}
});
