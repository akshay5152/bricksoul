const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Mock DOM environment
const mockDom = `
    <div class="style-module-scss-module__Tuk-dW__grayBg"></div>
    <div class="style-module-scss-module__Tuk-dW__wrapper">
        <span class="style-module-scss-module__Tuk-dW__digit">0</span>
        <span class="style-module-scss-module__Tuk-dW__digit">%</span>
    </div>
    <div class="style-module-scss-module__GV1P3W__dot"></div>
    <div class="style-module-scss-module__GV1P3W__borderDot"></div>
    <button class="style-module-scss-module__MjpYSW__menuToggle"></button>
    <div class="style-module-scss-module__MjpYSW__menu"></div>
    <div class="style-module-scss-module__MjpYSW__bottom"><p><span></span></p></div>
    <p class="style-module-scss-module__1eBtna__bottomText"><span></span></p>
    <canvas class="style-module-scss-module__NLzJ3a__wavesCanvas"></canvas>
    <div class="style-module-scss-module__RsorJa__stats">
        <span class="style-module-scss-module__RsorJa__countFirst"><span class="count-up-text"></span></span>
        <span class="style-module-scss-module__RsorJa__countSecond"><span class="count-up-text"></span></span>
        <span class="style-module-scss-module__RsorJa__countDecimal"><span class="count-up-text"></span></span>
    </div>
    <span class="style-module-scss-module__RsorJa__line"></span>
`;

// Helper classes
class MockElement {
    constructor(tagName, className = '') {
        this.tagName = tagName;
        this.className = className;
        this.classList = {
            add: (c) => {},
            remove: (c) => {},
            toggle: (c) => true
        };
        this.style = {};
        this.textContent = '';
        this.parentElement = this;
        this.children = [];
    }
    
    setAttribute() {}
    addEventListener() {}
    querySelector() { return new MockElement('div'); }
    querySelectorAll() { return [new MockElement('div')]; }
    appendChild() {}
    animate() { return { finished: Promise.resolve() }; }
    getBoundingClientRect() { return { top: 0, bottom: 100 }; }
}

const mockWindow = {
    addEventListener: () => {},
    requestAnimationFrame: (cb) => setTimeout(cb, 16),
    setInterval: setInterval,
    clearInterval: clearInterval,
    setTimeout: setTimeout,
    Date: Date,
    Math: Math,
    innerWidth: 1024,
    innerHeight: 768
};

const mockDocument = {
    addEventListener: () => {},
    querySelector: (selector) => {
        console.log(`[DOM] querySelector: ${selector}`);
        return new MockElement('div');
    },
    querySelectorAll: (selector) => {
        console.log(`[DOM] querySelectorAll: ${selector}`);
        return [new MockElement('div')];
    },
    createElement: (tag) => new MockElement(tag),
    head: {
        appendChild: () => {}
    }
};

// IntersectionObserver mock
class MockIntersectionObserver {
    constructor(callback) {
        this.callback = callback;
    }
    observe() {
        console.log('[Observer] observe called');
    }
    unobserve() {}
}

const sandbox = {
    window: mockWindow,
    document: mockDocument,
    IntersectionObserver: MockIntersectionObserver,
    console: console,
    requestAnimationFrame: mockWindow.requestAnimationFrame,
    setInterval: setInterval,
    clearInterval: clearInterval,
    setTimeout: setTimeout
};

vm.createContext(sandbox);

const scriptCode = fs.readFileSync(path.join(__dirname, 'js', 'main.js'), 'utf8');

console.log('Running main.js inside mock sandbox to verify syntax and check for runtime errors...');
try {
    vm.runInContext(scriptCode, sandbox);
    console.log('SUCCESS: main.js executed without syntax or instant runtime exceptions!');
} catch (err) {
    console.error('ERROR during script execution:', err);
}
