function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre:not(.copy-button-added) > code, pre.prettyprint:not(.copy-button-added), pre.highlight:not(.copy-button-added), pre[class*="language-"]:not(.copy-button-added)');
    console.log(`Found ${codeBlocks.length} new code blocks`);
    codeBlocks.forEach(block => {
        const parentBlock = block.tagName.toLowerCase() === 'code' ? block.parentElement : block;
        if (!parentBlock.querySelector('.copy-code-button')) {
            const copyButton = document.createElement('button');
            copyButton.textContent = "Copy";
            copyButton.className = 'copy-code-button';
            copyButton.style.cssText = "position: absolute; right: 10px; top: 10px; z-index: 1000; padding: 5px 10px; background-color: #f0f0f0; border: 1px solid #ddd; border-radius: 3px; cursor: pointer;";

            if (window.getComputedStyle(parentBlock).position === 'static') {
                parentBlock.style.position = "relative";
            }

            parentBlock.insertBefore(copyButton, parentBlock.firstChild);
            parentBlock.classList.add('copy-button-added');

            copyButton.addEventListener('click', () => {
                const codeText = block.textContent || block.innerText;
                navigator.clipboard.writeText(codeText.trim()).then(() => {
                    console.log("Code copied!");
                    copyButton.textContent = "Copied!";
                    setTimeout(() => {
                        copyButton.textContent = "Copy";
                    }, 2000);
                }).catch(err => {
                    console.error("Failed to copy code", err);
                });
            });
        }
    });
}

function observePageChanges() {
    const observer = new MutationObserver(mutations => {
        console.log('Mutation detected');
        addCopyButtons();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM fully loaded and parsed');
        addCopyButtons();
        observePageChanges();
    });
} else {
    console.log('DOM already loaded');
    addCopyButtons();
    observePageChanges();
}