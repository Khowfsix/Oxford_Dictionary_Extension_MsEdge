// Function to look up a word
function lookupWord(word) {
	if (word) {
		var processedWord = word.trim().toLowerCase() + "_1";
		var encodedWord = encodeURIComponent(processedWord);
		var url =
			"https://www.oxfordlearnersdictionaries.com/definition/english/" +
			encodedWord;
		// chrome.tabs.create({ url: url });
		chrome.windows.create({ url: url, type: "popup", width: 600, height: 800 });
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
