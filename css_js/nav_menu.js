/**
 * Navigation Menu Controller
 * Manages the slide-out control panel and all user interactions
 */

class NavMenu {
    constructor(insertIndex, colors) {
        this.insertIndex = insertIndex;
        this.colors = colors || [];
        this.config = getInsertConfig(insertIndex);
        this.isOpen = false;
        this.elements = {};
        
        this.init();
    }
    
    /**
     * Initialize the navigation menu
     */
    init() {
        // Check if any controls are enabled
        const anyEnabled = Object.values(this.config.controls).some(val => val === true);
        
        if (!anyEnabled) {
            console.log('All controls disabled for insert', this.insertIndex, '- skipping nav menu creation');
            return;
        }
        
        // Clean up any existing nav elements first
        this.cleanup();
        this.createSlideOutPanel();
        this.createControls();
        this.applyControlVisibility();
    }
    
    /**
     * Clean up existing navigation elements
     */
    cleanup() {
        const existingPanel = document.getElementById('navPanel');
        const existingTab = document.getElementById('navTabContainer');
        if (existingPanel) existingPanel.remove();
        if (existingTab) existingTab.remove();
    }
    
    /**
     * Create the slide-out panel container and toggle tab
     */
    createSlideOutPanel() {
        // Container for the panel
        const panel = document.createElement('div');
        panel.id = 'navPanel';
        panel.style.cssText = `
            position: fixed !important;
            right: -200px !important;
            top: 0 !important;
            left: auto !important;
            bottom: auto !important;
            width: 200px !important;
            height: 100vh !important;
            background: rgba(0, 0, 0, 0.85) !important;
            transition: right 0.3s ease !important;
            z-index: 999998 !important;
            padding: 60px 20px 20px 20px !important;
            box-sizing: border-box !important;
            pointer-events: auto !important;
            overflow-y: auto !important;
        `;
        document.body.appendChild(panel);
        this.elements.panel = panel;
        
        // Toggle tab - create an isolation container first
        const tabContainer = document.createElement('div');
        tabContainer.id = 'navTabContainer';
        tabContainer.style.cssText = `
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            pointer-events: none !important;
            z-index: 999999 !important;
            isolation: isolate !important;
        `;
        document.body.appendChild(tabContainer);
        
        const tab = document.createElement('div');
        tab.id = 'navTab';
        tab.innerHTML = '◀';
        tab.style.cssText = `
            position: absolute !important;
            left: calc(100vw - 80px) !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            width: 80px !important;
            height: 120px !important;
            background: rgba(255, 0, 0, 1) !important;
            color: #ffffff !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            font-size: 40px !important;
            font-weight: bold !important;
            transition: left 0.3s ease !important;
            border-radius: 10px 0 0 10px !important;
            pointer-events: auto !important;
            will-change: left !important;
            isolation: isolate !important;
            box-shadow: 0 0 20px rgba(255,0,0,0.8) !important;
        `;
        tab.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });
        tabContainer.appendChild(tab);
        this.elements.tab = tab;
        
        console.log('Tab created:', tab);
        console.log('Tab styles:', tab.style.cssText);
        
        // Keep checking that tab stays visible
        setInterval(() => {
            if (tab.style.display === 'none' || tab.style.visibility === 'hidden') {
                console.warn('Tab was hidden! Restoring...');
                tab.style.setProperty('display', 'flex', 'important');
                tab.style.setProperty('visibility', 'visible', 'important');
            }
            if (!tabContainer.contains(tab)) {
                console.warn('Tab was removed! Re-adding...');
                tabContainer.appendChild(tab);
            }
        }, 100);
    }
    
    /**
     * Toggle panel open/closed
     */
    toggle() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.elements.panel.style.setProperty('right', '0', 'important');
            this.elements.tab.style.setProperty('left', 'calc(100vw - 230px)', 'important');
            this.elements.tab.innerHTML = '▶';
        } else {
            this.elements.panel.style.setProperty('right', '-200px', 'important');
            this.elements.tab.style.setProperty('left', 'calc(100vw - 30px)', 'important');
            this.elements.tab.innerHTML = '◀';
        }
    }
    
    /**
     * Create all control buttons
     */
    createControls() {
        const controls = [
            {
                id: 'styleBtn',
                label: '△STYLE',
                controlName: 'style',
                handler: () => this.handleStyleChange()
            },
            {
                id: 'htmlBtn',
                label: '△HTML',
                controlName: 'html',
                handler: () => this.handleHtmlToggle()
            },
            {
                id: 'moveUpBtn',
                label: '⊼ Move Up',
                controlName: 'moveUpDown',
                handler: () => this.handleMoveUp()
            },
            {
                id: 'moveDownBtn',
                label: '⊻ Move Down',
                controlName: 'moveUpDown',
                handler: () => this.handleMoveDown()
            },
            {
                id: 'sizeDownBtn',
                label: '− Size',
                controlName: 'resize',
                handler: () => this.handleResize(0.9)
            },
            {
                id: 'sizeUpBtn',
                label: '+ Size',
                controlName: 'resize',
                handler: () => this.handleResize(1.1)
            }
        ];
        
        controls.forEach(ctrl => {
            const btn = this.createButton(ctrl.id, ctrl.label, ctrl.handler);
            btn.dataset.controlName = ctrl.controlName;
            this.elements.panel.appendChild(btn);
            this.elements[ctrl.id] = btn;
        });
    }
    
    /**
     * Create a styled button
     */
    createButton(id, label, handler) {
        const btn = document.createElement('div');
        btn.id = id;
        btn.innerHTML = label;
        btn.style.cssText = `
            position: relative;
            color: #ffffff;
            font-size: 15px;
            margin-bottom: 15px;
            cursor: pointer;
            user-select: none;
            display: block;
            width: 100%;
            background: rgba(255,0,0,0.2);
        `;
        btn.addEventListener('click', handler);
        return btn;
    }
    
    /**
     * Apply visibility based on config
     */
    applyControlVisibility() {
        console.log('=== Applying control visibility for insert', this.insertIndex, '===');
        console.log('Config:', this.config.controls);
        console.log('Elements in this.elements:', Object.keys(this.elements));
        
        Object.keys(this.elements).forEach(key => {
            const element = this.elements[key];
            console.log(`Element ${key}:`, element.id, 'has dataset?', !!element.dataset);
            
            if (element.dataset && element.dataset.controlName) {
                const controlName = element.dataset.controlName;
                const isEnabled = this.config.controls[controlName];
                console.log(`  -> Control ${controlName}: isEnabled=${isEnabled}, setting display to ${isEnabled ? 'block' : 'none'}`);
                element.style.display = isEnabled ? 'block' : 'none';
                console.log(`  -> After setting, display is: ${element.style.display}`);
            }
        });
        
        // Also check what's actually in the DOM
        console.log('=== DOM Check ===');
        const allButtons = document.querySelectorAll('#navPanel > div');
        console.log('Buttons found in panel:', allButtons.length);
        allButtons.forEach(btn => {
            console.log(`  Button ${btn.id}: display=${btn.style.display}, dataset.controlName=${btn.dataset.controlName}`);
        });
    }
    
    /**
     * Handle style change
     */
    handleStyleChange() {
        if (typeof initStyle === 'function') {
            // Reset colors
            mycolors = [];
            initStyle();
        }
    }
    
    /**
     * Handle HTML display toggle
     */
    handleHtmlToggle() {
        if (typeof changeHtmlDisplayInline === 'function') {
            changeHtmlDisplayInline();
        }
    }
    
    /**
     * Handle move up
     */
    handleMoveUp() {
        if (typeof divCounter === 'undefined' || typeof container === 'undefined') {
            return;
        }
        
        for (let i = 1; i <= divCounter; i++) {
            container[i].style.lineHeight = '24vw';
        }
    }
    
    /**
     * Handle move down
     */
    handleMoveDown() {
        if (typeof divCounter === 'undefined' || typeof container === 'undefined') {
            return;
        }
        
        for (let i = 1; i <= divCounter; i++) {
            container[i].style.lineHeight = '38vw';
        }
    }
    
    /**
     * Handle resize
     */
    handleResize(factor) {
        if (typeof divCounter === 'undefined' || typeof container === 'undefined') {
            return;
        }
        
        for (let i = 1; i <= divCounter; i++) {
            const spans = container[i].getElementsByTagName('span');
            for (let j = 0; j < spans.length; j++) {
                const current = parseFloat(spans[j].style.fontSize);
                spans[j].style.fontSize = (current * factor) + 'vw';
            }
        }
    }
    
    /**
     * Get navigation color from color array
     */
    getNavColor() {
        if (this.colors.length === 0) return '#ffffff';
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }
    
    /**
     * Get random color from color array
     */
    getRandomColor() {
        if (this.colors.length === 0) return '#000000';
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }
}

/**
 * Initialize navigation menu
 * Call this from your main script after colors are set
 */
function initNavMenu(insertIndex, colors) {
    return new NavMenu(insertIndex, colors);
}