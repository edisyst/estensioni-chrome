// Associa i pulsanti alle rispettive funzioni
const runScript = (code) => {
    chrome.scripting.executeScript({
        target: {tabId: chrome.tabs.TAB_ID_CURRENT},
        func: new Function(code),
    });
};

const withCurrentTab = async (callback) => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    callback(tab);
};

// Script per ciascuna funzione
const scripts = {
    showPasswords: () => {
        document.querySelectorAll('input[type="password"]').forEach(el => el.type = 'text');
    },
    disableValidation: () => {
        document.querySelectorAll('form').forEach(f => f.setAttribute('novalidate', 'true'));
    },
    fillInputs: () => {
        document.querySelectorAll('input:not([type="hidden"])').forEach(el => el.value = 'test');
    },
    makeEditable: () => {
        document.querySelectorAll('[readonly], [disabled]').forEach(el => {
            el.removeAttribute('readonly');
            el.removeAttribute('disabled');
        });
    },
    resetForms: () => {
        document.querySelectorAll('form').forEach(f => f.reset());
    },
    logValues: () => {
        document.querySelectorAll('form').forEach(form => {
            console.log(Object.fromEntries(new FormData(form)));
        });
    }
};

// Esegui script con `chrome.scripting.executeScript`
document.getElementById('show-passwords').onclick = () => {
    withCurrentTab(tab => {
        chrome.scripting.executeScript({target: {tabId: tab.id}, func: scripts.showPasswords});
    });
};
document.getElementById('disable-validation').onclick = () => {
    withCurrentTab(tab => {
        chrome.scripting.executeScript({target: {tabId: tab.id}, func: scripts.disableValidation});
    });
};
document.getElementById('fill-inputs').onclick = () => {
    withCurrentTab(tab => {
        chrome.scripting.executeScript({target: {tabId: tab.id}, func: scripts.fillInputs});
    });
};
document.getElementById('make-editable').onclick = () => {
    withCurrentTab(tab => {
        chrome.scripting.executeScript({target: {tabId: tab.id}, func: scripts.makeEditable});
    });
};
document.getElementById('reset-forms').onclick = () => {
    withCurrentTab(tab => {
        chrome.scripting.executeScript({target: {tabId: tab.id}, func: scripts.resetForms});
    });
};
document.getElementById('log-values').onchange = (e) => {
    if (e.target.checked) {
        withCurrentTab(tab => {
            chrome.scripting.executeScript({target: {tabId: tab.id}, func: scripts.logValues});
        });
    }
};
